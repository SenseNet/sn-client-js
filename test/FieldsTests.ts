///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { Fields } from '../src/Fields';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('Fields', () => {
    describe('#ChoiceOption', function(){
        const option = new Fields.ChoiceOption('text');
        it('should return a schema object', function(){
            expect(option).to.be.an.instanceof(Fields.ChoiceOption);
        });
    });
});