/**
 * @module ODataApi
 * @preferred
 * 
 * @description This module contains OData-related classes and functions.
 */ /** */

import { IRepository, IContent } from '../Repository';
import { BaseHttpProvider } from '../HttpProviders';
import { ODataRequestOptions, IODataParams, CustomAction, ODataResponse, ICustomActionOptions, IODataApi, ODataCollectionResponse } from './';
import { ODataHelper } from '../SN';
import { Observable } from '@reactivex/rxjs';

/**
 * This class contains methods and classes for sending requests and getting responses from the Content Repository through OData REST API.
 *
 * Following methods return Rxjs Observables which are made from the ajax requests' promises. Action methods like Delete or Rename on Content calls this methods,
 * gets their responses as Observables and returns them so that you can subscribe them in your code.
 */
export class ODataApi<THttpProvider extends BaseHttpProvider, TBaseContentType extends IContent> implements IODataApi<THttpProvider, TBaseContentType>{
    /**
     * The HTTP provider instance for making AJAX calls.
     */
    private readonly httpProvider: THttpProvider;
    constructor(
        providerRef: { new (): THttpProvider },
        private readonly baseUrl: string,
        private readonly serviceToken: string,
        private readonly repository: IRepository<THttpProvider, any>,
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
    public Get<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args): T }): Observable<ODataResponse<T>> {
        return this.repository.Ajax<ODataResponse<T['options']>>(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`, 'GET')
            .map(resp => {
                resp.d = new returns(resp.d);
                return resp;
            });
    }

    /**
     * Method to fetch children of a Content from the Content Repository through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params options {ODataRequestOptions} Object with the params of the ajax request.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    public Fetch<T extends TBaseContentType>(options: ODataRequestOptions, returns?: { new (...args): T }): Observable<ODataCollectionResponse<T>> {
        return this.repository.Ajax<ODataCollectionResponse<T['options']>>(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`, 'GET')
            .map(resp => {
                resp.d.results.map(r => r = new returns(r));
                return resp;
            });
    }

    public Create<T extends TBaseContentType, O extends T['options']>(path: string, opt: O, contentType: { new (opt: O, repository): T }, repository = this.repository) {
        return this.repository.Ajax(`${ODataHelper.getContentURLbyPath(path)}`, 'POST', contentType, `models=[${JSON.stringify(opt)}]`);
    }

    public Post<T>(path: string, content: T, postedContentType?: { new (...args): T }) {
        return this.repository.Ajax<T>(`${ODataHelper.getContentURLbyPath(path)}`, 'POST', postedContentType, `models=[${ODataHelper.stringifyWithoutCircularDependency(content)}]`);
    }

    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @params id {number} Id of the Content that will be deleted.
     * @params permanent {boolean} Determines whether the Content should be moved to the Trash or be deleted permanently.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     */
    public Delete = (id: number, permanent: boolean) =>
        this.repository.Ajax(`/content(${id})/Delete`, 'POST', Object, { 'permanent': permanent })

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
    public Patch = (id: number, fields: Object) =>
        this.repository.Ajax(`/content(${id})`, 'PATCH', Object, `models=[${JSON.stringify(fields)}]`)

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
    public Put = (id: number, fields: Object) =>
        this.repository.Ajax(`/content(${id})`, 'PUT', Object, `models=[${JSON.stringify(fields)}]`);

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
    public CreateCustomAction = (actionOptions: ICustomActionOptions, options?: IODataParams) => {
        let action = new CustomAction(actionOptions);
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
                crossDomain: this.repository.IsCrossDomain,
            })
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return this.httpProvider.Ajax(Object, {
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: this.repository.IsCrossDomain,
                    body: JSON.stringify(options.data)
                });
            }
            else {
                return this.httpProvider.Ajax(Object, {
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: this.repository.IsCrossDomain
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
        return this.repository.Ajax(url, 'POST', Object, data);
    }
}