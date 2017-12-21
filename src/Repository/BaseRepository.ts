/**
 * @module Repository
 */
/** */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IAuthenticationService, LoginState } from '../Authentication/';
import { SnConfigModel } from '../Config/snconfigmodel';
import { Content, ContentInternal, IContent, ISavedContent, SavedContent } from '../Content';
import { ContentSerializer } from '../ContentSerializer';
import { ContentType, Folder, GenericContent, PortalRoot, User } from '../ContentTypes';
import { BaseHttpProvider } from '../HttpProviders';
import { IODataParams, ODataApi, ODataBatchResponse, ODataCollectionResponse } from '../ODataApi';
import { FinializedQuery, QueryExpression, QuerySegment } from '../Query';
import { Schema, SchemaStore } from '../Schemas';
import { Authentication, ContentTypes, ODataHelper } from '../SN';
import { RepositoryEventHub, UploadFileOptions, UploadFromEventOptions, UploadOptions, UploadProgressInfo, UploadResponse, UploadTextOptions, VersionInfo, WithParentContent } from './';

/**
 *
 */
export class BaseRepository<TProviderType extends BaseHttpProvider = BaseHttpProvider,
    TAuthenticationServiceType extends IAuthenticationService = IAuthenticationService> {
    private _odataApi: ODataApi<TProviderType>;
    public readonly Events: RepositoryEventHub = new RepositoryEventHub();

    /**
     * Returns the Repository's base OData Url (e.g.: https://demo.sensenet.com/odata.svc)
     */
    // tslint:disable-next-line:naming-convention
    public get ODataBaseUrl() {
        return ODataHelper.joinPaths(this.Config.RepositoryUrl, this.Config.ODataToken);
    }

    public WaitForAuthStateReady() {
        return this.Authentication.State.skipWhile((state) => state === Authentication.LoginState.Pending)
            .first();
    }

    /**
     * Public endpoint for making Ajax calls to the Repository
     * @param {string} path The Path for the call
     * @param {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'} method The method type
     * @param {{ new (...args): T }} returnsType The expected return type
     * @param {any} body The post body (optional)
     * @returns {Observable<T>} An observable, which will be updated with the response.
     */
    public Ajax<T>(path: string,
                   method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
                   returnsType?: { new(...args: any[]): T },
                   body?: any,
                   additionalHeaders?: { name: string, value: string }[],
                   isODataRequest: boolean = true,
                   responseType: string = 'json'
    ): Observable<T> {
        this.Authentication.CheckForUpdate();
        return this.WaitForAuthStateReady()
            .flatMap((state) => {
                if (!returnsType) {
                    returnsType = Object as { new(...args: any[]): any };
                }
                return this.HttpProviderRef.Ajax<T>(returnsType,
                    {
                        url: ODataHelper.joinPaths(isODataRequest ? this.ODataBaseUrl : this.Config.RepositoryUrl, path),
                        method,
                        body,
                        responseType,
                    }, additionalHeaders);
            });
    }

    public UploadFile<TFile extends IContent>(uploadOptions: WithParentContent<UploadFileOptions<TFile>>): Observable<UploadProgressInfo<TFile>> {
        this.Authentication.CheckForUpdate();
        uploadOptions.Body = {
            ...uploadOptions.Body,
            Overwrite: uploadOptions.Overwrite,
            PropertyName: uploadOptions.PropertyName,
            FileName: uploadOptions.File.name,
            ContentType: uploadOptions.ContentType.name,
        };
        this.Authentication.CheckForUpdate();
        return this.WaitForAuthStateReady()
            .flatMap((state) => {
                const uploadSubject = new Subject<UploadProgressInfo<TFile>>();
                const fileName = uploadOptions.File.name;
                const uploadPath = ODataHelper.joinPaths(this.ODataBaseUrl, uploadOptions.Parent.GetFullPath(), 'upload');

                if (uploadOptions.File.size <= this.Config.ChunkSize) {

                    /** Non-chunked upload */
                    uploadOptions.Body.ChunkToken = '0*0*False*False';
                    this.HttpProviderRef.Upload<TFile>((uploadOptions.ContentType) as { new(...args: any[]): Content<TFile> }, uploadOptions.File, {
                        url: uploadPath,
                        body: uploadOptions.Body,
                    })
                        .subscribe((created) => {
                            this.Load<TFile>((created as SavedContent<TFile>).Id, uploadOptions.OdataOptions).subscribe((c) => {
                                this.Events.Trigger.ContentCreated({
                                    Content: c
                                });

                                const progress = {
                                    Completed: true,
                                    ChunkCount: 1,
                                    UploadedChunks: 1,
                                    CreatedContent: c
                                };

                                uploadSubject.next(progress);
                                this.Events.Trigger.UploadProgress(progress);
                                uploadSubject.complete();
                            });
                        }, (error) => {
                            this.Events.Trigger.ContentCreateFailed({
                                Content: {
                                    Id: null,
                                    Path: null,
                                    Name: fileName
                                } as Content,
                                Error: error
                            });
                            uploadSubject.error(error);
                        });
                } else {

                    /* Chunked upload  */

                    /**
                     * Init request
                     */

                    const initialChunkData = uploadOptions.File.slice(0, this.Config.ChunkSize);
                    return this.HttpProviderRef.Upload(String, new File([initialChunkData], uploadOptions.File.name), {
                        url: uploadPath,
                        body: {
                            ...uploadOptions.Body,
                            UseChunk: true,
                            create: 1
                        },
                        headers: {
                            'Content-Range': `bytes ${0}-${this.Config.ChunkSize}/${uploadOptions.File.size}`,
                            'Content-Disposition': `attachment; filename="${uploadOptions.File.name}"`
                        }
                    }
                    ).
                        flatMap((chunkToken) => {
                            const resp = new UploadResponse(...chunkToken.split('*'));
                            const createdContent: SavedContent<TFile> = this.HandleLoadedContent<TFile>({
                                Id: resp.ContentId,
                                Path: uploadOptions.Parent.Path,
                                Name: uploadOptions.File.name,
                                Type: uploadOptions.ContentType.name
                            } as TFile & ISavedContent);

                            this.Events.Trigger.ContentCreated({
                                Content: createdContent
                            });

                            return this.sendChunk(uploadOptions, uploadPath, chunkToken.toString(), resp.ContentId)
                                .flatMap((c) => {
                                    return this.Load<TFile>(resp.ContentId, uploadOptions.OdataOptions)
                                    .map((content) => {
                                        const chunkCount = Math.ceil(uploadOptions.File.size / this.Config.ChunkSize);
                                        // tslint:disable-next-line:no-string-literal
                                        content['_isOperationInProgress'] = false;
                                        const progressInfo = {
                                            Completed: true,
                                            ChunkCount: chunkCount,
                                            UploadedChunks: chunkCount,
                                            CreatedContent: content
                                        } as UploadProgressInfo<TFile>;
                                        this.Events.Trigger.UploadProgress(progressInfo);
                                        return progressInfo;
                                    });
                        });
                    });
                }

                return uploadSubject.asObservable();
            });
    }

    private sendChunk<T extends IContent>(options: WithParentContent<UploadFileOptions<T>>, uploadPath: string, chunkToken: string, contentId: number, offset: number = 0)
        : Observable<UploadProgressInfo<T>> {
        this.Authentication.CheckForUpdate();
        return this.WaitForAuthStateReady()
            .flatMap((state) => {

                let chunkEnd = offset + this.Config.ChunkSize;
                chunkEnd = chunkEnd > options.File.size ? options.File.size : chunkEnd;

                const chunkData = options.File.slice(offset, chunkEnd);

                const request = this.HttpProviderRef.Upload(Object, new File([chunkData], options.File.name), {
                    url: uploadPath,
                    body: {
                        ...options.Body,
                        UseChunk: true,
                        FileLength: options.File.size,
                        ChunkToken: chunkToken
                    },
                    headers: {
                        'Content-Range': `bytes ${offset}-${chunkEnd - 1}/${options.File.size}`,
                        'Content-Disposition': `attachment; filename="${options.File.name}"`
                    }
                }).map((newResp) => {
                    const content = this.HandleLoadedContent<T>({
                        Id: contentId,
                        Path: 'asd',
                        Name: options.File.name,
                        Type: options.ContentType.name
                    } as T & ISavedContent);
                    // tslint:disable-next-line:no-string-literal
                    content['_isOperationInProgress'] = true;
                    const progress = {
                        Completed: false,
                        ChunkCount: Math.ceil(options.File.size / this.Config.ChunkSize),
                        CreatedContent: content,
                        UploadedChunks: (offset / this.Config.ChunkSize) + 1
                    };
                    this.Events.Trigger.UploadProgress(progress);
                    return progress;
                });

                if (chunkEnd === options.File.size) {
                    return request;
                }
                return request.flatMap((r) => this.sendChunk(options, uploadPath, chunkToken, contentId, offset + this.Config.ChunkSize));
            });
    }

    public UploadTextAsFile<T extends IContent = IContent>(options: WithParentContent<UploadTextOptions<T>>) {
        const file = new File([options.Text], options.FileName);
        return this.UploadFile<T>({
            File: file,
            ...options as WithParentContent<UploadOptions<T>>
        });
    }

    private async webkitFileHandler<T extends IContent>(FileEntry: WebKitFileEntry, Scope: ContentInternal, options: UploadOptions<T>) {
        await new Promise((resolve, reject) => {
            FileEntry.file((f) => {
                Scope.UploadFile({
                    File: f as any as File,
                    ...options
                })
                    .skipWhile((progress) => !progress.Completed)
                    .subscribe(
                    (progress) => resolve(progress),
                    (err) => reject(err));
            }, (err) => reject(err));
        });
    }

    private async webkitDirectoryHandler<T extends IContent>(Directory: WebKitDirectoryEntry, Scope: Content, options: UploadOptions<T>) {
        await new Promise((resolve, reject) => {
            this.CreateContent<Folder>({
                Name: Directory.name,
                Path: Scope.Path,
                DisplayName: Directory.name
            }, Folder).Save().subscribe(async (c) => {
                const dirReader = Directory.createReader();
                await new Promise((res) => {
                    dirReader.readEntries(async (items) => {
                        await this.webkitItemListHandler<T>(items as any, c, true, options);
                        res();
                    });
                });
                resolve(c);
            }, (err) => reject(err));
        });
    }

    private async webkitItemListHandler<T extends IContent>(items: (WebKitFileEntry | WebKitDirectoryEntry)[], Scope: Content, CreateFolders: boolean, options: UploadOptions<T>) {
        // tslint:disable-next-line:forin
        for (const index in items) {
            if (CreateFolders && items[index].isDirectory) {
                await this.webkitDirectoryHandler(items[index] as WebKitDirectoryEntry, Scope, options);
            }
            if (items[index].isFile) {
                await this.webkitFileHandler(items[index] as WebKitFileEntry, Scope, options);
            }
        }
    }

    public async UploadFromDropEvent<T extends IContent = IContent>(options: UploadFromEventOptions<T> & { Parent: ContentInternal }) {
        if ((window as any).webkitRequestFileSystem) {
            const entries: (WebKitFileEntry | WebKitDirectoryEntry)[] =
                [].map.call(options.Event.dataTransfer.items, (i: DataTransferItem) => i.webkitGetAsEntry());

            await this.webkitItemListHandler<T>(entries, options.Parent, options.CreateFolders, options);
        } else {
            // Fallback for non-webkit browsers.
            [].forEach.call(options.Event.dataTransfer.files, async (f: File) => {
                if (f.type === 'file') {
                    options.Parent.UploadFile({
                        File: f,
                        ...options as UploadOptions<T>
                    }).subscribe((c) => { /**/ });
                }

            });
        }

    }

    /**
     * Reference to the Http Provider used by the current repository
     */
    public readonly HttpProviderRef: TProviderType;

    /**
     * Reference to the OData API used by the current repository
     */
    public get Content(): ODataApi<TProviderType> {
        // tslint:disable-next-line:no-console
        console.warn('The property repository.Content is deprecated and will be removed in the near future. Use repositoy.GetODataApi() instead.');
        return this._odataApi;
    }

    // tslint:disable-next-line:naming-convention
    public GetODataApi(): ODataApi<TProviderType> {
        return this._odataApi;
    }

    /**
     * Reference to the Authentication Service used by the current repository
     */
    public Authentication: TAuthenticationServiceType;

    /**
     * Reference to the configuration used by the current repository
     */
    public readonly Config: SnConfigModel;

    /**
     * @param config The Repository's configuration entry
     * @param httpProviderType The type of the Http Provider, should extend HttpProviders.BaseHttpProvider
     * @param authentication The type of the Authentication Service to be used.
     */
    constructor(config: Partial<SnConfigModel>,
                _httpProviderType: { new(): TProviderType },
                authentication: { new(...args: any[]): TAuthenticationServiceType }) {

        this.HttpProviderRef = new _httpProviderType();
        this.Config = new SnConfigModel(config);

        // warning: Authentication constructor parameterization is not type-safe
        this.Authentication = new authentication(this);
        this._odataApi = new ODataApi(this);

        this.initUserUpdate();
    }

    /**
     * Gets the complete version information about the core product and the installed applications. This function is accessible only for administrators by default. You can learn more about the
     * subject in the SnAdmin article. You can read detailed description of the function result.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getVersionInfo = GetVersionInfo();
     * getVersionInfo.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetVersionInfo() {
        return this._odataApi.CreateCustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false }, {}, VersionInfo);
    }
    /**
     * Returns the list of all ContentTypes in the system.
     * @returns {Observable<ODataCollectionResponse<ContentTypes.ContentType>>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getAllContentTypes = GetAllContentTypes();
     * getAllContentTypes.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetAllContentTypes(): Observable<ContentType[]> {
        return this._odataApi.CreateCustomAction<ODataCollectionResponse<ContentType>>({
            name: 'GetAllContentTypes',
            path: '/Root',
            isAction: false
        },
            undefined,
            ODataCollectionResponse)
            .map((resp) => {
                return resp.d.results.map((c) => this.HandleLoadedContent<ContentType>(c));
            });
    }

    private _loadedContentReferenceCache: Map<number, SavedContent> = new Map();

    /**
     * Creates a Content instance that is loaded from the Repository. This method should be used only to instantiate content from payload received from the backend.
     * @param {T & ISavedContent} contentData An object with the Content data
     * @param {new(...args):T} contentType The Content type.
     * @returns {SavedContent<T>}
     * ```ts
     * var content = SenseNet.Content.HandleLoadedContent({ Id: 123456, Path: 'Root/Example', DisplayName: 'My folder' }, ContentTypes.Folder); // content is an instance of the Folder with the DisplayName 'My folder'
     * ```
     */
    public HandleLoadedContent<T extends IContent>(contentData: T & ISavedContent, contentType?: { new(...args: any[]): T }): SavedContent<T> {
        let instance: Content<T>;

        const realContentType = (contentType || (contentData.Type && (ContentTypes as any)[contentData.Type]) || Folder) as { new(...args: any[]): T };

        if (contentData.Id) {
            const cached = this._loadedContentReferenceCache.get(contentData.Id);
            if (cached) {
                instance = cached as Content<T>;
                // tslint:disable-next-line:no-string-literal
                instance['updateLastSavedFields'](contentData);
            } else {
                instance = ContentInternal.Create<T>(contentData, realContentType, this);
                this._loadedContentReferenceCache.set(contentData.Id, instance as SavedContent<T>);
            }

        } else {
            instance = ContentInternal.Create<T>(contentData, realContentType, this);
        }
        // tslint:disable-next-line:no-string-literal
        instance['_isSaved'] = true;
        this.Events.Trigger.ContentLoaded({ Content: instance as SavedContent });
        return instance as SavedContent<T>;
    }

    /**
     * Requests a Content by the given id.
     * @param idOrPath {number|string} Id of the requested Content.
     * @param version {string} A string containing the version of the requested Content.
     * @param options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<T>} Returns an RxJS observable that you can subscribe of in your code.
     * ```ts
     * var content = SenseNet.Content.Load(1234, { expand: 'Avatar' }, 'A.1', ContentTypes.User);
     * content
     *     .map(response => response.d)
     *     .subscribe({
     *        next: response => {
     *            //do something with the response
     *        },
     *        error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *        complete: () => console.log('done'),
     * })
     * ```
     */
    public Load<TContentType extends IContent = IContent>(
        idOrPath: string | number,
        odataOptions?: IODataParams<TContentType>,
        version?: string): Observable<SavedContent<TContentType>> {

        const contentURL = typeof idOrPath === 'string' ?
            ODataHelper.getContentURLbyPath(idOrPath) :
            ODataHelper.getContentUrlbyId(idOrPath);

        const odataRequestOptions = {
            path: contentURL,
            params: odataOptions
        };
        return this._odataApi.Get(odataRequestOptions)
            .share()
            .map((r) => {
                return this.HandleLoadedContent<TContentType>(r.d);
            });
    }

    /**
     * Shortcut to Content.Create. Creates a new, unsaved Content instance
     * @param {TContentType} options An object with the initial content data
     * @param {{ new(...args: any[]): TContentType }) => Content<TContentType>} contentType The type of the Content instance
     * @returns {Content<TContentType>} the created, unsaved content instance
     */
    public CreateContent: <TContentType extends IContent = IContent>(options: TContentType, contentType: { new(...args: any[]): TContentType }) => Content<TContentType> =
<TContentType>(options: TContentType, contentType: { new(...args: any[]): TContentType }) =>
        ContentInternal.Create<TContentType>(options, contentType, this)

    /**
     * Parses a Content instance from a stringified SerializedContent<T> instance
     * @param stringifiedContent The stringified SerializedContent<T>
     * @throws Error if the Content belongs to another Repository (based it's Origin)
     * @returns The loaded Content
     */
    public ParseContent<T extends Content = Content>(stringifiedContent: string): T {
        const serializedContent = ContentSerializer.Parse<T>(stringifiedContent);
        if (serializedContent.Origin.indexOf(this.ODataBaseUrl) !== 0) {
            throw new Error('Content belongs to a different Repository.');
        }
        return this.HandleLoadedContent(serializedContent.Data);
    }

    private readonly _staticContent = {
        VisitorUser: this.HandleLoadedContent<User>({
            Id: 6,
            DisplayName: 'Visitor',
            Domain: 'BuiltIn',
            Name: 'Visitor',
            Path: '/Root/IMS/BuiltIn/Portal/Visitor',
            LoginName: 'Visitor',
            Type: 'User'
        }),
        PortalRoot: this.HandleLoadedContent<PortalRoot>({
            Id: 2,
            Path: '/Root',
            Name: 'Root',
            DisplayName: 'Root',
            Type: 'PortalRoot'
        })
    };

    /**
     * Creates a Content Query on a Repositoy instance, at Root level (path e.g.: '/OData.svc/Root' )
     * Usage:
     * ```ts
     * const query = repository.CreateQuery(q => q.TypeIs(ContentTypes.Folder)
     *                        .Top(10))
     *
     * query.Exec().subscribe(res => {
     *      console.log('Folders count: ', res.Count);
     *      console.log('Folders: ', res.Result);
     * }
     * ```
     * @returns {Observable<QueryResult<T>>} An observable with the Query result.
     */
    public CreateQuery =
        <T extends IContent>(build: (first: QueryExpression<T>) => QuerySegment<T>, params?: IODataParams<T>) => new FinializedQuery<T>(build, this, 'Root', params)

    /**
     * Executes a DeleteBatch request to delete multiple content by a single request.
     *
     * Usage:
     * ```ts
     * repository.DeleteBatch([content1, content2...], true).subscribe(()=>{
     *  console.log('Contents deleted.')
     * })
     * ```
     *
     * @param {(SavedContent | number | string)[]} contentList An array of content to be deleted. Can be a content (with id and/or path), a Path or an Id
     * @param {boolean} permanently Option to delete the content permanently or just move it to the trash
     * @param {Content} rootContent The context node, the PortalRoot by default
     */
    public DeleteBatch(contentList: (SavedContent | number | string)[], permanent: boolean = false, rootContent = this._staticContent.PortalRoot) {
        const action = this._odataApi.CreateCustomAction<ODataBatchResponse>({
            name: 'DeleteBatch',
            path: rootContent.Path,
            isAction: true,
            requiredParams: ['paths']
        }, {
                data: {
                    paths: contentList.map((c) => c.Id || c.Path || c),
                    permanent
                }

            });

        action.subscribe((result) => {
            if (result.d.__count) {
                result.d.results.forEach((deleted) => {
                    this.Events.Trigger.ContentDeleted({ ContentData: deleted, Permanently: permanent });
                });

                result.d.errors.forEach((error) => {
                    this.Events.Trigger.ContentDeleteFailed({ Content: this.HandleLoadedContent(error.content), Error: error.error, Permanently: permanent });
                });
            }
        }, (error) => {
            // Whole batch operation failed
        });
        return action;
    }

    /**
     * Executes a MoveBatch request to move multiple content by a single request.
     *
     * Usage:
     * ```ts
     * repository.MoveBatch([content1, content2...], 'Root/NewFolder').subscribe(()=>{
     *  console.log('Contents moved.')
     * })
     * @param {(SavedContent | number | string)[]} contentList An array of content to move. Can be a content (with path) or a Path
     * @param {string} targetPath The target Path
     * @param {Content} rootContent The context node, the PortalRoot by default
     */
    public MoveBatch(contentList: (SavedContent  | string)[], targetPath: string, rootContent: Content = this._staticContent.PortalRoot) {
        const action = this._odataApi.CreateCustomAction<ODataBatchResponse<ISavedContent>>({
            name: 'MoveBatch',
            path: rootContent.Path,
            isAction: true,
            requiredParams: ['targetPath', 'paths']
        }, {
                data: [
                    {
                        paths: contentList.map((c) => c.Path || c),
                        targetPath
                    },

                ]
            });
        action.subscribe((result) => {
            if (result.d.__count) {
                result.d.results.forEach((moved) => {
                    this.Events.Trigger.ContentMoved({
                        From: (contentList.find((a) => a.Id === moved.Id) as SavedContent).Path,
                        Content: this.HandleLoadedContent(moved),
                        To: targetPath
                    });
                });

                result.d.errors.forEach((error) => {
                    this.Events.Trigger.ContentMoveFailed({
                        From: (contentList.find((a) => a.Id === error.content.Id) as SavedContent).Path,
                        Content: this.HandleLoadedContent(error.content),
                        To: targetPath,
                        Error: error.error
                    });
                });
            }
        }, (error) => {
            // Whole batch operation failed
        });
        return action;
    }

    /**
     * Executes a CopyBatch request to copy multiple content by a single request.
     *
     * Usage:
     * ```ts
     * repository.CopyBatch([content1, content2...], 'Root/NewFolder').subscribe(()=>{
     *  console.log('Contents copied.')
     * })
     * @param {(SavedContent | number | string)[]} contentList An array of content to copy. Can be a content (with path) or a Path
     * @param {string} targetPath The target Path
     * @param {Content} rootContent The context node, the PortalRoot by default
     */
    public CopyBatch(contentList: (SavedContent | string)[], targetPath: string, rootContent: Content = this._staticContent.PortalRoot) {
        const action = this._odataApi.CreateCustomAction<ODataBatchResponse>({
            name: 'CopyBatch',
            path: rootContent.Path,
            isAction: true,
            requiredParams: ['targetPath', 'paths']
        }, {
                data: [
                    {
                        paths: contentList.map((c) => c.Path || c),
                        targetPath
                    },

                ]
            });

        action.subscribe((result) => {
            if (result.d.__count) {
                result.d.results.forEach((created) => {
                    this.Events.Trigger.ContentCreated({ Content: this.HandleLoadedContent(created) });
                });

                result.d.errors.forEach((error) => {
                    this.Events.Trigger.ContentCreateFailed({ Content: error.content, Error: error.error });
                });
            }
        }, (error) => {
            // Whole batch operation failed
        });
        return action;
    }

    private readonly _currentUserSubject = new BehaviorSubject<SavedContent<User>>(this._staticContent.VisitorUser);
    public GetCurrentUser: () => Observable<SavedContent<User>> = () => {
        return this._currentUserSubject
            .distinctUntilChanged()
            .filter((u) => {
                const [userDomain, userName] = this.Authentication.CurrentUser.split('\\');
                return u.LoginName === userName && u.Domain === userDomain;
            });
    }

    private _lastKnownUserName = 'BuiltIn\\Visitor';
    private initUserUpdate() {
        this.Authentication.State.skipWhile((state) => state === Authentication.LoginState.Pending)
            .subscribe((state) => {
                if (state === LoginState.Unauthenticated) {
                    this._currentUserSubject.next(this._staticContent.VisitorUser);
                    this._lastKnownUserName = 'BuiltIn\\Visitor';
                } else {
                    if (this._lastKnownUserName !== this.Authentication.CurrentUser) {
                        const [userDomain, userName] = this.Authentication.CurrentUser.split('\\');
                        this.CreateQuery((q) => q.TypeIs<User>(User)
                            .And
                            .Equals('Domain', userDomain)
                            .And
                            .Equals('LoginName', userName)
                            .Top(1),
                            {
                                select: 'all'
                            }
                        ).Exec()
                            .subscribe((usr) => {
                                if (usr.Count === 1) {
                                    this._currentUserSubject.next(usr.Result[0]);
                                    this._lastKnownUserName = this.Authentication.CurrentUser;
                                } else {
                                    this._currentUserSubject.error(`Error getting current user: found ${usr.Count} user(s) with login name '${userName}' in domain '${userDomain}'`);
                                }
                            });
                    }

                }
            });
    }

    private _schemaCache: Map<string, Schema>;
    private _schemaStore: Schema[];

    public SetSchemas(newSchemas: Schema[]) {
        this._schemaStore = newSchemas;
        this._schemaCache = new Map<string, Schema>();
    }

    /**
     * Returns the Content Type Schema of the given Content Type;
     * @param type {string} The name of the Content Type;
     * @returns {Schemas.Schema}
     * ```ts
     * var genericContentSchema = SenseNet.Content.getSchema(Content);
     * ```
     */
    public GetSchema<TType extends IContent>(currentType: { new(...args: any[]): TType }): Schema {
        return this.GetSchemaByName(currentType.name);
    }

    public GetSchemaByName(schemaName: string) {
        if (!this._schemaCache) {
            this._schemaCache = new Map<string, Schema>();
        }

        if (!this._schemaStore) {
            this._schemaStore = SchemaStore.map((s) => s);
        }

        if (this._schemaCache.has(schemaName)) {
            return Object.assign({}, this._schemaCache.get(schemaName)) as Schema;
        }
        let schema = this._schemaStore.find((s) => s.ContentTypeName === schemaName) as Schema;
        if (!schema) {
            return this.GetSchema(GenericContent);
        }
        schema = Object.assign({}, schema);
        const parentSchema = schema.ParentTypeName && this.GetSchemaByName(schema.ParentTypeName);

        if (parentSchema) {
            schema.FieldSettings = [...schema.FieldSettings, ...parentSchema.FieldSettings];
        }
        this._schemaCache.set(schemaName, schema);
        return schema;
    }

}
