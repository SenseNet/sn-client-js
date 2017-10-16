import { Content } from '../Content';

export type WithParentContent<T> = T & { Parent: Content & {Path: string} | {GetFullPath: () => string, Path: string} }

export class UploadOptions<T extends Content>{
    /**
     * The type of the content to upload, usually should be 'File'
     */
    ContentType: { new(...args: any[]): T };
    /**
     * The property to save the Binary data to, usually 'Binary'
     */
    PropertyName: string;
    /**
     * Sets if the target content should be overwritten
     */
    Overwrite: boolean;
    /**
     * Additional options to post
     */
    Body?: any;
}

export class UploadFileOptions<T extends Content> extends UploadOptions<T>{
    /**
     * The File instance to be posted
     */
    File: File;
}

export class UploadTextOptions<T extends Content> extends UploadOptions<T>{
    /**
     * The text data that will be saved to the binary field
     */
    Text: string;
    /**
     * The name of the file
     */
    FileName: string;
}

export class UploadFromEventOptions<T extends Content> extends UploadOptions<T>{
    /**
     * The DragEvent to work with. File data will be extracted from it's 'dataTransfer' item.
     */
    Event: DragEvent;
    /**
     * Option if folders should be created as well.
     */
    CreateFolders: boolean;
}

export class UploadProgressInfo<T extends Content> {
    /**
     * Basic info about the created Content
     */
    CreatedContent: T;
    /**
     * Total chunks count
     */
    ChunkCount: number;
    /**
     * Uploaded chunks
     */
    UploadedChunks: number;
    /**
     * Flag that indicates if the upload has been completed
     */
    Completed: boolean;
}


export class SaveBinaryFileOptions {
    /**
     * The File to be saved
     */
    File: File;
}

export class UploadResponse {
    /**
     * The ID of the created Content
     */
    ContentId: number;
    /**
     * The Chunk token that can be used during upload
     */
    ChunkToken: string;
    /**
     * Flag that indicates if the Content should be finialized after upload
     */
    MustFinialize: boolean;
    /**
     * Flag that indicates if the Content should be checked in after upload
     */
    MustCheckin: boolean;

    constructor(...args: any[]) {
        this.ContentId = parseInt(args[0]);
        this.ChunkToken = args[1];
        this.MustFinialize = args[2];
        this.MustCheckin = args[3];
    }
}