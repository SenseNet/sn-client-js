/**
 * @module ODataApi
 */ /** */

/**
 * Generic Class that represents a basic OData Response structure
 */
import { ISavedContent } from '../Content';

export class ODataResponse<T extends ISavedContent> {
    // tslint:disable-next-line:naming-convention
    public d: T;
}
