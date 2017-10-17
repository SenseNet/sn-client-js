import { Content, SavedContent } from './Content';
import { MediaResourceObject } from './ComplexTypes';
import { FieldSettings } from './SN';
import { Observable } from '@reactivex/rxjs';
import { UploadProgressInfo } from './Repository/UploadModels';

export class BinaryField<T extends SavedContent<Content>> {

    public SaveBinaryFile: (file: File) => Observable<UploadProgressInfo<T>>
    = (file: File) =>

        this._contentReference.GetRepository().UploadFile({
            File: new File([file], this._contentReference.Name || file.name),
            Parent: {GetFullPath: () => this._contentReference.ParentContentPath, Path: this._contentReference.ParentPath},
            PropertyName: this._fieldSettings.Name,
            ContentType: this._contentReference.constructor as { new(...args: any[]): T },
            Overwrite: true,
        })

    public SaveBinaryText: (text: String) => Observable<UploadProgressInfo<T>> = (text: string) => this.SaveBinaryFile(new File([text], this._contentReference.Name || 'File'));

    public GetDownloadUrl(): string {
        return this._mediaResourceObject.__mediaresource.media_src;
    }

    public GetMediaResourceObject(): MediaResourceObject {
        return Object.assign({}, this._mediaResourceObject);
    }

    constructor(private readonly _mediaResourceObject: MediaResourceObject,
        private readonly _contentReference: T,
        private readonly _fieldSettings: FieldSettings.BinaryFieldSetting) {
    }
}