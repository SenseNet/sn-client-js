import { ODataHelper } from './ODataHelper';
import { Http } from './http';
import { Content } from './Content';
import { Observable, AjaxRequest } from '@reactivex/rxjs';
import { Setup } from './Setup';
import * as Rx from '@reactivex/rxjs';

/**
 * This module contains methods and classes for sending requests and getting responses from the Content Repository through OData REST API.
 *
 * Following methods return Rxjs Observables which are made from the ajax requests' promises. Action methods like Delete or Rename on Content calls this methods,
 * gets their responses as Observables and returns them so that you can subscribe them in your code.
 */
export module ODataApi {

    let ajax = (options: AjaxRequest): Observable<any> => {
        return Setup.GetHttpProvider().Ajax(options);
    }

    /**
     * Constant to hold the service token. By default it is OData.svc but before you start developing with sn-client-js check the related config in your Sense/Net portal's
     * web.config. If there's no ```ODataServiceToken``` config it falls back to the default so you also have to use the default 'OData.svc' in your TypeScript or JavaScript code.
     * If it has a value in the web.config use the same value as your service token on client-side.
     */
    export const ODATA_SERVICE_TOKEN = () => {
        if (typeof window !== 'undefined' && typeof window['serviceToken'] !== 'undefined') {
            return `${window['serviceToken']}`;
        }
        else {
            return '/OData.svc';
        }
    };
    export const ROOT_URL = () => {
        if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
            return `${window['siteUrl']}/${ODATA_SERVICE_TOKEN()}`;
        }
        else {
            return ODATA_SERVICE_TOKEN();
        }
    };
    export const crossDomainParam = () => {
        if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Method to get a Content from the Content Repository through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params options {ODataRequestOptions} Object with the params of the ajax request.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export let GetContent = (options: ODataRequestOptions) => {
        let Observable = Rx.Observable;
        return ajax(`${ROOT_URL()}${options.path}${ODataHelper.buildUrlParamString(options.params)}`);
    }
    /**
     * Method to fetch children of a Content from the Content Repository through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params options {ODataRequestOptions} Object with the params of the ajax request.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const FetchContent = (options: ODataRequestOptions) =>
        ajax({ url: `${ROOT_URL()}${options.path}${ODataHelper.buildUrlParamString(options.params)}`, crossDomain: crossDomainParam(), method: 'GET' });

    export const CreateContent = (path: string, content: Content) => {
        let contentItem = { __ContentType: content.Type };
        for (let prop in content) {
            if (prop !== 'Type') {
                contentItem[prop] = content[prop];
            }
        }
        return ajax({
            url: `${ROOT_URL()}${ODataHelper.getContentURLbyPath(path)}`,
            method: 'POST',
            crossDomain: crossDomainParam(),
            body: `models=[${JSON.stringify(contentItem)}]`
        });
    }
    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be deleted.
     * @params permanent {boolean} Determines whether the Content should be moved to the Trash or be deleted permanently.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const DeleteContent = (id: number, permanent: boolean) => ajax({
        url: `${ROOT_URL()}/content(${id})/Delete`,
        method: 'POST',
        crossDomain: crossDomainParam(),
        body: JSON.stringify({ 'permanent': permanent })
    });
    /**
     * Method to modify a single or multiple fields of a Content through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be modified.
     * @params fields {Object} Contains the modifiable fieldnames as keys and their values.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const PatchContent = (id: number, fields: Object) => ajax({
        url: `${ROOT_URL()}/content(${id})`,
        method: 'PATCH',
        responseType: 'json',
        crossDomain: crossDomainParam(),
        body: `models=[${JSON.stringify(fields)}]`
    })
    /**
     * Method to set multiple fields of a Content and clear the rest through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be modified.
     * @params fields {Object} Contains the modifiable fieldnames as keys and their values.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const PutContent = (id: number, fields: Object) => ajax({
        url: `${ROOT_URL()}/content(${id})`,
        method: 'PUT',
        responseType: 'json',
        crossDomain: crossDomainParam(),
        body: `models=[${JSON.stringify(fields)}]`
    })
    /**
     * Creates a wrapper function for a callable custom OData action.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params action {CustomAction} A CustomAction configuration object.
     * @params options {IODataParams} An object that holds the config of the ajax request like urlparameters or data.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const CreateCustomAction = (action: CustomAction, options?: IODataParams) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = `${ROOT_URL()}${ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
        }
        else {
            path = `${ROOT_URL()}${ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
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
            return ajax({
                url: `${path}${ODataHelper.buildUrlParamString(action.params)}`,
                method: 'GET',
                responseType: 'json',
                crossDomain: crossDomainParam(),
            })
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return ajax({
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: crossDomainParam(),
                    body: JSON.stringify(options.data)
                });
            }
            else {
                return ajax({
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: crossDomainParam()
                });
            }
        }
    }
    export const Upload = (path: string, data: Object, creation: boolean) => {
        let url = `${ROOT_URL()}${ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        }
        else {
            url = url;
        }
        return ajax({
            url,
            body: JSON.stringify(data)
        });
    }

    export const Login = (action: CustomAction, options?: IODataParams) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let rootUrl = ROOT_URL();
        let path = `${rootUrl}/('Root')/Login`;
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`
        }

        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

        if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: crossDomainParam(),
                body: JSON.stringify(options.data)
            });
        }
        else {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: crossDomainParam()
            });
        }
    }

    export const Logout = (action: CustomAction, options?: IODataParams) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = `${ROOT_URL()}/('Root')/Logout`;
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`
        }

        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

        if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: crossDomainParam(),
                body: JSON.stringify(options.data)
            });
        }
        else {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: crossDomainParam()
            });
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