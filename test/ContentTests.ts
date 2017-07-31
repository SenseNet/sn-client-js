import { Schemas, Security, Enums, ContentTypes, Content, ODataHelper } from '../src/SN';
import * as Chai from 'chai';
import { Observable } from '@reactivex/rxjs';
import { MockRepository } from './Mocks';
import { LoginState } from '../src/Authentication/LoginState';
import { isDeferred, isContentOptions, isContentOptionList, isReferenceField, isReferenceListField } from '../src/Content';
import { ContentReferenceField } from '../src/ContentReferences';
const expect = Chai.expect;

const CONTENT_TYPE = 'Task';
const CONTENT_NAME = 'TestTask';
const CONTENT_DUE_TEXT = 'DueText';


describe('Content', () => {
    let content: ContentTypes.Task;
    let contentSaved: ContentTypes.Task;
    let repo: MockRepository;

    beforeEach(() => {
        repo = new MockRepository();
        const options: ContentTypes.ITaskOptions = {
            Id: 1,
            Path: 'Root/Sites',
            DueDate: '2017-06-27T11:11:11Z',
            DueText: CONTENT_DUE_TEXT,
            Name: CONTENT_NAME,
            DisplayName: ''
        };
        content = Content.Create(options, ContentTypes.Task, repo);
        contentSaved = repo.HandleLoadedContent(options, ContentTypes.Task);
        repo.Authentication.stateSubject.next(LoginState.Authenticated);

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

        describe('#isContentOptions ', () => {
            it('should return true if an object Id, Path and Type', () => {
                const isContentOptionsValue = isContentOptions({ Id: 1, Path: 'a/b', Type: 'Task' });
                expect(isContentOptionsValue).to.be.eq(true);
            });
            it('should return false if an object does not have a Type', () => {
                const isContentOptionsValue = isContentOptions({ Id: 1, Path: 'a/b' });
                expect(isContentOptionsValue).to.be.eq(false);
            });
            it('should return false if an object does not have a Path', () => {
                const isContentOptionsValue = isContentOptions({ Id: 1, Type: 'Task' });
                expect(isContentOptionsValue).to.be.eq(false);
            });
            it('should return false if an object does not have an Id', () => {
                const isContentOptionsValue = isContentOptions({ Path: 'a/b', Type: 'Task' });
                expect(isContentOptionsValue).to.be.eq(false);
            });
        });

        describe('#isContentOptionList  ', () => {
            it('should return true if a list contains only values that have an object Id, Path and Type', () => {
                const isContentOptionListValue = isContentOptionList([
                    { Id: 1, Path: 'a/b', Type: 'Task' },
                    { Id: 2, Path: 'a/b/c', Type: 'Task' },
                    { Id: 3, Path: 'a/b/c/d', Type: 'Task' }
                ]);
                expect(isContentOptionListValue).to.be.eq(true);
            });
            it('should return false if an object does not have a length', () => {
                const isContentOptionListValue = isContentOptionList(1 as any);
                expect(isContentOptionListValue).to.be.eq(false);
            });
            it('should return false if an object is not array-like', () => {
                const isContentOptionListValue = isContentOptionList({ Path: 'a/b', Type: 'Task' } as any);
                expect(isContentOptionListValue).to.be.eq(false);
            });
        });


        describe('#isReferenceField', () => {
            it('should return true if a field contains a getValue function and a GetContent function', () => {
                const isReferenceFieldValue = isReferenceField({
                    getValue: () => { },
                    GetContent: () => { }
                });
                expect(isReferenceFieldValue).to.be.eq(true);
            });
            it('should return false if an object does not have a getValue function', () => {
                const isReferenceFieldValue = isReferenceField({
                    GetContent: () => { }
                });
                expect(isReferenceFieldValue).to.be.eq(false);
            });
            it('should return false if an object does not have a GetContent function', () => {
                const isReferenceFieldValue = isReferenceField({
                    getValue: () => { },
                });
                expect(isReferenceFieldValue).to.be.eq(false);
            });
        });

        describe('#isReferenceListField', () => {
            it('should return true if a field contains a getValue function and a GetContents function', () => {
                const isReferenceListFieldValue = isReferenceListField({
                    getValue: () => { },
                    GetContents: () => { }
                });
                expect(isReferenceListFieldValue).to.be.eq(true);
            });
            it('should return false if an object does not have a getValue function', () => {
                const isReferenceListFieldValue = isReferenceListField({
                    GetContents: () => { }
                });
                expect(isReferenceListFieldValue).to.be.eq(false);
            });
            it('should return false if an object does not have a GetContent function', () => {
                const isReferenceListFieldValue = isReferenceListField({
                    getValue: () => { },
                });
                expect(isReferenceListFieldValue).to.be.eq(false);
            });
        });

    });

    describe('#Create()', () => {

        it('should return an object', () => {
            expect(content).to.be.instanceof(Object);
        });
        it('should return an instance of a Content', () => {
            expect(content).to.be.instanceof(Content);
        })
        it('should return an object with the given type and id', () => {
            const type = content.Type;
            expect(type).to.eq(CONTENT_TYPE);
            expect(content.Id).to.eq(1);
        });
        it('should fill the Type field from the constructor name if not provided', () => {
            let newContent = Content.Create({}, Content, repo);
            expect(newContent.Type).to.be.eq('Content');
        });
        it('should have a valid Type field when constructed with new T(options)', () => {
            let newContent = new Content({}, repo);
            expect(newContent.Type).to.be.eq('Content');
        });
        it('shoul respect the type field, if provided from settings', () => {
            let newContent = new Content({}, repo);
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
            expect(contentSaved).to.be.instanceof(Content);
        })
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
            contentSaved.DueText = 'Modified'
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
            }
            repo.httpProviderRef.setResponse({ d: options });
            contentSaved.ReloadFields('Workspace').subscribe(w => {
                contentSaved.Workspace && contentSaved.Workspace.update({
                    Id: 92635,
                    Path: 'Root/MyWorkspace',
                    Type: 'Workspace',
                    Name: 'ExampleWorkspace'
                });
                const changes = contentSaved.GetChanges();
                expect(Object.keys(changes).length).to.be.eq(1);
                expect(changes.Workspace && changes.Workspace).to.be.eq('Root/MyWorkspace');

                done();
            }, err => done)
        });

        it('should return an updated Path list if a reference list has been changed', (done) => {
            const options = contentSaved.GetFields();
            options.Type = 'Task';
            (options.Versions as any) = [];

            repo.httpProviderRef.setResponse({ d: options });
            contentSaved.ReloadFields('Versions').subscribe(w => {
                contentSaved.Versions && contentSaved.Versions.update([options]);
                const changes = contentSaved.GetChanges();
                expect(Object.keys(changes).length).to.be.eq(1);
                expect(changes.Versions && changes.Versions[0]).to.be.eq(options.Path);

                done();
            }, err => done)
        });        
    });

    describe('#IsValid', () => {
        it('should return false if there are missing fields', () => {
            const emptyContent = Content.Create({}, ContentTypes.Task, repo);
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
            repo.Authentication.stateSubject.next(LoginState.Authenticated);
            repo.httpProviderRef.setResponse({});
            repo.Events.OnContentDeleted.subscribe(d => {
                done();
            }, err => done(err))
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });

        it('error should trigger an OnContentDeleteFailed event', (done) => {
            repo.Authentication.stateSubject.next(LoginState.Authenticated);
            repo.httpProviderRef.setError({});
            repo.Events.OnContentDeleteFailed.subscribe(d => {
                done();
            }, err => done(err))
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });

        it('should return an Observable on not saved content', () => {
            const unsavedContent = Content.Create({}, ContentTypes.Task, repo);
            expect(unsavedContent.Delete(false)).to.be.instanceof(Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'aaa',
                    Name: 'bbb'
                }
            })

            contentSaved.Rename('aaa', 'bbb').subscribe(result => {
                expect(result.DisplayName).to.be.eq('aaa');
                expect(result.Name).to.be.eq('bbb');
                done();
            });
        });

        it('should return an Observable object', () => {
            expect(contentSaved.Rename('aaa', 'bbb')).to.be.instanceof(Observable);
        });

        it('should throw an error if no ID provided', () => {
            const newContent = Content.Create({}, ContentTypes.Task, repo);
            expect(() => { newContent.Rename('aaa', 'bbb') }).to.throw()
        });

        it('should throw an error if trying to rename an unsaved content with Id', () => {
            const newContent = Content.Create({ Id: 3 }, ContentTypes.Task, repo);
            expect(() => { newContent.Rename('aaa', 'bbb') }).to.throw()
        });
    });
    describe('#Save()', () => {

        it('should throw an error if trying to update, but not saved in the Repository', () => {
            expect(() => { content.Save({ DisplayName: 'new' }, true) }).to.throw()
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
            const emptyContent = Content.Create({}, ContentTypes.Task, repo);
            expect(() => {
                const obs = emptyContent.Save({ DisplayName: 'new' })
                obs.subscribe(() => {
                    expect(emptyContent.IsOperationInProgress).to.be.eq(false);
                }, e => {

                })
                expect(emptyContent.IsOperationInProgress).to.be.eq(true);
            }).to.throw();
        });


        it('should throw Error if no Id specified and isOperationInProgress should be updated during the operation', () => {
            const savedContent = repo.HandleLoadedContent({ DisplayName: 'Original' }, ContentTypes.Task);
            savedContent.DisplayName = 'Modified';
            expect(() => {
                const obs = savedContent.Save()
                obs.subscribe(() => {
                    expect(savedContent.IsOperationInProgress).to.be.eq(false);
                }, e => {

                })
                expect(savedContent.IsOperationInProgress).to.be.eq(true);
            }).to.throw();

        });

        it('should throw Error is server returns Error, and isOperationInProgress should be set to False', (done) => {
            repo.httpProviderRef.setError({ message: 'serverErrorMessage' });
            let c = repo.HandleLoadedContent({ Id: 1 }, ContentTypes.Task);

            c.Save({ DisplayName: 'new' }).subscribe(resp => {
                done('Error should be thrown here');
            }, err => {
                expect(c.IsOperationInProgress).to.be.eq(false);
                done();
            }, done);
        });

        it('should send a PATCH request if fields are specified and override is false', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new',
                }
            });
            let c = repo.HandleLoadedContent({ Id: 1 }, ContentTypes.Task);

            c.Save({ DisplayName: 'new' }).subscribe(resp => {
                const lastOptions = repo.httpProviderRef.lastOptions;
                expect(lastOptions.method).to.be.eq('PATCH');
                expect(c.DisplayName).to.be.eq('new');
                done();
            }, done, done);
        });

        it('should send a PUT request if fields are specified and override is false', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new2',
                }
            })
            contentSaved.Save({ DisplayName: 'new2' }, true).subscribe(resp => {
                const lastOptions = repo.httpProviderRef.lastOptions;
                expect(lastOptions.method).to.be.eq('PUT');
                expect(contentSaved.DisplayName).to.be.eq('new2');
                done();
            });
        });


        it('should send a POST request if triggering Save on an unsaved Content', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    Id: 3,
                    DisplayName: 'new3',
                }
            })
            content.Save().subscribe(resp => {
                const lastOptions = repo.httpProviderRef.lastOptions;
                expect(lastOptions.method).to.be.eq('POST');
                expect(content.DisplayName).to.be.eq('new3');
                done();
            });
        });


        it('should throw error when triggering Save on an unsaved Content without path', () => {
            let c = Content.Create({}, ContentTypes.Task, repo);
            expect(() => { c.Save() }).to.throw();
        });

        it('should return an Observable without request on a non-dirty content', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new3',
                }
            })
            let c = repo.HandleLoadedContent({ DisplayName: 'test' }, ContentTypes.Task);
            c.Save().subscribe(modifiedContent => {
                expect(modifiedContent.DisplayName).to.be.eq('test');
                done();
            })
        });


        it('should send a PATCH request if triggering Save on an already saved Content', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new3',
                }
            })

            contentSaved.DisplayName = 'new3';

            contentSaved.Save().subscribe(resp => {
                const lastOptions = repo.httpProviderRef.lastOptions;
                expect(lastOptions.method).to.be.eq('PATCH');
                expect(contentSaved.DisplayName).to.be.eq('new3');
                done();
            });
        });

        it('should trigger fail if there is no Id field in the response', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new3',
                }
            })
            content.Save().subscribe(() => {
                done('This shouldn\'t happened')
            }, err => {
                expect(err.message).to.be.eq('Error: No content Id in response!')
                done();
            });
        });

        it('should trigger an OnContentCreated event on success', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    Id: 3,
                    DisplayName: 'new3',
                }
            })
            repo.Events.OnContentCreated.subscribe(c => {
                expect(c.Content.Id).to.be.eq(3);
                done();
            });
            content.Save();
        });

        it('should trigger an OnContentCreateFailed event on failure', (done) => {
            repo.httpProviderRef.setError({
                message: ':('
            })
            repo.Events.OnContentCreateFailed.subscribe(c => {
                expect(c.Error.message).to.be.eq(':(');
                done();
            });
            content.Save();
        });

        it('should trigger an OnContentModified event on success after update', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    Id: 3,
                    DisplayName: 'new3',
                }
            })

            repo.Events.OnContentModified.subscribe(c => {
                expect(c.Content.DisplayName).to.be.eq('new3');
                done();
            }, err => done(err));

            contentSaved.DisplayName = 'old';
            contentSaved.Save();
        });

        it('should trigger an OnContentModificationFailed event on failed after update', (done) => {
            repo.httpProviderRef.setError({ message: ':(' })

            repo.Events.OnContentModificationFailed.subscribe(c => {
                expect(c.Error.message).to.be.eq(':(');
                done();
            }, err => done(err));

            contentSaved.DisplayName = 'old';
            contentSaved.Save();
        });


        it('should trigger an OnContentModificationFailed event on failed after update, when using Override', (done) => {
            repo.httpProviderRef.setError({ message: ':(' })

            repo.Events.OnContentModificationFailed.subscribe(c => {
                expect(c.Error.message).to.be.eq(':(');
                done();
            }, err => done(err));

            contentSaved.Save({
                DisplayName: 'other'
            }, true);
        });

    });

    describe('#Upload', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Upload('Root/Example', 'example.txt', true, true, 'binary', 'example text')).to.be.instanceof(Observable);
        });

        it('should throw an error if no Path specified', () => {
            (contentSaved.Path) = undefined;
            expect(() => {contentSaved.Upload('Root/Example', 'example.txt'); }).to.throw('No Path provided!')
        });

    })

    describe('#Actions()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.Actions()).to.be.instanceof(Observable);
        });

        it('should retrieve an Action list', (done) => {
            repo.httpProviderRef.setResponse({
                d: {
                    Actions: [
                        {
                            Name: 'Action1',
                            DisplayName: 'Action One'
                        }
                    ]
                }
            });
            contentSaved.Actions().subscribe(actions => {
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
            repo.httpProviderRef.setResponse({
                d: {
                    __count: 1,
                    results: [
                        { Name: 'MyCustomType1' }
                    ]
                }
            });
            contentSaved.GetAllowedChildTypes().subscribe(resp => {
                expect(resp[0].Name).to.be.eq('MyCustomType1');
                done();
            })
        });
        it('should return an Observable object', () => {
            expect(content.GetAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
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
            expect(content.GetOwner()).to.be.instanceof(Observable);
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', () => {
            expect(content.GetOwner({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', () => {
            expect(content.Creator()).to.be.instanceof(Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', () => {
            expect(content.Creator({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', () => {
            expect(content.Modifier()).to.be.instanceof(Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', () => {
            expect(content.Modifier({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', () => {
            expect(content.CheckedOutBy()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', () => {
            expect(content.CheckedOutBy({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', () => {
            expect(content.Children()).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.Children({ select: ['Name'] })).to.be.instanceof(Observable);
        });

        it('should throw error if no path provided', () => {
            const contentWithoutPath = repo.HandleLoadedContent({}, ContentTypes.Task);
            expect(() => { contentWithoutPath.Children() }).to.throw();
        });

        it('should be resolved with a list of content', (done) => {

            repo.httpProviderRef.setResponse({
                d:
                {
                    results: [
                        {
                            Name: 'Content'
                        }
                    ]
                }
            })

            content.Children().subscribe(children => {
                expect(children[0]).to.be.instanceof(Content);
                done();
            }, done)
        });


    });
    describe('#Versions()', () => {
        it('should return an Observable object', () => {
            expect(content.GetVersions()).to.be.instanceof(Observable);
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', () => {
            expect(content.GetVersions({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', () => {
            expect(content.GetWorkspace()).to.be.instanceof(Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', () => {
            expect(content.GetWorkspace({ select: ['Name'] })).to.be.instanceof(Observable);
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
            const targetPath = ODataHelper.joinPaths(contentSaved.Path || '', 'test', 'test2');
            expect(() => contentSaved.MoveTo(targetPath)).to.throw('Content cannot be moved below itself');
        });

        it('should trigger OnContentMoved and update Pathes', (done) => {
            const originalPath = contentSaved.Path;
            const toPath = 'workspaces/document';
            const newPath = ODataHelper.joinPaths(toPath, contentSaved.Name || '');

            repo.httpProviderRef.setResponse({});
            repo.Events.OnContentMoved.subscribe(move => {
                expect(move.From).to.be.eq(originalPath);
                expect(move.To).to.be.eq(toPath);

                expect(move.Content.Path).to.be.eq(newPath);
                expect(move.Content.SavedFields.Path).to.be.eq(newPath);
                done();
            }, err => done(err));
            contentSaved.MoveTo(toPath);
        });

        it('should trigger OnContentMoveFailed and keep Pathes', (done) => {
            const originalPath = contentSaved.Path;
            const toPath = 'workspaces/document';

            repo.httpProviderRef.setError({ message: ':(' });
            repo.Events.OnContentMoveFailed.subscribe(move => {
                expect(move.Error.message).to.be.eq(':(');
                expect(move.From).to.be.eq(originalPath);
                expect(move.To).to.be.eq(toPath);

                expect(move.Content.Path).to.be.eq(originalPath);
                expect(move.Content.SavedFields.Path).to.be.eq(originalPath);
                done();
            }, err => done(err));
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
        it('should return a ContentType object', () => {
            expect(Content.HandleLoadedContent(ContentTypes.Task, { Id: 1, Path: 'a/b' }, repo)).to.be.instanceof(ContentTypes.Task);
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
            expect(() => { content.Reload('view') }).to.throw('Content has to be saved to reload')
        });

        it('should throw Error when no Id provided', () => {
            const invalidContent = repo.HandleLoadedContent({ Name: 'test' }, ContentTypes.Task);
            expect(() => { invalidContent.Reload('view') }).to.throw('Content Id or Path has to be provided')
        });
    });

    describe('#ReloadFields()', () => {
        it('should return an Observable object', () => {
            expect(contentSaved.ReloadFields('Name')).to.be.instanceof(Observable);
        });

        it('should throw Error when called on a non-saved Content', () => {
            expect(() => { content.ReloadFields('Name') }).to.throw('Content has to be saved to reload')
        });

        it('should throw Error when no Id provided', () => {
            const invalidContent = repo.HandleLoadedContent({ Name: 'Test' }, ContentTypes.Task);
            expect(() => { invalidContent.ReloadFields('Name') }).to.throw('Content Id or Path has to be provided')
        });

        it('should throw Error when no Id provided', (done) => {
            repo.Authentication.stateSubject.next(LoginState.Authenticated);
            const options = contentSaved.GetFields();

            (options.Workspace as any) = {
                Id: 123,
                DisplayName: 'aaa',
                Name: 'bbb',
                Path: 'Root/Workspace',
                Type: 'Workspace'
            }
            repo.httpProviderRef.setResponse({ d: options })
            contentSaved.ReloadFields('Workspace').subscribe(c => {
                expect(contentSaved.Workspace).to.be.instanceof(ContentReferenceField);
                contentSaved.Workspace && contentSaved.Workspace.GetContent().subscribe(c => {
                    expect(c.DisplayName).to.be.eq('aaa')
                    done();
                }, done)
            }, done)
        });

    });


    describe('#SetPermissions()', () => {
        it('should return an Observable object', () => {
            expect(typeof content.SetPermissions([
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', OpenMinor: Security.PermissionValues.allow, Save: Security.PermissionValues.deny },
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', Custom01: Security.PermissionValues.allow, Custom14: Security.PermissionValues.deny },
            ])).to.eq('object');
        });

        it('should return an Observable object', () => {
            content.Path = '/workspace/project';
            expect(content.SetPermissions(Security.Inheritance.break)).to.be.instanceof(Observable);
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
            const usr = repo.HandleLoadedContent({ Path: 'Root/Users/alba' }, ContentTypes.User);
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
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', '', Enums.QueryType.Public)).to.be.instanceof(Observable);
        });

        it('should return an Observable object', () => {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', 'my own query', Enums.QueryType.Public)).to.be.instanceof(Observable);
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
            expect(content.GetRelatedIdentities(Security.PermissionLevel.AllowedOrDenied, Security.IdentityKind.Groups)).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedPermissions()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedPermissions(Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne')).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedItems()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedItems(Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne', ['RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedIdentitiesByPermissions()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedIdentitiesByPermissions(Security.PermissionLevel.AllowedOrDenied, Security.IdentityKind.Groups, ['Open', 'RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedItemsOneLevel()', () => {
        it('should return an Observable object', () => {
            expect(content.GetRelatedItemsOneLevel(Security.PermissionLevel.AllowedOrDenied, '/Root/IMS/BuiltIn/Portal/Visitor', ['Open', 'RunApplication'])).to.be.instanceof(Observable);
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
            expect(content.GetSchema()).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Task', () => {
            const schema = content.GetSchema();
            expect(schema.Icon).to.eq('FormItem');
        });
        it('should return GenericContent Schema if no Schema found', () => {
            class ContentWithoutSchema extends Content { };
            const contentInstance = Content.Create({}, ContentWithoutSchema, repo);
            const genericSchema = Content.GetSchema(ContentTypes.GenericContent);
            expect(contentInstance.GetSchema()).to.be.eq(genericSchema)
        });


    });
    describe('#static GetSchema()', () => {
        it('should return a Schema object', () => {
            expect(Content.GetSchema(ContentTypes.Task)).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Schema object', () => {
            let schema = Content.GetSchema(ContentTypes.Task)
            expect(schema.Icon).to.eq('FormItem');
        });
    });
    describe('#Schema()', () => {
        it('should return a Schema object', () => {
            expect(content.GetSchema()).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Schema object', () => {
            let schema = content.GetSchema()
            expect(schema.Icon).to.eq('FormItem');
        });
    });

    describe('#ParentPath', () => {
        it('should throw Error if no Path is provided', () => {
            const contentWithoutPath = repo.HandleLoadedContent({});
            expect(() => { return contentWithoutPath.ParentPath; }).to.throw();
        });
        it('should throw Error if a Content is not saved', () => {
            expect(() => { return content.ParentPath; }).to.throw();
        });
        it('should return a Path without a last segment', () => {
            expect(contentSaved.ParentPath).to.eq('Root');
        });
    });

    describe('#IsParentOf', () => {

        const repo = new MockRepository();

        const rootContent = repo.HandleLoadedContent({ Path: 'Root', Id: 3 });
        const childContent = repo.HandleLoadedContent({ Path: 'Root/Child' });
        const childContentById = repo.HandleLoadedContent({ ParentId: 3 });
        const notChildContent = repo.HandleLoadedContent({ Path: 'NotRoot/Child' });

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
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child' });
            expect(rootContent.IsParentOf(otherChild)).to.be.eq(false);
        });
    });


    describe('#IsChildOf', () => {

        const repo = new MockRepository();

        const rootContent = repo.HandleLoadedContent({ Path: 'Root', Id: 3 });
        const childContent = repo.HandleLoadedContent({ Path: 'Root/Child' });
        const childContentById = repo.HandleLoadedContent({ ParentId: 3 });
        const notChildContent = repo.HandleLoadedContent({ Path: 'NotRoot/Child' });

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
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child' });
            expect(otherChild.IsChildOf(rootContent)).to.be.eq(false);
        });
    });


    describe('#IsAncestorOf', () => {

        const repo = new MockRepository();

        const ancestor = repo.HandleLoadedContent({ Path: 'Root' });
        const descendant = repo.HandleLoadedContent({ Path: 'Root/test/test2/Child' });
        const notDescendant = repo.HandleLoadedContent({ Path: 'Root2/Child' });

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
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child' });
            expect(ancestor.IsAncestorOf(otherChild)).to.be.eq(false);
        });
        it('should throw an error if no ancestor path provided', () => {
            const ancestorWithoutPath = repo.HandleLoadedContent({});
            expect(() => { return ancestorWithoutPath.IsAncestorOf(descendant) }).to.throw();
        });
        it('should throw an error if no descendant path provided', () => {
            const descendantWithoutPath = repo.HandleLoadedContent({});
            expect(() => { return ancestor.IsAncestorOf(descendantWithoutPath) }).to.throw();
        });
    });


    describe('#IsDescendantOf', () => {

        const repo = new MockRepository();

        const ancestor = repo.HandleLoadedContent({ Path: 'Root' });
        const descendant = repo.HandleLoadedContent({ Path: 'Root/test/test2/Child' });
        const notAncestor = repo.HandleLoadedContent({ Path: 'Root2' });

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
            const otherChild = new MockRepository().HandleLoadedContent({ Path: 'Root/Child' });
            expect(ancestor.IsDescendantOf(otherChild)).to.be.eq(false);
        });
        it('should throw an error if no ancestor path provided', () => {
            const ancestorWithoutPath = repo.HandleLoadedContent({});
            expect(() => { return descendant.IsDescendantOf(ancestorWithoutPath) }).to.throw();
        });
        it('should throw an error if no descendant path provided', () => {
            const descendantWithoutPath = repo.HandleLoadedContent({});
            expect(() => { return descendantWithoutPath.IsDescendantOf(ancestor) }).to.throw();
        });
    });

    describe('#GetFullPath', () => {
        it('should throw if Content is not saved', () => {
            expect(() => {
                content.GetFullPath();
            }).to.throw('Content has to be saved to get the full Path')
        });

        it('should throw if Content has no Id AND Path', () => {
            const c = repo.HandleLoadedContent({
                Name: 'Test'
            })
            expect(() => {
                c.GetFullPath();
            }).to.throw('Content Id or Path has to be provided to get the full Path')
        });

        it('should return by Id if possible', () => {
            const c = repo.HandleLoadedContent({
                Name: 'Test',
                Id: 1,
                Path: 'Root/Test'
            })
            expect(c.GetFullPath()).to.be.eq('/content(1)');
        });

        
        it('should return by Path if Id is not available possible', () => {
            const c = repo.HandleLoadedContent({
                Name: 'Test',
                Path: 'Root/Test'
            })
            expect(c.GetFullPath()).to.be.eq("Root('Test')");
        });    
    })

});