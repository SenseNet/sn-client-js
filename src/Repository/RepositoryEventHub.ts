/**
 * @module Repository
 */
/** */


import { SavedContent, IContent } from '../Content';
import { Subject, Observable } from '@reactivex/rxjs';
import { IODataParams, ICustomActionOptions } from '../ODataApi';
import { UploadProgressInfo } from './UploadModels';


export module EventModels {
    export class Created {
        /**
         * The created Content instance
         */
        Content: SavedContent;
    }

    export class CreateFailed {
        /**
         * The unsaved Content instance
         */
        Content: IContent;

        /**
         * The Error that caused the failure
         */
        Error: any
    }

    export class Modified {
        /**
         * The Content instance that has been modified.
         */
        Content: SavedContent;

        /**
         * The original fields
         */
        OriginalFields: IContent;
        /**
         * The Change data
         */
        Changes: IContent;
    }

    export class ModificationFailed {
        /**
         * The Content instance that has been failed to modify
         */
        Content: SavedContent;
        /**
         * The Fields that you've been tried to modify
         */
        Fields?: IContent;
        /**
         * The Error that caused the failure
         */
        Error: any
    }

    export class Loaded {
        /**
         * The Loaded content instance
         */
        Content: SavedContent;
    }

    export class Deleted {
        /**
         * The Content data that has been deleted
         */
        ContentData: IContent;
        /**
         * Indicates if the Content was deleted permanently or just moved to Trash
         */
        Permanently: boolean;
    }

    export class DeleteFailed {
        /**
         * The Content that you've tried to delete
         */
        Content: SavedContent;
        /**
         * Indicates if you've tried to delete the Content permanently or just tried to move it to the Trash
         */
        Permanently: boolean;

        /**
         * The Error that caused the failure
         */
        Error: any;
    }

    export class CustomActionExecuted<T extends IContent> {
        /**
         * The Action options
         */
        ActionOptions: ICustomActionOptions;
        /**
         * The additional OData parameters (optional)
         */
        ODataParams?: IODataParams<T>;
        /**
         * The Action result
         */
        Result: any
    }

    export class CustomActionFailed<T extends IContent> {
        /**
         * The Action options
         */
        ActionOptions: ICustomActionOptions;
        /**
         * The additional OData parameters (optional)
         */
        ODataParams?: IODataParams<T>;
        /**
         * The Type of the Result object
         */
        ResultType: { new(...args: any[]): Object };
        /**
         * The Error that caused the failure
         */
        Error: any
    }

    export class ContentMoved {
        /**
         * The From path (the original Parent's Path)
         */
        From: string;
        /**
         * The destination path (the new Parent's Path)
         */
        To: string;
        /**
         * The moved Content instance
         */
        Content: SavedContent;
    }

    export class ContentMoveFailed {
        /**
         * The From path (the original Parent's Path)
         */
        From: string;
        /**
         * The destination path (the new Parent's Path)
         */
        To: string;
        /**
         * The Content instance that you've tried to move
         */
        Content: SavedContent;
        /**
         * The Error that caused the failure
         */
        Error: any;
    }
}

export class RepositoryEventHub {
    private readonly _onContentCreatedSubject = new Subject<EventModels.Created>();
    private readonly _onContentCreateFailedSubject = new Subject<EventModels.CreateFailed>();
    private readonly _onContentModifiedSubject = new Subject<EventModels.Modified>();
    private readonly _onContentModificationFailedSubject = new Subject<EventModels.ModificationFailed>();
    private readonly _onContentLoadedSubject = new Subject<EventModels.Loaded>();
    private readonly _onContentDeletedSubject = new Subject<EventModels.Deleted>();
    private readonly _onContentDeleteFailedSubject = new Subject<EventModels.DeleteFailed>();
    private readonly _onCustomActionExecutedSubject = new Subject<EventModels.CustomActionExecuted<IContent>>();
    private readonly _onCustomActionFailedSubject = new Subject<EventModels.CustomActionFailed<IContent>>();
    private readonly _onContentMovedSubject = new Subject<EventModels.ContentMoved>()
    private readonly _onContentMoveFailedSubject = new Subject<EventModels.ContentMoveFailed>()
    private readonly _onUploadProgressSubject = new Subject<UploadProgressInfo<IContent>>()

    /**
     * Method group for triggering Repository events
     */
    public Trigger = {
        ContentCreated: (ev: EventModels.Created) => this._onContentCreatedSubject.next(ev),
        ContentCreateFailed: (ev: EventModels.CreateFailed) => this._onContentCreateFailedSubject.next(ev),

        ContentModified: (ev: EventModels.Modified) => this._onContentModifiedSubject.next(ev),
        ContentModificationFailed: (ev: EventModels.ModificationFailed) => this._onContentModificationFailedSubject.next(ev),

        ContentLoaded: (ev) => this._onContentLoadedSubject.next(ev),

        ContentDeleted: (ev: EventModels.Deleted) => this._onContentDeletedSubject.next(ev),
        ContentDeleteFailed: (ev: EventModels.DeleteFailed) => this._onContentDeleteFailedSubject.next(ev),

        CustomActionExecuted: (ev: EventModels.CustomActionExecuted<any>) => this._onCustomActionExecutedSubject.next(ev),
        CustomActionFailed: (ev: EventModels.CustomActionFailed<any>) => this._onCustomActionFailedSubject.next(ev),

        ContentMoved: (ev: EventModels.ContentMoved) => this._onContentMovedSubject.next(ev),
        ContentMoveFailed: (ev: EventModels.ContentMoveFailed) => this._onContentMoveFailedSubject.next(ev),

        UploadProgress: (ev: UploadProgressInfo<IContent>) => this._onUploadProgressSubject.next(ev)
    }

    /**
    * Triggered after a succesful Content creation
    */
    public OnContentCreated: Observable<EventModels.Created> = this._onContentCreatedSubject.asObservable();

    /**
     * Triggered after Content creation has been failed
     */
    public OnContentCreateFailed = this._onContentCreateFailedSubject.asObservable();

    /**
     * Triggered after modifying a Content
     */
    public OnContentModified = this._onContentModifiedSubject.asObservable();

    /**
     * Triggered when failed to modify a Content
     */
    public OnContentModificationFailed = this._onContentModificationFailedSubject.asObservable();

    /**
     * Triggered when a Content is loaded from the Repository
     */
    public OnContentLoaded = this._onContentLoadedSubject.asObservable();

    /**
     * Triggered after deleting a Content
     */
    public OnContentDeleted = this._onContentDeletedSubject.asObservable();

    /**
     * Triggered after deleting a content has been failed
     */
    public OnContentDeleteFailed = this._onContentDeleteFailedSubject.asObservable();


    /**
     * Triggered after moving a content to another location
     */
    public OnContentMoved = this._onContentMovedSubject.asObservable();

    /**
     * Triggered after moving a content has been failed
     */
    public OnContentMoveFailed = this._onContentMoveFailedSubject.asObservable();

    /**
     * Triggered after a custom OData Action has been executed
     */
    public OnCustomActionExecuted = this._onCustomActionExecutedSubject.asObservable();

    /**
     * Triggered after a custom OData Action has been failed
     */
    public OnCustomActionFailed = this._onCustomActionFailedSubject.asObservable();

    /**
     * Triggered on Upload progress
     */
    public OnUploadProgress = this._onUploadProgressSubject.asObservable();


}