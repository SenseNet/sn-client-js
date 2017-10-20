import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Task, User } from '../src/ContentTypes';
import * as ContentTypes from '../src/ContentTypes';
import { ControlMapper } from '../src/ControlMapper';
import { ChoiceFieldSetting, FieldSetting, FieldVisibility, ShortTextFieldSetting } from '../src/FieldSettings';
import { ContentInternal } from '../src/SN';
import { MockRepository } from './Mocks/MockRepository';

class ExampleControlBase { }

class ExampleDefaultControl extends ExampleControlBase { }

class ExampleModifiedControl extends ExampleControlBase { }

class ExampleModifiedControl2 extends ExampleControlBase { }

class ExampleDefaultFieldControl extends ExampleControlBase { }

class ExampleClientSetting {
    constructor(public readonly Setting: FieldSetting) {

    }
}

@suite('ControlMapper')
export class ControlMapperTests {
    private _mapper: ControlMapper<ExampleControlBase, ExampleClientSetting>;
    // tslint:disable-next-line:naming-convention
    public before() {
        this._mapper = new ControlMapper(ExampleControlBase, (setting) => new ExampleClientSetting(setting), ExampleDefaultControl, ExampleDefaultFieldControl);
    }

    @test
    public 'example'() {
        Chai.expect(this._mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should be able to construct with BaseType and ClientControlSettingsFactory'() {
        const mapper = new ControlMapper(ExampleControlBase, (setting) => new ExampleClientSetting(setting));
        Chai.expect(mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should be able to construct with all parameters'() {
        const mapper = new ControlMapper(ExampleControlBase, (setting) => new ExampleClientSetting(setting), ExampleDefaultControl, ExampleDefaultFieldControl);
        Chai.expect(mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should return correct Default Control for ContentTypes'() {
        const controlType = this._mapper.GetControlForContentType(Task);
        Chai.expect(controlType).to.be.eq(ExampleDefaultControl);
    }

    @test
    public 'Should return correct explicit defined Control for ContentTypes'() {
        this._mapper.MapContentTypeToControl(Task, ExampleModifiedControl);
        const controlType = this._mapper.GetControlForContentType(Task);
        Chai.expect(controlType).to.be.eq(ExampleModifiedControl);
    }

    @test
    public 'Should return correct Default Control for FieldSettings'() {
        const fs = new ChoiceFieldSetting({});
        const controlType = this._mapper.GetControlForFieldSetting(fs);
        Chai.expect(controlType).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'Should return correct explicit defined Control for FieldSettings'() {

        this._mapper.SetupFieldSettingDefault(ChoiceFieldSetting, (setting) => {
            if (setting.Compulsory) {
                return ExampleModifiedControl;
            }
            return ExampleDefaultFieldControl;
        });

        const fs = new ChoiceFieldSetting({ compulsory: true });
        const controlType = this._mapper.GetControlForFieldSetting(fs);
        Chai.expect(controlType).to.be.eq(ExampleModifiedControl);

        const fs2 = new ChoiceFieldSetting({ compulsory: false });
        const controlType2 = this._mapper.GetControlForFieldSetting(fs2);
        Chai.expect(controlType2).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'Should return a correct default control for a specified Content Field'() {
        const control = this._mapper.GetControlForContentField(Task, 'DisplayName', 'new');
        Chai.expect(control).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'Should return a correct default control for a specified Content Field when FieldSetting has default value'() {
        this._mapper.SetupFieldSettingDefault(ShortTextFieldSetting, (setting) => {
            return ExampleModifiedControl;
        });
        const control = this._mapper.GetControlForContentField(Task, 'DisplayName', 'new');
        Chai.expect(control).to.be.eq(ExampleModifiedControl);

        const controlOther = this._mapper.GetControlForContentField(User, 'DisplayName', 'new');
        Chai.expect(controlOther).to.be.eq(ExampleModifiedControl);

        const controlOtherDateTime = this._mapper.GetControlForContentField(Task, 'DueDate', 'new');
        Chai.expect(controlOtherDateTime).to.be.eq(ExampleDefaultFieldControl);

    }

    @test
    public 'Should return a correct default control for a specified Content Field when there is a ContentType bound setting specified'() {
        this._mapper.SetupFieldSettingForControl(Task, 'DisplayName', (setting) => {
            return ExampleModifiedControl2;
        });
        const control = this._mapper.GetControlForContentField(Task, 'DisplayName', 'new');
        Chai.expect(control).to.be.eq(ExampleModifiedControl2);

        const control2 = this._mapper.GetControlForContentField(User, 'DisplayName', 'new');
        Chai.expect(control2).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'CreateClientSetting should run with defult factory method by default'() {
        const fieldSetting = new ShortTextFieldSetting({ displayName: 'TestField' });
        const clientSetting = this._mapper.CreateClientSetting(fieldSetting);
        Chai.expect(clientSetting.Setting.DisplayName).to.be.eq(fieldSetting.DisplayName);
    }

    @test
    public 'CreateClientSetting should be able to run with an overridden factory method'() {
        const fieldSetting = new ShortTextFieldSetting({ displayName: 'TestField' });
        this._mapper.SetClientControlFactory(ShortTextFieldSetting, ((setting) => {
            setting.DisplayName = (setting.DisplayName || '').toUpperCase();
            return new ExampleClientSetting(setting);
        }));

        const clientSetting = this._mapper.CreateClientSetting(fieldSetting);
        Chai.expect(clientSetting.Setting.DisplayName).to.be.eq('TESTFIELD');
    }

    @test
    public 'GetAllMappingsForContentTye should be able to return all mappings'() {
        // tslint:disable-next-line:forin
        for (const key in ContentTypes) {
            const fullMapping = this._mapper.GetFullSchemaForContentType((ContentTypes as any)[key], 'new');
            Chai.expect(fullMapping.FieldMappings.length).to.be.greaterThan(0);
            fullMapping.FieldMappings.forEach((m) => {
                Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
                Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
            });
        }
    }

    @test
    public 'GetAllMappingsForContentTye filtered to View should be able to return all mappings'() {
        const fullMapping = this._mapper.GetFullSchemaForContentType(Task, 'view').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach((m) => {
            Chai.expect(m.ClientSettings.Setting.VisibleBrowse).to.be.eq(FieldVisibility.Show);
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        });
    }

    @test
    public 'GetAllMappingsForContentTye filtered to Edit should be able to return all mappings'() {
        const fullMapping = this._mapper.GetFullSchemaForContentType(Task, 'edit').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach((m) => {
            Chai.expect(m.ClientSettings.Setting.VisibleEdit).to.be.eq(FieldVisibility.Show);
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        });
    }

    @test
    public 'GetAllMappingsForContentTye filtered to New should be able to return all mappings'() {
        const fullMapping = this._mapper.GetFullSchemaForContentType(Task, 'new').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach((m) => {
            Chai.expect(m.ClientSettings.Setting.VisibleNew).to.be.eq(FieldVisibility.Show);
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        });
    }

    @test
    public 'GetFullSchemaForContent filtered to New should be able to return all mappings'() {
        const fullMapping = this._mapper.GetFullSchemaForContent(ContentInternal.Create<Task>({DueDate: '2017-06-27T11:11:11Z', Name: 'Task1'}, new MockRepository()), 'new').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach((m) => {
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        });
    }

}
