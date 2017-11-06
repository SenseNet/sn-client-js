/**
 * @module ODataApi
 */ /** */

 // tslint:disable:naming-convention

import { IContent } from '../Content';

export type ODataFieldParameter<T extends IContent> = (keyof T)[] | keyof T;
export type ODataOrderParameter<T extends IContent> = keyof T | (keyof T | [keyof T, 'asc' | 'desc'])[];

export type ODataMetadataType = 'full' | 'minimal' | 'no';
export type ODataFormatType = 'json' | 'verbosejson';
export type ODataInlineCountType = 'none' | 'allpages';

/**
 * Model class to define specific OData Request parameters. See http://wiki.sensenet.com/OData_REST_API
 */
export class IODataParams<T extends IContent> {
    /**
     * The field(s) to be include in a $select list. Can be a field (e.g. 'DisplayName'), an array of fields (e.g. ['Name', 'Type']) or 'all'
     */
    public select?: ODataFieldParameter<T> | 'all';
    /**
     * The field(s) to be include in an $expand list. Can be a reference field (e.g. 'Owner') or an array of fields (e.g. ['CreatedBy', 'ModifiecBy'])
     */
    public expand?: ODataFieldParameter<T>;

    /**
     * Sets the OData $orderby parameter. Usage example
     * ```ts
     * // simple field
     * {
     *    ...
     *    orderby: 'Name'
     * }
     * // list with fields or tuples with order direction
     * {
     *    ...
     *    orderby: [
     *      ['CreationDate', 'desc']
     *      'Name',
     *      'DisplayName'
     *    ]
     *
     * }
     *
     * ```
     */
    public orderby?: ODataOrderParameter<T>;
    /**
     * Sets the OData $top parameter
     */
    public top?: number;

    /**
     * Sets the OData $skip parameter
     */
    public skip?: number;

    /**
     * Sets the OData $filter parameter
     */
    public filter?: string;

    /**
     * Sets the OData $format parameter. Can be 'json' or 'verbosejson'
     */
    public format?: ODataFormatType;

    /**
     * Sets the OData $format parameter. Can be 'json' or 'verbosejson'
     */
    public inlinecount?: ODataInlineCountType;

    /**
     * Sets the OData 'query' parameter. Can be a Content Query
     */
    public query?: string;
    /**
     * Sets the OData metadata parameter. Can be 'full', 'minimal' or 'no'
     */
    public metadata?: ODataMetadataType;
    /**
     * Sets the OData post data object
     */
    public data?: any;
    /**
     * Sets the OData Scenario parameter
     */
    public scenario?: string;
}
