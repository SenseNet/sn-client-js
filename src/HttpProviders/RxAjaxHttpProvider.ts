/**
 * @module HttpProviders
 *//** */

import { Observable, AjaxRequest } from '@reactivex/rxjs';
import { BaseHttpProvider } from './';
import { SnConfigModel } from '../Config';

/**
 * This is the default RxJs-Ajax based Http calls.
 */
export class RxAjaxHttpProvider extends BaseHttpProvider {

    public ForceCheckCrossDomain: boolean = true;

    private isCrossDomain(path: string): boolean {
        return path.indexOf(SnConfigModel.DEFAULT_BASE_URL) === -1;
    }

    constructor(){
        super();
        this.SetGlobalHeader('content-type', 'application/json; charset=utf-8');
        this.SetGlobalHeader('Accept', 'application/json');
    }

    protected AjaxInner<T>(tReturnType, options: AjaxRequest): Observable<T> {
        
        if (this.ForceCheckCrossDomain){
            const crossDomain = this.isCrossDomain(options.url || '');            
            options.withCredentials = crossDomain;
            options.crossDomain = crossDomain;
        }
        return Observable.ajax(options).map(req => req.response as T).share();
    }
}