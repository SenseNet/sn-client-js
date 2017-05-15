/**
 * @module ODataApi
 */ /** */
 
/**
 * Generic Class that represents a basic OData Response structure
 */
export class ODataCollectionResponse<T>{
    d: {
        results: T[];
        __count: number;
    }
}