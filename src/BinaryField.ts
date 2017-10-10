import { Content, SavedContent } from './Content';
import { MediaResourceObject } from './ComplexTypes';
import { FieldSettings } from './SN';
import { Observable } from '@reactivex/rxjs';

export class BinaryField<T extends SavedContent<Content>> {


    private get fieldName(): keyof T{
        return this.fieldSettings.Name as keyof T;
    }

    public SaveBinaryFile: (File: File, useChunk: boolean) => Observable<T>
                     = (File: File, useChunk: boolean) => {
        
        const saveObservable = this.contentReference.GetRepository().UploadFile({
            File: File,
            Parent: this.contentReference,
            PropertyName: this.fieldName,
            ContentType: this.contentReference.constructor as {new(...args): T},
            Overwrite: true,
            UseChunk: useChunk
        })
        .map(progressInfo => progressInfo.CreatedContent);
        if (this.contentReference.IsSaved){
            return saveObservable.share();
        } else {
            return this.contentReference.Save().flatMap(content => {
                return saveObservable.share();
            })
        }
    }

    public SaveBinaryText: (fileName: string, text: String, useChunk: boolean) => Observable<T> = (fileName: string, text: string, useChunk) => this.SaveBinaryFile(new File([text], fileName), useChunk);

    public GetDownloadUrl(): string {
        return this.mediaResourceObject.__mediaresource.media_src;
    }

    public GetMediaResourceObject(): MediaResourceObject{
        return Object.assign({}, this.mediaResourceObject);
    }

    constructor(public readonly mediaResourceObject: MediaResourceObject, 
                private readonly contentReference: T, 
                private readonly fieldSettings: FieldSettings.BinaryFieldSetting) {
    }
}