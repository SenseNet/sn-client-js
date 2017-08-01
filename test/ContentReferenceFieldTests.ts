import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ContentReferenceField } from '../src/ContentReferences';
import { DeferredObject } from '../src/ComplexTypes';
import { MockRepository } from './Mocks/MockRepository';
import { IContentOptions } from '../src/Content';
import { ContentTypes } from '../src/SN';
import { LoginState } from '../src/Authentication/LoginState';
import { ReferenceFieldSetting } from '../src/FieldSettings';

const expect = Chai.expect;

@suite('ContentReferenceField')
export class ContentReferenceFieldTests {
    private unloadedRef: ContentReferenceField<ContentTypes.Task>;
    private loadedRef: ContentReferenceField<ContentTypes.Task>;

    private repo: MockRepository;
    before() {
        this.repo = new MockRepository();
        this.repo.Authentication.stateSubject.next(LoginState.Authenticated);
        this.loadedRef = new ContentReferenceField({
            Id: 1,
            Path: 'root/a/b',
            Name: 'Name',
            Type: 'Task'
        } as IContentOptions, new ReferenceFieldSetting({}), this.repo);
        this.unloadedRef = new ContentReferenceField({
            __deferred: {
                uri: 'a/b/c'
            }
        } as DeferredObject, new ReferenceFieldSetting({}),  this.repo);
    }

    @test
    public 'Should be able to construct ContentReferenceField from Deferred without loaded content reference'() {
        expect(this.unloadedRef).to.be.instanceof(ContentReferenceField);
        expect(this.unloadedRef['contentReference']).to.be.eq(undefined);
    }

    @test
    public 'Should be able to construct ContentReferenceField from IContentOptions with loaded content reference'() {
        expect(this.loadedRef).to.be.instanceof(ContentReferenceField);
        expect(this.loadedRef['contentReference']).to.be.instanceOf(ContentTypes.Task)
    }


    @test
    public 'Getting unloaded referenced Content should trigger an OData call'(done: MochaDone) {
        this.repo.httpProviderRef.setResponse({
            d: {
                Id: 123,
                DisplayName: 'aaa',
                Name: 'bbb',
                Path: 'Root/Workspace',
                Type: 'Workspace'
            }
        })
        this.unloadedRef.GetContent().subscribe(c => {
            expect(this.unloadedRef['contentReference']).to.be.eq(c);
            done();
        }, err => done);
    }

    @test
    public 'Getting loaded referenced Content should NOT trigger an OData call'(done: MochaDone) {
        this.loadedRef.GetContent().subscribe(c => {
            expect(this.loadedRef['contentReference']).to.be.eq(c);
            done();
        }, err => done);
    }

    @test
    public 'getValue should return undefined for unloaded reference'(){
        expect(this.unloadedRef.getValue()).to.be.eq(undefined);
    }

    @test
    public 'getValue should return the loaded Path for a loaded reference'(){
        expect(this.loadedRef.getValue()).to.be.eq(this.loadedRef['contentReference'].Path);
    }

    @test
    public 'SetContent should set the reference content'(done: MochaDone){
        this.unloadedRef.SetContent(this.loadedRef['contentReference']);
        this.unloadedRef.GetContent().subscribe(c => {
            expect(c).to.eq(this.loadedRef['contentReference']);
            done();
        }, err => done)
    }
}
