import * as Chai from 'chai';
import { Observable } from 'rxjs/Observable';
import { LoginState } from '../src/Authentication';
import { Content } from '../src/Content';
import { CustomAction, ODataApi, ODataCollectionResponse } from '../src/ODataApi';
import { MockHttpProvider } from './Mocks/MockHttpProvider';
import { MockRepository } from './Mocks/MockRepository';

const expect = Chai.expect;

export const ODataApiTests = describe('ODataApi', () => {
    let service: MockRepository; //  = new MockRepository();
    let odataApi: ODataApi<MockHttpProvider>; //  = service.GetODataApi();

    beforeEach(() => {
        service = new MockRepository();
        odataApi = service.GetODataApi();
        service.Authentication.StateSubject.next(LoginState.Authenticated);
    });

    describe('#Get()', () => {
        it('request a Content and returns an Observable object', () => {
            expect(typeof odataApi.Get({ path: '/workspace/project' })).to.be.eq('object');
        });
    });

    describe('#Fetch()', () => {
        it('request a collection of Content and returns an Observable object', (done) => {
            service.Authentication.StateSubject.next(LoginState.Authenticated);
            service.HttpProviderRef.AddResponse({
                d: {
                    __count: 1,
                    results: [
                        { Id: 1 }
                    ]
                }
            } as ODataCollectionResponse<Content>);
            odataApi.Fetch({ path: '/workspace/project' }).first().subscribe((result) => {
                expect(result.d.results[0].Id).to.be.eq(1);
                done();
            }, done);

        });
    });

    describe('#Post()', () => {
        it('requests to post a created a Content and returns an Observable object', () => {
            const observable = odataApi.Post('/workspace/project', { Name: 'alma' });
            expect(observable).to.be.instanceof(Observable);
        });
    });

    describe('#Delete()', () => {
        it('requests to delete a Content and returns an Observable object', () => {
            expect(typeof odataApi.Delete(1111, false)).to.be.eq('object');
        });
    });

    describe('#Patch()', () => {
        it('requests to patch a Content and returns an Observable object', () => {
            expect(typeof odataApi.Patch(1111, { DisplayName: 'test' })).to.be.eq('object');
        });
    });

    describe('#Put()', () => {
        it('requests to put a Content and returns an Observable object', () => {
            expect(typeof odataApi.Put(1111, {
                DisplayName: 'test',
                Type: 'testType',
                Name: 'alma'
            })).to.be.eq('object');
        });
    });

    describe('#CreateCustomAction()', () => {
        it('requests to create a custom action (checkout) by id, sends a request and returns an Observable object', () => {
            const action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true });
            expect(typeof odataApi.CreateCustomAction(action)).to.be.eq('object');
        });
        it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', () => {
            const action = new CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true });
            expect(typeof odataApi.CreateCustomAction(action)).to.be.eq('object');
        });
        it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', () => {
            const action = new CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] });
            expect(typeof odataApi.CreateCustomAction(action, { data: { checkInComments: 'comment' } })).to.be.eq('object');
        });
        it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', () => {
            const action = new CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] });
            expect(typeof odataApi.CreateCustomAction(action, { data: { checkInComments: 'comment' } })).to.be.eq('object');
        });
        it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', () => {
            const action = new CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
            expect(typeof odataApi.CreateCustomAction(action, { data: { identity: '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
        });

        it('should trigger a CustomActionFailed event on a Repository when no Id or Path is provided', (done) => {
            const action = new CustomAction({ name: 'GetPermission', isAction: false, params: ['identity'] });
            service.Events.OnCustomActionFailed.subscribe((ac) => {
                expect(ac.Error.message).to.be.eq('No Id or Path provided.');
                done();
            });
            odataApi.CreateCustomAction(action, { data: { identity: '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } });
        });

        it('should trigger a CustomActionFailed event on a Repository when GET request failed', (done) => {
            service.HttpProviderRef.AddError({message: ':('});
            const action = new CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
            service.Events.OnCustomActionFailed.subscribe((ac) => {
                expect(ac.Error.message).to.be.eq(':(');
                done();
            });
            odataApi.CreateCustomAction(action, { data: { identity: '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } });
        });

        it('should trigger a CustomActionFailed event on a Repository when POST without Data request failed', (done) => {
            service.HttpProviderRef.AddError({message: ':('});
            const action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true });
            service.Events.OnCustomActionFailed.subscribe((ac) => {
                expect(ac.Error.message).to.be.eq(':(');
                done();
            });
            odataApi.CreateCustomAction(action);
        });

        it('should trigger a OnCustomActionExecuted event on a Repository when POST without Data request succeeded', (done) => {
            service.HttpProviderRef.AddResponse({message: ':)'});
            const action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true });
            service.Events.OnCustomActionExecuted.subscribe((ac) => {
                expect(ac.Result.message).to.be.eq(':)');
                done();
            });
            odataApi.CreateCustomAction(action);
        });

    });

    describe('#Upload()', () => {
        it('requests to upload a Content and returns an Observable object', () => {
            expect(typeof odataApi.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
        });
        it('requests to upload a Content and returns an Observable object', () => {
            expect(typeof odataApi.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
        });

        it('Should insert a Slash after OData.Svc for custom actions, if missing ', (done) => {
            const http = service.HttpProviderRef;
            service.Authentication.StateSubject.next(LoginState.Authenticated);
            service.HttpProviderRef.UseTimeout = true;
            http.AddResponse({ success: true });
            odataApi.CreateCustomAction({
                path: `localhost/OData.svc('Root')`,
                name: 'exampleAction'
            }).subscribe((resp) => { /**/ });

            setTimeout(() => {
                expect(http.RequestLog[http.RequestLog.length - 1].Options.url).to.contains('OData.svc/(');
                done();
            }, 10);

        });
    });
});
