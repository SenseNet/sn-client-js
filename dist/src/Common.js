"use strict";
const ODataApi_1 = require('./ODataApi');
exports.Login = (username, password) => {
    let action = new ODataApi_1.ODataApi.CustomAction({ name: 'Login', path: '/Root', noCache: true, isAction: true, requiredParams: ['username', 'password'] });
    return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'username': username, 'password': password } });
};
exports.Logout = () => {
    let action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', noCache: true, path: '/Root', isAction: true });
    return ODataApi_1.ODataApi.CreateCustomAction(action);
};
exports.GetVersionInfo = () => {
    let action = new ODataApi_1.ODataApi.CustomAction({ name: 'GetVersionInfo', path: '/Root', isAction: false });
    return ODataApi_1.ODataApi.CreateCustomAction(action);
};
exports.GetAllContentTypes = () => {
    let action = new ODataApi_1.ODataApi.CustomAction({ name: 'GetAllContentTypes', path: '/Root', isAction: false });
    return ODataApi_1.ODataApi.CreateCustomAction(action);
};
exports.SetSiteUrl = (url = '/') => {
    window['siteUrl'] = url;
};
exports.SetServiceToken = (token = '/Odata.svc') => {
    window['serviceToken'] = token;
};

//# sourceMappingURL=Common.js.map
