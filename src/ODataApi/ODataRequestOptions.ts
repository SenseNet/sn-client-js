/**
 * @module ODataApi
 */ /** */

import { IContent } from '../Content';
import { IODataParams } from './';

// tslint:disable:naming-convention

export class IODataRequestOptions<T extends IContent> {
    public path: string;
    public params?: IODataParams<T>;
    public async?: boolean;
    public type?: string;
    public success?: () => void;
    public error?: () => void;
    public complete?: () => void;
}
