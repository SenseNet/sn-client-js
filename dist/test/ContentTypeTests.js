"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContentTypes_1 = require("../src/ContentTypes");
const Chai = require("chai");
const Repository_1 = require("../src/Repository");
const Http_1 = require("../src/Http");
const expect = Chai.expect;
describe('ContentTypes', () => {
    let repo = new Repository_1.Repository(Http_1.Http.RxPromiseHttpProvder);
    describe('#ContentType', function () {
        const gc = new ContentTypes_1.ContentTypes.ContentType({ Id: 1, Type: 'ContentType', Name: '' }, repo);
        it('should return a ContentType type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentType);
        });
    });
    describe('#GenericContent', function () {
        const gc = new ContentTypes_1.ContentTypes.GenericContent({ Id: 1, Type: 'GenericContent', Name: '' }, repo);
        it('should return a GenericContent type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.GenericContent);
        });
    });
    describe('#Folder', function () {
        const gc = new ContentTypes_1.ContentTypes.Folder({ Id: 1, Type: 'Folder', Name: '' }, repo);
        it('should return a Folder type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Folder);
        });
    });
    describe('#ContentList', function () {
        const gc = new ContentTypes_1.ContentTypes.ContentList({ Id: 1, Type: 'ContentList', Name: '' }, repo);
        it('should return a ContentList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentList);
        });
    });
    describe('#Aspect', function () {
        const gc = new ContentTypes_1.ContentTypes.Aspect({ Id: 1, Type: 'Aspect', Name: '' }, repo);
        it('should return a Aspect type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Aspect);
        });
    });
    describe('#ItemList', function () {
        const gc = new ContentTypes_1.ContentTypes.ItemList({ Id: 1, Type: 'ItemList', Name: '' }, repo);
        it('should return a ItemList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ItemList);
        });
    });
    describe('#CustomList', function () {
        const gc = new ContentTypes_1.ContentTypes.CustomList({ Id: 1, Type: 'CustomList', Name: '' }, repo);
        it('should return a CustomList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.CustomList);
        });
    });
    describe('#MemoList', function () {
        const gc = new ContentTypes_1.ContentTypes.MemoList({ Id: 1, Type: 'MemoList', Name: '' }, repo);
        it('should return a MemoList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.MemoList);
        });
    });
    describe('#TaskList', function () {
        const gc = new ContentTypes_1.ContentTypes.TaskList({ Id: 1, Type: 'TaskList', Name: '' }, repo);
        it('should return a TaskList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.TaskList);
        });
    });
    describe('#Library', function () {
        const gc = new ContentTypes_1.ContentTypes.Library({ Id: 1, Type: 'Library', Name: '' }, repo);
        it('should return a Library type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Library);
        });
    });
    describe('#DocumentLibrary', function () {
        const gc = new ContentTypes_1.ContentTypes.DocumentLibrary({ Id: 1, Type: 'DocumentLibrary', Name: '' }, repo);
        it('should return a DocumentLibrary type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.DocumentLibrary);
        });
    });
    describe('#ImageLibrary', function () {
        const gc = new ContentTypes_1.ContentTypes.ImageLibrary({ Id: 1, Type: 'ImageLibrary', Name: '' }, repo);
        it('should return a ImageLibrary type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ImageLibrary);
        });
    });
    describe('#Workspace', function () {
        const gc = new ContentTypes_1.ContentTypes.Workspace({ Id: 1, Type: 'Workspace', Name: '', IsActive: false }, repo);
        it('should return a Workspace type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Workspace);
        });
    });
    describe('#Site', function () {
        const gc = new ContentTypes_1.ContentTypes.Site({ Id: 1, Type: 'Site', Name: '', IsActive: false }, repo);
        it('should return a Site type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Site);
        });
    });
    describe('#TrashBin', function () {
        const gc = new ContentTypes_1.ContentTypes.TrashBin({ Id: 1, Type: 'TrashBin', Name: '', IsActive: false }, repo);
        it('should return a TrashBin type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.TrashBin);
        });
    });
    describe('#SmartFolder', function () {
        const gc = new ContentTypes_1.ContentTypes.SmartFolder({ Id: 1, Type: 'SmartFolder', Name: '' }, repo);
        it('should return a SmartFolder type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.SmartFolder);
        });
    });
    describe('#Device', function () {
        const gc = new ContentTypes_1.ContentTypes.Device({ Id: 1, Type: 'Device', Name: '' }, repo);
        it('should return a Device type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Device);
        });
    });
    describe('#Domain', function () {
        const gc = new ContentTypes_1.ContentTypes.Domain({ Id: 1, Type: 'Domain', Name: '' }, repo);
        it('should return a Domain type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Domain);
        });
    });
    describe('#Domains', function () {
        const gc = new ContentTypes_1.ContentTypes.Domains({ Id: 1, Type: 'Domains', Name: '' }, repo);
        it('should return a Domains type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Domains);
        });
    });
    describe('#Email', function () {
        const content = new ContentTypes_1.ContentTypes.Email({ Id: 1, Type: 'Email', Name: '' }, repo);
        it('should return a Email type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Email);
        });
    });
    describe('#OrganizationalUnit', function () {
        const content = new ContentTypes_1.ContentTypes.OrganizationalUnit({ Id: 1, Type: 'OrganizationalUnit', Name: '' }, repo);
        it('should return a OrganizationalUnit type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.OrganizationalUnit);
        });
    });
    describe('#PortalRoot', function () {
        const content = new ContentTypes_1.ContentTypes.PortalRoot({ Id: 1, Type: 'PortalRoot', Name: '' }, repo);
        it('should return a PortalRoot type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PortalRoot);
        });
    });
    describe('#SystemFolder', function () {
        const content = new ContentTypes_1.ContentTypes.SystemFolder({ Id: 1, Type: 'SystemFolder', Name: '' }, repo);
        it('should return a SystemFolder type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.SystemFolder);
        });
    });
    describe('#Resources', function () {
        const content = new ContentTypes_1.ContentTypes.Resources({ Id: 1, Type: 'Resources', Name: '' }, repo);
        it('should return a Resources type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Resources);
        });
    });
    describe('#ProfileDomain', function () {
        const content = new ContentTypes_1.ContentTypes.ProfileDomain({ Id: 1, Type: 'ProfileDomain', Name: '' }, repo);
        it('should return a ProfileDomain type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ProfileDomain);
        });
    });
    describe('#Profiles', function () {
        const content = new ContentTypes_1.ContentTypes.Profiles({ Id: 1, Type: 'Profiles', Name: '' }, repo);
        it('should return a Profiles type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Profiles);
        });
    });
    describe('#RuntimeContentContainer', function () {
        const content = new ContentTypes_1.ContentTypes.RuntimeContentContainer({ Id: 1, Type: 'RuntimeContentContainer', Name: '' }, repo);
        it('should return a RuntimeContentContainer type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.RuntimeContentContainer);
        });
    });
    describe('#Sites', function () {
        const content = new ContentTypes_1.ContentTypes.Sites({ Id: 1, Type: 'Sites', Name: '' }, repo);
        it('should return a Sites type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Sites);
        });
    });
    describe('#TrashBag', function () {
        const content = new ContentTypes_1.ContentTypes.TrashBag({ Id: 1, Type: 'TrashBag', Name: '' }, repo);
        it('should return a TrashBag type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.TrashBag);
        });
    });
    describe('#File', function () {
        const content = new ContentTypes_1.ContentTypes.File({ Id: 1, Type: 'File', Name: '' }, repo);
        it('should return a File type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.File);
        });
    });
    describe('#Settings', function () {
        const content = new ContentTypes_1.ContentTypes.Settings({ Id: 1, Type: 'Settings', Name: '' }, repo);
        it('should return a Settings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Settings);
        });
    });
    describe('#IndexingSettings', function () {
        const content = new ContentTypes_1.ContentTypes.IndexingSettings({ Id: 1, Type: 'IndexingSettings', Name: '' }, repo);
        it('should return a IndexingSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.IndexingSettings);
        });
    });
    describe('#LoggingSettings', function () {
        const content = new ContentTypes_1.ContentTypes.LoggingSettings({ Id: 1, Type: 'LoggingSettings', Name: '' }, repo);
        it('should return a LoggingSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.LoggingSettings);
        });
    });
    describe('#PortalSettings', function () {
        const content = new ContentTypes_1.ContentTypes.PortalSettings({ Id: 1, Type: 'PortalSettings', Name: '' }, repo);
        it('should return a PortalSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PortalSettings);
        });
    });
    describe('#SystemFile', function () {
        const content = new ContentTypes_1.ContentTypes.SystemFile({ Id: 1, Type: 'SystemFile', Name: '' }, repo);
        it('should return a SystemFile type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.SystemFile);
        });
    });
    describe('#Resource', function () {
        const content = new ContentTypes_1.ContentTypes.Resource({ Id: 1, Type: 'Resource', Name: '' }, repo);
        it('should return a Resource type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Resource);
        });
    });
    describe('#DynamicJsonContent', function () {
        const content = new ContentTypes_1.ContentTypes.DynamicJsonContent({ Id: 1, Type: 'DynamicJsonContent', Name: '' }, repo);
        it('should return a DynamicJsonContent type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.DynamicJsonContent);
        });
    });
    describe('#ExecutableFile', function () {
        const content = new ContentTypes_1.ContentTypes.ExecutableFile({ Id: 1, Type: 'ExecutableFile', Name: '' }, repo);
        it('should return a ExecutableFile type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ExecutableFile);
        });
    });
    describe('#HtmlTemplate', function () {
        const content = new ContentTypes_1.ContentTypes.HtmlTemplate({ Id: 1, Type: 'HtmlTemplate', Name: '' }, repo);
        it('should return a HtmlTemplate type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.HtmlTemplate);
        });
    });
    describe('#Image', function () {
        const content = new ContentTypes_1.ContentTypes.Image({ Id: 1, Type: 'Image', Name: '' }, repo);
        it('should return a Image type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Image);
        });
    });
    describe('#PreviewImage', function () {
        const content = new ContentTypes_1.ContentTypes.PreviewImage({ Id: 1, Type: 'PreviewImage', Name: '' }, repo);
        it('should return a PreviewImage type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PreviewImage);
        });
    });
    describe('#UserProfile', function () {
        const content = new ContentTypes_1.ContentTypes.UserProfile({ Id: 1, Type: 'UserProfile', Name: '', IsActive: false }, repo);
        it('should return a UserProfile type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.UserProfile);
        });
    });
    describe('#ListItem', function () {
        const content = new ContentTypes_1.ContentTypes.ListItem({ Id: 1, Type: 'ListItem', Name: '' }, repo);
        it('should return a ListItem type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ListItem);
        });
    });
    describe('#Task', function () {
        const task = new ContentTypes_1.ContentTypes.Task({ Id: 1, Type: 'Task', Name: '', DueDate: new Date('2020-01-01') }, repo);
        it('should return a Task type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Task);
        });
    });
    describe('#CustomListItem', function () {
        const task = new ContentTypes_1.ContentTypes.CustomListItem({ Id: 1, Type: 'CustomListItem', Name: '' }, repo);
        it('should return a CustomListItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.CustomListItem);
        });
    });
    describe('#Memo', function () {
        const task = new ContentTypes_1.ContentTypes.Memo({ Id: 1, Type: 'Memo', Name: '' }, repo);
        it('should return a Memo type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Memo);
        });
    });
    describe('#ContentLink', function () {
        const task = new ContentTypes_1.ContentTypes.ContentLink({ Id: 1, Type: 'ContentLink', Name: '' }, repo);
        it('should return a ContentLink type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentLink);
        });
    });
    describe('#Group', function () {
        const task = new ContentTypes_1.ContentTypes.Group({ Id: 1, Type: 'Group', Name: '' }, repo);
        it('should return a Group type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Group);
        });
    });
    describe('#Query', function () {
        const task = new ContentTypes_1.ContentTypes.Query({ Id: 1, Type: 'Query', Name: '' }, repo);
        it('should return a Query type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Query);
        });
    });
    describe('#User', function () {
        const task = new ContentTypes_1.ContentTypes.User({ Id: 1, Type: 'User', Name: '', LoginName: '', Email: '', FullName: '', Password: '' }, repo);
        it('should return a User type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.User);
        });
    });
});
//# sourceMappingURL=ContentTypeTests.js.map