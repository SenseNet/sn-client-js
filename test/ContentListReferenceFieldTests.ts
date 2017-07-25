import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { ContentListReferenceField } from '../src/ContentReferences';
import { DeferredObject } from '../src/ComplexTypes';
import { MockRepository } from './Mocks/MockRepository';
import { IContentOptions } from '../src/Content';
import { ContentTypes } from '../src/SN';
import { LoginState } from '../src/Authentication/LoginState';

const expect = Chai.expect;

@suite('ContentListReferenceField')
export class ContentListReferenceFieldTests {
    private unloadedRef: ContentListReferenceField<ContentTypes.Task>;
    private loadedRef: ContentListReferenceField<ContentTypes.Task>;

    private repo: MockRepository;
    before() {
        this.repo = new MockRepository();
        this.repo.Authentication.stateSubject.next(LoginState.Authenticated);
        this.loadedRef = new ContentListReferenceField(
            [{
                Id: 1,
                Path: 'root/a/b',
                Name: 'Name',
                Type: 'Task'
            } as IContentOptions], this.repo);
        this.unloadedRef = new ContentListReferenceField({
            __deferred: {
                uri: 'a/b/c'
            }
        } as DeferredObject, this.repo);
    }

    @test
    public 'Should be able to construct ContentReferenceField from Deferred without loaded content reference'() {
        expect(this.unloadedRef).to.be.instanceof(ContentListReferenceField);
        expect(this.unloadedRef['contentReferences']).to.be.eq(undefined);
    }

    @test
    public 'Should be able to construct ContentReferenceField from IContentOptions with loaded content reference'() {
        expect(this.loadedRef).to.be.instanceof(ContentListReferenceField);
        expect(this.loadedRef['contentReferences'][0]).to.be.instanceOf(ContentTypes.Task)
    }


    @test
    public 'Getting unloaded referenced Content should trigger an OData call'(done: MochaDone) {
        this.repo.httpProviderRef.setResponse({
            d: {
                results: [{
                    Id: 123,
                    DisplayName: 'aaa',
                    Name: 'bbb',
                    Path: 'Root/Workspace',
                    Type: 'Workspace'
                }]
            }
        })
        this.unloadedRef.GetContents().subscribe(c => {
            expect(this.unloadedRef['contentReferences']).to.be.eq(c);
            done();
        }, err => done);
    }

    @test
    public 'Getting loaded referenced Content should NOT trigger an OData call'(done: MochaDone) {
        this.loadedRef.GetContents().subscribe(c => {
            expect(this.loadedRef['contentReferences']).to.be.eq(c);
            done();
        }, err => done);
    }

    @test
    public 'getValue should return undefined for unloaded reference'() {
        expect(this.unloadedRef.getValue()).to.be.eq(undefined);
    }

    @test
    public 'getValue should return the loaded Path for a loaded reference'() {
        expect(this.loadedRef.getValue()).to.be.deep.eq(this.loadedRef['contentReferences'].map(p => p.Path));
    }

    @test
    public 'SetContent should set the reference content'(done: MochaDone) {
        this.unloadedRef.SetContents(this.loadedRef['contentReferences']);
        this.unloadedRef.GetContents().subscribe(c => {
            expect(c).to.eq(this.loadedRef['contentReferences']);
            done();
        }, err => done)
    }
}
