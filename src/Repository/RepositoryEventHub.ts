/**
 * @module Repository
 */
/** */


import { Content, IContentOptions } from '../Content';
import { Subject, Observable } from '@reactivex/rxjs';
import { IODataParams, ICustomActionOptions } from '../ODataApi';


export module EventModels {
    export class Created {
        /**
         * The created Content instance
         */
        Content: Content;
    }

    export class CreateFailed {
        /**
         * The unsaved Content instance
         */
        Content: Content;

        /**
         * The Error that caused the failure
         */
        Error: any
    }

    export class Modified {
        /**
         * The Content instance that has been modified.
         */
        Content: Content;
        
        /**
         * The original fields
         */
        OriginalFields: IContentOptions;
        /**
         * The Change data
         */
        Changes: IContentOptions;
    }

    export class ModificationFailed {
        /**
         * The Content instance that has been failed to modify
         */
        Content: Content;
        /**
         * The Fields that you've been tried to modify
         */
        Fields?: IContentOptions;
        /**
         * The Error that caused the failure
         */
        Error: any
    }

    export class Loaded {
        /**
         * The Loaded content instance
         */
        Content: Content
    }

    export class Deleted {
        /**
         * The Content data that has been deleted
         */
        ContentData: IContentOptions;
        /**
         * Indicates if the Content was deleted permanently or just moved to Trash
         */
        Permanently: boolean;
    }

    export class DeleteFailed {
        /**
         * The Content that you've tried to delete
         */
        Content: Content;
        /**
         * Indicates if you've tried to delete the Content permanently or just tried to move it to the Trash
         */        
        Permanently: boolean;
        
        /**
         * The Error that caused the failure
         */
        Error: any;
    }

    export class CustomActionExecuted {
        /**
         * The Action options
         */        
        ActionOptions: ICustomActionOptions;
        /**
         * The additional OData parameters (optional)
         */        
        ODataParams?: IODataParams;
        /**
         * The Action result
         */
        Result: any
    }

    export class CustomActionFailed {
        /**
         * The Action options
         */
        ActionOptions: ICustomActionOptions;
        /**
         * The additional OData parameters (optional)
         */
        ODataParams?: IODataParams;
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
        Content: Content;
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
        Content: Content;
        /**
         * The Error that caused the failure
         */
        Error: any;
    }
}

export class RepositoryEventHub {
    private readonly onContentCreatedSubject = new Subject<EventModels.Created>();
    private readonly onContentCreateFailedSubject = new Subject<EventModels.CreateFailed>();
    private readonly onContentModifiedSubject = new Subject<EventModels.Modified>();
    private readonly onContentModificationFailedSubject = new Subject<EventModels.ModificationFailed>();
    private readonly onContentLoadedSubject = new Subject<EventModels.Loaded>();
    private readonly onContentDeletedSubject = new Subject<EventModels.Deleted>();
    private readonly onContentDeleteFailedSubject = new Subject<EventModels.DeleteFailed>();
    private readonly onCustomActionExecutedSubject = new Subject<EventModels.CustomActionExecuted>();
    private readonly onCustomActionFailedSubject = new Subject<EventModels.CustomActionFailed>();
    private readonly onContentMovedSubject = new Subject<EventModels.ContentMoved>()
    private readonly onContentMoveFailedSubject = new Subject<EventModels.ContentMoveFailed>()

    /**
     * Method group for triggering Repository events
     */
    public Trigger = {
        ContentCreated: (ev) => this.onContentCreatedSubject.next(ev),
        ContentCreateFailed: (ev) => this.onContentCreateFailedSubject.next(ev),

        ContentModified: (ev) => this.onContentModifiedSubject.next(ev),
        ContentModificationFailed: (ev) => this.onContentModificationFailedSubject.next(ev),

        ContentLoaded: (ev) => this.onContentLoadedSubject.next(ev),

        ContentDeleted: (ev) => this.onContentDeletedSubject.next(ev),
        ContentDeleteFailed: (ev) => this.onContentDeleteFailedSubject.next(ev),

        CustomActionExecuted: (ev) => this.onCustomActionExecutedSubject.next(ev),
        CustomActionFailed: (ev) => this.onCustomActionFailedSubject.next(ev),

        ContentMoved: (ev) => this.onContentMovedSubject.next(ev),
        ContentMoveFailed: (ev) => this.onContentMoveFailedSubject.next(ev)
    }

    /**
    * Triggered after a succesful Content creation
    */
    public OnContentCreated: Observable<EventModels.Created> = this.onContentCreatedSubject.asObservable();

    /**
     * Triggered after Content creation has been failed
     */
    public OnContentCreateFailed = this.onContentCreateFailedSubject.asObservable();

    /**
     * Triggered after modifying a Content
     */
    public OnContentModified = this.onContentModifiedSubject.asObservable();

    /**
     * Triggered when failed to modify a Content
     */
    public OnContentModificationFailed = this.onContentModificationFailedSubject.asObservable();

    /**
     * Triggered when a Content is loaded from the Repository
     */
    public OnContentLoaded = this.onContentLoadedSubject.asObservable();

    /**
     * Triggered after deleting a Content
     */
    public OnContentDeleted = this.onContentDeletedSubject.asObservable();

    /**
     * Triggered after deleting a content has been failed
     */
    public OnContentDeleteFailed = this.onContentDeleteFailedSubject.asObservable();


    /**
     * Triggered after moving a content to another location
     */
    public OnContentMoved = this.onContentMovedSubject.asObservable();

    /**
     * Triggered after moving a content has been failed
     */
    public OnContentMoveFailed = this.onContentMoveFailedSubject.asObservable();

    /**
     * Triggered after a custom OData Action has been executed
     */
    public OnCustomActionExecuted = this.onCustomActionExecutedSubject.asObservable();

    /**
     * Triggered after a custom OData Action has been failed
     */
    public OnCustomActionFailed = this.onCustomActionFailedSubject.asObservable();


}