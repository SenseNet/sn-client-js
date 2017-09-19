/**
 * @module ODataApi
 */ /** */

import { Content } from '../Content';

export type ODataFieldParameter<T extends Content> = (keyof T['options'])[] | keyof T['options'];
export type ODataOrderParameter<T extends Content> = keyof T['options'] | (keyof T['options'] | [keyof T['options'], 'asc' | 'desc'])[];
export type ODataMetadataType = 'full' | 'minimal' | 'no';

export type ODataFormatType = 'json' | 'verbosejson';

export class IODataParams<T extends Content> {
    select?: ODataFieldParameter<T> | 'all';
    expand?: ODataFieldParameter<T>;
    orderby?: ODataOrderParameter<T>;
    top?: number;
    skip?: number;
    filter?: string;
    format?: ODataFormatType;
    inlinecount?: string;
    query?: string;
    metadata?: ODataMetadataType;
    data?: Object;
    scenario?: string;
}