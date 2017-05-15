/**
 * @module HttpProviders
 *//** */

import { Observable, ReplaySubject, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from '../../src/HttpProviders';

/**
 * This HttpProvider can be used for test purposes only, it doesn't make any API calls
 */
export class MockHttpProvider extends BaseHttpProvider {

    public get actualHeaders() {
        return this.headers;
    }

    private _lastOptions: AjaxRequest;
    public get lastOptions(): AjaxRequest {
        return this._lastOptions;
    }

    private _nextResponse: any;
    public setResponse(response: any) {
        this._nextError = null;
        this._nextResponse = response;
    }

    public _nextError: any;
    public setError(error: any) {
        this._nextResponse = null;
        this._nextError = error;
    }

    private _lastUrl: string = '';
    public get lastUrl() {
        return this._lastUrl;
    }

    public UseTimeout: boolean = true;

    private runMocks<T>(subject: ReplaySubject<T>, options?: AjaxRequest){
            this._lastUrl = options.url;
            if (this._nextResponse) {
                subject.next(this._nextResponse);
                this._nextResponse = null;
            }
            if (this._nextError) {
                subject.error(this._nextError);
                this._nextError = null;
            }
    }


    protected AjaxInner<T>(tReturnType: new (...args: any[]) => T, options?: AjaxRequest): Observable<T> {
        let subject = new ReplaySubject<T>();

        this.UseTimeout ? setTimeout(() => this.runMocks(subject, options)) : this.runMocks(subject, options);

        this._lastOptions = options;
        return subject.asObservable();
    }
}