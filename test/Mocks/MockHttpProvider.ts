/**
 * @module Mocks
 */ /** */

import { Observable, ReplaySubject, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from '../../src/HttpProviders';

/**
 * This HttpProvider can be used for test purposes only, it doesn't make any API calls
 */

export class MockResponse {
    IsError: boolean;
    Response: any;
}

export class MockHttpProvider extends BaseHttpProvider {

    private _responseQueue: MockResponse[] = [];

    public readonly RequestLog: { Options: AjaxRequest, Response: MockResponse }[] = [];
    private _lastUploadOptions?: AjaxRequest & { url: string; };
    protected UploadInner<T>(returnType: new (...args: any[]) => T, File: File, options?: (AjaxRequest & { url: string; })): Observable<T> {
        let subject = new ReplaySubject<T>();
        this.UseTimeout ? setTimeout(() => this.runMocks(subject, options as AjaxRequest)) : this.runMocks(subject, options as AjaxRequest);
        this._lastUploadOptions = options;
        return subject.asObservable();
    }

    public get ActualHeaders() {
        return this.headers;
    }

    public AddResponse(response: any) {
        this._responseQueue.push({ IsError: false, Response: response });
        return this;
    }

    public AddError(error: any) {
        this._responseQueue.push({ IsError: true, Response: error });
        return this;
    }

    public UseTimeout: boolean = true;

    private runMocks<T>(subject: ReplaySubject<T>, options: AjaxRequest) {
        let response = this._responseQueue[0];
        if (response) {
            this.RequestLog.push({ Response: response, Options: options });
            if (response.IsError) {
                subject.error(response.Response);
            } else {
                subject.next(response.Response);
            }

            this._responseQueue.splice(0, 1);
        }
    }
    public get LastOptions(): AjaxRequest {
        return this.RequestLog[this.RequestLog.length - 1].Options;
    }

    protected AjaxInner<T>(tReturnType: new (...args: any[]) => T, options: AjaxRequest): Observable<T> {
        let subject = new ReplaySubject<T>();
        this.UseTimeout ? setTimeout(() => this.runMocks(subject, options)) : this.runMocks(subject, options);
        return subject.asObservable();
    }
}