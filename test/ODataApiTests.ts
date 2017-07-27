import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
import { ODataRequestOptions, CustomAction, ODataParams, ODataCollectionResponse, ODataApi } from '../src/ODataApi';
import { Content } from '../src/Content';
import { MockRepository } from './Mocks/MockRepository';
import { LoginState } from '../src/Authentication';
import { ContentType } from '../src/ContentTypes';
import { MockHttpProvider } from './Mocks/MockHttpProvider';

const expect = Chai.expect;

describe('ODataApi', () => {
    let service: MockRepository; //  = new MockRepository();
    let odataApi: ODataApi<MockHttpProvider, Content>; //  = service.GetODataApi();

    beforeEach(() => {
        service = new MockRepository();
        odataApi = service.GetODataApi()
        service.Authentication.stateSubject.next(LoginState.Authenticated);
    });

    describe('#Get()', () => {
        it('request a Content and returns an Observable object', () => {
            const options = new ODataRequestOptions({ path: '/workspace/project' })
            expect(typeof odataApi.Get(options)).to.be.eq('object');
        });
    })

    describe('#Fetch()', () => {
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
            odataApi.Fetch(options).first().subscribe(result => {
                expect(result.d.results[0].Id).to.be.eq(1);
                done();
            }, done)

        });
    })

    describe('#Post()', () => {
        it('requests to post a created a Content and returns an Observable object', () => {
            let observable = odataApi.Post('/workspace/project', { Name: 'alma' }, Content);
            expect(observable).to.be.instanceof(Observable);
        });
    })

    describe('#Delete()', () => {
        it('requests to delete a Content and returns an Observable object', () => {
            expect(typeof odataApi.Delete(1111, false)).to.be.eq('object');
        });
    })

    describe('#Patch()', () => {
        it('requests to patch a Content and returns an Observable object', () => {
            expect(typeof odataApi.Patch(1111, Content, { DisplayName: 'test' })).to.be.eq('object');
        });
    })

    describe('#Put()', () => {
        it('requests to put a Content and returns an Observable object', () => {
            expect(typeof odataApi.Put(1111, ContentType, {
                DisplayName: 'test',
                Type: 'testType',
                Name: 'alma'
            })).to.be.eq('object');
        });
    })

    describe('#CreateCustomAction()', () => {
        it('requests to create a custom action (checkout) by id, sends a request and returns an Observable object', () => {
            let action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true })
            expect(typeof odataApi.CreateCustomAction(action)).to.be.eq('object');
        });
        it('requests to create a custom action (checkout) by path, sends a request and returns an Observable object', () => {
            let action = new CustomAction({ name: 'CheckOut', path: '/workspaces/project', isAction: true })
            expect(typeof odataApi.CreateCustomAction(action)).to.be.eq('object');
        });
        it('requests to create a custom action (chekcin) by id, sends a request and returns an Observable object', () => {
            let action = new CustomAction({ name: 'CheckIn', id: 111, isAction: true, params: ['checkInComments'] })
            expect(typeof odataApi.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
        });
        it('requests to create a custom action (chekcin) by id without cache, sends a request and returns an Observable object', () => {
            let action = new CustomAction({ name: 'CheckIn', id: 111, isAction: true, noCache: true, params: ['checkInComments'] })
            expect(typeof odataApi.CreateCustomAction(action, { data: { 'checkInComments': 'comment' } })).to.be.eq('object');
        });
        it('requests to create a custom function (getpermissions) by id, sends a request and returns an Observable object', () => {
            let action = new CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
            expect(typeof odataApi.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } })).to.be.eq('object');
        });

        it('should trigger a CustomActionFailed event on a Repository when no Id or Path is provided', (done) => {
            let action = new CustomAction({ name: 'GetPermission', isAction: false, params: ['identity'] });
            service.Events.OnCustomActionFailed.subscribe(ac => {
                expect(ac.Error.message).to.be.eq('No Id or Path provided.');
                done();
            })
            odataApi.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } });
        });


        it('should trigger a CustomActionFailed event on a Repository when GET request failed', (done) => {
            service.httpProviderRef.setError({message: ':('})
            let action = new CustomAction({ name: 'GetPermission', id: 111, isAction: false, params: ['identity'] });
            service.Events.OnCustomActionFailed.subscribe(ac => {
                expect(ac.Error.message).to.be.eq(':(');
                done();
            })
            odataApi.CreateCustomAction(action, { data: { 'identity': '/Root/Sites/Default_Site/workspaces/Project/budapestprojectworkspace/Groups/Members' } });
        });

        it('should trigger a CustomActionFailed event on a Repository when POST without Data request failed', (done) => {
            service.httpProviderRef.setError({message: ':('})
            let action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true })
            service.Events.OnCustomActionFailed.subscribe(ac => {
                expect(ac.Error.message).to.be.eq(':(');
                done();
            })
            odataApi.CreateCustomAction(action);
        });

        it('should trigger a OnCustomActionExecuted event on a Repository when POST without Data request succeeded', (done) => {
            service.httpProviderRef.setResponse({message: ':)'})
            let action = new CustomAction({ name: 'CheckOut', id: 111, isAction: true })
            service.Events.OnCustomActionExecuted.subscribe(ac => {
                expect(ac.Result.message).to.be.eq(':)');
                done();
            })
            odataApi.CreateCustomAction(action);
        });               

    })

    describe('#Upload()', () => {
        it('requests to upload a Content and returns an Observable object', () => {
            expect(typeof odataApi.Upload('/workspaces/Project', {}, false)).to.be.eq('object');
        });
        it('requests to upload a Content and returns an Observable object', () => {
            expect(typeof odataApi.Upload('/workspaces/Project', {}, true)).to.be.eq('object');
        });

        it('Should insert a Slash after OData.Svc for custom actions, if missing ', (done) => {
            let http = service.httpProviderRef;
            service.Authentication.stateSubject.next(LoginState.Authenticated);
            service.httpProviderRef.UseTimeout = true;
            http.setResponse({ success: true });
            odataApi.CreateCustomAction({
                path: `localhost/OData.svc('Root')`,
                name: 'exampleAction'
            }).subscribe(resp => {
            });

            setTimeout(() => {
                expect(http.lastUrl).to.contains('OData.svc/(');
                done();
            }, 10)

        });

        it('creates a new copy of ODataParams', () => {
            const params = new ODataParams({ select: 'DisplayName' });
            expect(typeof params).to.be.eq('object');
        });

    });

});