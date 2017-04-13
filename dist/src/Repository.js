"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("./SN");
class Repository {
    constructor(httpProviderType, baseUrl = Repository.DEFAULT_BASE_URL, serviceToken = Repository.DEFAULT_SERVICE_TOKEN) {
        this.httpProviderType = httpProviderType;
        this.baseUrl = baseUrl;
        this.serviceToken = serviceToken;
        this.GetAllContentTypes = () => {
            let action = new SN_1.CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
            return this.Contents.CreateCustomAction(action);
        };
        this.httpProviderRef = new httpProviderType();
        this.Authentication = new SN_1.Authentication(this);
        this.Contents = new SN_1.ODataApi(this.httpProviderType, this.baseUrl, this.serviceToken, this);
    }
    static get DEFAULT_BASE_URL() {
        if (typeof window !== 'undefined')
            return (window && window.location && window.location.href) || '';
        return '';
    }
    get IsCrossDomain() {
        return this.baseUrl === Repository.DEFAULT_BASE_URL;
    }
    get ODataBaseUrl() {
        return `${this.baseUrl}/${this.serviceToken}`;
    }
    Ajax(path, method, returnsType, body) {
        let ajax = this.httpProviderRef.Ajax(returnsType, {
            url: `${this.ODataBaseUrl}/${path}`,
            method: method,
            body: body,
            crossDomain: this.IsCrossDomain,
            responseType: 'json'
        });
        return ajax;
    }
    GetVersionInfo() {
        let action = new SN_1.CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
        return this.Contents.CreateCustomAction(action);
    }
    Load(idOrPath, options, version, returns) {
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        if (typeof idOrPath === 'string') {
            let contentURL = SN_1.ODataHelper.getContentURLbyPath(idOrPath);
            o['path'] = contentURL;
            let optionList = new SN_1.ODataRequestOptions(o);
            return this.Contents.Get(optionList, returns);
        }
        else if (typeof idOrPath === 'number') {
            let contentURL = SN_1.ODataHelper.getContentUrlbyId(idOrPath);
            o['path'] = contentURL;
            let optionList = new SN_1.ODataRequestOptions(o);
            return this.Contents.Get(optionList, returns);
        }
    }
}
Repository.DEFAULT_SERVICE_TOKEN = 'odata.svc';
exports.Repository = Repository;
class SnRepository extends Repository {
    constructor(baseUrl, serviceToken) {
        super(SN_1.HttpProviders.RxAjax, baseUrl, serviceToken);
    }
}
exports.SnRepository = SnRepository;
class SnTestRepository extends Repository {
    constructor(baseUrl, serviceToken) {
        super(SN_1.HttpProviders.Mock, baseUrl, serviceToken);
    }
}
exports.SnTestRepository = SnTestRepository;
//# sourceMappingURL=Repository.js.map