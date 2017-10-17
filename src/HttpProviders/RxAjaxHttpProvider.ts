/**
 * @module HttpProviders
 *//** */

import { Observable, AjaxRequest, Subject } from '@reactivex/rxjs';
import { BaseHttpProvider } from './';
import { SnConfigModel } from '../Config';

/**
 * This is the default RxJs-Ajax based Http calls.
 */
export class RxAjaxHttpProvider extends BaseHttpProvider {
    protected uploadInner<T>(returnType: new (...args: any[]) => T, File: File, options: AjaxRequest & { url: string }): Observable<T> {
        const subject = new Subject<T>();
        const formData = new FormData();
        formData.append(File.name || 'File', File);

        if (options.body) {
            for (const index in options.body) {
                formData.append(index, options.body[index]);
            }
        }

        const request = new XMLHttpRequest();
        request.withCredentials = this.isCrossDomain(options.url);
        request.open('POST', options.url);

        if (options.headers) {
            for (const header in options.headers) {
                request.setRequestHeader(header, options.headers[header]);
            }
        }

        request.onreadystatechange = () => {
            if (request.readyState === 4) {

                switch (request.status) {
                    case 200:
                        try {
                            const responseResult: T = JSON.parse(request.response);
                            subject.next(responseResult);
                        } catch (error) {
                            subject.next(request.response);
                        }
                        break;
                    default:
                        subject.error({ message: 'Invalid Request status', request })
                }
            }
        }
        request.send(formData);
        return subject.asObservable();
    }

    private isCrossDomain(path: string): boolean {
        return path.indexOf(SnConfigModel.DEFAULT_BASE_URL) === -1;
    }

    constructor() {
        super();
        this.SetGlobalHeader('content-type', 'application/json; charset=utf-8');
        this.SetGlobalHeader('Accept', 'application/json');
    }

    protected ajaxInner<T>(tReturnType, options: AjaxRequest): Observable<T> {

        const crossDomain = this.isCrossDomain(options.url || '');
        options.withCredentials = crossDomain;
        options.crossDomain = crossDomain;
        return Observable.ajax(options).map(req => req.response as T).share();
    }
}