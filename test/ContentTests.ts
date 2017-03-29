import { Content } from '../src/Content';
import { Schemas } from '../src/Schemas';
import { ContentTypes } from '../src/ContentTypes';
import * as Chai from 'chai';
const expect = Chai.expect;

const CONTENT_TYPE = 'Task';

describe('Content', () => {
    let content;
    let window = {}
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
        });
    });
    describe('#Create()', () => {
        it('should return an object', function () {
            expect(typeof content).to.eq('object');
        });
        it('should return an object with the given type and id', function () {
            const type = content.Type;
            expect(type).to.eq(CONTENT_TYPE);
            expect(content.Id).to.eq(1);
        });
    });
    describe('#Delete()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Delete(false)).to.eq('object');
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Rename('aaa')).to.eq('object');
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Rename('aaa', 'bbb')).to.eq('object');
        });
    });
    describe('#Save()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Save({ DisplayName: 'new' }, true)).to.eq('object');
        });
    });
    describe('#Save()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Save({ DisplayName: 'new' }, false)).to.eq('object');
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Actions()).to.eq('object');
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Actions()).to.eq('object');
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Actions('ListItem')).to.eq('object');
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetAllowedChildTypes()).to.eq('object');
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetAllowedChildTypes({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetEffectiveAllowedChildTypes()).to.eq('object');
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetEffectiveAllowedChildTypes({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetOwner()).to.eq('object');
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetOwner({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Creator()).to.eq('object');
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Creator({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Modifier()).to.eq('object');
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Modifier({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CheckedOutBy()).to.eq('object');
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CheckedOutBy({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Children()).to.eq('object');
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Children({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetVersions()).to.eq('object');
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetVersions({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetWorkspace()).to.eq('object');
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetWorkspace({ select: ['Name'] })).to.eq('object');
        });
    });
    describe('#Checkout()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Checkout()).to.eq('object');
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CheckIn('comment')).to.eq('object');
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CheckIn()).to.eq('object');
        });
    });
    describe('#UndoCheckout()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.UndoCheckout()).to.eq('object');
        });
    });
    describe('#ForceUndoCheckout()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.ForceUndoCheckout()).to.eq('object');
        });
    });
    describe('#Approve()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Approve()).to.eq('object');
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Reject('test')).to.eq('object');
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Reject()).to.eq('object');
        });
    });
    describe('#Publish()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Publish()).to.eq('object');
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RestoreVersion()).to.eq('object');
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RestoreVersion('V.A.1.0')).to.eq('object');
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Restore('/workspaces/document', 'test3')).to.eq('object');
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Restore()).to.eq('object');
        });
    });
    describe('#MoveTo()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.MoveTo('/workspaces/document')).to.eq('object');
        });
    });
    describe('#MoveTo()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.MoveTo()).to.eq('object');
        });
    });
    describe('#CopyTo()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CopyTo('/workspaces/document')).to.eq('object');
        });
    });
    describe('#CopyTo()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CopyTo()).to.eq('object');
        });
    });
    describe('#AddAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.AddAllowedChildTypes(['Folder'])).to.eq('object');
        });
    });
    describe('#RemoveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RemoveAllowedChildTypes(['Folder'])).to.eq('object');
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(typeof Content.Load('/workspace/project')).to.eq('object');
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(typeof Content.Load(111)).to.eq('object');
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(typeof Content.Load(111, { select: 'DisplayName' })).to.eq('object');
        });
    });
    describe('#SetPermissions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.SetPermissions([{ identity: '/Root/IMS/BuiltIn/Portal/Visitor', OpenMinor: 'allow', Save: 'deny' },
            { identity: '/Root/IMS/BuiltIn/Portal/Creators', Custom16: 'A', Custom17: '1' }])).to.eq('object');
        });
    });
    describe('#SetPermissions()', () => {
        it('should return an Observable object', function () {
            content.Path = '/workspace/project';
            expect(typeof content.SetPermissions('break')).to.eq('object');
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetPermission('/Root/IMS/BuiltIn/Portal/Visitor')).to.eq('object');
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetPermission()).to.eq('object');
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetQueries(false)).to.eq('object');
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetQueries()).to.eq('object');
        });
    });
    describe('#Finalize()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.Finalize()).to.eq('object');
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.TakeLockOver(123)).to.eq('object');
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.TakeLockOver()).to.eq('object');
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RebuildIndex(false, 1)).to.eq('object');
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RebuildIndex()).to.eq('object');
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RebuildIndex(true)).to.eq('object');
        });
    });
    describe('#RefreshIndexSubtree()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RefreshIndexSubtree()).to.eq('object');
        });
    });
    describe('#RebuildIndexSubtree()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RebuildIndexSubtree()).to.eq('object');
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CheckPreviews()).to.eq('object');
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.CheckPreviews(true)).to.eq('object');
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RegeneratePreviews()).to.eq('object');
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.HasPermission('AddNew,Save')).to.eq('object');
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.HasPermission('AddNew,Save', 'alba')).to.eq('object');
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.TakeOwnership('/Root/IMS/BuiltIn/Portal/Admin')).to.eq('object');
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.TakeOwnership()).to.eq('object');
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', '', 'Private')).to.eq('object');
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', 'my own query', 'Private')).to.eq('object');
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RegeneratePreviews()).to.eq('object');
        });
    });
    describe('#GetPageCount()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetPageCount()).to.eq('object');
        });
    });
    describe('#PreviewAvailable()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.PreviewAvailable(1)).to.eq('object');
        });
    });
    describe('#GetPreviewImagesForOData()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetPreviewImagesForOData()).to.eq('object');
        });
    });
    describe('#GetExistingPreviewImagesForOData()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetExistingPreviewImagesForOData()).to.eq('object');
        });
    });
    describe('#GetAllowedChildTypesFromCTD()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetAllowedChildTypesFromCTD()).to.eq('object');
        });
    });
    describe('#GetRelatedIdentities()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetRelatedIdentities('AllowedOrDenied', 'Groups')).to.eq('object');
        });
    });
    describe('#GetRelatedPermissions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetRelatedPermissions('AllowedOrDenied', true, '/Root/IMS/BuiltIn/Portal/EveryOne', null)).to.eq('object');
        });
    });
    describe('#GetRelatedItems()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetRelatedItems('AllowedOrDenied', true, '/Root/IMS/BuiltIn/Portal/EveryOne', ['RunApplication'])).to.eq('object');
        });
    });
    describe('#GetRelatedIdentitiesByPermissions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetRelatedIdentitiesByPermissions('AllowedOrDenied', 'Groups', ['Open', 'RunApplication'])).to.eq('object');
        });
    });
    describe('#GetRelatedItemsOneLevel()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetRelatedItemsOneLevel('AllowedOrDenied', '/Root/IMS/BuiltIn/Portal/Visitor', ['Open', 'RunApplication'])).to.eq('object');
        });
    });
    describe('#GetAllowedUsers()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetAllowedUsers(['Open'])).to.eq('object');
        });
    });
    describe('#GetParentGroups()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.GetParentGroups(false)).to.eq('object');
        });
    });
    describe('#AddMembers()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.AddMembers([11, 22])).to.eq('object');
        });
    });
    describe('#RemoveMembers()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.RemoveMembers([11, 22])).to.eq('object');
        });
    });

    describe('#GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(typeof content.GetSchema()).to.eq('object');
        });
        it('should return a Task', function () {
            const schema = content.GetSchema();
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
    describe('#static GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(typeof Content.GetSchema(CONTENT_TYPE)).to.eq('object');
        });
        it('should return a Schema object', function () {
            let schema = Content.GetSchema(CONTENT_TYPE)
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
    describe('#Schema()', () => {
        it('should return a Schema object', function () {
            expect(typeof content.Schema()).to.eq('object');
        });
        it('should return a Schema object', function () {
            let schema = content.Schema()
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
});