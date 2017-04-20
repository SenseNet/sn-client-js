/**
 * @module HttpProviders
 * @preferred
 * @description Library module for storing HttpProvider abstracts and implementations.
 *//** */

import { Observable, AjaxRequest } from '@reactivex/rxjs';
/**
 * 
 */
export abstract class BaseHttpProvider {
    protected headers: string[] = [];
    
    /**
     * Sets a specified HTTP header to a specified value. The header will be the same on each request.
     * @param headerName The name of the header
     * @param headerValue The value of the header
     */
    public SetGlobalHeader(headerName, headerValue) {
        this.headers[headerName] = headerValue;
    }

    /**
     * Public entry point for executing Ajax calls using a specific provider
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    public Ajax<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T> {
        this.headers.forEach((value, key) => {
            options.headers[key] = value;
        });
        return this.AjaxInner(tReturnType, options);
    };
    
    /**
     * The inner implementation of the Ajax call
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    protected abstract AjaxInner<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T>;
}