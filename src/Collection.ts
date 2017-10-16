/**
 * @module Collection
 * @preferred
 * @description Class that represents a ```generic``` ```Content``` collection.
 *
 * It's the basic container type that wraps up a list of ```Content```. It provides methods to manipulate with ```Content``` like fetching, adding or removing data. It not neccesarily represents
 * a container ```Content``` with a type ```Folder``` or ```ContentList```, it could be also a result of a query. Since it is ```generic``` type of its children items is not defined strictly.
 */ /** */

import { Observable } from '@reactivex/rxjs';
import { CustomAction, IODataParams, IODataRequestOptions, ODataApi } from './ODataApi';
import { ODataHelper } from './SN';
import { Content } from './Content';
import { BaseRepository } from './Repository/BaseRepository';
import { BaseHttpProvider } from './HttpProviders/BaseHttpProvider';

export class Collection<T extends Content> {
    odata: ODataApi<BaseHttpProvider>;
    Path: string = '';

    /**
    * @constructs Collection
    * @param {T[]} items An array that holds items.
    * @param { IODataApi<any, any> } service The service to use as API Endpoint
    */
    constructor(private items: T[],
        private repository: BaseRepository,
        private readonly contentType: { new(...args: any[]): T } = Content as { new(...args: any[]): any }) {
        this.odata = repository.GetODataApi();
    }

    /**
     * Returns the items of the collection as an array.
     * @returns {Array}
     * ```ts
     * collection.GetItems();
     * ```
     */
    public Items(): T[] {
        return this.items;
    }

    /**
     * Returns an item by the given id.
     * @param {number} id The content's id
     * @returns {Content} the specified content
     * ```ts
     * collection.GetItem(1234);
     * ```
     */
    public Item(id: number): T | undefined {
        return this.items.find(i => i.Id === id);
    }

    /**
     * Returns the number of items in the collection.
     * @returns {number}
     * ```ts
     * collection.Count();
     * ```
     */
    public Count(): number {
        return this.items.length;
    }
    /**
    * Method to add an item to a local collection and to the Content Repository through OData REST API at the same time.
    *
     * Calls the method [CreateContent]{@link ODataApi.CreateContent} with the current collections path and the given content as parameters.
     * @param content {Content} The item that has to be saved.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let addContent = myCollection.Add({DisplayName: 'New content', }});
     * addContent
     *     .subscribe({
     *        next: response => {
     *            //do something after delete
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */
    public Add(content: T['options']): Observable<T> {
        const newcontent = this.odata.Post(this.Path, content, this.contentType)
            .map(resp => {
                return this.repository.HandleLoadedContent(resp as any, this.contentType);
            });
        newcontent
            .subscribe({
                next: (response) => {
                    this.items = [
                        ...this.items,
                        response
                    ];
                }
            });
        return newcontent;
    }
    /**
     * Method to remove an item from a local collection and from the Content Repository through OData REST API at the same time.
     *
     * Calls the method [DeleteContent]{@link ODataApi.DeleteContent} with the current collections path and the given items index as parameters.
     * @param index {number} Index of the item in the collection.
     * @param permanently {bool} Adjust if the Content should be moved to the Trash or deleted permanently.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let deleteContent = myCollection.Remove(3);
     * deleteContent
     *     .subscribe({
     *        next: response => {
     *            //do something after delete
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */
    /**
     * Method to remove an item from a local collection and from the Content Repository through OData REST API at the same time.
     *
     * Calls the method [DeleteContent]{@link ODataApi.DeleteContent} with the current collections path and the given items index as parameters.
     * @param items {number[]} number array of content indexes.
     * @param permanently {bool} Adjust if the Content should be moved to the Trash or deleted permanently.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let deleteContent = myCollection.Remove([3, 4]);
     * deleteContent
     *     .subscribe({
     *        next: response => {
     *            //do something after remove
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */
    public Remove(arg: number | number[], permanently: boolean = false): Observable<any> {
        if (typeof arg === 'number') {
            let content = this.items[arg];
            if (content && content.Id) {
                this.items =
                    this.items.slice(0, arg)
                        .concat(this.items.slice(arg + 1));

                return this.odata.Delete(content.Id, permanently ? permanently : false);
            } else {
                return Observable.of(undefined);
            }
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            this.items =
                this.items.filter((item, i) => arg.indexOf(i) > -1);
            let action = new CustomAction({ name: 'DeleteBatch', path: this.Path, isAction: true, requiredParams: ['paths'] });
            return this.odata.CreateCustomAction(action, { data: [{ 'paths': ids }, { 'permanently': permanently }] });
        }
    }
    /**
     * Method to fetch Content from the Content Repository.
     *
     * Calls the method [FetchContent]{@link ODataApi.FetchContent} with the current collections path and the given OData options.
     * If you leave the options undefined only the Id and the Type fields will be in the response. These two fields are always the part of the reponse whether they're added or not to the options
     * as selectable.
     * @param path {string} Path of the requested container item.
     * @param options {OData.IODataParams} Represents an ODataOptions object based on the IODataOptions interface. Holds the possible url parameters as properties.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let fetchContent = Collection.Read('newsdemo/external', {select: 'DisplayName'}); //gets the list of  the external Articles with their Id, Type and DisplayName fields.
     * fetchContent
     *     .map(response => response.d.results)
     *     .subscribe({
     *        next: response => {
     *            //do something with the response
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */
    public Read(path: string, options?: IODataParams<T>): Observable<any> {
        this.Path = path;
        const children = this.odata.Fetch<T>({
            params: options,
            path: path
        })
            .map(items => {
                return items.d.results.map(c => this.repository.HandleLoadedContent(c as any, this.contentType));
            });
        return children;
    }
    /**
     * Method to move a content to another container.
     * @params index {number} Id of the content that have to be moved.
     * @params targetPath {string} Path of the target container.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let move = myCollection.Move(3, '/Root/MyContent/MyFolder');
     * move
     *     .subscribe({
     *        next: response => {
     *            //do something after move
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */
    /**
     * Method to move multiple content to another container.
     * @param items {number[]} number array of content indexes.
     * @params targetPath {string} Path of the target container.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let move = myCollection.Move([3, 5], '/Root/MyContent/MyFolder');
     * move
     *     .subscribe({
     *        next: response => {
     *            //do something after move
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */
    public Move(arg: number | number[], targetPath: string): Observable<any> {
        if (typeof arg === 'number') {
            this.items =
                this.items.slice(0, arg)
                    .concat(this.items.slice(arg + 1));
            let action = new CustomAction({ name: 'Move', id: arg, isAction: true, requiredParams: ['targetPath'] });
            return this.odata.CreateCustomAction(action, { data: [{ 'targetPath': targetPath }] });
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            this.items =
                this.items.filter((item, i) => arg.indexOf(i) > -1);
            let action = new CustomAction({ name: 'MoveBatch', path: this.Path, isAction: true, requiredParams: ['paths', 'targetPath'] });
            return this.odata.CreateCustomAction(action, { data: [{ 'paths': ids, 'targetPath': targetPath }] });
        }
    }
    /**
     * Method to copy a content to another container.
     * @params index {number} Id of the content that have to be moved.
     * @params targetPath {string} Path of the target container.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let copy = myCollection.Copy(3, '/Root/MyContent/MyFolder');
     * copy
     *     .subscribe({
     *        next: response => {
     *            //do something after copy
     *        },
     *        error: error => console.error('something wrong occurred: ' + error),
     *        complete: () => console.log('done'),
     * });
     * ```
     */

    /**
    * Method to copy multiple content to another container.
    * @param items {number[]} number array of content indexes.
    * @params targetPath {string} Path of the target container.
    * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
    * ```
    * let copy = myCollection.Copy([3, 5], '/Root/MyContent/MyFolder');
    * copy
    *     .subscribe({
    *        next: response => {
    *            //do something after copy
    *        },
    *        error: error => console.error('something wrong occurred: ' + error),
    *        complete: () => console.log('done'),
    * });
    * ```
    */
    public Copy(arg: number | number[], targetPath: string): Observable<any> {
        if (typeof arg === 'number') {
            let action = new CustomAction({ name: 'Copy', id: arg, isAction: true, requiredParams: ['targetPath'] });
            return this.odata.CreateCustomAction(action, { data: [{ 'targetPath': targetPath }] });
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            let action = new CustomAction({ name: 'CopyBatch', path: this.Path, isAction: true, requiredParams: ['paths', 'targetPath'] });
            return this.odata.CreateCustomAction(action, { data: [{ 'paths': ids, 'targetPath': targetPath }] });
        }
    }
    /**
     * Method that returns the list of types which can be added as children to the collection.
     * @params options {Object} JSON object with the possible ODATA parameters like select, expand, etc.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     * ```
     * let allowedChildTypes = collection.AllowedChildTypes();
     * allowedChildTypes.subscribe({
     *  next: response => {
     *      console.log(response);
     *  },
     *  error: error => console.error('something wrong occurred: ' + error.responseJSON.error.message.value),
     *  complete: () => console.log('done'),
     * });
     * ```
     */
    public AllowedChildTypes(options?: Object): Observable<any> {
        let o: any = {};
        if (options) {
            o['params'] = options;
        }
        o['path'] = ODataHelper.getContentURLbyPath(this.Path);
        let optionList = o as IODataRequestOptions<T>;
        return this.odata.Get<T>(optionList);
    }
    /**
     * Uploads a stream or text to a content binary field (e.g. a file).
     * @params ContentType {string=} Specific content type name for the uploaded content. If not provided, the system will try to determine it from the current environment: the upload content types configured in the
     * web.config and the allowed content types in the particular folder. In most cases, this will be File.
     * @params FileName {string} Name of the uploaded file.
     * @params Overwrite {bool=True} Whether the upload action should overwrite a content if it already exist with the same name. If false, a new file will be created with a similar name containing an
     * incremental number (e.g. sample(2).docx).
     * @params UseChunk {bool=False} Determines whether the system should start a chunk upload process instead of saving the file in one round. Usually this is determined by the size of the file.
     * It's optional, used in the first request
     * @params PropertyName {string=Binary} Appoints the binary field of the content where the data should be saved.
     * @params ChunkToken {string} The response of first request returns this token. It must be posted in all of the subsequent requests without modification. It is used for executing the chunk upload operation.
     * It's mandatory, except in the first request
     * @params {FileText} In case you do not have the file as a real file in the file system but a text in the browser, you can provide the raw text in this parameter.
     * @returns {Observable} Returns an RxJS observable that you can subscribe of in your code.
     */
    public Upload(contentType: string, fileName: string, overwrite: boolean = true, useChunk: boolean = false, propertyName?: string, fileText?: string): Observable<any> {
        const data: any = {
            ContentType: contentType,
            FileName: fileName,
            Overwrite: overwrite,
            UseChunk: useChunk
        };
        if (typeof propertyName !== 'undefined') {
            data['PropertyName'] = propertyName;
        }
        if (typeof fileText !== 'undefined') {
            data['FileText'] = fileText;
        }
        let uploadCreation = this.odata.Upload(this.Path, data, true);
        uploadCreation.subscribe({
            next: (response) => {
                const data = {
                    ContentType: contentType,
                    FileName: fileName,
                    Overwrite: overwrite,
                    ChunkToken: response
                };
                return this.odata.Upload(this.Path, data, false);
            }
        });
        return uploadCreation;
    }
}

