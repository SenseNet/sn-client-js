import { Schema, SchemaStore } from '../src/Schemas';
import { NumberFieldSetting, BinaryFieldSetting, ChoiceFieldSetting, PasswordFieldSetting } from '../src/FieldSettings';
import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Content } from '../src/Content';

@suite('Schemas Tests')
export class SchemaTests {

    @test
    public 'Should be able to construct'() {
        let schema: Schema<Content> = new Schema({
            ContentType: Content,
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
        SchemaStore.forEach(schema => {
            Chai.expect(schema).to.be.an.instanceof(Schema);
        });
    }
}