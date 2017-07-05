import { ContentTypes } from '../src/SN';
import * as Chai from 'chai';
import { MockRepository } from './Mocks/MockRepository';
const expect = Chai.expect;

describe('ContentTypes', () => {


    let repo = new MockRepository();

    describe('#ContentType', () => {
        const gc = new ContentTypes.ContentType({ Id: 1, Type: 'ContentType', Name: '' }, repo);
        it('should return a ContentType type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ContentType);
        });
    });
    describe('#GenericContent', () => {
        const gc = new ContentTypes.GenericContent({ Id: 1, Type: 'GenericContent', Name: '' }, repo);
        it('should return a GenericContent type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.GenericContent);
        });
    });
    describe('#Folder', () => {
        const gc = new ContentTypes.Folder({ Id: 1, Type: 'Folder', Name: '' }, repo);
        it('should return a Folder type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Folder);
        });
    });
    describe('#ContentList', () => {
        const gc = new ContentTypes.ContentList({ Id: 1, Type: 'ContentList', Name: '' }, repo);
        it('should return a ContentList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ContentList);
        });
    });
    describe('#Aspect', () => {
        const gc = new ContentTypes.Aspect({ Id: 1, Type: 'Aspect', Name: '' }, repo);
        it('should return a Aspect type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Aspect);
        });
    });
    describe('#ItemList', () => {
        const gc = new ContentTypes.ItemList({ Id: 1, Type: 'ItemList', Name: '' }, repo);
        it('should return a ItemList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ItemList);
        });
    });
    describe('#CustomList', () => {
        const gc = new ContentTypes.CustomList({ Id: 1, Type: 'CustomList', Name: '' }, repo);
        it('should return a CustomList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.CustomList);
        });
    });
    describe('#MemoList', () => {
        const gc = new ContentTypes.MemoList({ Id: 1, Type: 'MemoList', Name: '' }, repo);
        it('should return a MemoList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.MemoList);
        });
    });
    describe('#TaskList', () => {
        const gc = new ContentTypes.TaskList({ Id: 1, Type: 'TaskList', Name: '' }, repo);
        it('should return a TaskList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.TaskList);
        });
    });
    describe('#Library', () => {
        const gc = new ContentTypes.Library({ Id: 1, Type: 'Library', Name: '' }, repo);
        it('should return a Library type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Library);
        });
    });
    describe('#DocumentLibrary', () => {
        const gc = new ContentTypes.DocumentLibrary({ Id: 1, Type: 'DocumentLibrary', Name: '' }, repo);
        it('should return a DocumentLibrary type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.DocumentLibrary);
        });
    });
    describe('#ImageLibrary', () => {
        const gc = new ContentTypes.ImageLibrary({ Id: 1, Type: 'ImageLibrary', Name: '' }, repo);
        it('should return a ImageLibrary type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ImageLibrary);
        });
    });
    describe('#Workspace', () => {
        const gc = new ContentTypes.Workspace({ Id: 1, Type: 'Workspace', Name: '', IsActive: false }, repo);
        it('should return a Workspace type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Workspace);
        });
    });
    describe('#Site', () => {
        const gc = new ContentTypes.Site({ Id: 1, Type: 'Site', Name: '', IsActive: false }, repo);
        it('should return a Site type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Site);
        });
    });
    describe('#TrashBin', () => {
        const gc = new ContentTypes.TrashBin({ Id: 1, Type: 'TrashBin', Name: '', IsActive: false }, repo);
        it('should return a TrashBin type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.TrashBin);
        });
    });
    describe('#SmartFolder', () => {
        const gc = new ContentTypes.SmartFolder({ Id: 1, Type: 'SmartFolder', Name: '' }, repo);
        it('should return a SmartFolder type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.SmartFolder);
        });
    });
    describe('#Device', () => {
        const gc = new ContentTypes.Device({ Id: 1, Type: 'Device', Name: '' }, repo);
        it('should return a Device type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Device);
        });
    });
    describe('#Domain', () => {
        const gc = new ContentTypes.Domain({ Id: 1, Type: 'Domain', Name: '' }, repo);
        it('should return a Domain type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Domain);
        });
    });
    describe('#Domains', () => {
        const gc = new ContentTypes.Domains({ Id: 1, Type: 'Domains', Name: '' }, repo);
        it('should return a Domains type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Domains);
        });
    });
    describe('#Email', () => {
        const content = new ContentTypes.Email({ Id: 1, Type: 'Email', Name: '' }, repo);
        it('should return a Email type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Email);
        });
    });
    describe('#OrganizationalUnit', () => {
        const content = new ContentTypes.OrganizationalUnit({ Id: 1, Type: 'OrganizationalUnit', Name: '' }, repo);
        it('should return a OrganizationalUnit type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.OrganizationalUnit);
        });
    });
    describe('#PortalRoot', () => {
        const content = new ContentTypes.PortalRoot({ Id: 1, Type: 'PortalRoot', Name: '' }, repo);
        it('should return a PortalRoot type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.PortalRoot);
        });
    });
    describe('#SystemFolder', () => {
        const content = new ContentTypes.SystemFolder({ Id: 1, Type: 'SystemFolder', Name: '' }, repo);
        it('should return a SystemFolder type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.SystemFolder);
        });
    });
    describe('#Resources', () => {
        const content = new ContentTypes.Resources({ Id: 1, Type: 'Resources', Name: '' }, repo);
        it('should return a Resources type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Resources);
        });
    });
    describe('#ProfileDomain', () => {
        const content = new ContentTypes.ProfileDomain({ Id: 1, Type: 'ProfileDomain', Name: '' }, repo);
        it('should return a ProfileDomain type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.ProfileDomain);
        });
    });
    describe('#Profiles', () => {
        const content = new ContentTypes.Profiles({ Id: 1, Type: 'Profiles', Name: '' }, repo);
        it('should return a Profiles type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Profiles);
        });
    });
    describe('#RuntimeContentContainer', () => {
        const content = new ContentTypes.RuntimeContentContainer({ Id: 1, Type: 'RuntimeContentContainer', Name: '' }, repo);
        it('should return a RuntimeContentContainer type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.RuntimeContentContainer);
        });
    });
    describe('#Sites', () => {
        const content = new ContentTypes.Sites({ Id: 1, Type: 'Sites', Name: '' }, repo);
        it('should return a Sites type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Sites);
        });
    });
    describe('#TrashBag', () => {
        const content = new ContentTypes.TrashBag({ Id: 1, Type: 'TrashBag', Name: '' }, repo);
        it('should return a TrashBag type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.TrashBag);
        });
    });
    describe('#File', () => {
        const content = new ContentTypes.File({ Id: 1, Type: 'File', Name: '' }, repo);
        it('should return a File type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.File);
        });
    });
    describe('#Settings', () => {
        const content = new ContentTypes.Settings({ Id: 1, Type: 'Settings', Name: '' }, repo);
        it('should return a Settings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Settings);
        });
    });
    describe('#IndexingSettings', () => {
        const content = new ContentTypes.IndexingSettings({ Id: 1, Type: 'IndexingSettings', Name: '' }, repo);
        it('should return a IndexingSettings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.IndexingSettings);
        });
    });
    describe('#LoggingSettings', () => {
        const content = new ContentTypes.LoggingSettings({ Id: 1, Type: 'LoggingSettings', Name: '' }, repo);
        it('should return a LoggingSettings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.LoggingSettings);
        });
    });
    describe('#PortalSettings', () => {
        const content = new ContentTypes.PortalSettings({ Id: 1, Type: 'PortalSettings', Name: '' }, repo);
        it('should return a PortalSettings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.PortalSettings);
        });
    });
    describe('#SystemFile', () => {
        const content = new ContentTypes.SystemFile({ Id: 1, Type: 'SystemFile', Name: '' }, repo);
        it('should return a SystemFile type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.SystemFile);
        });
    });
    describe('#Resource', () => {
        const content = new ContentTypes.Resource({ Id: 1, Type: 'Resource', Name: '' }, repo);
        it('should return a Resource type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Resource);
        });
    });
    describe('#DynamicJsonContent', () => {
        const content = new ContentTypes.DynamicJsonContent({ Id: 1, Type: 'DynamicJsonContent', Name: '' }, repo);
        it('should return a DynamicJsonContent type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.DynamicJsonContent);
        });
    });
    describe('#ExecutableFile', () => {
        const content = new ContentTypes.ExecutableFile({ Id: 1, Type: 'ExecutableFile', Name: '' }, repo);
        it('should return a ExecutableFile type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.ExecutableFile);
        });
    });
    describe('#HtmlTemplate', () => {
        const content = new ContentTypes.HtmlTemplate({ Id: 1, Type: 'HtmlTemplate', Name: '' }, repo);
        it('should return a HtmlTemplate type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.HtmlTemplate);
        });
    });
    describe('#Image', () => {
        const content = new ContentTypes.Image({ Id: 1, Type: 'Image', Name: '' }, repo);
        it('should return a Image type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Image);
        });
    });
    describe('#PreviewImage', () => {
        const content = new ContentTypes.PreviewImage({ Id: 1, Type: 'PreviewImage', Name: '' }, repo);
        it('should return a PreviewImage type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.PreviewImage);
        });
    });
    describe('#UserProfile', () => {
        const content = new ContentTypes.UserProfile({ Id: 1, Type: 'UserProfile', Name: '', IsActive: false }, repo);
        it('should return a UserProfile type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.UserProfile);
        });
    });
    describe('#ListItem', () => {
        const content = new ContentTypes.ListItem({ Id: 1, Type: 'ListItem', Name: '' }, repo);
        it('should return a ListItem type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.ListItem);
        });
    });
    describe('#Task', () => {
        const task = new ContentTypes.Task({ Id: 1, Type: 'Task', Name: '', DueDate: '2020-06-27T11:11:11Z' }, repo);
        it('should return a Task type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Task);
        });
    });
    describe('#CustomListItem', () => {
        const task = new ContentTypes.CustomListItem({ Id: 1, Type: 'CustomListItem', Name: '' }, repo);
        it('should return a CustomListItem type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.CustomListItem);
        });
    });
    describe('#Memo', () => {
        const task = new ContentTypes.Memo({ Id: 1, Type: 'Memo', Name: '' }, repo);
        it('should return a Memo type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Memo);
        });
    });
    describe('#ContentLink', () => {
        const task = new ContentTypes.ContentLink({ Id: 1, Type: 'ContentLink', Name: '' }, repo);
        it('should return a ContentLink type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.ContentLink);
        });
    });
    describe('#Group', () => {
        const task = new ContentTypes.Group({ Id: 1, Type: 'Group', Name: '' }, repo);
        it('should return a Group type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Group);
        });
    });
    describe('#Query', () => {
        const task = new ContentTypes.Query({ Id: 1, Type: 'Query', Name: '' }, repo);
        it('should return a Query type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Query);
        });
    });
    describe('#User', () => {
        const task = new ContentTypes.User({ Id: 1, Type: 'User', Name: '', LoginName: '', Email: '', FullName: '', Password: '' }, repo);
        it('should return a User type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.User);
        });
    });
});