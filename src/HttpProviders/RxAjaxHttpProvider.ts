/**
 * @module HttpProviders
 *//** */

import { Observable, ReplaySubject, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from './';

/**
 * This is the default RxJs-Ajax based Http calls.
 */
export class RxAjaxHttpProvider extends BaseHttpProvider {

    constructor(){
        super();
        this.SetGlobalHeader('content-type', 'application/json');
    }

    protected AjaxInner<T>(tReturnType, options: AjaxRequest): Observable<T> {
        let observable = Observable.ajax(options).share().map(req => {
            return req.response as T;
        });
        return observable;
    }
}