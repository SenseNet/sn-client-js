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
import { Content } from '../Content';

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
    
    /**
     * @param {THttpProvider} providerRef Reference to a specifed HTTP Provider to make Ajax calls
     * @param {IRepository} repository Reference to a Repository instance
     */
    constructor(
        providerRef: { new (): THttpProvider },
        private readonly repository: IRepository<THttpProvider, any>,
    ) {
        this.httpProvider = new providerRef();
    }

    /**
     * Method to get a Content from the Content Repository through OData REST API.
     *
     * @param {ODataRequestOptions} options Object with the params of the ajax request.
     * @param {new(...args): T} returns The content type that will be returned
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     * 
     * ```ts
     * myODataApi.Get(new ODataApi.ODataRequestOptions({
     *      path: 'Root/Sites/Default_site/todos'
     *      }), ContentTypes.TaskList)
     *     .subscribe(result=>{
     *          console.log('My TaskList is:', result.d)
     *      });
     * ```
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
     * 
     * ```ts
     * myODataApi.Fetch(new ODataApi.ODataRequestOptions({
     *       path: 'Root/Sites/Default_site/todos'
     *       }), ContentTypes.Task)
     *   .subscribe(result=>{
     *      console.log('Tasks count:', result.d.__count);
     *      console.log('The Tasks are:', result.d.results);
     *   });
     * ```
     */
    public Fetch<T extends TBaseContentType = TBaseContentType>(
            options: ODataRequestOptions,
            returns?: { new (...args): T }): Observable<ODataCollectionResponse<T>> {

        if (!returns) {
            returns = Content as {new(...args)};
        }

        return this.repository.Ajax<ODataCollectionResponse<T['options']>>(`${options.path}${ODataHelper.buildUrlParamString(options.params)}`, 'GET')
            .map(resp => {
                resp.d.results = resp.d.results.map(r => {
                    return new returns(r, this.repository);
                });
                return resp;
            });
    }

    /**
     * Method to create a content in the sense NET Content Repoository.
     * @param {string} path The Path of the content
     * @param {IContentOptions} opt The options (fields) for the content to be created.
     * @param { new(opt, repository):T } contentType The type of the content
     * @param {IRepository} repository The repository for the content creation
     * @returns {Observable<T>} An observable whitch will be updated with the created content.
     * 
     * ```ts
     * myODataApi.Create('Root/Sites/Default_site/todos', {
     *       Name: 'My New Task',
     *       DueDate: new Date(),
     *      }, ContentTypes.Task)
     *  .subscribe(result=>{
     *      console.log('My New Task is:', result);
     *  });
     * ```
     */
    public Create<T extends TBaseContentType, O extends T['options']>(
            path: string,
            opt: O,
            contentType: { new (opt: O, repository): T },
            repository = this.repository): Observable<T> {

                opt.__ContentType = opt.Type || contentType.name;
                return this.repository.Ajax(ODataHelper.getContentURLbyPath(path), 'POST', contentType, JSON.stringify(opt));
    }

    /**
     * Method to post a created content into the sense NET Content Repoository.
     * @param {string} path The Path of the content
     * @param {T} content The options (fields) for the content to be created.
     * @param { new(opt, repository):T } postedContentType The type of the content
     * @param {IRepository} repository The repository for the content creation
     * @returns {Observable<T>} An observable whitch will be updated with the created content.
     * 
     * ```ts
     *  const myTask = new ContentTypes.Task({
     *       Name: 'My New Task',
     *       DueDate: new Date(),
     *  }, myRepository)
     * 
     *  myODataApi.Post('Root/Sites/Default_site/todos', myTask, ContentTypes.Task)
     *  .subscribe(result=>{
     *      console.log('My New Task is:', result);
     *  });
     * ```
     */
    public Post<T extends TBaseContentType>(
        path: string,
        content: T,
        postedContentType?: { new (...args): T }): Observable<T> {

            let opt = content.options;
            opt.__ContentType = opt.Type || postedContentType.name;
            return this.repository.Ajax<T>(ODataHelper.getContentURLbyPath(path), 'POST', postedContentType, JSON.stringify(opt));
    }

    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     *
     * @param {number} id Id of the Content that will be deleted.
     * @param {number} permanentc Determines whether the Content should be moved to the Trash or be deleted permanently.
     * @returns {Observable} Returns an observable that you can subscribe of in your code.
     */
    public Delete = (id: number, permanent: boolean): Observable<any> =>
        this.repository.Ajax(`/content(${id})`, 'DELETE', Object, { 'permanent': permanent })


    /**
     * Method to modify a single or multiple fields of a Content through OData REST API.
     *
     * @param {number} id Id of the Content that will be modified.
     * @param {{new(...args): T}} contentType The type of the content
     * @param {Partial<T['options']>} fields Contains the modifiable fieldnames as keys and their values.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     * 
     * ```ts 
     * myODataApi.Patch(3, ContentTypes.Task, {
     *       Name: 'MyUpdatedTask'
     *  })
     * .subscribe(result=>{
     *      console.log('My Updated Task is:', result);
     * });
     * ```
     */
    public Patch = <T extends TBaseContentType>(id: number, contentType: {new(...args): T}, fields: Partial<T['options']>): Observable<T> =>
        this.repository.Ajax(`/content(${id})`, 'PATCH', contentType, `models=[${JSON.stringify(fields)}]`)


    /**
     * Method to set multiple fields of a Content and clear the rest through OData REST API.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @param {number} id Id of the Content that will be modified.
     * @param {{new(...args): T}} contentType The type of the content
     * @param {T['options']} fields Contains the modifiable fieldnames as keys and their values.
     * @returns {Observable} Returns an Rxjs observable that you can subscribe of in your code.
     * 
     * ```ts 
     * myODataApi.Put(3, ContentTypes.Task, {
     *       Name: 'MyUpdatedTask'
     *  })
     * .subscribe(result=>{
     *      console.log('My Updated Task is:', result);
     * });
     * ```
     */
    public Put = <T extends TBaseContentType>(id: number, contentType: {new(...args): T}, fields: T['options']): Observable<T> =>
        this.repository.Ajax<T>(`/content(${id})`, 'PUT', contentType, `models=[${JSON.stringify(fields)}]`);

    /**
      * Creates a wrapper function for a callable custom OData action.
      *
      * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
      * @param {ICustomActionOptions} actionOptions A CustomAction configuration object.
      * @param {IODataParams} options An object that holds the config of the ajax request like urlparameters or data.
      * @param {new(...args): TReturnType} returns Th type that the action should return
      * @returns {Observable<TReturnType>} Returns an Rxjs observable whitch will be resolved with TReturnType that you can subscribe of in your code.
      */
    public CreateCustomAction<TReturnType>(actionOptions: ICustomActionOptions, options?: IODataParams, returns?: {new(...args): TReturnType}): Observable<TReturnType>{
        if (!returns){
            returns = Object as {new(...args)};
        }
        let action = new CustomAction(actionOptions);
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = ODataHelper.joinPaths(ODataHelper.getContentUrlbyId(action.id), action.name);
        }
        else {
            path = ODataHelper.joinPaths(ODataHelper.getContentURLbyPath(action.path), action.name);
        }
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`
        }

        if (path.indexOf('OData.svc(') > -1) {
            const start = path.indexOf('(');
            path = path.slice(0, start) + '/' + path.slice(start);
        }

        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';

        if (typeof action.isAction === 'undefined' || !action.isAction) {
            return this.repository.Ajax(path, 'GET', returns);
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return this.repository.Ajax(path, 'POST', returns, {
                    body: JSON.stringify(options.data)
                });
            }
            else {
                return this.repository.Ajax(path, 'POST', returns);
            }
        }
    }

    public Upload = (path: string, data: Object, creation: boolean): Observable<Object> => {
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