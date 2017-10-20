import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigBehavior } from '../src/Config/snconfigbehavior';
import { SnConfigFieldModel } from '../src/Config/snconfigfieldmodel';
import { SnConfigFieldModelStore } from '../src/Config/snconfigfieldmodelstore';
import { SnConfigModel } from '../src/Config/snconfigmodel';

const expect = Chai.expect;

@suite('SnConfig')
export class SnConfigTests {

    @test
    public 'SnConfigFieldModel Should be constructed with SnConfigBehavior.Default'() {
        const fieldModel = new SnConfigFieldModel();
        expect(fieldModel.Behavior).to.be.eq(SnConfigBehavior.Default);
    }

    @test
    public 'SnConfigFieldModelStore return the Entity in the store '() {
        SnConfigFieldModelStore.Add({ FieldName: 'AddedExample', Question: 'ExampleQuestion', Behavior: SnConfigBehavior.Default, StoreKey: 'AddedExample' });
        const model = SnConfigFieldModelStore.Get('AddedExample');
        expect(model.FieldName).to.be.eq('AddedExample');
        expect(model.Question).to.be.eq('ExampleQuestion');
    }

    @test
    public 'SnConfigFieldModelStore Should throw error if entity isn\'t in the store '() {
        const find = () => { SnConfigFieldModelStore.Get('exampleFieldName'); };
        expect(find).to.throw(Error);
    }

    @test
    public 'SnConfigFieldModelStore Should throw an error if you try to add a field that already exists'() {
        const add = () => { SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: SnConfigBehavior.Default, StoreKey: 'Example' }); };
        add();  // add once
        expect(add).to.throw(Error);
    }


    @test
    public 'SnConfigFieldModelStore Should throw an error if you try to add a field without StoreKey'() {
        const add = () => { SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: SnConfigBehavior.Default }); };
        expect(add).to.throw(Error);
    }

    @test
    public 'GetCommandOptions should return only commands that has AllowFromCommandLine flag'() {
        const commands = SnConfigFieldModelStore.GetCommandOptions();
        commands.forEach((command) => {
            const isAllowed = (command.Behavior & SnConfigBehavior.AllowFromCommandLine) === SnConfigBehavior.AllowFromCommandLine;
            expect(isAllowed).to.eq(true);
        });
    }

    @test
    public 'DEFAULT_BASE_URL should be equals to window.location.origin, if available'() {
        const empty = SnConfigModel.DEFAULT_BASE_URL;
        expect(empty).to.be.eq('');

        (global as any).window = {
            location: {
                origin: 'http://google.com'
            }
        };

        const origin = SnConfigModel.DEFAULT_BASE_URL;
        expect(origin).to.be.eq('http://google.com');
    }

}
