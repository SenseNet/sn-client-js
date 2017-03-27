"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fields_1 = require("../src/Fields");
const Chai = require("chai");
const expect = Chai.expect;
describe('Fields', () => {
    describe('#ChoiceOption', function () {
        const option = new Fields_1.Fields.ChoiceOption('text');
        it('should return a choice option object', function () {
            expect(option).to.be.an.instanceof(Fields_1.Fields.ChoiceOption);
        });
    });
    describe('#Hyperlink', function () {
        const link = new Fields_1.Fields.HyperLink('text', 'text', 'text', 'text');
        it('should return a hyperlink object', function () {
            expect(link).to.be.an.instanceof(Fields_1.Fields.HyperLink);
        });
    });
});
//# sourceMappingURL=FieldsTests.js.map