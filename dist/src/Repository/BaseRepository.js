"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../SN");
class BaseRepository {
    constructor(httpProviderType, baseUrl = BaseRepository.DEFAULT_BASE_URL, serviceToken = BaseRepository.DEFAULT_SERVICE_TOKEN) {
        this.httpProviderType = httpProviderType;
        this.baseUrl = baseUrl;
        this.serviceToken = serviceToken;
        this.GetAllContentTypes = () => {
            let action = new SN_1.ODataApi.CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
            return this.Contents.CreateCustomAction(action);
        };
        this.httpProviderRef = new httpProviderType();
        this.Authentication = new SN_1.Authentication.JwtService(this);
        this.Contents = new SN_1.ODataApi.ODataApi(this.httpProviderType, this.baseUrl, this.serviceToken, this);
    }
    static get DEFAULT_BASE_URL() {
        if (typeof window !== 'undefined')
            return (window && window.location && window.location.href) || '';
        return '';
    }
    get IsCrossDomain() {
        return this.baseUrl === BaseRepository.DEFAULT_BASE_URL;
    }
    get ODataBaseUrl() {
        return `${this.baseUrl}/${this.serviceToken}`;
    }
    Ajax(path, method, returnsType, body) {
        this.Authentication.CheckForUpdate();
        return this.Authentication.State.skipWhile(state => state === SN_1.Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
            return this.httpProviderRef.Ajax(returnsType, {
                url: `${this.ODataBaseUrl}/${path}`,
                method: method,
                body: body,
                crossDomain: this.IsCrossDomain,
                responseType: 'json'
            });
        });
    }
    GetVersionInfo() {
        let action = new SN_1.ODataApi.CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
        return this.Contents.CreateCustomAction(action);
    }
    Load(idOrPath, options, version, returns) {
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        if (!returns) {
            returns = SN_1.Content;
        }
        if (typeof idOrPath === 'string') {
            let contentURL = SN_1.ODataHelper.getContentURLbyPath(idOrPath);
            o['path'] = contentURL;
            let optionList = new SN_1.ODataApi.ODataRequestOptions(o);
            return this.Contents.Get(optionList, returns).map(r => {
                return SN_1.Content.Create(returns, r.d.results[0], this);
            });
        }
        else if (typeof idOrPath === 'number') {
            let contentURL = SN_1.ODataHelper.getContentUrlbyId(idOrPath);
            o['path'] = contentURL;
            let optionList = new SN_1.ODataApi.ODataRequestOptions(o);
            return this.Contents.Get(optionList, returns).map(r => {
                return SN_1.Content.Create(returns, r.d.results[0], this);
            });
        }
    }
}
BaseRepository.DEFAULT_SERVICE_TOKEN = 'odata.svc';
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map