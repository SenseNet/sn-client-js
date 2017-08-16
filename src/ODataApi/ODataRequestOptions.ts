/**
 * @module ODataApi
 */ /** */
 
import { IODataParams } from './';
import { Content } from '../Content';


export interface IODataRequestOptions<T extends Content> {
    path: string;
    params?: IODataParams<T>;
    async?: boolean;
    type?: string;
    success?: Function;
    error?: Function;
    complete?: Function;
}