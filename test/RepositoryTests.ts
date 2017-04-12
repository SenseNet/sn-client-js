import { ODataApi, Content, Repository, Http } from '../src/SN';
import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
const expect = Chai.expect;

describe('ODataApi', () => {
    let repo: Repository<any, any>;

    beforeEach(() => {
        repo = new Repository(Http.MockAjaxHttpProvider);
    });

    describe('#Login', function () {
        it('should return an obsevable object', function () {
            let loginResponse = repo.Authentication.Login('test', 'test');
            expect(loginResponse).to.be.instanceof(Observable);
        });
    });
})