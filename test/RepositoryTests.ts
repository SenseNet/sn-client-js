import { ODataApi } from '../src/SN';
import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
import { SnTestRepository } from '../src/Repository';
const expect = Chai.expect;

describe('ODataApi', () => {
    let repo: SnTestRepository;

    beforeEach(() => {
        repo = new SnTestRepository();
    });

    describe('#Login', function () {
        it('should return an obsevable object', () => {
            let loginResponse = repo.Authentication.Login('test', 'test');
            expect(loginResponse).to.be.instanceof(Observable);
        });
    });
});