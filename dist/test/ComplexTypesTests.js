"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../src/SN");
const Chai = require("chai");
const expect = Chai.expect;
describe('ComplexTypes', () => {
    describe('#ChoiceOption', function () {
        const option = new SN_1.ComplexTypes.ChoiceOption('text');
        it('should return a choice option object', function () {
            expect(option).to.be.an.instanceof(SN_1.ComplexTypes.ChoiceOption);
        });
    });
    describe('#DeferredObject', function () {
        const link = new SN_1.ComplexTypes.DeferredObject();
        it('should return a DeferredObject object', function () {
            expect(link).to.be.an.instanceof(SN_1.ComplexTypes.DeferredObject);
        });
    });
    describe('#DeferredUriObject', function () {
        const link = new SN_1.ComplexTypes.DeferredUriObject();
        it('should return a DeferredUriObject object', function () {
            expect(link).to.be.an.instanceof(SN_1.ComplexTypes.DeferredUriObject);
        });
    });
    describe('#MediaResourceObject', function () {
        const link = new SN_1.ComplexTypes.MediaResourceObject();
        it('should return a MediaResourceObject object', function () {
            expect(link).to.be.an.instanceof(SN_1.ComplexTypes.MediaResourceObject);
        });
    });
    describe('#Hyperlink', function () {
        const link = new SN_1.ComplexTypes.MediaObject();
        it('should return a hyperlink object', function () {
            expect(link).to.be.an.instanceof(SN_1.ComplexTypes.MediaObject);
        });
    });
});
//# sourceMappingURL=ComplexTypesTests.js.map