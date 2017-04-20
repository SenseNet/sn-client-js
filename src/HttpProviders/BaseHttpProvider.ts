/**
 * @module HttpProviders
 * @preferred
 * @description Library module for storing HttpProvider abstracts and implementations.
 *//** */

import { Observable, AjaxRequest } from '@reactivex/rxjs';

export abstract class BaseHttpProvider {
    protected headers: string[] = [];
    public SetGlobalHeader(headerName, headerValue) {
        this.headers[headerName] = headerValue;
    }

    public Ajax<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T> {
        this.headers.forEach((value, key) => {
            options.headers[key] = value;
        });
        return this.AjaxInner(tReturnType, options);
    };
    protected abstract AjaxInner<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T>;
}