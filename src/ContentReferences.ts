import { isDeferred, isContentOptions, Content, isContentOptionList, IContentOptions } from './Content';
import { DeferredObject } from './ComplexTypes'
import { BaseRepository } from './Repository/BaseRepository';
import { Observable } from '@reactivex/rxjs';
import { ODataRequestOptions } from './ODataApi/ODataRequestOptions';

export class ContentReferenceField {
    private contentReference: Content;
    private referenceUrl: string;

    SetContent(content: Content){
        this.contentReference = content;
    }

    GetContent() {
        if (this.contentReference !== undefined) {
            return Observable.of(this.contentReference);
        }
        const request = this.repository.GetODataApi().Get(new ODataRequestOptions({ path: this.referenceUrl }))
            .map(r => {
                return r && r.d && this.repository.HandleLoadedContent(r.d);
            }).share();
        request.subscribe(c => {
            this.contentReference = c || null;
        });

        return request;
    }

    public getValue() {
        return this.contentReference && this.contentReference.Path;
    }

    public update(fieldData: DeferredObject | IContentOptions) {
        if (isDeferred(fieldData)) {
            //todo:trim odata.svc
            this.referenceUrl = fieldData.__deferred.uri.replace(this.repository.Config.ODataToken + '/', '');
        } else if (isContentOptions(fieldData)) {
            this.contentReference = this.repository.HandleLoadedContent(fieldData);
        } else {
            throw new Error('Failed to update reference, fieldData is not Deferred object or IContentOptions')
        }
    }

    constructor(fieldData: DeferredObject | IContentOptions,
        private readonly repository: BaseRepository) {
        this.update(fieldData);
    }
}


export class ContentListReferenceField {
    private contentReferences: Content[];

    private referenceUrl: string;

    SetContents(contents: Content[]){
        this.contentReferences = contents;
    }
    

    GetContents() {
        if (this.contentReferences) {
            return Observable.of(this.contentReferences);
        }
        //
        const request = this.repository.GetODataApi().Fetch(new ODataRequestOptions({
            path: this.referenceUrl,
        }), Content).map(resp => {
            return resp && resp.d && resp.d.results.map(c => this.repository.HandleLoadedContent(c)) || [];
        }).share();
        
        request.subscribe(c => {
            this.contentReferences = c
        });

        return request;
    }

    public getValue() {
        return this.contentReferences && this.contentReferences.map(c => c.Path);
    }

    public update(fieldData: DeferredObject | IContentOptions[]) {
        if (isDeferred(fieldData)) {
            this.referenceUrl = fieldData.__deferred.uri.replace(this.repository.Config.ODataToken + '/', ''); ;
        } else if (isContentOptionList(fieldData)) {
            this.contentReferences = fieldData.map(f => this.repository.HandleLoadedContent(f));
        } else {
            throw new Error('Failed to update reference list, fieldData is not Deferred object or ContentOptionList')
        }
    }

    constructor(fieldData: DeferredObject | IContentOptions[],
        private readonly repository: BaseRepository) {
        this.update(fieldData);
    }
}
