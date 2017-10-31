import * as Chai from 'chai';
import * as  FieldSettings from '../src/FieldSettings';
const expect = Chai.expect;

describe('FieldSettings', () => {
    describe('#FieldSetting type guard', () => {

        let fieldSetting: FieldSettings.FieldSetting;
        beforeEach(() => {
            fieldSetting = { Name: 'ShortText', Type: 'ShortText' } as FieldSettings.FieldSetting;
        });

        it('should return true for ShortText', () => {
            expect(FieldSettings.isFieldSettingOfType(fieldSetting, FieldSettings.ShortTextFieldSetting)).to.be.eq(true);
        });
    });
});
