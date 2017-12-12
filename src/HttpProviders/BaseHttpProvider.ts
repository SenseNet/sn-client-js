/**
 * @module HttpProviders
 *//** */

import { Observable } from 'rxjs/Observable';
import { AjaxRequest } from 'rxjs/observable/dom/AjaxObservable';
/**
 *
 */
export abstract class BaseHttpProvider {
    protected _headers: Map<string, string> = new Map();

    /**
     * Sets a specified HTTP header to a specified value. The header will be the same on each request.
     * @param headerName The name of the header
     * @param headerValue The value of the header
     */
    public SetGlobalHeader(headerName: string, headerValue: string) {
        this._headers.set(headerName, headerValue);
    }

    /**
     * Removes a specified HTTP header from the global header settings
     * @param headerName The name of the header
     *
     */
    public UnsetGlobalHeader(headerName: string) {
        this._headers.delete(headerName);
    }

    /**
     * Public entry point for executing Ajax calls using a specific provider
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    public Ajax<T>(tReturnType: { new (...args: any[]): T }, options: AjaxRequest, additionalHeaders: {name: string, value: string}[] = []): Observable<T> {
        const headers = options.headers || [];
        for (const key of this._headers.keys()) {
            (headers as any)[key] = this._headers.get(key);
        }

        additionalHeaders.forEach((h) => {
            (headers as any)[h.name] = h.value;
        });

        options.headers = headers;

        return this.ajaxInner(tReturnType, options);
    }

    /**
     * Public entry point for uploading files using a specific provider
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    public Upload<T>(tReturnType: { new (...args: any[]): T }, File: File, options: AjaxRequest & {url: string}): Observable<T> {
        options.headers = options.headers || [];

        return this.uploadInner(tReturnType, File, options);
    }

    /**
     * The inner implementation of the Ajax call
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    protected abstract ajaxInner<T>(tReturnType: { new (...args: any[]): T }, options?: AjaxRequest): Observable<T>;

    /**
     * The implementation of the Upload call
     * @param tReturnType The return type
     * @param options Additional RxJs AjaxRequest options (the global headers will be overridden)
     */
    protected abstract uploadInner<T>(returnType: {new(...args: any[]): T}, File: File, options?: AjaxRequest & {url: string}): Observable<T>;
}
