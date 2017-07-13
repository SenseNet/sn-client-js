import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
import { ODataRequestOptions, CustomAction, ODataParams, ODataCollectionResponse } from '../src/ODataApi';
import { Content } from '../src/Content';
import { MockRepository } from './Mocks/MockRepository';
import { LoginState } from '../src/Authentication';
import { ContentType } from '../src/ContentTypes';

const expect = Chai.expect;

describe('ODataApi', () => {
    let service = new MockRepository();

    it('request a Content and returns an Observable object', () => {
        const options = new ODataRequestOptions({ path: '/workspace/project' })
        expect(typeof service.Content.Get(options)).to.be.eq('object');
    });
    it('request a collection of Content and returns an Observable object', (done) => {
        service.Authentication.stateSubject.next(LoginState.Authenticated);
        service.httpProviderRef.setResponse({
            d: {
                __count: 1,
                results: [
                    { Id: 1 }
                ]
            }
        } as ODataCollectionResponse<Content>)
        const options = new ODataRequestOptions({ path: '/workspace/project' })
        service.Content.Fetch(options).first().subscribe(result => {
            expect(result.d.results[0].Id).to.be.eq(1);
            done();
        }, done)

    });
    it('requests to post a created a Content and returns an Observable object', () => {
        let observable = service.Content.Post('/workspace/project', { Name: 'alma' }, Content);
        expect(observable).to.be.instanceof(Observable);
    });
    it('requests to delete a Content and returns an Observable object', () => {
        expect(typeof service.Content.Delete(1111, false)).to.be.eq('object');
    });
    it('requests to patch a Content and returns an Observable object', () => {
        expect(typeof service.Content.Patch(1111, Content, { DisplayName: 'test' })).to.be.eq('object');
    });
    it('requests to put a Content and returns an Observable object', () => {
        expect(typeof service.Content.Put(1111, ContentType, { 
            DisplayName: 'test',
            Type: 'testType',
            Name: 'alma'
        })).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by id, sends a request and returns an Observable object', () => {
        let action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true })
        expect(typeof service.Content.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', () => {
        let action = new CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true })
        expect(typeof service.Content.CreateCustomAction(action)).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', () => {
        let action = new CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] })
        expect(typeof service.Content.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', () => {
        let action = new CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] })
        expect(typeof service.Content.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
    });
    it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', () => {
        let action = new CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
        expect(typeof service.Content.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', () => {
        expect(typeof service.Content.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
    });
    it('requests to upload a Content and returns an Observable object', () => {
        expect(typeof service.Content.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
    });
    it('creates a new copy of ODataParams', () => {
        const params = new ODataParams({ select: 'DisplayName' });
        expect(typeof params).to.be.eq('object');
    });

    it('Should insert a Slash after OData.Svc for custom actions, if missing ', (done) => {
        let http = service.httpProviderRef;
        http.setResponse({success: true});
        service.Content.CreateCustomAction({
            path: `localhost/OData.svc('Root')`,
            name: 'exampleAction'
        }).subscribe(resp => {
            done();
            expect(http.lastUrl).to.contains('OData.svc/(');
        }, done);
    });
});