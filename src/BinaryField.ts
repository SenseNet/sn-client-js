/**
 * @module Content
 */ /** */

import { Observable } from '@reactivex/rxjs';
import { MediaResourceObject } from './ComplexTypes';
import { ContentInternal, IContent, SavedContent } from './Content';
import { BinaryFieldSetting } from './FieldSettings';
import { UploadProgressInfo } from './Repository/UploadModels';

/**
 * Represents a binary field instance
 */
export class BinaryField<T extends IContent> {

    /**
     * Saves a File object instance (from a form input or drop event) into the binary field
     * @param {File} file The file to be saved
     * @returns {Observable<UploadProgressInfo<T>>} An observable that will update with the upload progress
     */
    public SaveBinaryFile: (file: File) => Observable<UploadProgressInfo<T>>
    = (file: File) =>

        this._contentReference.GetRepository().UploadFile({
            File: new File([file], (this._contentReference as SavedContent).Name),
            Parent: {GetFullPath: () => this._contentReference.ParentContentPath, Path: this._contentReference.ParentPath} as SavedContent,
            PropertyName: this._fieldSettings.Name,
            ContentType: this._contentReference.constructor as { new(...args: any[]): T },
            Overwrite: true,
        })

    /**
     * Saves a text from a string variable into the Binary field
     * @param {string} text The text to be saved
     * @returns {Observable<UploadProgressInfo<T>>} An observable that will update with the upload progress
     */
    public SaveBinaryText: (text: string) => Observable<UploadProgressInfo<T>> = (text: string) => this.SaveBinaryFile(new File([text], this._contentReference.Name || 'File'));

    /**
     * Returns the download URL for the binary
     */
    public GetDownloadUrl(): string {
        return this._mediaResourceObject.__mediaresource.media_src;
    }

    /**
     * returns the MediaResourceObject from the binary field
     */
    public GetMediaResourceObject(): MediaResourceObject {
        return Object.assign({}, this._mediaResourceObject);
    }

    /**
     *
     * @param {MediaResourceObject} _mediaResourceObject The media resource object from the content response
     * @param {T} _contentReference The owner content reference
     * @param {BinaryFieldSetting} _fieldSettings The corresponding fieldsettings
     */
    constructor(private readonly _mediaResourceObject: MediaResourceObject,
                private readonly _contentReference: ContentInternal<T>,
                private readonly _fieldSettings: BinaryFieldSetting) {
    }
}
