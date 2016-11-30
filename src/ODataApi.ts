import { ODataHelper } from './ODataHelper';
import { Content } from './Content';
import 'isomorphic-fetch';
import * as Rx from '@reactivex/rxjs';
import {Value, Properties} from 'ts-json-properties';

/**
 * This module contains methods and classes for sending requests and getting responses from the Content Repository through OData REST API. 
 * 
 * Following methods return Rxjs Observables which are made from the ajax requests' promises. Action methods like Delete or Rename on Content calls this methods,
 * gets their responses as Observables and returns them so that you can subscribe them in your code.
 */
export module ODataApi {
    
    const sensenetConfig = Properties.getValue('sensenet');
    const config = Object.assign(sensenetConfig);
    let ROOT_URL = '/';
    if(typeof sensenetConfig !== 'undefined' && typeof sensenetConfig.url != 'undefined'){
        ROOT_URL = config.url;
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
        let promise: Promise<any> = fetch(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`);
        let source = Observable.fromPromise(promise);
        return source;
    }
    /**
     * Method to fetch children of a Content from the Content Repository through OData REST API.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params options {ODataRequestOptions} Object with the params of the ajax request.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const FetchContent = (options: ODataRequestOptions) => {
        let Observable = Rx.Observable;
        let promise: Promise<any> = fetch(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`);
        let source = Observable.fromPromise(promise);
        return source;
    }
    export const CreateContent = (path: string, content: Content) => {
        let contentItem = { __contentType: content.Type };
        for (let prop in content) {
            if (prop !== 'Type') {
                contentItem[prop] = content[prop];
            }
        }
        let Observable = Rx.Observable;
        let promise: Promise<any> = fetch(`${ROOT_URL}${path}`, ODataHelper.buildRequestBody(contentItem));
        let source = Observable.fromPromise(promise);
        return source;
    }
    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be deleted.
     * @params permanent {boolean} Determines whether the Content should be moved to the Trash or be deleted permanently.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const DeleteContent = (id: number, permanent: boolean) => {
        let Observable = Rx.Observable;
        let promise: Promise<any> = fetch(
            `${ROOT_URL}${ODataHelper.getContentUrlbyId(id)}/Delete`,
            JSON.stringify({ permanent: permanent })
        );
        let source = Observable.fromPromise(promise);
        return source;
    }
    /**
     * Method to modify a single or multiple fields of a Content through OData REST API.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be modified.
     * @params fields {Object} Contains the modifiable fieldnames as keys and their values.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const PatchContent = (id: number, fields: Object) => {
        let Observable = Rx.Observable;
        let promise: Promise<any> = fetch(
            `${ROOT_URL}${ODataHelper.getContentUrlbyId(id)}`,
            {
                method: 'PATCH',
                body: `models=[${JSON.stringify(fields)}]`
            }
        );
        let source = Observable.fromPromise(promise);
        return source;
    }
    /**
     * Method to set multiple fields of a Content and clear the rest through OData REST API.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be modified.
     * @params fields {Object} Contains the modifiable fieldnames as keys and their values.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const PutContent = (id: number, fields: Object) => {
        let Observable = Rx.Observable;
        let promise: Promise<any> = fetch(
            `${ROOT_URL}${ODataHelper.getContentUrlbyId(id)}`,
            {
                method: 'PUT',
                body: `models=[${JSON.stringify(fields)}]`
            }
        );
        let source = Observable.fromPromise(promise);
        return source;
    }
    /**
     * Creates a wrapper function for a callable custom OData action.
     * 
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params action {CustomAction} A CustomAction configuration object.
     * @params options {IODataParams} An object that holds the config of the ajax request like urlparameters or data.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    export const CreateCustomAction = (action: CustomAction, options?: IODataParams) => {
        let Observable = Rx.Observable;
        let promise: Promise<any>;
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
        else {
            path = path;
        }
        if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
            for (let option in options.data) {
                action.params[option] = options.data[option];
            }
        }

        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

        if (typeof action.isAction === 'undefined' || !action.isAction) {
            promise = fetch(`${path}${ODataHelper.buildUrlParamString(action.params)}`);
        }
        else {
            promise =
                fetch(`${path}`, {
                    method: 'POST',
                    body: body
                });
        }
        let source = Observable.fromPromise(promise);
        return source;
    }
    export const Upload = (path: string, data: Object, creation: boolean) => {
        let Observable = Rx.Observable;
        let url = `${ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        }
        else {
            url = url;
        }
        let promise: Promise<any> = fetch(url, JSON.stringify(data));
        let source = Observable.fromPromise(promise);
        return source;
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
            this.path = `${ROOT_URL}${options.path}`; //${ODataHelper.buildUrlParamString(this.params)}
            this.async = options.async || true;
            this.type = options.type || 'GET';
            this.success = options.success || function (response) { return response };
            this.error = options.error || function (xhr) { return xhr };
            this.complete = options.complete || function () { return 'done' };
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