"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Content_1 = require("./Content");
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
    class Settings extends File {
        constructor(options) {
            super(options);
            this.GlobalOnly = options.GlobalOnly;
        }
    }
    ContentTypes.Settings = Settings;
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
    class Resource extends SystemFile {
        constructor(options) {
            super(options);
            this.Downloads = options.Downloads;
        }
    }
    ContentTypes.Resource = Resource;
    class Folder extends GenericContent {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Folder = Folder;
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
    class MemoList extends ItemList {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.MemoList = MemoList;
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
    class Device extends Folder {
        constructor(options) {
            super(options);
            this.UserAgentPattern = options.UserAgentPattern;
        }
    }
    ContentTypes.Device = Device;
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
    class OrganizationalUnit extends Folder {
        constructor(options) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }
    }
    ContentTypes.OrganizationalUnit = OrganizationalUnit;
    class PortalRoot extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.PortalRoot = PortalRoot;
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
    class RuntimeContentContainer extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.RuntimeContentContainer = RuntimeContentContainer;
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
    class SystemFolder extends Folder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.SystemFolder = SystemFolder;
    class Resources extends SystemFolder {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Resources = Resources;
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
    class CustomListItem extends ListItem {
        constructor(options) {
            super(options);
            this.WorkflowsRunning = options.WorkflowsRunning;
        }
    }
    ContentTypes.CustomListItem = CustomListItem;
    class Memo extends ListItem {
        constructor(options) {
            super(options);
            this.Date = options.Date;
            this.MemoType = options.MemoType;
            this.SeeAlso = options.SeeAlso;
        }
    }
    ContentTypes.Memo = Memo;
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
    class Query extends GenericContent {
        constructor(options) {
            super(options);
            this.Query = options.Query;
            this.QueryType = options.QueryType;
        }
    }
    ContentTypes.Query = Query;
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
})(ContentTypes = exports.ContentTypes || (exports.ContentTypes = {}));
function CreateContent(type, options = {}) {
    let content = new ContentTypes[type](options);
    return content;
}
exports.CreateContent = CreateContent;
//# sourceMappingURL=ContentTypes.js.map