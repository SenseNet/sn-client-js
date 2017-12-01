import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { LoginState } from '../src/Authentication/LoginState';
import { DeferredObject } from '../src/ComplexTypes';
import {ContentInternal} from '../src/Content';
import { ContentListReferenceField } from '../src/ContentReferences';
import { Task } from '../src/ContentTypes';
import { ReferenceFieldSetting } from '../src/FieldSettings';
import { MockRepository } from './Mocks/MockRepository';

const expect = Chai.expect;

// tslint:disable:no-string-literal

@suite('ContentListReferenceField')
export class ContentListReferenceFieldTests {
    private _unloadedRef: ContentListReferenceField<Task>;
    private _loadedRef: ContentListReferenceField<Task>;

    private _ownerContent: Task;

    private _repo: MockRepository;
    // tslint:disable-next-line:naming-convention
    public before() {
        this._repo = new MockRepository();
        this._ownerContent = this._repo.HandleLoadedContent({Id: 123765, Path: 'Root/Tests', Name: 'TestOwnerContent'}, Task);
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._loadedRef = new ContentListReferenceField(
            [{
                Id: 1,
                Path: 'root/a/b',
                Name: 'Name',
                Type: 'Task',
                DueText: 'testDueText'
            } as Task], {} as ReferenceFieldSetting, this._ownerContent, this._repo);
        this._unloadedRef = new ContentListReferenceField({
            __deferred: {
                uri: 'a/b/c'
            }
        } as DeferredObject, {} as ReferenceFieldSetting, this._ownerContent, this._repo);
    }

    @test
    public 'Should be able to construct ContentReferenceField from Deferred without loaded content reference'() {
        expect(this._unloadedRef).to.be.instanceof(ContentListReferenceField);
        expect(this._unloadedRef['_contentReferences']).to.be.eq(undefined);
    }

    @test
    public 'Should be able to construct ContentReferenceField from IContentOptions with loaded content reference'() {
        expect(this._loadedRef).to.be.instanceof(ContentListReferenceField);
        expect(this._loadedRef['_contentReferences'][0]).to.be.instanceOf(ContentInternal);
        expect(this._loadedRef['_contentReferences'][0].DueText).to.be.eq('testDueText');
    }

    @test
    public 'Getting unloaded referenced Content should trigger an OData call'(done: MochaDone) {
        this._repo.HttpProviderRef.AddResponse({
            d: {
                results: [{
                    Id: 123,
                    DisplayName: 'aaa',
                    Name: 'bbb',
                    Path: 'Root/Workspace',
                    Type: 'Workspace'
                }]
            }
        });
        this._unloadedRef.GetContent().subscribe((c) => {
            expect(this._unloadedRef['_contentReferences']).to.be.eq(c);
            done();
        }, (err) => done);
    }

    @test
    public 'Getting loaded referenced Content should NOT trigger an OData call'(done: MochaDone) {
        this._loadedRef.GetContent().subscribe((c) => {
            expect(this._loadedRef['_contentReferences']).to.be.eq(c);
            done();
        }, (err) => done);
    }

    @test
    public 'getValue should return undefined for unloaded reference'() {
        expect(this._unloadedRef.GetValue()).to.be.eq(undefined);
    }

    @test
    public 'getValue should return the loaded Path for a loaded reference'() {
        expect(this._loadedRef.GetValue()).to.be.deep.eq(this._loadedRef['_contentReferences'].map((p) => p.Path));
    }

    @test
    public 'SetContent should set the reference content'(done: MochaDone) {
        this._unloadedRef.SetContent(this._loadedRef['_contentReferences']);
        this._unloadedRef.GetContent().subscribe((c) => {
            expect(c).to.eq(this._loadedRef['_contentReferences']);
            done();
        }, (err) => done);
    }
}
