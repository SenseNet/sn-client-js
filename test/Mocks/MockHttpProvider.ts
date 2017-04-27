/**
 * @module HttpProviders
 *//** */

import { Observable, ReplaySubject, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from '../../src/HttpProviders';

/**
 * This HttpProvider can be used for test purposes only, it doesn't make any API calls
 */
export class MockHttpProvider extends BaseHttpProvider {
    
    public get actualHeaders(){
        return this.headers;
    }

    private _lastOptions: AjaxRequest;
    public get lastOptions(): AjaxRequest{
        return this._lastOptions;
    }

    
    protected AjaxInner<T>(tReturnType: new (...args: any[]) => T, options?: AjaxRequest): Observable<T> {
        let subject = new ReplaySubject<T>()
        subject.next({} as T);
        this._lastOptions = options;
        return subject.asObservable();
    }
}