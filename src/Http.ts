import { Observable, AjaxRequest, ReplaySubject } from '@reactivex/rxjs';

/**
 * This module is a library module for Http-layer related classes and submodules.
 */
export module Http {
    export abstract class BaseHttpProvider {
        protected headers: string[] = [];
        public SetGlobalHeader(headerName, headerValue){
            this.headers[headerName] = headerValue;
        } 
        
        public Ajax<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T>{
            this.headers.forEach((value, key) => {
                options.headers[key] = value;
            });
            return this.AjaxInner(tReturnType, options);
        };
        abstract AjaxInner<T>(tReturnType: { new (...args): T }, options?: AjaxRequest): Observable<T>;
    }

    export class MockAjaxHttpProvider extends BaseHttpProvider {
        AjaxInner<T>(tReturnType: new (...args: any[]) => T, options?: AjaxRequest): Observable<T> {
            let subject = new ReplaySubject<T>()
            subject.next({} as T);
            return subject.asObservable();
        }


    }

    export class RxAjaxHttpProvider extends BaseHttpProvider {
        public AjaxInner<T>(tReturnType, options: AjaxRequest): Observable<T> {
            let observable =  Observable.ajax(options).share().map(req => {
                return req.response as T;
            });
            return observable;
        }
    }
}