import { ComplexTypes } from '../src/SN';
import * as Chai from 'chai';
const expect = Chai.expect;

describe('ComplexTypes', () => {
    describe('#ChoiceOption', () => {
        const option = new ComplexTypes.ChoiceOption('text');
        it('should return a choice option object', () => {
            expect(option).to.be.an.instanceof(ComplexTypes.ChoiceOption);
        });
    });
    describe('#DeferredObject', () => {
        const link = new ComplexTypes.DeferredObject();
        it('should return a DeferredObject object', () => {
            expect(link).to.be.an.instanceof(ComplexTypes.DeferredObject);
        });
    });
    describe('#DeferredUriObject', () => {
        const link = new ComplexTypes.DeferredUriObject();
        it('should return a DeferredUriObject object', () => {
            expect(link).to.be.an.instanceof(ComplexTypes.DeferredUriObject);
        });
    });
    describe('#MediaResourceObject', () => {
        const link = new ComplexTypes.MediaResourceObject();
        it('should return a MediaResourceObject object', () => {
            expect(link).to.be.an.instanceof(ComplexTypes.MediaResourceObject);
        });
    });
    describe('#Hyperlink', () => {
        const link = new ComplexTypes.MediaObject();
        it('should return a hyperlink object', () => {
            expect(link).to.be.an.instanceof(ComplexTypes.MediaObject);
        });
    });
});