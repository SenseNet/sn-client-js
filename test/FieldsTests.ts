///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { Fields } from '../src/Fields';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('Fields', () => {
    describe('#ChoiceOption', function () {
        const option = new Fields.ChoiceOption('text');
        it('should return a choice option object', function () {
            expect(option).to.be.an.instanceof(Fields.ChoiceOption);
        });
    });
    describe('#Hyperlink', function () {
        const link = new Fields.HyperLink('text', 'text', 'text', 'text');
        it('should return a hyperlink object', function () {
            expect(link).to.be.an.instanceof(Fields.HyperLink);
        });
    });
});