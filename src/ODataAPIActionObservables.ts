import * as Rx from '@reactivex/rxjs';
import { ODataHelper } from './ODataHelper';
import { Content } from './Content';
import { ODataApi } from './ODataApi';
const { ajax } = Rx.Observable;

/**
 * This module contains methods for sending requests and getting responses from the Content Repository through OData REST API. 
 * 
 * Following methods return Rxjs ActionObservables which are made from the ajax requests' promises. 
 */
//TODO: leírni a module-t

export module ODataApiActionObservables {
    const ROOT_URL = 'https://daily.demo.sensenet.com/OData.svc';
    /**
     * Method to get a Content from the Content Repository through OData REST API.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params options {ODataRequestOptions} Object with the params of the ajax request.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const GetContent = (options: ODataApi.ODataRequestOptions) => {
        let Observable = Rx.Observable;
        let jqueryXhr: JQueryXHR = $.getJSON(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`);
        let promise: Promise<any> = Promise.resolve(jqueryXhr);
        let source = Observable.fromPromise(promise);
        return source;
    }
    /**
     * Method to fetch children of a Content from the Content Repository through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params path {string} Path of the parent Content.
     * @params params {string} A string with the neccessarry request url params.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const FetchContent = (path: string, params: string) => ajax.getJSON(`${path}${params}`);
    //TODO: id-val is menjen a create
    /**
     * Method to create a Content as a children of a given parent Content in the Content Repository through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params path {string} Path of the parent Content.
     * @params content {Content} A Content object with the saveable fields as properties.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const CreateContent = (path: string, content: Content) => ajax.post(`${path}`, 'models=[" + JSON.stringify(content) + "]');
    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     * 
     * This method returns an ActionObservable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the ActionObservable.
     * @params id {number} Id of the Content.
     * @params permanently {boolean} Defines whether the Content should be moved to the Trash or deleted permanently.
     * @returns {ActionObservable} Returns an ActionObservable.
     */
    export const DeleteContent = (id: number, permanently: boolean) => ajax.post(`${ROOT_URL}/content(${id})/Delete`, JSON.stringify({ 'permanent': permanently }));

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
            url: `${ROOT_URL}/content(${id})`,
            method: 'PATCH',
            responseType: 'json',
            body: 'models=[" + JSON.stringify(fields) + "]'
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
            url: `${ROOT_URL}/content(${id})`,
            method: 'PUT',
            responseType: 'json',
            body: 'models=[" + JSON.stringify(fields) + "]'
        })
    //TODO: custom action
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
            path = `${ROOT_URL}${ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
        }
        else {
            path = `${ROOT_URL}${ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
        }
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`
        }

        // for (let option in options.data) {
        //     action.params[option] = options.data[option];
        // }

        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

        if (typeof action.isAction === 'undefined' || !action.isAction) {
            return ajax({
                url: `${path}${ODataHelper.buildUrlParamString(action.params)}`,
                method: 'GET',
                responseType: 'json'
            })
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return ajax.post(`${path}`, JSON.stringify(options.data));
            }
            else {
                return ajax.post(`${path}`);
            }
        }
    }
    export const Upload = (path: string, data: Object, creation: boolean) => {
        let Observable = Rx.Observable;
        let url = `${ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        }
        let jqueryXhr: JQueryXHR =
            $.post(
                url,
                JSON.stringify(data)
            );
        let promise: Promise<any> = Promise.resolve(jqueryXhr);
        let source = Observable.fromPromise(promise);
        return source;
    }
}