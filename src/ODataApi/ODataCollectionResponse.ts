/**
 * @module ODataApi
 */ /** */

/**
 * Generic Class that represents a basic OData Response structure
 */
import { IContentOptions } from '../Content';

export class ODataCollectionResponse<T extends IContentOptions>{
    d: {
        results: T[];
        __count: number;
    }
}