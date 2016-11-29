///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { ODataApi } from '../src/ODataApi';
import { Content } from '../src/Content';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('ODataApi', () => {
    it("request a Content and returns an Observable object", function () {
        const options = new ODataApi.ODataRequestOptions({ path: '/workspace/project' })
        expect(typeof ODataApi.GetContent(options)).to.be.eq('object');
    });
    it("request a collection of Content and returns an Observable object", function () {
        const options = new ODataApi.ODataRequestOptions({ path: '/workspace/project' })
        expect(typeof ODataApi.FetchContent(options)).to.be.eq('object');
    });
    it("requests to create a Content and returns an Observable object", function () {
        const content = new Content({ Id: 1, Type: 'Article', DisplayName: 'Article' });
        expect(typeof ODataApi.CreateContent('/workspace/project', content)).to.be.eq('object');
    });
    it("requests to delete a Content and returns an Observable object", function () {
        expect(typeof ODataApi.DeleteContent(1111, false)).to.be.eq('object');
    });
    it("requests to patch a Content and returns an Observable object", function () {
        expect(typeof ODataApi.PatchContent(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it("requests to put a Content and returns an Observable object", function () {
        expect(typeof ODataApi.PutContent(1111, { DisplayName: 'test' })).to.be.eq('object');
    });
    it("requests to create a custom action (checkout) by id, sends a request and returns an Observable object", function () {
        let action = new ODataApi.CustomAction({ name: 'CheckOut', id: 111, isAction: true })
        expect(typeof ODataApi.CreateCustomAction(action)).to.be.eq('object');
    });
    it("requests to create a custom action (checkout) by path, sends a request and returns an Observable object", function () {
        let action = new ODataApi.CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true })
        expect(typeof ODataApi.CreateCustomAction(action)).to.be.eq('object');
    });
    it("requests to create a custom action (chekcin) by id, sends a request and returns an Observable object", function () {
        let action = new ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] })
        expect(typeof ODataApi.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it("requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object", function () {
        let action = new ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] })
        expect(typeof ODataApi.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it("requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object", function () {
        let action = new ODataApi.CustomAction({ name: 'GetPermission', id: 111,  isAction: false, params: ['identity'] });
        expect(typeof ODataApi.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
    });
    it("requests to upload a Content and returns an Observable object", function () {
        expect(typeof ODataApi.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
    });
    it("requests to upload a Content and returns an Observable object", function () {
        expect(typeof ODataApi.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
    });
    it("creates a new copy of ODataParams", () => {
        const params = new ODataApi.ODataParams({select: 'DisplayName'});
        expect(typeof params).to.be.eq('object');
    });
});