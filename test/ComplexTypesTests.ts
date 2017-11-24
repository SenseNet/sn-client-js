import * as Chai from 'chai';
import { ChoiceOption, DeferredObject, DeferredUriObject, MediaObject, MediaResourceObject } from '../src/ComplexTypes';
const expect = Chai.expect;

export const ComplexTypesTests = describe('ComplexTypes', () => {
    describe('#ChoiceOption', () => {
        const option = new ChoiceOption('text');
        it('should return a choice option object', () => {
            expect(option).to.be.an.instanceof(ChoiceOption);
        });
    });
    describe('#DeferredObject', () => {
        const link = new DeferredObject();
        it('should return a DeferredObject object', () => {
            expect(link).to.be.an.instanceof(DeferredObject);
        });
    });
    describe('#DeferredUriObject', () => {
        const link = new DeferredUriObject();
        it('should return a DeferredUriObject object', () => {
            expect(link).to.be.an.instanceof(DeferredUriObject);
        });
    });
    describe('#MediaResourceObject', () => {
        const link = new MediaResourceObject();
        it('should return a MediaResourceObject object', () => {
            expect(link).to.be.an.instanceof(MediaResourceObject);
        });
    });
    describe('#Hyperlink', () => {
        const link = new MediaObject();
        it('should return a hyperlink object', () => {
            expect(link).to.be.an.instanceof(MediaObject);
        });
    });
});
