import { ODataApi, Content, Repository, Http } from '../src/SN';
import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
const expect = Chai.expect;

describe('ODataApi', () => {
    let service: Repository<any, any>;

    beforeEach(() => {
        service = new Repository(Http.RxAjaxHttpProvider);
    });
    it('request a Content and returns an Observable object', function () {
        const options = new ODataApi.ODataRequestOptions({ path: '/workspace/project' })
        expect(typeof service.Contents.Get(options)).to.be.eq('object');
    });
    it('request a collection of Content and returns an Observable object', function () {
        const options = new ODataApi.ODataRequestOptions({ path: '/workspace/project' })
        expect(typeof service.Contents.Fetch(options)).to.be.eq('object');
    });
    it('requests to create a Content and returns an Observable object', function () {
        let observable = service.Contents.Create('/workspace/project', { Id: 1, Type: 'Article', DisplayName: 'Article' }, Content);
        expect(observable).to.be.instanceof(Observable);
    });
    it('requests to post a created a Content and returns an Observable object', function () {
        let content = new Content({Name: 'alma'}, service);
        let observable = service.Contents.Post('/workspace/project', content, Content);
        expect(observable).to.be.instanceof(Observable);
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
        let action = new ODataApi.CustomAction({ name: 'CheckOut', id: 111, isAction: true })
        expect(typeof service.Contents.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', function () {
        let action = new ODataApi.CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true })
        expect(typeof service.Contents.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] })
        expect(typeof service.Contents.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', function () {
        let action = new ODataApi.CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] })
        expect(typeof service.Contents.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', function () {
        let action = new ODataApi.CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
        expect(typeof service.Contents.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', function () {
        expect(typeof service.Contents.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
    });
    it('creates a new copy of ODataParams', () => {
        const params = new ODataApi.ODataParams({ select: 'DisplayName' });
        expect(typeof params).to.be.eq('object');
    });
});