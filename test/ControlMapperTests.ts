import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ControlMapper } from '../src/ControlMapper';
import { FieldSettings, ContentTypes, Mocks, Content } from '../src/SN';


class ExampleControlBase { }

class ExampleDefaultControl extends ExampleControlBase { }

class ExampleModifiedControl extends ExampleControlBase { }

class ExampleModifiedControl2 extends ExampleControlBase { }

class ExampleDefaultFieldControl extends ExampleControlBase { }

class ExampleClientSetting {
    constructor(public readonly fieldSetting: FieldSettings.FieldSetting) {

    }
}

@suite('ControlMapper')
export class ControlMapperTests {
    private mapper: ControlMapper<ExampleControlBase, ExampleClientSetting>;
    before() {
        this.mapper = new ControlMapper(ExampleControlBase, setting => new ExampleClientSetting(setting), ExampleDefaultControl, ExampleDefaultFieldControl);
    }

    @test
    public 'example'() {
        Chai.expect(this.mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should be able to construct with BaseType and ClientControlSettingsFactory'() {
        const mapper = new ControlMapper(ExampleControlBase, setting => new ExampleClientSetting(setting));
        Chai.expect(mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should be able to construct with all parameters'() {
        const mapper = new ControlMapper(ExampleControlBase, setting => new ExampleClientSetting(setting), ExampleDefaultControl, ExampleDefaultFieldControl);
        Chai.expect(mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should return correct Default Control for ContentTypes'() {
        const controlType = this.mapper.GetControlForContentType(ContentTypes.Task);
        Chai.expect(controlType).to.be.eq(ExampleDefaultControl);
    }

    @test
    public 'Should return correct explicit defined Control for ContentTypes'() {
        this.mapper.MapContentTypeToControl(ContentTypes.Task, ExampleModifiedControl);
        const controlType = this.mapper.GetControlForContentType(ContentTypes.Task);
        Chai.expect(controlType).to.be.eq(ExampleModifiedControl);
    }

    @test
    public 'Should return correct Default Control for FieldSettings'() {
        const fs = new FieldSettings.ChoiceFieldSetting({});
        const controlType = this.mapper.GetControlForFieldSetting(fs);
        Chai.expect(controlType).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'Should return correct explicit defined Control for FieldSettings'() {

        this.mapper.SetupFieldSettingDefault(FieldSettings.ChoiceFieldSetting, (setting) => {
            if (setting.Compulsory) {
                return ExampleModifiedControl;
            }
            return ExampleDefaultFieldControl;
        });

        const fs = new FieldSettings.ChoiceFieldSetting({ compulsory: true });
        const controlType = this.mapper.GetControlForFieldSetting(fs);
        Chai.expect(controlType).to.be.eq(ExampleModifiedControl);

        const fs2 = new FieldSettings.ChoiceFieldSetting({ compulsory: false });
        const controlType2 = this.mapper.GetControlForFieldSetting(fs2);
        Chai.expect(controlType2).to.be.eq(ExampleDefaultFieldControl);
    }



    @test
    public 'Should return a correct default control for a specified Content Field'() {
        const control = this.mapper.GetControlForContentField(ContentTypes.Task, 'DisplayName', 'new');
        Chai.expect(control).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'Should return a correct default control for a specified Content Field when FieldSetting has default value'() {
        this.mapper.SetupFieldSettingDefault(FieldSettings.ShortTextFieldSetting, (setting) => {
            return ExampleModifiedControl;
        })
        const control = this.mapper.GetControlForContentField(ContentTypes.Task, 'DisplayName', 'new');
        Chai.expect(control).to.be.eq(ExampleModifiedControl);

        const controlOther = this.mapper.GetControlForContentField(ContentTypes.User, 'DisplayName', 'new');
        Chai.expect(controlOther).to.be.eq(ExampleModifiedControl);

        const controlOtherDateTime = this.mapper.GetControlForContentField(ContentTypes.Task, 'DueDate', 'new');
        Chai.expect(controlOtherDateTime).to.be.eq(ExampleDefaultFieldControl);

    }

    @test
    public 'Should return a correct default control for a specified Content Field when there is a ContentType bound setting specified'() {
        this.mapper.SetupFieldSettingForControl(ContentTypes.Task, 'DisplayName', (setting) => {
            return ExampleModifiedControl2;
        })
        const control = this.mapper.GetControlForContentField(ContentTypes.Task, 'DisplayName', 'new');
        Chai.expect(control).to.be.eq(ExampleModifiedControl2);

        const control2 = this.mapper.GetControlForContentField(ContentTypes.User, 'DisplayName', 'new');
        Chai.expect(control2).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'CreateClientSetting should run with defult factory method by default'() {
        const fieldSetting = new FieldSettings.ShortTextFieldSetting({ displayName: 'TestField' });
        const clientSetting = this.mapper.CreateClientSetting(fieldSetting);
        Chai.expect(clientSetting.fieldSetting.DisplayName).to.be.eq(fieldSetting.DisplayName);
    }

    @test
    public 'CreateClientSetting should be able to run with an overridden factory method'() {
        const fieldSetting = new FieldSettings.ShortTextFieldSetting({ displayName: 'TestField' });
        this.mapper.SetClientControlFactory(FieldSettings.ShortTextFieldSetting, (setting => {
            setting.DisplayName = (setting.DisplayName || '').toUpperCase()
            return new ExampleClientSetting(setting);
        }))

        const clientSetting = this.mapper.CreateClientSetting(fieldSetting);
        Chai.expect(clientSetting.fieldSetting.DisplayName).to.be.eq('TESTFIELD');
    }

    @test
    public 'GetAllMappingsForContentTye should be able to return all mappings'() {
        for (let key in ContentTypes) {
            const fullMapping = this.mapper.GetFullSchemaForContentType((ContentTypes as any)[key], 'new');
            Chai.expect(fullMapping.FieldMappings.length).to.be.greaterThan(0);
            fullMapping.FieldMappings.forEach(m => {
                Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
                Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
            })
        }
    }

    @test
    public 'GetAllMappingsForContentTye filtered to View should be able to return all mappings'() {
        const fullMapping = this.mapper.GetFullSchemaForContentType(ContentTypes.Task, 'view').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach(m => {
            Chai.expect(m.ClientSettings.fieldSetting.VisibleBrowse).to.be.eq(FieldSettings.FieldVisibility.Show);
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        })
    }

    @test
    public 'GetAllMappingsForContentTye filtered to Edit should be able to return all mappings'() {
        const fullMapping = this.mapper.GetFullSchemaForContentType(ContentTypes.Task, 'edit').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach(m => {
            Chai.expect(m.ClientSettings.fieldSetting.VisibleEdit).to.be.eq(FieldSettings.FieldVisibility.Show);
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        })
    }


    @test
    public 'GetAllMappingsForContentTye filtered to New should be able to return all mappings'() {
        const fullMapping = this.mapper.GetFullSchemaForContentType(ContentTypes.Task, 'new').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach(m => {
            Chai.expect(m.ClientSettings.fieldSetting.VisibleNew).to.be.eq(FieldSettings.FieldVisibility.Show);
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        })
    }

    @test
    public 'GetFullSchemaForContent filtered to New should be able to return all mappings'() {
        const fullMapping = this.mapper.GetFullSchemaForContent(Content.Create({DueDate: '2017-06-27T11:11:11Z', Name: 'Task1'}, ContentTypes.Task, new Mocks.MockRepository()), 'new').FieldMappings;
        Chai.expect(fullMapping.length).to.be.greaterThan(0);
        fullMapping.forEach(m => {
            Chai.expect(m.ClientSettings).to.be.instanceof(ExampleClientSetting);
            Chai.expect(m.ControlType).to.be.eq(ExampleDefaultFieldControl);
        })
    }


}