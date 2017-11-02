
/**
 * @module Content
 */ /** */

import { IContent, SavedContent } from '../Content';

export type WithParentContent<T> = T & { Parent: SavedContent<any> };

export class UploadOptions<T extends IContent> {
    /**
     * The type of the content to upload, usually should be 'File'
     */
    public ContentType: { new(...args: any[]): T };
    /**
     * The property to save the Binary data to, usually 'Binary'
     */
    public PropertyName: string;
    /**
     * Sets if the target content should be overwritten
     */
    public Overwrite: boolean;
    /**
     * Additional options to post
     */
    public Body?: any;
}

export class UploadFileOptions<T extends IContent> extends UploadOptions<T> {
    /**
     * The File instance to be posted
     */
    public File: File;
}

export class UploadTextOptions<T extends IContent> extends UploadOptions<T> {
    /**
     * The text data that will be saved to the binary field
     */
    public Text: string;
    /**
     * The name of the file
     */
    public FileName: string;
}

export class UploadFromEventOptions<T extends IContent> extends UploadOptions<T> {
    /**
     * The DragEvent to work with. File data will be extracted from it's 'dataTransfer' item.
     */
    public Event: DragEvent;
    /**
     * Option if folders should be created as well.
     */
    public CreateFolders: boolean;
}

export class UploadProgressInfo<T extends IContent> {
    /**
     * Basic info about the created Content
     */
    public CreatedContent: SavedContent<T>;
    /**
     * Total chunks count
     */
    public ChunkCount: number;
    /**
     * Uploaded chunks
     */
    public UploadedChunks: number;
    /**
     * Flag that indicates if the upload has been completed
     */
    public Completed: boolean;
}

export class SaveBinaryFileOptions {
    /**
     * The File to be saved
     */
    public File: File;
}

export class UploadResponse {
    /**
     * The ID of the created Content
     */
    public ContentId: number;
    /**
     * The Chunk token that can be used during upload
     */
    public ChunkToken: string;
    /**
     * Flag that indicates if the Content should be finialized after upload
     */
    public MustFinialize: boolean;
    /**
     * Flag that indicates if the Content should be checked in after upload
     */
    public MustCheckin: boolean;

    constructor(...args: any[]) {
        this.ContentId = parseInt(args[0], 0);
        this.ChunkToken = args[1];
        this.MustFinialize = args[2];
        this.MustCheckin = args[3];
    }
}
