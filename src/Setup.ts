import { Http } from './Http';
import * as Path from 'path';
import { Observable } from '@reactivex/rxjs';

export module Setup {
    export interface IInitializationOptions<THttpProvider> {
        HttpProvider: { new (): THttpProvider }
        SiteUrl: string;
        ServiceToken: string;
    }

    let _initialized: boolean = false;
    export function InitializeCustom<THttpProvider extends Http.IHttpProvider,
        THttpReturnType>(options: IInitializationOptions<THttpProvider>) {
        if (_initialized) {
            throw Error('Sense/NET Components are already initialized');
        }
        _httpProvider = Http.Provider.Create(options.HttpProvider);
        _initialized = true;
    }


    let _httpProvider: Http.IHttpProvider;
    export function GetHttpProvider() {
        if (!_httpProvider)
            throw Error('Sense/NET Components not initialized. Please run Setup.InitializeDefault() or Setup.InitializeCustom({}) before using the HttpProvider!');
        return _httpProvider;
    }

    export function InitializeConfig(SnConfig: any = {}) {
        InitializeCustom({
            HttpProvider: Http.RxObservableHttpProvider,
            ServiceToken: SnConfig['ServiceToken'] || '/OData.svc',
            SiteUrl: SnConfig['SiteUrl'] || ''
        })
    }
}