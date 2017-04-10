"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http_1 = require("./Http");
const ODataApi_1 = require("./ODataApi");
const ODataHelper_1 = require("./ODataHelper");
class Repository {
    constructor(httpProvider, baseUrl = Repository.DEFAULT_BASE_URL, serviceToken = Repository.DEFAULT_SERVICE_TOKEN) {
        this.httpProvider = httpProvider;
        this.baseUrl = baseUrl;
        this.serviceToken = serviceToken;
        this.OData = new ODataApi_1.ODataApi.Service(this.httpProvider, this.baseUrl, this.serviceToken, this);
        this.GetAllContentTypes = () => {
            let action = new ODataApi_1.ODataApi.CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
            return this.OData.CreateCustomAction(action);
        };
    }
    Login(username, password) {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'Login', path: '/Root', noCache: true, isAction: true, requiredParams: ['username', 'password'] });
        return this.OData.Login(action, { data: { 'username': username, 'password': password } });
    }
    Logout() {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', noCache: true, path: '/Root', isAction: true });
        return this.OData.Logout(action);
    }
    GetVersionInfo() {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
        return this.OData.CreateCustomAction(action);
    }
    Load(arg, options, version) {
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        if (typeof arg === 'string') {
            let contentURL = ODataHelper_1.ODataHelper.getContentURLbyPath(arg);
            o['path'] = contentURL;
            let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
            return this.OData.GetContent(optionList);
        }
        else if (typeof arg === 'number') {
            let contentURL = ODataHelper_1.ODataHelper.getContentUrlbyId(arg);
            o['path'] = contentURL;
            let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
            return this.OData.GetContent(optionList);
        }
    }
}
Repository.DEFAULT_BASE_URL = window.location.href;
Repository.DEFAULT_SERVICE_TOKEN = 'odata.svc';
exports.Repository = Repository;
let promiseRepo = new Repository(Http_1.Http.RxPromiseHttpProvder);
let obsRepo = new Repository(Http_1.Http.RxObservableHttpProvider);
obsRepo.Login('', '');
//# sourceMappingURL=Repository.js.map