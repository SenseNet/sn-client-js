"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http_1 = require("./Http");
var Setup;
(function (Setup) {
    let _initialized = false;
    function InitializeCustom(options) {
        if (_initialized) {
            throw Error('Sense/NET Components are already initialized');
        }
        _httpProvider = Http_1.Http.Provider.Create(options.HttpProvider);
        _initialized = true;
    }
    Setup.InitializeCustom = InitializeCustom;
    let _httpProvider;
    function GetHttpProvider() {
        if (!_httpProvider)
            throw Error('Sense/NET Components not initialized. Please run Setup.InitializeDefault() or Setup.InitializeCustom({}) before using the HttpProvider!');
        return _httpProvider;
    }
    Setup.GetHttpProvider = GetHttpProvider;
    function InitializeConfig(SnConfig = {}) {
        InitializeCustom({
            HttpProvider: Http_1.Http.RxObservableHttpProvider,
            ServiceToken: SnConfig['ServiceToken'] || '/OData.svc',
            SiteUrl: SnConfig['SiteUrl'] || ''
        });
    }
    Setup.InitializeConfig = InitializeConfig;
})(Setup = exports.Setup || (exports.Setup = {}));
//# sourceMappingURL=Setup.js.map