import { Observable, AjaxRequest } from '@reactivex/rxjs';

/**
 * This module is a library module for Http-layer related classes and submodules.
 */
export module Http {

    export type ReturnType<T> = Promise<T> | Observable<T>;

    export interface IHttpProvider<ReturnType> {

        _typeReference: ReturnType;

        Ajax<K extends (this['_typeReference']), T> (tReturnType: { new (): T }, options ?: AjaxRequest): K;
    }

    export class RxObservableHttpProvider implements IHttpProvider<Observable<any>>{
        _typeReference: Observable<any>;
        public Ajax<T>(tReturnType, options: AjaxRequest): Observable<T> {
            return Observable.ajax(options).share().map(req => req.response.json);
        }
    }

    export class RxPromiseHttpProvder implements IHttpProvider<Promise<any>>{
        _typeReference: Promise<any>;
        public Ajax<T>(tReturnType, options: AjaxRequest): Promise<T> {
            return Observable.ajax(options)
                .map(req => req.response.json)
                .toPromise();
        }
    }

}