import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigModel } from '../src/Config';
import { MockRepository, MockAuthService, MockHttpProvider } from './Mocks';
import { VersionInfo, SnRepository } from '../src/Repository';
import { Content } from '../src/Content';
import { LoginState } from '../src/Authentication';
import { ODataCollectionResponse, ODataApi } from '../src/ODataApi';
import { User, Task, ContentType } from '../src/ContentTypes';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class BaseHttpProviderTests {

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

    @test 'isCrossDomain'() {
        let calculated = this.repo.Config.RepositoryUrl !== SnConfigModel.DEFAULT_BASE_URL;
        expect(this.repo.IsCrossDomain).to.be.eq(calculated);
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
        this.repo.Load(1, {}, '', User).first().subscribe(response => {
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
            Id: 1,
            Type: 'Task'
        })

        const usr = snRepo.HandleLoadedContent({
            Id: 2,
            Name: 'User'
        }, User)

        const content = snRepo.HandleLoadedContent({
            Id: 3
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

}