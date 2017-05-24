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
        this.params = options.params;
        this.path = `${options.path}`;
        this.async = options.async || true;
        this.type = options.type || 'GET';
        this.success = options.success;
        this.error = options.error;
        this.complete = options.complete;
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