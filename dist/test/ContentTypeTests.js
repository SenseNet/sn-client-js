"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContentTypes_1 = require("../src/ContentTypes");
const Fields_1 = require("../src/Fields");
const Chai = require("chai");
const expect = Chai.expect;
describe('ContentTypes', () => {
    describe('#ContentType', function () {
        const gc = new ContentTypes_1.ContentTypes.ContentType({ Id: 1, Type: 'ContentType', Name: '' });
        it('should return a ContentType type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentType);
        });
    });
    describe('#GenericContent', function () {
        const gc = new ContentTypes_1.ContentTypes.GenericContent({ Id: 1, Type: 'GenericContent', Name: '' });
        it('should return a GenericContent type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.GenericContent);
        });
    });
    describe('#Folder', function () {
        const gc = new ContentTypes_1.ContentTypes.Folder({ Id: 1, Type: 'Folder', Name: '' });
        it('should return a Folder type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Folder);
        });
    });
    describe('#ADFolder', function () {
        const gc = new ContentTypes_1.ContentTypes.ADFolder({ Id: 1, Type: 'ADFolder', Name: '' });
        it('should return a ADFolder type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ADFolder);
        });
    });
    describe('#ArticleSection', function () {
        const gc = new ContentTypes_1.ContentTypes.ArticleSection({ Id: 1, Type: 'ArticleSection', Name: '' });
        it('should return a ArticleSection type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ArticleSection);
        });
    });
    describe('#ContentList', function () {
        const gc = new ContentTypes_1.ContentTypes.ContentList({ Id: 1, Type: 'ContentList', Name: '' });
        it('should return a ContentList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentList);
        });
    });
    describe('#Aspect', function () {
        const gc = new ContentTypes_1.ContentTypes.Aspect({ Id: 1, Type: 'Aspect', Name: '' });
        it('should return a Aspect type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Aspect);
        });
    });
    describe('#ItemList', function () {
        const gc = new ContentTypes_1.ContentTypes.ItemList({ Id: 1, Type: 'ItemList', Name: '' });
        it('should return a ItemList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ItemList);
        });
    });
    describe('#CustomList', function () {
        const gc = new ContentTypes_1.ContentTypes.CustomList({ Id: 1, Type: 'CustomList', Name: '' });
        it('should return a CustomList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.CustomList);
        });
    });
    describe('#EventList', function () {
        const gc = new ContentTypes_1.ContentTypes.EventList({ Id: 1, Type: 'EventList', Name: '' });
        it('should return a EventList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.EventList);
        });
    });
    describe('#Form', function () {
        const gc = new ContentTypes_1.ContentTypes.Form({ Id: 1, Type: 'Form', Name: '' });
        it('should return a Form type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Form);
        });
    });
    describe('#EventRegistrationForm', function () {
        const gc = new ContentTypes_1.ContentTypes.EventRegistrationForm({ Id: 1, Type: 'EventRegistrationForm', Name: '' });
        it('should return a EventRegistrationForm type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.EventRegistrationForm);
        });
    });
    describe('#ForumTopic', function () {
        const gc = new ContentTypes_1.ContentTypes.ForumTopic({ Id: 1, Type: 'ForumTopic', Name: '' });
        it('should return a ForumTopic type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ForumTopic);
        });
    });
    describe('#LinkList', function () {
        const gc = new ContentTypes_1.ContentTypes.LinkList({ Id: 1, Type: 'LinkList', Name: '' });
        it('should return a LinkList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.LinkList);
        });
    });
    describe('#MemoList', function () {
        const gc = new ContentTypes_1.ContentTypes.MemoList({ Id: 1, Type: 'MemoList', Name: '' });
        it('should return a MemoList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.MemoList);
        });
    });
    describe('#Survey', function () {
        const gc = new ContentTypes_1.ContentTypes.Survey({ Id: 1, Type: 'Survey', Name: '' });
        it('should return a Survey type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Survey);
        });
    });
    describe('#Voting', function () {
        const gc = new ContentTypes_1.ContentTypes.Voting({ Id: 1, Type: 'Voting', Name: '' });
        it('should return a Voting type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Voting);
        });
    });
    describe('#SurveyList', function () {
        const gc = new ContentTypes_1.ContentTypes.SurveyList({ Id: 1, Type: 'SurveyList', Name: '' });
        it('should return a SurveyList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.SurveyList);
        });
    });
    describe('#TaskList', function () {
        const gc = new ContentTypes_1.ContentTypes.TaskList({ Id: 1, Type: 'TaskList', Name: '' });
        it('should return a TaskList type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.TaskList);
        });
    });
    describe('#Library', function () {
        const gc = new ContentTypes_1.ContentTypes.Library({ Id: 1, Type: 'Library', Name: '' });
        it('should return a Library type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Library);
        });
    });
    describe('#DocumentLibrary', function () {
        const gc = new ContentTypes_1.ContentTypes.DocumentLibrary({ Id: 1, Type: 'DocumentLibrary', Name: '' });
        it('should return a DocumentLibrary type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.DocumentLibrary);
        });
    });
    describe('#ImageLibrary', function () {
        const gc = new ContentTypes_1.ContentTypes.ImageLibrary({ Id: 1, Type: 'ImageLibrary', Name: '' });
        it('should return a ImageLibrary type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ImageLibrary);
        });
    });
    describe('#Workspace', function () {
        const gc = new ContentTypes_1.ContentTypes.Workspace({ Id: 1, Type: 'Workspace', Name: '', IsActive: false });
        it('should return a Workspace type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Workspace);
        });
    });
    describe('#Blog', function () {
        const gc = new ContentTypes_1.ContentTypes.Blog({ Id: 1, Type: 'Blog', Name: '', IsActive: false });
        it('should return a Blog type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Blog);
        });
    });
    describe('#DocumentWorkspace', function () {
        const gc = new ContentTypes_1.ContentTypes.DocumentWorkspace({ Id: 1, Type: 'DocumentWorkspace', Name: '', IsActive: false });
        it('should return a DocumentWorkspace type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.DocumentWorkspace);
        });
    });
    describe('#ProjectWorkspace', function () {
        const gc = new ContentTypes_1.ContentTypes.ProjectWorkspace({ Id: 1, Type: 'ProjectWorkspace', Name: '', IsActive: false });
        it('should return a ProjectWorkspace type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ProjectWorkspace);
        });
    });
    describe('#SalesWorkspace', function () {
        const gc = new ContentTypes_1.ContentTypes.SalesWorkspace({ Id: 1, Type: 'SalesWorkspace', Name: '', IsActive: false });
        it('should return a SalesWorkspace type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.SalesWorkspace);
        });
    });
    describe('#Site', function () {
        const gc = new ContentTypes_1.ContentTypes.Site({ Id: 1, Type: 'Site', Name: '', IsActive: false });
        it('should return a Site type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Site);
        });
    });
    describe('#TeamWorkspace', function () {
        const gc = new ContentTypes_1.ContentTypes.TeamWorkspace({ Id: 1, Type: 'TeamWorkspace', Name: '', IsActive: false });
        it('should return a TeamWorkspace type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.TeamWorkspace);
        });
    });
    describe('#TrashBin', function () {
        const gc = new ContentTypes_1.ContentTypes.TrashBin({ Id: 1, Type: 'TrashBin', Name: '', IsActive: false });
        it('should return a TrashBin type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.TrashBin);
        });
    });
    describe('#Wiki', function () {
        const gc = new ContentTypes_1.ContentTypes.Wiki({ Id: 1, Type: 'Wiki', Name: '', IsActive: false });
        it('should return a Wiki type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Wiki);
        });
    });
    describe('#SmartFolder', function () {
        const gc = new ContentTypes_1.ContentTypes.SmartFolder({ Id: 1, Type: 'SmartFolder', Name: '' });
        it('should return a SmartFolder type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.SmartFolder);
        });
    });
    describe('#ContentRotator', function () {
        const gc = new ContentTypes_1.ContentTypes.ContentRotator({ Id: 1, Type: 'ContentRotator', Name: '' });
        it('should return a ContentRotator type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentRotator);
        });
    });
    describe('#ContentViews', function () {
        const gc = new ContentTypes_1.ContentTypes.ContentViews({ Id: 1, Type: 'ContentViews', Name: '' });
        it('should return a ContentViews type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentViews);
        });
    });
    describe('#Device', function () {
        const gc = new ContentTypes_1.ContentTypes.Device({ Id: 1, Type: 'Device', Name: '' });
        it('should return a Device type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Device);
        });
    });
    describe('#DiscussionForum', function () {
        const gc = new ContentTypes_1.ContentTypes.DiscussionForum({ Id: 1, Type: 'DiscussionForum', Name: '' });
        it('should return a DiscussionForum type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.DiscussionForum);
        });
    });
    describe('#DocumentWorkspaceFolder', function () {
        const gc = new ContentTypes_1.ContentTypes.DocumentWorkspaceFolder({ Id: 1, Type: 'DocumentWorkspaceFolder', Name: '' });
        it('should return a DocumentWorkspaceFolder type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.DocumentWorkspaceFolder);
        });
    });
    describe('#Domain', function () {
        const gc = new ContentTypes_1.ContentTypes.Domain({ Id: 1, Type: 'Domain', Name: '' });
        it('should return a Domain type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Domain);
        });
    });
    describe('#Domains', function () {
        const gc = new ContentTypes_1.ContentTypes.Domains({ Id: 1, Type: 'Domains', Name: '' });
        it('should return a Domains type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.Domains);
        });
    });
    describe('#Article', function () {
        const article = new ContentTypes_1.ContentTypes.Article({ Id: 1, Type: 'Article', Name: '' });
        it('should return a Article type object', function () {
            expect(article).to.be.an.instanceof(ContentTypes_1.ContentTypes.Article);
        });
    });
    describe('#Email', function () {
        const content = new ContentTypes_1.ContentTypes.Email({ Id: 1, Type: 'Email', Name: '' });
        it('should return a Email type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Email);
        });
    });
    describe('#ExpenseClaim', function () {
        const content = new ContentTypes_1.ContentTypes.ExpenseClaim({ Id: 1, Type: 'ExpenseClaim', Name: '' });
        it('should return a ExpenseClaim type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ExpenseClaim);
        });
    });
    describe('#FieldControlTemplates', function () {
        const content = new ContentTypes_1.ContentTypes.FieldControlTemplates({ Id: 1, Type: 'FieldControlTemplates', Name: '' });
        it('should return a FieldControlTemplates type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.FieldControlTemplates);
        });
    });
    describe('#KPIDatasource', function () {
        const content = new ContentTypes_1.ContentTypes.KPIDatasource({ Id: 1, Type: 'KPIDatasource', Name: '' });
        it('should return a KPIDatasource type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.KPIDatasource);
        });
    });
    describe('#KPIDatasources', function () {
        const content = new ContentTypes_1.ContentTypes.KPIDatasources({ Id: 1, Type: 'KPIDatasources', Name: '' });
        it('should return a KPIDatasources type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.KPIDatasources);
        });
    });
    describe('#OrganizationalUnit', function () {
        const content = new ContentTypes_1.ContentTypes.OrganizationalUnit({ Id: 1, Type: 'OrganizationalUnit', Name: '' });
        it('should return a OrganizationalUnit type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.OrganizationalUnit);
        });
    });
    describe('#OtherWorkspaceFolder', function () {
        const content = new ContentTypes_1.ContentTypes.OtherWorkspaceFolder({ Id: 1, Type: 'OtherWorkspaceFolder', Name: '' });
        it('should return a OtherWorkspaceFolder type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.OtherWorkspaceFolder);
        });
    });
    describe('#PortalRoot', function () {
        const content = new ContentTypes_1.ContentTypes.PortalRoot({ Id: 1, Type: 'PortalRoot', Name: '' });
        it('should return a PortalRoot type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PortalRoot);
        });
    });
    describe('#PortletCategory', function () {
        const content = new ContentTypes_1.ContentTypes.PortletCategory({ Id: 1, Type: 'PortletCategory', Name: '' });
        it('should return a PortletCategory type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PortletCategory);
        });
    });
    describe('#SystemFolder', function () {
        const content = new ContentTypes_1.ContentTypes.SystemFolder({ Id: 1, Type: 'SystemFolder', Name: '' });
        it('should return a SystemFolder type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.SystemFolder);
        });
    });
    describe('#Portlets', function () {
        const content = new ContentTypes_1.ContentTypes.Portlets({ Id: 1, Type: 'Portlets', Name: '' });
        it('should return a Portlets type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Portlets);
        });
    });
    describe('#Resources', function () {
        const content = new ContentTypes_1.ContentTypes.Resources({ Id: 1, Type: 'Resources', Name: '' });
        it('should return a Resources type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Resources);
        });
    });
    describe('#Skin', function () {
        const content = new ContentTypes_1.ContentTypes.Skin({ Id: 1, Type: 'Skin', Name: '' });
        it('should return a Skin type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Skin);
        });
    });
    describe('#Skins', function () {
        const content = new ContentTypes_1.ContentTypes.Skins({ Id: 1, Type: 'Skins', Name: '' });
        it('should return a Skins type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Skins);
        });
    });
    describe('#Skins', function () {
        const content = new ContentTypes_1.ContentTypes.Skins({ Id: 1, Type: 'Skins', Name: '' });
        it('should return a Skins type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Skins);
        });
    });
    describe('#Posts', function () {
        const content = new ContentTypes_1.ContentTypes.Posts({ Id: 1, Type: 'Posts', Name: '' });
        it('should return a Posts type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Posts);
        });
    });
    describe('#ProfileDomain', function () {
        const content = new ContentTypes_1.ContentTypes.ProfileDomain({ Id: 1, Type: 'ProfileDomain', Name: '' });
        it('should return a ProfileDomain type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ProfileDomain);
        });
    });
    describe('#Profiles', function () {
        const content = new ContentTypes_1.ContentTypes.Profiles({ Id: 1, Type: 'Profiles', Name: '' });
        it('should return a Profiles type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Profiles);
        });
    });
    describe('#ProjectWorkspaceFolder', function () {
        const content = new ContentTypes_1.ContentTypes.ProjectWorkspaceFolder({ Id: 1, Type: 'ProjectWorkspaceFolder', Name: '' });
        it('should return a ProjectWorkspaceFolder type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ProjectWorkspaceFolder);
        });
    });
    describe('#RuntimeContentContainer', function () {
        const content = new ContentTypes_1.ContentTypes.RuntimeContentContainer({ Id: 1, Type: 'RuntimeContentContainer', Name: '' });
        it('should return a RuntimeContentContainer type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.RuntimeContentContainer);
        });
    });
    describe('#SalesWorkspaceFolder', function () {
        const content = new ContentTypes_1.ContentTypes.SalesWorkspaceFolder({ Id: 1, Type: 'SalesWorkspaceFolder', Name: '' });
        it('should return a SalesWorkspaceFolder type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.SalesWorkspaceFolder);
        });
    });
    describe('#Sites', function () {
        const content = new ContentTypes_1.ContentTypes.Sites({ Id: 1, Type: 'Sites', Name: '' });
        it('should return a Sites type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Sites);
        });
    });
    describe('#TrashBag', function () {
        const content = new ContentTypes_1.ContentTypes.TrashBag({ Id: 1, Type: 'TrashBag', Name: '' });
        it('should return a TrashBag type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.TrashBag);
        });
    });
    describe('#File', function () {
        const content = new ContentTypes_1.ContentTypes.File({ Id: 1, Type: 'File', Name: '' });
        it('should return a File type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.File);
        });
    });
    describe('#Settings', function () {
        const content = new ContentTypes_1.ContentTypes.Settings({ Id: 1, Type: 'Settings', Name: '' });
        it('should return a Settings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Settings);
        });
    });
    describe('#ADSettings', function () {
        const content = new ContentTypes_1.ContentTypes.ADSettings({ Id: 1, Type: 'ADSettings', Name: '' });
        it('should return a ADSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ADSettings);
        });
    });
    describe('#IndexingSettings', function () {
        const content = new ContentTypes_1.ContentTypes.IndexingSettings({ Id: 1, Type: 'IndexingSettings', Name: '' });
        it('should return a IndexingSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.IndexingSettings);
        });
    });
    describe('#LoggingSettings', function () {
        const content = new ContentTypes_1.ContentTypes.LoggingSettings({ Id: 1, Type: 'LoggingSettings', Name: '' });
        it('should return a LoggingSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.LoggingSettings);
        });
    });
    describe('#PortalSettings', function () {
        const content = new ContentTypes_1.ContentTypes.PortalSettings({ Id: 1, Type: 'PortalSettings', Name: '' });
        it('should return a PortalSettings type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PortalSettings);
        });
    });
    describe('#SystemFile', function () {
        const content = new ContentTypes_1.ContentTypes.SystemFile({ Id: 1, Type: 'SystemFile', Name: '' });
        it('should return a SystemFile type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.SystemFile);
        });
    });
    describe('#MasterPage', function () {
        const content = new ContentTypes_1.ContentTypes.MasterPage({ Id: 1, Type: 'MasterPage', Name: '' });
        it('should return a MasterPage type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.MasterPage);
        });
    });
    describe('#PageTemplate', function () {
        const content = new ContentTypes_1.ContentTypes.PageTemplate({ Id: 1, Type: 'PageTemplate', Name: '' });
        it('should return a PageTemplate type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PageTemplate);
        });
    });
    describe('#Resource', function () {
        const content = new ContentTypes_1.ContentTypes.Resource({ Id: 1, Type: 'Resource', Name: '' });
        it('should return a Resource type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Resource);
        });
    });
    describe('#ContentView', function () {
        const content = new ContentTypes_1.ContentTypes.ContentView({ Id: 1, Type: 'ContentView', Name: '' });
        it('should return a ContentView type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentView);
        });
    });
    describe('#Contract', function () {
        const content = new ContentTypes_1.ContentTypes.Contract({ Id: 1, Type: 'Contract', Name: '' });
        it('should return a Contract type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Contract);
        });
    });
    describe('#DynamicJsonContent', function () {
        const content = new ContentTypes_1.ContentTypes.DynamicJsonContent({ Id: 1, Type: 'DynamicJsonContent', Name: '' });
        it('should return a DynamicJsonContent type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.DynamicJsonContent);
        });
    });
    describe('#ExecutableFile', function () {
        const content = new ContentTypes_1.ContentTypes.ExecutableFile({ Id: 1, Type: 'ExecutableFile', Name: '' });
        it('should return a ExecutableFile type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ExecutableFile);
        });
    });
    describe('#FieldControlTemplate', function () {
        const content = new ContentTypes_1.ContentTypes.FieldControlTemplate({ Id: 1, Type: 'FieldControlTemplate', Name: '' });
        it('should return a FieldControlTemplate type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.FieldControlTemplate);
        });
    });
    describe('#HtmlTemplate', function () {
        const content = new ContentTypes_1.ContentTypes.HtmlTemplate({ Id: 1, Type: 'HtmlTemplate', Name: '' });
        it('should return a HtmlTemplate type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.HtmlTemplate);
        });
    });
    describe('#Image', function () {
        const content = new ContentTypes_1.ContentTypes.Image({ Id: 1, Type: 'Image', Name: '' });
        it('should return a Image type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Image);
        });
    });
    describe('#PreviewImage', function () {
        const content = new ContentTypes_1.ContentTypes.PreviewImage({ Id: 1, Type: 'PreviewImage', Name: '' });
        it('should return a PreviewImage type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.PreviewImage);
        });
    });
    describe('#UserControl', function () {
        const content = new ContentTypes_1.ContentTypes.UserControl({ Id: 1, Type: 'UserControl', Name: '' });
        it('should return a UserControl type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.UserControl);
        });
    });
    describe('#UserProfile', function () {
        const content = new ContentTypes_1.ContentTypes.UserProfile({ Id: 1, Type: 'UserProfile', Name: '', IsActive: false });
        it('should return a UserProfile type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.UserProfile);
        });
    });
    describe('#ViewBase', function () {
        const content = new ContentTypes_1.ContentTypes.ViewBase({ Id: 1, Type: 'ViewBase', Name: '' });
        it('should return a ViewBase type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ViewBase);
        });
    });
    describe('#ListView', function () {
        const content = new ContentTypes_1.ContentTypes.ListView({ Id: 1, Type: 'ListView', Name: '' });
        it('should return a ListView type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ListView);
        });
    });
    describe('#OrderForm', function () {
        const content = new ContentTypes_1.ContentTypes.OrderForm({ Id: 1, Type: 'OrderForm', Name: '' });
        it('should return a OrderForm type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.OrderForm);
        });
    });
    describe('#Video', function () {
        const content = new ContentTypes_1.ContentTypes.Video({ Id: 1, Type: 'Video', Name: '' });
        it('should return a Video type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Video);
        });
    });
    describe('#WorkflowDefinition', function () {
        const content = new ContentTypes_1.ContentTypes.WorkflowDefinition({ Id: 1, Type: 'WorkflowDefinition', Name: '' });
        it('should return a WorkflowDefinition type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.WorkflowDefinition);
        });
    });
    describe('#Workflow', function () {
        const content = new ContentTypes_1.ContentTypes.Workflow({ Id: 1, Type: 'Workflow', Name: '' });
        it('should return a Workflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Workflow);
        });
    });
    describe('#ApprovalWorkflow', function () {
        const content = new ContentTypes_1.ContentTypes.ApprovalWorkflow({ Id: 1, Type: 'ApprovalWorkflow', Name: '', FirstLevelTimeFrame: '1', FirstLevelApprover: new Fields_1.Fields.DeferredObject() });
        it('should return a ApprovalWorkflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ApprovalWorkflow);
        });
    });
    describe('#DocumentPreviewWorkflow', function () {
        const content = new ContentTypes_1.ContentTypes.DocumentPreviewWorkflow({ Id: 1, Type: 'DocumentPreviewWorkflow', Name: '' });
        it('should return a DocumentPreviewWorkflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.DocumentPreviewWorkflow);
        });
    });
    describe('#ExpenseClaimWorkflow', function () {
        const content = new ContentTypes_1.ContentTypes.ExpenseClaimWorkflow({ Id: 1, Type: 'ExpenseClaimWorkflow', Name: '', BudgetLimit: 1000, CEO: new Fields_1.Fields.DeferredObject() });
        it('should return a ExpenseClaimWorkflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ExpenseClaimWorkflow);
        });
    });
    describe('#ForgottenPasswordWorkflow', function () {
        const content = new ContentTypes_1.ContentTypes.ForgottenPasswordWorkflow({ Id: 1, Type: 'ForgottenPasswordWorkflow', Name: '', EmailForPassword: '' });
        it('should return a ForgottenPasswordWorkflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ForgottenPasswordWorkflow);
        });
    });
    describe('#MailProcessorWorkflow', function () {
        const content = new ContentTypes_1.ContentTypes.MailProcessorWorkflow({ Id: 1, Type: 'MailProcessorWorkflow', Name: '' });
        it('should return a MailProcessorWorkflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.MailProcessorWorkflow);
        });
    });
    describe('#RegistrationWorkflow', function () {
        const content = new ContentTypes_1.ContentTypes.RegistrationWorkflow({ Id: 1, Type: 'RegistrationWorkflow', Name: '', UserName: 'alba', Email: '', InitialPassword: '' });
        it('should return a RegistrationWorkflow type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.RegistrationWorkflow);
        });
    });
    describe('#ListItem', function () {
        const content = new ContentTypes_1.ContentTypes.ListItem({ Id: 1, Type: 'ListItem', Name: '' });
        it('should return a ListItem type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ListItem);
        });
    });
    describe('#ApprovalWorkflowTask', function () {
        const content = new ContentTypes_1.ContentTypes.ApprovalWorkflowTask({ Id: 1, Type: 'Task', Name: '', Comment: '', DueDate: new Date('2020-01-01') });
        it('should return a ApprovalWorkflowTask type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.ApprovalWorkflowTask);
        });
    });
    describe('#Task', function () {
        const task = new ContentTypes_1.ContentTypes.Task({ Id: 1, Type: 'Task', Name: '', DueDate: new Date('2020-01-01') });
        it('should return a Task type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Task);
        });
    });
    describe('#ExpenseClaimWorkflowTask', function () {
        const task = new ContentTypes_1.ContentTypes.ExpenseClaimWorkflowTask({ Id: 1, Type: 'ExpenseClaimWorkflowTask', Name: '', Comment: '', DueDate: new Date('2020-01-01') });
        it('should return a ExpenseClaimWorkflowTask type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.ExpenseClaimWorkflowTask);
        });
    });
    describe('#WebContent', function () {
        const task = new ContentTypes_1.ContentTypes.WebContent({ Id: 1, Type: 'WebContent', Name: '' });
        it('should return a WebContent type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.WebContent);
        });
    });
    describe('#HTMLContent', function () {
        const task = new ContentTypes_1.ContentTypes.HTMLContent({ Id: 1, Type: 'HTMLContent', Name: '' });
        it('should return a HTMLContent type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.HTMLContent);
        });
    });
    describe('#WebContentDemo', function () {
        const task = new ContentTypes_1.ContentTypes.WebContentDemo({ Id: 1, Type: 'WebContentDemo', Name: '' });
        it('should return a WebContentDemo type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.WebContentDemo);
        });
    });
    describe('#BlogPost', function () {
        const task = new ContentTypes_1.ContentTypes.BlogPost({ Id: 1, Type: 'BlogPost', Name: '', LeadingText: '', PublishedOn: new Date('2020-10-10') });
        it('should return a BlogPost type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.BlogPost);
        });
    });
    describe('#CalendarEvent', function () {
        const task = new ContentTypes_1.ContentTypes.CalendarEvent({ Id: 1, Type: 'CalendarEvent', Name: '', StartDate: new Date('2020-10-10'), EndDate: new Date('2020-10-11') });
        it('should return a CalendarEvent type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.CalendarEvent);
        });
    });
    describe('#Car', function () {
        const task = new ContentTypes_1.ContentTypes.Car({ Id: 1, Type: 'Car', Name: '' });
        it('should return a Car type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Car);
        });
    });
    describe('#Comment', function () {
        const task = new ContentTypes_1.ContentTypes.Comment({ Id: 1, Type: 'Comment', Name: '' });
        it('should return a Comment type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Comment);
        });
    });
    describe('#ConfirmationItem', function () {
        const task = new ContentTypes_1.ContentTypes.ConfirmationItem({ Id: 1, Type: 'ConfirmationItem', Name: '' });
        it('should return a ConfirmationItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.ConfirmationItem);
        });
    });
    describe('#CustomListItem', function () {
        const task = new ContentTypes_1.ContentTypes.CustomListItem({ Id: 1, Type: 'CustomListItem', Name: '' });
        it('should return a CustomListItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.CustomListItem);
        });
    });
    describe('#FormItem', function () {
        const task = new ContentTypes_1.ContentTypes.FormItem({ Id: 1, Type: 'FormItem', Name: '' });
        it('should return a FormItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.FormItem);
        });
    });
    describe('#EventRegistrationFormItem', function () {
        const task = new ContentTypes_1.ContentTypes.EventRegistrationFormItem({ Id: 1, Type: 'EventRegistrationFormItem', Name: '', Email: '', GuestNumber: 0 });
        it('should return a EventRegistrationFormItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.EventRegistrationFormItem);
        });
    });
    describe('#ExpenseClaimItem', function () {
        const task = new ContentTypes_1.ContentTypes.ExpenseClaimItem({ Id: 1, Type: 'ExpenseClaimItem', Name: '' });
        it('should return a ExpenseClaimItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.ExpenseClaimItem);
        });
    });
    describe('#ForumEntry', function () {
        const task = new ContentTypes_1.ContentTypes.ForumEntry({ Id: 1, Type: 'ForumEntry', Name: '' });
        it('should return a ForumEntry type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.ForumEntry);
        });
    });
    describe('#Like', function () {
        const task = new ContentTypes_1.ContentTypes.Like({ Id: 1, Type: 'Like', Name: '' });
        it('should return a Like type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Like);
        });
    });
    describe('#Link', function () {
        const task = new ContentTypes_1.ContentTypes.Link({ Id: 1, Type: 'Link', Name: '' });
        it('should return a Link type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Link);
        });
    });
    describe('#Memo', function () {
        const task = new ContentTypes_1.ContentTypes.Memo({ Id: 1, Type: 'Memo', Name: '' });
        it('should return a Memo type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Memo);
        });
    });
    describe('#Portlet', function () {
        const task = new ContentTypes_1.ContentTypes.Portlet({ Id: 1, Type: 'Portlet', Name: '' });
        it('should return a Portlet type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Portlet);
        });
    });
    describe('#Post', function () {
        const task = new ContentTypes_1.ContentTypes.Post({ Id: 1, Type: 'Post', Name: '' });
        it('should return a Post type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Post);
        });
    });
    describe('#SliderItem', function () {
        const task = new ContentTypes_1.ContentTypes.SliderItem({ Id: 1, Type: 'SliderItem', Name: '' });
        it('should return a SliderItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.SliderItem);
        });
    });
    describe('#SurveyItem', function () {
        const task = new ContentTypes_1.ContentTypes.SurveyItem({ Id: 1, Type: 'SurveyItem', Name: '' });
        it('should return a SurveyItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.SurveyItem);
        });
    });
    describe('#SurveyListItem', function () {
        const task = new ContentTypes_1.ContentTypes.SurveyListItem({ Id: 1, Type: 'SurveyListItem', Name: '' });
        it('should return a SurveyListItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.SurveyListItem);
        });
    });
    describe('#VotingItem', function () {
        const task = new ContentTypes_1.ContentTypes.VotingItem({ Id: 1, Type: 'VotingItem', Name: '' });
        it('should return a VotingItem type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.VotingItem);
        });
    });
    describe('#ContentLink', function () {
        const task = new ContentTypes_1.ContentTypes.ContentLink({ Id: 1, Type: 'ContentLink', Name: '' });
        it('should return a ContentLink type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.ContentLink);
        });
    });
    describe('#Group', function () {
        const task = new ContentTypes_1.ContentTypes.Group({ Id: 1, Type: 'Group', Name: '' });
        it('should return a Group type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Group);
        });
    });
    describe('#NotificationConfig', function () {
        const task = new ContentTypes_1.ContentTypes.NotificationConfig({ Id: 1, Type: 'NotificationConfig', Name: '' });
        it('should return a NotificationConfig type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.NotificationConfig);
        });
    });
    describe('#PublicRegistrationConfig', function () {
        const task = new ContentTypes_1.ContentTypes.PublicRegistrationConfig({ Id: 1, Type: 'PublicRegistrationConfig', Name: '' });
        it('should return a PublicRegistrationConfig type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.PublicRegistrationConfig);
        });
    });
    describe('#Query', function () {
        const task = new ContentTypes_1.ContentTypes.Query({ Id: 1, Type: 'Query', Name: '' });
        it('should return a Query type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Query);
        });
    });
    describe('#User', function () {
        const task = new ContentTypes_1.ContentTypes.User({ Id: 1, Type: 'User', Name: '', LoginName: '', Email: '', FullName: '', Password: '' });
        it('should return a User type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.User);
        });
    });
    describe('#RegisteredUser', function () {
        const task = new ContentTypes_1.ContentTypes.RegisteredUser({ Id: 1, Type: 'RegisteredUser', Name: '', LoginName: '', Email: '', FullName: '', Password: '' });
        it('should return a RegisteredUser type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.RegisteredUser);
        });
    });
    describe('#Subscription', function () {
        const task = new ContentTypes_1.ContentTypes.Subscription({ Id: 1, Type: 'Subscription', Name: '' });
        it('should return a Subscription type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Subscription);
        });
    });
    describe('#Tag', function () {
        const task = new ContentTypes_1.ContentTypes.Tag({ Id: 1, Type: 'Tag', Name: '' });
        it('should return a Tag type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Tag);
        });
    });
    describe('#Tag', function () {
        const task = new ContentTypes_1.ContentTypes.Tag({ Id: 1, Type: 'Tag', Name: '' });
        it('should return a Tag type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Tag);
        });
    });
    describe('#UserSearch', function () {
        const task = new ContentTypes_1.ContentTypes.UserSearch({ Id: 1, Type: 'UserSearch', Name: '' });
        it('should return a UserSearch type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.UserSearch);
        });
    });
    describe('#WikiArticle', function () {
        const task = new ContentTypes_1.ContentTypes.WikiArticle({ Id: 1, Type: 'WikiArticle', Name: '' });
        it('should return a WikiArticle type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.WikiArticle);
        });
    });
    describe('#CreateContent', function () {
        const content = ContentTypes_1.CreateContent('Article');
        it('should return a Article type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Article);
        });
    });
});

//# sourceMappingURL=ContentTypeTests.js.map
