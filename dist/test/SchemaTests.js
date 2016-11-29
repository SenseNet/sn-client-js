"use strict";
const Schema_1 = require('../src/Schema');
const FieldSettings_1 = require('../src/FieldSettings');
const Chai = require('chai');
const expect = Chai.expect;
describe('Schemas', () => {
    describe('#Schema', function () {
        let schema = new Schema_1.Schemas.Schema({ FieldSettings: [] });
        it('should return a schema object', function () {
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NumberFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BinaryFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
                name: 'aaa',
                options: []
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.CurrencyFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.HyperLinkFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ColorFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.PasswordFieldSetting({
                name: 'DisplayName'
            }));
            expect(schema).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#GenericContent', function () {
        const gc = Schema_1.Schemas.GenericContentCTD();
        it('should return a schema object', function () {
            expect(gc).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
});

//# sourceMappingURL=SchemaTests.js.map
