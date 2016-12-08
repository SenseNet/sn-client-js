"use strict";
const Rx = require('@reactivex/rxjs');
const ODataHelper_1 = require('./ODataHelper');
require('isomorphic-fetch');
const { ajax } = Rx.Observable;
var ODataApiActionObservables;
(function (ODataApiActionObservables) {
    ODataApiActionObservables.ROOT_URL = () => {
        let a = '/';
        if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
            return `${window['siteUrl']}/OData.svc`;
        }
        else {
            return '/OData.svc';
        }
    };
    ODataApiActionObservables.crossDomainParam = () => {
        if (typeof window !== 'undefined' && typeof window['siteUrl'] !== 'undefined') {
            return true;
        }
        else {
            return false;
        }
    };
    ODataApiActionObservables.GetContent = (options) => ajax({ url: `${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`, crossDomain: ODataApiActionObservables.crossDomainParam(), method: 'GET' });
    ODataApiActionObservables.FetchContent = (path, params) => ajax({ url: `${ODataApiActionObservables.ROOT_URL()}${path}${params}`, crossDomain: ODataApiActionObservables.crossDomainParam(), method: 'GET' });
    ODataApiActionObservables.CreateContent = (path, content) => ajax({
        url: `${ODataApiActionObservables.ROOT_URL()}${path}`,
        method: 'POST',
        crossDomain: ODataApiActionObservables.crossDomainParam(),
        body: `models=[${JSON.stringify(content)}]`
    });
    ODataApiActionObservables.DeleteContent = (id, permanently = false) => ajax({
        url: `${ODataApiActionObservables.ROOT_URL()}/content(${id})/Delete`,
        method: 'POST',
        crossDomain: ODataApiActionObservables.crossDomainParam(),
        body: JSON.stringify({ 'permanent': permanently })
    });
    ODataApiActionObservables.PatchContent = (id, fields) => ajax({
        url: `${ODataApiActionObservables.ROOT_URL()}/content(${id})`,
        method: 'PATCH',
        responseType: 'json',
        crossDomain: ODataApiActionObservables.crossDomainParam(),
        body: `models=[${JSON.stringify(fields)}]`
    });
    ODataApiActionObservables.PutContent = (id, fields) => ajax({
        url: `${ODataApiActionObservables.ROOT_URL()}/content(${id})`,
        method: 'PUT',
        responseType: 'json',
        crossDomain: ODataApiActionObservables.crossDomainParam(),
        body: `models=[${JSON.stringify(fields)}]`
    });
    ODataApiActionObservables.CreateCustomAction = (action, options) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = `${ODataApiActionObservables.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
        }
        else {
            path = `${ODataApiActionObservables.ROOT_URL()}${ODataHelper_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
        }
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }
        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
        if (typeof action.isAction === 'undefined' || !action.isAction) {
            return ajax({
                url: `${path}${ODataHelper_1.ODataHelper.buildUrlParamString(action.params)}`,
                method: 'GET',
                responseType: 'json',
                crossDomain: ODataApiActionObservables.crossDomainParam(),
            });
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return ajax({
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: ODataApiActionObservables.crossDomainParam(),
                    body: JSON.stringify(options.data)
                });
            }
            else {
                return ajax({
                    url: `${path}`,
                    method: 'POST',
                    crossDomain: ODataApiActionObservables.crossDomainParam()
                });
            }
        }
    };
    ODataApiActionObservables.Upload = (path, data, creation) => {
        let Observable = Rx.Observable;
        let url = `${ODataHelper_1.ODataHelper.getContentURLbyPath(path)}/Upload`;
        if (creation) {
            url = `${url}?create=1`;
        }
        let promise = fetch(url, JSON.stringify(data));
        let source = Observable.fromPromise(promise);
        return source;
    };
})(ODataApiActionObservables = exports.ODataApiActionObservables || (exports.ODataApiActionObservables = {}));

//# sourceMappingURL=ODataApiActionObservables.js.map
