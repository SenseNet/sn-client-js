import { ISavedContent } from '../Content';

// tslint:disable:naming-convention
export class ODataBatchResponse<T extends ISavedContent = ISavedContent> {

    public __count: number;
    public results: T[];

    public errors: {content: T, error: any}[];

}
