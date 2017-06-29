import { Schemas, Security, Enums, ContentTypes, HttpProviders, Content } from '../src/SN';
import * as Chai from 'chai';
import { Observable } from '@reactivex/rxjs';
import { MockHttpProvider, MockRepository, MockAuthService } from './Mocks';
import { ODataCollectionResponse } from '../src/ODataApi/ODataCollectionResponse';
import { LoginState } from '../src/Authentication/LoginState';
import { BaseRepository } from '../src/Repository/BaseRepository';
const expect = Chai.expect;

const CONTENT_TYPE = 'Task';
const CONTENT_NAME = 'TestTask';
const CONTENT_DUE_TEXT = 'DueText';


describe('Content', () => {
    let content: ContentTypes.Task;
    let contentSaved: ContentTypes.Task;
    let repo: BaseRepository<MockHttpProvider, Content>;

    beforeEach(function () {
        repo =  new MockRepository();
        const options: ContentTypes.ITaskOptions = {
            Id: 1,
            Path: 'Root/Sites',
            DueDate: '2017-06-27T11:11:11Z',
            DueText: CONTENT_DUE_TEXT,
            Name: CONTENT_NAME,
            DisplayName: ''
        };
        content = Content.Create(ContentTypes.Task, options, repo);
        contentSaved = Content.HandleLoadedContent(ContentTypes.Task, options, repo);
        (repo.Authentication as MockAuthService).stateSubject.next(LoginState.Authenticated);
    });

    describe('#Create()', () => {

        it('should return an object', function () {
            expect(content).to.be.instanceof(Object);
        });
        it('should return an instance of a Content', () => {
            expect(content).to.be.instanceof(Content);
        })
        it('should return an object with the given type and id', function () {
            const type = content.Type;
            expect(type).to.eq(CONTENT_TYPE);
            expect(content.Id).to.eq(1);
        });
        it('should fill the Type field from the constructor name if not provided', () => {
            let newContent = Content.Create(Content, {}, repo);
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
        it('should return an object', function () {
            expect(contentSaved).to.be.instanceof(Object);
        });
        it('should return an instance of a Content', () => {
            expect(contentSaved).to.be.instanceof(Content);
        })
        it('should return an object with the given type and id', function () {
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
        it('should return false if the content is untouched', function () {
            expect(content.IsDirty).to.be.eq(false);
        });
        it('should return true if one or more properties has been changed', function () {
            content.Name = 'Modified DisplayName';
            expect(content.IsDirty).to.be.eq(true);
        });
    });

    describe('#IsValid', () => {
        it('should return false if there are missing fields', function () {
            const emptyContent = Content.Create(ContentTypes.Task, {}, repo);
            expect(emptyContent.IsValid).to.be.eq(false);
        });
        it('should return true all complusory fields are filled', function () {
            expect(content.IsValid).to.be.eq(true);
        });
    });

    describe('#Delete()', () => {
        it('should return an Observable object', function () {
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });

        it('should return an Observable on not saved contents', function () {
            const unsavedContent = Content.Create(ContentTypes.Task, {}, repo);
            expect(unsavedContent.Delete(false)).to.be.instanceof(Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function (done) {
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

        it('should return an Observable object', function () {
            expect(contentSaved.Rename('aaa', 'bbb')).to.be.instanceof(Observable);
        });

        it('should throw an error if no ID provided', function () {
            const newContent = Content.Create(ContentTypes.Task, {}, repo);
            expect(() => { newContent.Rename('aaa', 'bbb') }).to.throw()
        });

        it('should throw an error if trying to rename an unsaved content with Id', function () {
            const newContent = Content.Create(ContentTypes.Task, { Id: 3 }, repo);
            expect(() => { newContent.Rename('aaa', 'bbb') }).to.throw()
        });
    });
    describe('#Save()', () => {

        it('should throw an error if trying to update, but not saved in the Repository', function () {
            expect(() => { content.Save({ DisplayName: 'new' }, true) }).to.throw()
        });

        it('should return an Observable object and isOperationInProgress should be updated during the operation', function () {
            const obs = contentSaved.Save({ DisplayName: 'new' });
            expect(obs).to.be.instanceof(Observable);
            expect(contentSaved.IsOperationInProgress).to.be.eq(true);

            obs.subscribe(() => {
                expect(contentSaved.IsOperationInProgress).to.be.eq(false);
            });

        });

        it('should throw Error if no Id specified and isOperationInProgress should be updated during the operation', function () {
            const emptyContent = Content.Create(ContentTypes.Task, {}, repo);
            expect(() => {
                const obs = emptyContent.Save({ DisplayName: 'new' })
                obs.subscribe(() => {
                    expect(emptyContent.IsOperationInProgress).to.be.eq(false);
                }, e => {

                })
                expect(emptyContent.IsOperationInProgress).to.be.eq(true);
            }).to.throw();
        });
        

        it('should throw Error if no Id specified and isOperationInProgress should be updated during the operation', function () {
            const savedContent = Content.HandleLoadedContent(ContentTypes.Task, {DisplayName: 'Original'}, repo);
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

        it('should throw Error is server returns Error, and isOperationInProgress should be set to False', function (done) {
            repo.httpProviderRef.setError({message: 'serverErrorMessage'});
            let c = Content.HandleLoadedContent(ContentTypes.Task, {Id: 1 }, repo);

            c.Save({ DisplayName: 'new' }).subscribe(resp => {
                done('Error should be thrown here');
            }, err => {
                expect(c.IsOperationInProgress).to.be.false;
                done();
            }, done);
        });        

        it('should send a PATCH request if fields are specified and override is false', function (done) {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new',
                }
            });
            let c = Content.HandleLoadedContent(ContentTypes.Task, {Id: 1 }, repo);

            c.Save({ DisplayName: 'new' }).subscribe(resp => {
                const lastOptions = repo.httpProviderRef.lastOptions;
                expect(lastOptions.method).to.be.eq('PATCH');
                expect(c.DisplayName).to.be.eq('new');
                done();
            }, done, done);
        });

        it('should send a PUT request if fields are specified and override is false', function (done) {
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


        it('should send a POST request if triggering Save on an unsaved Content', function (done) {
            (repo.httpProviderRef as MockHttpProvider).setResponse({
                d: {
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


        it('should throw error when triggering Save on an unsaved Content without path', function () {
            let c = Content.Create(ContentTypes.Task, {}, repo);
            expect(() => {c.Save()}).to.throw();
        });

        it('should return an Observable without request on a non-dirty content', function (done) {
            repo.httpProviderRef.setResponse({
                d: {
                    DisplayName: 'new3',
                }
            })
            let c = Content.HandleLoadedContent(ContentTypes.Task, {DisplayName: 'test'}, repo);
            c.Save().subscribe(modifiedContent => {
                expect(modifiedContent.DisplayName).to.be.eq('test');
                done();
            })
        });  


        it('should send a PATCH request if triggering Save on an already saved Content', function (done) {
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

    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(content.Actions()).to.be.instanceof(Observable);
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(content.Actions()).to.be.instanceof(Observable);
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(content.Actions('ListItem')).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', function (done) {
            repo.httpProviderRef.setResponse({
                d: {
                    __count: 1,
                    results: [
                        { Name: 'MyCustomType1' }
                    ]
                }
            });
            content.GetAllowedChildTypes().subscribe(resp => {
                expect(resp[0].Name).to.be.eq('MyCustomType1');
                done();
            })
        });

        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
        });

        it('should throw an Error if no Id specified', function () {
            const c = Content.Create(ContentTypes.Task, {DisplayName: 'a'}, repo);
            expect(() => {c.GetAllowedChildTypes({ select: ['Name'] })}).to.throw();
        });


    });
    describe('#GetEffectiveAllowedChildTypes()', () => {

        it('should return an Observable object', function () {
            expect(content.GetEffectiveAllowedChildTypes()).to.be.instanceof(Observable);
        });

        it('should return an Observable object', function () {
            expect(content.GetEffectiveAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
        });

        it('should throw an error if not Id provided', function () {
            const emptyContent = Content.Create(ContentTypes.Task, {}, repo);
            expect(() => { emptyContent.GetEffectiveAllowedChildTypes({ select: ['Name'] }) }).to.throw();
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', function () {
            expect(content.GetOwner()).to.be.instanceof(Observable);
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', function () {
            expect(content.GetOwner({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', function () {
            expect(content.Creator()).to.be.instanceof(Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', function () {
            expect(content.Creator({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', function () {
            expect(content.Modifier()).to.be.instanceof(Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', function () {
            expect(content.Modifier({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckedOutBy()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckedOutBy({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', function () {
            expect(content.Children()).to.be.instanceof(Observable);
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', function () {
            expect(content.Children({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetVersions()).to.be.instanceof(Observable);
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetVersions({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', function () {
            expect(content.GetWorkspace()).to.be.instanceof(Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', function () {
            expect(content.GetWorkspace({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#Checkout()', () => {
        it('should return an Observable object', function () {
            expect(content.Checkout()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckIn('comment')).to.be.instanceof(Observable);
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckIn()).to.be.instanceof(Observable);
        });
    });
    describe('#UndoCheckout()', () => {
        it('should return an Observable object', function () {
            expect(content.UndoCheckout()).to.be.instanceof(Observable);
        });
    });
    describe('#ForceUndoCheckout()', () => {
        it('should return an Observable object', function () {
            expect(content.ForceUndoCheckout()).to.be.instanceof(Observable);
        });
    });
    describe('#Approve()', () => {
        it('should return an Observable object', function () {
            expect(content.Approve()).to.be.instanceof(Observable);
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', function () {
            expect(content.Reject('test')).to.be.instanceof(Observable);
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', function () {
            expect(content.Reject()).to.be.instanceof(Observable);
        });
    });
    describe('#Publish()', () => {
        it('should return an Observable object', function () {
            expect(content.Publish()).to.be.instanceof(Observable);
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', function () {
            expect(content.RestoreVersion('V1.3')).to.be.instanceof(Observable);
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', function () {
            expect(content.RestoreVersion('V.A.1.0')).to.be.instanceof(Observable);
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', function () {
            expect(content.Restore('/workspaces/document', false)).to.be.instanceof(Observable);
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', function () {
            expect(content.Restore()).to.be.instanceof(Observable);
        });
    });
    describe('#MoveTo()', () => {
        it('should return an Observable object', function () {
            expect(content.MoveTo('/workspaces/document')).to.be.instanceof(Observable);
        });
    });
    describe('#CopyTo()', () => {
        it('should return an Observable object', function () {
            expect(content.CopyTo('/workspaces/document')).to.be.instanceof(Observable);
        });
    });
    describe('#AddAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.AddAllowedChildTypes(['Folder'])).to.be.instanceof(Observable);
        });
    });
    describe('#RemoveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.RemoveAllowedChildTypes(['Folder'])).to.be.instanceof(Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(repo.Load('/workspace/project')).to.be.instanceof(Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(repo.Load(111)).to.be.instanceof(Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(repo.Load(111, { select: 'DisplayName' })).to.be.instanceof(Observable);
        });
    });
    describe('#SetPermissions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.SetPermissions([
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', OpenMinor: Security.PermissionValues.allow, Save: Security.PermissionValues.deny },
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', Custom01: Security.PermissionValues.allow, Custom14: Security.PermissionValues.deny },
            ])).to.eq('object');
        });
    });
    describe('#SetPermissions()', () => {
        it('should return an Observable object', function () {
            content.Path = '/workspace/project';
            expect(content.SetPermissions(Security.Inheritance.break)).to.be.instanceof(Observable);
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPermission('/Root/IMS/BuiltIn/Portal/Visitor')).to.be.instanceof(Observable);
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPermission()).to.be.instanceof(Observable);
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', function () {
            expect(content.GetQueries(false)).to.be.instanceof(Observable);
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', function () {
            expect(content.GetQueries()).to.be.instanceof(Observable);
        });
    });
    describe('#Finalize()', () => {
        it('should return an Observable object', function () {
            expect(content.Finalize()).to.be.instanceof(Observable);
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeLockOver(123)).to.be.instanceof(Observable);
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeLockOver()).to.be.instanceof(Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndex(false, 1)).to.be.instanceof(Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndex()).to.be.instanceof(Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndex(true)).to.be.instanceof(Observable);
        });
    });
    describe('#RefreshIndexSubtree()', () => {
        it('should return an Observable object', function () {
            expect(content.RefreshIndexSubtree()).to.be.instanceof(Observable);
        });
    });
    describe('#RebuildIndexSubtree()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndexSubtree()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckPreviews()).to.be.instanceof(Observable);
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckPreviews(true)).to.be.instanceof(Observable);
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.RegeneratePreviews()).to.be.instanceof(Observable);
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.HasPermission(['AddNew', 'Save'])).to.be.instanceof(Observable);
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.HasPermission(['AddNew', 'Save'], 'alba')).to.be.instanceof(Observable);
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeOwnership('/Root/IMS/BuiltIn/Portal/Admin')).to.be.instanceof(Observable);
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeOwnership()).to.be.instanceof(Observable);
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', function () {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', '', Enums.QueryType.Public)).to.be.instanceof(Observable);
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', function () {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', 'my own query', Enums.QueryType.Public)).to.be.instanceof(Observable);
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.RegeneratePreviews()).to.be.instanceof(Observable);
        });
    });
    describe('#GetPageCount()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPageCount()).to.be.instanceof(Observable);
        });
    });
    describe('#PreviewAvailable()', () => {
        it('should return an Observable object', function () {
            expect(content.PreviewAvailable(1)).to.be.instanceof(Observable);
        });
    });
    describe('#GetPreviewImagesForOData()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPreviewImagesForOData()).to.be.instanceof(Observable);
        });
    });
    describe('#GetExistingPreviewImagesForOData()', () => {
        it('should return an Observable object', function () {
            expect(content.GetExistingPreviewImagesForOData()).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedChildTypesFromCTD()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypesFromCTD()).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedIdentities()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedIdentities(Security.PermissionLevel.AllowedOrDenied, Security.IdentityKind.Groups)).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedPermissions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedPermissions(Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne')).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedItems()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedItems(Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne', ['RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedIdentitiesByPermissions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedIdentitiesByPermissions(Security.PermissionLevel.AllowedOrDenied, Security.IdentityKind.Groups, ['Open', 'RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetRelatedItemsOneLevel()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedItemsOneLevel(Security.PermissionLevel.AllowedOrDenied, '/Root/IMS/BuiltIn/Portal/Visitor', ['Open', 'RunApplication'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedUsers()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedUsers(['Open'])).to.be.instanceof(Observable);
        });
    });
    describe('#GetParentGroups()', () => {
        it('should return an Observable object', function () {
            expect(content.GetParentGroups(false)).to.be.instanceof(Observable);
        });
    });
    describe('#AddMembers()', () => {
        it('should return an Observable object', function () {
            expect(content.AddMembers([11, 22])).to.be.instanceof(Observable);
        });
    });
    describe('#RemoveMembers()', () => {
        it('should return an Observable object', function () {
            expect(content.RemoveMembers([11, 22])).to.be.instanceof(Observable);
        });
    });

    describe('#GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(content.GetSchema()).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Task', function () {
            const schema = content.GetSchema();
            expect(schema.Icon).to.eq('FormItem');
        });
    });
    describe('#static GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(Content.GetSchema(ContentTypes.Task)).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Schema object', function () {
            let schema = Content.GetSchema(ContentTypes.Task)
            expect(schema.Icon).to.eq('FormItem');
        });
    });
    describe('#Schema()', () => {
        it('should return a Schema object', function () {
            expect(content.GetSchema()).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Schema object', function () {
            let schema = content.GetSchema()
            expect(schema.Icon).to.eq('FormItem');
        });
    });
});