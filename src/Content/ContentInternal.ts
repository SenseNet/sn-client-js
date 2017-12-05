/**
 * @module Content
 */ /** */

 import { Observable } from 'rxjs/Observable';
 import { BinaryField } from '../BinaryField';
 import { ContentListReferenceField, ContentReferenceField } from '../ContentReferences';
 import { ContentSerializer } from '../ContentSerializer';
 import { ContentType, Group, User, Workspace } from '../ContentTypes';
 import { BaseHttpProvider } from '../HttpProviders/BaseHttpProvider';
 import { IODataParams, ODataApi, ODataFieldParameter } from '../ODataApi';
 import { FinializedQuery, QueryExpression, QuerySegment } from '../Query';
 import { ActionModel } from '../Repository/ActionModel';
 import { BaseRepository } from '../Repository/BaseRepository';
 import { UploadFileOptions, UploadFromEventOptions, UploadProgressInfo, UploadTextOptions } from '../Repository/UploadModels';
 import { ContentTypes, Enums, FieldSettings, ODataHelper, Schemas, Security } from '../SN';
 import { IContent } from './IContent';
 import { ISavedContent } from './ISavedContent';
 import { Content, isSavedContent, SavedContent } from './Types';

 /**
  * Internal class representation of a Content instance.
  */
 export class ContentInternal<T extends IContent = IContent> {

    private get _odata(): ODataApi<BaseHttpProvider> {
        return this._repository.GetODataApi();
    }

    private _type: string = this._contentType.name;
    /**
     * Type of the Content, e.g.: 'Task' or 'User'
     */
    public get Type(): string {
        return this._type;
    }
    public set Type(newType: string) {
        this._type = newType;
    }

    public Id?: number;
    public Path?: string;
    public Name?: string;
    public ParentId?: number;
    public Versions: ContentListReferenceField<T>;
    public Workspace: ContentReferenceField<Workspace>;
    public Owner: ContentReferenceField<User>;
    public CreatedBy: ContentReferenceField<User>;
    public ModifiedBy: ContentReferenceField<User>;
    public CheckedOutTo: ContentReferenceField<User>;
    public EffectiveAllowedChildTypes: ContentListReferenceField<ContentType>;
    public AllowedChildTypes: ContentListReferenceField<ContentType>;

    private _isSaved: boolean = false;

    /**
     * Indicates if the content is saved into the Repository or is a new Content
     */
    public get IsSaved(): boolean {
        return this._isSaved;
    }

    /**
     * Returns the assigned Repository instance
     */
    public GetRepository(): BaseRepository {
        return this._repository;
    }

    private _lastSavedFields: T = {} as T;
    protected updateLastSavedFields(newFields: T) {
        Object.assign(this._lastSavedFields, newFields);
        this._isSaved = true;
        Object.assign(this, newFields);
        this.updateReferenceFields();
    }

    /**
     * Returns a list about the fields with their values, as they are saved into the Repository
     */
    public get SavedFields(): T {
        return !this.IsSaved ? {} as T : Object.assign({}, this._lastSavedFields);
    }

    /**
     * Returns a list about the changed fields and their new values
     */
    public GetChanges(): T {
        const changedFields: T = {} as T;

        // tslint:disable-next-line:forin
        for (const field in this.GetFields()) {
            const currentField = this[field as any];
            if (currentField !== this._lastSavedFields[field]) {

                if (currentField instanceof ContentReferenceField) {
                    if (currentField.IsDirty) {
                        changedFields[field] = currentField.GetValue();
                    }
                } else if (currentField instanceof ContentListReferenceField) {
                    if (currentField.IsDirty) {
                        changedFields[field] = currentField.GetValue();
                    }
                } else if (currentField instanceof BinaryField) {
                    /* skip, binaries cannot be compared */
                } else {
                    changedFields[field] = this[field as any];
                }
            }
        }
        return changedFields;
    }

    /**
     * Returns all Fields based on the Schema, that can be used for API calls (e.g. POSTing a new content)
     */
    public GetFields(skipEmpties?: boolean): T {
        const fieldsToPost = {} as T;
        this.GetSchema().FieldSettings.forEach((s) => {
            let value = this[s.Name];
            if (this[s.Name] && this[s.Name].GetValue) {
                value = this[s.Name].GetValue();
            }

            if (this[s.Name] && (this[s.Name] as BinaryField<any>).GetDownloadUrl) {
                value = (this[s.Name] as BinaryField<any>).GetDownloadUrl();
            }

            if ((!skipEmpties && value !== undefined) || (skipEmpties && value)) {
                fieldsToPost[s.Name] = value;
            }
        });
        return fieldsToPost;
    }

    /**
     * Shows if the content has been changed on client-side since the last load
     */
    public get IsDirty(): boolean {
        return Object.keys(this.GetChanges()).length > 0;
    }

    private _isOperationInProgress: boolean = false;

    /**
     * Shows if there are any operation in progress
     */
    public get IsOperationInProgress() {
        return this._isOperationInProgress;
    }

    /**
     * Indicates that all required fields are filled
     */
    public get IsValid(): boolean {
        const schema = this.GetSchema();
        const missings = schema.FieldSettings
            .filter((s) => s.Compulsory && !(this as any)[s.Name]);

        return missings.length === 0;
    }

    private _fieldHandlerCache: (ContentListReferenceField<Content> | ContentReferenceField<Content>)[] = [];
    private updateReferenceFields() {
        const referenceSettings: FieldSettings.ReferenceFieldSetting[] = this.GetSchema().FieldSettings.filter((f) => FieldSettings.isFieldSettingOfType(f, FieldSettings.ReferenceFieldSetting));
        referenceSettings.push(...[{ Type: 'ReferenceFieldSetting', Name: 'EffectiveAllowedChildTypes', AllowMultiple: true }, { Type: 'ReferenceFieldSetting', Name: 'AllowedChildTypes', AllowMultiple: true }]);
        referenceSettings.forEach((f) => {

            if (!this._fieldHandlerCache[f.Name]) {
                this._fieldHandlerCache[f.Name] = f.AllowMultiple ? new ContentListReferenceField(this[f.Name], f, this, this._repository) : new ContentReferenceField(this[f.Name], f, this, this._repository);
            } else {
                this._fieldHandlerCache[f.Name].HandleLoaded(this[f.Name]);
            }
            this[f.Name] = this._fieldHandlerCache[f.Name];
        });
        const binarySettings: FieldSettings.BinaryFieldSetting[] = this.GetSchema().FieldSettings.filter((f) => FieldSettings.isFieldSettingOfType(f, FieldSettings.BinaryFieldSetting));

        binarySettings.forEach((s) => {
            if (!(this[s.Name] instanceof BinaryField)) {
                const mediaResourceObject = this[s.Name];
                this[s.Name] = new BinaryField<T>(mediaResourceObject, this as SavedContent, s);
            }
        });
    }

    private tryGetAsSaved() {
        if (isSavedContent<T>(this)) {
            return this as SavedContent<T>;
        }
        throw new Error('Contnet is not saved.');
    }

    /**
     * @constructs Content
     * @param {IContentOptions} options An object with the required content data
     * @param {IRepository} repository The Repository instance
     */
    constructor(_options: T, private _repository: BaseRepository, private readonly _contentType: {new(...args): T}) {
        Object.assign(this, _options);
        Object.assign(this._lastSavedFields, _options);
        this.updateReferenceFields();
    }

    /**
     * Deletes a content item from the Content Repository (by default the Content is moved to the Trash).
     * @param permanently {boolean} Determines if the Content should be deleted permanently or moved to the Trash.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.Delete(false)
     *      subscribe( response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error));
     * ```
     */
    public Delete(permanently?: boolean): Observable<void> {
        if (this.Id) {
            this._isOperationInProgress = true;
            const fields = this.GetFields();
            const observable = this._odata.Delete(this.Id, permanently);
            observable.subscribe(() => {
                this._repository.Events.Trigger.ContentDeleted({
                    ContentData: fields,
                    Permanently: permanently || false
                });
                this._isOperationInProgress = false;
            }, (err) => {
                this._repository.Events.Trigger.ContentDeleteFailed({
                    Content: this.tryGetAsSaved(),
                    Permanently: permanently || false,
                    Error: err
                });
                this._isOperationInProgress = false;
            });
            return observable;
        }
        return Observable.of(undefined);
    }
    /**
     * Modifies the DisplayName or the DisplayName and the Name of a content item in the Content Repository.
     * @param {string} newDisplayNameNew display name of the content.
     * @param {string} newName New name of the content.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.Rename('New Title')
     *        .subscribe(response => {
     *            console.log(response);
     *        }, error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public Rename(newDisplayName: string, newName?: string): Observable<SavedContent<T>> {
        this._isOperationInProgress = true;
        if (!this.IsSaved) {
            throw new Error('Content is not saved. You can rename only saved content!');
        }

        const fields: T = {} as T;
        if (newDisplayName) {
            fields.DisplayName = newDisplayName;
        }
        if (newName) {
            fields.Name = newName;
        }
        return this.Save(fields);
    }

    private saveContentInternal(fields?: T, override?: boolean): Observable<SavedContent<T>> {
        const originalFields = this.GetFields();
        /** Fields Save logic */
        if (fields) {
            if (!this.Id) {
                const err = new Error('Content Id not present');
                this._repository.Events.Trigger.ContentModificationFailed({
                    Content: this as any,
                    Fields: fields,
                    Error: err
                });
                throw err;
            }

            if (!this.IsSaved) {
                const err = new Error('The Content is not saved to the Repository, Save it before updating.');
                this._repository.Events.Trigger.ContentModificationFailed({
                    Content: this.tryGetAsSaved(),
                    Fields: fields,
                    Error: err
                });
                throw err;
            }
            if (override) {
                const request = this._odata.Put<T>(this.Id, fields)
                    .map((newFields) => {
                        this.updateLastSavedFields(newFields);
                        this._repository.Events.Trigger.ContentModified({
                            Content: this.tryGetAsSaved(),
                            OriginalFields: originalFields,
                            Changes: fields
                        });
                        return this.tryGetAsSaved();
                    }).share();
                request.subscribe(() => { /**/ }, (err) => {
                    this._repository.Events.Trigger.ContentModificationFailed({ Content: this.tryGetAsSaved(), Fields: fields, Error: err });
                });
                return request;
            } else {
                const request = this._odata.Patch<T>(this.Id, fields)
                    .map((newFields) => {
                        this.updateLastSavedFields(newFields);
                        this._repository.Events.Trigger.ContentModified({ Content: this.tryGetAsSaved(), OriginalFields: originalFields, Changes: fields });
                        return this.tryGetAsSaved();
                    }).share();

                request.subscribe(() => { /**/ }, (err) => {
                    this._repository.Events.Trigger.ContentModificationFailed({ Content: this.tryGetAsSaved(), Fields: fields, Error: err });
                });
                return request;

            }
        }

        if (!this.IsSaved) {
            // Content not saved, verify Path and POST it
            if (!this.Path) {
                const err = new Error('Cannot create content without a valid Path specified');
                this._repository.Events.Trigger.ContentCreateFailed({ Content: this as IContent, Error: err });
                throw err;
            }

            const request = this._odata.Post<T>(this.Path, Object.assign({Type: this.Type}, this.GetFields(true)))
                .map((resp) => {
                    if (!resp.Id) {
                        throw Error('Error: No content Id in response!');
                    }
                    this._isOperationInProgress = false;
                    this.updateLastSavedFields(resp);
                    this._repository.HandleLoadedContent(this.tryGetAsSaved());
                    this._isSaved = true;
                    return this.tryGetAsSaved();
                }).share();

            request.subscribe((c) => {
                this._repository.Events.Trigger.ContentCreated({ Content: c });
            }, (err) => {
                this._repository.Events.Trigger.ContentCreateFailed({ Content: this as IContent, Error: err });
            });
            return request;

        } else {
            // Content saved
            if (!this.IsDirty) {
                // No changes, no request
                return Observable.of(this.tryGetAsSaved());
            } else {
                if (!this.Id) {
                    throw new Error('Content Id not present');
                }
                const changes = this.GetChanges();
                // Patch content
                const request = this._odata.Patch<T>(this.Id, changes)
                    .map((resp) => {
                        this.updateLastSavedFields(resp);
                        return this.tryGetAsSaved();
                    }).share();
                request.subscribe(() => {
                    this._repository.Events.Trigger.ContentModified({ Content: this.tryGetAsSaved(), Changes: changes, OriginalFields: originalFields });
                }, (err) => {
                    this._repository.Events.Trigger.ContentModificationFailed({ Content: this.tryGetAsSaved(), Fields: changes, Error: err });

                });
                return request;
            }
        }
    }

    /**
     * Saves the content with its given modified fields to the Content Repository.
     * @param {T?} fields Optional - The fields to be saved. If not provided, the changed fields will be saved
     * @param {boolean? } override Determines whether clear the fields that are not given (true) or leave them and modify only the given fields (false).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     *  //Set Index field's value to 2 and clear the rest of the fields.
     * content.Save({'Index':2}, true)
     *        .subscribe(response => {
     *            console.log(response);
     *        },
     *        error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     *
     * // Update the Description field only
     * content.Description = 'New description text';
     * content.Save() //Set Index field's value to 2 and clear the rest of the fields.
     *        .subscribe(response => {
     *            console.log(response);
     *        },
     *        error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public Save(fields?: T, override?: boolean): Observable<SavedContent<T>> {

        this._isOperationInProgress = true;
        const saveObservable = this.saveContentInternal(fields, override).share();
        saveObservable.subscribe((success) => {
            success._isOperationInProgress = false;
            this._isOperationInProgress = false;
        }, (err) => {
            this._isOperationInProgress = false;
        });
        return saveObservable;
    }

    /**
     * Reloads every field and reference of the content, based on the specified View from the Schema
     * @throws if the Content is not saved yet or no Id or Path is provided
     * @param {'edit' | 'view'} actionName
     * @returns {Observable<this>} An observable whitch will be updated with the reloaded Content
     */
    public Reload(actionName?: 'edit' | 'view'): Observable<SavedContent<T>> {
        if (!this.IsSaved) {
            throw new Error('Content has to be saved to reload');
        }
        if (!this.Id && !this.Path) {
            throw new Error('Content Id or Path has to be provided');
        }

        let selectFields: ODataFieldParameter<T> | 'all' = 'all';
        let expandFields: ODataFieldParameter<T> | undefined;
        if (actionName) {
            const fieldSettings = this.GetSchema().FieldSettings.filter((f) => {
                return actionName === 'edit' && f.VisibleEdit
                    || actionName === 'view' && f.VisibleBrowse;
            });
            selectFields = fieldSettings.map((f) => f.Name) as ODataFieldParameter<T>;
            expandFields = fieldSettings.filter((f) => FieldSettings.isFieldSettingOfType(f, FieldSettings.ReferenceFieldSetting))
                .map((f) => f.Name) as ODataFieldParameter<T>;
        }

        return this._repository.Load(this.Id || this.Path as any, {
            select: selectFields,
            expand: expandFields
        } as IODataParams<T>);
    }

    /**
     * Reloads the specified fields and references of the content
     * @param {(keyof this)[]} fields List of the fields to be loaded
     * @throws if the Content is not saved yet or no Id or Path is provided
     * @returns {Observable<this>} An observable whitch will be updated with the Content
     */
    public ReloadFields(...fields: (keyof T)[]): Observable<SavedContent<T>> {

        if (!this.IsSaved) {
            throw new Error('Content has to be saved to reload');
        }
        if (!this.Id && !this.Path) {
            throw new Error('Content Id or Path has to be provided');
        }

        const toExpand = this.GetSchema().FieldSettings.filter((f) => fields.indexOf(f.Name as any) >= 0 && FieldSettings.isFieldSettingOfType(f, FieldSettings.ReferenceFieldSetting))
            .map((f) => f.Name) as ODataFieldParameter<T>;
        return this._repository.Load<T>(this.Id || this.Path as any, {
            select: fields,
            expand: toExpand
        } as IODataParams<T>);
    }

    /**
     * Method that returns actions of a content.
     * @param {string} scenario
     * @returns {Observable<ActionModel[]>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.GetActions('ListItem')
     *   .subscribe(response => {
     *        console.log(response);
     *    },
     *    error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
     public Actions(scenario?: string): Observable<ActionModel[]> {
         // tslint:disable-next-line:no-console
         console.warn(`Method 'content.Action() is deprecated' and will be removed. Please use content.GetActions() instead`);
         return this.GetActions(scenario);
     }

    public GetActions(scenario?: string): Observable<ActionModel[]> {
        return this._odata.Get({
            path: ODataHelper.joinPaths(this.GetFullPath(), 'Actions'),
            params: {
                scenario
            }
        })
            .map((resp) => {
                return (resp.d as any).Actions as ActionModel[];
            });
    }
    /**
     * Method that returns allowed child type list of a content.
     * @param {IODataParams<ContentType>} options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<SavedContent<ContentType>[]>} Returns an RxJS observable with the content types of the allowed child types
     * ```
     * content.GetAllowedChildTypes()
     *   .subscribe({
     *       response => {
     *         console.log(response);
     *       },
     *       error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public GetAllowedChildTypes(options?: IODataParams<ContentType>): Observable<SavedContent<ContentType>[]> {
        return this.AllowedChildTypes.GetContent(options);
    }
    /**
     * Method that returns effective allowed child type list of a content.
     * @param {IODataParams<ContentType>} options Object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.GetEffectiveAllowedChildTypes()
     *   .subscribe({
     *       response => {
     *         console.log(response);
     *       },
     *       error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public GetEffectiveAllowedChildTypes(options?: IODataParams<ContentType>): Observable<(ContentType & ISavedContent)[]> {
        return this.EffectiveAllowedChildTypes.GetContent(options);
    }
    /**
     * Method that returns owner of a content.
     * @param {IODataParams<ContentType>} options Object with the possible ODATA parameters like select, expand, etc.
     * @returns {ObservableSavedContent<User>} an observable that will be updated with the Owner user.
     * ```
     * content.GetOwner({select: ['FullName']})
     *      .subscribe(
     *          response => {
     *              console.log(response);
     *          },
     *          error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public GetOwner(options?: IODataParams<ContentTypes.User>): Observable<SavedContent<User>> {
        return this.Owner.GetContent(options);
    }

    /**
     * Method that returns creator of a content.
     * @param {IODataParams<User>} options JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<SavedContent<User>>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.Creator({select: ['FullName']})
     *      .subscribe(
     *          response => {
     *              console.log(response);
     *          },
     *          error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public Creator(options?: IODataParams<User>): Observable<SavedContent<User>> {
        return this.CreatedBy.GetContent(options);
    }
    /**
     * Method that returns last modifier of a content.
     * @param {IODataParams<User>} options Object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<SavedContent<User>>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.Modifier({select: ['FullName']})
     *      .subscribe(
     *          response => {
     *              console.log(response);
     *          },
     *          error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public Modifier(options?: IODataParams<User>): Observable<SavedContent<User>> {
        return this.ModifiedBy.GetContent(options);
    }
    /**
     * Method that returns the user who checked-out the content.
     * @param {IODataParams<User>} options Object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<SavedContent<User>>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * content.CheckedOutBy({select: ['FullName']})
     *      .subscribe(
     *          response => {
     *              console.log(response);
     *          },
     *          error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value));
     * ```
     */
    public CheckedOutBy(options?: IODataParams<User>): Observable<SavedContent<User>> {
        return this.CheckedOutTo.GetContent(options);
    }
    /**
     * Method that returns the children of a content.
     *
     * Calls the method [FetchContent]{@link ODataApi.FetchContent} with the content id and the given OData options.
     * If you leave the options undefined only the Id and the Type fields will be in the response. These two fields are always the part of the reponse whether they're added or not to the options
     * as selectable.
     * @param { IODataParams<Content> } options Object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<SavedContent[]>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let children = content.Children({select: ['DisplayName']});
     * children.subscribe({
     *  next: response => {
     *      console.log(response);
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Children(options?: IODataParams<Content>): Observable<SavedContent[]> {
        if (!this.Path) {
            throw new Error('No path specified');
        }

        return this._odata.Fetch({
            path: this.Path,
            params: options
        }).map((resp) => {
            return resp.d.results.map((c) => this._repository.HandleLoadedContent(c));
        });
    }
    /**
     * Returns the list of versions.
     *
     * Calls the method [GetContent]{@link ODataApi.GetContent} with the content id and the given OData options.
     * If you leave the options undefined only the Id and the Type fields will be in the response. These two fields are always the part of the reponse whether they're added or not to the options
     * as selectable.
     * @param {IODataParams<T>} options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable<SavedContent<T>[]>} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let versions = content.GetVersions();
     * versions.subscribe({
     *  next: response => {
     *      console.log(response);
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetVersions(options?: IODataParams<T>): Observable<SavedContent<T>[]> {
        return this.Versions.GetContent(options);
    }
    /**
     * Returns the current Workspace.
     *
     * Calls the method [GetContent]{@link ODataApi.GetContent} with the content id and the given OData options.
     * If you leave the options undefined only the Id and the Type fields will be in the response. These two fields are always the part of the reponse whether they're added or not to the options
     * as selectable.
     * @param {IODataParams<Workspace>} options Object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let currentWorkspace = content.GetWorkspace();
     * currentWorkspace.subscribe({
     *  next: response => {
     *      console.log(response);
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetWorkspace(options?: IODataParams<Workspace>): Observable<SavedContent<Workspace>> {
        return this.Workspace.GetContent(options);
    }
    /**
     * Checkouts a content item in the Content Repository.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let checkoutContent = content.Checkout();
     * checkoutContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Checkout() {
        return this._odata.CreateCustomAction({ name: 'CheckOut', id: this.Id, isAction: true });
    }
    /**
     * Checkins a content item in the Content Repository.
     * @params checkInComments {string=}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let checkinContent = content.Checkin();
     * checkinContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public CheckIn(checkInComments?: string) {
        let action;
        (typeof checkInComments !== 'undefined') ?
            action = { name: 'CheckIn', id: this.Id, isAction: true, params: ['checkInComments'] } :
            action = { name: 'CheckIn', id: this.Id, isAction: true };
        return this._odata.CreateCustomAction(action, { data: { checkInComments: checkInComments ? checkInComments : '' } });
    }
    /**
     * Performs an undo check out operation on a content item in the Content Repository.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let undoCheckoutContent = content.UndoCheckout();
     * undoCheckoutContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public UndoCheckout() {
        return this._odata.CreateCustomAction({ name: 'UndoCheckOut', id: this.Id, isAction: true });
    }
    /**
     * Performs a force undo check out operation on a content item in the Content Repository.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let forceUndoCheckoutContent = content.ForceUndoCheckout();
     * forceUndoCheckoutContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public ForceUndoCheckout() {
        return this._odata.CreateCustomAction({ name: 'ForceUndoCheckout', id: this.Id, isAction: true });
    }
    /**
     * Performs an approve operation on a content, the equivalent of calling Approve() on the Content instance in .NET. Also checks whether the content handler of the subject content
     * inherits GenericContent (otherwise it does not support this operation). This action has no parameters.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let approveContent = content.Approve();
     * approveContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Approve() {
        return this._odata.CreateCustomAction({ name: 'Approve', id: this.Id, isAction: true });
    }
    /**
     * Performs a reject operation on a content, the equivalent of calling Reject() on the Content instance in .NET. Also checks whether the content handler
     * of the subject content inherits GenericContent (otherwise it does not support this operation). The reject reason can be supplied in an optional parameter called rejectReason.
     * @params rejectReason {string}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let rejectContent = content.Reject();
     * rejectContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Reject(rejectReason?: string) {
        return this._odata.CreateCustomAction({ name: 'Reject', id: this.Id, isAction: true, params: ['rejectReason'] },
            { data: { rejectReason: rejectReason ? rejectReason : '' } });
    }
    /**
     * Performs a publish operation on a content, the equivalent of calling Publish() on the Content instance in .NET. Also checks whether the content handler of the subject content
     * inherits GenericContent (otherwise it does not support this operation). This action has no parameters.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let publishContent = content.Publish();
     * publishContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Publish() {
        return this._odata.CreateCustomAction({ name: 'Publish', id: this.Id, isAction: true });
    }
    /**
     * Restores an old version of the content. Also checks whether the content handler of the subject content inherits GenericContent (otherwise it does not support this operation).
     * This action has a single parameter called version where the caller can specify which old version to restore.
     * @params version {string} Old version to restore.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let restoreVersion = content.RestoreVersion();
     * restoreVersion.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RestoreVersion(version: string) {
        return this._odata.CreateCustomAction({ name: 'Publish', id: this.Id, isAction: true, requiredParams: ['version'] }, { data: { version: version ? version : '' } });
    }
    /**
     * Restores a deleted content from the Trash. You can call this action only on a TrashBag content that contains the deleted content itself.
     * @params destination {string=} Path of the target container, where the deleted content will be restored. If it is not provided, the system uses the original path stored on the trash bag content.
     * @params newname {boolean=} whether to generate a new name automatically if a content with the same name already exists in the desired container (e.g. mydocument(1).docx).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let restoreContent = content.Restore();
     * restoreContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Restore(destination?: string, newname?: boolean) {
        return this._odata.CreateCustomAction(
            { name: 'Restore', id: this.Id, isAction: true, params: ['destination', 'newname'] }, {
                data: {
                    destination: destination ? destination : '',
                    newname: newname ? newname : ''
                }
            });
    }
    /**
     * Copies one content to another container by a given path.
     * @params Path {string}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let moveContent = content.MoveTo('/Root/Sites/Default_Site/NewsDemo/Internal');
     * moveContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public MoveTo(toPath: string) {

        if (!this.IsSaved) {
            throw new Error('Content not saved!');
        }

        if (!this.Path) {
            throw new Error('No Path provided for the content');
        }

        if (!this.Name) {
            throw new Error('No Name provided for the content');
        }

        if (toPath.indexOf(this.Path) === 0) {
            throw new Error('Content cannot be moved below itself');
        }

        const request = this._odata.CreateCustomAction({ name: 'MoveTo', id: this.Id, isAction: true, requiredParams: ['targetPath'] }
            , { data: { targetPath: toPath } });

        const fromPath = this.Path;
        const newPath = ODataHelper.joinPaths(toPath, this.Name);

        request.subscribe((result) => {
            this.Path = newPath;
            this.updateLastSavedFields({ Path: newPath } as T);
            this._repository.Events.Trigger.ContentMoved({
                Content: this.tryGetAsSaved(),
                From: fromPath,
                To: toPath
            });
        }, (err) => {
            this._repository.Events.Trigger.ContentMoveFailed({
                Content: this.tryGetAsSaved(),
                From: fromPath,
                To: toPath,
                Error: err
            });
        });
        return request;
    }
    /**
     * Copies one content to another container by a given path.
     * @params Path {string}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let copyContent = content.CopyTo('/Root/Sites/Default_Site/NewsDemo/Internal');
     * copyContent.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public CopyTo(path: string) {
        return this._odata.CreateCustomAction({ name: 'CopyTo', id: this.Id, isAction: true, requiredParams: ['targetPath'] },
            { data: { targetPath: path } });
    }
    /**
     * Adds the given content types to the Allowed content Type list.
     * @params contentTypes {string[]} A list of the case sensitive content type names.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let setAllowedChildTypes = content.AddAllowedChildTypes(['Folder','ContentList']]);
     * setAllowedChildTypes.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public AddAllowedChildTypes(contentTypes: string[]) {
        return this._odata.CreateCustomAction({ name: 'AddAllowedChildTypes', id: this.Id, isAction: true, requiredParams: ['contentTypes'] }, { data: { contentTypes } });
    }
    /**
     * Removes the given content types from the Allowed content Type list. If the list after removing and the list on the matching CTD are the same, the local list will be removed.
     * @params contentTypes {string[]} A list of the case sensitive content type names.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let removeAllowedChildTypes = content.RemoveAllowedChildTypes(['Folder','ContentList']]);
     * removeAllowedChildTypes.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RemoveAllowedChildTypes(contentTypes: string[]) {
        return this._odata.CreateCustomAction({ name: 'RemoveAllowedChildTypes', id: this.Id, isAction: true, requiredParams: ['contentTypes'] },
            { data: { contentTypes } });
    }

    /**
     * Returns the Content Type Schema of the Content.
     * @returns {Schemas.Schema} Array of fieldsettings.
     * ```ts
     * let schema = SenseNet.Content.GetSchema(Content);
     * ```
     */
    public GetSchema(): Schemas.Schema {
        return this._repository.GetSchema(this._contentType);
    }

    /**
     * Creates a Content object by the given type and options Object that hold the field values.
     * @param {T} options Object for initial fields and values
     * @param {new(...args: any[]): T} newContent The Content Type definition
     * @param {BaseRepository} repository the Repository instance
     * @returns {SenseNet.Content}
     * ```ts
     * var content = SenseNet.Content.Create({ DisplayName: 'My folder' }, ContentTypes.Folder); // content is an instance of the ContentTypes.Folder with the DisplayName 'My folder'
     * ```
     */
    public static Create<T extends IContent = IContent>(options: T, newContent: {new(...args: any[]): T}, repository: BaseRepository): Content<T> {
        const created = new ContentInternal(options, repository, newContent) as Content<T>;
        if (newContent) {
            created.Type = newContent.name;
        }
        return created;
    }

    /**
     * Sets permissions on the requested content. You can add or remove permissions for one ore more users or groups using this action or even break/unbreak permission inheritance.
     * @param identities {Security.PermissionRequestBody[]} Permission entry list: array of permission entry objects, containing an identity Id or Path and one or more permission
     * settings for permission types (see examples below).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let myPermissionRequestBody = new Security.PermissionRequestBody[
     *       {identity:"/Root/IMS/BuiltIn/Portal/Visitor", OpenMinor:"allow", Save:"deny"},
     *       {identity:"/Root/IMS/BuiltIn/Portal/Creators", Custom16:"A", Custom17:"1"}
     * ];
     * let setPermissions = content.SetPermissions(myPermissionRequestBody);
     * setPermissions.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */

    /**
     * Sets permissions on the requested content. You can add or remove permissions for one ore more users or groups using this action or even break/unbreak permission inheritance.
     * @param inheritance {Security.Inheritance} inheritance: break or unbreak
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let setPermissions = content.SetPermissions({inheritance:"break"});
     * setPermissions.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public SetPermissions(arg: Security.Inheritance | Security.PermissionRequestBody[]) {
        if (arg instanceof Array) {
            return this._odata.CreateCustomAction({ name: 'SetPermissions', id: this.Id, isAction: true, requiredParams: ['entryList'] },
                { data: { entryList: arg } });
        } else {
            return this._odata.CreateCustomAction({ name: 'SetPermissions', path: this.Path, isAction: true, requiredParams: ['inheritance'] },
                { data: { inheritance: arg } });
        }
    }
    /**
     * Gets permissions for the requested content. If no identity is given, all the permission entries will be returned.
     *
     * Required permissions to call this action: See permissions.
     * @params identity {string=} path of the identity whose permissions must be returned (user, group or organizational unit)
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getPermissions = content.GetPermission('/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members');
     * getPermissions.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetPermission(identity?: string) {
        return this._odata.CreateCustomAction({ name: 'GetPermission', id: this.Id, isAction: false, params: ['identity'] },
            { data: { identity: identity ? identity : '' } });
    }
    /**
     * Gets if the given user (or if it is not given than the current user) has the specified permissions for the requested content.
     *
     * Required permissions to call this action: See permissions.
     * @params permissions {string[]} list of permission names (e.g. Open, Save)
     * @params user {string} [CurrentUser] path of the user
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let hasPermission = content.HasPermission(['AddNew', 'Save']);
     * hasPermission.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public HasPermission(permissions: ('See' | 'Preview' | 'PreviewWithoutWatermark' | 'PreviewWithoutRedaction' | 'Open' |
        'OpenMinor' | 'Save' | 'Publish' | 'ForceCheckin' | 'AddNew' |
        'Approve' | 'Delete' | 'RecallOldVersion' | 'DeleteOldVersion' | 'SeePermissions' |
        'SetPermissions' | 'RunApplication' | 'ManageListsAndWorkspaces' | 'TakeOwnership' |
        'Custom01' | 'Custom02' | 'Custom03' | 'Custom04' | 'Custom05' | 'Custom06' | 'Custom07' | 'Custom08' | 'Custom09' |
        'Custom10' | 'Custom11' | 'Custom12' | 'Custom13' | 'Custom14' | 'Custom15' | 'Custom16' | 'Custom17' |
        'Custom18' | 'Custom19' | 'Custom20' | 'Custom21' | 'Custom22' | 'Custom23' | 'Custom24' | 'Custom25' |
        'Custom26' | 'Custom27' | 'Custom28' | 'Custom29' | 'Custom30' | 'Custom31' | 'Custom32')[],
                         identity?: User | Group): Observable<boolean> {

        let params = `permissions=${permissions.join(',')}`;
        if (identity && identity.Path) {
            params += `&identity=${identity.Path}`;
        }
        return this._repository.Ajax<boolean>(`${this.GetFullPath()}/HasPermission?${params}`, 'GET');
    }
    /**
     * Users who have TakeOwnership permission for the current content can modify the Owner of this content.
     * @params userOrGroup {string} path or the id of the new owner (that can be a Group or a User). The input parameter also supports empty or null string,
     * in this case the new owner will be the current user.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let takeOwnerShip = content.TakeOwnership({'userGroup':'/Root/IMS/BuiltIn/Portal/Admin'});
     * takeOwnerShip.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public TakeOwnership(userOrGroup?: string) {
        return this._odata.CreateCustomAction({ name: 'TakeOwnership', id: this.Id, isAction: true, params: ['userOrGroup'] },
            { data: { userOrGroup: userOrGroup ? userOrGroup : '' } });
    }
    /**
     * Creates or modifies a {Query} content. Use this action instead of creating query content directly using the basic OData create method, because query content can be saved
     * under a workspace or to the user's profile as a private query.
     * @params query {string} Query text, composed in Query Builder or written manually (see Query syntax for more details).
     * @params displayName {string} Desired display name for the query content. Can be empty.
     * @params queryType {ComplexTypes.SavedQueryType} [Public] Type of the saved query. If an empty value is posted, the default is Public.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let saveQuery = content.SaveQuery({
     *    'query':'DisplayName:Africa',
     *    'displayName': 'My query',
     *    'queryType': 'Private'
     * });
     * saveQuery.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public SaveQuery(query: string, displayName: string, queryType: Enums.QueryType) {
        return this._odata.CreateCustomAction({ name: 'SaveQuery', id: this.Id, isAction: true, requiredParams: ['query', 'displayName', 'queryType'] },
            { data: { query, displayName: displayName ? displayName : '', queryType } });
    }
    /**
     * Gets Query content that are relevant in the current context. The result set will contain two types of content:
     * * Public queries: query content in the Queries content list of the current workspace.
     * * Private queries: query content in the Queries content list under the profile of the current user
     * @params onlyPublic {boolean} if true, only public queries are returned from the current workspace.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getQueries = content.GetQueries(true);
     * getQueries.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetQueries(onlyPublic: boolean = true) {
        return this._odata.CreateCustomAction({ name: 'GetQueries', id: this.Id, isAction: false, noCache: true, requiredParams: ['onlyPublic'] },
            { data: { onlyPublic } });
    }
    /**
     * Closes a Multistep saving operation and sets the saving state of a content to Finalized. Can be invoked only on content that are not already finalized.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let finalize = content.FinalizeContent(true);
     * finalize.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public Finalize() {
        return this._odata.CreateCustomAction({ name: 'FinalizeContent', id: this.Id, isAction: true });
    }
    /**
     * Lets administrators take over the lock of a checked out document from another user. A new locker user can be provided using the 'user' parameter (user path or id as string).
     * If left empty, the current user will take the lock.
     * @params userId {number=}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let takeLockOver = content.TakeLockOver(true);
     * takeLockOver.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public TakeLockOver(userId?: number) {
        return this._odata.CreateCustomAction({ name: 'TakeLockOver', id: this.Id, isAction: true, params: ['user'] },
            { data: { user: userId ? userId : '' } });
    }
    /**
     * These actions perform an indexing operation on a single content or a whole subtree.
     * @params recursive {boolean=}
     * @params rebuildLevel {number=}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let rebuildIndex = content.RebuildIndex(true);
     * rebuildIndex.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RebuildIndex(recursive?: boolean, rebuildLevel?: number) {
        return this._odata.CreateCustomAction({ name: 'RebuildIndex', id: this.Id, isAction: true, params: ['recursive', 'rebuildLevel'] }, { data: { recursive: recursive ? recursive : false, rebuildLevel: rebuildLevel ? rebuildLevel : 0 } });
    }
    /**
     * Performs a full reindex operation on the content and the whole subtree.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let rebuildIndexSubtree = content.RebuildIndexSubtree();
     * rebuildIndexSubtree.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RebuildIndexSubtree() {
        return this._odata.CreateCustomAction({ name: 'RebuildIndexSubtree', id: this.Id, isAction: true });
    }
    /**
     * Refreshes the index document of the content and the whole subtree using the already existing index data stored in the database.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let refreshIndexSubtree = content.RefreshIndexSubtree();
     * refreshIndexSubtree.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RefreshIndexSubtree() {
        return this._odata.CreateCustomAction({ name: 'RefreshIndexSubtree', id: this.Id, isAction: true });
    }
    /**
     * Returns the number of currently existing preview images. If necessary, it can make sure that all preview images are generated and available for a document.
     * @ params generateMissing {boolean=}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let checkPreviews = content.CheckPreviews(true);
     * checkPreviews.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public CheckPreviews(generateMissing?: boolean) {
        return this._odata.CreateCustomAction({ name: 'CheckPreviews', id: this.Id, isAction: true, params: ['generateMissing'] },
            { data: { generateMissing: generateMissing ? generateMissing : false } });
    }
    /**
     * It clears all existing preview images for a document and starts a task for generating new ones. This can be useful in case the preview status of a document has been set to 'error'
     * before for some reason and you need to force the system to re-generate preview images.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let regeneratePreviews = content.RegeneratePreviews();
     * regeneratePreviews.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RegeneratePreviews() {
        return this._odata.CreateCustomAction({ name: 'RegeneratePreviews', id: this.Id, isAction: true });
    }
    /**
     * Returns the number of pages in a document. If there is no information about page count on the content, it starts a preview generation task to determine the page count.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getPageCount = content.GetPageCount();
     * getPageCount.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetPageCount() {
        return this._odata.CreateCustomAction({ name: 'GetPageCount', id: this.Id, isAction: true });
    }
    /**
     * Gets information about a preview image generated for a specific page in a document. It returns with the path and the dimensions (width/height) of the image. If the image does not exist yet,
     * it returns with an empty object but it starts a background task to generate that image if a valid page count number was determined'’’. If page count is -1 you need to call GetPageCount action
     * first. It is OK to call this method periodically for checking if an image is already available.
     * @params page {number}
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let previewAvailable = content.PreviewAvailable(2);
     * previewAvailable.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public PreviewAvailable(page: number) {
        return this._odata.CreateCustomAction({ name: 'PreviewAvailable', id: this.Id, isAction: false, requiredParams: ['page'] },
            { data: { page } });
    }
    /**
     * Returns the full list of preview images as content items. This method synchronously generates all missing preview images.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getPreviewImagesForOData = content.GetPreviewImagesForOData();
     * getPreviewImagesForOData.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    // tslint:disable-next-line:naming-convention
    public GetPreviewImagesForOData() {
        return this._odata.CreateCustomAction({ name: 'GetPreviewImagesForOData', id: this.Id, isAction: false });
    }
    /**
     * Returns the list of existing preview images (only the first consecutive batch) as objects with a few information (image path, dimensions). It does not generate any new images.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getExistingPreviewImagesForOData = content.GetExistingPreviewImagesForOData();
     * getExistingPreviewImagesForOData.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    // tslint:disable-next-line:naming-convention
    public GetExistingPreviewImagesForOData() {
        return this._odata.CreateCustomAction({ name: 'GetExistingPreviewImagesForOData', id: this.Id, isAction: false });
    }
    /**
     * Returns the list of the AllowedChildTypes which are set on the current Content.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getAllowedChildTypesFromCTD = content.GetAllowedChildTypesFromCTD();
     * getAllowedChildTypesFromCTD.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    // tslint:disable-next-line:naming-convention
    public GetAllowedChildTypesFromCTD() {
        return this._odata.CreateCustomAction({ name: 'GetAllowedChildTypesFromCTD', id: this.Id, isAction: false });
    }
    /**
     * Identity list that contains every users/groups/organizational units that have any permission setting (according to permission level) in the subtree of the context content.
     * @params level {Security.PermissionLevel}  The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     * @params kind {Security.IdentityKind} The value can be: All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getRelatedIdentities = content.GetRelatedIdentities("AllowedOrDenied", "Groups");
     * getRelatedIdentities.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetRelatedIdentities(level: Security.PermissionLevel, kind: Security.IdentityKind) {
        return this._odata.CreateCustomAction({ name: 'GetRelatedIdentities', id: this.Id, isAction: true, requiredParams: ['level', 'kind'] },
            { data: { level, kind } });
    }
    /**
     * Permission list of the selected identity with the count of related content. 0 indicates that this permission has no related content so the GUI does not have to display it as a tree node
     * @params level {Security.PermissionLevel}  The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     * @params explicitOnly {boolean} The value "true" is required because "false" is not implemented yet.
     * @params member {string} Fully qualified path of the selected identity (e.g. /Root/IMS/BuiltIn/Portal/Visitor).
     * @params includedTypes {string[]} An item can increment the counters if its type or any ancestor type is found in the 'includedTypes'. Null means filtering off. If the array is empty, there
     * is no element that increases the counters. This filter can reduce the execution speed dramatically so do not use if it is possible.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getRelatedPermissions = content.GetRelatedPermissions("AllowedOrDenied", true, "/Root/IMS/BuiltIn/Portal/EveryOne", null);
     * getRelatedPermissions.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetRelatedPermissions(level: Security.PermissionLevel, explicitOnly: boolean, member: string, includedTypes?: string[]) {
        return this._odata.CreateCustomAction({ name: 'GetRelatedPermissions', id: this.Id, isAction: true, requiredParams: ['level', 'explicitOnly', 'member', 'includedTypes'] },
            { data: { level, explicitOnly, member, includedTypes } });
    }
    /**
     * Content list that have explicite/effective permission setting for the selected user in the current subtree.
     * @params level {Security.PermissionLevel}  The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     * @params explicitOnly {boolean} The value "true" is required because "false" is not implemented yet.
     * @params member {string} Fully qualified path of the selected identity (e.g. /Root/IMS/BuiltIn/Portal/Visitor).
     * @params permissions {string[]} related permission list. Item names are case sensitive. In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getRelatedItems = content.GetRelatedItems("AllowedOrDenied", true, "/Root/IMS/BuiltIn/Portal/EveryOne", ["RunApplication"]);
     * getRelatedItems.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetRelatedItems(level: Security.PermissionLevel, explicitOnly: boolean, member: string, permissions: string[]) {
        return this._odata.CreateCustomAction({ name: 'GetRelatedItems', id: this.Id, isAction: true, requiredParams: ['level', 'explicitOnly', 'member', 'permissions'] },
            { data: { level, explicitOnly, member, permissions } });
    }
    /**
     * This structure is designed for getting tree of content that are permitted or denied for groups/organizational units in the selected subtree. The result content are not in a paged list:
     * they are organized in a tree.
     * @params level {Security.PermissionLevel}  The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     * @params kind {Security.IdentityKind} The value can be: All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits
     * @params permissions {string[]} related permission list. Item names are case sensitive. In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getRelatedIdentitiesByPermissions = content.GetRelatedIdentitiesByPermissions("AllowedOrDenied", "Groups", ["RunApplication"]);
     * getRelatedIdentitiesByPermissions.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetRelatedIdentitiesByPermissions(level: Security.PermissionLevel, kind: Security.IdentityKind, permissions: string[]) {
        return this._odata.CreateCustomAction({ name: 'GetRelatedIdentitiesByPermissions', id: this.Id, isAction: true, requiredParams: ['level', 'kind', 'permissions'] },
            { data: { level, kind, permissions } });
    }
    /**
     * This structure is designed for getting tree of content that are permitted or denied for groups/organizational units in the selected subtree. The result content are not in a paged list:
     * they are organized in a tree.
     * @params level {Security.PermissionLevel}  The value is "AllowedOrDenied". "Allowed" or "Denied" are not implemented yet.
     * @params member {string} Fully qualified path of the selected identity (e.g. /Root/IMS/BuiltIn/Portal/Visitor).
     * @params permissions {string[]} related permission list. Item names are case sensitive. In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getRelatedItemsOneLevel = content.GetRelatedItemsOneLevel("AllowedOrDenied", "/Root/IMS/BuiltIn/Portal/Visitor", ["Open", "RunApplication"]);
     * getRelatedItemsOneLevel.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetRelatedItemsOneLevel(level: Security.PermissionLevel, member: string, permissions: string[]) {
        return this._odata.CreateCustomAction({ name: 'GetRelatedItemsOneLevel', id: this.Id, isAction: true, requiredParams: ['level', 'member', 'permissions'] },
            { data: { level, member, permissions } });
    }
    /**
     * Returns a content collection that represents users who have enough permissions to a requested resource. The permissions effect on the user and through direct or indirect group membership
     * too. The function parameter is a permission name list that must contain at least one item.
     * @params permissions {string[]} related permission list. Item names are case sensitive. In most cases only one item is used (e.g. "See" or "Save" etc.) but you can pass any permission
     * type name (e.g. ["Open","Save","Custom02"]).
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getAllowedUsers = content.GetAllowedUsers(["Open", "RunApplication"]);
     * getAllowedUsers.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetAllowedUsers(permissions: string[]) {
        return this._odata.CreateCustomAction({ name: 'GetAllowedUsers', id: this.Id, isAction: true, requiredParams: ['permissions'] },
            { data: { permissions } });
    }
    /**
     * Returns a content collection that represents groups where the given user or group is member directly or indirectly. This function can be used only on a resource content that is
     * Group or User or any inherited type. If the value of the "directOnly" parameter is false, all indirect members are listed.
     * @params directOnly {boolean} If the value of the "directOnly" parameter is false, all indirect members are listed.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let getParentGroups = content.GetParentGroups(["Open", "RunApplication"]);
     * getParentGroups.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public GetParentGroups(directOnly: boolean) {
        return this._odata.CreateCustomAction({ name: 'GetParentGroups', id: this.Id, isAction: true, requiredParams: ['directOnly'] },
            { data: { directOnly } });
    }
    /**
     * Administrators can add new members to a group using this action. The list of new members can be provided using the 'contentIds' parameter (list of user or group ids).
     * @params contentIds {number[]} List of the member ids.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let addMembers = content.AddMembers([ 123, 456, 789 ]);
     * addMembers.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public AddMembers(contentIds: number[]) {
        return this._odata.CreateCustomAction({ name: 'AddMembers', id: this.Id, isAction: true, requiredParams: ['contentIds'] },
            { data: { contentIds } });
    }
    /**
     * Administrators can remove members from a group using this action. The list of removable members can be provided using the 'contentIds' parameter (list of user or group ids).
     * @params contentIds {number[]} List of the member ids.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let removeMembers = content.RemoveMembers([ 123, 456, 789 ]);
     * removeMembers.subscribe({
     *  next: response => {
     *      console.log('success');
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public RemoveMembers(contentIds: number[]) {
        return this._odata.CreateCustomAction({ name: 'RemoveMembers', id: this.Id, isAction: true, requiredParams: ['contentIds'] },
            { data: { contentIds } });
    }

    /**
     * Uploads a File into a level below the specified Content
     * @param {UploadFileOptions<T>} uploadOptions The options to the Upload request
     */
    public UploadFile<TFileType extends IContent>(uploadOptions: UploadFileOptions<TFileType>): Observable<UploadProgressInfo<TFileType>> {
        return this._repository.UploadFile({
            ...uploadOptions,
            Parent: (this.tryGetAsSaved())
        });
    }

    /**
     * Creates and uploads a text file from a string value into a level below the specified Content
     * @param {UploadTextOptions<T>} uploadOptions The options to the Upload request
     */
    public UploadText<TFileType extends IContent>(uploadOptions: UploadTextOptions<TFileType>): Observable<UploadProgressInfo<TFileType>> {
        const Parent = this.tryGetAsSaved();
        return this._repository.UploadTextAsFile<TFileType>({
            ...uploadOptions,
            Parent
        });
    }

    /**
     * Uploads multiple files / folders from a single Drop event into a level below a specified content
     * @param {UploadFromEventOptions<T>} uploadOptions The options to the Upload request
     */
    public UploadFromDropEvent<TFileType extends Content>(uploadOptions: UploadFromEventOptions<TFileType>) {
        const Parent = this.tryGetAsSaved();
        return this._repository.UploadFromDropEvent({
            ...uploadOptions,
            Parent
        });
    }

    /**
     * Returns the parent content's Path in a Collection format
     * e.g. for the 'Child' content '/Root/Parent/Child' you will get '/Root/Parent'
     * @throws if no Path is specified or the content is not saved yet.
     */
    public get ParentPath(): string {
        if (!this.Path) {
            throw Error('No Path provided for the Content');
        }

        if (!this.IsSaved) {
            throw Error('Content has to be saved to retrieve the ParentPath');
        }
        const segments = this.Path.split('/');
        segments.pop();
        return segments.join('/');
    }

    /**
     * Returns the parent content's Path in an Entity format
     * e.g. for the 'Child' content '/Root/Parent/Child' you will get '/Root/('Parent')'
     */
    public get ParentContentPath(): string {
        return ODataHelper.getContentURLbyPath(this.ParentPath);
    }

    /**
     * Indicates if the current Content is the parent a specified Content
     */
    public IsParentOf(childContent: SavedContent): boolean {
        return this._repository === childContent.GetRepository() && this.IsSaved &&
            (this.Id && childContent.ParentId === this.Id
                || childContent.ParentPath === this.Path);
    }

    /**
     * Indicates if the current Content is a child of a specified Content
     */
    public IsChildOf(parentContent: SavedContent): boolean {
        return this._repository === parentContent.GetRepository() && parentContent.IsSaved &&
            (parentContent.Id && this.ParentId === parentContent.Id
                || this.ParentPath === parentContent.Path);
    }

    /**
     * Indicates if the current Content is an ancestor of a specified Content
     */
    public IsAncestorOf(descendantContent: SavedContent): boolean {
        if (!descendantContent.Path || !this.Path) {
            throw Error('No path provided');
        }
        return this._repository === descendantContent.GetRepository() && this.IsSaved && descendantContent.Path.indexOf(this.Path + '/') === 0;
    }

    /**
     * Indicates if the current Content is a descendant of a specified Content
     */
    public IsDescendantOf(ancestorContent: SavedContent): boolean {
        if (!ancestorContent.Path || !this.Path) {
            throw Error('No path provided');
        }
        return this._repository === ancestorContent.GetRepository() && ancestorContent.IsSaved && this.Path.indexOf(ancestorContent.Path + '/') === 0;
    }

    /**
     * Returns the full Path for the current content
     * @throws if the Content is not saved yet, or hasn't got an Id or Path defined
     */
    public GetFullPath(): string {
        if (!this.IsSaved) {
            throw new Error('Content has to be saved to get the full Path');
        }
        if (this.Id) {
            return ODataHelper.getContentUrlbyId(this.Id);
        } else if (this.Path) {
            return ODataHelper.getContentURLbyPath(this.Path);
        } else {
            throw new Error('Content Id or Path has to be provided to get the full Path');
        }
    }

    /**
     * Creates a stringified value from the current Content
     * @returns {string} The stringified value
     */
    public Stringify: () => string = () => ContentSerializer.Stringify<T>(this.tryGetAsSaved());

    /**
     * Creates a content query on a Content instance.
     * Usage:
     * ```ts
     * const query = content.CreateQuery(q => q.TypeIs(ContentTypes.Folder)
     *                        .Top(10))
     * query.Exec().subscribe(res => {
     *      console.log('Folders count: ', res.Count);
     *      console.log('Folders: ', res.Result);
     * }
     *
     * ```
     * @returns {Observable<QueryResult<T>>} An observable with the Query result.
     */
    public CreateQuery: <TContentType extends IContent = IContent>(build: (first: QueryExpression<Content>) => QuerySegment<TContentType>, params?: IODataParams<TContentType>) => FinializedQuery<TContentType>
    = (build, params) => {
        if (!this.Path) {
            throw new Error('No Content path provided for querying');
        }
        return new FinializedQuery(build, this._repository, this.Path, params);
    }
}
