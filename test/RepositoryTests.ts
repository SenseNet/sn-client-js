import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigModel } from '../src/Config';
import { MockRepository, MockAuthService, MockHttpProvider } from './Mocks';
import { VersionInfo, SnRepository } from '../src/Repository';
import { Content } from '../src/Content';
import { LoginState } from '../src/Authentication';
import { ODataCollectionResponse, ODataApi } from '../src/ODataApi';
import { User, Task, ContentType } from '../src/ContentTypes';
import { Observable } from '@reactivex/rxjs';

const expect = Chai.expect;

@suite('RepositoryTests')
export class RepositoryTests {

    private repo: MockRepository;

    public before() {
        this.repo = new MockRepository({
            RepositoryUrl: 'https://localhost',
            ODataToken: 'odata.svc'
        });

        this.repo.Authentication.stateSubject.next(LoginState.Authenticated);
    };

    @test
    public 'ODataBaseUrl should return a valid URL based on RepositoryUrl and ODataToken'() {
        expect(this.repo.ODataBaseUrl).to.be.eq('https://localhost/odata.svc');
    }

    @test 'GetVersionInfo should return a valid Version Info'() {
        let vResponse = new VersionInfo();
        vResponse.DatabaseAvailable = true;
        (this.repo.httpProviderRef as MockHttpProvider).setResponse(vResponse);

        this.repo.GetVersionInfo().first().subscribe(result => {
            expect(result.DatabaseAvailable).to.be.eq(true);
        })
    }

    @test 'GetAllContentTypes should be return a valid content type collection'(done: MochaDone) {

        let cResponse = {
            d: {
                __count: 1,
                results: [
                    {
                        Name: 'testContentType',
                        Type: 'ContentType',
                        options: {},
                    }
                ]
            }
        } as ODataCollectionResponse<ContentType>;
        this.repo.httpProviderRef.setResponse(cResponse);
        this.repo.GetAllContentTypes().first().subscribe(types => {
            expect(types.length).to.be.eq(1);
            expect(types[0].Name).to.be.eq('testContentType');
            expect(types[0]).to.be.instanceof(ContentType);
            done();
        }, done)
    }

    @test 'Load should return a valid Content'(done: MochaDone) {
        let cResponse = {
            d: {
                Name: 'testContentType',
                Type: 'ContentType'
            }
        };
        (this.repo.Authentication as MockAuthService).stateSubject.next(LoginState.Authenticated);
        (this.repo.httpProviderRef as MockHttpProvider).setResponse(cResponse);
        this.repo.Load(1).first().subscribe(response => {
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(Content);
            done();
        }, err => {
            done(err);
        });
    }

    @test 'Load should return a valid Content with a valid type, if defined'(done: MochaDone) {
        let cResponse = {
            d: {
                Name: 'testContentType',
                Type: 'User',
            }
        };
        (this.repo.Authentication as MockAuthService).stateSubject.next(LoginState.Authenticated);
        (this.repo.httpProviderRef as MockHttpProvider).setResponse(cResponse);
        this.repo.Load(1, {}, User).first().subscribe(response => {
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(User);
            done();
        }, err => {
            done(err);
        });
    }

    @test 'SnRepository should have a default Config, if not provided'() {
        let snRepo = new SnRepository();
        expect(snRepo.Config.RepositoryUrl).to.be.eq(SnConfigModel.DEFAULT_BASE_URL);
    }

    @test 'SnRepository should respect the provided config'() {
        let snRepo = new SnRepository(new SnConfigModel({
            RepositoryUrl: 'https://demo.sensenet.com'
        }));
        expect(snRepo.Config.RepositoryUrl).to.be.eq('https://demo.sensenet.com');
    }

    @test 'HandleLoadedContent should respect content type from Options'() {
        let snRepo = new SnRepository(new SnConfigModel({
            RepositoryUrl: 'https://demo.sensenet.com'
        }));
        const task = snRepo.HandleLoadedContent({
            Id: 100,
            Path: 'Root/Test',
            Type: 'Task'
        })

        const usr = snRepo.HandleLoadedContent({
            Id: 200,
            Path: 'Root/Test',
            Name: 'User'
        }, User)

        const content = snRepo.HandleLoadedContent({
            Id: 300,
            Path: 'Root/Test',
            Name: ''
        })
        expect(task).to.be.instanceof(Task);

        expect(usr).to.be.instanceof(User);

        expect(content).to.be.instanceof(Content);
    }

    @test 'Content should return an ODataApi instance'() {
        let snRepo = new SnRepository();
        expect(snRepo.Content).to.be.instanceOf(ODataApi);
    }

    @test 'Should be able to create content using repository.CreateContent() '() {
        let snRepo = new SnRepository();
        let exampleTask = snRepo.CreateContent({}, Task);
        expect(exampleTask).to.be.instanceOf(Task);
    }


    @test 'DeleteBatch() should fire a DeleteBatch request'(){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        const action = this.repo.DeleteBatch([testContent]);

        expect(this.repo.httpProviderRef.lastOptions.url).to.contains("https://localhost/odata.svc/('Root')/DeleteBatch");
        expect(this.repo.httpProviderRef.lastOptions.body).to.be.eq('[{"paths":[12345]},{"permanently":false}]');
        expect(this.repo.httpProviderRef.lastOptions.method).to.be.eq('POST');

        expect(action).to.be.instanceof(Observable);
    }

    
    @test 'DeleteBatch() should fire a DeleteBatch request by path'(){
        const testContentWithoutId = this.repo.HandleLoadedContent({Path: 'Root/Test2'} as any);

        const action = this.repo.DeleteBatch([testContentWithoutId]);

        expect(this.repo.httpProviderRef.lastOptions.url).to.contains("https://localhost/odata.svc/('Root')/DeleteBatch");
        expect(this.repo.httpProviderRef.lastOptions.body).to.be.eq('[{"paths":["Root/Test2"]},{"permanently":false}]');
        expect(this.repo.httpProviderRef.lastOptions.method).to.be.eq('POST');

        expect(action).to.be.instanceof(Observable);
    }

    @test 'DeleteBatch() should trigger ContentDeleted event after success'(done: MochaDone){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});

        this.repo.Events.OnContentDeleted.subscribe(c => {
            expect(c.ContentData.Id).to.be.eq(testContent.Id);
            done();
        });
        this.repo.httpProviderRef.setResponse({});
        const action = this.repo.DeleteBatch([testContent]);
        expect(action).to.be.instanceof(Observable);
    }    

    @test 'DeleteBatch() should trigger ContentDeleteFailed event after failure'(done: MochaDone){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        this.repo.Events.OnContentDeleteFailed.subscribe(c => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this.repo.httpProviderRef.setError({message: ':('});
        const action = this.repo.DeleteBatch([testContent]);
        expect(action).to.be.instanceof(Observable);
    }

    @test 'MoveBatch() should fire a MoveBatch request'(){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        const action = this.repo.MoveBatch([testContent], 'Root/Test2');

        expect(this.repo.httpProviderRef.lastOptions.url).to.contains("https://localhost/odata.svc/('Root')/MoveBatch");
        expect(this.repo.httpProviderRef.lastOptions.body).to.be.eq('[{"paths":["Root/Test"],"targetPath":"Root/Test2"}]');
        expect(this.repo.httpProviderRef.lastOptions.method).to.be.eq('POST');

        expect(action).to.be.instanceof(Observable);
    }

    @test 'MoveBatch() should trigger ContentMoved event after success'(done: MochaDone){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        const sourcePath = testContent.Path;

        this.repo.Events.OnContentMoved.subscribe(c => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            expect(c.From).to.be.eq(sourcePath);
            expect(c.To).to.be.eq('Root/Test2')
            done();
        });
        this.repo.httpProviderRef.setResponse({});
        const action = this.repo.MoveBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }    

    @test 'MoveBatch() should trigger ContentDeleteFailed event after failure'(done: MochaDone){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        this.repo.Events.OnContentMoveFailed.subscribe(c => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this.repo.httpProviderRef.setError({message: ':('});
        const action = this.repo.MoveBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test 'CopyBatch() should fire a CopyBatch request'(){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        const action = this.repo.CopyBatch([testContent], 'Root/Test2');

        expect(this.repo.httpProviderRef.lastOptions.url).to.contains("https://localhost/odata.svc/('Root')/CopyBatch");
        expect(this.repo.httpProviderRef.lastOptions.body).to.be.eq('[{"paths":["Root/Test"],"targetPath":"Root/Test2"}]');
        expect(this.repo.httpProviderRef.lastOptions.method).to.be.eq('POST');

        expect(action).to.be.instanceof(Observable);
    }

    @test 'CopyBatch() should trigger ContentCreated event after success'(done: MochaDone){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        this.repo.Events.OnContentCreated.subscribe(c => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            done();
        });
        this.repo.httpProviderRef.setResponse({});
        const action = this.repo.CopyBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }    

    @test 'CopyBatch() should trigger ContentCreateFailed event after failure'(done: MochaDone){
        const testContent = this.repo.HandleLoadedContent({Id: 12345, Path: 'Root/Test'});
        this.repo.Events.OnContentCreateFailed.subscribe(c => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this.repo.httpProviderRef.setError({message: ':('});
        const action = this.repo.CopyBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test 'GetCurrentUser() should return an Observable '() {
        let repo = new MockRepository();
        expect(repo.GetCurrentUser()).to.be.instanceof(Observable)
    }

    @test 'GetCurrentUser() should update with Visitor by default '(done: MochaDone) {
        let repo = new MockRepository();
        repo.GetCurrentUser().subscribe(u => {
            expect(u.Name).to.be.eq('Visitor');
            done();
        }, done)
    }

    @test 'GetCurrentUser() should update with the new User on change '(done: MochaDone) {
        let repo = new MockRepository();
        repo.httpProviderRef.setResponse({
            d: {
                __count: 1,
                results: [{
                    Name: 'NewUser',
                    Id: 1000,
                    LoginName: 'NewUser',
                    Type: 'User',
                }]
            }
        })
        repo.Authentication.CurrentUser = 'BuiltIn\\NewUser';
        repo.Authentication.stateSubject.next(LoginState.Pending);
        repo.Authentication.stateSubject.next(LoginState.Authenticated);
        repo.GetCurrentUser().skipWhile(u => u.Name === 'Visitor').subscribe(u => {
            expect(u.Name).to.be.eq('NewUser');
            done();
        }, done)
    }


    @test 'GetCurrentUser() should not update if multiple users found  on change '(done: MochaDone) {
        let repo = new MockRepository();

        repo.GetCurrentUser().skipWhile(u => u.Name === 'Visitor').subscribe(u => {
            done('Error should be thrown here.');
        }, err => {
            expect(err).to.be.eq("Error getting current user: found multiple users with login name 'NewUser' in domain 'BuiltIn'")
            done()
        })

        repo.httpProviderRef.setResponse({
            d: {
                __count: 2,
                results: [{
                    Name: 'NewUser',
                    Id: 1000,
                    LoginName: 'NewUser',
                    Type: 'User',
                },
                {
                    Name: 'NewUser',
                    Id: 1000,
                    LoginName: 'NewUser',
                    Type: 'User',
                }]
            }
        })
        repo.Authentication.CurrentUser = 'BuiltIn\\NewUser';
        repo.Authentication.stateSubject.next(LoginState.Pending);
        repo.Authentication.stateSubject.next(LoginState.Authenticated);
    }

}