"use strict";
const ODataHelper_1 = require('./ODataHelper');
require('isomorphic-fetch');
const Rx = require('@reactivex/rxjs');
var ODataApi;
(function (ODataApi) {
    ODataApi.ODATA_SERVICE_TOKEN = () => {
        if (typeof window !== 'undefined' && typeof window['serviceToken'] !== 'undefined') {
            return `${window['serviceToken']}`;
        }
        else {
            return '/OData.svc';
        }
    };
    ODataApi.ROOT_URL = () => {
        if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
            return `${window['siteUrl']}/${ODataApi.ODATA_SERVICE_TOKEN()}`;
        }
        else {
            return ODataApi.ODATA_SERVICE_TOKEN();
        }
    };
    ODataApi.GetContent = (options) => {
        let Observable = Rx.Observable;
        let promise = fetch(`${ODataApi.ROOT_URL()}${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`);
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.FetchContent = (options) => {
        let Observable = Rx.Observable;
        let promise = fetch(`${ODataApi.ROOT_URL()}${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`);
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.CreateContent = (path, content) => {
        let contentItem = { __contentType: content.Type };
        for (let prop in content) {
            if (prop !== 'Type') {
                contentItem[prop] = content[prop];
            }
        }
        let Observable = Rx.Observable;
        let promise = fetch(`${ODataApi.ROOT_URL()}${path}`, ODataHelper_1.ODataHelper.buildRequestBody(contentItem));
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.DeleteContent = (id, permanent) => {
        let Observable = Rx.Observable;
        let promise = fetch(`${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentUrlbyId(id)}/Delete`, JSON.stringify({ permanent: permanent }));
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.PatchContent = (id, fields) => {
        let Observable = Rx.Observable;
        let promise = fetch(`${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentUrlbyId(id)}`, {
            method: 'PATCH',
            body: `models=[${JSON.stringify(fields)}]`
        });
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.PutContent = (id, fields) => {
        let Observable = Rx.Observable;
        let promise = fetch(`${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentUrlbyId(id)}`, {
            method: 'PUT',
            body: `models=[${JSON.stringify(fields)}]`
        });
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.CreateCustomAction = (action, options) => {
        let Observable = Rx.Observable;
        let promise;
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = `${ODataHelper_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
        }
        else {
            path = `${ODataHelper_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
        }
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
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
            promise = fetch(`${ODataApi.ROOT_URL()}${path}${ODataHelper_1.ODataHelper.buildUrlParamString(action.params)}`);
        }
        else {
            promise =
                fetch(`${ODataApi.ROOT_URL()}${path}`, {
                    method: 'POST',
                    body: body
                });
        }
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.Upload = (path, data, creation) => {
        let Observable = Rx.Observable;
        let url = `${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        }
        else {
            url = url;
        }
        let promise = fetch(url, JSON.stringify(data));
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.Login = (action, options) => {
        let Observable = Rx.Observable;
        let promise;
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = `${ODataApi.ROOT_URL()}/('Root')/Login`;
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }
        else {
            path = path;
        }
        let body = JSON.stringify(options.data);
        promise =
            fetch(`${path}`, {
                method: 'POST',
                body: body
            });
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApi.Logout = (action, options) => {
        let Observable = Rx.Observable;
        let promise;
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = `${ODataApi.ROOT_URL()}/('Root')/Logout`;
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }
        else {
            path = path;
        }
        promise =
            fetch(`${path}`, {
                method: 'POST'
            });
        let source = Observable.fromPromise(promise);
        return source;
    };
    class ODataRequestOptions {
        constructor(options) {
            this.params = options.params || [];
            this.path = `${options.path}`;
            this.async = options.async || true;
            this.type = options.type || 'GET';
            this.success = options.success;
            this.error = options.error;
            this.complete = options.complete;
        }
    }
    ODataApi.ODataRequestOptions = ODataRequestOptions;
    class ODataParams {
        constructor(options) {
            this.expand = null;
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
    ODataApi.ODataParams = ODataParams;
    class CustomAction {
        constructor(options) {
            this.params = [];
            this.requiredParams = [];
            this.isAction = false;
            this.noCache = false;
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
    ODataApi.CustomAction = CustomAction;
})(ODataApi = exports.ODataApi || (exports.ODataApi = {}));

//# sourceMappingURL=ODataApi.js.map
