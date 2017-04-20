"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../src/SN");
const Chai = require("chai");
const expect = Chai.expect;
describe('FieldSettings', () => {
    describe('#FieldSetting constructor', function () {
        let fieldSetting;
        beforeEach(function () {
            fieldSetting = new SN_1.FieldSettings.FieldSetting({ name: 'ShortText' });
        });
        it('should return a FieldSetting object', function () {
            expect(fieldSetting).to.be.an.instanceof(SN_1.FieldSettings.FieldSetting);
        });
        it('should return a FieldSetting object with a name ShortText', function () {
            expect(fieldSetting.Name).to.be.eq('ShortText');
        });
        it('should return null as the Icon of the FieldSetting object', function () {
            let inst = new SN_1.FieldSettings.FieldSetting({ name: 'ShortText' });
            expect(inst.Icon).to.be.eq(undefined);
        });
        it('returns the name', () => {
            expect(fieldSetting.Name).to.be.eq('ShortText');
        });
        it('can be changed', () => {
            fieldSetting.Name = 'Number';
            expect(fieldSetting.Name).to.be.equal('Number');
        });
        it('should return a FieldSetting object with a name ShortText', function () {
            let obj1 = JSON.stringify({ Name: 'ShortText' });
            let obj2 = new SN_1.FieldSettings.FieldSetting({
                name: 'ShortText',
            });
            expect(obj1).to.be.eq(JSON.stringify(obj2));
        });
        it('should return a FieldSetting object with a name ShortText2', function () {
            const fieldSetting = new SN_1.FieldSettings.FieldSetting({ name: 'ShortText2', displayName: 'AAA' });
            let obj1 = JSON.stringify({ Name: 'ShortText2', DisplayName: 'AAA' });
            expect(JSON.stringify(fieldSetting)).to.be.eq(obj1);
        });
    });
    describe('#TextFieldSetting constructor', function () {
        const fieldSetting = new SN_1.FieldSettings.TextFieldSetting({ name: 'ShortText', displayName: 'ShortText', maxLength: 2, minLength: 0 });
        it('should return a TextFieldSetting object', function () {
            expect(fieldSetting).to.be.an.instanceof(SN_1.FieldSettings.TextFieldSetting);
        });
        it('should return a TextFieldSetting object with a name ShortText', function () {
            expect(fieldSetting.Name).to.be.eq('ShortText');
        });
        it('should return a TextFieldSetting object with the given params', function () {
            const obj1 = JSON.stringify(fieldSetting);
            const obj2 = JSON.stringify({ Name: 'ShortText', DisplayName: 'ShortText', MinLength: 0, MaxLength: 2 });
            expect(obj1).to.be.eq(obj2);
        });
        it('should return null as the Icon of the TextFieldSetting object', function () {
            let inst = new SN_1.FieldSettings.TextFieldSetting({ name: 'ShortText' });
            expect(inst.Icon).to.be.eq(undefined);
        });
    });
    describe('#ShortText', function () {
        const shorttext = new SN_1.FieldSettings.ShortTextFieldSetting('text');
        it('should return a ShortText fieldSetting object', function () {
            expect(shorttext).to.be.an.instanceof(SN_1.FieldSettings.ShortTextFieldSetting);
        });
    });
    describe('#Number', function () {
        const number = new SN_1.FieldSettings.NumberFieldSetting('text');
        it('should return a Number fieldSetting object', function () {
            expect(number).to.be.an.instanceof(SN_1.FieldSettings.NumberFieldSetting);
        });
    });
    describe('#Binary', function () {
        const binary = new SN_1.FieldSettings.BinaryFieldSetting('text');
        it('should return a Binary fieldSetting object', function () {
            expect(binary).to.be.an.instanceof(SN_1.FieldSettings.BinaryFieldSetting);
        });
    });
    describe('#Captcha', function () {
        const captcha = new SN_1.FieldSettings.CaptchaFieldSetting({ 'displayName': 'Captcha' });
        it('should return a Captcha fieldSetting object', function () {
            expect(captcha).to.be.an.instanceof(SN_1.FieldSettings.CaptchaFieldSetting);
        });
    });
});
//# sourceMappingURL=FieldSettingsTest.js.map