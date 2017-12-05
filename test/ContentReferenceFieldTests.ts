import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { LoginState } from '../src/Authentication/LoginState';
import { DeferredObject } from '../src/ComplexTypes';
import { ContentInternal } from '../src/Content';
import { ContentReferenceField } from '../src/ContentReferences';
import { Task } from '../src/ContentTypes';
import { ReferenceFieldSetting } from '../src/FieldSettings';
import { FinializedQuery } from '../src/Query/index';
import { MockRepository } from './Mocks/MockRepository';

const expect = Chai.expect;
// tslint:disable:no-string-literal

@suite('ContentReferenceField')
export class ContentReferenceFieldTests {
    private _unloadedRef: ContentReferenceField<Task>;
    private _loadedRef: ContentReferenceField<Task>;

    private _repo: MockRepository;

    private _ownerContent: Task;

    // tslint:disable-next-line:naming-convention
    public before() {
        this._repo = new MockRepository();
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._ownerContent = this._repo.HandleLoadedContent({Id: 123765, Path: 'Root/Tests', Name: 'TestOwnerContent'}, Task);

        this._loadedRef = new ContentReferenceField(this._repo.HandleLoadedContent<Task>({
            Id: 1,
            Path: 'root/a/b',
            Name: 'Name',
            Type: 'Task',
            DueText: 'testDueText'
        }), {} as ReferenceFieldSetting, this._ownerContent,  this._repo);
        this._unloadedRef = new ContentReferenceField({
            __deferred: {
                uri: 'a/b/c'
            }
        } as DeferredObject, {} as ReferenceFieldSetting, this._ownerContent, this._repo);
    }

    @test
    public 'Should be able to construct ContentReferenceField from Deferred without loaded content reference'() {
        expect(this._unloadedRef).to.be.instanceof(ContentReferenceField);

        expect(this._unloadedRef['_contentReference']).to.be.eq(undefined);
    }

    @test
    public 'Should be able to construct ContentReferenceField from IContentOptions with loaded content reference'() {
        expect(this._loadedRef).to.be.instanceof(ContentReferenceField);
        expect(this._loadedRef['_contentReference']).to.be.instanceOf(ContentInternal);
        expect(this._loadedRef['_contentReference'].DueText).to.be.eq('testDueText');
    }

    @test
    public 'Getting unloaded referenced Content should trigger an OData call'(done: MochaDone) {
        this._repo.HttpProviderRef.AddResponse({
            d: {
                Id: 123,
                DisplayName: 'aaa',
                Name: 'bbb',
                Path: 'Root/Workspace',
                Type: 'Workspace'
            }
        });
        this._unloadedRef.GetContent().subscribe((c) => {
            expect(this._unloadedRef['_contentReference']).to.be.eq(c);
            done();
        }, (err) => done);
    }

    @test
    public 'Getting loaded referenced Content should NOT trigger an OData call'(done: MochaDone) {
        this._loadedRef.GetContent().subscribe((c) => {
            expect(this._loadedRef['_contentReference']).to.be.eq(c);
            done();
        }, (err) => done);
    }

    @test
    public 'getValue should return undefined for unloaded reference'() {
        expect(this._unloadedRef.GetValue()).to.be.eq(undefined);
    }

    @test
    public 'getValue should return the loaded Path for a loaded reference'() {
        expect(this._loadedRef.GetValue()).to.be.eq(this._loadedRef['_contentReference'].Path);
    }

    @test
    public 'SetContent should set the reference content'(done: MochaDone) {
        this._unloadedRef.SetContent(this._loadedRef['_contentReference']);
        this._unloadedRef.GetContent().subscribe((c) => {
            expect(c).to.eq(this._loadedRef['_contentReference']);
            done();
        }, (err) => done);
    }

    @test
    public 'Search should return a FinializedQuery instance'() {
        const search = this._unloadedRef.Search('');
        expect(search).to.be.instanceof(FinializedQuery);
    }

    @test
    public 'Search query should contain the term and default parameters'() {
        const search = this._unloadedRef.Search('test-term');
        expect(search.toString()).to.be.eq('_Text:\'*test-term*\' .TOP:10 .SKIP:0');
    }

    @test
    public 'Search query should contain selection roots if available'() {
        this._unloadedRef.FieldSetting.SelectionRoots = ['Root/Example1', 'Root/Example2'];
        const search = this._unloadedRef.Search('test-term');
        expect(search.toString()).to.be.eq('_Text:\'*test-term*\' AND (InTree:"Root/Example1" OR InTree:"Root/Example2") .TOP:10 .SKIP:0');
    }

    @test
    public 'Search query should contain allowed types if available'() {
        this._unloadedRef.FieldSetting.AllowedTypes = ['Task', 'Folder'];
        const search = this._unloadedRef.Search('test-term');
        expect(search.toString()).to.be.eq('_Text:\'*test-term*\' AND (Type:Task OR Type:Folder) .TOP:10 .SKIP:0');
    }

    @test
    public 'Search query should not add type filter if not defined'() {
        this._unloadedRef.FieldSetting.AllowedTypes = [];
        const search = this._unloadedRef.Search('test-term');
        expect(search.toString()).to.be.eq('_Text:\'*test-term*\' .TOP:10 .SKIP:0');
    }
}
