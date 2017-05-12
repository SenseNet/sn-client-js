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
     * Removes a specified HTTP header from the global header settings
     * @param headerName The name of the header
     * 
     */
    public UnsetGlobalHeader(headerName) {
        const index = this.headers.indexOf(headerName);
        if (index > -1)
            this.headers = this.headers.splice(index, 1);
    }

    /**
     * Public entry point for executing Ajax calls using a specific provider
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    public Ajax<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T> {
        options.headers = options.headers || [];
        for (let key in this.headers){
            options.headers[key] = this.headers[key];
        }
        return this.AjaxInner(tReturnType, options);
    };
    
    /**
     * The inner implementation of the Ajax call
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    protected abstract AjaxInner<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T>;
}