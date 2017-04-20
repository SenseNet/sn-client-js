/**
 * @module ODataApi
 */ /** */
 
export class ODataResponse<T>{
    d: {
        results: T[];
        __count: number;
    }
}