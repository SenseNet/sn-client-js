/**
 * @module ODataApi
 */ /** */
 
import { ODataRequestOptions } from './ODataRequestOptions';
import { IRepository } from '../Repository';
import { BaseHttpProvider } from '../HttpProviders';
import { ICustomActionOptions, IODataParams, ODataResponse, ODataCollectionResponse } from './';
import { Observable } from '@reactivex/rxjs';
import { Content } from '../Content';

/**
 * Generic interface for ODataApi-s
 */
export interface IODataApi<THttpProviderType extends BaseHttpProvider, TBaseContentType extends Content> {
    Get<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args: any[]): T }): Observable<ODataResponse<T['options']>> ;
    Fetch<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args: any[]): T }): Observable<ODataCollectionResponse<T['options']>>;
    Create<T extends TBaseContentType, O extends T['options']>(path: string, opt: O, contentType: { new (opt: O, repository): T }, repository: IRepository<THttpProviderType, TBaseContentType>): Observable<T['options']>;
    Post<T extends TBaseContentType>(path: string, contentBody: T['options'], postedContentType?: { new (...args: any[]): T }): Observable<T['options']>;
    Delete(id: number, permanent: boolean): Observable<any>;
    Patch<T extends TBaseContentType>(id: number, contentType: {new(...args): T}, fields: T['options']): Observable<T['options']>;
    Put<T extends TBaseContentType>(id: number, contentType: {new(...args): T}, fields: T['options']): Observable<T['options']>;
    CreateCustomAction<TReturnType>(actionOptions: ICustomActionOptions, options?: IODataParams, returns?: {new(...args): TReturnType}): Observable<TReturnType>;
    Upload(path: string, data: Object, creation: boolean): Observable<Object>;

}