/**
 * @module HttpProviders
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
        if (this.headers[headerName]){
            delete this.headers[headerName];
        }
    }

    /**
     * Public entry point for executing Ajax calls using a specific provider
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    public Ajax<T>(tReturnType: { new (...args): T }, options: AjaxRequest, additionalHeaders: {name: string, value: string}[] = []): Observable<T> {
        options.headers = options.headers || [];
        for (let key in this.headers){
            options.headers[key] = this.headers[key];
        }

        additionalHeaders.forEach(h => {
            if (options.headers)
                options.headers[h.name] = h.value;
        })
        
        return this.AjaxInner(tReturnType, options);
    };

    /**
     * Public entry point for uploading files using a specific provider
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    public Upload<T>(tReturnType: { new (...args): T }, File: File, options: AjaxRequest & {url: string}, additionalHeaders: {name: string, value: string}[] = []): Observable<T> {
        options.headers = options.headers || [];
        for (let key in this.headers){
            options.headers[key] = this.headers[key];
        }

        additionalHeaders.forEach(h => {
            if (options.headers)
                options.headers[h.name] = h.value;
        })
        
        return this.UploadInner(tReturnType, File, options);
    };
    
    /**
     * The inner implementation of the Ajax call
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    protected abstract AjaxInner<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T>;

    /**
     * The implementation of the Upload call
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    protected abstract UploadInner<T>(returnType: {new(...args): T}, File: File, options?: AjaxRequest & {url: string}): Observable<T>
}