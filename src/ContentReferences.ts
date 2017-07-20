import { isDeferred, isContentOptions, Content, isContentOptionList, IContentOptions } from './Content';
import { DeferredObject } from './ComplexTypes'
import { BaseRepository } from './Repository/BaseRepository';
import { Observable } from '@reactivex/rxjs';
import { ODataRequestOptions } from './ODataApi/ODataRequestOptions';

export class ContentReferenceField {
    private contentReference: Content;
    private referenceUrl: string;

    GetContent() {
        if (this.contentReference) {
            return Observable.of(this.contentReference);
        }
        return this.repository.Load(this.referenceUrl);
    }

    public getValue(){
        return this.contentReference && this.contentReference.Path;
    }

    public update(fieldData: DeferredObject | IContentOptions){
        if (isDeferred(fieldData)) {
            this.referenceUrl = fieldData.__deferred.uri;
        } else if (isContentOptions(fieldData)) {
            this.contentReference = this.repository.HandleLoadedContent(fieldData);
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

    GetContents() {
        if (this.contentReferences) {
            return Observable.of(this.contentReferences);
        }
        //
        return this.repository.GetODataApi().Fetch(new ODataRequestOptions({
            path: this.referenceUrl,
        }), Content).map(resp => {
            return resp.d.results.map(c => this.repository.HandleLoadedContent(c));
        });
    }

    public getValue(){
        return this.contentReferences && this.contentReferences.map(c => c.Path);
    }

    public update(fieldData: DeferredObject | IContentOptions[]){
        if (isDeferred(fieldData)) {
            this.referenceUrl = fieldData.__deferred.uri;
        } else if (isContentOptionList(fieldData)) {
            this.contentReferences = fieldData.map(f => this.repository.HandleLoadedContent(f));
        }
    }

    constructor(fieldData: DeferredObject | IContentOptions[],
        private readonly repository: BaseRepository) {
            this.update(fieldData);
    }
}
