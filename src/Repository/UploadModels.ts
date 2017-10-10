import { Content }from '../Content';

export type WithParentContent<T> = T & {Parent: Content}

export class UploadOptions<T extends Content>{
    ContentType: { new(...args: any[]): T };
    PropertyName: string = 'Binary';
    Overwrite: boolean = true;
    UseChunk: boolean = false;
    Body?: any;
    AdditionalHeaders?: { name: string, value: string }[]
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


export class SaveBinaryFileOptions{
    File: File;
    UseChunk: boolean = false;
}