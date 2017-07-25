import { isDeferred, isContentOptions, Content, isContentOptionList } from './Content';
import { DeferredObject } from './ComplexTypes'
import { BaseRepository } from './Repository/BaseRepository';
import { Observable } from '@reactivex/rxjs';
import { ODataRequestOptions } from './ODataApi/ODataRequestOptions';
import { ODataParams } from './ODataApi/ODataParams';

export class ContentReferenceField<T extends Content> {
    private contentReference: T;
    private referenceUrl: string;

    SetContent(content: T){
        this.contentReference = content;
    }

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

    public getValue(): string | undefined {
        return this.contentReference && this.contentReference.Path;
    }

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


export class ContentListReferenceField<T extends Content> {
    private contentReferences: T[];

    private referenceUrl: string;

    SetContents(contents: T[]){
        this.contentReferences = contents;
    }
    

    GetContents(odataOptions?: ODataParams) {
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

    public getValue(): string[] | undefined {
        return this.contentReferences && this.contentReferences
            .filter(c => c.Path && c.Path.length)
            .map(c => c.Path as string);
    }

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
