/**
 * @module Repository
 */
/** */
import { BaseHttpProvider } from '../HttpProviders';
import { IContent } from './';
import { Observable } from '@reactivex/rxjs';
import { IODataApi } from '../ODataApi';
import { RequestMethodType } from '../HttpProviders';

export interface IRepository<THttpProviderType extends BaseHttpProvider, TBaseContentType extends IContent> {
    Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args): T }, body?: any): Observable<T>;
    Load<TContentType extends TBaseContentType = TBaseContentType>(idOrPath: string | number, options?: Object, version?: string, returns?: { new (...args): TContentType }): Observable<TContentType>;
    readonly Contents: IODataApi<THttpProviderType, TBaseContentType>;
    IsCrossDomain: boolean;
}