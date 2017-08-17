/**
 * @module ODataApi
 */ /** */

import { Content } from '../Content';

export type ODataFieldParameter<T extends Content> = (keyof T['options'])[] | keyof T['options'];
export type ODataMetadataType = 'full' | 'minimal' | 'no';

export type ODataFormatType = 'json' | 'verbosejson';

export interface IODataParams<T extends Content> {
    select?: ODataFieldParameter<T> | 'all';
    expand?: ODataFieldParameter<T>;
    orderby?: ODataFieldParameter<T>;
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