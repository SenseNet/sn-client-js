"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("@reactivex/rxjs");
const Chai = require("chai");
const Repository_1 = require("../src/Repository");
const expect = Chai.expect;
describe('ODataApi', () => {
    let repo;
    beforeEach(() => {
        repo = new Repository_1.SnTestRepository();
    });
    describe('#Login', function () {
        it('should return an obsevable object', () => {
            let loginResponse = repo.Authentication.Login('test', 'test');
            expect(loginResponse).to.be.instanceof(rxjs_1.Observable);
        });
    });
});
//# sourceMappingURL=RepositoryTests.js.map