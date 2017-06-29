import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Observable } from '@reactivex/rxjs';
import { SnConfigModel } from '../src/Config';
import { MockRepository } from './Mocks/MockRepository';
import { MockAuthService } from './Mocks/MockAuthService';
import { MockHttpProvider } from './Mocks/MockHttpProvider';
import { VersionInfo, SnRepository } from '../src/Repository';
import { ContentTypes, Content } from '../src/SN';
import { LoginState } from '../src/Authentication';
import { ODataCollectionResponse } from '../src/ODataApi/index';

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
        } as ODataCollectionResponse<ContentTypes.ContentType>;
        this.repo.httpProviderRef.setResponse(cResponse);
        this.repo.GetAllContentTypes().first().subscribe(types => {
            expect(types.length).to.be.eq(1);
            expect(types[0].Name).to.be.eq('testContentType');
            expect(types[0]).to.be.instanceof(ContentTypes.ContentType);
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
        this.repo.Load(1, {}, '', ContentTypes.User).first().subscribe(response => {
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(ContentTypes.User);
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


}