"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("./SN");
class ODataApi {
    constructor(providerRef, baseUrl, serviceToken, repository) {
        this.baseUrl = baseUrl;
        this.serviceToken = serviceToken;
        this.repository = repository;
        this.Delete = (id, permanent) => this.repository.Ajax(`/content(${id})/Delete`, 'POST', Object, { 'permanent': permanent });
        this.Patch = (id, fields) => this.repository.Ajax(`/content(${id})`, 'PATCH', Object, `models=[${JSON.stringify(fields)}]`);
        this.Put = (id, fields) => this.repository.Ajax(`/content(${id})`, 'PUT', Object, `models=[${JSON.stringify(fields)}]`);
        this.CreateCustomAction = (action, options) => {
            let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
            let path = '';
            if (typeof action.id !== 'undefined') {
                path = `${this.baseUrl}${SN_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
            }
            else {
                path = `${this.baseUrl}${SN_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
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
                    url: `${path}${SN_1.ODataHelper.buildUrlParamString(action.params)}`,
                    method: 'GET',
                    responseType: 'json',
                    crossDomain: this.repository.IsCrossDomain,
                });
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
        };
        this.Upload = (path, data, creation) => {
            let url = `${SN_1.ODataHelper.getContentURLbyPath(path)}/Upload`;
            if (creation) {
                url = `${url}?create=1`;
            }
            else {
                url = url;
            }
            return this.repository.Ajax(url, 'POST', Object, data);
        };
        this.httpProvider = new providerRef();
    }
    Get(options, returns) {
        return this.repository.Ajax(`${options.path}${SN_1.ODataHelper.buildUrlParamString(options.params)}`, 'GET', returns);
    }
    Fetch(options) {
        return this.repository.Ajax(`${options.path}${SN_1.ODataHelper.buildUrlParamString(options.params)}`, 'GET');
    }
    Create(path, opt, contentType, repository = this.repository) {
        let content = SN_1.Content.Create(contentType, opt, repository);
        return this.repository.Ajax(`${SN_1.ODataHelper.getContentURLbyPath(path)}`, 'POST', SN_1.Content, `models=[${JSON.stringify(content.options)}]`);
    }
    Post(path, content, postedContentType) {
        return this.repository.Ajax(`${SN_1.ODataHelper.getContentURLbyPath(path)}`, 'POST', postedContentType, `models=[${SN_1.ODataHelper.stringifyWithoutCircularDependency(content)}]`);
    }
}
exports.ODataApi = ODataApi;
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
exports.ODataRequestOptions = ODataRequestOptions;
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
exports.ODataParams = ODataParams;
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
exports.CustomAction = CustomAction;
class CustomContentAction extends CustomAction {
    constructor(options) {
        if (!options.id && !options.path) {
            throw Error('Content.Id or Content.Path is required for this action');
        }
        super(options);
    }
}
exports.CustomContentAction = CustomContentAction;
//# sourceMappingURL=ODataApi.js.map