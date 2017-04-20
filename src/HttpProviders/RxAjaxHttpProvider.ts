/**
 * @module HttpProviders
 *//** */

import { Observable, ReplaySubject, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from './';
export class RxAjaxHttpProvider extends BaseHttpProvider {
    protected AjaxInner<T>(tReturnType, options: AjaxRequest): Observable<T> {
        let observable = Observable.ajax(options).share().map(req => {
            return req.response as T;
        });
        return observable;
    }
}