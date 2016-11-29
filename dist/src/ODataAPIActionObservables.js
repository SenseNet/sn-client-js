"use strict";
const Rx = require('@reactivex/rxjs');
const ODataHelper_1 = require('./ODataHelper');
require('isomorphic-fetch');
const { ajax } = Rx.Observable;
var ODataApiActionObservables;
(function (ODataApiActionObservables) {
    const ROOT_URL = 'https://daily.demo.sensenet.com/OData.svc';
    ODataApiActionObservables.GetContent = (options) => {
        let Observable = Rx.Observable;
        let promise = fetch(`${options.path}${ODataHelper_1.ODataHelper.buildUrlParamString(options.params)}`);
        let source = Observable.fromPromise(promise);
        return source;
    };
    ODataApiActionObservables.FetchContent = (path, params) => ajax.getJSON(`${path}${params}`);
    ODataApiActionObservables.CreateContent = (path, content) => ajax.post(`${path}`, 'models=[" + JSON.stringify(content) + "]');
    ODataApiActionObservables.DeleteContent = (id, permanently) => ajax.post(`${ROOT_URL}/content(${id})/Delete`, JSON.stringify({ 'permanent': permanently }));
    ODataApiActionObservables.PatchContent = (id, fields) => ajax({
        url: `${ROOT_URL}/content(${id})`,
        method: 'PATCH',
        responseType: 'json',
        body: 'models=[" + JSON.stringify(fields) + "]'
    });
    ODataApiActionObservables.PutContent = (id, fields) => ajax({
        url: `${ROOT_URL}/content(${id})`,
        method: 'PUT',
        responseType: 'json',
        body: 'models=[" + JSON.stringify(fields) + "]'
    });
    ODataApiActionObservables.CreateCustomAction = (action, options) => {
        let cacheParam = (action.noCache) ? '' : '&nocache=' + new Date().getTime();
        let path = '';
        if (typeof action.id !== 'undefined') {
            path = `${ROOT_URL}${ODataHelper_1.ODataHelper.getContentUrlbyId(action.id)}/${action.name}`;
        }
        else {
            path = `${ROOT_URL}${ODataHelper_1.ODataHelper.getContentURLbyPath(action.path)}/${action.name}`;
        }
        if (cacheParam.length > 0) {
            path = `${path}?${cacheParam}`;
        }
        let body = action.params.length > 0 ? JSON.stringify(options.data) : '';
        if (typeof action.isAction === 'undefined' || !action.isAction) {
            return ajax({
                url: `${path}${ODataHelper_1.ODataHelper.buildUrlParamString(action.params)}`,
                method: 'GET',
                responseType: 'json'
            });
        }
        else {
            if (typeof options !== 'undefined' && typeof options.data !== 'undefined') {
                return ajax.post(`${path}`, JSON.stringify(options.data));
            }
            else {
                return ajax.post(`${path}`);
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

//# sourceMappingURL=ODataAPIActionObservables.js.map
