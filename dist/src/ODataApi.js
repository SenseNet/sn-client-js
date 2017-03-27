"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ODataHelper_1 = require("./ODataHelper");
const Rx = require("@reactivex/rxjs");
const { ajax } = Rx.Observable;
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
    ODataApi.crossDomainParam = () => {
        if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
            return true;
        }
        else {
            return false;
        }
    };
    ODataApi.GetContent = (options) => {
        let Observable = Rx.Observable;
        return ajax(`${ODataApi.ROOT_URL()}${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`);
    };
    ODataApi.FetchContent = (options) => ajax({ url: `${ODataApi.ROOT_URL()}${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`, crossDomain: ODataApi.crossDomainParam(), method: 'GET' });
    ODataApi.CreateContent = (path, content) => {
        let contentItem = { __ContentType: content.Type };
        for (let prop in content) {
            if (prop !== 'Type') {
                contentItem[prop] = content[prop];
            }
        }
        return ajax({
            url: `${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentURLbyPath(path)}`,
            method: 'POST',
            crossDomain: ODataApi.crossDomainParam(),
            body: `models=[${JSON.stringify(contentItem)}]`
        });
    };
    ODataApi.DeleteContent = (id, permanent) => ajax({
        url: `${ODataApi.ROOT_URL()}/content(${id})/Delete`,
        method: 'POST',
        crossDomain: ODataApi.crossDomainParam(),
        body: JSON.stringify({ 'permanent': permanent })
    });
    ODataApi.PatchContent = (id, fields) => ajax({
        url: `${ODataApi.ROOT_URL()}/content(${id})`,
        method: 'PATCH',
        responseType: 'json',
        crossDomain: ODataApi.crossDomainParam(),
        body: `models=[${JSON.stringify(fields)}]`
    });
    ODataApi.PutContent = (id, fields) => ajax({
        url: `${ODataApi.ROOT_URL()}/content(${id})`,
        method: 'PUT',
        responseType: 'json',
        crossDomain: ODataApi.crossDomainParam(),
        body: `models=[${JSON.stringify(fields)}]`
    });
    ODataApi.CreateCustomAction = (action, options) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = `${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
        }
        else {
            path = `${ODataApi.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
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
            return ajax({
                url: `${path}${ODataHelper_1.ODataHelper.buildUrlParamString(action.params)}`,
                method: 'GET',
                responseType: 'json',
                crossDomain: ODataApi.crossDomainParam(),
            });
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return ajax({
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: ODataApi.crossDomainParam(),
                    body: JSON.stringify(options.data)
                });
            }
            else {
                return ajax({
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: ODataApi.crossDomainParam()
                });
            }
        }
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
        return ajax({
            url,
            body: JSON.stringify(data)
        });
    };
    ODataApi.Login = (action, options) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let rootUrl = ODataApi.ROOT_URL();
        let path = `${rootUrl}/('Root')/Login`;
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }
        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
        if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: ODataApi.crossDomainParam(),
                body: JSON.stringify(options.data)
            });
        }
        else {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: ODataApi.crossDomainParam()
            });
        }
    };
    ODataApi.Logout = (action, options) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = `${ODataApi.ROOT_URL()}/('Root')/Logout`;
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }
        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
        if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: ODataApi.crossDomainParam(),
                body: JSON.stringify(options.data)
            });
        }
        else {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: ODataApi.crossDomainParam()
            });
        }
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