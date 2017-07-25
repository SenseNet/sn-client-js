/**
 * @module Content
 */ /** */


import { isDeferred, isContentOptions, Content, isContentOptionList } from './Content';
import { DeferredObject } from './ComplexTypes'
import { BaseRepository } from './Repository/BaseRepository';
import { Observable } from '@reactivex/rxjs';
import { ODataRequestOptions } from './ODataApi/ODataRequestOptions';
import { ODataParams } from './ODataApi/ODataParams';

/**
 * Represents a Reference field on a Content object. Example:
 * ```ts
 * let myTask = repository.Load('/Root/MyTasks/Task1', {expand: ['Owner']}).subscribe(task => {
 *     task.Owner.GetContent(owner => {
 *         console.log('The Owner of the task is:', owner.DisplayName);
 *     })
 * }, error => console.error)
 * ```
 * 
 */
export class ContentReferenceField<T extends Content> {
    private contentReference: T;
    private referenceUrl: string;

    /**
     * Updates the reference value to another Content
     * @param {T} content The new Content value
     */
    SetContent(content: T){
        this.contentReference = content;
    }

    /**
     * Gets the current reference value. 
     * @param {ODataParams} odataOptions Additional options to select/expand/etc...
     * @returns {Observable<T>} An observable that will publish the referenced content
     */
    GetContent(odataOptions?: ODataParams): Observable<T> {
        if (this.contentReference !== undefined) {
            return Observable.of(this.contentReference);
        }
        const request = this.repository.GetODataApi().Get(new ODataRequestOptions({path: this.referenceUrl, params: odataOptions}))
            .map(r => {
                return r && r.d && this.repository.HandleLoadedContent<T, T['options']>(r.d);
            }).share();
        request.subscribe(c => {
            this.contentReference = c || null;
        });

        return request;
    }

    /**
     * @returns The reference value (content Path) that can be used for change tracking and content updates.
     */
    public getValue(): string | undefined {
        return this.contentReference && this.contentReference.Path;
    }

    /**
     * Updates the reference URL in case of DeferredObject (not-expanded-fields) or populates the Content reference (for expanded fields) from an OData response's Field
     * @param {DeferredObject | T['options']} fieldData The DeferredObject or ContentOptions data that can be used 
     */
    public update(fieldData: DeferredObject | T['options']) {
        if (isDeferred(fieldData)) {
            this.referenceUrl = fieldData.__deferred.uri.replace(this.repository.Config.ODataToken + '/', '');
        } else if (isContentOptions(fieldData)) {
            this.contentReference = this.repository.HandleLoadedContent(fieldData);
        }
    }

    constructor(fieldData: DeferredObject | T['options'],
        private readonly repository: BaseRepository) {
        this.update(fieldData);
    }
}

/**
 * Represents a Reference list field on a Content object. Example:
 * ```ts
 * let myTask = repository.Load('/Root/MyTasks/Task1', {expand: ['Versions']}).subscribe(versions => {
 *     task.Versions.GetContent(versions => {
 *         console.log('The available versions are:', versions);
 *     })
 * }, error => console.error)
 * ```
 * 
 */
export class ContentListReferenceField<T extends Content> {
    private contentReferences: T[];

    private referenceUrl: string;

    /**
     * Updates the reference list to another Content list
     * @param {T[]} content The new list of content
     */
    SetContent(content: T[]){
        this.contentReferences = content;
    }
    

    /**
     * Gets the current referenced values. 
     * @param {ODataParams} odataOptions Additional options to select/expand/etc...
     * @returns {Observable<T[]>} An observable that will publish the list of the referenced content
     */
    GetContent(odataOptions?: ODataParams): Observable<T[]> {
        if (this.contentReferences) {
            return Observable.of(this.contentReferences);
        }
        //
        const request = this.repository.GetODataApi().Fetch(new ODataRequestOptions({
            path: this.referenceUrl,
            params: odataOptions
        }), Content).map(resp => {
            return resp && resp.d && resp.d.results.map(c => this.repository.HandleLoadedContent<T, any>(c)) || [];
        }).share();
        
        request.subscribe(c => {
            this.contentReferences = c
        });

        return request;
    }

    /**
     * @returns The reference value (content Path list) that can be used for change tracking and content updates.
     */
    public getValue(): string[] | undefined {
        return this.contentReferences && this.contentReferences
            .filter(c => c.Path && c.Path.length)
            .map(c => c.Path as string);
    }

    /**
     * Updates the reference URL in case of DeferredObject (not-expanded-fields) or populates the Content list references (for expanded fields) from an OData response's field
     * @param {DeferredObject | T['options'][]} fieldData The DeferredObject or ContentOptions data that can be used 
     */
    public update(fieldData: DeferredObject | T['options'][]) {
        if (isDeferred(fieldData)) {
            this.referenceUrl = fieldData.__deferred.uri.replace(this.repository.Config.ODataToken + '/', ''); ;
        } else if (isContentOptionList(fieldData)) {
            this.contentReferences = fieldData.map(f => this.repository.HandleLoadedContent(f));
        }
    }

    constructor(fieldData: DeferredObject |  T['options'][],
        private readonly repository: BaseRepository) {
        this.update(fieldData);
    }
}
