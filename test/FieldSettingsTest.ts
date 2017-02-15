///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { FieldSettings } from '../src/FieldSettings'
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe("FieldSettings", () => {
    describe("#FieldSetting constructor", function () {
        const fieldSetting = new FieldSettings.FieldSetting({ name: 'ShortText' });
        it('should return a FieldSetting object', function () {
            expect(fieldSetting).to.be.an.instanceof(FieldSettings.FieldSetting);
        });
        it('should return a FieldSetting object with a name Shorttext', function () {
            expect(fieldSetting.Name).to.be.eq('Shorttext');
        });
        it('should return null as the Icon of the FieldSetting object', function () {
            let spy = sinon.spy(FieldSettings, 'FieldSetting');
            let MyClass = FieldSettings.FieldSetting;
            let inst = new MyClass({ name: 'ShortText' });
            expect(spy.calledOnce).to.be.true;
            expect(spy.called).to.be.equal(true);
        });
        it('returns the name', () => {
            fieldSetting.Name.should.equal('ShortText');
        });
        it('can be changed', () => {
            fieldSetting.Name = 'Number';
            fieldSetting.Name.should.equal('Number');
        });
        it('should return a FieldSetting object with a name Shorttext', function () {
            let obj1 = JSON.stringify({ Name: 'ShortText', DisplayName: null });
            expect(JSON.stringify(fieldSetting)).to.be.eq(obj1);
        });
        it('should return a FieldSetting object with a name Shorttext', function () {

            const fieldSetting = new FieldSettings.FieldSetting({ name: 'ShortText', displayName: 'AAA' });
            let obj1 = JSON.stringify({ Name: 'ShortText', DisplayName: 'AAA' });
            expect(JSON.stringify(fieldSetting)).to.be.eq(obj1);
        });
    });
    describe("#TextFieldSetting constructor", function () {
        const fieldSetting = new FieldSettings.TextFieldSetting({ name: 'ShortText', displayName: 'ShortText', maxLength: 2, minLength: 0 });
        it('should return a TextFieldSetting object', function () {
            expect(fieldSetting).to.be.an.instanceof(FieldSettings.TextFieldSetting);
        });
        it('should return a TextFieldSetting object with a name Shorttext', function () {
            expect(fieldSetting.Name).to.be.eq('Shorttext');
        });
        it('should return a TextFieldSetting object with the given params', function () {
            const obj1 = JSON.stringify(fieldSetting);
            const obj2 = JSON.stringify({ name: 'ShortText', displayName: 'ShortText', maxLength: 2, minLength: 0 })
            expect(obj1).to.be.eq(obj2);
        });
        it('should return null as the Icon of the TextFieldSetting object', function () {
            let spy = sinon.spy(FieldSettings, 'TextFieldSetting');
            let MyClass = FieldSettings.TextFieldSetting;
            let inst = new MyClass({ name: 'ShortText' });
            expect(spy.calledOnce).to.be.true;
        });
    });
    describe('#ShortText', function () {
        const shorttext = new FieldSettings.ShortTextFieldSetting('text');
        it('should return a ShortText fieldSetting object', function () {
            expect(shorttext).to.be.an.instanceof(FieldSettings.ShortTextFieldSetting);
        });
    });
    describe('#Number', function () {
        const number = new FieldSettings.NumberFieldSetting('text');
        it('should return a Number fieldSetting object', function () {
            expect(number).to.be.an.instanceof(FieldSettings.NumberFieldSetting);
        });
    });
    describe('#Binary', function () {
        const binary = new FieldSettings.BinaryFieldSetting('text');
        it('should return a Binary fieldSetting object', function () {
            expect(binary).to.be.an.instanceof(FieldSettings.BinaryFieldSetting);
        });
    });
    describe('#Color', function () {
        const color = new FieldSettings.ColorFieldSetting('text');
        it('should return a Color fieldSetting object', function () {
            expect(color).to.be.an.instanceof(FieldSettings.ColorFieldSetting);
        });
    });
    describe('#Currency', function () {
        const currency = new FieldSettings.CurrencyFieldSetting('text');
        it('should return a Currency fieldSetting object', function () {
            expect(currency).to.be.an.instanceof(FieldSettings.CurrencyFieldSetting);
        });
    });
    describe('#Captcha', function () {
        const captcha = new FieldSettings.CaptchaFieldSetting({'displayName': 'Captcha'});
        it('should return a Captcha fieldSetting object', function () {
            expect(captcha).to.be.an.instanceof(FieldSettings.CaptchaFieldSetting);
        });
    });
});