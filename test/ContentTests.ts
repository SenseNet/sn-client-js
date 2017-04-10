import { Content } from '../src/Content';
import { Schemas } from '../src/Schemas';
import { Security } from '../src/Security';
import { Enums } from '../src/Enums';
import { ContentTypes } from '../src/ContentTypes';
import * as Chai from 'chai';
import { Observable } from '@reactivex/rxjs';
import { Repository } from '../src/Repository';
import { Http } from '../src/Http';
const expect = Chai.expect;

const CONTENT_TYPE = 'Task';

describe('Content', () => {
    let content: ContentTypes.Task;
    let window = {}

    let repo = new Repository(Http.RxPromiseHttpProvder);

    beforeEach(function () {
        beforeEach(() => {
            global['window'] = {
                serviceToken: 'OData.svc',
                siteUrl: 'https://daily.demo.sensenet.com'
            }
        });


        content = new ContentTypes.Task({
            Id: 1,
            DueDate: null,
            Name: 'alma'
        }, repo);
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
            let newContent = Content.Create(Content, {}, this.repo);
            expect(newContent.Type).to.be.eq('Content');
        });
        it('should have a valid Type field when constructed with new T(options)', () => {
            let newContent = new Content({}, this.repo);
            expect(newContent.Type).to.be.eq('Content');
        });
        it('shoul respect the type field, if provided from settings', () => {
            let newContent = new Content({}, this.repo);
            newContent.Type = 'Task';
            expect(newContent.Type).to.be.eq('Task');
        })
    });
    describe('#Delete()', () => {
        it('should return an Observable object', function () {
            expect(content.Delete(false)).to.be.instanceof(Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function () {
            expect(content.Rename('aaa')).to.be.instanceof(Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function () {
            expect(content.Rename('aaa', 'bbb')).to.be.instanceof(Observable);
        });
    });
    describe('#Save()', () => {
        it('should return an Observable object', function () {
            expect(content.Save({ DisplayName: 'new' }, true)).to.be.instanceof(Observable);
        });
    });
    describe('#Save()', () => {
        it('should return an Observable object', function () {
            expect(content.Save({ DisplayName: 'new' }, false)).to.be.instanceof(Observable);
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
        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypes()).to.be.instanceof(Observable);
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetEffectiveAllowedChildTypes()).to.be.instanceof(Observable);
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetEffectiveAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(Observable);
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
            expect(this.repo.Load('/workspace/project')).to.be.instanceof(Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(this.repo.Load(111)).to.be.instanceof(Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(this.repo.Load(111, { select: 'DisplayName' })).to.be.instanceof(Observable);
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
            expect(content.GetRelatedPermissions(Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne', null)).to.be.instanceof(Observable);
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
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
    describe('#static GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(Content.GetSchema(CONTENT_TYPE)).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Schema object', function () {
            let schema = Content.GetSchema(CONTENT_TYPE)
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
    describe('#Schema()', () => {
        it('should return a Schema object', function () {
            expect(content.Schema()).to.be.instanceof(Schemas.Schema);
        });
        it('should return a Schema object', function () {
            let schema = content.Schema()
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
});