/**
 *
 * @module ContentTypes
 * @preferred
 *
 *
 * @description The Content Repository contains many different types of ```Content```. ```Content``` vary in structure and even in function. Different types of content contain different fields,
 * are displayed with different views, and may also implement different business logic. The fields, views and business logic of a content is defined by its type - the Content Type.
 *
 * Content Types are defined in a type hierarchy: a Content Type may be inherited from another Content Type - thus automatically inheriting its fields.
 *
 * This module represents the above mentioned type hierarchy by Typescript classes with the Content Types' Fields as properties. With Typescript classes we can derive types from another
 * inheriting its properties just like Content Types in the Content Repository. This module provides us to create an objects with a type so that we can validate on its properties by their
 * types or check the required ones.
 *
 *//** */
import { Content, IContentOptions } from './Content';
import { Enums, ComplexTypes } from './SN';
import { ContentReferenceField, ContentListReferenceField} from './ContentReferences';


    /**
     * Class representing a ContentType
     * @class ContentType
     * @extends {@link Content}
     */
    export class ContentType<TOptionsType extends IContentTypeOptions = IContentTypeOptions> extends Content<TOptionsType> {
        Id?: number;
        ParentId?: number;
        VersionId?: number;
        Name?: string;
        CreatedById?: number;
        ModifiedById?: number;
        Version?: string;
        Path?: string;
        Depth?: number;
        IsSystemContent?: boolean;
        HandlerName?: string;
        ParentTypeName?: string;
        DisplayName?: string;
        Description?: string;
        Icon?: string;
        Binary?: ComplexTypes.MediaResourceObject;
        CreationDate?: string;
        ModificationDate?: string;
        EnableLifespan?: boolean;

    }
    /**
     * Interface for classes that represent a ContentType.
     * @interface IContentTypeOptions
     * @extends {@link IContentOptions}
     */
    export interface IContentTypeOptions extends IContentOptions {
        Id?: number;
        ParentId?: number;
        VersionId?: number;
        Name?: string;
        CreatedById?: number;
        ModifiedById?: number;
        Version?: string;
        Path?: string;
        Depth?: number;
        IsSystemContent?: boolean;
        HandlerName?: string;
        ParentTypeName?: string;
        DisplayName?: string;
        Description?: string;
        Icon?: string;
        Binary?: ComplexTypes.MediaResourceObject;
        CreationDate?: string;
        ModificationDate?: string;
        EnableLifespan?: boolean;
    }

    /**
     * Class representing a GenericContent
     * @class GenericContent
     * @extends {@link Content}
     */
    export class GenericContent<TOptionsType extends IGenericContentOptions = IGenericContentOptions> extends Content<TOptionsType> {
        Id?: number;
        ParentId?: number;
        OwnerId?: number;
        VersionId?: number;
        Icon?: string;
        Name?: string;
        CreatedById?: number;
        ModifiedById?: number;
        Version?: string;
        Path?: string;
        Depth?: number;
        IsSystemContent?: boolean;
        IsFolder?: boolean;
        DisplayName?: string;
        Description?: string;
        Hidden?: boolean;
        Index?: number;
        EnableLifespan?: boolean;
        ValidFrom?: string;
        ValidTill?: string;
        VersioningMode?: Enums.VersioningMode;
        InheritableVersioningMode?: Enums.InheritableVersioningMode;
        CreationDate?: string;
        ModificationDate?: string;
        ApprovingMode?: Enums.ApprovingMode;
        InheritableApprovingMode?: Enums.InheritableApprovingMode;
        Locked?: boolean;
        TrashDisabled?: boolean;
        SavingState?: Enums.SavingState;
        ExtensionData?: string;
        BrowseApplication: ContentReferenceField<Content>;
        Approvable?: boolean;
        IsTaggable?: boolean;
        Tags?: string;
        IsRateable?: boolean;
        RateStr?: string;
        RateAvg?: number;
        RateCount?: number;
        Rate?: string;
        Publishable?: boolean;
        CheckInComments?: string;
        RejectReason?: string;
        Workspace: ContentReferenceField<Workspace>;
        BrowseUrl?: string;

    }
    /**
     * Interface for classes that represent a GenericContent.
     * @interface IGenericContentOptions
     * @extends {@link IContentOptions}
     */
    export interface IGenericContentOptions extends IContentOptions {
        Id?: number;
        ParentId?: number;
        OwnerId?: number;
        VersionId?: number;
        Icon?: string;
        Name?: string;
        CreatedById?: number;
        ModifiedById?: number;
        Version?: string;
        Path?: string;
        Depth?: number;
        IsSystemContent?: boolean;
        IsFolder?: boolean;
        DisplayName?: string;
        Description?: string;
        Hidden?: boolean;
        Index?: number;
        EnableLifespan?: boolean;
        ValidFrom?: string;
        ValidTill?: string;
        VersioningMode?: Enums.VersioningMode;
        InheritableVersioningMode?: Enums.InheritableVersioningMode;
        CreationDate?: string;
        ModificationDate?: string;
        ApprovingMode?: Enums.ApprovingMode;
        InheritableApprovingMode?: Enums.InheritableApprovingMode;
        Locked?: boolean;
        TrashDisabled?: boolean;
        SavingState?: Enums.SavingState;
        ExtensionData?: string;
        BrowseApplication?: ContentReferenceField<Content>;
        Approvable?: boolean;
        IsTaggable?: boolean;
        Tags?: string;
        IsRateable?: boolean;
        RateStr?: string;
        RateAvg?: number;
        RateCount?: number;
        Rate?: string;
        Publishable?: boolean;
        CheckInComments?: string;
        RejectReason?: string;
        Workspace?: ContentReferenceField<Workspace>;
        BrowseUrl?: string;
    }

    /**
     * Class representing a ContentLink
     * @class ContentLink
     * @extends {@link GenericContent}
     */
    export class ContentLink<TOptionsType extends IContentLinkOptions = IContentLinkOptions> extends GenericContent<TOptionsType> {
        Link: ContentReferenceField<Content>;

    }
    /**
     * Interface for classes that represent a ContentLink.
     * @interface IContentLinkOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IContentLinkOptions extends IGenericContentOptions {
        Link?: ContentReferenceField<Content>;
    }

    /**
     * Class representing a File
     * @class File
     * @extends {@link GenericContent}
     */
    export class File<TOptionsType extends IFileOptions = IFileOptions> extends GenericContent<TOptionsType> {
        Binary?: ComplexTypes.MediaResourceObject;
        Size?: number;
        FullSize?: number;
        PageCount?: number;
        MimeType?: string;
        Shapes?: string;
        PageAttributes?: string;
        Watermark?: string;

    }
    /**
     * Interface for classes that represent a File.
     * @interface IFileOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IFileOptions extends IGenericContentOptions {
        Binary?: ComplexTypes.MediaResourceObject;
        Size?: number;
        FullSize?: number;
        PageCount?: number;
        MimeType?: string;
        Shapes?: string;
        PageAttributes?: string;
        Watermark?: string;
    }

    /**
     * Class representing a DynamicJsonContent
     * @class DynamicJsonContent
     * @extends {@link File}
     */
    export class DynamicJsonContent<TOptionsType extends IDynamicJsonContentOptions = IDynamicJsonContentOptions> extends File<TOptionsType> {

    }
    /**
     * Interface for classes that represent a DynamicJsonContent.
     * @interface IDynamicJsonContentOptions
     * @extends {@link IFileOptions}
     */
    export interface IDynamicJsonContentOptions extends IFileOptions {
    }

    /**
     * Class representing a ExecutableFile
     * @class ExecutableFile
     * @extends {@link File}
     */
    export class ExecutableFile<TOptionsType extends IExecutableFileOptions = IExecutableFileOptions> extends File<TOptionsType> {

    }
    /**
     * Interface for classes that represent a ExecutableFile.
     * @interface IExecutableFileOptions
     * @extends {@link IFileOptions}
     */
    export interface IExecutableFileOptions extends IFileOptions {
    }

    /**
     * Class representing a HtmlTemplate
     * @class HtmlTemplate
     * @extends {@link File}
     */
    export class HtmlTemplate<TOptionsType extends IHtmlTemplateOptions = IHtmlTemplateOptions> extends File<TOptionsType> {
        TemplateText?: string;

    }
    /**
     * Interface for classes that represent a HtmlTemplate.
     * @interface IHtmlTemplateOptions
     * @extends {@link IFileOptions}
     */
    export interface IHtmlTemplateOptions extends IFileOptions {
        TemplateText?: string;
    }

    /**
     * Class representing a Image
     * @class Image
     * @extends {@link File}
     */
    export class Image<TOptionsType extends IImageOptions = IImageOptions> extends File<TOptionsType> {
        Keywords?: string;
        DateTaken?: string;
        Width?: number;
        Height?: number;

    }
    /**
     * Interface for classes that represent a Image.
     * @interface IImageOptions
     * @extends {@link IFileOptions}
     */
    export interface IImageOptions extends IFileOptions {
        Keywords?: string;
        DateTaken?: string;
        Width?: number;
        Height?: number;
    }

    /**
     * Class representing a PreviewImage
     * @class PreviewImage
     * @extends {@link Image}
     */
    export class PreviewImage<TOptionsType extends IPreviewImageOptions = IPreviewImageOptions> extends Image<TOptionsType> {

    }
    /**
     * Interface for classes that represent a PreviewImage.
     * @interface IPreviewImageOptions
     * @extends {@link IImageOptions}
     */
    export interface IPreviewImageOptions extends IImageOptions {
    }

    /**
     * Class representing a Settings
     * @class Settings
     * @extends {@link File}
     */
    export class Settings<TOptionsType extends ISettingsOptions = ISettingsOptions> extends File<TOptionsType> {
        GlobalOnly?: boolean;

    }
    /**
     * Interface for classes that represent a Settings.
     * @interface ISettingsOptions
     * @extends {@link IFileOptions}
     */
    export interface ISettingsOptions extends IFileOptions {
        GlobalOnly?: boolean;
    }

    /**
     * Class representing a IndexingSettings
     * @class IndexingSettings
     * @extends {@link Settings}
     */
    export class IndexingSettings<TOptionsType extends IIndexingSettingsOptions = IIndexingSettingsOptions> extends Settings<TOptionsType> {
        TextExtractorInstances?: string;

    }
    /**
     * Interface for classes that represent a IndexingSettings.
     * @interface IIndexingSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    export interface IIndexingSettingsOptions extends ISettingsOptions {
        TextExtractorInstances?: string;
    }

    /**
     * Class representing a LoggingSettings
     * @class LoggingSettings
     * @extends {@link Settings}
     */
    export class LoggingSettings<TOptionsType extends ILoggingSettingsOptions = ILoggingSettingsOptions> extends Settings<TOptionsType> {

    }
    /**
     * Interface for classes that represent a LoggingSettings.
     * @interface ILoggingSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    export interface ILoggingSettingsOptions extends ISettingsOptions {
    }

    /**
     * Class representing a PortalSettings
     * @class PortalSettings
     * @extends {@link Settings}
     */
    export class PortalSettings<TOptionsType extends IPortalSettingsOptions = IPortalSettingsOptions> extends Settings<TOptionsType> {

    }
    /**
     * Interface for classes that represent a PortalSettings.
     * @interface IPortalSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    export interface IPortalSettingsOptions extends ISettingsOptions {
    }

    /**
     * Class representing a SystemFile
     * @class SystemFile
     * @extends {@link File}
     */
    export class SystemFile<TOptionsType extends ISystemFileOptions = ISystemFileOptions> extends File<TOptionsType> {

    }
    /**
     * Interface for classes that represent a SystemFile.
     * @interface ISystemFileOptions
     * @extends {@link IFileOptions}
     */
    export interface ISystemFileOptions extends IFileOptions {
    }

    /**
     * Class representing a Resource
     * @class Resource
     * @extends {@link SystemFile}
     */
    export class Resource<TOptionsType extends IResourceOptions = IResourceOptions> extends SystemFile<TOptionsType> {
        Downloads?: number;

    }
    /**
     * Interface for classes that represent a Resource.
     * @interface IResourceOptions
     * @extends {@link ISystemFileOptions}
     */
    export interface IResourceOptions extends ISystemFileOptions {
        Downloads?: number;
    }

    /**
     * Class representing a Folder
     * @class Folder
     * @extends {@link GenericContent}
     */
    export class Folder<TOptionsType extends IFolderOptions = IFolderOptions> extends GenericContent<TOptionsType> {

    }
    /**
     * Interface for classes that represent a Folder.
     * @interface IFolderOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IFolderOptions extends IGenericContentOptions {
    }

    /**
     * Class representing a ContentList
     * @class ContentList
     * @extends {@link Folder}
     */
    export class ContentList<TOptionsType extends IContentListOptions = IContentListOptions> extends Folder<TOptionsType> {
        ContentListDefinition?: string;
        DefaultView?: string;
        AvailableViews: ContentListReferenceField<Content>;
        FieldSettingContents: ContentListReferenceField<Content>;
        AvailableContentTypeFields: ContentListReferenceField<Content>;
        ListEmail?: string;
        ExchangeSubscriptionId?: string;
        OverwriteFiles?: boolean;
        GroupAttachments?: Enums.GroupAttachments;
        SaveOriginalEmail?: boolean;
        IncomingEmailWorkflow: ContentReferenceField<Content>;
        OnlyFromLocalGroups?: boolean;
        InboxFolder?: string;
        OwnerWhenVisitor: ContentReferenceField<User>;

    }
    /**
     * Interface for classes that represent a ContentList.
     * @interface IContentListOptions
     * @extends {@link IFolderOptions}
     */
    export interface IContentListOptions extends IFolderOptions {
        ContentListDefinition?: string;
        DefaultView?: string;
        AvailableViews?: ContentListReferenceField<Content>;
        FieldSettingContents?: ContentListReferenceField<Content>;
        AvailableContentTypeFields?: ContentListReferenceField<Content>;
        ListEmail?: string;
        ExchangeSubscriptionId?: string;
        OverwriteFiles?: boolean;
        GroupAttachments?: Enums.GroupAttachments;
        SaveOriginalEmail?: boolean;
        IncomingEmailWorkflow?: ContentReferenceField<Content>;
        OnlyFromLocalGroups?: boolean;
        InboxFolder?: string;
        OwnerWhenVisitor?: ContentReferenceField<User>;
    }

    /**
     * Class representing a Aspect
     * @class Aspect
     * @extends {@link ContentList}
     */
    export class Aspect<TOptionsType extends IAspectOptions = IAspectOptions> extends ContentList<TOptionsType> {
        AspectDefinition?: string;

    }
    /**
     * Interface for classes that represent a Aspect.
     * @interface IAspectOptions
     * @extends {@link IContentListOptions}
     */
    export interface IAspectOptions extends IContentListOptions {
        AspectDefinition?: string;
    }

    /**
     * Class representing a ItemList
     * @class ItemList
     * @extends {@link ContentList}
     */
    export class ItemList<TOptionsType extends IItemListOptions = IItemListOptions> extends ContentList<TOptionsType> {

    }
    /**
     * Interface for classes that represent a ItemList.
     * @interface IItemListOptions
     * @extends {@link IContentListOptions}
     */
    export interface IItemListOptions extends IContentListOptions {
    }

    /**
     * Class representing a CustomList
     * @class CustomList
     * @extends {@link ItemList}
     */
    export class CustomList<TOptionsType extends ICustomListOptions = ICustomListOptions> extends ItemList<TOptionsType> {

    }
    /**
     * Interface for classes that represent a CustomList.
     * @interface ICustomListOptions
     * @extends {@link IItemListOptions}
     */
    export interface ICustomListOptions extends IItemListOptions {
    }

    /**
     * Class representing a MemoList
     * @class MemoList
     * @extends {@link ItemList}
     */
    export class MemoList<TOptionsType extends IMemoListOptions = IMemoListOptions> extends ItemList<TOptionsType> {

    }
    /**
     * Interface for classes that represent a MemoList.
     * @interface IMemoListOptions
     * @extends {@link IItemListOptions}
     */
    export interface IMemoListOptions extends IItemListOptions {
    }

    /**
     * Class representing a TaskList
     * @class TaskList
     * @extends {@link ItemList}
     */
    export class TaskList<TOptionsType extends ITaskListOptions = ITaskListOptions> extends ItemList<TOptionsType> {

    }
    /**
     * Interface for classes that represent a TaskList.
     * @interface ITaskListOptions
     * @extends {@link IItemListOptions}
     */
    export interface ITaskListOptions extends IItemListOptions {
    }

    /**
     * Class representing a Library
     * @class Library
     * @extends {@link ContentList}
     */
    export class Library<TOptionsType extends ILibraryOptions = ILibraryOptions> extends ContentList<TOptionsType> {

    }
    /**
     * Interface for classes that represent a Library.
     * @interface ILibraryOptions
     * @extends {@link IContentListOptions}
     */
    export interface ILibraryOptions extends IContentListOptions {
    }

    /**
     * Class representing a DocumentLibrary
     * @class DocumentLibrary
     * @extends {@link Library}
     */
    export class DocumentLibrary<TOptionsType extends IDocumentLibraryOptions = IDocumentLibraryOptions> extends Library<TOptionsType> {

    }
    /**
     * Interface for classes that represent a DocumentLibrary.
     * @interface IDocumentLibraryOptions
     * @extends {@link ILibraryOptions}
     */
    export interface IDocumentLibraryOptions extends ILibraryOptions {
    }

    /**
     * Class representing a ImageLibrary
     * @class ImageLibrary
     * @extends {@link Library}
     */
    export class ImageLibrary<TOptionsType extends IImageLibraryOptions = IImageLibraryOptions> extends Library<TOptionsType> {
        CoverImage: ContentReferenceField<Image>;

    }
    /**
     * Interface for classes that represent a ImageLibrary.
     * @interface IImageLibraryOptions
     * @extends {@link ILibraryOptions}
     */
    export interface IImageLibraryOptions extends ILibraryOptions {
        CoverImage?: ContentReferenceField<Image>;
    }

    /**
     * Class representing a Device
     * @class Device
     * @extends {@link Folder}
     */
    export class Device<TOptionsType extends IDeviceOptions = IDeviceOptions> extends Folder<TOptionsType> {
        UserAgentPattern?: string;

    }
    /**
     * Interface for classes that represent a Device.
     * @interface IDeviceOptions
     * @extends {@link IFolderOptions}
     */
    export interface IDeviceOptions extends IFolderOptions {
        UserAgentPattern?: string;
    }

    /**
     * Class representing a Domain
     * @class Domain
     * @extends {@link Folder}
     */
    export class Domain<TOptionsType extends IDomainOptions = IDomainOptions> extends Folder<TOptionsType> {
        SyncGuid?: string;
        LastSync?: string;

    }
    /**
     * Interface for classes that represent a Domain.
     * @interface IDomainOptions
     * @extends {@link IFolderOptions}
     */
    export interface IDomainOptions extends IFolderOptions {
        SyncGuid?: string;
        LastSync?: string;
    }

    /**
     * Class representing a Domains
     * @class Domains
     * @extends {@link Folder}
     */
    export class Domains<TOptionsType extends IDomainsOptions = IDomainsOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a Domains.
     * @interface IDomainsOptions
     * @extends {@link IFolderOptions}
     */
    export interface IDomainsOptions extends IFolderOptions {
    }

    /**
     * Class representing a Email
     * @class Email
     * @extends {@link Folder}
     */
    export class Email<TOptionsType extends IEmailOptions = IEmailOptions> extends Folder<TOptionsType> {
        From?: string;
        Body?: string;
        Sent?: string;

    }
    /**
     * Interface for classes that represent a Email.
     * @interface IEmailOptions
     * @extends {@link IFolderOptions}
     */
    export interface IEmailOptions extends IFolderOptions {
        From?: string;
        Body?: string;
        Sent?: string;
    }

    /**
     * Class representing a OrganizationalUnit
     * @class OrganizationalUnit
     * @extends {@link Folder}
     */
    export class OrganizationalUnit<TOptionsType extends IOrganizationalUnitOptions = IOrganizationalUnitOptions> extends Folder<TOptionsType> {
        SyncGuid?: string;
        LastSync?: string;

    }
    /**
     * Interface for classes that represent a OrganizationalUnit.
     * @interface IOrganizationalUnitOptions
     * @extends {@link IFolderOptions}
     */
    export interface IOrganizationalUnitOptions extends IFolderOptions {
        SyncGuid?: string;
        LastSync?: string;
    }

    /**
     * Class representing a PortalRoot
     * @class PortalRoot
     * @extends {@link Folder}
     */
    export class PortalRoot<TOptionsType extends IPortalRootOptions = IPortalRootOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a PortalRoot.
     * @interface IPortalRootOptions
     * @extends {@link IFolderOptions}
     */
    export interface IPortalRootOptions extends IFolderOptions {
    }

    /**
     * Class representing a ProfileDomain
     * @class ProfileDomain
     * @extends {@link Folder}
     */
    export class ProfileDomain<TOptionsType extends IProfileDomainOptions = IProfileDomainOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a ProfileDomain.
     * @interface IProfileDomainOptions
     * @extends {@link IFolderOptions}
     */
    export interface IProfileDomainOptions extends IFolderOptions {
    }

    /**
     * Class representing a Profiles
     * @class Profiles
     * @extends {@link Folder}
     */
    export class Profiles<TOptionsType extends IProfilesOptions = IProfilesOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a Profiles.
     * @interface IProfilesOptions
     * @extends {@link IFolderOptions}
     */
    export interface IProfilesOptions extends IFolderOptions {
    }

    /**
     * Class representing a RuntimeContentContainer
     * @class RuntimeContentContainer
     * @extends {@link Folder}
     */
    export class RuntimeContentContainer<TOptionsType extends IRuntimeContentContainerOptions = IRuntimeContentContainerOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a RuntimeContentContainer.
     * @interface IRuntimeContentContainerOptions
     * @extends {@link IFolderOptions}
     */
    export interface IRuntimeContentContainerOptions extends IFolderOptions {
    }

    /**
     * Class representing a Sites
     * @class Sites
     * @extends {@link Folder}
     */
    export class Sites<TOptionsType extends ISitesOptions = ISitesOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a Sites.
     * @interface ISitesOptions
     * @extends {@link IFolderOptions}
     */
    export interface ISitesOptions extends IFolderOptions {
    }

    /**
     * Class representing a SmartFolder
     * @class SmartFolder
     * @extends {@link Folder}
     */
    export class SmartFolder<TOptionsType extends ISmartFolderOptions = ISmartFolderOptions> extends Folder<TOptionsType> {
        Query?: string;
        EnableAutofilters?: Enums.EnableAutofilters;
        EnableLifespanFilter?: Enums.EnableLifespanFilter;

    }
    /**
     * Interface for classes that represent a SmartFolder.
     * @interface ISmartFolderOptions
     * @extends {@link IFolderOptions}
     */
    export interface ISmartFolderOptions extends IFolderOptions {
        Query?: string;
        EnableAutofilters?: Enums.EnableAutofilters;
        EnableLifespanFilter?: Enums.EnableLifespanFilter;
    }

    /**
     * Class representing a SystemFolder
     * @class SystemFolder
     * @extends {@link Folder}
     */
    export class SystemFolder<TOptionsType extends ISystemFolderOptions = ISystemFolderOptions> extends Folder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a SystemFolder.
     * @interface ISystemFolderOptions
     * @extends {@link IFolderOptions}
     */
    export interface ISystemFolderOptions extends IFolderOptions {
    }

    /**
     * Class representing a Resources
     * @class Resources
     * @extends {@link SystemFolder}
     */
    export class Resources<TOptionsType extends IResourcesOptions = IResourcesOptions> extends SystemFolder<TOptionsType> {

    }
    /**
     * Interface for classes that represent a Resources.
     * @interface IResourcesOptions
     * @extends {@link ISystemFolderOptions}
     */
    export interface IResourcesOptions extends ISystemFolderOptions {
    }

    /**
     * Class representing a TrashBag
     * @class TrashBag
     * @extends {@link Folder}
     */
    export class TrashBag<TOptionsType extends ITrashBagOptions = ITrashBagOptions> extends Folder<TOptionsType> {
        KeepUntil?: string;
        OriginalPath?: string;
        WorkspaceRelativePath?: string;
        WorkspaceId?: number;
        DeletedContent: ContentReferenceField<Content>;

    }
    /**
     * Interface for classes that represent a TrashBag.
     * @interface ITrashBagOptions
     * @extends {@link IFolderOptions}
     */
    export interface ITrashBagOptions extends IFolderOptions {
        KeepUntil?: string;
        OriginalPath?: string;
        WorkspaceRelativePath?: string;
        WorkspaceId?: number;
        DeletedContent?: ContentReferenceField<Content>;
    }

    /**
     * Class representing a Workspace
     * @class Workspace
     * @extends {@link Folder}
     */
    export class Workspace<TOptionsType extends IWorkspaceOptions = IWorkspaceOptions> extends Folder<TOptionsType> {
        Manager: ContentReferenceField<User>;
        Deadline?: string;
        IsActive?: boolean;
        WorkspaceSkin: ContentReferenceField<Content>;
        IsCritical?: boolean;
        IsWallContainer?: boolean;
        IsFollowed?: boolean;

    }
    /**
     * Interface for classes that represent a Workspace.
     * @interface IWorkspaceOptions
     * @extends {@link IFolderOptions}
     */
    export interface IWorkspaceOptions extends IFolderOptions {
        Manager?: ContentReferenceField<User>;
        Deadline?: string;
        IsActive?: boolean;
        WorkspaceSkin?: ContentReferenceField<Content>;
        IsCritical?: boolean;
        IsWallContainer?: boolean;
        IsFollowed?: boolean;
    }

    /**
     * Class representing a Site
     * @class Site
     * @extends {@link Workspace}
     */
    export class Site<TOptionsType extends ISiteOptions = ISiteOptions> extends Workspace<TOptionsType> {
        Language?: Enums.Language;
        EnableClientBasedCulture?: boolean;
        EnableUserBasedCulture?: boolean;
        UrlList?: string;
        StartPage: ContentReferenceField<Content>;
        LoginPage: ContentReferenceField<Content>;
        SiteSkin: ContentReferenceField<Content>;
        DenyCrossSiteAccess?: boolean;

    }
    /**
     * Interface for classes that represent a Site.
     * @interface ISiteOptions
     * @extends {@link IWorkspaceOptions}
     */
    export interface ISiteOptions extends IWorkspaceOptions {
        Language?: Enums.Language;
        EnableClientBasedCulture?: boolean;
        EnableUserBasedCulture?: boolean;
        UrlList?: string;
        StartPage?: ContentReferenceField<Content>;
        LoginPage?: ContentReferenceField<Content>;
        SiteSkin?: ContentReferenceField<Content>;
        DenyCrossSiteAccess?: boolean;
    }

    /**
     * Class representing a TrashBin
     * @class TrashBin
     * @extends {@link Workspace}
     */
    export class TrashBin<TOptionsType extends ITrashBinOptions = ITrashBinOptions> extends Workspace<TOptionsType> {
        MinRetentionTime?: number;
        SizeQuota?: number;
        BagCapacity?: number;

    }
    /**
     * Interface for classes that represent a TrashBin.
     * @interface ITrashBinOptions
     * @extends {@link IWorkspaceOptions}
     */
    export interface ITrashBinOptions extends IWorkspaceOptions {
        MinRetentionTime?: number;
        SizeQuota?: number;
        BagCapacity?: number;
    }

    /**
     * Class representing a UserProfile
     * @class UserProfile
     * @extends {@link Workspace}
     */
    export class UserProfile<TOptionsType extends IUserProfileOptions = IUserProfileOptions> extends Workspace<TOptionsType> {
        User: ContentReferenceField<User>;

    }
    /**
     * Interface for classes that represent a UserProfile.
     * @interface IUserProfileOptions
     * @extends {@link IWorkspaceOptions}
     */
    export interface IUserProfileOptions extends IWorkspaceOptions {
        User?: ContentReferenceField<User>;
    }

    /**
     * Class representing a Group
     * @class Group
     * @extends {@link GenericContent}
     */
    export class Group<TOptionsType extends IGroupOptions = IGroupOptions> extends GenericContent<TOptionsType> {
        Members: ContentListReferenceField<User | Group>;
        SyncGuid?: string;
        LastSync?: string;

    }
    /**
     * Interface for classes that represent a Group.
     * @interface IGroupOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IGroupOptions extends IGenericContentOptions {
        Members?: ContentListReferenceField<User | Group>;
        SyncGuid?: string;
        LastSync?: string;
    }

    /**
     * Class representing a ListItem
     * @class ListItem
     * @extends {@link GenericContent}
     */
    export class ListItem<TOptionsType extends IListItemOptions = IListItemOptions> extends GenericContent<TOptionsType> {

    }
    /**
     * Interface for classes that represent a ListItem.
     * @interface IListItemOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IListItemOptions extends IGenericContentOptions {
    }

    /**
     * Class representing a CustomListItem
     * @class CustomListItem
     * @extends {@link ListItem}
     */
    export class CustomListItem<TOptionsType extends ICustomListItemOptions = ICustomListItemOptions> extends ListItem<TOptionsType> {
        WorkflowsRunning?: boolean;

    }
    /**
     * Interface for classes that represent a CustomListItem.
     * @interface ICustomListItemOptions
     * @extends {@link IListItemOptions}
     */
    export interface ICustomListItemOptions extends IListItemOptions {
        WorkflowsRunning?: boolean;
    }

    /**
     * Class representing a Memo
     * @class Memo
     * @extends {@link ListItem}
     */
    export class Memo<TOptionsType extends IMemoOptions = IMemoOptions> extends ListItem<TOptionsType> {
        Date?: string;
        MemoType?: Enums.MemoType;
        SeeAlso: ContentListReferenceField<Content>;

    }
    /**
     * Interface for classes that represent a Memo.
     * @interface IMemoOptions
     * @extends {@link IListItemOptions}
     */
    export interface IMemoOptions extends IListItemOptions {
        Date?: string;
        MemoType?: Enums.MemoType;
        SeeAlso?: ContentListReferenceField<Content>;
    }

    /**
     * Class representing a Task
     * @class Task
     * @extends {@link ListItem}
     */
    export class Task<TOptionsType extends ITaskOptions = ITaskOptions> extends ListItem<TOptionsType> {
        StartDate?: string;
        DueDate?: string;
        AssignedTo: ContentListReferenceField<User>;
        Priority?: Enums.Priority;
        Status?: Enums.Status;
        TaskCompletion?: number;
        RemainingDays?: number;
        DueText?: string;
        DueCssClass?: string;

    }
    /**
     * Interface for classes that represent a Task.
     * @interface ITaskOptions
     * @extends {@link IListItemOptions}
     */
    export interface ITaskOptions extends IListItemOptions {
        StartDate?: string;
        DueDate?: string;
        AssignedTo?: ContentListReferenceField<User>;
        Priority?: Enums.Priority;
        Status?: Enums.Status;
        TaskCompletion?: number;
        RemainingDays?: number;
        DueText?: string;
        DueCssClass?: string;
    }

    /**
     * Class representing a Query
     * @class Query
     * @extends {@link GenericContent}
     */
    export class Query<TOptionsType extends IQueryOptions = IQueryOptions> extends GenericContent<TOptionsType> {
        Query?: string;
        QueryType?: Enums.QueryType;

    }
    /**
     * Interface for classes that represent a Query.
     * @interface IQueryOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IQueryOptions extends IGenericContentOptions {
        Query?: string;
        QueryType?: Enums.QueryType;
    }

    /**
     * Class representing a User
     * @class User
     * @extends {@link GenericContent}
     */
    export class User<TOptionsType extends IUserOptions = IUserOptions> extends GenericContent<TOptionsType> {
        LoginName?: string;
        JobTitle?: string;
        Enabled?: boolean;
        Domain?: string;
        Email?: string;
        FullName?: string;
        ImageRef: ContentReferenceField<Content>;
        ImageData?: ComplexTypes.MediaResourceObject;
        Avatar?: ComplexTypes.MediaResourceObject;
        Password?: string;
        SyncGuid?: string;
        LastSync?: string;
        Captcha?: string;
        Manager: ContentReferenceField<User>;
        Department?: string;
        Languages?: string;
        Phone?: string;
        Gender?: Enums.Gender;
        MaritalStatus?: Enums.MaritalStatus;
        BirthDate?: string;
        Education?: string;
        TwitterAccount?: string;
        FacebookURL?: string;
        LinkedInURL?: string;
        Language?: Enums.Language;
        FollowedWorkspaces: ContentListReferenceField<Workspace>;
        ProfilePath?: string;

    }
    /**
     * Interface for classes that represent a User.
     * @interface IUserOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IUserOptions extends IGenericContentOptions {
        LoginName?: string;
        JobTitle?: string;
        Enabled?: boolean;
        Domain?: string;
        Email?: string;
        FullName?: string;
        ImageRef?: ContentReferenceField<Content>;
        ImageData?: ComplexTypes.MediaResourceObject;
        Avatar?: ComplexTypes.MediaResourceObject;
        Password?: string;
        SyncGuid?: string;
        LastSync?: string;
        Captcha?: string;
        Manager?: ContentReferenceField<User>;
        Department?: string;
        Languages?: string;
        Phone?: string;
        Gender?: Enums.Gender;
        MaritalStatus?: Enums.MaritalStatus;
        BirthDate?: string;
        Education?: string;
        TwitterAccount?: string;
        FacebookURL?: string;
        LinkedInURL?: string;
        Language?: Enums.Language;
        FollowedWorkspaces?: ContentListReferenceField<Workspace>;
        ProfilePath?: string;
    }

