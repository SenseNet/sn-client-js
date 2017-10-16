/**
 * @module ODataApi
 */ /** */

/**
 * Generic Class that represents a basic OData Response structure
 */
import { IContentOptions } from '../Content';

export class ODataResponse<T extends IContentOptions>{
    d: T;
}