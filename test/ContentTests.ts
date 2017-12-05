import * as Chai from 'chai';
import { Observable } from 'rxjs/Observable';
import { LoginState } from '../src/Authentication/LoginState';
import { MediaResourceObject } from '../src/ComplexTypes';
import { Content, ContentInternal, ISavedContent, isContent, isDeferred, isIContent, isIContentList, SavedContent } from '../src/Content';
import { ContentReferenceField } from '../src/ContentReferences';
import { File as SnFile, GenericContent, Task, User, Workspace } from '../src/ContentTypes';
import { QueryType } from '../src/Enums';
import { joinPaths } from '../src/ODataHelper';
import { isSchema } from '../src/Schemas';
import { IdentityKind, Inheritance, PermissionLevel, PermissionValues } from '../src/Security';
import { MockRepository } from './Mocks';
const expect = Chai.expect;

const CONTENT_TYPE = 'Task';
const CONTENT_NAME = 'TestTask';
const CONTENT_DUE_TEXT = 'DueText';

export const contentTests = describe('Content', () => {
    let content: Content<Task>;
    let contentSaved: SavedContent<Task>;
    let repo: MockRepository;

    beforeEach(() => {
        repo = new MockRepository();
        const options: Task & ISavedContent = {
            Id: 1,
            Path: 'Root/Sites',
            DueDate: '2017-06-27T11:11:11Z',
            DueText: CONTENT_DUE_TEXT,
            Name: CONTENT_NAME,
            DisplayName: '',
            Type: CONTENT_TYPE
        };
        content = repo.CreateContent(options, Task);
        contentSaved = repo.HandleLoadedContent<Task>(options);
        repo.Authentication.StateSubject.next(LoginState.Authenticated);

    });

    describe('#TypeGuards', () => {

        describe('#isDeferred', () => {
            it('should return true if an object has __deferred and _deferred.uri', () => {
                const isDeferredValue = isDeferred({ __deferred: { uri: 'a/b' } });
                expect(isDeferredValue).to.be.eq(true);
            });
            it('should return false if an object has __deferred but does not have _deferred.uri', () => {
                const isDeferredValue = isDeferred({ __deferred: { otherProp: 'a/b' } });
                expect(isDeferredValue).to.be.eq(false);
            });
            it('should return false if an object does not have __deferred property', () => {
                const isDeferredValue = isDeferred({ innerProp: { otherProp: 'a/b' } });
                expect(isDeferredValue).to.be.eq(false);
            });
        });

        describe('#isIContent ', () => {
            it('should return true if an object Id, Path and Type', () => {
                const isContentOptionsValue = isIContent({ Id: 1, Path: 'a/b', Type: 'Task' });
                expect(isContentOptionsValue).to.be.eq(true);
            });
            it('should return false if an object does not have a Type', () => {
                const isContentOptionsValue = isIContent({ Id: 1, Path: 'a/b' });
                expect(isContentOptionsValue).to.be.eq(false);
            });
            it('should return false if an object does not have a Path', () => {
                const isContentOptionsValue = isIContent({ Id: 1, Type: 'Task' });
                expect(isContentOptionsValue).to.be.eq(false);
            });
            it('should return false if an object does not have an Id', () => {
                const isContentOptionsValue = isIContent({ Path: 'a/b', Type: 'Task' });
                expect(isContentOptionsValue).to.be.eq(false);
            });
        });

        describe('#isIContentList  ', () => {
            it('should return true if a list contains only values that have an object Id, Path and Type', () => {
                const isContentOptionListValue = isIContentList([
                    { Id: 1, Path: 'a/b', Type: 'Task' },
                    { Id: 2, Path: 'a/b/c', Type: 'Task' },
                    { Id: 3, Path: 'a/b/c/d', Type: 'Task' }
                ]);
                expect(isContentOptionListValue).to.be.eq(true);
            });
            it('should return false if an object does not have a length', () => {
                const isContentOptionListValue = isIContentList(1 as any);
                expect(isContentOptionListValue).to.be.eq(false);
            });
            it('should return false if an object is not array-like', () => {
                const isContentOptionListValue = isIContentList({ Path: 'a/b', Type: 'Task' } as any);
                expect(isContentOptionListValue).to.be.eq(false);
            });
        });

        describe('#isIContentList  ', () => {
            it('should return false if an object is null or undefined', () => {
                expect(isContent(null)).to.be.eq(false);
            });
            it('should return false if an object Id is null or undefined', () => {
                expect(isContent({Id: null})).to.be.eq(false);
            });
            it('should return false if an object Path is null or undefined', () => {
                expect(isContent({Path: null})).to.be.eq(false);
            });
            it('should return false if an object Type is null or undefined', () => {
                expect(isContent({Type: null})).to.be.eq(false);
            });
            it('should return false if an object Type is zero-legth', () => {
                expect(isContent({Type: ''})).to.be.eq(false);
            });
            it('should return true for Content instances', () => {
                expect(isContent(content)).to.be.eq(true);
            });
        });

        describe('#isSchema  ', () => {
            it('should return false for null / undefined', () => {
                expect(isSchema(null as any)).to.be.eq(false);
            });
            it('should return false for empty objects', () => {
                expect(isSchema({} as any)).to.be.eq(false);
            });
            it('should return false if ContentTypeName is missing', () => {
                expect(isSchema({ContentTypeName: null} as any)).to.be.eq(false);
            });
            it('should return false if FieldSettings are missing', () => {
                expect(isSchema({ContentTypeName: 'Schema'} as any)).to.be.eq(false);
            });
            it('should return false if FieldSettings are not array-like', () => {
                expect(isSchema({ContentTypeName: 'Schema', FieldSettings: 1} as any)).to.be.eq(false);
            });
            it('should return true for valid FieldSettings', () => {
                expect(isSchema({ContentTypeName: 'Schema', FieldSettings: []} as any)).to.be.eq(true);
            });

        });

    });

    describe('#Create()', () => {

        it('should return an object', () => {
            expect(content).to.be.instanceof(Object);
        });
        it('should return an instance of a Content', () => {
            expect(content).to.be.instanceof(ContentInternal);
        });
        it('should return an object with the given type and id', () => {
            const type = content.Type;
            expect(type).to.eq(CONTENT_TYPE);
            expect(content.Id).to.eq(1);
        });
        it('should fill the Type field from the constructor name if not provided', () => {
            const newContent = repo.CreateContent({}, GenericContent);
            expect(newContent.Type).to.be.eq('GenericContent');
        });
        it('should have a valid Type field when constructed with new T(options)', () => {
            const newContent = new ContentInternal({}, repo, Task);
            expect(newContent.Type).to.be.eq('Task');
        });
        it('shoul respect the type field, if provided from settings', () => {
            const newContent = new ContentInternal({Type: 'Task'}, repo, Task);
            newContent.Type = 'Task';
            expect(newContent.Type).to.be.eq('Task');
        });
        it('should have a correct Name', () => {
            expect(content.Name).to.be.eq(CONTENT_NAME);
        });
        it('should have a correct DueText', () => {
            expect(content.DueText).to.be.eq(CONTENT_DUE_TEXT);
        });
        it('should have a correct IsSaved parameter', () => {
            expect(content.IsSaved).to.be.eq(false);
        });
        it('SavedFields should not contain entries', () => {
            expect(Object.keys(content.SavedFields).length).to.be.eq(0);
        });

    });
    describe('#HandleLoadedContent()', () => {
        it('should return an object', () => {
            expect(contentSaved).to.be.instanceof(Object);
        });
        it('should return an instance of a Content', () => {
            expect(contentSaved).to.be.instanceof(ContentInternal);
        });
        it('should return an object with the given type and id', () => {
            const type = content.Type;
            expect(type).to.eq(CONTENT_TYPE);
            expect(contentSaved.Id).to.eq(1);
        });
        it('should have a correct IsSaved parameter', () => {
            expect(contentSaved.IsSaved).to.be.eq(true);
        });

        it('should have a list about Saved fields', () => {
            expect(contentSaved.SavedFields.DueText).to.be.eq(CONTENT_DUE_TEXT);
            contentSaved.DueText = 'Modified';
            expect(contentSaved.SavedFields.DueText).to.be.eq(CONTENT_DUE_TEXT);
        });
    });

    describe('#IsDirty', () => {
        it('should return false if the content is untouched', () => {
            expect(content.IsDirty).to.be.eq(false);
        });
        it('should return true if one or more properties has been changed', () => {
            content.Name = 'Modified DisplayName';
            expect(content.IsDirty).to.be.eq(true);
        });

        it('should skip binary fields', () => {
            const file = repo.HandleLoadedContent({Id: 71253, Path: 'asas', Name: 'Asdasdasd', Binary: null as any}, SnFile);
            file.Binary.SaveBinaryText('alma');
            expect(file.IsDirty).to.be.eq(false);
        });
    });

    describe('#GetChanges', () => {
        it('should return empty if the content is untouched', () => {
            expect(Object.keys(contentSaved.GetChanges()).length).to.be.eq(0);
        });

        it('should return a simple value if a simple property has changed', () => {
            contentSaved.Name = 'Changed';
            const changes = contentSaved.GetChanges();
            expect(Object.keys(changes).length).to.be.eq(1);
            expect(changes.Name).to.be.eq('Changed');
        });

        it('should return an updated Path if a reference has been changed', (done) => {

            const options = contentSaved.GetFields();
            (options.Workspace as any) = {
                Id: 123,
                DisplayName: 'aaa',
                Name: 'bbb',
                Path: 'Root/Workspace',
                Type: 'Workspace'
            };
            repo.HttpProviderRef.AddResponse({ d: options });
            contentSaved.ReloadFields('Workspace').subscribe((w) => {
                contentSaved.Workspace.SetContent(repo.HandleLoadedContent<Workspace>({
                    Id: 92635,
                    Path: 'Root/MyWorkspace',
                    Type: 'Workspace',
                    Name: 'ExampleWorkspace'
                }));
                const changes = contentSaved.GetChanges();
                expect(Object.keys(changes).length).to.be.eq(1);
                expect(changes.Workspace && changes.Workspace).to.be.eq('Root/MyWorkspace');

                done();
            }, (err) => done);
        });

        it('should return an updated Path list if a reference list has been changed', (done) => {
            const options = contentSaved.GetFields();
            options.Type = 'Task';
            (options.Versions as any) = [];

            repo.HttpProviderRef.AddResponse({ d: options });
            contentSaved.ReloadFields('Versions').subscribe((w) => {
                contentSaved.Versions.SetContent([contentSaved]);
                const changes = contentSaved.GetChanges();
                expect(Object.keys(changes).length).to.be.eq(1);
                expect(changes.Versions && (changes.Versions as any)[0]).to.be.eq(options.Path);

                done();
            }, (err) => done);
        });

        it('should return a DownloadUrl for binary fields', () => {
            const file = repo.HandleLoadedContent({
                Binary: {
                    __mediaresource: {
                        media_src: '/binaryhandler.ashx/test'
                    }
                } as MediaResourceObject,
            } as any, SnFile);

            expect(file.GetFields().Binary).to.be.eq('/binaryhandler.ashx/test');
        });
    });

    describe('#IsValid', () => {
        it('should return false if there are missing fields', () => {
            const emptyContent = ContentInternal.Create({}, Task, repo);
            expect(emptyContent.IsValid).to.be.eq(false);
        });
        it('should return true all complusory fields are filled', () => {
            expect(content.IsValid).to.be.eq(true);
        });
    });

    describe('#Delete()', () => {
        it('should return an Observable object', () => {
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });

        it('should trigger an OnContentDeleted event', (done) => {
            repo.Authentication.StateSubject.next(LoginState.Authenticated);
            repo.HttpProviderRef.AddResponse({});
            repo.Events.OnContentDeleted.subscribe((d) => {
                done();
            }, (err) => done(err));
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });

        it('error should trigger an OnContentDeleteFailed event', (done) => {
            repo.Authentication.StateSubject.next(LoginState.Authenticated);
            repo.HttpProviderRef.AddError({});
            repo.Events.OnContentDeleteFailed.subscribe((d) => {
                done();
            }, (err) => done(err));
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });

        it('should return an Observable on not saved content', () => {
            const unsavedContent = ContentInternal.Create({}, Task, repo);
            expect(unsavedContent.Delete(false)).to.be.instanceof(Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    DisplayName: 'aaa',
                    Name: 'bbb'
                }
            });

            contentSaved.Rename('aaa', 'bbb').subscribe((result) => {
                expect(result.DisplayName).to.be.eq('aaa');
                expect(result.Name).to.be.eq('bbb');
                done();
            });
        });

        it('should return an Observable object', () => {
            expect(contentSaved.Rename('aaa', 'bbb')).to.be.instanceof(Observable);
        });

        it('should throw an error if no ID provided', () => {
            const newContent = ContentInternal.Create({}, Task, repo);
            expect(() => { newContent.Rename('aaa', 'bbb'); }).to.throw();
        });

        it('should throw an error if trying to rename an unsaved content with Id', () => {
            const newContent = ContentInternal.Create({ Id: 3 }, Task, repo);
            expect(() => { newContent.Rename('aaa', 'bbb'); }).to.throw();
        });
    });
    describe('#Save()', () => {

        it('should throw an error if trying to update, but not saved in the Repository', () => {
            expect(() => { content.Save({ DisplayName: 'new' }, true); }).to.throw();
        });

        it('should return an Observable object and isOperationInProgress should be updated during the operation', () => {
            const obs = contentSaved.Save({ DisplayName: 'new' });
            expect(obs).to.be.instanceof(Observable);
            expect(contentSaved.IsOperationInProgress).to.be.eq(true);

            obs.subscribe(() => {
                expect(contentSaved.IsOperationInProgress).to.be.eq(false);
            });

        });

        it('should throw Error if no Id specified and isOperationInProgress should be updated during the operation', () => {
            const emptyContent = ContentInternal.Create({}, Task, repo);
            expect(() => {
                const obs = emptyContent.Save({ DisplayName: 'new' });
                obs.subscribe(() => {
                    expect(emptyContent.IsOperationInProgress).to.be.eq(false);
                }, (e) => { /** */ });
                expect(emptyContent.IsOperationInProgress).to.be.eq(true);
            }).to.throw();
        });

        it('should throw Error if no Id specified and isOperationInProgress should be updated during the operation', () => {
            const savedContent = repo.HandleLoadedContent<Task>({ DisplayName: 'Original' } as any);
            savedContent.DisplayName = 'Modified';
            expect(() => {
                const obs = savedContent.Save();
                obs.subscribe(() => {
                    expect(savedContent.IsOperationInProgress).to.be.eq(false);
                }, (e) => { /** */ });
                expect(savedContent.IsOperationInProgress).to.be.eq(true);
            }).to.throw();

        });

        it('should throw Error is server returns Error, and isOperationInProgress should be set to False', (done) => {
            repo.HttpProviderRef.AddError({ message: 'serverErrorMessage' });
            const c = repo.HandleLoadedContent<Task>({ Id: 1, Path: 'Root/Test', Name: 'asd' });

            c.Save({ DisplayName: 'new' }).subscribe((resp) => {
                done('Error should be thrown here');
            }, (err) => {
                expect(c.IsOperationInProgress).to.be.eq(false);
                done();
            }, done);
        });

        it('should throw Error when trying to update specified fields and the Id is not provided', () => {
            repo.HttpProviderRef.AddError({ message: 'serverErrorMessage' });
            const c = repo.CreateContent({Path: 'Root/Test', Name: 'asd' }, Task);

            expect(() => {c.Save({ DisplayName: 'new' }); }).to.throw();
        });

        it('should send a PATCH request if fields are specified and override is false', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    DisplayName: 'new',
                }
            });
            const c = repo.HandleLoadedContent<Task>({ Id: 1, Path: 'Root/Test', Name: 'asd' });

            c.Save({ DisplayName: 'new' }).subscribe((resp) => {
                const lastOptions = repo.HttpProviderRef.LastOptions;
                expect(lastOptions.method).to.be.eq('PATCH');
                expect(c.DisplayName).to.be.eq('new');
                done();
            }, done, done);
        });

        it('should send a PUT request if fields are specified and override is false', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    DisplayName: 'new2',
                }
            });
            contentSaved.Save({ DisplayName: 'new2' }, true).subscribe((resp) => {
                const lastOptions = repo.HttpProviderRef.RequestLog[repo.HttpProviderRef.RequestLog.length - 1].Options;
                expect(lastOptions.method).to.be.eq('PUT');
                expect(contentSaved.DisplayName).to.be.eq('new2');
                done();
            });
        });

        it('should send a POST request if triggering Save on an unsaved Content', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    Id: 3,
                    DisplayName: 'new3',
                }
            });
            content.Save().subscribe((resp) => {
                const lastOptions = repo.HttpProviderRef.RequestLog[repo.HttpProviderRef.RequestLog.length - 1].Options;
                expect(lastOptions.method).to.be.eq('POST');
                expect(content.DisplayName).to.be.eq('new3');
                done();
            });
        });

        it('should throw error when triggering Save on an unsaved Content without path', () => {
            const c = ContentInternal.Create({}, Task, repo);
            expect(() => { c.Save(); }).to.throw();
        });

        it('should return an Observable without request on a non-dirty content', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    DisplayName: 'new3',
                }
            });
            const c = repo.HandleLoadedContent<Task>({ Id: 1, Path: 'Root/Test', Name: 'asd', DisplayName: 'test' });
            c.Save().subscribe((modifiedContent) => {
                expect(modifiedContent.DisplayName).to.be.eq('test');
                done();
            });
        });

        it('should send a PATCH request if triggering Save on an already saved Content', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    DisplayName: 'new3',
                }
            });

            contentSaved.DisplayName = 'new3';

            contentSaved.Save().subscribe((resp) => {
                const lastOptions = repo.HttpProviderRef.RequestLog[repo.HttpProviderRef.RequestLog.length - 1].Options;
                expect(lastOptions.method).to.be.eq('PATCH');
                expect(contentSaved.DisplayName).to.be.eq('new3');
                done();
            });
        });

        it('should trigger fail if there is no Id field in the response', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    DisplayName: 'new3',
                }
            });
            content.Save().subscribe(() => {
                done('This shouldn\'t happened');
            }, (err) => {
                expect(err.message).to.be.eq('Error: No content Id in response!');
                done();
            });
        });

        it('should trigger an OnContentCreated event on success', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    Id: 3,
                    DisplayName: 'new3',
                }
            });
            repo.Events.OnContentCreated.subscribe((c) => {
                expect(c.Content.Id).to.be.eq(3);
                done();
            });
            content.Save();
        });

        it('should trigger an OnContentCreateFailed event on failure', (done) => {
            repo.HttpProviderRef.AddError({
                message: ':('
            });
            repo.Events.OnContentCreateFailed.subscribe((c) => {
                expect(c.Error.message).to.be.eq(':(');
                done();
            });
            content.Save();
        });

        it('should trigger an OnContentModified event on success after update', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    Id: 3,
                    DisplayName: 'new3',
                }
            });

            repo.Events.OnContentModified.subscribe((c) => {
                expect(c.Content.DisplayName).to.be.eq('new3');
                done();
            }, (err) => done(err));

            contentSaved.DisplayName = 'old';
            contentSaved.Save();
        });

        it('should trigger an OnContentModificationFailed event on failed after update', (done) => {
            repo.HttpProviderRef.AddError({ message: ':(' });

            repo.Events.OnContentModificationFailed.subscribe((c) => {
                expect(c.Error.message).to.be.eq(':(');
                done();
            }, (err) => done(err));

            contentSaved.DisplayName = 'old';
            contentSaved.Save();
        });

        it('should trigger an OnContentModificationFailed event on failed after update, when using Override', (done) => {
            repo.HttpProviderRef.AddError({ message: ':(' });

            repo.Events.OnContentModificationFailed.subscribe((c) => {
                expect(c.Error.message).to.be.eq(':(');
                done();
            }, (err) => done(err));

            contentSaved.Save({
                DisplayName: 'other'
            }, true);
        });

    });

    describe('#Actions()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Actions()).to.be.instanceof(Observable);
        });

        it('should retrieve an Action list', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    Actions: [
                        {
                            Name: 'Action1',
                            DisplayName: 'Action One'
                        }
                    ]
                }
            });
            contentSaved.Actions().subscribe((actions) => {
                expect(actions[0].Name).to.be.eq('Action1');
                done();
            }, done);
            expect(contentSaved.Actions()).to.be.instanceof(Observable);
        });

    });
    describe('#Actions()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Actions()).to.be.instanceof(Observable);
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Actions('ListItem')).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', (done) => {
            repo.HttpProviderRef.AddResponse({
                d: {
                    __count: 1,
                    results: [
                        { Name: 'MyCustomType1' }
                    ]
                }
            });
            contentSaved.GetAllowedChildTypes().subscribe((resp) => {
                expect(resp[0].Name).to.be.eq('MyCustomType1');
                done();
            });
        });
        it('should return an Observable object', () => {
            expect(contentSaved.GetAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetEffectiveAllowedChildTypes()).to.be.instanceof(Observable);
        });
        it('should return an Observable object', () => {
            expect(contentSaved.GetEffectiveAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetOwner()).to.be.instanceof(Observable);
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetOwner({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Creator()).to.be.instanceof(Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Creator({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Modifier()).to.be.instanceof(Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Modifier({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.CheckedOutBy()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.CheckedOutBy({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Children()).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(contentSaved.Children({ select: ['Name'] })).to.be.instanceof(Observable);
        });

        it('should throw error if no path provided', () => {
            const contentWithoutPath = repo.HandleLoadedContent<Task>({} as any);
            expect(() => { contentWithoutPath.Children(); }).to.throw();
        });

        it('should be resolved with a list of content', (done) => {

            repo.HttpProviderRef.AddResponse({
                d:
                {
                    results: [
                        {
                            Name: 'Content'
                        }
                    ]
                }
            });

            content.Children().subscribe((children) => {
                expect(children[0]).to.be.instanceof(ContentInternal);
                done();
            }, done);
        });

    });
    describe('#Versions()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetVersions()).to.be.instanceof(Observable);
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetVersions({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetWorkspace()).to.be.instanceof(Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.GetWorkspace({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Checkout()', () => {
        it('should return an Observable object', () => {
            expect(content.Checkout()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', () => {
            expect(content.CheckIn('comment')).to.be.instanceof(Observable);
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', () => {
            expect(content.CheckIn()).to.be.instanceof(Observable);
        });
    });
    describe('#UndoCheckout()', () => {
        it('should return an Observable object', () => {
            expect(content.UndoCheckout()).to.be.instanceof(Observable);
        });
    });
    describe('#ForceUndoCheckout()', () => {
        it('should return an Observable object', () => {
            expect(content.ForceUndoCheckout()).to.be.instanceof(Observable);
        });
    });
    describe('#Approve()', () => {
        it('should return an Observable object', () => {
            expect(content.Approve()).to.be.instanceof(Observable);
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', () => {
            expect(content.Reject('test')).to.be.instanceof(Observable);
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', () => {
            expect(content.Reject()).to.be.instanceof(Observable);
        });
    });
    describe('#Publish()', () => {
        it('should return an Observable object', () => {
            expect(content.Publish()).to.be.instanceof(Observable);
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', () => {
            expect(content.RestoreVersion('V1.3')).to.be.instanceof(Observable);
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', () => {
            expect(content.RestoreVersion('V.A.1.0')).to.be.instanceof(Observable);
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', () => {
            expect(content.Restore('/workspaces/document', false)).to.be.instanceof(Observable);
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', () => {
            expect(content.Restore()).to.be.instanceof(Observable);
        });
    });
    describe('#MoveTo()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.MoveTo('/workspaces/document')).to.be.instanceof(Observable);
        });

        it('should throw Error when the content isn\'t saved', () => {
            expect(() => content.MoveTo('/workspaces/document')).to.throw('Content not saved!');
        });

        it('should throw Error if the Content hasn no Path set', () => {
            contentSaved.Path = '';
            expect(() => contentSaved.MoveTo('/workspaces/document')).to.throw('No Path provided for the content');
        });

        it('should throw Error if the Content hasn no Name set', () => {
            contentSaved.Name = '';
            expect(() => contentSaved.MoveTo('/workspaces/document')).to.throw('No Name provided for the content');
        });
        it('should throw Error if the target Path is below the content Path', () => {
            const targetPath = joinPaths(contentSaved.Path || '', 'test', 'test2');
            expect(() => contentSaved.MoveTo(targetPath)).to.throw('Content cannot be moved below itself');
        });

        it('should trigger OnContentMoved and update Pathes', (done) => {
            const originalPath = contentSaved.Path;
            const toPath = 'workspaces/document';
            const newPath = joinPaths(toPath, contentSaved.Name || '');

            repo.HttpProviderRef.AddResponse({});
            repo.Events.OnContentMoved.subscribe((move) => {
                expect(move.From).to.be.eq(originalPath);
                expect(move.To).to.be.eq(toPath);

                expect(move.Content.Path).to.be.eq(newPath);
                expect(move.Content.SavedFields.Path).to.be.eq(newPath);
                done();
            }, (err) => done(err));
            contentSaved.MoveTo(toPath);
        });

        it('should trigger OnContentMoveFailed and keep Pathes', (done) => {
            const originalPath = contentSaved.Path;
            const toPath = 'workspaces/document';

            repo.HttpProviderRef.AddError({ message: ':(' });
            repo.Events.OnContentMoveFailed.subscribe((move) => {
                expect(move.Error.message).to.be.eq(':(');
                expect(move.From).to.be.eq(originalPath);
                expect(move.To).to.be.eq(toPath);

                expect(move.Content.Path).to.be.eq(originalPath);
                expect(move.Content.SavedFields.Path).to.be.eq(originalPath);
                done();
            }, (err) => done(err));
            contentSaved.MoveTo(toPath);
        });

    });
    describe('#CopyTo()', () => {
        it('should return an Observable object', () => {
            expect(content.CopyTo('/workspaces/document')).to.be.instanceof(Observable);
        });
    });
    describe('#AddAllowedChildTypes()', () => {
        it('should return an Observable object', () => {
            expect(content.AddAllowedChildTypes(['Folder'])).to.be.instanceof(Observable);
        });
    });
    describe('#RemoveAllowedChildTypes()', () => {
        it('should return an Observable object', () => {
            expect(content.RemoveAllowedChildTypes(['Folder'])).to.be.instanceof(Observable);
        });
    });

    describe('#HandleLoadedContent()', () => {
        it('should return a Content object with the specified generic field(s)', () => {
            const loaded = repo.HandleLoadedContent<Task>({ Id: 1, Path: 'a/b', Name: 'a/b', DueText: 'test' });
            expect(loaded).to.be.instanceof(ContentInternal);
            expect(loaded.DueText).to.be.eq('test');
        });
    });

    describe('#Load()', () => {
        it('should return an Observable object', () => {
            expect(repo.Load('/workspace/project')).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(repo.Load(111)).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(repo.Load(111, { select: 'DisplayName' })).to.be.instanceof(Observable);
        });
    });

    describe('#Reload()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Reload('view')).to.be.instanceof(Observable);
        });

        it('should throw Error when called on a non-saved Content', () => {
            expect(() => { content.Reload('view'); }).to.throw('Content has to be saved to reload');
        });

        it('should throw Error when no Id provided', () => {
            const invalidContent = repo.HandleLoadedContent<Task>({ Name: 'test' } as any);
            expect(() => { invalidContent.Reload('view'); }).to.throw('Content Id or Path has to be provided');
        });
    });

    describe('#ReloadFields()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.ReloadFields('Name')).to.be.instanceof(Observable);
        });

        it('should throw Error when called on a non-saved Content', () => {
            expect(() => { content.ReloadFields('Name'); }).to.throw('Content has to be saved to reload');
        });

        it('should throw Error when no Id provided', () => {
            const invalidContent = repo.HandleLoadedContent<Task>({ Name: 'Test' } as any);
            expect(() => { invalidContent.ReloadFields('Name'); }).to.throw('Content Id or Path has to be provided');
        });

        it('should throw Error when no Id provided', (done) => {
            repo.Authentication.StateSubject.next(LoginState.Authenticated);
            const options = contentSaved.GetFields();

            (options.Workspace as any) = {
                Id: 123,
                DisplayName: 'aaa',
                Name: 'bbb',
                Path: 'Root/Workspace',
                Type: 'Workspace'
            };
            repo.HttpProviderRef.AddResponse({ d: options });
            contentSaved.ReloadFields('Workspace').subscribe((c) => {
                expect(contentSaved.Workspace).to.be.instanceof(ContentReferenceField);
                contentSaved.Workspace.GetContent().subscribe((loaded) => {
                    expect(loaded.DisplayName).to.be.eq('aaa');
                    done();
                }, done);
            }, done);
        });

    });

    describe('#SetPermissions()', () => {
        it('should return an Observable object', () => {
            expect(typeof content.SetPermissions([
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', OpenMinor: PermissionValues.allow, Save: PermissionValues.deny },
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', Custom01: PermissionValues.allow, Custom14: PermissionValues.deny },
            ])).to.eq('object');
        });

        it('should return an Observable object', () => {
            content.Path = '/workspace/project';
            expect(content.SetPermissions(Inheritance.break)).to.be.instanceof(Observable);
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', () => {
            expect(content.GetPermission('/Root/IMS/BuiltIn/Portal/Visitor')).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.GetPermission()).to.be.instanceof(Observable);
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', () => {
            expect(content.GetQueries(false)).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.GetQueries()).to.be.instanceof(Observable);
        });
    });
    describe('#Finalize()', () => {
        it('should return an Observable object', () => {
            expect(content.Finalize()).to.be.instanceof(Observable);
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', () => {
            expect(content.TakeLockOver(123)).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.TakeLockOver()).to.be.instanceof(Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', () => {
            expect(content.RebuildIndex(false, 1)).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.RebuildIndex()).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.RebuildIndex(true)).to.be.instanceof(Observable);
        });
    });
    describe('#RefreshIndexSubtree()', () => {
        it('should return an Observable object', () => {
            expect(content.RefreshIndexSubtree()).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.RebuildIndexSubtree()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', () => {
            expect(content.CheckPreviews()).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.CheckPreviews(true)).to.be.instanceof(Observable);
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', () => {
            expect(content.RegeneratePreviews()).to.be.instanceof(Observable);
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.HasPermission(['AddNew', 'Save'])).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            const usr = repo.HandleLoadedContent<User>({ Path: 'Root/Users/alba', Id: 124798, Name: 'Name' });
            expect(contentSaved.HasPermission(['AddNew', 'Save'], usr)).to.be.instanceof(Observable);
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', () => {
            expect(content.TakeOwnership('/Root/IMS/BuiltIn/Portal/Admin')).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.TakeOwnership()).to.be.instanceof(Observable);
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', () => {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', '', QueryType.Public)).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', 'my own query', QueryType.Public)).to.be.instanceof(Observable);
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', () => {
            expect(content.RegeneratePreviews()).to.be.instanceof(Observable);
        });
    });
    describe('#GetPageCount()', () => {
        it('should return an Observable object', () => {
            expect(content.GetPageCount()).to.be.instanceof(Observable);
        });
    });
    describe('#PreviewAvailable()', () => {
        it('should return an Observable object', () => {
            expect(content.PreviewAvailable(1)).to.be.instanceof(Observable);
        });
    });
    describe('#GetPreviewImagesForOData()', () => {
        it('should return an Observable object', () => {
            expect(content.GetPreviewImagesForOData()).to.be.instanceof(Observable);
        });
    });
    describe('#GetExistingPreviewImagesForOData()', () => {
        it('should return an Observable object', () => {
            expect(content.GetExistingPreviewImagesForOData()).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedChildTypesFromCTD()', () => {
        it('should return an Observable object', () => {
            expect(content.GetAllowedChildTypesFromCTD()).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedIdentities()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedIdentities(PermissionLevel.AllowedOrDenied, IdentityKind.Groups)).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedPermissions()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedPermissions(PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne')).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedItems()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedItems(PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne', ['RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedIdentitiesByPermissions()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedIdentitiesByPermissions(PermissionLevel.AllowedOrDenied, IdentityKind.Groups, ['Open', 'RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedItemsOneLevel()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedItemsOneLevel(PermissionLevel.AllowedOrDenied, '/Root/IMS/BuiltIn/Portal/Visitor', ['Open', 'RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedUsers()', () => {
        it('should return an Observable object', () => {
            expect(content.GetAllowedUsers(['Open'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetParentGroups()', () => {
        it('should return an Observable object', () => {
            expect(content.GetParentGroups(false)).to.be.instanceof(Observable);
        });
    });
    describe('#AddMembers()', () => {
        it('should return an Observable object', () => {
            expect(content.AddMembers([11, 22])).to.be.instanceof(Observable);
        });
    });
    describe('#RemoveMembers()', () => {
        it('should return an Observable object', () => {
            expect(content.RemoveMembers([11, 22])).to.be.instanceof(Observable);
        });
    });

    describe('#GetSchema()', () => {
        it('should return a Schema object', () => {
            expect(isSchema(content.GetSchema())).to.be.eq(true);
        });
        it('should return a Task', () => {
            const schema = content.GetSchema();
            expect(schema.Icon).to.eq('FormItem');
        });
        it('should return GenericContent Schema if no Schema found', () => {
            class ContentWithoutSchema extends Task { }
            const contentInstance = ContentInternal.Create({}, ContentWithoutSchema, repo);
            const genericSchema = repo.GetSchema(GenericContent);
            expect(contentInstance.GetSchema()).to.be.deep.eq(genericSchema);
        });

    });

    describe('#ParentPath', () => {
        it('should throw Error if no Path is provided', () => {
            const contentWithoutPath = repo.HandleLoadedContent({} as any);
            expect(() => contentWithoutPath.ParentPath).to.throw();
        });
        it('should throw Error if a Content is not saved', () => {
            expect(() => content.ParentPath).to.throw();
        });
        it('should return a Path without a last segment', () => {
            expect(contentSaved.ParentPath).to.eq('Root');
        });
    });

    describe('#IsParentOf', () => {

        const repository = new MockRepository();

        const rootContent = repository.HandleLoadedContent({ Path: 'Root', Id: 3, Name: 'Test' });
        const childContent = repository.HandleLoadedContent({ Path: 'Root/Child', Id: 976235, Name: 'Test' });
        const childContentById = repository.HandleLoadedContent({ ParentId: 3 } as any);
        const notChildContent = repository.HandleLoadedContent({ Path: 'NotRoot/Child', Id: 973256, Name: 'Test' });

        it('should return true if content is a child', () => {
            expect(rootContent.IsParentOf(childContent)).to.be.eq(true);
        });
        it('should return true if content is a child by ParentId', () => {
            expect(rootContent.IsParentOf(childContentById)).to.be.eq(true);
        });

        it('should return false if content is not a child', () => {
            expect(rootContent.IsParentOf(notChildContent)).to.be.eq(false);
        });
        it('should return false if parent is not saved', () => {
            expect(content.IsParentOf(childContent)).to.be.eq(false);
        });
        it('should return false on repository mismatch', () => {
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child', Id: 97256, Name: 'Test' });
            expect(rootContent.IsParentOf(otherChild)).to.be.eq(false);
        });
    });

    describe('#IsChildOf', () => {

        const repository = new MockRepository();

        const rootContent = repository.HandleLoadedContent({ Path: 'Root', Id: 33245, Name: 'Test' });
        const childContent = repository.HandleLoadedContent({ Path: 'Root/Child', Id: 23545, Name: 'Test' });
        const childContentById = repository.HandleLoadedContent({ ParentId: 33245, Id: 23597 } as any);
        const notChildContent = repository.HandleLoadedContent({ Path: 'NotRoot/Child', Id: 235786, Name: 'Test' });

        it('should return true if content is a child', () => {
            expect(childContent.IsChildOf(rootContent)).to.be.eq(true);
        });

        it('should return true if content is a child based on its ParentId', () => {
            expect(childContentById.IsChildOf(rootContent)).to.be.eq(true);
        });

        it('should return false if content is not a child', () => {
            expect(notChildContent.IsChildOf(rootContent)).to.be.eq(false);
        });

        it('should return false if parent is not saved', () => {
            expect(notChildContent.IsChildOf(content)).to.be.eq(false);
        });

        it('should return false on repository mismatch', () => {
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child', Id: 235876, Name: 'Test' });
            expect(otherChild.IsChildOf(rootContent)).to.be.eq(false);
        });
    });

    describe('#IsAncestorOf', () => {

        const repository = new MockRepository();

        const ancestor = repository.HandleLoadedContent({ Path: 'Root', Id: 232345, Name: 'Test' });
        const descendant = repository.HandleLoadedContent({ Path: 'Root/test/test2/Child', Id: 43275, Name: 'Test' });
        const notDescendant = repository.HandleLoadedContent({ Path: 'Root2/Child', Id: 2358967, Name: 'Test' });

        it('should return true if content is an ancestor', () => {
            expect(ancestor.IsAncestorOf(descendant)).to.be.eq(true);
        });
        it('should return false if content is not an ancestor', () => {
            expect(ancestor.IsAncestorOf(notDescendant)).to.be.eq(false);
        });

        it('should return false if parent is not saved', () => {
            expect(content.IsAncestorOf(descendant)).to.be.eq(false);
        });

        it('should return false on repository mismatch', () => {
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child', Id: 4562, Name: 'Test' });
            expect(ancestor.IsAncestorOf(otherChild)).to.be.eq(false);
        });
        it('should throw an error if no ancestor path provided', () => {
            const ancestorWithoutPath = repository.HandleLoadedContent({} as any);
            expect(() => ancestorWithoutPath.IsAncestorOf(descendant)).to.throw();
        });
        it('should throw an error if no descendant path provided', () => {
            const descendantWithoutPath = repository.HandleLoadedContent({} as any);
            expect(() => ancestor.IsAncestorOf(descendantWithoutPath)).to.throw();
        });
    });

    describe('#IsDescendantOf', () => {

        const repository = new MockRepository();

        const ancestor = repository.HandleLoadedContent({ Path: 'Root', Id: 12314, Name: 'Test' });
        const descendant = repository.HandleLoadedContent({ Path: 'Root/test/test2/Child', Id: 212314, Name: 'Test' });
        const notAncestor = repository.HandleLoadedContent({ Path: 'Root2', Id: 124314, Name: 'Test' });

        it('should return true if content is an ancestor', () => {
            expect(descendant.IsDescendantOf(ancestor)).to.be.eq(true);
        });
        it('should return false if content is not an ancestor', () => {
            expect(descendant.IsDescendantOf(notAncestor)).to.be.eq(false);
        });

        it('should return false if parent is not saved', () => {
            expect(content.IsDescendantOf(ancestor)).to.be.eq(false);
        });

        it('should return false on repository mismatch', () => {
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child', Id: 123, Name: 'Test' });
            expect(ancestor.IsDescendantOf(otherChild)).to.be.eq(false);
        });
        it('should throw an error if no ancestor path provided', () => {
            const ancestorWithoutPath = repository.HandleLoadedContent({} as any);
            expect(() => descendant.IsDescendantOf(ancestorWithoutPath)).to.throw();
        });
        it('should throw an error if no descendant path provided', () => {
            const descendantWithoutPath = repository.HandleLoadedContent({} as any);
            expect(() => descendantWithoutPath.IsDescendantOf(ancestor)).to.throw();
        });
    });

    describe('#GetFullPath', () => {
        it('should throw if Content is not saved', () => {
            expect(() => {
                content.GetFullPath();
            }).to.throw('Content has to be saved to get the full Path');
        });

        it('should throw if Content has no Id AND Path', () => {
            const c = repo.HandleLoadedContent({
                Name: 'Test'
            } as any);
            expect(() => {
                c.GetFullPath();
            }).to.throw('Content Id or Path has to be provided to get the full Path');
        });

        it('should return by Id if possible', () => {
            const c = repo.HandleLoadedContent({
                Name: 'Test',
                Id: 1,
                Path: 'Root/Test'
            });
            expect(c.GetFullPath()).to.be.eq('/content(1)');
        });

        it('should return by Path if Id is not available possible', () => {
            const c = repo.HandleLoadedContent({
                Name: 'Test',
                Path: 'Root/Test'
            } as any);
            expect(c.GetFullPath()).to.be.eq("Root('Test')");
        });
    });

});
