/**
 * @module ODataApi
 */ /** */
 
import { ODataRequestOptions } from './ODataRequestOptions';
import { IContent, IRepository } from '../Repository';
import { BaseHttpProvider } from '../HttpProviders';
import { ICustomActionOptions, IODataParams, ODataResponse, ODataCollectionResponse } from './';
import { Observable } from '@reactivex/rxjs';

/**
 * Generic interface for ODataApi-s
 */
export interface IODataApi<THttpProviderType extends BaseHttpProvider, TBaseContentType extends IContent> {
    Get<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args): T }): Observable<ODataResponse<T>> ;
    Fetch<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args): T }): Observable<ODataCollectionResponse<T>>;
    Create<T extends TBaseContentType, O extends T['options']>(path: string, opt: O, contentType: { new (opt: O, repository): T }, repository: IRepository<THttpProviderType, TBaseContentType>): Observable<T>;
    Post<T>(path: string, content: T, postedContentType?: { new (...args): T }): Observable<T>;
    Delete(id: number, permanent: boolean): Observable<any>;
    Patch<T extends TBaseContentType>(id: number, contentType: {new(...args): T}, fields: Partial<T['options']>): Observable<T>;
    Put<T extends TBaseContentType>(id: number, contentType: {new(...args): T}, fields: T['options']): Observable<T>;
    CreateCustomAction<TReturnType>(actionOptions: ICustomActionOptions, options?: IODataParams, returns?: {new(...args): TReturnType}): Observable<TReturnType>;
    Upload(path: string, data: Object, creation: boolean): Observable<Object>;

}