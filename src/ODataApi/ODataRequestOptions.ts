/**
 * @module ODataApi
 */ /** */
 
import { IODataParams } from './';

export class ODataRequestOptions {
    path: string;
    params?: IODataParams;
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
    params?: IODataParams;
    async?: boolean;
    type?: string;
    success?: Function;
    error?: Function;
    complete?: Function;
}