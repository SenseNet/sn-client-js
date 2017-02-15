///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { ContentTypes, CreateContent } from '../src/ContentTypes';
import { Fields } from '../src/Fields';
import * as Chai from 'chai';
import * as sinon from 'sinon';
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
    describe('#ADFolder', function(){
        const gc = new ContentTypes.ADFolder({ Id: 1, Type: 'ADFolder', Name: '' });
        it('should return a ADFolder type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ADFolder);
        });
    });
    describe('#ArticleSection', function(){
        const gc = new ContentTypes.ArticleSection({ Id: 1, Type: 'ArticleSection', Name: '' });
        it('should return a ArticleSection type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ArticleSection);
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
    describe('#EventList', function(){
        const gc = new ContentTypes.EventList({ Id: 1, Type: 'EventList', Name: '' });
        it('should return a EventList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.EventList);
        });
    });
    describe('#Form', function(){
        const gc = new ContentTypes.Form({ Id: 1, Type: 'Form', Name: '' });
        it('should return a Form type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Form);
        });
    });
    describe('#EventRegistrationForm', function(){
        const gc = new ContentTypes.EventRegistrationForm({ Id: 1, Type: 'EventRegistrationForm', Name: '' });
        it('should return a EventRegistrationForm type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.EventRegistrationForm);
        });
    });
    describe('#ForumTopic', function(){
        const gc = new ContentTypes.ForumTopic({ Id: 1, Type: 'ForumTopic', Name: '' });
        it('should return a ForumTopic type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ForumTopic);
        });
    });
    describe('#LinkList', function(){
        const gc = new ContentTypes.LinkList({ Id: 1, Type: 'LinkList', Name: '' });
        it('should return a LinkList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.LinkList);
        });
    });
    describe('#MemoList', function(){
        const gc = new ContentTypes.MemoList({ Id: 1, Type: 'MemoList', Name: '' });
        it('should return a MemoList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.MemoList);
        });
    });
    describe('#Survey', function(){
        const gc = new ContentTypes.Survey({ Id: 1, Type: 'Survey', Name: '' });
        it('should return a Survey type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Survey);
        });
    });
    describe('#Voting', function(){
        const gc = new ContentTypes.Voting({ Id: 1, Type: 'Voting', Name: '' });
        it('should return a Voting type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Voting);
        });
    });
    describe('#SurveyList', function(){
        const gc = new ContentTypes.SurveyList({ Id: 1, Type: 'SurveyList', Name: '' });
        it('should return a SurveyList type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.SurveyList);
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
    describe('#Blog', function(){
        const gc = new ContentTypes.Blog({ Id: 1, Type: 'Blog', Name: '', IsActive: false });
        it('should return a Blog type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Blog);
        });
    });
    describe('#DocumentWorkspace', function(){
        const gc = new ContentTypes.DocumentWorkspace({ Id: 1, Type: 'DocumentWorkspace', Name: '', IsActive: false });
        it('should return a DocumentWorkspace type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.DocumentWorkspace);
        });
    });
    describe('#ProjectWorkspace', function(){
        const gc = new ContentTypes.ProjectWorkspace({ Id: 1, Type: 'ProjectWorkspace', Name: '', IsActive: false });
        it('should return a ProjectWorkspace type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ProjectWorkspace);
        });
    });
    describe('#SalesWorkspace', function(){
        const gc = new ContentTypes.SalesWorkspace({ Id: 1, Type: 'SalesWorkspace', Name: '', IsActive: false });
        it('should return a SalesWorkspace type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.SalesWorkspace);
        });
    });
    describe('#Site', function(){
        const gc = new ContentTypes.Site({ Id: 1, Type: 'Site', Name: '', IsActive: false });
        it('should return a Site type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Site);
        });
    });
    describe('#TeamWorkspace', function(){
        const gc = new ContentTypes.TeamWorkspace({ Id: 1, Type: 'TeamWorkspace', Name: '', IsActive: false });
        it('should return a TeamWorkspace type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.TeamWorkspace);
        });
    });
    describe('#TrashBin', function(){
        const gc = new ContentTypes.TrashBin({ Id: 1, Type: 'TrashBin', Name: '', IsActive: false });
        it('should return a TrashBin type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.TrashBin);
        });
    });
    describe('#Wiki', function(){
        const gc = new ContentTypes.Wiki({ Id: 1, Type: 'Wiki', Name: '', IsActive: false });
        it('should return a Wiki type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Wiki);
        });
    });
    describe('#SmartFolder', function(){
        const gc = new ContentTypes.SmartFolder({ Id: 1, Type: 'SmartFolder', Name: '' });
        it('should return a SmartFolder type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.SmartFolder);
        });
    });
    describe('#ContentRotator', function(){
        const gc = new ContentTypes.ContentRotator({ Id: 1, Type: 'ContentRotator', Name: '' });
        it('should return a ContentRotator type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ContentRotator);
        });
    });
    describe('#ContentViews', function(){
        const gc = new ContentTypes.ContentViews({ Id: 1, Type: 'ContentViews', Name: '' });
        it('should return a ContentViews type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.ContentViews);
        });
    });
    describe('#Device', function(){
        const gc = new ContentTypes.Device({ Id: 1, Type: 'Device', Name: '' });
        it('should return a Device type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.Device);
        });
    });
    describe('#DiscussionForum', function(){
        const gc = new ContentTypes.DiscussionForum({ Id: 1, Type: 'DiscussionForum', Name: '' });
        it('should return a DiscussionForum type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.DiscussionForum);
        });
    });
    describe('#DocumentWorkspaceFolder', function(){
        const gc = new ContentTypes.DocumentWorkspaceFolder({ Id: 1, Type: 'DocumentWorkspaceFolder', Name: '' });
        it('should return a DocumentWorkspaceFolder type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.DocumentWorkspaceFolder);
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
    describe('#Article', function(){
        const article = new ContentTypes.Article({ Id: 1, Type: 'Article', Name: '' });
        it('should return a Article type object', function(){
            expect(article).to.be.an.instanceof(ContentTypes.Article);
        });
    });
    describe('#Email', function(){
        const content = new ContentTypes.Email({ Id: 1, Type: 'Email', Name: '' });
        it('should return a Email type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Email);
        });
    });
    describe('#ExpenseClaim', function(){
        const content = new ContentTypes.ExpenseClaim({ Id: 1, Type: 'ExpenseClaim', Name: '' });
        it('should return a ExpenseClaim type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ExpenseClaim);
        });
    });
    describe('#FieldControlTemplates', function(){
        const content = new ContentTypes.FieldControlTemplates({ Id: 1, Type: 'FieldControlTemplates', Name: '' });
        it('should return a FieldControlTemplates type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.FieldControlTemplates);
        });
    });
    describe('#KPIDatasource', function(){
        const content = new ContentTypes.KPIDatasource({ Id: 1, Type: 'KPIDatasource', Name: '' });
        it('should return a KPIDatasource type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.KPIDatasource);
        });
    });
    describe('#KPIDatasources', function(){
        const content = new ContentTypes.KPIDatasources({ Id: 1, Type: 'KPIDatasources', Name: '' });
        it('should return a KPIDatasources type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.KPIDatasources);
        });
    });
    describe('#OrganizationalUnit', function(){
        const content = new ContentTypes.OrganizationalUnit({ Id: 1, Type: 'OrganizationalUnit', Name: '' });
        it('should return a OrganizationalUnit type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.OrganizationalUnit);
        });
    });
    describe('#OtherWorkspaceFolder', function(){
        const content = new ContentTypes.OtherWorkspaceFolder({ Id: 1, Type: 'OtherWorkspaceFolder', Name: '' });
        it('should return a OtherWorkspaceFolder type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.OtherWorkspaceFolder);
        });
    });
    describe('#PortalRoot', function(){
        const content = new ContentTypes.PortalRoot({ Id: 1, Type: 'PortalRoot', Name: '' });
        it('should return a PortalRoot type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.PortalRoot);
        });
    });
    describe('#PortletCategory', function(){
        const content = new ContentTypes.PortletCategory({ Id: 1, Type: 'PortletCategory', Name: '' });
        it('should return a PortletCategory type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.PortletCategory);
        });
    });
    describe('#SystemFolder', function(){
        const content = new ContentTypes.SystemFolder({ Id: 1, Type: 'SystemFolder', Name: '' });
        it('should return a SystemFolder type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.SystemFolder);
        });
    });
    describe('#Portlets', function(){
        const content = new ContentTypes.Portlets({ Id: 1, Type: 'Portlets', Name: '' });
        it('should return a Portlets type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Portlets);
        });
    });
    describe('#Resources', function(){
        const content = new ContentTypes.Resources({ Id: 1, Type: 'Resources', Name: '' });
        it('should return a Resources type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Resources);
        });
    });
    describe('#Skin', function(){
        const content = new ContentTypes.Skin({ Id: 1, Type: 'Skin', Name: '' });
        it('should return a Skin type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Skin);
        });
    });
    describe('#Skins', function(){
        const content = new ContentTypes.Skins({ Id: 1, Type: 'Skins', Name: '' });
        it('should return a Skins type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Skins);
        });
    });
    describe('#Skins', function(){
        const content = new ContentTypes.Skins({ Id: 1, Type: 'Skins', Name: '' });
        it('should return a Skins type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Skins);
        });
    });
    describe('#Posts', function(){
        const content = new ContentTypes.Posts({ Id: 1, Type: 'Posts', Name: '' });
        it('should return a Posts type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Posts);
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
    describe('#ProjectWorkspaceFolder', function(){
        const content = new ContentTypes.ProjectWorkspaceFolder({ Id: 1, Type: 'ProjectWorkspaceFolder', Name: '' });
        it('should return a ProjectWorkspaceFolder type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ProjectWorkspaceFolder);
        });
    });
    describe('#RuntimeContentContainer', function(){
        const content = new ContentTypes.RuntimeContentContainer({ Id: 1, Type: 'RuntimeContentContainer', Name: '' });
        it('should return a RuntimeContentContainer type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.RuntimeContentContainer);
        });
    });
    describe('#SalesWorkspaceFolder', function(){
        const content = new ContentTypes.SalesWorkspaceFolder({ Id: 1, Type: 'SalesWorkspaceFolder', Name: '' });
        it('should return a SalesWorkspaceFolder type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.SalesWorkspaceFolder);
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
    describe('#ADSettings', function(){
        const content = new ContentTypes.ADSettings({ Id: 1, Type: 'ADSettings', Name: '' });
        it('should return a ADSettings type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ADSettings);
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
    // describe('#ApplicationCacheFile', function(){
    //     const content = new ContentTypes.ApplicationCacheFile({ Id: 1, Type: 'ApplicationCacheFile', Name: '' });
    //     it('should return a ApplicationCacheFile type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.ApplicationCacheFile);
    //     });
    // });
    describe('#MasterPage', function(){
        const content = new ContentTypes.MasterPage({ Id: 1, Type: 'MasterPage', Name: '' });
        it('should return a MasterPage type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.MasterPage);
        });
    });
    describe('#PageTemplate', function(){
        const content = new ContentTypes.PageTemplate({ Id: 1, Type: 'PageTemplate', Name: '' });
        it('should return a PageTemplate type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.PageTemplate);
        });
    });
    describe('#Resource', function(){
        const content = new ContentTypes.Resource({ Id: 1, Type: 'Resource', Name: '' });
        it('should return a Resource type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Resource);
        });
    });
    describe('#ContentView', function(){
        const content = new ContentTypes.ContentView({ Id: 1, Type: 'ContentView', Name: '' });
        it('should return a ContentView type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ContentView);
        });
    });
    describe('#Contract', function(){
        const content = new ContentTypes.Contract({ Id: 1, Type: 'Contract', Name: '' });
        it('should return a Contract type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Contract);
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
    describe('#FieldControlTemplate', function(){
        const content = new ContentTypes.FieldControlTemplate({ Id: 1, Type: 'FieldControlTemplate', Name: '' });
        it('should return a FieldControlTemplate type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.FieldControlTemplate);
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
    describe('#UserControl', function(){
        const content = new ContentTypes.UserControl({ Id: 1, Type: 'UserControl', Name: '' });
        it('should return a UserControl type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.UserControl);
        });
    });
    describe('#UserProfile', function(){
        const content = new ContentTypes.UserProfile({ Id: 1, Type: 'UserProfile', Name: '', IsActive: false });
        it('should return a UserProfile type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.UserProfile);
        });
    });
    describe('#ViewBase', function(){
        const content = new ContentTypes.ViewBase({ Id: 1, Type: 'ViewBase', Name: '' });
        it('should return a ViewBase type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ViewBase);
        });
    });
    describe('#ListView', function(){
        const content = new ContentTypes.ListView({ Id: 1, Type: 'ListView', Name: '' });
        it('should return a ListView type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ListView);
        });
    });
    describe('#OrderForm', function(){
        const content = new ContentTypes.OrderForm({ Id: 1, Type: 'OrderForm', Name: '' });
        it('should return a OrderForm type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.OrderForm);
        });
    });
    describe('#Video', function(){
        const content = new ContentTypes.Video({ Id: 1, Type: 'Video', Name: '' });
        it('should return a Video type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Video);
        });
    });
    describe('#WorkflowDefinition', function(){
        const content = new ContentTypes.WorkflowDefinition({ Id: 1, Type: 'WorkflowDefinition', Name: '' });
        it('should return a WorkflowDefinition type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.WorkflowDefinition);
        });
    });
    // describe('#Application', function(){
    //     const content = new ContentTypes.Application({ Id: 1, Type: 'Application', Name: '' });
    //     it('should return a Application type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.Application);
    //     });
    // });
    // describe('#ApplicationOverride', function(){
    //     const content = new ContentTypes.ApplicationOverride({ Id: 1, Type: 'ApplicationOverride', Name: '' });
    //     it('should return a ApplicationOverride type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.ApplicationOverride);
    //     });
    // });
    // describe('#BackupIndexHandler', function(){
    //     const content = new ContentTypes.BackupIndexHandler({ Id: 1, Type: 'BackupIndexHandler', Name: '' });
    //     it('should return a BackupIndexHandler type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.BackupIndexHandler);
    //     });
    // });
    // describe('#CaptchaImageApplication', function(){
    //     const content = new ContentTypes.CaptchaImageApplication({ Id: 1, Type: 'CaptchaImageApplication', Name: '' });
    //     it('should return a CaptchaImageApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.CaptchaImageApplication);
    //     });
    // });
    // describe('#ExportToCsvApplication', function(){
    //     const content = new ContentTypes.ExportToCsvApplication({ Id: 1, Type: 'ExportToCsvApplication', Name: '' });
    //     it('should return a ExportToCsvApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.ExportToCsvApplication);
    //     });
    // });
    // describe('#GenericODataApplication', function(){
    //     const content = new ContentTypes.GenericODataApplication({ Id: 1, Type: 'GenericODataApplication', Name: '' });
    //     it('should return a GenericODataApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.GenericODataApplication);
    //     });
    // });
    // describe('#GoogleSitemap', function(){
    //     const content = new ContentTypes.GoogleSitemap({ Id: 1, Type: 'GoogleSitemap', Name: '' });
    //     it('should return a GoogleSitemap type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.GoogleSitemap);
    //     });
    // });
    // describe('#HttpEndpointDemoContent', function(){
    //     const content = new ContentTypes.HttpEndpointDemoContent({ Id: 1, Type: 'HttpEndpointDemoContent', Name: '' });
    //     it('should return a HttpEndpointDemoContent type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.HttpEndpointDemoContent);
    //     });
    // });
    // describe('#HttpHandlerApplication', function(){
    //     const content = new ContentTypes.HttpHandlerApplication({ Id: 1, Type: 'HttpHandlerApplication', Name: '' });
    //     it('should return a HttpHandlerApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.HttpHandlerApplication);
    //     });
    // });
    // describe('#HttpStatusApplication', function(){
    //     const content = new ContentTypes.HttpStatusApplication({ Id: 1, Type: 'HttpStatusApplication', Name: '', StatusCode: 404 });
    //     it('should return a HttpStatusApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.HttpStatusApplication);
    //     });
    // });
    // describe('#ImgResizeApplication', function(){
    //     const content = new ContentTypes.ImgResizeApplication({ Id: 1, Type: 'ImgResizeApplication', Name: '' });
    //     it('should return a ImgResizeApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.ImgResizeApplication);
    //     });
    // });
    // describe('#Webform', function(){
    //     const content = new ContentTypes.Webform({ Id: 1, Type: 'Webform', Name: '' });
    //     it('should return a Webform type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.Webform);
    //     });
    // });
    // describe('#Page', function(){
    //     const content = new ContentTypes.Page({ Id: 1, Type: 'Page', Name: '' });
    //     it('should return a Page type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.Page);
    //     });
    // });
    // describe('#RssApplication', function(){
    //     const content = new ContentTypes.RssApplication({ Id: 1, Type: 'RssApplication', Name: '' });
    //     it('should return a RssApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.RssApplication);
    //     });
    // });
    // describe('#WebServiceApplication', function(){
    //     const content = new ContentTypes.WebServiceApplication({ Id: 1, Type: 'WebServiceApplication', Name: '' });
    //     it('should return a WebServiceApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.WebServiceApplication);
    //     });
    // });
    // describe('#XsltApplication', function(){
    //     const content = new ContentTypes.XsltApplication({ Id: 1, Type: 'XsltApplication', Name: '' });
    //     it('should return a XsltApplication type object', function(){
    //         expect(content).to.be.an.instanceof(ContentTypes.XsltApplication);
    //     });
    // });
    describe('#Workflow', function(){
        const content = new ContentTypes.Workflow({ Id: 1, Type: 'Workflow', Name: '' });
        it('should return a Workflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Workflow);
        });
    });
    describe('#ApprovalWorkflow', function(){
        const content = new ContentTypes.ApprovalWorkflow({ Id: 1, Type: 'ApprovalWorkflow', Name: '', FirstLevelTimeFrame: '1', FirstLevelApprover: new Fields.DeferredObject()  });
        it('should return a ApprovalWorkflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ApprovalWorkflow);
        });
    });
    describe('#DocumentPreviewWorkflow', function(){
        const content = new ContentTypes.DocumentPreviewWorkflow({ Id: 1, Type: 'DocumentPreviewWorkflow', Name: '' });
        it('should return a DocumentPreviewWorkflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.DocumentPreviewWorkflow);
        });
    });
    describe('#ExpenseClaimWorkflow', function(){
        const content = new ContentTypes.ExpenseClaimWorkflow({ Id: 1, Type: 'ExpenseClaimWorkflow', Name: '', BudgetLimit: 1000, CEO: new Fields.DeferredObject() });
        it('should return a ExpenseClaimWorkflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ExpenseClaimWorkflow);
        });
    });
    describe('#ForgottenPasswordWorkflow', function(){
        const content = new ContentTypes.ForgottenPasswordWorkflow({ Id: 1, Type: 'ForgottenPasswordWorkflow', Name: '', EmailForPassword: '' });
        it('should return a ForgottenPasswordWorkflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ForgottenPasswordWorkflow);
        });
    });
    describe('#MailProcessorWorkflow', function(){
        const content = new ContentTypes.MailProcessorWorkflow({ Id: 1, Type: 'MailProcessorWorkflow', Name: '' });
        it('should return a MailProcessorWorkflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.MailProcessorWorkflow);
        });
    });
    describe('#RegistrationWorkflow', function(){
        const content = new ContentTypes.RegistrationWorkflow({ Id: 1, Type: 'RegistrationWorkflow', Name: '', UserName: 'alba', Email: '', InitialPassword: '' });
        it('should return a RegistrationWorkflow type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.RegistrationWorkflow);
        });
    });
    describe('#ListItem', function(){
        const content = new ContentTypes.ListItem({ Id: 1, Type: 'ListItem', Name: '' });
        it('should return a ListItem type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ListItem);
        });
    });
    describe('#ApprovalWorkflowTask', function(){
        const content = new ContentTypes.ApprovalWorkflowTask({ Id: 1, Type: 'Task', Name: '', Comment: '', DueDate: new Date('2020-01-01') });
        it('should return a ApprovalWorkflowTask type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.ApprovalWorkflowTask);
        });
    });
    describe('#Task', function(){
        const task = new ContentTypes.Task({ Id: 1, Type: 'Task', Name: '', DueDate: new Date('2020-01-01') });
        it('should return a Task type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Task);
        });
    });
    describe('#ExpenseClaimWorkflowTask', function(){
        const task = new ContentTypes.ExpenseClaimWorkflowTask({ Id: 1, Type: 'ExpenseClaimWorkflowTask', Name: '', Comment: '', DueDate: new Date('2020-01-01') });
        it('should return a ExpenseClaimWorkflowTask type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.ExpenseClaimWorkflowTask);
        });
    });
    describe('#WebContent', function(){
        const task = new ContentTypes.WebContent({ Id: 1, Type: 'WebContent', Name: '' });
        it('should return a WebContent type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.WebContent);
        });
    });
    describe('#HTMLContent', function(){
        const task = new ContentTypes.HTMLContent({ Id: 1, Type: 'HTMLContent', Name: '' });
        it('should return a HTMLContent type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.HTMLContent);
        });
    });
    describe('#WebContentDemo', function(){
        const task = new ContentTypes.WebContentDemo({ Id: 1, Type: 'WebContentDemo', Name: '' });
        it('should return a WebContentDemo type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.WebContentDemo);
        });
    });
    describe('#BlogPost', function(){
        const task = new ContentTypes.BlogPost({ Id: 1, Type: 'BlogPost', Name: '', LeadingText: '', PublishedOn: new Date('2020-10-10') });
        it('should return a BlogPost type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.BlogPost);
        });
    });
    describe('#CalendarEvent', function(){
        const task = new ContentTypes.CalendarEvent({ Id: 1, Type: 'CalendarEvent', Name: '', StartDate: new Date('2020-10-10'), EndDate: new Date('2020-10-11')  });
        it('should return a CalendarEvent type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.CalendarEvent);
        });
    });
    describe('#Car', function(){
        const task = new ContentTypes.Car({ Id: 1, Type: 'Car', Name: '' });
        it('should return a Car type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Car);
        });
    });
    describe('#Comment', function(){
        const task = new ContentTypes.Comment({ Id: 1, Type: 'Comment', Name: '' });
        it('should return a Comment type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Comment);
        });
    });
    describe('#ConfirmationItem', function(){
        const task = new ContentTypes.ConfirmationItem({ Id: 1, Type: 'ConfirmationItem', Name: '' });
        it('should return a ConfirmationItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.ConfirmationItem);
        });
    });
    describe('#CustomListItem', function(){
        const task = new ContentTypes.CustomListItem({ Id: 1, Type: 'CustomListItem', Name: '' });
        it('should return a CustomListItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.CustomListItem);
        });
    });
    describe('#FormItem', function(){
        const task = new ContentTypes.FormItem({ Id: 1, Type: 'FormItem', Name: '' });
        it('should return a FormItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.FormItem);
        });
    });
    describe('#EventRegistrationFormItem', function(){
        const task = new ContentTypes.EventRegistrationFormItem({ Id: 1, Type: 'EventRegistrationFormItem', Name: '', Email: '', GuestNumber: 0 });
        it('should return a EventRegistrationFormItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.EventRegistrationFormItem);
        });
    });
    describe('#ExpenseClaimItem', function(){
        const task = new ContentTypes.ExpenseClaimItem({ Id: 1, Type: 'ExpenseClaimItem', Name: '' });
        it('should return a ExpenseClaimItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.ExpenseClaimItem);
        });
    });
    describe('#ForumEntry', function(){
        const task = new ContentTypes.ForumEntry({ Id: 1, Type: 'ForumEntry', Name: '' });
        it('should return a ForumEntry type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.ForumEntry);
        });
    });
    describe('#Like', function(){
        const task = new ContentTypes.Like({ Id: 1, Type: 'Like', Name: '' });
        it('should return a Like type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Like);
        });
    });
    describe('#Link', function(){
        const task = new ContentTypes.Link({ Id: 1, Type: 'Link', Name: '' });
        it('should return a Link type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Link);
        });
    });
    describe('#Memo', function(){
        const task = new ContentTypes.Memo({ Id: 1, Type: 'Memo', Name: '' });
        it('should return a Memo type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Memo);
        });
    });
    describe('#Portlet', function(){
        const task = new ContentTypes.Portlet({ Id: 1, Type: 'Portlet', Name: '' });
        it('should return a Portlet type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Portlet);
        });
    });
    describe('#Post', function(){
        const task = new ContentTypes.Post({ Id: 1, Type: 'Post', Name: '' });
        it('should return a Post type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Post);
        });
    });
    describe('#SliderItem', function(){
        const task = new ContentTypes.SliderItem({ Id: 1, Type: 'SliderItem', Name: '' });
        it('should return a SliderItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.SliderItem);
        });
    });
    describe('#SurveyItem', function(){
        const task = new ContentTypes.SurveyItem({ Id: 1, Type: 'SurveyItem', Name: '' });
        it('should return a SurveyItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.SurveyItem);
        });
    });
    describe('#SurveyListItem', function(){
        const task = new ContentTypes.SurveyListItem({ Id: 1, Type: 'SurveyListItem', Name: '' });
        it('should return a SurveyListItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.SurveyListItem);
        });
    });
    describe('#VotingItem', function(){
        const task = new ContentTypes.VotingItem({ Id: 1, Type: 'VotingItem', Name: '' });
        it('should return a VotingItem type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.VotingItem);
        });
    });
    // describe('#FieldSettingContent', function(){
    //     const task = new ContentTypes.FieldSettingContent({ Id: 1, Type: 'FieldSettingContent', Name: '' });
    //     it('should return a FieldSettingContent type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.FieldSettingContent);
    //     });
    // });
    // describe('#BinaryFieldSetting', function(){
    //     const task = new ContentTypes.BinaryFieldSetting({ Id: 1, Type: 'BinaryFieldSetting', Name: '' });
    //     it('should return a BinaryFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.BinaryFieldSetting);
    //     });
    // });
    // describe('#TextFieldSetting', function(){
    //     const task = new ContentTypes.TextFieldSetting({ Id: 1, Type: 'TextFieldSetting', Name: '' });
    //     it('should return a TextFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.TextFieldSetting);
    //     });
    // });
    // describe('#ShortTextFieldSetting', function(){
    //     const task = new ContentTypes.ShortTextFieldSetting({ Id: 1, Type: 'ShortTextFieldSetting', Name: '' });
    //     it('should return a ShortTextFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.ShortTextFieldSetting);
    //     });
    // });
    // describe('#ChoiceFieldSetting', function(){
    //     const task = new ContentTypes.ChoiceFieldSetting({ Id: 1, Type: 'ChoiceFieldSetting', Name: '' });
    //     it('should return a ChoiceFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.ChoiceFieldSetting);
    //     });
    // });
    // describe('#PermissionChoiceFieldSetting', function(){
    //     const task = new ContentTypes.PermissionChoiceFieldSetting({ Id: 1, Type: 'PermissionChoiceFieldSetting', Name: '' });
    //     it('should return a PermissionChoiceFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.PermissionChoiceFieldSetting);
    //     });
    // });
    // describe('#YesNoFieldSetting', function(){
    //     const task = new ContentTypes.YesNoFieldSetting({ Id: 1, Type: 'YesNoFieldSetting', Name: '' });
    //     it('should return a YesNoFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.YesNoFieldSetting);
    //     });
    // });
    // describe('#PasswordFieldSetting', function(){
    //     const task = new ContentTypes.PasswordFieldSetting({ Id: 1, Type: 'PasswordFieldSetting', Name: '' });
    //     it('should return a PasswordFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.PasswordFieldSetting);
    //     });
    // });
    // describe('#LongTextFieldSetting', function(){
    //     const task = new ContentTypes.LongTextFieldSetting({ Id: 1, Type: 'LongTextFieldSetting', Name: '' });
    //     it('should return a LongTextFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.LongTextFieldSetting);
    //     });
    // });
    // describe('#NumberFieldSetting', function(){
    //     const task = new ContentTypes.NumberFieldSetting({ Id: 1, Type: 'NumberFieldSetting', Name: '' });
    //     it('should return a NumberFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.NumberFieldSetting);
    //     });
    // });
    // describe('#CurrencyFieldSetting', function(){
    //     const task = new ContentTypes.CurrencyFieldSetting({ Id: 1, Type: 'CurrencyFieldSetting', Name: '' });
    //     it('should return a CurrencyFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.CurrencyFieldSetting);
    //     });
    // });
    // describe('#DateTimeFieldSetting', function(){
    //     const task = new ContentTypes.DateTimeFieldSetting({ Id: 1, Type: 'DateTimeFieldSetting', Name: '' });
    //     it('should return a DateTimeFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.DateTimeFieldSetting);
    //     });
    // });
    // describe('#HyperLinkFieldSetting', function(){
    //     const task = new ContentTypes.HyperLinkFieldSetting({ Id: 1, Type: 'HyperLinkFieldSetting', Name: '' });
    //     it('should return a HyperLinkFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.HyperLinkFieldSetting);
    //     });
    // });
    // describe('#IntegerFieldSetting', function(){
    //     const task = new ContentTypes.IntegerFieldSetting({ Id: 1, Type: 'IntegerFieldSetting', Name: '' });
    //     it('should return a IntegerFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.IntegerFieldSetting);
    //     });
    // });
    // describe('#NullFieldSetting', function(){
    //     const task = new ContentTypes.NullFieldSetting({ Id: 1, Type: 'NullFieldSetting', Name: '' });
    //     it('should return a NullFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.NullFieldSetting);
    //     });
    // });
    // describe('#PageBreakFieldSetting', function(){
    //     const task = new ContentTypes.PageBreakFieldSetting({ Id: 1, Type: 'PageBreakFieldSetting', Name: '' });
    //     it('should return a PageBreakFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.PageBreakFieldSetting);
    //     });
    // });
    // describe('#ReferenceFieldSetting', function(){
    //     const task = new ContentTypes.ReferenceFieldSetting({ Id: 1, Type: 'ReferenceFieldSetting', Name: '' });
    //     it('should return a ReferenceFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.ReferenceFieldSetting);
    //     });
    // });
    // describe('#XmlFieldSetting', function(){
    //     const task = new ContentTypes.XmlFieldSetting({ Id: 1, Type: 'XmlFieldSetting', Name: '' });
    //     it('should return a XmlFieldSetting type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.XmlFieldSetting);
    //     });
    // });
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
    describe('#NotificationConfig', function(){
        const task = new ContentTypes.NotificationConfig({ Id: 1, Type: 'NotificationConfig', Name: '' });
        it('should return a NotificationConfig type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.NotificationConfig);
        });
    });
    describe('#PublicRegistrationConfig', function(){
        const task = new ContentTypes.PublicRegistrationConfig({ Id: 1, Type: 'PublicRegistrationConfig', Name: '' });
        it('should return a PublicRegistrationConfig type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.PublicRegistrationConfig);
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
    describe('#RegisteredUser', function(){
        const task = new ContentTypes.RegisteredUser({ Id: 1, Type: 'RegisteredUser', Name: '', LoginName: '', Email: '', FullName: '', Password: '' });
        it('should return a RegisteredUser type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.RegisteredUser);
        });
    });
    describe('#Subscription', function(){
        const task = new ContentTypes.Subscription({ Id: 1, Type: 'Subscription', Name: '' });
        it('should return a Subscription type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Subscription);
        });
    });
    describe('#Tag', function(){
        const task = new ContentTypes.Tag({ Id: 1, Type: 'Tag', Name: '' });
        it('should return a Tag type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Tag);
        });
    });
    describe('#Tag', function(){
        const task = new ContentTypes.Tag({ Id: 1, Type: 'Tag', Name: '' });
        it('should return a Tag type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Tag);
        });
    });
    describe('#UserSearch', function(){
        const task = new ContentTypes.UserSearch({ Id: 1, Type: 'UserSearch', Name: '' });
        it('should return a UserSearch type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.UserSearch);
        });
    });
    describe('#WikiArticle', function(){
        const task = new ContentTypes.WikiArticle({ Id: 1, Type: 'WikiArticle', Name: '' });
        it('should return a WikiArticle type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.WikiArticle);
        });
    });
    // describe('#JournalNode', function(){
    //     const task = new ContentTypes.JournalNode({ Id: 1, Type: 'JournalNode', Name: '' });
    //     it('should return a JournalNode type object', function(){
    //         expect(task).to.be.an.instanceof(ContentTypes.JournalNode);
    //     });
    // });
    describe('#CreateContent', function(){
        const content = CreateContent('Article');
        it('should return a Article type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Article);
        });
    });
});