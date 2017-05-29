import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ControlMapper } from '../src/ControlMapper';
import { FieldSettings, ContentTypes } from '../src/SN';


class ExampleControlBase{ }

class ExampleDefaultControl extends ExampleControlBase{ }

class ExampleModifiedControl extends ExampleControlBase { }

class ExampleDefaultFieldControl extends ExampleControlBase{ }

class ExampleClientSetting{
    constructor(public readonly fieldSetting: FieldSettings.FieldSetting) {
        
    }
}

@suite('ControlMapper')
export class ControlMapperTests{
    private mapper: ControlMapper<any, any>;
    before() {
        this.mapper = new ControlMapper(ExampleControlBase, setting => new ExampleClientSetting(setting), ExampleDefaultControl, ExampleDefaultFieldControl);
    }

    @test
    public 'example'(){
        Chai.expect(this.mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should be able to construct with BaseType and ClientControlSettingsFactory'(){
        const mapper = new ControlMapper(ExampleControlBase, setting => new ExampleClientSetting(setting));
        Chai.expect(mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should be able to construct with all parameters'(){
        const mapper = new ControlMapper(ExampleControlBase, setting => new ExampleClientSetting(setting), ExampleDefaultControl, ExampleDefaultFieldControl);
        Chai.expect(mapper).to.be.instanceof(ControlMapper);
    }

    @test
    public 'Should return correct Default Control for ContentTypes'(){
        const controlType = this.mapper.GetControlForContentType(ContentTypes.Task);
        Chai.expect(controlType).to.be.eq(ExampleDefaultControl);
    }

    @test
    public 'Should return correct explicit defined Control for ContentTypes'(){
        this.mapper.MapContentTypeToControl(ContentTypes.Task, ExampleModifiedControl);
        const controlType = this.mapper.GetControlForContentType(ContentTypes.Task);
        Chai.expect(controlType).to.be.eq(ExampleModifiedControl);
    }

    @test
    public 'Should return correct Default Control for FieldSettings'(){
        const fs = new FieldSettings.ChoiceFieldSetting({});
        const controlType = this.mapper.GetControlForFieldSetting(fs);
        Chai.expect(controlType).to.be.eq(ExampleDefaultFieldControl);
    }

    @test
    public 'Should return correct explicit defined Control for FieldSettings'(){

        this.mapper.SetupFieldSettingDefault(FieldSettings.ChoiceFieldSetting, (setting) => {
            if (setting.Compulsory){
                return ExampleModifiedControl;
            }
            return ExampleDefaultFieldControl;
        });

        const fs = new FieldSettings.ChoiceFieldSetting({compulsory: true});
        const controlType = this.mapper.GetControlForFieldSetting(fs);
        Chai.expect(controlType).to.be.eq(ExampleModifiedControl);

        const fs2 = new FieldSettings.ChoiceFieldSetting({compulsory: false});
        const controlType2 = this.mapper.GetControlForFieldSetting(fs2);
        Chai.expect(controlType2).to.be.eq(ExampleDefaultFieldControl);
    }



    @test
    public 'Should return a correct default control for a specified Content Field'(){
        const control = this.mapper.GetControlForContentField(ContentTypes.Task, 'DisplayName');
        Chai.expect(control).to.be.instanceof(ExampleDefaultFieldControl);
    }

}