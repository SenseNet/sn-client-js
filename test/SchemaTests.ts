///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { Schemas } from '../src/Schema';
import { FieldSettings } from '../src/FieldSettings';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('Schemas', () => {
    describe('#Schema', function () {
        let schema = new Schemas.Schema({ FieldSettings: [] });
        it('should return a schema object', function () {
            schema.FieldSettings.push(
                new FieldSettings.NumberFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.BinaryFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.ChoiceFieldSetting({
                    name: 'aaa',
                    options: []
                }));
            schema.FieldSettings.push(
                new FieldSettings.CurrencyFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.HyperLinkFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.ColorFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.PasswordFieldSetting({
                    name: 'DisplayName'
                }));
            expect(schema).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#GenericContent', function () {
        const gc = Schemas.GenericContentCTD();
        it('should return a schema object', function () {
            expect(gc).to.be.an.instanceof(Schemas.Schema);
        });
    });
});