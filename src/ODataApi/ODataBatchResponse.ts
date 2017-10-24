import { ISavedContent } from '../Content';

// tslint:disable:naming-convention
export class ODataBatchResponse<T extends ISavedContent = ISavedContent> {

    public d: {
        __count: number,
        results: T[],

        errors: { content: T, error: any }[],
    };

}
