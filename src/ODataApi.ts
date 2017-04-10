import { ODataHelper } from './ODataHelper';
import { Http } from './Http';
import { Content } from './Content';
import { ContentTypes } from './ContentTypes';
import { Observable, AjaxRequest } from '@reactivex/rxjs';
import * as Rx from '@reactivex/rxjs';
import { Repository } from './Repository';

/**
 * This module contains methods and classes for sending requests and getting responses from the Content Repository through OData REST API.
 *
 * Following methods return Rxjs Observables which are made from the ajax requests' promises. Action methods like Delete or Rename on Content calls this methods,
 * gets their responses as Observables and returns them so that you can subscribe them in your code.
 */
export module ODataApi {

    type RequestMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

    export class Service<THttpProvider extends Http.IHttpProvider<Http.ReturnType<any>>, TProviderReturns>{

        private get isCrossDomain() {
            if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
                return true;
            }
            else {
                return false;
            }
        }

        private get ODataBaseUrl() {
            return `${this.baseUrl}/${this.serviceToken}`
        }

        private Ajax<T>(path: string, method: RequestMethodType, returns: { new (...args): T }, body?: any) {
            return this.httpProvider.Ajax(
                returns,
                {
                    url: `${this.ODataBaseUrl}/${path}`,
                    method: method,
                    body: body,
                    crossDomain: this.isCrossDomain,
                    responseType: 'json'
                });
        }


        private readonly httpProvider: THttpProvider;
        constructor(
            providerRef: { new (): THttpProvider },
            private readonly baseUrl: string,
            private readonly serviceToken: string,
            private readonly repository: Repository<THttpProvider, any>
        ) {
            this.httpProvider = new providerRef();
        }

        /**
         * Method to get a Content from the Content Repository through OData REST API.
         *
         * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
         * @params options {ODataRequestOptions} Object with the params of the ajax request.
         * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
         */
        public GetContent = (options: ODataRequestOptions) => this.Ajax<Content>(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`, 'GET', Content);
        // {
        //     return this.httpProvider.Ajax(`${this.baseUrl}${options.path}${ODataHelper.buildUrlParamString(options.params)}`);
        // }

        /**
         * Method to fetch children of a Content from the Content Repository through OData REST API.
         *
         * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
         * @params options {ODataRequestOptions} Object with the params of the ajax request.
         * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
         */
        public FetchContent = (options: ODataRequestOptions) => this.Ajax(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`, 'GET', Content)
        // this.httpProvider.Ajax({
        //     url: `${this.baseUrl}${options.path}${ODataHelper.buildUrlParamString(options.params)}`,
        //     crossDomain: this.isCrossDomain,
        //     method: 'GET'
        // });


        public CreateContent<T extends Content, O extends T['options']>(newContent: { new (opt: O, repository): T }, path: string, opt: O, repository = this.repository) {
            let contentItem = new newContent(opt, repository);
            return this.Ajax(`${ODataHelper.getContentURLbyPath(path)}`, 'POST', Content);
        }
        
        public PostContent<T>(path: string, content: T, repository = this.repository) {
            return this.Ajax(`${ODataHelper.getContentURLbyPath(path)}`, 'POST', Content, `models=[${JSON.stringify(content)}]`);
        }        

        /**
         * Method to delete a Content from the Content Repository through OData REST API.
         *
         * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
         * @params id {number} Id of the Content that will be deleted.
         * @params permanent {boolean} Determines whether the Content should be moved to the Trash or be deleted permanently.
         * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
         */
        public DeleteContent = (id: number, permanent: boolean) =>
            this.Ajax(`/content(${id})/Delete`, 'POST', Object, { 'permanent': permanent })

        // this.httpProvider.Ajax({
        //     url: `${this.baseUrl}/content(${id})/Delete`,
        //     method: 'POST',
        //     crossDomain: this.isCrossDomain,
        //     body: JSON.stringify({ 'permanent': permanent })
        // });

        /**
         * Method to modify a single or multiple fields of a Content through OData REST API.
         *
         * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
         * @params id {number} Id of the Content that will be modified.
         * @params fields {Object} Contains the modifiable fieldnames as keys and their values.
         * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
         */
        public PatchContent = (id: number, fields: Object) =>
            this.Ajax(`/content(${id})`, 'PATCH', Object, `models=[${JSON.stringify(fields)}]`)

        // this.httpProvider.Ajax({
        //     url: `${this.baseUrl}/content(${id})`,
        //     method: 'PATCH',
        //     responseType: 'json',
        //     crossDomain: this.isCrossDomain,
        //     body: `models=[${JSON.stringify(fields)}]`
        // })

        /**
         * Method to set multiple fields of a Content and clear the rest through OData REST API.
         *
         * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
         * @params id {number} Id of the Content that will be modified.
         * @params fields {Object} Contains the modifiable fieldnames as keys and their values.
         * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
         */
        public PutContent = (id: number, fields: Object) =>
            this.Ajax(`/content(${id})`, 'PUT', Object, `models=[${JSON.stringify(fields)}]`);

        // this.httpProvider.Ajax({
        //     url: `${this.baseUrl}/content(${id})`,
        //     method: 'PUT',
        //     responseType: 'json',
        //     crossDomain: this.isCrossDomain,
        //     body: `models=[${JSON.stringify(fields)}]`
        // })

        /**
          * Creates a wrapper function for a callable custom OData action.
          *
          * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
          * @params action {CustomAction} A CustomAction configuration object.
          * @params options {IODataParams} An object that holds the config of the ajax request like urlparameters or data.
          * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
          */
        public CreateCustomAction = (action: CustomAction, options?: IODataParams) => {
            let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
            let path = '';
            if (typeof action.id !== 'undefined') {
                path = `${this.baseUrl}${ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
            }
            else {
                path = `${this.baseUrl}${ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
            }
            if (cacheParam.length > 0) {
                path = `${path}?${cacheParam}`
            }

            if (path.indexOf('OData.svc(') > -1) {
                const start = path.indexOf('(');
                path = path.slice(0, start) + '/' + path.slice(start);
                console.log(path);
            }

            let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

            if (typeof action.isAction === 'undefined' || !action.isAction) {
                return this.httpProvider.Ajax(Object, {
                    url: `${path}${ODataHelper.buildUrlParamString(action.params)}`,
                    method: 'GET',
                    responseType: 'json',
                    crossDomain: this.isCrossDomain,
                })
            }
            else {
                if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                    return this.httpProvider.Ajax(Object, {
                        url: `${path}`,
                        method: 'POST',
                        crossDomain: this.isCrossDomain,
                        body: JSON.stringify(options.data)
                    });
                }
                else {
                    return this.httpProvider.Ajax(Object, {
                        url: `${path}`,
                        method: 'POST',
                        crossDomain: this.isCrossDomain
                    });
                }
            }
        }

        public Upload = (path: string, data: Object, creation: boolean) => {
            let url = `${ODataHelper.getContentURLbyPath(path)}/Upload`;
            if (creation) {
                url = `${url}?create=1`;
            }
            else {
                url = url;
            }
            return this.Ajax(url, 'POST', Object, data);
        }

        public Login = (action: CustomAction, options?: IODataParams) => {
            let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
            let path = `${this.baseUrl}/('Root')/Login`;
            if (cacheParam.length > 0) {
                path = `${path}?${cacheParam}`
            }

            let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return this.Ajax<ContentTypes.User>(path, 'POST', ContentTypes.User, options.data);
                // return this.httpProvider.Ajax({
                //     url: `${path}`,
                //     method: 'POST',
                //     crossDomain: this.isCrossDomain,
                //     body: JSON.stringify(options.data)
                // });
            }
            else {
                return this.Ajax(path, 'POST', ContentTypes.User);
                // return this.httpProvider.Ajax({
                //     url: `${path}`,
                //     method: 'POST',
                //     crossDomain: this.isCrossDomain
                // });
            }
        }

        public Logout = (action: CustomAction, options?: IODataParams) => {
            let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
            let path = `${this.baseUrl}/('Root')/Logout`;
            if (cacheParam.length > 0) {
                path = `${path}?${cacheParam}`
            }

            let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return this.Ajax(path, 'POST', Object, options.data);
            }
            else {
                return this.Ajax(path, 'POST', Object);
            }
        }

    }



    export class ODataRequestOptions {
        path: string;
        params: ODataParams[];
        async: boolean;
        type: string;
        success: Function;
        error: Function;
        complete: Function;

        constructor(options: IODataRequestOptions) {
            this.params = options.params || [];
            this.path = `${options.path}`;
            this.async = options.async || true;
            this.type = options.type || 'GET';
            this.success = options.success;
            this.error = options.error;
            this.complete = options.complete;
        }
    }

    export interface IODataRequestOptions {
        path: string;
        params?: ODataParams[];
        async?: boolean;
        type?: string;
        success?: Function;
        error?: Function;
        complete?: Function;
    }

    /**
     * Type of the OData option Object. Contains the possible OData params as properties.
     */
    export class ODataParams {
        select: string | string[];
        expand: string | string[] = null;
        orderby: string | string[];
        top: string;
        skip: string;
        filter: string;
        format: string;
        inlinecount: string;
        query: string;
        metadata: string;
        data: Object;

        constructor(options: IODataParams) {
            this.select = options.select;
            this.expand = options.expand;
            this.orderby = options.orderby;
            this.top = options.top;
            this.skip = options.skip;
            this.filter = options.filter;
            this.format = options.filter;
            this.inlinecount = options.inlinecount;
            this.query = options.query;
            this.metadata = options.metadata;
            this.data = options.data || [];
        }
    }

    export interface IODataParams {
        select?: string | string[];
        expand?: string | string[];
        orderby?: string | string[];
        top?: string;
        skip?: string;
        filter?: string;
        format?: string;
        inlinecount?: string;
        query?: string;
        metadata?: string;
        data?: Object;
    }

    export class CustomAction {
        name: string;
        id: number;
        path: string;
        params: string[] = [];
        requiredParams: string[] = [];
        isAction: boolean = false;
        noCache: boolean = false;
        constructor(options: ICustomActionOptions) {
            this.name = options.name;
            this.id = options.id;
            this.path = options.path;
            this.isAction = options.isAction || false;
            this.noCache = options.noCache || false;
            if (options.params) {
                for (let i = 0; i < options.params.length; i++) {
                    this.params.push(options.params[i]);
                }
            }
            if (options.requiredParams) {
                for (let i = 0; i < options.requiredParams.length; i++) {
                    this.params.push(options.requiredParams[i]);
                }
            }
        }
    }

    /**
     * Class that represents a custom action that bounds to a specified content, that has to be identified by its Id or Path
     */
    export class CustomContentAction extends CustomAction {

        /**
         * @constructs {CustomContentAction}
         * @param options The custom action options
         * @throws {Error} if the Id or Path is not provided
         */
        constructor(options: ICustomActionOptions) {
            if (!options.id && !options.path) {
                throw Error('Content.Id or Content.Path is required for this action');
            }
            super(options);

        }
    }

    interface ICustomActionOptions {
        name: string;
        id?: number;
        path?: string;
        params?: string[];
        requiredParams?: string[];
        isAction?: boolean;
        noCache?: boolean;
    }
}