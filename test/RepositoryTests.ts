import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Observable } from '@reactivex/rxjs';
import { SnConfigModel } from '../src/Config';
import { MockRepository } from './Mocks/MockRepository';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class BaseHttpProviderTests {

    private repo: MockRepository;

    public before() {
        let cfg = new SnConfigModel({
            RepositoryUrl: 'https://localhost',
            ODataToken: 'odata.svc'
        });
        this.repo = new MockRepository(cfg);
    };

    @test('ODataBaseUrl should return a valid URL based on RepositoryUrl and ODataToken')
    public ODataBaseUrl(){
        expect(this.repo.ODataBaseUrl).to.be.eq('https://localhost/odata.svc');
    }


    @test('Login should return an Observable<boolean>')
    public ODataApi() {
        let loginResponse = this.repo.Authentication.Login('test', 'test');
        Chai.expect(loginResponse).to.be.instanceof(Observable);
    }
}