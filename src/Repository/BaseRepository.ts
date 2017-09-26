/**
 * @module Repository
 */
/** */

import { Observable, BehaviorSubject } from '@reactivex/rxjs';
import { VersionInfo, RepositoryEventHub } from './';
import { BaseHttpProvider } from '../HttpProviders';
import { SnConfigModel } from '../Config/snconfigmodel';
import { IAuthenticationService, LoginState } from '../Authentication/';
import { ContentType } from '../ContentTypes';
import { Content, IContentOptions, SavedContent } from '../Content';
import { ODataApi, ODataCollectionResponse, IODataParams } from '../ODataApi';
import { ODataHelper, Authentication, ContentTypes } from '../SN';
import { ContentSerializer } from '../ContentSerializer';
import { QuerySegment, QueryExpression, FinializedQuery } from '../Query';

/**
 *
 */
export class BaseRepository<TProviderType extends BaseHttpProvider = BaseHttpProvider,
    TAuthenticationServiceType extends IAuthenticationService = IAuthenticationService> {
    private odataApi: ODataApi<TProviderType>;
    public readonly Events: RepositoryEventHub = new RepositoryEventHub();


    /**
     * Returns the Repository's base OData Url (e.g.: https://demo.sensenet.com/odata.svc)
     */
    public get ODataBaseUrl() {
        return ODataHelper.joinPaths(this.Config.RepositoryUrl, this.Config.ODataToken);
    }

    /**
     * Public endpoint for making Ajax calls to the Repository
     * @param {string} path The Path for the call
     * @param {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'} method The method type
     * @param {{ new (...args): T }} returnsType The expected return type
     * @param {any} body The post body (optional)
     * @returns {Observable<T>} An observable, which will be updated with the response.
     */
    public Ajax<T>(path: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', returnsType?: { new(...args: any[]): T }, body?: any): Observable<T> {
        this.Authentication.CheckForUpdate();
        return this.Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
                if (!returnsType) {
                    returnsType = Object as { new(...args: any[]): any };
                }
                return this.httpProviderRef.Ajax<T>(returnsType,
                    {
                        url: ODataHelper.joinPaths(this.ODataBaseUrl, path),
                        method: method,
                        body: body,
                        responseType: 'json',
                    });
            });
    }

    /**
     * Reference to the Http Provider used by the current repository
     */
    public readonly httpProviderRef: TProviderType;

    /**
     * Reference to the OData API used by the current repository
     */
    public get Content(): ODataApi<TProviderType> {
        console.warn('The property repository.Content is deprecated and will be removed in the near future. Use repositoy.GetODataApi() instead.')
        return this.odataApi;
    };

    public GetODataApi(): ODataApi<TProviderType> {
        return this.odataApi;
    }

    /**
     * Reference to the Authentication Service used by the current repository
     */
    public readonly Authentication: TAuthenticationServiceType;

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
        private readonly httpProviderType: { new(): TProviderType },
        authentication: { new(...args: any[]): TAuthenticationServiceType }) {

        this.httpProviderRef = new httpProviderType();
        this.Config = new SnConfigModel(config);

        //warning: Authentication constructor parameterization is not type-safe
        this.Authentication = new authentication(this.httpProviderRef, this.Config.RepositoryUrl, this.Config.JwtTokenKeyTemplate, this.Config.JwtTokenPersist);
        this.odataApi = new ODataApi(this.httpProviderType, this);

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
        return this.odataApi.CreateCustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false }, {}, VersionInfo);
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
        return this.odataApi.CreateCustomAction<ODataCollectionResponse<ContentType>>({
            name: 'GetAllContentTypes',
            path: '/Root',
            isAction: false
        },
            undefined,
            ODataCollectionResponse)
            .map(resp => {
                return resp.d.results.map(c => this.HandleLoadedContent(c as any, ContentType));
            });
    }


    private _loadedContentReferenceCache: SavedContent<Content>[] = [];

    /**
     * Creates a Content instance that is loaded from the Repository. This method should be used only to instantiate content from payload received from the backend.
     * @param type {string} The Content will be a copy of the given type.
     * @param options {SenseNet.IContentOptions} Optional list of fields and values.
     * @returns {SenseNet.Content}
     * ```ts
     * var content = SenseNet.Content.HandleLoadedContent('Folder', { DisplayName: 'My folder' }); // content is an instance of the Folder with the DisplayName 'My folder'
     * ```
     */
    public HandleLoadedContent<T extends Content, O extends T['options']>(opt: O & {Id: number, Path: string}, contentType?: { new(...args: any[]): T }): SavedContent<T> {
        let instance: T;
        const realContentType = (contentType || (opt.Type && (ContentTypes as any)[opt.Type]) || Content) as { new(...args: any[]): T };

        if (opt.Id) {
            if (this._loadedContentReferenceCache[opt.Id]) {
                instance = this._loadedContentReferenceCache[opt.Id] as T;
                instance['UpdateLastSavedFields'](opt);
            } else {
                instance = Content.Create(opt, realContentType, this);
                this._loadedContentReferenceCache[opt.Id] = instance as SavedContent<T>;
            }

        } else {
            instance = Content.Create(opt, realContentType, this);
        }
        instance['_isSaved'] = true;
        this.Events.Trigger.ContentLoaded({ Content: instance });
        return instance as  T & {Id: number, Path: string};
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
    public Load<TContentType extends Content>(
        idOrPath: string | number,
        odataOptions?: IODataParams<TContentType>,
        returnsType?: { new(...args: any[]): TContentType },
        version?: string): Observable<TContentType> {

        let contentURL = typeof idOrPath === 'string' ?
            ODataHelper.getContentURLbyPath(idOrPath) :
            ODataHelper.getContentUrlbyId(idOrPath);

        let odataRequestOptions = {
            path: contentURL,
            params: odataOptions
        };
        const returnType = returnsType || Content as { new(...args: any[]): any };

        return this.odataApi.Get(odataRequestOptions, returnType)
            .share()
            .map(r => {
                return this.HandleLoadedContent(r.d, returnType);
            });
    }

    /**
     * Shortcut to Content.Create
     */
    CreateContent: <T extends Content, K extends T['options']>(options: K, contentType: { new(...args: any[]): T }) => T =
    (options, contentType) => Content.Create(options, contentType, this);

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
        return this.HandleLoadedContent(serializedContent.Data as any)
    }

    private readonly _staticContent = {
        VisitorUser: this.HandleLoadedContent({
            Id: 6,
            DisplayName: 'Visitor',
            Domain: 'BuiltIn',
            Name: 'Visitor',
            Path: '/Root/IMS/BuiltIn/Portal/Visitor',
            LoginName: 'Visitor'
        }, ContentTypes.User),
        PortalRoot: this.HandleLoadedContent({
            Id: 2,
            Path: '/Root',
            Name: 'Root',
            DisplayName: 'Root'
        }, ContentTypes.PortalRoot)
    }

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
    CreateQuery: <T extends Content>(build: (first: QueryExpression<Content>) => QuerySegment<T>, params?: IODataParams<T>) => FinializedQuery<T>
    = (build, params) => new FinializedQuery(build, this, 'Root', params);

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
     * @param {Content[]} contentList An array of content to be deleted
     * @param {boolean} permanently Option to delete the content permanently or just move it to the trash
     * @param {Content} rootContent The context node, the PortalRoot by default
     */
    public DeleteBatch(contentList: (SavedContent<Content<IContentOptions>>)[], permanently: boolean = false, rootContent = this._staticContent.PortalRoot) {
        const contentFields = contentList.map(c => c.GetFields());
        const action = this.odataApi.CreateCustomAction({
            name: 'DeleteBatch',
            path: rootContent.Path,
            isAction: true,
            requiredParams: ['paths']
        }, {
            data: [
                { 'paths': contentList.map(c => c.Id || c.Path).filter(c => c !== undefined) },
                { 'permanently': permanently }
            ]
        });

        action.subscribe(result => {
            contentFields.forEach(contentData => {
                this.Events.Trigger.ContentDeleted({ContentData: contentData, Permanently: permanently})
            });
        }, error => {
            contentList.forEach(content => {
                this.Events.Trigger.ContentDeleteFailed({Content: content, Error: error, Permanently: permanently})
            })
        });
        return action;
    };

    /**
    * Executes a MoveBatch request to move multiple content by a single request.
     * 
     * Usage:
     * ```ts
     * repository.MoveBatch([content1, content2...], 'Root/NewFolder').subscribe(()=>{
     *  console.log('Contents moved.')
     * })
     * @param {Content[]} contentList An array of content to move
     * @param {string} targetPath The target Path
     * @param {Content} rootContent The context node, the PortalRoot by default
     */
    MoveBatch(contentList: SavedContent<Content>[], targetPath: string, rootContent: Content = this._staticContent.PortalRoot){
        const contentFields = contentList.map(c => c.GetFields()) as SavedContent<any>;
        const action = this.odataApi.CreateCustomAction({
            name: 'MoveBatch',
            path: rootContent.Path,
            isAction: true,
            requiredParams: ['targetPath', 'paths']
        }, {
            data: [
                {
                    'paths': contentList.map(c => c.Path).filter(c => c !== undefined),
                    targetPath
                },
                
            ]
        });

        action.subscribe(result => {
            contentFields.forEach((contentData, index) => {
                this.Events.Trigger.ContentMoved({From: contentData.Path, Content: contentList[index], To: targetPath})
            });
        }, error => {
            contentList.forEach((contentData, index) => {
                this.Events.Trigger.ContentMoveFailed({From: contentData.Path, Content: contentList[index], To: targetPath, Error: error})
            })
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
     * @param {Content[]} contentList An array of content to copy
     * @param {string} targetPath The target Path
     * @param {Content} rootContent The context node, the PortalRoot by default
     */
    CopyBatch(contentList: SavedContent<Content>[], targetPath: string, rootContent: Content = this._staticContent.PortalRoot){
        const contentFields = contentList.map(c => c.GetFields());
        const action = this.odataApi.CreateCustomAction({
            name: 'CopyBatch',
            path: rootContent.Path,
            isAction: true,
            requiredParams: ['targetPath', 'paths']
        }, {
            data: [
                {
                    'paths': contentList.map(c => c.Path).filter(c => c !== undefined),
                    targetPath
                },
                
            ]
        });

        action.subscribe(result => {
            contentFields.forEach((contentData, index) => {
                // ToDo: Update from CopyBatch response
                const created = this.HandleLoadedContent(contentData as any);
                created.Path = ODataHelper.joinPaths(targetPath, created.Name || '');
                (created as any).Id = undefined;
                this.Events.Trigger.ContentCreated({Content: created});
            });
        }, error => {
            contentList.forEach((contentData, index) => {
                this.Events.Trigger.ContentCreateFailed({Error: error, Content: contentData})
            })
        });
        return action;
    }


    private readonly currentUserSubject = new BehaviorSubject<ContentTypes.User>(this._staticContent.VisitorUser);
    public GetCurrentUser: () => Observable<ContentTypes.User> = () => {
        return this.currentUserSubject
            .distinctUntilChanged()
            .filter(u => {
                const [userDomain, userName] = this.Authentication.CurrentUser.split('\\');
                return u.LoginName === userName && u.Domain === userDomain
            });
    }

    private _lastKnownUserName = 'BuiltIn\\Visitor';
    private initUserUpdate() {
        this.Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .subscribe(state => {
                if (state === LoginState.Unauthenticated) {
                    this.currentUserSubject.next(this._staticContent.VisitorUser);
                    this._lastKnownUserName = 'BuiltIn\\Visitor';
                } else {
                    if (this._lastKnownUserName !== this.Authentication.CurrentUser) {
                        const [userDomain, userName] = this.Authentication.CurrentUser.split('\\');
                        this.CreateQuery(q => q.TypeIs(ContentTypes.User)
                            .And
                            .Equals('Domain', userDomain)
                            .And
                            .Equals('LoginName', userName)
                            .Top(1),
                            {
                                select: 'all'
                            }
                        ).Exec()
                            .subscribe(usr => {
                                if (usr.Count === 1) {
                                    this.currentUserSubject.next(usr.Result[0]);
                                    this._lastKnownUserName = this.Authentication.CurrentUser;
                                } else {
                                    this.currentUserSubject.error(`Error getting current user: found multiple users with login name '${userName}' in domain '${userDomain}'`)
                                }
                            })
                    }

                }
            })
    }

}
