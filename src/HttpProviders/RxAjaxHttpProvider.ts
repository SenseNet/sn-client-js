/**
 * @module HttpProviders
 *//** */

import { Observable, AjaxRequest, Subject } from '@reactivex/rxjs';
import { BaseHttpProvider } from './';

/**
 * This is the default RxJs-Ajax based Http calls.
 */
export class RxAjaxHttpProvider extends BaseHttpProvider {

    constructor(){
        super();
        this.SetGlobalHeader('content-type', 'application/json; charset=utf-8');
        this.SetGlobalHeader('Accept', 'application/json');
    }

    protected AjaxInner<T>(tReturnType, options: AjaxRequest): Observable<T> {
        const sub = new Subject<T>();
        const req = new XMLHttpRequest();
        req.open(options.method || 'GET', options.url || '', true);

        if (options.headers){
            for (let headerName in options.headers || []){
                if (options.headers[headerName])
                req.setRequestHeader(headerName, options.headers[headerName]);
            }
        }
        req.withCredentials = true; // pass along cookies

        req.onload = () => {
            try {
                sub.next(JSON.parse(req.responseText));
            } catch (error) {
                sub.error(error);
            }
        }

        req.send();

        req.onerror = sub.error;
        return sub.asObservable();
        // return Observable.ajax(options).map(req => req.response as T).share();
    }
}