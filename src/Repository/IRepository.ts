/**
 * @module Repository
 */
/** */
import { BaseHttpProvider } from '../HttpProviders';
import { IContent } from './';
import { Observable } from '@reactivex/rxjs';
import { IODataApi } from '../ODataApi';
import { RequestMethodType } from '../HttpProviders';
import { IAuthenticationService } from '../Authentication';
import { SnConfigModel } from '../Config';

/**
 * Interface that describes the functionality for a sense NET Repository implementation.
 */
export interface IRepository<THttpProviderType extends BaseHttpProvider, TBaseContentType extends IContent> {
    
    /**
     * Public API endpoint to make Ajax calls to the current repository
     */
    Ajax<T>(path: string, method: RequestMethodType, returnsType?: { new (...args: any[]): T }, body?: any): Observable<T>;
    
    /**
     * Public API endpoint to load a content from a repository
     */
    Load<TContentType extends TBaseContentType = TBaseContentType>(idOrPath: string | number, options?: Object, version?: string, returns?: { new (...args: any[]): TContentType }): Observable<TContentType>;
    
    /**
     * public reference to the OData API used by the repository
     */
    readonly Content: IODataApi<THttpProviderType, TBaseContentType>;
    
    /**
     * public reference to the Authentication Service used by the reőository
     */
    readonly Authentication: IAuthenticationService;
    
    /**
     * public reference to the Configuration used by the repository
     */
    readonly Config: SnConfigModel;
}