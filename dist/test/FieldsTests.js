"use strict";
const Fields_1 = require('../src/Fields');
const Chai = require('chai');
const expect = Chai.expect;
describe('Fields', () => {
    describe('#ChoiceOption', function () {
        const option = new Fields_1.Fields.ChoiceOption('text');
        it('should return a schema object', function () {
            expect(option).to.be.an.instanceof(Fields_1.Fields.ChoiceOption);
        });
    });
});

//# sourceMappingURL=FieldsTests.js.map
