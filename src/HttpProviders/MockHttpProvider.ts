/**
 * @module HttpProviders
 *//** */

import { Observable, ReplaySubject, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from './';
export class MockHttpProvider extends BaseHttpProvider {
    protected AjaxInner<T>(tReturnType: new (...args: any[]) => T, options?: AjaxRequest): Observable<T> {
        let subject = new ReplaySubject<T>()
        subject.next({} as T);
        console.log('MockHttp executed: ', options.url);
        return subject.asObservable();
    }
}