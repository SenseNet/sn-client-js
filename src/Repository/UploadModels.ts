import { Content } from '../Content';

export type WithParentContent<T> = T & { Parent: Content & {Path: string} | {GetFullPath: () => string, Path: string} }

export class UploadOptions<T extends Content>{
    ContentType: { new(...args: any[]): T };
    PropertyName: string = 'Binary';
    Overwrite: boolean = true;
    Body?: any;
}

export class UploadFileOptions<T extends Content> extends UploadOptions<T>{
    File: File;
}

export class UploadTextOptions<T extends Content> extends UploadOptions<T>{
    Text: string;
    FileName: string;
}

export class UploadFromEventOptions<T extends Content> extends UploadOptions<T>{
    Event: DragEvent;
    CreateFolders: boolean;
}

export class UploadProgressInfo<T extends Content> {
    CreatedContent: T;
    ChunkCount: number;
    UploadedChunks: number;
    Completed: boolean;
}


export class SaveBinaryFileOptions {
    File: File;
    UseChunk: boolean = false;
}

export class UploadResponse {
    ContentId: number; 
    ChunkToken: string; 
    MustFinialize: boolean; 
    MustCheckin: boolean;

    /**
     *
     */
    constructor(...args) {
        this.ContentId = parseInt(args[0]);
        this.ChunkToken = args[1];
        this.MustFinialize = args[2];
        this.MustCheckin = args[3];
        
    }
}