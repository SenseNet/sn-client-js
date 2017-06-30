/**
 * @module HttpProviders
 *//** */

import { Observable, AjaxRequest } from '@reactivex/rxjs';
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
        return Observable.ajax(options).map(req => req.response as T).share();
    }
}