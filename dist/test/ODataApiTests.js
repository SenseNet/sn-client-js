"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ODataApi_1 = require("../src/ODataApi");
const Content_1 = require("../src/Content");
const Repository_1 = require("../src/Repository");
const Http_1 = require("../src/Http");
const Chai = require("chai");
const expect = Chai.expect;
describe('ODataApi', () => {
    let service;
    beforeEach(() => {
        service = new Repository_1.Repository(Http_1.Http.RxPromiseHttpProvder);
    });
    it('request a Content and returns an Observable object', function () {
        const options = new ODataApi_1.ODataApi.ODataRequestOptions({ path: '/workspace/project' });
        expect(typeof service.OData.GetContent(options)).to.be.eq('object');
    });
    it('request a collection of Content and returns an Observable object', function () {
        const options = new ODataApi_1.ODataApi.ODataRequestOptions({ path: '/workspace/project' });
        expect(typeof service.OData.FetchContent(options)).to.be.eq('object');
    });
    it('requests to create a Content and returns an Observable object', function () {
        const content = new Content_1.Content({ Id: 1, Type: 'Article', DisplayName: 'Article' }, service);
        expect(typeof service.OData.CreateContent('/workspace/project', content)).to.be.eq('object');
    });
    it('requests to delete a Content and returns an Observable object', function () {
        expect(typeof service.OData.DeleteContent(1111, false)).to.be.eq('object');
    });
    it('requests to patch a Content and returns an Observable object', function () {
        expect(typeof service.OData.PatchContent(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to put a Content and returns an Observable object', function () {
        expect(typeof service.OData.PutContent(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckOut', id: 111, isAction: true });
        expect(typeof service.OData.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true });
        expect(typeof service.OData.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] });
        expect(typeof service.OData.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] });
        expect(typeof service.OData.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.ODataApi.CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
        expect(typeof service.OData.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof service.OData.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof service.OData.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
    });
    it('requests to login a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Login', path: '/Root', isAction: true, requiredParams: ['username', 'password'], noCache: true });
        expect(typeof service.OData.Login(action, { data: { 'userName': 'alba', 'password': 'alba' } })).to.be.eq('object');
    });
    it('requests to login a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Login', path: '/Root', isAction: true, requiredParams: ['username', 'password'], noCache: false });
        expect(typeof service.OData.Login(action, { data: { 'userName': 'alba', 'password': 'alba' } })).to.be.eq('object');
    });
    it('requests to logout a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', path: '/Root', isAction: true, noCache: true });
        expect(typeof service.OData.Logout(action, { data: {} })).to.be.eq('object');
    });
    it('requests to logout a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', path: '/Root', isAction: true, noCache: false });
        expect(typeof service.OData.Logout(action, { data: {} })).to.be.eq('object');
    });
    it('requests to logout a user and returns an Observable object', function () {
        const action = new ODataApi_1.ODataApi.CustomAction({ name: 'Logout', path: '/Root', isAction: true, noCache: false });
        expect(typeof service.OData.Logout(action)).to.be.eq('object');
    });
    it('creates a new copy of ODataParams', () => {
        const params = new ODataApi_1.ODataApi.ODataParams({ select: 'DisplayName' });
        expect(typeof params).to.be.eq('object');
    });
});
//# sourceMappingURL=ODataApiTests.js.map