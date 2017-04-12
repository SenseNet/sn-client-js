"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../src/SN");
const rxjs_1 = require("@reactivex/rxjs");
const Chai = require("chai");
const expect = Chai.expect;
describe('ODataApi', () => {
    let repo;
    beforeEach(() => {
        repo = new SN_1.Repository(SN_1.Http.MockAjaxHttpProvider);
    });
    describe('#Login', function () {
        it('should return an obsevable object', function () {
            let loginResponse = repo.Authentication.Login('test', 'test');
            expect(loginResponse).to.be.instanceof(rxjs_1.Observable);
        });
    });
});
//# sourceMappingURL=RepositoryTests.js.map