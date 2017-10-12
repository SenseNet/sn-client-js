import { Content, SavedContent } from './Content';
import { MediaResourceObject } from './ComplexTypes';
import { FieldSettings } from './SN';
import { Observable } from '@reactivex/rxjs';
import { UploadProgressInfo } from './Repository/UploadModels';

export class BinaryField<T extends SavedContent<Content>> {


    private get fieldName(): keyof T {
        return this.fieldSettings.Name as keyof T;
    }

    public SaveBinaryFile: (file: File) => Observable<UploadProgressInfo<T>>
    = (file: File) =>

        this.contentReference.GetRepository().UploadFile({
            File: new File([file], this.contentReference.Name || file.name),
            Parent: {GetFullPath: () => this.contentReference.ParentContentPath, Path: this.contentReference.ParentPath},
            PropertyName: this.fieldName,
            ContentType: this.contentReference.constructor as { new(...args): T },
            Overwrite: true,
        })

    public SaveBinaryText: (text: String) => Observable<UploadProgressInfo<T>> = (text: string) => this.SaveBinaryFile(new File([text], this.contentReference.Name || 'File'));

    public GetDownloadUrl(): string {
        return this.mediaResourceObject.__mediaresource.media_src;
    }

    public GetMediaResourceObject(): MediaResourceObject {
        return Object.assign({}, this.mediaResourceObject);
    }

    constructor(public readonly mediaResourceObject: MediaResourceObject,
        private readonly contentReference: T,
        private readonly fieldSettings: FieldSettings.BinaryFieldSetting) {
    }
}