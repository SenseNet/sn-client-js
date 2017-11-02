/**
 * @module ODataApi
 */ /** */

import { Observable } from '@reactivex/rxjs';
import { IContent, ISavedContent, SavedContent } from '../Content';
import { BaseHttpProvider } from '../HttpProviders';
import { BaseRepository } from '../Repository/BaseRepository';
import { ODataHelper } from '../SN';
import { CustomAction, ICustomActionOptions, IODataParams, IODataRequestOptions, ODataCollectionResponse, ODataResponse } from './';

/**
 * This class contains methods and classes for sending requests and getting responses from the Content Repository through OData REST API.
 *
 * Following methods return Rxjs Observables which are made from the ajax requests' promises. Action methods like Delete or Rename on Content calls this methods,
 * gets their responses as Observables and returns them so that you can subscribe them in your code.
 */
export class ODataApi<THttpProvider extends BaseHttpProvider> {

    /**
     * The HTTP provider instance for making AJAX calls.
     */

    /**
     * @param {BaseRepository} repository Reference to a Repository instance
     */
    constructor(
        private readonly _repository: BaseRepository<THttpProvider>,
    ) {
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
    public Get<T extends IContent>(options: IODataRequestOptions<T>): Observable<ODataResponse<T & ISavedContent>> {

        return this._repository.Ajax<ODataResponse<T & ISavedContent>>(`${options.path}?${ODataHelper.buildUrlParamString(this._repository.Config, options.params)}`, 'GET').share();
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
    public Fetch<T extends IContent = IContent>(options: IODataRequestOptions<T>): Observable<ODataCollectionResponse<T & ISavedContent>> {

        return this._repository.Ajax<ODataCollectionResponse<T & ISavedContent>>(`${options.path}?${ODataHelper.buildUrlParamString(this._repository.Config, options.params)}`, 'GET').share();
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
    public Post<T extends IContent>(
        path: string,
        contentBody: T): Observable<SavedContent<T>> {
        (contentBody as any).__ContentType = contentBody.Type;
        return this._repository
            .Ajax(ODataHelper.getContentURLbyPath(path), 'POST', ODataResponse, JSON.stringify(contentBody))
            .map((resp) => resp.d)
            .share();
    }

    /**
     * Method to delete a Content from the Content Repository through OData REST API.
     *
     * @param {number} id Id of the Content that will be deleted.
     * @param {number} permanentc Determines whether the Content should be moved to the Trash or be deleted permanently.
     * @returns {Observable} Returns an observable that you can subscribe of in your code.
     */
    public Delete = (id: number, permanent?: boolean): Observable<any> =>
        this._repository.Ajax(`/content(${id})`, 'DELETE', Object, { permanent }).share()

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
    public Patch<T extends IContent>(id: number, fields: T): Observable<T & ISavedContent> {

        const contentTypeWithResponse = ODataResponse as { new(...args: any[]): ODataResponse<T & ISavedContent> };
        return this._repository.Ajax(`/content(${id})`, 'PATCH', contentTypeWithResponse, `models=[${JSON.stringify(fields)}]`)
            .map((result) => result.d);
    }

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
    public Put<T extends IContent>(id: number, fields: T): Observable<SavedContent<T>> {
        const contentTypeWithResponse = ODataResponse as { new(...args: any[]): ODataResponse<SavedContent<T>> };
        return this._repository.Ajax(`/content(${id})`, 'PUT', contentTypeWithResponse, `models=[${JSON.stringify(fields)}]`)
            .map((result) => result.d);
    }

    /**
     * Creates a wrapper function for a callable custom OData action.
     *
     * This method creates an Observable, sends an ajax request to the server and convert the reponse to promise which will be the argument of the Observable.
     * @param {ICustomActionOptions} actionOptions A CustomAction configuration object.
     * @param {IODataParams} options An object that holds the config of the ajax request like urlparameters or data.
     * @param {new(...args): TReturnType} returns Th type that the action should return
     * @returns {Observable<TReturnType>} Returns an Rxjs observable whitch will be resolved with TReturnType that you can subscribe of in your code.
     */
    public CreateCustomAction<TReturnType>(actionOptions: ICustomActionOptions, options?: IODataParams<any>, returns?: { new(...args: any[]): TReturnType }): Observable<TReturnType> {
        if (!returns) {
            returns = Object as { new(...args: any[]): any };
        }
        const action = new CustomAction(actionOptions);
        const cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = ODataHelper.joinPaths(ODataHelper.getContentUrlbyId(action.id), action.name);
        } else if (action.path) {
            path = ODataHelper.joinPaths(ODataHelper.getContentURLbyPath(action.path), action.name);
        } else {
            const error = new Error('No Id or Path provided.');
            this._repository.Events.Trigger.CustomActionFailed({
                ActionOptions: actionOptions,
                ODataParams: options,
                ResultType: returns,
                Error: error
            });
            throw error;
        }
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }

        if (path.indexOf('OData.svc(') > -1) {
            const start = path.indexOf('(');
            path = path.slice(0, start) + '/' + path.slice(start);
        }

        if (typeof action.isAction === 'undefined' || !action.isAction) {
            const ajax = this._repository.Ajax(path, 'GET', returns).share();
            ajax.subscribe((resp) => {
                this._repository.Events.Trigger.CustomActionExecuted({
                    ActionOptions: actionOptions,
                    ODataParams: options,
                    Result: resp
                });
            }, (err) => {
                this._repository.Events.Trigger.CustomActionFailed({
                    ActionOptions: actionOptions,
                    ODataParams: options,
                    ResultType: returns as any,
                    Error: err
                });
            });
            return ajax;
        } else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                const ajax = this._repository.Ajax(path, 'POST', returns, JSON.stringify(options.data)).share();
                ajax.subscribe((resp) => {
                    this._repository.Events.Trigger.CustomActionExecuted({
                        ActionOptions: actionOptions,
                        ODataParams: options,
                        Result: resp
                    });
                }, (err) => {
                    this._repository.Events.Trigger.CustomActionFailed({
                        ActionOptions: actionOptions,
                        ODataParams: options,
                        ResultType: returns as any,
                        Error: err
                    });
                });
                return ajax;
            } else {
                const ajax = this._repository.Ajax(path, 'POST', returns).share();
                ajax.subscribe((resp) => {
                    this._repository.Events.Trigger.CustomActionExecuted({
                        ActionOptions: actionOptions,
                        ODataParams: options,
                        Result: resp
                    });
                }, (err) => {
                    this._repository.Events.Trigger.CustomActionFailed({
                        ActionOptions: actionOptions,
                        ODataParams: options,
                        ResultType: returns as any,
                        Error: err
                    });
                });
                return ajax;
            }
        }
    }

    public Upload = (path: string, data: any, creation: boolean): Observable<any> => {
        let url = `${ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        } else {
            url = url;
        }
        return this._repository.Ajax(url, 'POST', Object, data);
    }
}
