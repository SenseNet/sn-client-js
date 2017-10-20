import { ContentTypes, ContentInternal } from '../src/SN';
import * as Chai from 'chai';
import { MockRepository } from './Mocks/MockRepository';
import { Memo, ContentType, GenericContent, Folder, ContentList, Aspect, ItemList, CustomList,
    MemoList, TaskList, Library, DocumentLibrary, ImageLibrary, Workspace, Site, TrashBin,
    SmartFolder, Device, Domain, Domains, Email, OrganizationalUnit, PortalRoot, SystemFolder,
    Resource, Resources, ProfileDomain, Profiles, User, Query, Group, ContentLink, CustomListItem,
    Task, ListItem, UserProfile, PreviewImage, Image, HtmlTemplate, ExecutableFile, DynamicJsonContent,
    SystemFile, RuntimeContentContainer, Sites, TrashBag, File as SnFile, Settings, IndexingSettings, LoggingSettings, PortalSettings } from '../src/ContentTypes';
const expect = Chai.expect;

describe('ContentTypes', () => {


    let repo = new MockRepository();

    describe('#ContentType', () => {
        const gc = new ContentInternal<ContentType>({ Id: 1, Name: '' }, repo);
        it('should return a ContentType type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ContentType);
        });
    });
    describe('#GenericContent', () => {
        const gc = new ContentInternal<GenericContent>({ Id: 1, Type: 'GenericContent', Name: '' }, repo);
        it('should return a GenericContent type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.GenericContent);
        });
    });
    describe('#Folder', () => {
        const gc = new ContentInternal<Folder>({ Id: 1, Type: 'Folder', Name: '' }, repo);
        it('should return a Folder type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Folder);
        });
    });
    describe('#ContentList', () => {
        const gc = new ContentInternal<ContentList>({ Id: 1, Type: 'ContentList', Name: '' }, repo);
        it('should return a ContentList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ContentList);
        });
    });
    describe('#Aspect', () => {
        const gc = new ContentInternal<Aspect>({ Id: 1, Type: 'Aspect', Name: '' }, repo);
        it('should return a Aspect type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Aspect);
        });
    });
    describe('#ItemList', () => {
        const gc = new ContentInternal<ItemList>({ Id: 1, Type: 'ItemList', Name: '' }, repo);
        it('should return a ItemList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ItemList);
        });
    });
    describe('#CustomList', () => {
        const gc = new ContentInternal<CustomList>({ Id: 1, Type: 'CustomList', Name: '' }, repo);
        it('should return a CustomList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.CustomList);
        });
    });
    describe('#MemoList', () => {
        const gc = new ContentInternal<MemoList>({ Id: 1, Type: 'MemoList', Name: '' }, repo);
        it('should return a MemoList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.MemoList);
        });
    });
    describe('#TaskList', () => {
        const gc = new ContentInternal<TaskList>({ Id: 1, Type: 'TaskList', Name: '' }, repo);
        it('should return a TaskList type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.TaskList);
        });
    });
    describe('#Library', () => {
        const gc = new ContentInternal<Library>({ Id: 1, Type: 'Library', Name: '' }, repo);
        it('should return a Library type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Library);
        });
    });
    describe('#DocumentLibrary', () => {
        const gc = new ContentInternal<DocumentLibrary>({ Id: 1, Type: 'DocumentLibrary', Name: '' }, repo);
        it('should return a DocumentLibrary type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.DocumentLibrary);
        });
    });
    describe('#ImageLibrary', () => {
        const gc = new ContentInternal<ImageLibrary>({ Id: 1, Type: 'ImageLibrary', Name: '' }, repo);
        it('should return a ImageLibrary type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.ImageLibrary);
        });
    });
    describe('#Workspace', () => {
        const gc = new ContentInternal<Workspace>({ Id: 1, Type: 'Workspace', Name: '', IsActive: false }, repo);
        it('should return a Workspace type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Workspace);
        });
    });
    describe('#Site', () => {
        const gc = new ContentInternal<Site>({ Id: 1, Type: 'Site', Name: '', IsActive: false }, repo);
        it('should return a Site type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Site);
        });
    });
    describe('#TrashBin', () => {
        const gc = new ContentInternal<TrashBin>({ Id: 1, Type: 'TrashBin', Name: '', IsActive: false }, repo);
        it('should return a TrashBin type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.TrashBin);
        });
    });
    describe('#SmartFolder', () => {
        const gc = new ContentInternal<SmartFolder>({ Id: 1, Type: 'SmartFolder', Name: '' }, repo);
        it('should return a SmartFolder type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.SmartFolder);
        });
    });
    describe('#Device', () => {
        const gc = new ContentInternal<Device>({ Id: 1, Type: 'Device', Name: '' }, repo);
        it('should return a Device type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Device);
        });
    });
    describe('#Domain', () => {
        const gc = new ContentInternal<Domain>({ Id: 1, Type: 'Domain', Name: '' }, repo);
        it('should return a Domain type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Domain);
        });
    });
    describe('#Domains', () => {
        const gc = new ContentInternal<Domains>({ Id: 1, Type: 'Domains', Name: '' }, repo);
        it('should return a Domains type object', () => {
            expect(gc).to.be.an.instanceof(ContentTypes.Domains);
        });
    });
    describe('#Email', () => {
        const content = new ContentInternal<Email>({ Id: 1, Type: 'Email', Name: '' }, repo);
        it('should return a Email type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Email);
        });
    });
    describe('#OrganizationalUnit', () => {
        const content = new ContentInternal<OrganizationalUnit>({ Id: 1, Type: 'OrganizationalUnit', Name: '' }, repo);
        it('should return a OrganizationalUnit type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.OrganizationalUnit);
        });
    });
    describe('#PortalRoot', () => {
        const content = new ContentInternal<PortalRoot>({ Id: 1, Type: 'PortalRoot', Name: '' }, repo);
        it('should return a PortalRoot type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.PortalRoot);
        });
    });
    describe('#SystemFolder', () => {
        const content = new ContentInternal<SystemFolder>({ Id: 1, Type: 'SystemFolder', Name: '' }, repo);
        it('should return a SystemFolder type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.SystemFolder);
        });
    });
    describe('#Resources', () => {
        const content = new ContentInternal<Resources>({ Id: 1, Type: 'Resources', Name: '' }, repo);
        it('should return a Resources type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Resources);
        });
    });
    describe('#ProfileDomain', () => {
        const content = new ContentInternal<ProfileDomain>({ Id: 1, Type: 'ProfileDomain', Name: '' }, repo);
        it('should return a ProfileDomain type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.ProfileDomain);
        });
    });
    describe('#Profiles', () => {
        const content = new ContentInternal<Profiles>({ Id: 1, Type: 'Profiles', Name: '' }, repo);
        it('should return a Profiles type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Profiles);
        });
    });
    describe('#RuntimeContentContainer', () => {
        const content = new ContentInternal<RuntimeContentContainer>({ Id: 1, Type: 'RuntimeContentContainer', Name: '' }, repo);
        it('should return a RuntimeContentContainer type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.RuntimeContentContainer);
        });
    });
    describe('#Sites', () => {
        const content = new ContentInternal<Sites>({ Id: 1, Type: 'Sites', Name: '' }, repo);
        it('should return a Sites type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Sites);
        });
    });
    describe('#TrashBag', () => {
        const content = new ContentInternal<TrashBag>({ Id: 1, Type: 'TrashBag', Name: '' }, repo);
        it('should return a TrashBag type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.TrashBag);
        });
    });
    describe('#File', () => {
        const content = new ContentInternal<SnFile>({ Id: 1, Type: 'File', Name: '' }, repo);
        it('should return a File type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.File);
        });
    });
    describe('#Settings', () => {
        const content = new ContentInternal<Settings>({ Id: 1, Type: 'Settings', Name: '' }, repo);
        it('should return a Settings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Settings);
        });
    });
    describe('#IndexingSettings', () => {
        const content = new ContentInternal<IndexingSettings>({ Id: 1, Type: 'IndexingSettings', Name: '' }, repo);
        it('should return a IndexingSettings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.IndexingSettings);
        });
    });
    describe('#LoggingSettings', () => {
        const content = new ContentInternal<LoggingSettings>({ Id: 1, Type: 'LoggingSettings', Name: '' }, repo);
        it('should return a LoggingSettings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.LoggingSettings);
        });
    });
    describe('#PortalSettings', () => {
        const content = new ContentInternal<PortalSettings>({ Id: 1, Type: 'PortalSettings', Name: '' }, repo);
        it('should return a PortalSettings type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.PortalSettings);
        });
    });
    describe('#SystemFile', () => {
        const content = new ContentInternal<SystemFile>({ Id: 1, Type: 'SystemFile', Name: '' }, repo);
        it('should return a SystemFile type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.SystemFile);
        });
    });
    describe('#Resource', () => {
        const content = new ContentInternal<Resource>({ Id: 1, Type: 'Resource', Name: '' }, repo);
        it('should return a Resource type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Resource);
        });
    });
    describe('#DynamicJsonContent', () => {
        const content = new ContentInternal<DynamicJsonContent>({ Id: 1, Type: 'DynamicJsonContent', Name: '' }, repo);
        it('should return a DynamicJsonContent type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.DynamicJsonContent);
        });
    });
    describe('#ExecutableFile', () => {
        const content = new ContentInternal<ExecutableFile>({ Id: 1, Type: 'ExecutableFile', Name: '' }, repo);
        it('should return a ExecutableFile type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.ExecutableFile);
        });
    });
    describe('#HtmlTemplate', () => {
        const content = new ContentInternal<HtmlTemplate>({ Id: 1, Type: 'HtmlTemplate', Name: '' }, repo);
        it('should return a HtmlTemplate type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.HtmlTemplate);
        });
    });
    describe('#Image', () => {
        const content = new ContentInternal<Image>({ Id: 1, Type: 'Image', Name: '' }, repo);
        it('should return a Image type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.Image);
        });
    });
    describe('#PreviewImage', () => {
        const content = new ContentInternal<PreviewImage>({ Id: 1, Type: 'PreviewImage', Name: '' }, repo);
        it('should return a PreviewImage type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.PreviewImage);
        });
    });
    describe('#UserProfile', () => {
        const content = new ContentInternal<UserProfile>({ Id: 1, Type: 'UserProfile', Name: '', IsActive: false }, repo);
        it('should return a UserProfile type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.UserProfile);
        });
    });
    describe('#ListItem', () => {
        const content = new ContentInternal<ListItem>({ Id: 1, Type: 'ListItem', Name: '' }, repo);
        it('should return a ListItem type object', () => {
            expect(content).to.be.an.instanceof(ContentTypes.ListItem);
        });
    });
    describe('#Task', () => {
        const task = new ContentInternal<Task>({ Id: 1, Type: 'Task', Name: '', DueDate: '2020-06-27T11:11:11Z' }, repo);
        it('should return a Task type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Task);
        });
    });
    describe('#CustomListItem', () => {
        const task = new ContentInternal<CustomListItem>({ Id: 1, Type: 'CustomListItem', Name: '' }, repo);
        it('should return a CustomListItem type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.CustomListItem);
        });
    });
    describe('#Memo', () => {
        const task = new ContentInternal<Memo>({ Id: 1, Type: 'Memo', Name: '' }, repo);
        it('should return a Memo type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Memo);
        });
    });
    describe('#ContentLink', () => {
        const task = new ContentInternal<ContentLink>({ Id: 1, Type: 'ContentLink', Name: '' }, repo);
        it('should return a ContentLink type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.ContentLink);
        });
    });
    describe('#Group', () => {
        const task = new ContentInternal<Group>({ Id: 1, Type: 'Group', Name: '' }, repo);
        it('should return a Group type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Group);
        });
    });
    describe('#Query', () => {
        const task = new ContentInternal<Query>({ Id: 1, Type: 'Query', Name: '' }, repo);
        it('should return a Query type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.Query);
        });
    });
    describe('#User', () => {
        const task = new ContentInternal<User>({ Id: 1, Type: 'User', Name: '', LoginName: '', Email: '', FullName: '', Password: '' }, repo);
        it('should return a User type object', () => {
            expect(task).to.be.an.instanceof(ContentTypes.User);
        });
    });
});