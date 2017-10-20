/**
 * @module Content
 */ /** */

import { Observable } from '@reactivex/rxjs';
import { DeferredObject } from './ComplexTypes';
import { IContent, isDeferred, isIContent, SavedContent } from './Content';
import { ReferenceFieldSetting } from './FieldSettings';
import { IODataParams } from './ODataApi/ODataParams';
import { FinializedQuery } from './Query';
import { BaseRepository } from './Repository/BaseRepository';
import { ContentTypes, isIContentList } from './SN';

export abstract class ReferenceAbstract<T extends IContent> {
    public readonly abstract FieldSetting: ReferenceFieldSetting;
    public readonly abstract Repository: BaseRepository;

    protected _isDirty: boolean = false;
    public get IsDirty(): boolean{
        return this._isDirty;
    }

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
    public Search(term: string, top: number = 10, skip: number = 0, odataParams: IODataParams<T> = {}): FinializedQuery {
        return new FinializedQuery((q) => {
            let query = q.Equals('_Text', `*${term}*`);
            if (this.FieldSetting.SelectionRoots && this.FieldSetting.SelectionRoots.length) {
                query = query.And.Query((innerTree) => {
                    // tslint:disable-next-line:no-unused-expression
                    this.FieldSetting.SelectionRoots && this.FieldSetting.SelectionRoots.forEach((root, index, thisArray) => {
                        (innerTree as any) = innerTree.InTree(root);
                        if (index < thisArray.length - 1) {
                            innerTree = (innerTree as any).Or;
                        }
                    });
                    return innerTree;
                });
            }

            if (this.FieldSetting.AllowedTypes && this.FieldSetting.AllowedTypes.length) {
                const foundTypes = this.FieldSetting.AllowedTypes.map((type) => ContentTypes[type] as {new(...args: any[]): T}).filter((a) => a !== undefined);
                if (foundTypes.length > 0) {
                    query = query.And.Query((innerTypes) => {
                        foundTypes.forEach((type, index, thisArray) => {
                            (innerTypes as any) = innerTypes.Type(type);
                            if (index < thisArray.length - 1) {
                                innerTypes = (innerTypes as any).Or;
                            }
                        });
                        return innerTypes;
                    });
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
export class ContentReferenceField<T extends IContent> extends ReferenceAbstract<T> {
    private _contentReference: SavedContent<T>;
    private _referenceUrl: string;

    /**
     * Updates the reference value to another Content
     * @param {T} content The new Content value
     */
    public SetContent(content: SavedContent<T>) {
        this._contentReference = content;
        this._isDirty = true;
    }

    /**
     * Gets the current reference value.
     * @param {ODataParams} odataOptions Additional options to select/expand/etc...
     * @returns {Observable<T>} An observable that will publish the referenced content
     */
    public GetContent(odataOptions?: IODataParams<T>): Observable<SavedContent<T>> {
        if (this._contentReference !== undefined) {
            return Observable.of(this._contentReference);
        }
        const request = this.Repository.GetODataApi().Get({ path: this._referenceUrl, params: odataOptions })
            .map((r) => {
                return r && r.d && this.Repository.HandleLoadedContent<T>(r.d as any);
            }).share();
        request.subscribe((c) => {
            this._contentReference = c || null;
        });

        return request;
    }

    /**
     * @returns The reference value (content Path) that can be used for change tracking and content updates.
     */
    public GetValue(): string | undefined {
        return this._contentReference && this._contentReference.Path;
    }

    /**
     * Updates the reference URL in case of DeferredObject (not-expanded-fields) or populates the Content reference (for expanded fields) from an OData response's Field
     * @param {DeferredObject | T['options']} fieldData The DeferredObject or ContentOptions data that can be used
     */
    public HandleLoaded(fieldData: DeferredObject | SavedContent<T>) {
        if (isDeferred(fieldData)) {
            this._referenceUrl = fieldData.__deferred.uri.replace(this.Repository.Config.ODataToken, '');
        } else if (isIContent(fieldData)) {
            this._contentReference = this.Repository.HandleLoadedContent<T>(fieldData);
        }
        this._isDirty = false;
    }

    constructor(fieldData: DeferredObject | SavedContent<T>,
                public readonly FieldSetting: ReferenceFieldSetting,
                public readonly Repository: BaseRepository) {
        super();
        this.HandleLoaded(fieldData);
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
export class ContentListReferenceField<T extends IContent> extends ReferenceAbstract<T> {
    private _contentReferences: SavedContent<T>[];

    private _referenceUrl: string;

    /**
     * Updates the reference list to another Content list
     * @param {T[]} content The new list of content
     */
    public SetContent(content: SavedContent<T>[]) {
        this._contentReferences = content;
        this._isDirty = true;
    }

    /**
     * Gets the current referenced values.
     * @param {ODataParams} odataOptions Additional options to select/expand/etc...
     * @returns {Observable<T[]>} An observable that will publish the list of the referenced content
     */
    public GetContent(odataOptions?: IODataParams<T>): Observable<SavedContent<T>[]> {
        if (this._contentReferences) {
            return Observable.of(this._contentReferences);
        }
        //
        const request = this.Repository.GetODataApi().Fetch<T>({
            path: this._referenceUrl,
            params: odataOptions
        }).map((resp) => {
            return resp && resp.d && resp.d.results.map((c) => this.Repository.HandleLoadedContent<T>(c)) || [];
        }).share();

        request.subscribe((c) => {
            this._contentReferences = c;
        });

        return request;
    }

    /**
     * @returns The reference value (content Path list) that can be used for change tracking and content updates.
     */
    public GetValue(): string[] | undefined {
        return this._contentReferences && this._contentReferences
            .filter((c) => c.Path && c.Path.length)
            .map((c) => c.Path as string);
    }

    /**
     * Updates the reference URL in case of DeferredObject (not-expanded-fields) or populates the Content list references (for expanded fields) from an OData response's field
     * @param {DeferredObject | T['options'][]} fieldData The DeferredObject or ContentOptions data that can be used
     */
    public HandleLoaded(fieldData: DeferredObject | T[]) {
        if (isDeferred(fieldData)) {
            this._referenceUrl = fieldData.__deferred.uri.replace(this.Repository.Config.ODataToken, '');
        } else if (isIContentList(fieldData)) {
            this._contentReferences = fieldData.map((f) => this.Repository.HandleLoadedContent(f as any));
        }

        this._isDirty = false;
    }

    constructor(fieldData: DeferredObject | T[],
                public readonly FieldSetting: ReferenceFieldSetting,
                public readonly Repository: BaseRepository) {
        super();
        this.HandleLoaded(fieldData);
    }
}
