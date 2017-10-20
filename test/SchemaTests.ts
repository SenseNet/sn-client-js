import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { GenericContent } from '../src/ContentTypes';
import { BinaryFieldSetting, ChoiceFieldSetting, NumberFieldSetting, PasswordFieldSetting } from '../src/FieldSettings';
import { Schema, SchemaStore } from '../src/Schemas';

@suite('Schemas Tests')
export class SchemaTests {

    @test
    public 'Should be able to construct'() {
        const schema: Schema<GenericContent> = new Schema({
            ContentType: GenericContent,
            FieldSettings: [
                new NumberFieldSetting({
                    name: 'DisplayName'
                }),
                new BinaryFieldSetting({
                    name: 'DisplayName'
                }),
                new ChoiceFieldSetting({
                    name: 'aaa',
                    options: []
                }),
                new PasswordFieldSetting({
                    name: 'DisplayName'
                })
            ], Icon: '', DisplayName: '', AllowedChildTypes: [], AllowIncrementalNaming: true, AllowIndexing: true, Description: ''
        });

        Chai.expect(schema).to.be.instanceof(Schema);

    }

    @test
    public 'SchemaTypes loop'() {
        SchemaStore.forEach((schema) => {
            Chai.expect(schema).to.be.an.instanceof(Schema);
        });
    }
}
