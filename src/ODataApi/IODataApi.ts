/**
 * @module ODataApi
 */ /** */
 
import { ODataRequestOptions } from './ODataRequestOptions';
import { IContent, IRepository } from '../Repository';
import { BaseHttpProvider } from '../HttpProviders';
import { ICustomActionOptions, IODataParams } from './';

export interface IODataApi<THttpProviderType extends BaseHttpProvider, TBaseContentType extends IContent> {
    Get<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args): T });
    Fetch<T extends TBaseContentType>(options: ODataRequestOptions);
    Create<T extends TBaseContentType, O extends T['options']>(path: string, opt: O, contentType: { new (opt: O, repository): T }, repository: IRepository<THttpProviderType, TBaseContentType>);
    Post<T>(path: string, content: T, postedContentType?: { new (...args): T });
    Delete(id: number, permanent: boolean);
    Patch(id: number, fields: Object);
    Put(id: number, fields: Object);
    CreateCustomAction(actionOptions: ICustomActionOptions, options?: IODataParams);
    Upload(path: string, data: Object, creation: boolean);

}