"use strict";
const Content_1 = require('./Content');
var ContentTypes;
(function (ContentTypes) {
    class ContentType extends Content_1.Content {
        constructor(options) {
            super(options);
            this.Id = options.Id;
            this.ParentId = options.ParentId;
            this.VersionId = options.VersionId;
            this.Type = options.Type;
            this.Name = options.Name;
            this.CreatedById = options.CreatedById;
            this.ModifiedById = options.ModifiedById;
            this.Version = options.Version;
            this.Path = options.Path;
            this.Depth = options.Depth;
            this.IsSystemContent = options.IsSystemContent;
            this.HandlerName = options.HandlerName;
            this.ParentTypeName = options.ParentTypeName;
            this.DisplayName = options.DisplayName;
            this.Description = options.Description;
            this.Icon = options.Icon;
            this.Binary = options.Binary;
            this.CreatedBy = options.CreatedBy;
            this.CreationDate = options.CreationDate;
            this.ModifiedBy = options.ModifiedBy;
            this.ModificationDate = options.ModificationDate;
            this.EnableLifespan = options.EnableLifespan;
        }
    }
    ContentTypes.ContentType = ContentType;
    class GenericContent extends Content_1.Content {
        constructor(options) {
            super(options);
            this.Id = options.Id;
            this.ParentId = options.ParentId;
            this.OwnerId = options.OwnerId;
            this.Owner = options.Owner;
            this.VersionId = options.VersionId;
            this.Type = options.Type;
            this.Icon = options.Icon;
            this.Name = options.Name;
            this.CreatedById = options.CreatedById;
            this.ModifiedById = options.ModifiedById;
            this.Version = options.Version;
            this.Path = options.Path;
            this.Depth = options.Depth;
            this.IsSystemContent = options.IsSystemContent;
            this.IsFolder = options.IsFolder;
            this.DisplayName = options.DisplayName;
            this.Description = options.Description;
            this.Hidden = options.Hidden;
            this.Index = options.Index;
            this.EnableLifespan = options.EnableLifespan;
            this.ValidFrom = options.ValidFrom;
            this.ValidTill = options.ValidTill;
            this.AllowedChildTypes = options.AllowedChildTypes;
            this.EffectiveAllowedChildTypes = options.EffectiveAllowedChildTypes;
            this.VersioningMode = options.VersioningMode;
            this.InheritableVersioningMode = options.InheritableVersioningMode;
            this.CreatedBy = options.CreatedBy;
            this.CreationDate = options.CreationDate;
            this.ModifiedBy = options.ModifiedBy;
            this.ModificationDate = options.ModificationDate;
            this.ApprovingMode = options.ApprovingMode;
            this.InheritableApprovingMode = options.InheritableApprovingMode;
            this.Locked = options.Locked;
            this.CheckedOutTo = options.CheckedOutTo;
            this.TrashDisabled = options.TrashDisabled;
            this.SavingState = options.SavingState;
            this.ExtensionData = options.ExtensionData;
            this.BrowseApplication = options.BrowseApplication;
            this.Approvable = options.Approvable;
            this.IsTaggable = options.IsTaggable;
            this.Tags = options.Tags;
            this.IsRateable = options.IsRateable;
            this.RateStr = options.RateStr;
            this.RateAvg = options.RateAvg;
            this.RateCount = options.RateCount;
            this.Rate = options.Rate;
            this.Publishable = options.Publishable;
            this.Versions = options.Versions;
            this.CheckInComments = options.CheckInComments;
            this.RejectReason = options.RejectReason;
            this.Workspace = options.Workspace;
            this.BrowseUrl = options.BrowseUrl;
        }
    }
    ContentTypes.GenericContent = GenericContent;
    class ContentLink extends GenericContent {
        constructor(options) {
            super(options);
            this.Link = options.Link;
        }
    }
    ContentTypes.ContentLink = ContentLink;
    class File extends GenericContent {
        constructor(options) {
            super(options);
            this.Binary = options.Binary;
            this.Size = options.Size;
            this.FullSize = options.FullSize;
            this.PageCount = options.PageCount;
            this.MimeType = options.MimeType;
            this.Shapes = options.Shapes;
            this.PageAttributes = options.PageAttributes;
            this.Watermark = options.Watermark;
        }
    }
    ContentTypes.File = File;
    class ContentView extends File {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ContentView = ContentView;
    class Contract extends File {
        constructor(options) {
            super(options);
            this.ContractId = options.ContractId;
            this.Project = options.Project;
            this.Language = options.Language;
            this.Responsee = options.Responsee;
            this.Lawyer = options.Lawyer;
            this.Keywords = options.Keywords;
            this.RelatedDocs = options.RelatedDocs;
        }
    }
    ContentTypes.Contract = Contract;
    class DynamicJsonContent extends File {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.DynamicJsonContent = DynamicJsonContent;
    class ExecutableFile extends File {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ExecutableFile = ExecutableFile;
    class FieldControlTemplate extends File {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.FieldControlTemplate = FieldControlTemplate;
    class HtmlTemplate extends File {
        constructor(options) {
            super(options);
            this.TemplateText = options.TemplateText;
        }
    }
    ContentTypes.HtmlTemplate = HtmlTemplate;
    class Image extends File {
        constructor(options) {
            super(options);
            this.Keywords = options.Keywords;
            this.DateTaken = options.DateTaken;
            this.Width = options.Width;
            this.Height = options.Height;
        }
    }
    ContentTypes.Image = Image;
    class PreviewImage extends Image {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.PreviewImage = PreviewImage;
    class OrderForm extends File {
        constructor(options) {
            super(options);
            this.CompanyName = options.CompanyName;
            this.OrderFormId = options.OrderFormId;
            this.CompanySeat = options.CompanySeat;
            this.RepresentedBy = options.RepresentedBy;
            this.ContactEmailAddress = options.ContactEmailAddress;
            this.ContactPhoneNr = options.ContactPhoneNr;
        }
    }
    ContentTypes.OrderForm = OrderForm;
    class Settings extends File {
        constructor(options) {
            super(options);
            this.GlobalOnly = options.GlobalOnly;
        }
    }
    ContentTypes.Settings = Settings;
    class ADSettings extends Settings {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ADSettings = ADSettings;
    class IndexingSettings extends Settings {
        constructor(options) {
            super(options);
            this.TextExtractorInstances = options.TextExtractorInstances;
        }
    }
    ContentTypes.IndexingSettings = IndexingSettings;
    class LoggingSettings extends Settings {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.LoggingSettings = LoggingSettings;
    class PortalSettings extends Settings {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.PortalSettings = PortalSettings;
    class SystemFile extends File {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.SystemFile = SystemFile;
    class MasterPage extends SystemFile {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.MasterPage = MasterPage;
    class PageTemplate extends SystemFile {
        constructor(options) {
            super(options);
            this.MasterPageNode = options.MasterPageNode;
        }
    }
    ContentTypes.PageTemplate = PageTemplate;
    class Resource extends SystemFile {
        constructor(options) {
            super(options);
            this.Downloads = options.Downloads;
        }
    }
    ContentTypes.Resource = Resource;
    class UserControl extends File {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.UserControl = UserControl;
    class ViewBase extends UserControl {
        constructor(options) {
            super(options);
            this.IsDefault = options.IsDefault;
            this.Template = options.Template;
            this.FilterXml = options.FilterXml;
            this.EnableAutofilters = options.EnableAutofilters;
            this.EnableLifespanFilter = options.EnableLifespanFilter;
            this.QueryTop = options.QueryTop;
            this.QuerySkip = options.QuerySkip;
        }
    }
    ContentTypes.ViewBase = ViewBase;
    class ListView extends ViewBase {
        constructor(options) {
            super(options);
            this.Columns = options.Columns;
            this.SortBy = options.SortBy;
            this.GroupBy = options.GroupBy;
            this.Flat = options.Flat;
            this.MainScenario = options.MainScenario;
        }
    }
    ContentTypes.ListView = ListView;
    class Video extends File {
        constructor(options) {
            super(options);
            this.Keywords = options.Keywords;
        }
    }
    ContentTypes.Video = Video;
    class WorkflowDefinition extends File {
        constructor(options) {
            super(options);
            this.ContentWorkflow = options.ContentWorkflow;
            this.AssignableToContentList = options.AssignableToContentList;
            this.AbortOnRelatedContentChange = options.AbortOnRelatedContentChange;
            this.DeleteInstanceAfterFinished = options.DeleteInstanceAfterFinished;
        }
    }
    ContentTypes.WorkflowDefinition = WorkflowDefinition;
    class Folder extends GenericContent {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Folder = Folder;
    class ADFolder extends Folder {
        constructor(options) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }
    }
    ContentTypes.ADFolder = ADFolder;
    class ArticleSection extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ArticleSection = ArticleSection;
    class ContentList extends Folder {
        constructor(options) {
            super(options);
            this.ContentListDefinition = options.ContentListDefinition;
            this.DefaultView = options.DefaultView;
            this.AvailableViews = options.AvailableViews;
            this.FieldSettingContents = options.FieldSettingContents;
            this.AvailableContentTypeFields = options.AvailableContentTypeFields;
            this.ListEmail = options.ListEmail;
            this.ExchangeSubscriptionId = options.ExchangeSubscriptionId;
            this.OverwriteFiles = options.OverwriteFiles;
            this.GroupAttachments = options.GroupAttachments;
            this.SaveOriginalEmail = options.SaveOriginalEmail;
            this.IncomingEmailWorkflow = options.IncomingEmailWorkflow;
            this.OnlyFromLocalGroups = options.OnlyFromLocalGroups;
            this.InboxFolder = options.InboxFolder;
            this.OwnerWhenVisitor = options.OwnerWhenVisitor;
        }
    }
    ContentTypes.ContentList = ContentList;
    class Aspect extends ContentList {
        constructor(options) {
            super(options);
            this.AspectDefinition = options.AspectDefinition;
        }
    }
    ContentTypes.Aspect = Aspect;
    class ItemList extends ContentList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ItemList = ItemList;
    class CustomList extends ItemList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.CustomList = CustomList;
    class EventList extends ItemList {
        constructor(options) {
            super(options);
            this.RegistrationFolder = options.RegistrationFolder;
        }
    }
    ContentTypes.EventList = EventList;
    class Form extends ItemList {
        constructor(options) {
            super(options);
            this.TitleSubmitter = options.TitleSubmitter;
            this.AfterSubmitText = options.AfterSubmitText;
            this.EmailList = options.EmailList;
            this.EmailFrom = options.EmailFrom;
            this.EmailFromSubmitter = options.EmailFromSubmitter;
            this.EmailField = options.EmailField;
            this.EmailTemplate = options.EmailTemplate;
            this.EmailTemplateSubmitter = options.EmailTemplateSubmitter;
        }
    }
    ContentTypes.Form = Form;
    class EventRegistrationForm extends Form {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.EventRegistrationForm = EventRegistrationForm;
    class ForumTopic extends ItemList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ForumTopic = ForumTopic;
    class LinkList extends ItemList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.LinkList = LinkList;
    class MemoList extends ItemList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.MemoList = MemoList;
    class Survey extends ItemList {
        constructor(options) {
            super(options);
            this.LandingPage = options.LandingPage;
            this.PageContentView = options.PageContentView;
            this.InvalidSurveyPage = options.InvalidSurveyPage;
            this.EnableNotificationMail = options.EnableNotificationMail;
            this.SenderAddress = options.SenderAddress;
            this.Evaluators = options.Evaluators;
            this.MailTemplatePage = options.MailTemplatePage;
            this.EnableMoreFilling = options.EnableMoreFilling;
        }
    }
    ContentTypes.Survey = Survey;
    class Voting extends Survey {
        constructor(options) {
            super(options);
            this.LandingPageContentView = options.LandingPageContentView;
            this.ResultPageContentView = options.ResultPageContentView;
            this.VotingPageContentView = options.VotingPageContentView;
            this.CannotSeeResultContentView = options.CannotSeeResultContentView;
            this.IsResultVisibleBefore = options.IsResultVisibleBefore;
        }
    }
    ContentTypes.Voting = Voting;
    class SurveyList extends ItemList {
        constructor(options) {
            super(options);
            this.RawJson = options.RawJson;
            this.IntroText = options.IntroText;
            this.OutroText = options.OutroText;
            this.OutroRedirectLink = options.OutroRedirectLink;
            this.LandingPage = options.LandingPage;
            this.OnlySingleResponse = options.OnlySingleResponse;
            this.EnableNotificationMail = options.EnableNotificationMail;
            this.EmailList = options.EmailList;
            this.EmailField = options.EmailField;
            this.EmailFrom = options.EmailFrom;
            this.MailSubject = options.MailSubject;
            this.AdminEmailTemplate = options.AdminEmailTemplate;
            this.SubmitterEmailTemplate = options.SubmitterEmailTemplate;
        }
    }
    ContentTypes.SurveyList = SurveyList;
    class TaskList extends ItemList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.TaskList = TaskList;
    class Library extends ContentList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Library = Library;
    class DocumentLibrary extends Library {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.DocumentLibrary = DocumentLibrary;
    class ImageLibrary extends Library {
        constructor(options) {
            super(options);
            this.CoverImage = options.CoverImage;
        }
    }
    ContentTypes.ImageLibrary = ImageLibrary;
    class ContentViews extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ContentViews = ContentViews;
    class Device extends Folder {
        constructor(options) {
            super(options);
            this.UserAgentPattern = options.UserAgentPattern;
        }
    }
    ContentTypes.Device = Device;
    class DiscussionForum extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.DiscussionForum = DiscussionForum;
    class DocumentWorkspaceFolder extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.DocumentWorkspaceFolder = DocumentWorkspaceFolder;
    class Domain extends Folder {
        constructor(options) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }
    }
    ContentTypes.Domain = Domain;
    class Domains extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Domains = Domains;
    class Email extends Folder {
        constructor(options) {
            super(options);
            this.From = options.From;
            this.Body = options.Body;
            this.Sent = options.Sent;
        }
    }
    ContentTypes.Email = Email;
    class ExpenseClaim extends Folder {
        constructor(options) {
            super(options);
            this.Sum = options.Sum;
        }
    }
    ContentTypes.ExpenseClaim = ExpenseClaim;
    class FieldControlTemplates extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.FieldControlTemplates = FieldControlTemplates;
    class KPIDatasource extends Folder {
        constructor(options) {
            super(options);
            this.KPIData = options.KPIData;
        }
    }
    ContentTypes.KPIDatasource = KPIDatasource;
    class KPIDatasources extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.KPIDatasources = KPIDatasources;
    class OrganizationalUnit extends Folder {
        constructor(options) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }
    }
    ContentTypes.OrganizationalUnit = OrganizationalUnit;
    class OtherWorkspaceFolder extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.OtherWorkspaceFolder = OtherWorkspaceFolder;
    class PortalRoot extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.PortalRoot = PortalRoot;
    class PortletCategory extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.PortletCategory = PortletCategory;
    class Posts extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Posts = Posts;
    class ProfileDomain extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ProfileDomain = ProfileDomain;
    class Profiles extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Profiles = Profiles;
    class ProjectWorkspaceFolder extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ProjectWorkspaceFolder = ProjectWorkspaceFolder;
    class RuntimeContentContainer extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.RuntimeContentContainer = RuntimeContentContainer;
    class SalesWorkspaceFolder extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.SalesWorkspaceFolder = SalesWorkspaceFolder;
    class Sites extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Sites = Sites;
    class SmartFolder extends Folder {
        constructor(options) {
            super(options);
            this.Query = options.Query;
            this.EnableAutofilters = options.EnableAutofilters;
            this.EnableLifespanFilter = options.EnableLifespanFilter;
        }
    }
    ContentTypes.SmartFolder = SmartFolder;
    class ContentRotator extends SmartFolder {
        constructor(options) {
            super(options);
            this.SelectionMode = options.SelectionMode;
            this.OrderingMode = options.OrderingMode;
        }
    }
    ContentTypes.ContentRotator = ContentRotator;
    class SystemFolder extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.SystemFolder = SystemFolder;
    class Portlets extends SystemFolder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Portlets = Portlets;
    class Resources extends SystemFolder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Resources = Resources;
    class Skin extends SystemFolder {
        constructor(options) {
            super(options);
            this.NewSkin = options.NewSkin;
        }
    }
    ContentTypes.Skin = Skin;
    class Skins extends SystemFolder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Skins = Skins;
    class TrashBag extends Folder {
        constructor(options) {
            super(options);
            this.KeepUntil = options.KeepUntil;
            this.OriginalPath = options.OriginalPath;
            this.WorkspaceRelativePath = options.WorkspaceRelativePath;
            this.WorkspaceId = options.WorkspaceId;
            this.DeletedContent = options.DeletedContent;
        }
    }
    ContentTypes.TrashBag = TrashBag;
    class Workspace extends Folder {
        constructor(options) {
            super(options);
            this.Manager = options.Manager;
            this.Deadline = options.Deadline;
            this.IsActive = options.IsActive;
            this.WorkspaceSkin = options.WorkspaceSkin;
            this.IsCritical = options.IsCritical;
            this.IsWallContainer = options.IsWallContainer;
            this.IsFollowed = options.IsFollowed;
        }
    }
    ContentTypes.Workspace = Workspace;
    class Blog extends Workspace {
        constructor(options) {
            super(options);
            this.ShowAvatar = options.ShowAvatar;
        }
    }
    ContentTypes.Blog = Blog;
    class DocumentWorkspace extends Workspace {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.DocumentWorkspace = DocumentWorkspace;
    class ProjectWorkspace extends Workspace {
        constructor(options) {
            super(options);
            this.Completion = options.Completion;
        }
    }
    ContentTypes.ProjectWorkspace = ProjectWorkspace;
    class SalesWorkspace extends Workspace {
        constructor(options) {
            super(options);
            this.Customer = options.Customer;
            this.ExpectedRevenue = options.ExpectedRevenue;
            this.ChanceOfWinning = options.ChanceOfWinning;
            this.StartDate = options.StartDate;
            this.Contacts = options.Contacts;
            this.Notes = options.Notes;
            this.Completion = options.Completion;
            this.ContractSigned = options.ContractSigned;
            this.ContractSignedDate = options.ContractSignedDate;
        }
    }
    ContentTypes.SalesWorkspace = SalesWorkspace;
    class Site extends Workspace {
        constructor(options) {
            super(options);
            this.Language = options.Language;
            this.EnableClientBasedCulture = options.EnableClientBasedCulture;
            this.EnableUserBasedCulture = options.EnableUserBasedCulture;
            this.UrlList = options.UrlList;
            this.StartPage = options.StartPage;
            this.LoginPage = options.LoginPage;
            this.SiteSkin = options.SiteSkin;
            this.DenyCrossSiteAccess = options.DenyCrossSiteAccess;
        }
    }
    ContentTypes.Site = Site;
    class TeamWorkspace extends Workspace {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.TeamWorkspace = TeamWorkspace;
    class TrashBin extends Workspace {
        constructor(options) {
            super(options);
            this.MinRetentionTime = options.MinRetentionTime;
            this.SizeQuota = options.SizeQuota;
            this.BagCapacity = options.BagCapacity;
        }
    }
    ContentTypes.TrashBin = TrashBin;
    class UserProfile extends Workspace {
        constructor(options) {
            super(options);
            this.User = options.User;
        }
    }
    ContentTypes.UserProfile = UserProfile;
    class Wiki extends Workspace {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Wiki = Wiki;
    class Group extends GenericContent {
        constructor(options) {
            super(options);
            this.Members = options.Members;
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }
    }
    ContentTypes.Group = Group;
    class ListItem extends GenericContent {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.ListItem = ListItem;
    class BlogPost extends ListItem {
        constructor(options) {
            super(options);
            this.LeadingText = options.LeadingText;
            this.BodyText = options.BodyText;
            this.IsPublished = options.IsPublished;
            this.PublishedOn = options.PublishedOn;
        }
    }
    ContentTypes.BlogPost = BlogPost;
    class CalendarEvent extends ListItem {
        constructor(options) {
            super(options);
            this.Location = options.Location;
            this.StartDate = options.StartDate;
            this.EndDate = options.EndDate;
            this.Lead = options.Lead;
            this.AllDay = options.AllDay;
            this.EventUrl = options.EventUrl;
            this.RequiresRegistration = options.RequiresRegistration;
            this.RegistrationForm = options.RegistrationForm;
            this.OwnerEmail = options.OwnerEmail;
            this.NotificationMode = options.NotificationMode;
            this.EmailTemplate = options.EmailTemplate;
            this.EmailTemplateSubmitter = options.EmailTemplateSubmitter;
            this.EmailFrom = options.EmailFrom;
            this.EmailFromSubmitter = options.EmailFromSubmitter;
            this.EmailField = options.EmailField;
            this.MaxParticipants = options.MaxParticipants;
            this.NumParticipants = options.NumParticipants;
            this.EventType = options.EventType;
        }
    }
    ContentTypes.CalendarEvent = CalendarEvent;
    class Car extends ListItem {
        constructor(options) {
            super(options);
            this.Make = options.Make;
            this.Model = options.Model;
            this.Style = options.Style;
            this.StartingDate = options.StartingDate;
            this.Color = options.Color;
            this.EngineSize = options.EngineSize;
            this.Power = options.Power;
            this.Price = options.Price;
        }
    }
    ContentTypes.Car = Car;
    class Comment extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Comment = Comment;
    class ConfirmationItem extends ListItem {
        constructor(options) {
            super(options);
            this.Confirmed = options.Confirmed;
        }
    }
    ContentTypes.ConfirmationItem = ConfirmationItem;
    class CustomListItem extends ListItem {
        constructor(options) {
            super(options);
            this.WorkflowsRunning = options.WorkflowsRunning;
        }
    }
    ContentTypes.CustomListItem = CustomListItem;
    class ExpenseClaimItem extends ListItem {
        constructor(options) {
            super(options);
            this.Amount = options.Amount;
            this.Date = options.Date;
            this.ImageRef = options.ImageRef;
            this.ImageData = options.ImageData;
            this.ScannedImage = options.ScannedImage;
        }
    }
    ContentTypes.ExpenseClaimItem = ExpenseClaimItem;
    class FormItem extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.FormItem = FormItem;
    class EventRegistrationFormItem extends FormItem {
        constructor(options) {
            super(options);
            this.Email = options.Email;
            this.GuestNumber = options.GuestNumber;
        }
    }
    ContentTypes.EventRegistrationFormItem = EventRegistrationFormItem;
    class ForumEntry extends ListItem {
        constructor(options) {
            super(options);
            this.ReplyTo = options.ReplyTo;
            this.ReplyToNo = options.ReplyToNo;
            this.SerialNo = options.SerialNo;
            this.PostedBy = options.PostedBy;
        }
    }
    ContentTypes.ForumEntry = ForumEntry;
    class Like extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Like = Like;
    class Link extends ListItem {
        constructor(options) {
            super(options);
            this.Url = options.Url;
        }
    }
    ContentTypes.Link = Link;
    class Memo extends ListItem {
        constructor(options) {
            super(options);
            this.Date = options.Date;
            this.MemoType = options.MemoType;
            this.SeeAlso = options.SeeAlso;
        }
    }
    ContentTypes.Memo = Memo;
    class Portlet extends ListItem {
        constructor(options) {
            super(options);
            this.TypeName = options.TypeName;
            this.ImageRef = options.ImageRef;
            this.ImageData = options.ImageData;
            this.PortletImage = options.PortletImage;
        }
    }
    ContentTypes.Portlet = Portlet;
    class Post extends ListItem {
        constructor(options) {
            super(options);
            this.JournalId = options.JournalId;
            this.PostType = options.PostType;
            this.SharedContent = options.SharedContent;
            this.PostDetails = options.PostDetails;
        }
    }
    ContentTypes.Post = Post;
    class SliderItem extends ListItem {
        constructor(options) {
            super(options);
            this.Background = options.Background;
            this.YouTubeBackground = options.YouTubeBackground;
            this.VerticalAlignment = options.VerticalAlignment;
            this.HorizontalAlignment = options.HorizontalAlignment;
            this.OuterCallToActionButton = options.OuterCallToActionButton;
            this.InnerCallToActionButton = options.InnerCallToActionButton;
        }
    }
    ContentTypes.SliderItem = SliderItem;
    class SurveyItem extends ListItem {
        constructor(options) {
            super(options);
            this.EvaluatedBy = options.EvaluatedBy;
            this.EvaluatedAt = options.EvaluatedAt;
            this.Evaluation = options.Evaluation;
        }
    }
    ContentTypes.SurveyItem = SurveyItem;
    class SurveyListItem extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.SurveyListItem = SurveyListItem;
    class Task extends ListItem {
        constructor(options) {
            super(options);
            this.StartDate = options.StartDate;
            this.DueDate = options.DueDate;
            this.AssignedTo = options.AssignedTo;
            this.Priority = options.Priority;
            this.Status = options.Status;
            this.TaskCompletion = options.TaskCompletion;
            this.RemainingDays = options.RemainingDays;
            this.DueText = options.DueText;
            this.DueCssClass = options.DueCssClass;
        }
    }
    ContentTypes.Task = Task;
    class ApprovalWorkflowTask extends Task {
        constructor(options) {
            super(options);
            this.Comment = options.Comment;
            this.Result = options.Result;
            this.ContentToApprove = options.ContentToApprove;
        }
    }
    ContentTypes.ApprovalWorkflowTask = ApprovalWorkflowTask;
    class ExpenseClaimWorkflowTask extends ApprovalWorkflowTask {
        constructor(options) {
            super(options);
            this.Reason = options.Reason;
            this.ExpenseClaim = options.ExpenseClaim;
            this.Sum = options.Sum;
        }
    }
    ContentTypes.ExpenseClaimWorkflowTask = ExpenseClaimWorkflowTask;
    class VotingItem extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.VotingItem = VotingItem;
    class WebContent extends ListItem {
        constructor(options) {
            super(options);
            this.ReviewDate = options.ReviewDate;
            this.ArchiveDate = options.ArchiveDate;
        }
    }
    ContentTypes.WebContent = WebContent;
    class Article extends WebContent {
        constructor(options) {
            super(options);
            this.Subtitle = options.Subtitle;
            this.Lead = options.Lead;
            this.Body = options.Body;
            this.Pinned = options.Pinned;
            this.Keywords = options.Keywords;
            this.Author = options.Author;
            this.ImageRef = options.ImageRef;
            this.ImageData = options.ImageData;
            this.Image = options.Image;
        }
    }
    ContentTypes.Article = Article;
    class HTMLContent extends WebContent {
        constructor(options) {
            super(options);
            this.HTMLFragment = options.HTMLFragment;
        }
    }
    ContentTypes.HTMLContent = HTMLContent;
    class WebContentDemo extends WebContent {
        constructor(options) {
            super(options);
            this.Subtitle = options.Subtitle;
            this.RelatedImage = options.RelatedImage;
            this.Header = options.Header;
            this.Body = options.Body;
            this.Details = options.Details;
            this.Language = options.Language;
            this.Keywords = options.Keywords;
            this.Author = options.Author;
        }
    }
    ContentTypes.WebContentDemo = WebContentDemo;
    class NotificationConfig extends GenericContent {
        constructor(options) {
            super(options);
            this.Subject = options.Subject;
            this.Body = options.Body;
            this.SenderAddress = options.SenderAddress;
        }
    }
    ContentTypes.NotificationConfig = NotificationConfig;
    class PublicRegistrationConfig extends GenericContent {
        constructor(options) {
            super(options);
            this.SecurityGroups = options.SecurityGroups;
            this.DefaultDomainPath = options.DefaultDomainPath;
            this.UserTypeName = options.UserTypeName;
            this.DuplicateErrorMessage = options.DuplicateErrorMessage;
            this.IsBodyHtml = options.IsBodyHtml;
            this.ActivationEnabled = options.ActivationEnabled;
            this.ActivationEmailTemplate = options.ActivationEmailTemplate;
            this.ActivationSuccessTemplate = options.ActivationSuccessTemplate;
            this.AlreadyActivatedMessage = options.AlreadyActivatedMessage;
            this.MailSubjectTemplate = options.MailSubjectTemplate;
            this.MailFrom = options.MailFrom;
            this.AdminEmailAddress = options.AdminEmailAddress;
            this.RegistrationSuccessTemplate = options.RegistrationSuccessTemplate;
            this.ResetPasswordTemplate = options.ResetPasswordTemplate;
            this.ResetPasswordSubjectTemplate = options.ResetPasswordSubjectTemplate;
            this.ResetPasswordSuccessfulTemplate = options.ResetPasswordSuccessfulTemplate;
            this.ChangePasswordUserInterfacePath = options.ChangePasswordUserInterfacePath;
            this.ChangePasswordSuccessfulMessage = options.ChangePasswordSuccessfulMessage;
            this.ForgottenPasswordUserInterfacePath = options.ForgottenPasswordUserInterfacePath;
            this.NewRegistrationContentView = options.NewRegistrationContentView;
            this.EditProfileContentView = options.EditProfileContentView;
            this.AutoGeneratePassword = options.AutoGeneratePassword;
            this.DisableCreatedUser = options.DisableCreatedUser;
            this.IsUniqueEmail = options.IsUniqueEmail;
            this.AutomaticLogon = options.AutomaticLogon;
            this.ChangePasswordPagePath = options.ChangePasswordPagePath;
            this.ChangePasswordRestrictedText = options.ChangePasswordRestrictedText;
            this.AlreadyRegisteredUserMessage = options.AlreadyRegisteredUserMessage;
            this.UpdateProfileSuccessTemplate = options.UpdateProfileSuccessTemplate;
            this.EmailNotValid = options.EmailNotValid;
            this.NoEmailGiven = options.NoEmailGiven;
            this.ActivateByAdmin = options.ActivateByAdmin;
            this.ActivateEmailSubject = options.ActivateEmailSubject;
            this.ActivateEmailTemplate = options.ActivateEmailTemplate;
            this.ActivateAdmins = options.ActivateAdmins;
        }
    }
    ContentTypes.PublicRegistrationConfig = PublicRegistrationConfig;
    class Query extends GenericContent {
        constructor(options) {
            super(options);
            this.Query = options.Query;
            this.QueryType = options.QueryType;
        }
    }
    ContentTypes.Query = Query;
    class Subscription extends GenericContent {
        constructor(options) {
            super(options);
            this.ContentPath = options.ContentPath;
            this.UserPath = options.UserPath;
            this.UserEmail = options.UserEmail;
            this.UserId = options.UserId;
            this.UserName = options.UserName;
            this.IsActive = options.IsActive;
            this.Frequency = options.Frequency;
            this.Language = options.Language;
        }
    }
    ContentTypes.Subscription = Subscription;
    class Tag extends GenericContent {
        constructor(options) {
            super(options);
            this.Description2 = options.Description2;
            this.BlackListPath = options.BlackListPath;
        }
    }
    ContentTypes.Tag = Tag;
    class User extends GenericContent {
        constructor(options) {
            super(options);
            this.LoginName = options.LoginName;
            this.JobTitle = options.JobTitle;
            this.Enabled = options.Enabled;
            this.Domain = options.Domain;
            this.Email = options.Email;
            this.FullName = options.FullName;
            this.ImageRef = options.ImageRef;
            this.ImageData = options.ImageData;
            this.Avatar = options.Avatar;
            this.Password = options.Password;
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
            this.Captcha = options.Captcha;
            this.Manager = options.Manager;
            this.Department = options.Department;
            this.Languages = options.Languages;
            this.Phone = options.Phone;
            this.Gender = options.Gender;
            this.MaritalStatus = options.MaritalStatus;
            this.BirthDate = options.BirthDate;
            this.Education = options.Education;
            this.TwitterAccount = options.TwitterAccount;
            this.FacebookURL = options.FacebookURL;
            this.LinkedInURL = options.LinkedInURL;
            this.Language = options.Language;
            this.FollowedWorkspaces = options.FollowedWorkspaces;
            this.ProfilePath = options.ProfilePath;
        }
    }
    ContentTypes.User = User;
    class RegisteredUser extends User {
        constructor(options) {
            super(options);
            this.ResetKey = options.ResetKey;
            this.ActivationId = options.ActivationId;
            this.Activated = options.Activated;
            this.SecurityQuestion = options.SecurityQuestion;
            this.SecurityAnswer = options.SecurityAnswer;
        }
    }
    ContentTypes.RegisteredUser = RegisteredUser;
    class UserSearch extends GenericContent {
        constructor(options) {
            super(options);
            this.Search = options.Search;
        }
    }
    ContentTypes.UserSearch = UserSearch;
    class WikiArticle extends GenericContent {
        constructor(options) {
            super(options);
            this.WikiArticleText = options.WikiArticleText;
            this.ReferencedWikiTitles = options.ReferencedWikiTitles;
        }
    }
    ContentTypes.WikiArticle = WikiArticle;
    class Workflow extends GenericContent {
        constructor(options) {
            super(options);
            this.WorkflowDefinitionVersion = options.WorkflowDefinitionVersion;
            this.WorkflowInstanceGuid = options.WorkflowInstanceGuid;
            this.WorkflowTypeName = options.WorkflowTypeName;
            this.WorkflowHostType = options.WorkflowHostType;
            this.WorkflowStarted = options.WorkflowStarted;
            this.WorkflowStatus = options.WorkflowStatus;
            this.AllowManualStart = options.AllowManualStart;
            this.AutostartOnPublished = options.AutostartOnPublished;
            this.AutostartOnCreated = options.AutostartOnCreated;
            this.AutostartOnChanged = options.AutostartOnChanged;
            this.ContentWorkflow = options.ContentWorkflow;
            this.AbortOnRelatedContentChange = options.AbortOnRelatedContentChange;
            this.RelatedContent = options.RelatedContent;
            this.SystemMessages = options.SystemMessages;
            this.OwnerSiteUrl = options.OwnerSiteUrl;
        }
    }
    ContentTypes.Workflow = Workflow;
    class ApprovalWorkflow extends Workflow {
        constructor(options) {
            super(options);
            this.FirstLevelApprover = options.FirstLevelApprover;
            this.FirstLevelTimeFrame = options.FirstLevelTimeFrame;
            this.SecondLevelApprover = options.SecondLevelApprover;
            this.SecondLevelTimeFrame = options.SecondLevelTimeFrame;
            this.WaitForAll = options.WaitForAll;
        }
    }
    ContentTypes.ApprovalWorkflow = ApprovalWorkflow;
    class DocumentPreviewWorkflow extends Workflow {
        constructor(options) {
            super(options);
            this.StartIndex = options.StartIndex;
            this.ContentVersion = options.ContentVersion;
        }
    }
    ContentTypes.DocumentPreviewWorkflow = DocumentPreviewWorkflow;
    class ExpenseClaimWorkflow extends Workflow {
        constructor(options) {
            super(options);
            this.CEO = options.CEO;
            this.BudgetLimit = options.BudgetLimit;
            this.FinanceEmail = options.FinanceEmail;
        }
    }
    ContentTypes.ExpenseClaimWorkflow = ExpenseClaimWorkflow;
    class ForgottenPasswordWorkflow extends Workflow {
        constructor(options) {
            super(options);
            this.EmailForPassword = options.EmailForPassword;
        }
    }
    ContentTypes.ForgottenPasswordWorkflow = ForgottenPasswordWorkflow;
    class MailProcessorWorkflow extends Workflow {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.MailProcessorWorkflow = MailProcessorWorkflow;
    class RegistrationWorkflow extends Workflow {
        constructor(options) {
            super(options);
            this.FullName = options.FullName;
            this.UserName = options.UserName;
            this.Email = options.Email;
            this.InitialPassword = options.InitialPassword;
            this.RegistrationType = options.RegistrationType;
        }
    }
    ContentTypes.RegistrationWorkflow = RegistrationWorkflow;
})(ContentTypes = exports.ContentTypes || (exports.ContentTypes = {}));
function CreateContent(type, options = {}) {
    let content = new ContentTypes[type](options);
    return content;
}
exports.CreateContent = CreateContent;

//# sourceMappingURL=ContentTypes.js.map
