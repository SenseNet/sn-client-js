"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../src/SN");
const Chai = require("chai");
const rxjs_1 = require("@reactivex/rxjs");
const expect = Chai.expect;
const CONTENT_TYPE = 'Task';
describe('Content', () => {
    let content;
    let repo = new SN_1.SnTestRepository();
    beforeEach(function () {
        content = new SN_1.ContentTypes.Task({
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
            expect(content).to.be.instanceof(SN_1.Content);
        });
        it('should return an object with the given type and id', function () {
            const type = content.Type;
            expect(type).to.eq(CONTENT_TYPE);
            expect(content.Id).to.eq(1);
        });
        it('should fill the Type field from the constructor name if not provided', () => {
            let newContent = SN_1.Content.Create(SN_1.Content, {}, this.repo);
            expect(newContent.Type).to.be.eq('Content');
        });
        it('should have a valid Type field when constructed with new T(options)', () => {
            let newContent = new SN_1.Content({}, this.repo);
            expect(newContent.Type).to.be.eq('Content');
        });
        it('shoul respect the type field, if provided from settings', () => {
            let newContent = new SN_1.Content({}, this.repo);
            newContent.Type = 'Task';
            expect(newContent.Type).to.be.eq('Task');
        });
    });
    describe('#Delete()', () => {
        it('should return an Observable object', function () {
            expect(content.Delete(false)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function () {
            expect(content.Rename('aaa')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Rename()', () => {
        it('should return an Observable object', function () {
            expect(content.Rename('aaa', 'bbb')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Save()', () => {
        it('should return an Observable object', function () {
            expect(content.Save({ DisplayName: 'new' }, true)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Save()', () => {
        it('should return an Observable object', function () {
            expect(content.Save({ DisplayName: 'new' }, false)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(content.Actions()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(content.Actions()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Actions()', () => {
        it('should return an Observable object', function () {
            expect(content.Actions('ListItem')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypes()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetEffectiveAllowedChildTypes()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetEffectiveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.GetEffectiveAllowedChildTypes({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', function () {
            expect(content.GetOwner()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetOwner()', () => {
        it('should return an Observable object', function () {
            expect(content.GetOwner({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', function () {
            expect(content.Creator()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Creator()', () => {
        it('should return an Observable object', function () {
            expect(content.Creator({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', function () {
            expect(content.Modifier()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Modifier()', () => {
        it('should return an Observable object', function () {
            expect(content.Modifier({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckedOutBy()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CheckedOutBy()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckedOutBy({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', function () {
            expect(content.Children()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Children()', () => {
        it('should return an Observable object', function () {
            expect(content.Children({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetVersions()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Versions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetVersions({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', function () {
            expect(content.GetWorkspace()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Workspace()', () => {
        it('should return an Observable object', function () {
            expect(content.GetWorkspace({ select: ['Name'] })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Checkout()', () => {
        it('should return an Observable object', function () {
            expect(content.Checkout()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckIn('comment')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CheckIn()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckIn()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#UndoCheckout()', () => {
        it('should return an Observable object', function () {
            expect(content.UndoCheckout()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#ForceUndoCheckout()', () => {
        it('should return an Observable object', function () {
            expect(content.ForceUndoCheckout()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Approve()', () => {
        it('should return an Observable object', function () {
            expect(content.Approve()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', function () {
            expect(content.Reject('test')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Reject()', () => {
        it('should return an Observable object', function () {
            expect(content.Reject()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Publish()', () => {
        it('should return an Observable object', function () {
            expect(content.Publish()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', function () {
            expect(content.RestoreVersion('V1.3')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RestoreVersion()', () => {
        it('should return an Observable object', function () {
            expect(content.RestoreVersion('V.A.1.0')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', function () {
            expect(content.Restore('/workspaces/document', false)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Restore()', () => {
        it('should return an Observable object', function () {
            expect(content.Restore()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#MoveTo()', () => {
        it('should return an Observable object', function () {
            expect(content.MoveTo('/workspaces/document')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CopyTo()', () => {
        it('should return an Observable object', function () {
            expect(content.CopyTo('/workspaces/document')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#AddAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.AddAllowedChildTypes(['Folder'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RemoveAllowedChildTypes()', () => {
        it('should return an Observable object', function () {
            expect(content.RemoveAllowedChildTypes(['Folder'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(repo.Load('/workspace/project')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(repo.Load(111)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Load()', () => {
        it('should return an Observable object', function () {
            expect(repo.Load(111, { select: 'DisplayName' })).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#SetPermissions()', () => {
        it('should return an Observable object', function () {
            expect(typeof content.SetPermissions([
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', OpenMinor: SN_1.Security.PermissionValues.allow, Save: SN_1.Security.PermissionValues.deny },
                { identity: '/Root/IMS/BuiltIn/Portal/Visitor', Custom01: SN_1.Security.PermissionValues.allow, Custom14: SN_1.Security.PermissionValues.deny },
            ])).to.eq('object');
        });
    });
    describe('#SetPermissions()', () => {
        it('should return an Observable object', function () {
            content.Path = '/workspace/project';
            expect(content.SetPermissions(SN_1.Security.Inheritance.break)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPermission('/Root/IMS/BuiltIn/Portal/Visitor')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPermission()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', function () {
            expect(content.GetQueries(false)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetQueries()', () => {
        it('should return an Observable object', function () {
            expect(content.GetQueries()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Finalize()', () => {
        it('should return an Observable object', function () {
            expect(content.Finalize()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeLockOver(123)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#TakeLockOver()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeLockOver()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndex(false, 1)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndex()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RebuildIndex()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndex(true)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RefreshIndexSubtree()', () => {
        it('should return an Observable object', function () {
            expect(content.RefreshIndexSubtree()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RebuildIndexSubtree()', () => {
        it('should return an Observable object', function () {
            expect(content.RebuildIndexSubtree()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckPreviews()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#CheckPreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.CheckPreviews(true)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.RegeneratePreviews()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.HasPermission(['AddNew', 'Save'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#HasPermission()', () => {
        it('should return an Observable object', function () {
            expect(content.HasPermission(['AddNew', 'Save'], 'alba')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeOwnership('/Root/IMS/BuiltIn/Portal/Admin')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#TakeOwnership()', () => {
        it('should return an Observable object', function () {
            expect(content.TakeOwnership()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', function () {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', '', SN_1.Enums.QueryType.Public)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#SaveQuery()', () => {
        it('should return an Observable object', function () {
            expect(content.SaveQuery('%2BTypeIs:WebContentDemo %2BInTree:/Root', 'my own query', SN_1.Enums.QueryType.Public)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RegeneratePreviews()', () => {
        it('should return an Observable object', function () {
            expect(content.RegeneratePreviews()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetPageCount()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPageCount()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#PreviewAvailable()', () => {
        it('should return an Observable object', function () {
            expect(content.PreviewAvailable(1)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetPreviewImagesForOData()', () => {
        it('should return an Observable object', function () {
            expect(content.GetPreviewImagesForOData()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetExistingPreviewImagesForOData()', () => {
        it('should return an Observable object', function () {
            expect(content.GetExistingPreviewImagesForOData()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetAllowedChildTypesFromCTD()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedChildTypesFromCTD()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetRelatedIdentities()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedIdentities(SN_1.Security.PermissionLevel.AllowedOrDenied, SN_1.Security.IdentityKind.Groups)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetRelatedPermissions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedPermissions(SN_1.Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne', null)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetRelatedItems()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedItems(SN_1.Security.PermissionLevel.AllowedOrDenied, true, '/Root/IMS/BuiltIn/Portal/EveryOne', ['RunApplication'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetRelatedIdentitiesByPermissions()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedIdentitiesByPermissions(SN_1.Security.PermissionLevel.AllowedOrDenied, SN_1.Security.IdentityKind.Groups, ['Open', 'RunApplication'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetRelatedItemsOneLevel()', () => {
        it('should return an Observable object', function () {
            expect(content.GetRelatedItemsOneLevel(SN_1.Security.PermissionLevel.AllowedOrDenied, '/Root/IMS/BuiltIn/Portal/Visitor', ['Open', 'RunApplication'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetAllowedUsers()', () => {
        it('should return an Observable object', function () {
            expect(content.GetAllowedUsers(['Open'])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetParentGroups()', () => {
        it('should return an Observable object', function () {
            expect(content.GetParentGroups(false)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#AddMembers()', () => {
        it('should return an Observable object', function () {
            expect(content.AddMembers([11, 22])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#RemoveMembers()', () => {
        it('should return an Observable object', function () {
            expect(content.RemoveMembers([11, 22])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(content.GetSchema()).to.be.instanceof(SN_1.Schemas.Schema);
        });
        it('should return a Task', function () {
            const schema = content.GetSchema();
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
    describe('#static GetSchema()', () => {
        it('should return a Schema object', function () {
            expect(SN_1.Content.GetSchema(CONTENT_TYPE)).to.be.instanceof(SN_1.Schemas.Schema);
        });
        it('should return a Schema object', function () {
            let schema = SN_1.Content.GetSchema(CONTENT_TYPE);
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
    describe('#Schema()', () => {
        it('should return a Schema object', function () {
            expect(content.Schema()).to.be.instanceof(SN_1.Schemas.Schema);
        });
        it('should return a Schema object', function () {
            let schema = content.Schema();
            expect(schema['Icon']).to.eq('FormItem');
        });
    });
});
//# sourceMappingURL=ContentTests.js.map