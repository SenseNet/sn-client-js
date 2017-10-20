/**
 * @module HttpProviders
 *//** */

import { AjaxRequest, Observable, Subject } from '@reactivex/rxjs';
import { SnConfigModel } from '../Config';
import { BaseHttpProvider } from './';

/**
 * This is the default RxJs-Ajax based Http calls.
 */
export class RxAjaxHttpProvider extends BaseHttpProvider {
    protected uploadInner<T>(returnType: new (...args: any[]) => T, File: File, options: AjaxRequest & { url: string }): Observable<T> {
        const subject = new Subject<T>();
        const formData = new FormData();
        formData.append(File.name || 'File', File);

        if (options.body) {
            // tslint:disable-next-line:forin
            for (const index in options.body) {
                formData.append(index, options.body[index]);
            }
        }

        const request = new XMLHttpRequest();
        request.withCredentials = this.isCrossDomain(options.url);
        request.open('POST', options.url);

        if (options.headers) {
            // tslint:disable-next-line:forin
            for (const header in options.headers) {
                request.setRequestHeader(header, (options.headers as any)[header]);
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
                        subject.error({ message: 'Invalid Request status', request });
                }
            }
        };
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

    protected ajaxInner<T>(tReturnType: {new(...args: any[]): T}, options: AjaxRequest): Observable<T> {

        const crossDomain = this.isCrossDomain(options.url || '');
        options.withCredentials = crossDomain;
        options.crossDomain = crossDomain;
        return Observable.ajax(options).map((req) => req.response as T).share();
    }
}
