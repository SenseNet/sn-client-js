"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ODataApi_1 = require("../src/ODataApi");
const Content_1 = require("../src/Content");
const Chai = require("chai");
const expect = Chai.expect;
describe('ODataApi', () => {
    let window = {};
    beforeEach(() => {
        window['serviceToken'] = 'OData.svc';
        window['siteUrl'] = 'https://daily.demo.sensenet.com';
    });
    it('request a Content and returns an Observable object', function () {
        const options = new ODataApi_1.ODataApi.ODataRequestOptions({ path: '/workspace/project' });
        expect(typeof ODataApi_1.ODataApi.GetContent(options)).to.be.eq('object');
    });
    it('request a collection of Content and returns an Observable object', function () {
        const options = new ODataApi_1.ODataApi.ODataRequestOptions({ path: '/workspace/project' });
        expect(typeof ODataApi_1.ODataApi.FetchContent(options)).to.be.eq('object');
    });
    it('requests to create a Content and returns an Observable object', function () {
        const content = new Content_1.Content({ Id: 1, Type: 'Article', DisplayName: 'Article' });
        expect(typeof ODataApi_1.ODataApi.CreateContent('/workspace/project', content)).to.be.eq('object');
    });
    it('requests to delete a Content and returns an Observable object', function () {
        expect(typeof ODataApi_1.ODataApi.DeleteContent(1111, false)).to.be.eq('object');
    });
    it('requests to patch a Content and returns an Observable object', function () {
        expect(typeof ODataApi_1.ODataApi.PatchContent(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to put a Content and returns an Observable object', function () {
        expect(typeof ODataApi_1.ODataApi.PutContent(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckOut', id: 111, isAction: true });
        expect(typeof ODataApi_1.ODataApi.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true });
        expect(typeof ODataApi_1.ODataApi.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] });
        expect(typeof ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] });
        expect(typeof ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
        expect(typeof ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof ODataApi_1.ODataApi.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof ODataApi_1.ODataApi.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
    });
    it('requests to login a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Login', path: '/Root', isAction: true, requiredParams: ['username', 'password'], noCache: true });
        expect(typeof ODataApi_1.ODataApi.Login(action, { data: { 'userName': 'alba', 'password': 'alba' } })).to.be.eq('object');
    });
    it('requests to login a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Login', path: '/Root', isAction: true, requiredParams: ['username', 'password'], noCache: false });
        expect(typeof ODataApi_1.ODataApi.Login(action, { data: { 'userName': 'alba', 'password': 'alba' } })).to.be.eq('object');
    });
    it('requests to logout a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', path: '/Root', isAction: true, noCache: true });
        expect(typeof ODataApi_1.ODataApi.Logout(action, { data: {} })).to.be.eq('object');
    });
    it('requests to logout a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', path: '/Root', isAction: true, noCache: false });
        expect(typeof ODataApi_1.ODataApi.Logout(action, { data: {} })).to.be.eq('object');
    });
    it('requests to logout a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', path: '/Root', isAction: true, noCache: false });
        expect(typeof ODataApi_1.ODataApi.Logout(action)).to.be.eq('object');
    });
    it('creates a new copy of ODataParams', () => {
        const params = new ODataApi_1.ODataApi.ODataParams({ select: 'DisplayName' });
        expect(typeof params).to.be.eq('object');
    });
    it('calls the ODATA_SERVICE_TOKEN', () => {
        const serviceToken = ODataApi_1.ODataApi.ODATA_SERVICE_TOKEN();
        expect(serviceToken).to.be.eq('OData.svc');
    });
    it('calls the ROOT_URL', () => {
        const url = ODataApi_1.ODataApi.ROOT_URL();
        expect(url).to.be.eq('https://daily.demo.sensenet.com/OData.svc');
    });
    describe('tests with window object', () => {
        beforeEach(function () {
            global['window'] = {
                serviceToken: 'odata',
                siteUrl: 'https://daily.demo.sensenet.com'
            };
        });
        it('calls the ODATA_SERVICE_TOKEN', () => {
            const serviceToken = ODataApi_1.ODataApi.ODATA_SERVICE_TOKEN();
            expect(serviceToken).to.be.eq('odata');
        });
        it('calls the ROOT_URL', () => {
            const url = ODataApi_1.ODataApi.ROOT_URL();
            expect(url).to.be.eq('https://daily.demo.sensenet.com/odata');
        });
    });
});
//# sourceMappingURL=ODataApiTests.js.map