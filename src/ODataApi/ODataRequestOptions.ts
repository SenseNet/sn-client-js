/**
 * @module ODataApi
 */ /** */
 
import { ODataParams } from './';

export class ODataRequestOptions {
    path: string;
    params?: ODataParams;
    async: boolean;
    type: string;
    success?: Function;
    error?: Function;
    complete?: Function;

    constructor(options: IODataRequestOptions) {
        Object.assign(this, options);
    }
}

export interface IODataRequestOptions {
    path: string;
    params?: ODataParams;
    async?: boolean;
    type?: string;
    success?: Function;
    error?: Function;
    complete?: Function;
}