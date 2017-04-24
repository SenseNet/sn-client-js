import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigBehavior } from '../src/Config/snconfigbehavior';
import { SnConfigFieldModel } from '../src/Config/snconfigfieldmodel';
import { SnConfigFieldModelStore } from '../src/Config/snconfigfieldmodelstore';

const expect = Chai.expect;

@suite('SnConfig Tests')
export class SnConfigTests {

    @test('SnConfigFieldModel Should be constructed with SnConfigBehavior.Default')
    public ConfigEntryCtor() {
        const fieldModel = new SnConfigFieldModel();
        expect(fieldModel.Behavior).to.be.eq(SnConfigBehavior.Default);
    }

    @test('SnConfigFieldModelStore Should throw error if entity isn\'t in the store ')
    public StoreMissing() {
        const find = () => { SnConfigFieldModelStore.Get('exampleFieldName'); };
        expect(find).to.throw(Error);
    }

    @test('SnConfigFieldModelStore Should throw an error if you try to add a field that already exists')
    public StoreDuplicate() {
        const add = () => { SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: SnConfigBehavior.Default }); };
        add();  // add once
        expect(add).to.throw(Error);
    }

    @test('GetCommandOptions should return only commands that has AllowFromCommandLine flag')
    public GetCmmandOptions() {
        const commands = SnConfigFieldModelStore.GetCommandOptions();
        commands.forEach((command) => {
            const isAllowed = (command.Behavior & SnConfigBehavior.AllowFromCommandLine) === SnConfigBehavior.AllowFromCommandLine;
            expect(isAllowed).to.eq(true);
        });

    }

}
