/**
 * @module Content
 */ /** */


import { isDeferred, isContentOptions, Content, isContentOptionList } from './Content';
import { DeferredObject } from './ComplexTypes'
import { BaseRepository } from './Repository/BaseRepository';
import { Observable } from '@reactivex/rxjs';
import { ODataRequestOptions } from './ODataApi/ODataRequestOptions';
import { ODataParams, IODataParams } from './ODataApi/ODataParams';
import { ReferenceFieldSetting } from './FieldSettings';
import { FinializedQuery } from './Query';
import { ContentTypes } from './SN';

export abstract class ReferenceAbstract {
    public readonly abstract FieldSetting: ReferenceFieldSetting;
    public readonly abstract Repository: BaseRepository;


    /**
     * Executes a search query to lookup possible values to the reference field
     * @param { string } term This term will be searched in the _Text field
     * @param { number } top The Top value for paging
     * @param { number } skip The Skip value for paging
     * @param { IOdataParams } odataParams The additional OData params (like select, expand, etc...)
     * @returns { FinializedQuery } The FinializedQuery instance that can be executed
     * 
     * Example: 
     * ```ts
     * reference.Search('Term').Exec().subscribe(hits=>{
     *      console.log(hits);
     * });
     * ```
     */
    public Search(term: string, top: number = 10, skip: number = 0, odataParams: IODataParams = {}): FinializedQuery {
        return new FinializedQuery(q => {
            let query = q.Equals('_Text', `*${term}*`);
            if (this.FieldSetting.SelectionRoots && this.FieldSetting.SelectionRoots.length) {
                query = query.And.Query(innerTree => {
                    this.FieldSetting.SelectionRoots && this.FieldSetting.SelectionRoots.forEach((root, index, thisArray) => {
                        (innerTree as any) = innerTree.InTree(root);
                        if (index < thisArray.length - 1)
                            innerTree = (innerTree as any).Or;
                    });
                    return innerTree;
                })
            }

            if (this.FieldSetting.AllowedTypes && this.FieldSetting.AllowedTypes.length) {
                const foundTypes = this.FieldSetting.AllowedTypes.map(type => ContentTypes[type] as {new(...args: any[])}).filter(a => a !== undefined);
                if (foundTypes.length > 0){
                    query = query.And.Query(innerTypes => {
                        foundTypes.forEach((type, index, thisArray) => {
                            (innerTypes as any) = innerTypes.Type(type);
                            if (index < thisArray.length - 1)
                                innerTypes = (innerTypes as any).Or;
                        })
                        return innerTypes;
                    })
                }
            }
            return query.Top(top).Skip(skip);

        }, this.Repository, '/Root', odataParams);
    }

}

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
export class ContentReferenceField<T extends Content> extends ReferenceAbstract {
    private contentReference: T;
    private referenceUrl: string;

    /**
     * Updates the reference value to another Content
     * @param {T} content The new Content value
     */
    SetContent(content: T) {
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
        const request = this.Repository.GetODataApi().Get(new ODataRequestOptions({ path: this.referenceUrl, params: odataOptions }))
            .map(r => {
                return r && r.d && this.Repository.HandleLoadedContent<T, T['options']>(r.d);
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
            this.referenceUrl = fieldData.__deferred.uri.replace(this.Repository.Config.ODataToken, '');
        } else if (isContentOptions(fieldData)) {
            this.contentReference = this.Repository.HandleLoadedContent(fieldData);
        }
    }

    constructor(fieldData: DeferredObject | T['options'],
        public readonly FieldSetting: ReferenceFieldSetting,
        public readonly Repository: BaseRepository) {
        super();
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
export class ContentListReferenceField<T extends Content> extends ReferenceAbstract {
    private contentReferences: T[];

    private referenceUrl: string;

    /**
     * Updates the reference list to another Content list
     * @param {T[]} content The new list of content
     */
    SetContent(content: T[]) {
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
        const request = this.Repository.GetODataApi().Fetch(new ODataRequestOptions({
            path: this.referenceUrl,
            params: odataOptions
        }), Content).map(resp => {
            return resp && resp.d && resp.d.results.map(c => this.Repository.HandleLoadedContent<T, any>(c)) || [];
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
            this.referenceUrl = fieldData.__deferred.uri.replace(this.Repository.Config.ODataToken, '');
        } else if (isContentOptionList(fieldData)) {
            this.contentReferences = fieldData.map(f => this.Repository.HandleLoadedContent(f));
        }
    }

    constructor(fieldData: DeferredObject | T['options'][],
        public readonly FieldSetting: ReferenceFieldSetting,
        public readonly Repository: BaseRepository) {
        super();
        this.update(fieldData);
    }
}
