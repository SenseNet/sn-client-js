import { FieldSettings } from '../src/SN'
import * as Chai from 'chai';
const expect = Chai.expect;

describe('FieldSettings', () => {
    describe('#FieldSetting constructor', () => {

        let fieldSetting: FieldSettings.FieldSetting;
        beforeEach(() => {
            fieldSetting = new FieldSettings.FieldSetting({ name: 'ShortText' });
        });

        it('should return a FieldSetting object', () => {
            expect(fieldSetting).to.be.an.instanceof(FieldSettings.FieldSetting);
        });
        it('should return a FieldSetting object with a name ShortText', () => {
            expect(fieldSetting.Name).to.be.eq('ShortText');
        });
        it('should return null as the Icon of the FieldSetting object', () => {
            let inst = new FieldSettings.FieldSetting({ name: 'ShortText' });
            expect(inst.Icon).to.be.eq(undefined);
        });
        it('returns the name', () => {
            expect(fieldSetting.Name).to.be.eq('ShortText');
        });
        it('can be changed', () => {
            fieldSetting.Name = 'Number';
            expect(fieldSetting.Name).to.be.equal('Number');
        });
        it('should return a FieldSetting object with a name ShortText', () => {
            let obj1 = JSON.stringify({ Name: 'ShortText' });
            let obj2 = new FieldSettings.FieldSetting({
                name: 'ShortText',
            });
            expect(obj1).to.be.eq(JSON.stringify(obj2));
        });
        it('should return a FieldSetting object with a name ShortText2', () => {

            const fieldSetting = new FieldSettings.FieldSetting({ name: 'ShortText2', displayName: 'AAA' });
            let obj1 = JSON.stringify({ Name: 'ShortText2', DisplayName: 'AAA' });
            expect(JSON.stringify(fieldSetting)).to.be.eq(obj1);
        });
    });
    describe('#TextFieldSetting constructor', () => {
        const fieldSetting = new FieldSettings.TextFieldSetting({ name: 'ShortText', displayName: 'ShortText', maxLength: 2, minLength: 0 });
        it('should return a TextFieldSetting object', () => {
            expect(fieldSetting).to.be.an.instanceof(FieldSettings.TextFieldSetting);
        });
        it('should return a TextFieldSetting object with a name ShortText', () => {
            expect(fieldSetting.Name).to.be.eq('ShortText');
        });
        it('should return a TextFieldSetting object with the given params', () => {
            const obj1 = JSON.stringify(fieldSetting);
            const obj2 = JSON.stringify({ Name: 'ShortText', DisplayName: 'ShortText', MinLength: 0, MaxLength: 2 })
            expect(obj1).to.be.eq(obj2);
        });
        it('should return null as the Icon of the TextFieldSetting object', () => {
            let inst = new FieldSettings.TextFieldSetting({ name: 'ShortText' });
            expect(inst.Icon).to.be.eq(undefined);
        });
    });
    describe('#ShortText', () => {
        const shorttext = new FieldSettings.ShortTextFieldSetting({name: 'text'});
        it('should return a ShortText fieldSetting object', () => {
            expect(shorttext).to.be.an.instanceof(FieldSettings.ShortTextFieldSetting);
        });
    });
    describe('#Number', () => {
        const number = new FieldSettings.NumberFieldSetting({name: 'text'});
        it('should return a Number fieldSetting object', () => {
            expect(number).to.be.an.instanceof(FieldSettings.NumberFieldSetting);
        });
    });
    describe('#Binary', () => {
        const binary = new FieldSettings.BinaryFieldSetting({name: 'text'});
        it('should return a Binary fieldSetting object', () => {
            expect(binary).to.be.an.instanceof(FieldSettings.BinaryFieldSetting);
        });
    });
    describe('#Captcha', () => {
        const captcha = new FieldSettings.CaptchaFieldSetting({ 'displayName': 'Captcha' });
        it('should return a Captcha fieldSetting object', () => {
            expect(captcha).to.be.an.instanceof(FieldSettings.CaptchaFieldSetting);
        });
    });
});