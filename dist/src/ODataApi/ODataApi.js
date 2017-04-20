"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const SN_1 = require("../SN");
class ODataApi {
    constructor(providerRef, baseUrl, serviceToken, repository) {
        this.baseUrl = baseUrl;
        this.serviceToken = serviceToken;
        this.repository = repository;
        this.Delete = (id, permanent) => this.repository.Ajax(`/content(${id})/Delete`, 'POST', Object, { 'permanent': permanent });
        this.Patch = (id, fields) => this.repository.Ajax(`/content(${id})`, 'PATCH', Object, `models=[${JSON.stringify(fields)}]`);
        this.Put = (id, fields) => this.repository.Ajax(`/content(${id})`, 'PUT', Object, `models=[${JSON.stringify(fields)}]`);
        this.CreateCustomAction = (actionOptions, options) => {
            let action = new _1.CustomAction(actionOptions);
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
        return this.repository.Ajax(`${options.path}${SN_1.ODataHelper.buildUrlParamString(options.params)}`, 'GET');
    }
    Fetch(options) {
        return this.repository.Ajax(`${options.path}${SN_1.ODataHelper.buildUrlParamString(options.params)}`, 'GET');
    }
    Create(path, opt, contentType, repository = this.repository) {
        return this.repository.Ajax(`${SN_1.ODataHelper.getContentURLbyPath(path)}`, 'POST', contentType, `models=[${JSON.stringify(opt)}]`);
    }
    Post(path, content, postedContentType) {
        return this.repository.Ajax(`${SN_1.ODataHelper.getContentURLbyPath(path)}`, 'POST', postedContentType, `models=[${SN_1.ODataHelper.stringifyWithoutCircularDependency(content)}]`);
    }
}
exports.ODataApi = ODataApi;
//# sourceMappingURL=ODataApi.js.map