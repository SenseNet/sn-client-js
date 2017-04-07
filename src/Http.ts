import { Observable, AjaxRequest } from '@reactivex/rxjs';

/**
 * This module is a library module for Http-layer related classes and submodules.
 */
export module Http {

    export interface IHttpProvider {
        Ajax(options?: AjaxRequest): Observable<any>;
    }

    export class RxObservableHttpProvider implements IHttpProvider {
        public Ajax(options: AjaxRequest): Observable<any> {
            return Observable.ajax(options).share();
        }
    }

    export class Provider<TReturns extends Observable<any>> {
        private constructor(private _providerInstance: IHttpProvider) { }
        public static Create<TProvider extends IHttpProvider>(providerType: { new (): TProvider } ) {
            let providerInstance = new providerType();
            let current = new Provider(providerInstance);
            return current;
        }
        private headers: { name: string, value: string }[]
        public ApplyGlobalHeader(name: string, value: string) {
            this.headers.push({ name, value });
        }
        public Ajax(options: AjaxRequest): Observable<any> {
            return this._providerInstance.Ajax(options);
        }
    }
}