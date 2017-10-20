/**
 * @module ODataApi
 */ /** */

import { IODataParams } from './';
import { IContent } from '../Content';


export class IODataRequestOptions<T extends IContent> {
    path: string;
    params?: IODataParams<T>;
    async?: boolean;
    type?: string;
    success?: Function;
    error?: Function;
    complete?: Function;
}