/**
 * @module ODataApi
 */ /** */
 
/**
 * Generic Class that represents a basic OData Response structure
 */
export class ODataResponse<T>{
    d: {
        results: T[];
        __count: number;
    }
}