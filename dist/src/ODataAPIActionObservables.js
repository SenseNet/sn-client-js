"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = require("@reactivex/rxjs");
const SN_1 = require("./SN");
const { ajax } = Rx.Observable;
exports.ODATA_SERVICE_TOKEN = () => {
    if (typeof window !== 'undefined' && typeof window['serviceToken'] !== 'undefined') {
        return `${window['serviceToken']}`;
    }
    else {
        return '/OData.svc';
    }
};
exports.ROOT_URL = () => {
    if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
        return `${window['siteUrl']}${exports.ODATA_SERVICE_TOKEN()}`;
    }
    else {
        return exports.ODATA_SERVICE_TOKEN();
    }
};
exports.crossDomainParam = () => {
    if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
        return true;
    }
    else {
        return false;
    }
};
exports.GetContent = (options) => ajax({ url: `${options.path}${SN_1.ODataHelper.buildUrlParamString(options.params)}`, crossDomain: exports.crossDomainParam(), method: 'GET' });
exports.FetchContent = (path, params) => ajax({ url: `${exports.ROOT_URL()}${path}${params}`, crossDomain: exports.crossDomainParam(), method: 'GET' });
exports.CreateContent = (path, content) => ajax({
    url: `${exports.ROOT_URL()}${path}`,
    method: 'POST',
    crossDomain: exports.crossDomainParam(),
    body: `models=[${JSON.stringify(content)}]`
});
exports.DeleteContent = (id, permanently = false) => ajax({
    url: `${exports.ROOT_URL()}/content(${id})/Delete`,
    method: 'POST',
    crossDomain: exports.crossDomainParam(),
    body: JSON.stringify({ 'permanent': permanently })
});
exports.PatchContent = (id, fields) => ajax({
    url: `${exports.ROOT_URL()}/content(${id})`,
    method: 'PATCH',
    responseType: 'json',
    crossDomain: exports.crossDomainParam(),
    body: `models=[${JSON.stringify(fields)}]`
});
exports.PutContent = (id, fields) => ajax({
    url: `${exports.ROOT_URL()}/content(${id})`,
    method: 'PUT',
    responseType: 'json',
    crossDomain: exports.crossDomainParam(),
    body: `models=[${JSON.stringify(fields)}]`
});
exports.CreateCustomAction = (action, options) => {
    let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
    let path = '';
    if (typeof action.id !== 'undefined') {
        path = `${exports.ROOT_URL()}${SN_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
    }
    else {
        path = `${exports.ROOT_URL()}${SN_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
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
            url: `${path}${SN_1.ODataHelper.buildUrlParamString(action.params)}`,
            method: 'GET',
            responseType: 'json',
            crossDomain: exports.crossDomainParam(),
        });
    }
    else {
        if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: exports.crossDomainParam(),
                body: JSON.stringify(options.data)
            });
        }
        else {
            return ajax({
                url: `${path}`,
                method: 'POST',
                crossDomain: exports.crossDomainParam()
            });
        }
    }
};
exports.Login = (action, options) => {
    let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
    let rootUrl = exports.ROOT_URL();
    let path = `${rootUrl}/('Root')/Login`;
    if (cacheParam.length > 0) {
        path = `${path}?${cacheParam}`;
    }
    let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
    if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
        return ajax({
            url: `${path}`,
            method: 'POST',
            crossDomain: exports.crossDomainParam(),
            body: JSON.stringify(options.data)
        });
    }
    else {
        return ajax({
            url: `${path}`,
            method: 'POST',
            crossDomain: exports.crossDomainParam()
        });
    }
};
exports.Logout = (action, options) => {
    let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
    let path = `${exports.ROOT_URL()}/('Root')/Logout`;
    if (cacheParam.length > 0) {
        path = `${path}?${cacheParam}`;
    }
    let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
    if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
        return ajax({
            url: `${path}`,
            method: 'POST',
            crossDomain: exports.crossDomainParam(),
            body: JSON.stringify(options.data)
        });
    }
    else {
        return ajax({
            url: `${path}`,
            method: 'POST',
            crossDomain: exports.crossDomainParam()
        });
    }
};
exports.Upload = (path, data, creation) => {
    let Observable = Rx.Observable;
    let url = `${SN_1.ODataHelper.getContentURLbyPath(path)}/Upload`;
    if (creation) {
        url = `${url}?create=1`;
    }
    return ajax({
        url,
        body: JSON.stringify(data)
    });
};
//# sourceMappingURL=ODataAPIActionObservables.js.map