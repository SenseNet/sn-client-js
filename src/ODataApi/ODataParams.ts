/**
 * @module ODataApi
 */ /** */

/**
 * Type of the OData option Object. Contains the possible OData params as properties.
 */
export class ODataParams {
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

    constructor(options: IODataParams) {
        this.select = options.select;
        this.expand = options.expand;
        this.orderby = options.orderby;
        this.top = options.top;
        this.skip = options.skip;
        this.filter = options.filter;
        this.format = options.format;
        this.inlinecount = options.inlinecount;
        this.query = options.query;
        this.metadata = options.metadata;
        this.data = options.data || [];
        this.scenario = options.scenario;
    }
}

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