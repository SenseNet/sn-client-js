/**
 * @module ODataApi
 */ /** */

import { ISavedContent } from '../Content';

// tslint:disable:naming-convention
/**
 * Represents a Batch Operation response from Batch Copy/Move/Delete action
 */
export class ODataBatchResponse<T extends ISavedContent = ISavedContent> {

    public d: {
        __count: number,
        results: T[],

        errors: { content: T, error: any }[],
    };

}
