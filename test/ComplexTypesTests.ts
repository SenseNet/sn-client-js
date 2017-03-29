import { ComplexTypes } from '../src/complextypes';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('ComplexTypes', () => {
    describe('#ChoiceOption', function () {
        const option = new ComplexTypes.ChoiceOption('text');
        it('should return a choice option object', function () {
            expect(option).to.be.an.instanceof(ComplexTypes.ChoiceOption);
        });
    });
    describe('#DeferredObject', function () {
        const link = new ComplexTypes.DeferredObject();
        it('should return a DeferredObject object', function () {
            expect(link).to.be.an.instanceof(ComplexTypes.DeferredObject);
        });
    });
    describe('#DeferredUriObject', function () {
        const link = new ComplexTypes.DeferredUriObject();
        it('should return a DeferredUriObject object', function () {
            expect(link).to.be.an.instanceof(ComplexTypes.DeferredUriObject);
        });
    });
    describe('#MediaResourceObject', function () {
        const link = new ComplexTypes.MediaResourceObject();
        it('should return a MediaResourceObject object', function () {
            expect(link).to.be.an.instanceof(ComplexTypes.MediaResourceObject);
        });
    });
    describe('#Hyperlink', function () {
        const link = new ComplexTypes.MediaObject();
        it('should return a hyperlink object', function () {
            expect(link).to.be.an.instanceof(ComplexTypes.MediaObject);
        });
    });
});