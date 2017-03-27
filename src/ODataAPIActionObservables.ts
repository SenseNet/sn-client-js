import * as Rx from '@reactivex/rxjs';
import { ODataHelper } from './ODataHelper';
import { Content } from './Content';
import { ODataApi } from './ODataApi';
const { ajax } = Rx.Observable;
import { Value, Properties } from 'ts-json-properties';

/**
 * This module contains methods for sending requests and getting responses from the Content Repository through OData REST API. 
 * 
 * Following methods return Rxjs ActionObservables which are made from the ajax requests' promises. 
 */

export module ODataApiActionObservables {
    /**
     * Constant to hold the service token. By default it is OData.svc but before you start developing with sn-client-js check the related config in your Sense/Net portal's
     * web.config. If there's no ```ODataServiceToken``` config it fallbcks to the default so you also have to use the default 'OData.svc' in your TypeScript or JavaScript code.
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
            return `${window['siteUrl']}${ODATA_SERVICE_TOKEN()}`;
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
    export const GetContent = (options: ODataApi.ODataRequestOptions) => ajax({ url: `${options.path}${ODataHelper.buildUrlParamString(options.params)}`, crossDomain: crossDomainParam(), method: 'GET' });
    /**
     * Method to fetch children of a Content from the Content Repository through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params path {string} Path of the parent Content.
     * @params params {string} A string with the neccessarry request url params.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const FetchContent = (path: string, params: string) => ajax({ url: `${ROOT_URL()}${path}${params}`, crossDomain: crossDomainParam(), method: 'GET' });
    // TODO: id-val is menjen a create
    /**
     * Method to create a Content as a children of a given parent Content in the Content Repository through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params path {string} Path of the parent Content.
     * @params content {Content} A Content object with the saveable fields as properties.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const CreateContent = (path: string, content: Content) => ajax({
        url: `${ROOT_URL()}${path}`,
        method: 'POST',
        crossDomain: crossDomainParam(),
        body: `models=[${JSON.stringify(content)}]`
    });
    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params id {number} Id of the Content.
     * @params permanently {boolean} Defines whether the Content should be moved to the Trash or deleted permanently.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const DeleteContent = (id: number, permanently: boolean = false) => ajax({
        url: `${ROOT_URL()}/content(${id})/Delete`,
        method: 'POST',
        crossDomain: crossDomainParam(),
        body: JSON.stringify({ 'permanent': permanently })
    });

    /**
     * Method to modify a single or multiple fields of a Content through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params id {number} Id of the Content.
     * @params fields {Object} An Object with the fieldsnames and values that must be saved.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const PatchContent = (id: number, fields: Object) =>
        ajax({
            url: `${ROOT_URL()}/content(${id})`,
            method: 'PATCH',
            responseType: 'json',
            crossDomain: crossDomainParam(),
            body: `models=[${JSON.stringify(fields)}]`
        })
    /**
     * Method to set multiple fields of a Content and clear the rest through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params id {number} Id of the Content.
     * @params fields {Object} An Object with the fieldsnames and values that must be saved.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const PutContent = (id: number, fields: Object) =>
        ajax({
            url: `${ROOT_URL()}/content(${id})`,
            method: 'PUT',
            responseType: 'json',
            crossDomain: crossDomainParam(),
            body: `models=[${JSON.stringify(fields)}]`
        })
    // TODO: custom action
    /**
     * Creates a wrapper function for a callable custom OData action.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params action {CustomAction} A CustomAction configuration object.
     * @params options {IODataParams} An object that holds the config of the ajax request like urlparameters or data.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const CreateCustomAction = (action: ODataApi.CustomAction, options?: ODataApi.IODataParams) => {
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
    export const Login = (action: ODataApi.CustomAction, options?: ODataApi.IODataParams) => {
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

    export const Logout = (action: ODataApi.CustomAction, options?: ODataApi.IODataParams) => {
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

    export const Upload = (path: string, data: Object, creation: boolean) => {
        let Observable = Rx.Observable;
        let url = `${ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        }
        return ajax({
            url,
            body: JSON.stringify(data)
        });
    }
}