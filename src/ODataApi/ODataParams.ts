/**
 * @module ODataApi
 */ /** */


export interface IODataParams {
    select?: string | string[];
    expand?: string | string[];
    orderby?: string | string[];
    top?: string;
    skip?: string;
    filter?: string;
    format?: string;
    inlinecount?: string;
    query?: string;
    metadata?: string;
    data?: Object;
    scenario?: string;
}