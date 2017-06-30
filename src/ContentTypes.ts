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
import { BaseRepository } from './Repository';


    /**
     * Class representing a ContentType
     * @class ContentType
     * @extends {@link Content}
     */
    export class ContentType extends Content {
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
        Binary?: ComplexTypes.DeferredObject;
        CreatedBy?: ComplexTypes.DeferredObject;
        CreationDate?: string;
        ModifiedBy?: ComplexTypes.DeferredObject;
        ModificationDate?: string;
        EnableLifespan?: boolean;

        /**
         * @constructs ContentType
         * @param options {object} An object implementing {@link IContentTypeOptions} interface
         */
        constructor(public readonly options: IContentTypeOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
        Binary?: ComplexTypes.DeferredObject;
        CreatedBy?: ComplexTypes.DeferredObject;
        CreationDate?: string;
        ModifiedBy?: ComplexTypes.DeferredObject;
        ModificationDate?: string;
        EnableLifespan?: boolean;
    }

    /**
     * Class representing a GenericContent
     * @class GenericContent
     * @extends {@link Content}
     */
    export class GenericContent extends Content {
        Id?: number;
        ParentId?: number;
        OwnerId?: number;
        Owner?: ComplexTypes.DeferredObject;
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
        AllowedChildTypes?: string;
        EffectiveAllowedChildTypes?: string;
        VersioningMode?: Enums.VersioningMode;
        InheritableVersioningMode?: Enums.InheritableVersioningMode;
        CreatedBy?: ComplexTypes.DeferredObject;
        CreationDate?: string;
        ModifiedBy?: ComplexTypes.DeferredObject;
        ModificationDate?: string;
        ApprovingMode?: Enums.ApprovingMode;
        InheritableApprovingMode?: Enums.InheritableApprovingMode;
        Locked?: boolean;
        CheckedOutTo?: ComplexTypes.DeferredObject;
        TrashDisabled?: boolean;
        SavingState?: Enums.SavingState;
        ExtensionData?: string;
        BrowseApplication?: ComplexTypes.DeferredObject;
        Approvable?: boolean;
        IsTaggable?: boolean;
        Tags?: string;
        IsRateable?: boolean;
        RateStr?: string;
        RateAvg?: number;
        RateCount?: number;
        Rate?: string;
        Publishable?: boolean;
        Versions?: ComplexTypes.DeferredObject;
        CheckInComments?: string;
        RejectReason?: string;
        Workspace?: ComplexTypes.DeferredObject;
        BrowseUrl?: string;

        /**
         * @constructs GenericContent
         * @param options {object} An object implementing {@link IGenericContentOptions} interface
         */
        constructor(public readonly options: IGenericContentOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
        Owner?: ComplexTypes.DeferredObject;
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
        AllowedChildTypes?: string;
        EffectiveAllowedChildTypes?: string;
        VersioningMode?: Enums.VersioningMode;
        InheritableVersioningMode?: Enums.InheritableVersioningMode;
        CreatedBy?: ComplexTypes.DeferredObject;
        CreationDate?: string;
        ModifiedBy?: ComplexTypes.DeferredObject;
        ModificationDate?: string;
        ApprovingMode?: Enums.ApprovingMode;
        InheritableApprovingMode?: Enums.InheritableApprovingMode;
        Locked?: boolean;
        CheckedOutTo?: ComplexTypes.DeferredObject;
        TrashDisabled?: boolean;
        SavingState?: Enums.SavingState;
        ExtensionData?: string;
        BrowseApplication?: ComplexTypes.DeferredObject;
        Approvable?: boolean;
        IsTaggable?: boolean;
        Tags?: string;
        IsRateable?: boolean;
        RateStr?: string;
        RateAvg?: number;
        RateCount?: number;
        Rate?: string;
        Publishable?: boolean;
        Versions?: ComplexTypes.DeferredObject;
        CheckInComments?: string;
        RejectReason?: string;
        Workspace?: ComplexTypes.DeferredObject;
        BrowseUrl?: string;
    }

    /**
     * Class representing a ContentLink
     * @class ContentLink
     * @extends {@link GenericContent}
     */
    export class ContentLink extends GenericContent {
        Link?: ComplexTypes.DeferredObject;

        /**
         * @constructs ContentLink
         * @param options {object} An object implementing {@link IContentLinkOptions} interface
         */
        constructor(public readonly options: IContentLinkOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a ContentLink.
     * @interface IContentLinkOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IContentLinkOptions extends IGenericContentOptions {
        Link?: ComplexTypes.DeferredObject;
    }

    /**
     * Class representing a File
     * @class File
     * @extends {@link GenericContent}
     */
    export class File extends GenericContent {
        Binary?: ComplexTypes.DeferredObject;
        Size?: number;
        FullSize?: number;
        PageCount?: number;
        MimeType?: string;
        Shapes?: string;
        PageAttributes?: string;
        Watermark?: string;

        /**
         * @constructs File
         * @param options {object} An object implementing {@link IFileOptions} interface
         */
        constructor(public readonly options: IFileOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a File.
     * @interface IFileOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IFileOptions extends IGenericContentOptions {
        Binary?: ComplexTypes.DeferredObject;
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
    export class DynamicJsonContent extends File {

        /**
         * @constructs DynamicJsonContent
         * @param options {object} An object implementing {@link IDynamicJsonContentOptions} interface
         */
        constructor(public readonly options: IDynamicJsonContentOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class ExecutableFile extends File {

        /**
         * @constructs ExecutableFile
         * @param options {object} An object implementing {@link IExecutableFileOptions} interface
         */
        constructor(public readonly options: IExecutableFileOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class HtmlTemplate extends File {
        TemplateText?: string;

        /**
         * @constructs HtmlTemplate
         * @param options {object} An object implementing {@link IHtmlTemplateOptions} interface
         */
        constructor(public readonly options: IHtmlTemplateOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Image extends File {
        Keywords?: string;
        DateTaken?: string;
        Width?: number;
        Height?: number;

        /**
         * @constructs Image
         * @param options {object} An object implementing {@link IImageOptions} interface
         */
        constructor(public readonly options: IImageOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class PreviewImage extends Image {

        /**
         * @constructs PreviewImage
         * @param options {object} An object implementing {@link IPreviewImageOptions} interface
         */
        constructor(public readonly options: IPreviewImageOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Settings extends File {
        GlobalOnly?: boolean;

        /**
         * @constructs Settings
         * @param options {object} An object implementing {@link ISettingsOptions} interface
         */
        constructor(public readonly options: ISettingsOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class IndexingSettings extends Settings {
        TextExtractorInstances?: string;

        /**
         * @constructs IndexingSettings
         * @param options {object} An object implementing {@link IIndexingSettingsOptions} interface
         */
        constructor(public readonly options: IIndexingSettingsOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class LoggingSettings extends Settings {

        /**
         * @constructs LoggingSettings
         * @param options {object} An object implementing {@link ILoggingSettingsOptions} interface
         */
        constructor(public readonly options: ILoggingSettingsOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class PortalSettings extends Settings {

        /**
         * @constructs PortalSettings
         * @param options {object} An object implementing {@link IPortalSettingsOptions} interface
         */
        constructor(public readonly options: IPortalSettingsOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class SystemFile extends File {

        /**
         * @constructs SystemFile
         * @param options {object} An object implementing {@link ISystemFileOptions} interface
         */
        constructor(public readonly options: ISystemFileOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Resource extends SystemFile {
        Downloads?: number;

        /**
         * @constructs Resource
         * @param options {object} An object implementing {@link IResourceOptions} interface
         */
        constructor(public readonly options: IResourceOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Folder extends GenericContent {

        /**
         * @constructs Folder
         * @param options {object} An object implementing {@link IFolderOptions} interface
         */
        constructor(public readonly options: IFolderOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class ContentList extends Folder {
        ContentListDefinition?: string;
        DefaultView?: string;
        AvailableViews?: ComplexTypes.DeferredObject;
        FieldSettingContents?: ComplexTypes.DeferredObject;
        AvailableContentTypeFields?: ComplexTypes.DeferredObject;
        ListEmail?: string;
        ExchangeSubscriptionId?: string;
        OverwriteFiles?: boolean;
        GroupAttachments?: Enums.GroupAttachments;
        SaveOriginalEmail?: boolean;
        IncomingEmailWorkflow?: ComplexTypes.DeferredObject;
        OnlyFromLocalGroups?: boolean;
        InboxFolder?: string;
        OwnerWhenVisitor?: ComplexTypes.DeferredObject;

        /**
         * @constructs ContentList
         * @param options {object} An object implementing {@link IContentListOptions} interface
         */
        constructor(public readonly options: IContentListOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a ContentList.
     * @interface IContentListOptions
     * @extends {@link IFolderOptions}
     */
    export interface IContentListOptions extends IFolderOptions {
        ContentListDefinition?: string;
        DefaultView?: string;
        AvailableViews?: ComplexTypes.DeferredObject;
        FieldSettingContents?: ComplexTypes.DeferredObject;
        AvailableContentTypeFields?: ComplexTypes.DeferredObject;
        ListEmail?: string;
        ExchangeSubscriptionId?: string;
        OverwriteFiles?: boolean;
        GroupAttachments?: Enums.GroupAttachments;
        SaveOriginalEmail?: boolean;
        IncomingEmailWorkflow?: ComplexTypes.DeferredObject;
        OnlyFromLocalGroups?: boolean;
        InboxFolder?: string;
        OwnerWhenVisitor?: ComplexTypes.DeferredObject;
    }

    /**
     * Class representing a Aspect
     * @class Aspect
     * @extends {@link ContentList}
     */
    export class Aspect extends ContentList {
        AspectDefinition?: string;

        /**
         * @constructs Aspect
         * @param options {object} An object implementing {@link IAspectOptions} interface
         */
        constructor(public readonly options: IAspectOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class ItemList extends ContentList {

        /**
         * @constructs ItemList
         * @param options {object} An object implementing {@link IItemListOptions} interface
         */
        constructor(public readonly options: IItemListOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class CustomList extends ItemList {

        /**
         * @constructs CustomList
         * @param options {object} An object implementing {@link ICustomListOptions} interface
         */
        constructor(public readonly options: ICustomListOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class MemoList extends ItemList {

        /**
         * @constructs MemoList
         * @param options {object} An object implementing {@link IMemoListOptions} interface
         */
        constructor(public readonly options: IMemoListOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class TaskList extends ItemList {

        /**
         * @constructs TaskList
         * @param options {object} An object implementing {@link ITaskListOptions} interface
         */
        constructor(public readonly options: ITaskListOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Library extends ContentList {

        /**
         * @constructs Library
         * @param options {object} An object implementing {@link ILibraryOptions} interface
         */
        constructor(public readonly options: ILibraryOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class DocumentLibrary extends Library {

        /**
         * @constructs DocumentLibrary
         * @param options {object} An object implementing {@link IDocumentLibraryOptions} interface
         */
        constructor(public readonly options: IDocumentLibraryOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class ImageLibrary extends Library {
        CoverImage?: ComplexTypes.DeferredObject;

        /**
         * @constructs ImageLibrary
         * @param options {object} An object implementing {@link IImageLibraryOptions} interface
         */
        constructor(public readonly options: IImageLibraryOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a ImageLibrary.
     * @interface IImageLibraryOptions
     * @extends {@link ILibraryOptions}
     */
    export interface IImageLibraryOptions extends ILibraryOptions {
        CoverImage?: ComplexTypes.DeferredObject;
    }

    /**
     * Class representing a Device
     * @class Device
     * @extends {@link Folder}
     */
    export class Device extends Folder {
        UserAgentPattern?: string;

        /**
         * @constructs Device
         * @param options {object} An object implementing {@link IDeviceOptions} interface
         */
        constructor(public readonly options: IDeviceOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Domain extends Folder {
        SyncGuid?: string;
        LastSync?: string;

        /**
         * @constructs Domain
         * @param options {object} An object implementing {@link IDomainOptions} interface
         */
        constructor(public readonly options: IDomainOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Domains extends Folder {

        /**
         * @constructs Domains
         * @param options {object} An object implementing {@link IDomainsOptions} interface
         */
        constructor(public readonly options: IDomainsOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Email extends Folder {
        From?: string;
        Body?: string;
        Sent?: string;

        /**
         * @constructs Email
         * @param options {object} An object implementing {@link IEmailOptions} interface
         */
        constructor(public readonly options: IEmailOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class OrganizationalUnit extends Folder {
        SyncGuid?: string;
        LastSync?: string;

        /**
         * @constructs OrganizationalUnit
         * @param options {object} An object implementing {@link IOrganizationalUnitOptions} interface
         */
        constructor(public readonly options: IOrganizationalUnitOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class PortalRoot extends Folder {

        /**
         * @constructs PortalRoot
         * @param options {object} An object implementing {@link IPortalRootOptions} interface
         */
        constructor(public readonly options: IPortalRootOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class ProfileDomain extends Folder {

        /**
         * @constructs ProfileDomain
         * @param options {object} An object implementing {@link IProfileDomainOptions} interface
         */
        constructor(public readonly options: IProfileDomainOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Profiles extends Folder {

        /**
         * @constructs Profiles
         * @param options {object} An object implementing {@link IProfilesOptions} interface
         */
        constructor(public readonly options: IProfilesOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class RuntimeContentContainer extends Folder {

        /**
         * @constructs RuntimeContentContainer
         * @param options {object} An object implementing {@link IRuntimeContentContainerOptions} interface
         */
        constructor(public readonly options: IRuntimeContentContainerOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Sites extends Folder {

        /**
         * @constructs Sites
         * @param options {object} An object implementing {@link ISitesOptions} interface
         */
        constructor(public readonly options: ISitesOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class SmartFolder extends Folder {
        Query?: string;
        EnableAutofilters?: Enums.EnableAutofilters;
        EnableLifespanFilter?: Enums.EnableLifespanFilter;

        /**
         * @constructs SmartFolder
         * @param options {object} An object implementing {@link ISmartFolderOptions} interface
         */
        constructor(public readonly options: ISmartFolderOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class SystemFolder extends Folder {

        /**
         * @constructs SystemFolder
         * @param options {object} An object implementing {@link ISystemFolderOptions} interface
         */
        constructor(public readonly options: ISystemFolderOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Resources extends SystemFolder {

        /**
         * @constructs Resources
         * @param options {object} An object implementing {@link IResourcesOptions} interface
         */
        constructor(public readonly options: IResourcesOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class TrashBag extends Folder {
        KeepUntil?: string;
        OriginalPath?: string;
        WorkspaceRelativePath?: string;
        WorkspaceId?: number;
        DeletedContent?: ComplexTypes.DeferredObject;

        /**
         * @constructs TrashBag
         * @param options {object} An object implementing {@link ITrashBagOptions} interface
         */
        constructor(public readonly options: ITrashBagOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
        DeletedContent?: ComplexTypes.DeferredObject;
    }

    /**
     * Class representing a Workspace
     * @class Workspace
     * @extends {@link Folder}
     */
    export class Workspace extends Folder {
        Manager?: ComplexTypes.DeferredObject;
        Deadline?: string;
        IsActive?: boolean;
        WorkspaceSkin?: ComplexTypes.DeferredObject;
        IsCritical?: boolean;
        IsWallContainer?: boolean;
        IsFollowed?: boolean;

        /**
         * @constructs Workspace
         * @param options {object} An object implementing {@link IWorkspaceOptions} interface
         */
        constructor(public readonly options: IWorkspaceOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a Workspace.
     * @interface IWorkspaceOptions
     * @extends {@link IFolderOptions}
     */
    export interface IWorkspaceOptions extends IFolderOptions {
        Manager?: ComplexTypes.DeferredObject;
        Deadline?: string;
        IsActive?: boolean;
        WorkspaceSkin?: ComplexTypes.DeferredObject;
        IsCritical?: boolean;
        IsWallContainer?: boolean;
        IsFollowed?: boolean;
    }

    /**
     * Class representing a Site
     * @class Site
     * @extends {@link Workspace}
     */
    export class Site extends Workspace {
        Language?: Enums.Language;
        EnableClientBasedCulture?: boolean;
        EnableUserBasedCulture?: boolean;
        UrlList?: string;
        StartPage?: ComplexTypes.DeferredObject;
        LoginPage?: ComplexTypes.DeferredObject;
        SiteSkin?: ComplexTypes.DeferredObject;
        DenyCrossSiteAccess?: boolean;

        /**
         * @constructs Site
         * @param options {object} An object implementing {@link ISiteOptions} interface
         */
        constructor(public readonly options: ISiteOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
        StartPage?: ComplexTypes.DeferredObject;
        LoginPage?: ComplexTypes.DeferredObject;
        SiteSkin?: ComplexTypes.DeferredObject;
        DenyCrossSiteAccess?: boolean;
    }

    /**
     * Class representing a TrashBin
     * @class TrashBin
     * @extends {@link Workspace}
     */
    export class TrashBin extends Workspace {
        MinRetentionTime?: number;
        SizeQuota?: number;
        BagCapacity?: number;

        /**
         * @constructs TrashBin
         * @param options {object} An object implementing {@link ITrashBinOptions} interface
         */
        constructor(public readonly options: ITrashBinOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class UserProfile extends Workspace {
        User?: ComplexTypes.DeferredObject;

        /**
         * @constructs UserProfile
         * @param options {object} An object implementing {@link IUserProfileOptions} interface
         */
        constructor(public readonly options: IUserProfileOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a UserProfile.
     * @interface IUserProfileOptions
     * @extends {@link IWorkspaceOptions}
     */
    export interface IUserProfileOptions extends IWorkspaceOptions {
        User?: ComplexTypes.DeferredObject;
    }

    /**
     * Class representing a Group
     * @class Group
     * @extends {@link GenericContent}
     */
    export class Group extends GenericContent {
        Members?: ComplexTypes.DeferredObject;
        SyncGuid?: string;
        LastSync?: string;

        /**
         * @constructs Group
         * @param options {object} An object implementing {@link IGroupOptions} interface
         */
        constructor(public readonly options: IGroupOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a Group.
     * @interface IGroupOptions
     * @extends {@link IGenericContentOptions}
     */
    export interface IGroupOptions extends IGenericContentOptions {
        Members?: ComplexTypes.DeferredObject;
        SyncGuid?: string;
        LastSync?: string;
    }

    /**
     * Class representing a ListItem
     * @class ListItem
     * @extends {@link GenericContent}
     */
    export class ListItem extends GenericContent {

        /**
         * @constructs ListItem
         * @param options {object} An object implementing {@link IListItemOptions} interface
         */
        constructor(public readonly options: IListItemOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class CustomListItem extends ListItem {
        WorkflowsRunning?: boolean;

        /**
         * @constructs CustomListItem
         * @param options {object} An object implementing {@link ICustomListItemOptions} interface
         */
        constructor(public readonly options: ICustomListItemOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class Memo extends ListItem {
        Date?: string;
        MemoType?: Enums.MemoType;
        SeeAlso?: ComplexTypes.DeferredObject;

        /**
         * @constructs Memo
         * @param options {object} An object implementing {@link IMemoOptions} interface
         */
        constructor(public readonly options: IMemoOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a Memo.
     * @interface IMemoOptions
     * @extends {@link IListItemOptions}
     */
    export interface IMemoOptions extends IListItemOptions {
        Date?: string;
        MemoType?: Enums.MemoType;
        SeeAlso?: ComplexTypes.DeferredObject;
    }

    /**
     * Class representing a Task
     * @class Task
     * @extends {@link ListItem}
     */
    export class Task extends ListItem {
        StartDate?: string;
        DueDate?: string;
        AssignedTo?: ComplexTypes.DeferredObject;
        Priority?: Enums.Priority;
        Status?: Enums.Status;
        TaskCompletion?: number;
        RemainingDays?: number;
        DueText?: string;
        DueCssClass?: string;

        /**
         * @constructs Task
         * @param options {object} An object implementing {@link ITaskOptions} interface
         */
        constructor(public readonly options: ITaskOptions, repository: BaseRepository) {
            super(options, repository);
        }

    }
    /**
     * Interface for classes that represent a Task.
     * @interface ITaskOptions
     * @extends {@link IListItemOptions}
     */
    export interface ITaskOptions extends IListItemOptions {
        StartDate?: string;
        DueDate?: string;
        AssignedTo?: ComplexTypes.DeferredObject;
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
    export class Query extends GenericContent {
        Query?: string;
        QueryType?: Enums.QueryType;

        /**
         * @constructs Query
         * @param options {object} An object implementing {@link IQueryOptions} interface
         */
        constructor(public readonly options: IQueryOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
    export class User extends GenericContent {
        LoginName?: string;
        JobTitle?: string;
        Enabled?: boolean;
        Domain?: string;
        Email?: string;
        FullName?: string;
        ImageRef?: ComplexTypes.DeferredObject;
        ImageData?: ComplexTypes.DeferredObject;
        Avatar?: ComplexTypes.DeferredObject;
        Password?: string;
        SyncGuid?: string;
        LastSync?: string;
        Captcha?: string;
        Manager?: ComplexTypes.DeferredObject;
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
        FollowedWorkspaces?: ComplexTypes.DeferredObject;
        ProfilePath?: string;

        /**
         * @constructs User
         * @param options {object} An object implementing {@link IUserOptions} interface
         */
        constructor(public readonly options: IUserOptions, repository: BaseRepository) {
            super(options, repository);
        }

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
        ImageRef?: ComplexTypes.DeferredObject;
        ImageData?: ComplexTypes.DeferredObject;
        Avatar?: ComplexTypes.DeferredObject;
        Password?: string;
        SyncGuid?: string;
        LastSync?: string;
        Captcha?: string;
        Manager?: ComplexTypes.DeferredObject;
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
        FollowedWorkspaces?: ComplexTypes.DeferredObject;
        ProfilePath?: string;
    }

