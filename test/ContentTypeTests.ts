import { ContentTypes, CreateContent } from '../src/ContentTypes';
import * as Chai from 'chai';
const expect = Chai.expect;

describe('ContentTypes', () => {
    describe('#ContentType', function(){
        const gc = new ContentTypes.ContentType({ Id: 1, Type: 'ContentType', Name: '' });
        it('should return a ContentType type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ContentType);
        });
    });
    describe('#GenericContent', function(){
        const gc = new ContentTypes.GenericContent({ Id: 1, Type: 'GenericContent', Name: '' });
        it('should return a GenericContent type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.GenericContent);
        });
    });
    describe('#Folder', function(){
        const gc = new ContentTypes.Folder({ Id: 1, Type: 'Folder', Name: '' });
        it('should return a Folder type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Folder);
        });
    });
    describe('#ContentList', function(){
        const gc = new ContentTypes.ContentList({ Id: 1, Type: 'ContentList', Name: '' });
        it('should return a ContentList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ContentList);
        });
    });
    describe('#Aspect', function(){
        const gc = new ContentTypes.Aspect({ Id: 1, Type: 'Aspect', Name: '' });
        it('should return a Aspect type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Aspect);
        });
    });
    describe('#ItemList', function(){
        const gc = new ContentTypes.ItemList({ Id: 1, Type: 'ItemList', Name: '' });
        it('should return a ItemList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ItemList);
        });
    });
    describe('#CustomList', function(){
        const gc = new ContentTypes.CustomList({ Id: 1, Type: 'CustomList', Name: '' });
        it('should return a CustomList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.CustomList);
        });
    });
    describe('#MemoList', function(){
        const gc = new ContentTypes.MemoList({ Id: 1, Type: 'MemoList', Name: '' });
        it('should return a MemoList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.MemoList);
        });
    });
    describe('#TaskList', function(){
        const gc = new ContentTypes.TaskList({ Id: 1, Type: 'TaskList', Name: '' });
        it('should return a TaskList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.TaskList);
        });
    });
    describe('#Library', function(){
        const gc = new ContentTypes.Library({ Id: 1, Type: 'Library', Name: '' });
        it('should return a Library type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Library);
        });
    });
    describe('#DocumentLibrary', function(){
        const gc = new ContentTypes.DocumentLibrary({ Id: 1, Type: 'DocumentLibrary', Name: '' });
        it('should return a DocumentLibrary type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.DocumentLibrary);
        });
    });
    describe('#ImageLibrary', function(){
        const gc = new ContentTypes.ImageLibrary({ Id: 1, Type: 'ImageLibrary', Name: '' });
        it('should return a ImageLibrary type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ImageLibrary);
        });
    });
    describe('#Workspace', function(){
        const gc = new ContentTypes.Workspace({ Id: 1, Type: 'Workspace', Name: '', IsActive: false });
        it('should return a Workspace type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Workspace);
        });
    });
    describe('#Site', function(){
        const gc = new ContentTypes.Site({ Id: 1, Type: 'Site', Name: '', IsActive: false });
        it('should return a Site type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Site);
        });
    });
    describe('#TrashBin', function(){
        const gc = new ContentTypes.TrashBin({ Id: 1, Type: 'TrashBin', Name: '', IsActive: false });
        it('should return a TrashBin type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.TrashBin);
        });
    });
    describe('#SmartFolder', function(){
        const gc = new ContentTypes.SmartFolder({ Id: 1, Type: 'SmartFolder', Name: '' });
        it('should return a SmartFolder type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.SmartFolder);
        });
    });
    describe('#Device', function(){
        const gc = new ContentTypes.Device({ Id: 1, Type: 'Device', Name: '' });
        it('should return a Device type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Device);
        });
    });
    describe('#Domain', function(){
        const gc = new ContentTypes.Domain({ Id: 1, Type: 'Domain', Name: '' });
        it('should return a Domain type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Domain);
        });
    });
     describe('#Domains', function(){
        const gc = new ContentTypes.Domains({ Id: 1, Type: 'Domains', Name: '' });
        it('should return a Domains type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Domains);
        });
    });
    describe('#Email', function(){
        const content = new ContentTypes.Email({ Id: 1, Type: 'Email', Name: '' });
        it('should return a Email type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Email);
        });
    });
    describe('#OrganizationalUnit', function(){
        const content = new ContentTypes.OrganizationalUnit({ Id: 1, Type: 'OrganizationalUnit', Name: '' });
        it('should return a OrganizationalUnit type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.OrganizationalUnit);
        });
    });
    describe('#PortalRoot', function(){
        const content = new ContentTypes.PortalRoot({ Id: 1, Type: 'PortalRoot', Name: '' });
        it('should return a PortalRoot type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.PortalRoot);
        });
    });
    describe('#SystemFolder', function(){
        const content = new ContentTypes.SystemFolder({ Id: 1, Type: 'SystemFolder', Name: '' });
        it('should return a SystemFolder type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.SystemFolder);
        });
    });
    describe('#Resources', function(){
        const content = new ContentTypes.Resources({ Id: 1, Type: 'Resources', Name: '' });
        it('should return a Resources type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Resources);
        });
    });
    describe('#ProfileDomain', function(){
        const content = new ContentTypes.ProfileDomain({ Id: 1, Type: 'ProfileDomain', Name: '' });
        it('should return a ProfileDomain type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ProfileDomain);
        });
    });
    describe('#Profiles', function(){
        const content = new ContentTypes.Profiles({ Id: 1, Type: 'Profiles', Name: '' });
        it('should return a Profiles type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Profiles);
        });
    });
    describe('#RuntimeContentContainer', function(){
        const content = new ContentTypes.RuntimeContentContainer({ Id: 1, Type: 'RuntimeContentContainer', Name: '' });
        it('should return a RuntimeContentContainer type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.RuntimeContentContainer);
        });
    });
    describe('#Sites', function(){
        const content = new ContentTypes.Sites({ Id: 1, Type: 'Sites', Name: '' });
        it('should return a Sites type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Sites);
        });
    });
    describe('#TrashBag', function(){
        const content = new ContentTypes.TrashBag({ Id: 1, Type: 'TrashBag', Name: '' });
        it('should return a TrashBag type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.TrashBag);
        });
    });
    describe('#File', function(){
        const content = new ContentTypes.File({ Id: 1, Type: 'File', Name: '' });
        it('should return a File type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.File);
        });
    });
    describe('#Settings', function(){
        const content = new ContentTypes.Settings({ Id: 1, Type: 'Settings', Name: '' });
        it('should return a Settings type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Settings);
        });
    });
    describe('#IndexingSettings', function(){
        const content = new ContentTypes.IndexingSettings({ Id: 1, Type: 'IndexingSettings', Name: '' });
        it('should return a IndexingSettings type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.IndexingSettings);
        });
    });
    describe('#LoggingSettings', function(){
        const content = new ContentTypes.LoggingSettings({ Id: 1, Type: 'LoggingSettings', Name: '' });
        it('should return a LoggingSettings type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.LoggingSettings);
        });
    });
    describe('#PortalSettings', function(){
        const content = new ContentTypes.PortalSettings({ Id: 1, Type: 'PortalSettings', Name: '' });
        it('should return a PortalSettings type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.PortalSettings);
        });
    });
    describe('#SystemFile', function(){
        const content = new ContentTypes.SystemFile({ Id: 1, Type: 'SystemFile', Name: '' });
        it('should return a SystemFile type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.SystemFile);
        });
    });
    describe('#Resource', function(){
        const content = new ContentTypes.Resource({ Id: 1, Type: 'Resource', Name: '' });
        it('should return a Resource type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Resource);
        });
    });
    describe('#DynamicJsonContent', function(){
        const content = new ContentTypes.DynamicJsonContent({ Id: 1, Type: 'DynamicJsonContent', Name: '' });
        it('should return a DynamicJsonContent type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.DynamicJsonContent);
        });
    });
    describe('#ExecutableFile', function(){
        const content = new ContentTypes.ExecutableFile({ Id: 1, Type: 'ExecutableFile', Name: '' });
        it('should return a ExecutableFile type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ExecutableFile);
        });
    });
    describe('#HtmlTemplate', function(){
        const content = new ContentTypes.HtmlTemplate({ Id: 1, Type: 'HtmlTemplate', Name: '' });
        it('should return a HtmlTemplate type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.HtmlTemplate);
        });
    });
    describe('#Image', function(){
        const content = new ContentTypes.Image({ Id: 1, Type: 'Image', Name: '' });
        it('should return a Image type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Image);
        });
    });
    describe('#PreviewImage', function(){
        const content = new ContentTypes.PreviewImage({ Id: 1, Type: 'PreviewImage', Name: '' });
        it('should return a PreviewImage type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.PreviewImage);
        });
    });
    describe('#UserProfile', function(){
        const content = new ContentTypes.UserProfile({ Id: 1, Type: 'UserProfile', Name: '', IsActive: false });
        it('should return a UserProfile type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.UserProfile);
        });
    });
    describe('#ListItem', function(){
        const content = new ContentTypes.ListItem({ Id: 1, Type: 'ListItem', Name: '' });
        it('should return a ListItem type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ListItem);
        });
    });
    describe('#Task', function(){
        const task = new ContentTypes.Task({ Id: 1, Type: 'Task', Name: '', DueDate: new Date('2020-01-01') });
        it('should return a Task type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Task);
        });
    });
    describe('#CustomListItem', function(){
        const task = new ContentTypes.CustomListItem({ Id: 1, Type: 'CustomListItem', Name: '' });
        it('should return a CustomListItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.CustomListItem);
        });
    });
    describe('#Memo', function(){
        const task = new ContentTypes.Memo({ Id: 1, Type: 'Memo', Name: '' });
        it('should return a Memo type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Memo);
        });
    });
    describe('#ContentLink', function(){
        const task = new ContentTypes.ContentLink({ Id: 1, Type: 'ContentLink', Name: '' });
        it('should return a ContentLink type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.ContentLink);
        });
    });
    describe('#Group', function(){
        const task = new ContentTypes.Group({ Id: 1, Type: 'Group', Name: '' });
        it('should return a Group type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Group);
        });
    });
    describe('#Query', function(){
        const task = new ContentTypes.Query({ Id: 1, Type: 'Query', Name: '' });
        it('should return a Query type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Query);
        });
    });
    describe('#User', function(){
        const task = new ContentTypes.User({ Id: 1, Type: 'User', Name: '', LoginName: '', Email: '', FullName: '', Password: '' });
        it('should return a User type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.User);
        });
    });
});