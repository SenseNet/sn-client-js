import { Observable } from '@reactivex/rxjs';

export module Http {
    type MethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

    export interface IHttpRequestOptions {
        url: string;
        method: MethodType
        headers?: { key: string, value: string }[];
        crossDomain?: boolean;
        body?: string;
        responseType?: string;
    }

    const DefaultHttpRequestOptions: IHttpRequestOptions = {
        url: null,
        method: null,
        headers: [],
        crossDomain: true
    }

    export interface IHttpProvider<TReturns> {
        Ajax(options?: IHttpRequestOptions): TReturns;
    }

    export class RxObservableHttpProvider implements IHttpProvider<Observable<any>> {
        public Ajax(options: IHttpRequestOptions): Observable<any> {
            return Observable.ajax({
                url: options.url,
                crossDomain: options.crossDomain,
                method: 'GET'
            });
        }
    }

    export class RxPromiseHttpProvider implements IHttpProvider<Promise<any>> {
        public Ajax(options: IHttpRequestOptions): Promise<any> {
            return Observable.ajax(options).toPromise();
        }
    }

    export class Provider<TReturns> {

        private constructor(private _providerInstance: IHttpProvider<TReturns>) { }

        public static Create<T, TProvider extends IHttpProvider<T>>(providerType: { new (): TProvider }, returnType: { new (...args): T }) {
            let _providerInstance = new providerType();
            let current = new Provider(_providerInstance);
            return current;
        }

        private headers: { name: string, value: string }[]
        public ApplyGlobalHeader(name: string, value: string) {
            this.headers.push({ name, value });
        }

        public Ajax(options: IHttpRequestOptions): TReturns {
            return this._providerInstance.Ajax(options);
        }
    }

    // let provika = Provider.Create(BasicXmlHttp, Promise);

    // provika.ApplyGlobalHeader('cucc', 'alma')
    // let valami: Promise<any> = provika.Ajax('a', 'GET');

}