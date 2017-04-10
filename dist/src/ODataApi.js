"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ODataHelper_1 = require("./ODataHelper");
const Content_1 = require("./Content");
const ContentTypes_1 = require("./ContentTypes");
var ODataApi;
(function (ODataApi) {
    class Service {
        constructor(providerRef, baseUrl, serviceToken, repository) {
            this.baseUrl = baseUrl;
            this.serviceToken = serviceToken;
            this.repository = repository;
            this.GetContent = (options) => this.Ajax(`${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`, 'GET', Content_1.Content);
            this.FetchContent = (options) => this.Ajax(`${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`, 'GET', Content_1.Content);
            this.DeleteContent = (id, permanent) => this.Ajax(`/content(${id})/Delete`, 'POST', Object, { 'permanent': permanent });
            this.PatchContent = (id, fields) => this.Ajax(`/content(${id})`, 'PATCH', Object, `models=[${JSON.stringify(fields)}]`);
            this.PutContent = (id, fields) => this.Ajax(`/content(${id})`, 'PUT', Object, `models=[${JSON.stringify(fields)}]`);
            this.CreateCustomAction = (action, options) => {
                let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
                let path = '';
                if (typeof action.id !== 'undefined') {
                    path = `${this.baseUrl}${ODataHelper_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
                }
                else {
                    path = `${this.baseUrl}${ODataHelper_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
                }
                if (cacheParam.length > 0) {
                    path = `${path}?${cacheParam}`;
                }
                if (path.indexOf('OData.svc(') > -1) {
                    const start = path.indexOf('(');
                    path = path.slice(0, start) + '/' + path.slice(start);
                    console.log(path);
                }
                let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
                if (typeof action.isAction === 'undefined' || !action.isAction) {
                    return this.httpProvider.Ajax(Object, {
                        url: `${path}${ODataHelper_1.ODataHelper.buildUrlParamString(action.params)}`,
                        method: 'GET',
                        responseType: 'json',
                        crossDomain: this.isCrossDomain,
                    });
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
            };
            this.Upload = (path, data, creation) => {
                let url = `${ODataHelper_1.ODataHelper.getContentURLbyPath(path)}/Upload`;
                if (creation) {
                    url = `${url}?create=1`;
                }
                else {
                    url = url;
                }
                return this.Ajax(url, 'POST', Object, data);
            };
            this.Login = (action, options) => {
                let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
                let path = `${this.baseUrl}/('Root')/Login`;
                if (cacheParam.length > 0) {
                    path = `${path}?${cacheParam}`;
                }
                let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
                if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                    return this.Ajax(path, 'POST', ContentTypes_1.ContentTypes.User, options.data);
                }
                else {
                    return this.Ajax(path, 'POST', ContentTypes_1.ContentTypes.User);
                }
            };
            this.Logout = (action, options) => {
                let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
                let path = `${this.baseUrl}/('Root')/Logout`;
                if (cacheParam.length > 0) {
                    path = `${path}?${cacheParam}`;
                }
                let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
                if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                    return this.Ajax(path, 'POST', Object, options.data);
                }
                else {
                    return this.Ajax(path, 'POST', Object);
                }
            };
            this.httpProvider = new providerRef();
        }
        get isCrossDomain() {
            if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
                return true;
            }
            else {
                return false;
            }
        }
        get ODataBaseUrl() {
            return `${this.baseUrl}/${this.serviceToken}`;
        }
        Ajax(path, method, returns, body) {
            return this.httpProvider.Ajax(returns, {
                url: `${this.ODataBaseUrl}/${path}`,
                method: method,
                body: body,
                crossDomain: this.isCrossDomain,
                responseType: 'json'
            });
        }
        CreateContent(path, content, repository = this.repository) {
            return this.Ajax(`${ODataHelper_1.ODataHelper.getContentURLbyPath(path)}`, 'POST', Content_1.Content, `models=[${JSON.stringify(content)}]`);
        }
    }
    ODataApi.Service = Service;
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
    class CustomContentAction extends CustomAction {
        constructor(options) {
            if (!options.id && !options.path) {
                throw Error('Content.Id or Content.Path is required for this action');
            }
            super(options);
        }
    }
    ODataApi.CustomContentAction = CustomContentAction;
})(ODataApi = exports.ODataApi || (exports.ODataApi = {}));
//# sourceMappingURL=ODataApi.js.map