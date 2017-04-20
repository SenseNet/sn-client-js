"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const Chai = require("chai");
const Repository_1 = require("../src/Repository");
const ODataApi_1 = require("../src/ODataApi");
const Content_1 = require("../src/Content");
const expect = Chai.expect;
describe('ODataApi', () => {
    let service = new Repository_1.SnTestRepository();
    it('request a Content and returns an Observable object', function () {
        const options = new ODataApi_1.ODataRequestOptions({ path: '/workspace/project' });
        expect(typeof service.Contents.Get(options)).to.be.eq('object');
    });
    it('request a collection of Content and returns an Observable object', function () {
        const options = new ODataApi_1.ODataRequestOptions({ path: '/workspace/project' });
        expect(typeof service.Contents.Fetch(options)).to.be.eq('object');
    });
    it('requests to create a Content and returns an Observable object', function () {
        let observable = service.Contents.Create('/workspace/project', { Id: 1, Type: 'Article', DisplayName: 'Article' }, Content_1.Content);
        expect(observable).to.be.instanceof(rxjs_1.Observable);
    });
    it('requests to post a created a Content and returns an Observable object', function () {
        let content = new Content_1.Content({ Name: 'alma' }, service);
        let observable = service.Contents.Post('/workspace/project', content, Content_1.Content);
        expect(observable).to.be.instanceof(rxjs_1.Observable);
    });
    it('requests to delete a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Delete(1111, false)).to.be.eq('object');
    });
    it('requests to patch a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Patch(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to put a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Put(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.CustomAction({ name: 'CheckOut', id: 111, isAction: true });
        expect(typeof service.Contents.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true });
        expect(typeof service.Contents.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] });
        expect(typeof service.Contents.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] });
        expect(typeof service.Contents.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi_1.CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
        expect(typeof service.Contents.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
    });
    it('creates a new copy of ODataParams', () => {
        const params = new ODataApi_1.ODataParams({ select: 'DisplayName' });
        expect(typeof params).to.be.eq('object');
    });
});
//# sourceMappingURL=ODataApiTests.js.map