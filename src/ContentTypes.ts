import { Enums } from './Enums';
import { FieldSettings } from './FieldSettings';
import { Fields } from './Fields';
import { Content, IContentOptions } from './Content';

/**
 * The Content Repository contains many different types of ```Content```. ```Content``` vary in structure and even in function. Different types of content contain different fields,
 * are displayed with different views, and may also implement different business logic. The fields, views and business logic of a content is defined by its type - the Content Type.
 *
 * Content Types are defined in a type hierarchy: a Content Type may be inherited from another Content Type - thus automatically inheriting its fields.
 *
 * This module represents the above mentioned type hierarchy by Typescript classes with the Content Types' Fields as properties. With Typescript classes we can derive types from another
 * inheriting its properties just like Content Types in the Content Repository. This module provides us to create an objects with a type so that we can validate on its properties by their
 * types or check the required ones.
 */

export module ContentTypes {
    /**
     * Class representing a ContentType
     * @class ContentType
     * @extends {@link Content}
     */
    export class ContentType extends Content {
        Id: number;
        ParentId?: number;
        VersionId?: number;
        Type: string;
        Name: string;
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
        Binary?: Fields.DeferredObject;
        CreatedBy?: Fields.DeferredObject;
        CreationDate?: Date;
        ModifiedBy?: Fields.DeferredObject;
        ModificationDate?: Date;
        EnableLifespan?: boolean;

        /**
         * @constructs ContentType
         * @param options {object} An object implementing {@link IContentTypeOptions} interface
         */
        constructor(options: IContentTypeOptions) {
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
    /**
     * Interface for classes that represent a ContentType.
     * @interface IContentTypeOptions
     * @extends {@link IContentOptions}
     */
    interface IContentTypeOptions extends IContentOptions {
        Id: number;
        ParentId?: number;
        VersionId?: number;
        Type: string;
        Name: string;
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
        Binary?: Fields.DeferredObject;
        CreatedBy?: Fields.DeferredObject;
        CreationDate?: Date;
        ModifiedBy?: Fields.DeferredObject;
        ModificationDate?: Date;
        EnableLifespan?: boolean;
    }

    /**
     * Class representing a GenericContent
     * @class GenericContent
     * @extends {@link Content}
     */
    export class GenericContent extends Content {
        Id: number;
        ParentId?: number;
        OwnerId?: number;
        Owner?: Fields.DeferredObject;
        VersionId?: number;
        Type: string;
        Icon?: string;
        Name: string;
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
        ValidFrom?: Date;
        ValidTill?: Date;
        AllowedChildTypes?: string;
        EffectiveAllowedChildTypes?: string;
        VersioningMode?: Enums.VersioningMode;
        InheritableVersioningMode?: Enums.InheritableVersioningMode;
        CreatedBy?: Fields.DeferredObject;
        CreationDate?: Date;
        ModifiedBy?: Fields.DeferredObject;
        ModificationDate?: Date;
        ApprovingMode?: Enums.ApprovingMode;
        InheritableApprovingMode?: Enums.InheritableApprovingMode;
        Locked?: boolean;
        CheckedOutTo?: Fields.DeferredObject;
        TrashDisabled?: boolean;
        SavingState?: Enums.SavingState;
        ExtensionData?: string;
        BrowseApplication?: Fields.DeferredObject;
        Approvable?: boolean;
        IsTaggable?: boolean;
        Tags?: string;
        IsRateable?: boolean;
        RateStr?: string;
        RateAvg?: number;
        RateCount?: number;
        Rate?: string;
        Publishable?: boolean;
        Versions?: Fields.DeferredObject;
        CheckInComments?: string;
        RejectReason?: string;
        Workspace?: Fields.DeferredObject;
        BrowseUrl?: string;

        /**
         * @constructs GenericContent
         * @param options {object} An object implementing {@link IGenericContentOptions} interface
         */
        constructor(options: IGenericContentOptions) {
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
    /**
     * Interface for classes that represent a GenericContent.
     * @interface IGenericContentOptions
     * @extends {@link IContentOptions}
     */
    interface IGenericContentOptions extends IContentOptions {
        Id: number;
        ParentId?: number;
        OwnerId?: number;
        Owner?: Fields.DeferredObject;
        VersionId?: number;
        Type: string;
        Icon?: string;
        Name: string;
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
        ValidFrom?: Date;
        ValidTill?: Date;
        AllowedChildTypes?: string;
        EffectiveAllowedChildTypes?: string;
        VersioningMode?: Enums.VersioningMode;
        InheritableVersioningMode?: Enums.InheritableVersioningMode;
        CreatedBy?: Fields.DeferredObject;
        CreationDate?: Date;
        ModifiedBy?: Fields.DeferredObject;
        ModificationDate?: Date;
        ApprovingMode?: Enums.ApprovingMode;
        InheritableApprovingMode?: Enums.InheritableApprovingMode;
        Locked?: boolean;
        CheckedOutTo?: Fields.DeferredObject;
        TrashDisabled?: boolean;
        SavingState?: Enums.SavingState;
        ExtensionData?: string;
        BrowseApplication?: Fields.DeferredObject;
        Approvable?: boolean;
        IsTaggable?: boolean;
        Tags?: string;
        IsRateable?: boolean;
        RateStr?: string;
        RateAvg?: number;
        RateCount?: number;
        Rate?: string;
        Publishable?: boolean;
        Versions?: Fields.DeferredObject;
        CheckInComments?: string;
        RejectReason?: string;
        Workspace?: Fields.DeferredObject;
        BrowseUrl?: string;
    }

    /**
     * Class representing a ContentLink
     * @class ContentLink
     * @extends {@link GenericContent}
     */
    export class ContentLink extends GenericContent {
        Link?: Fields.DeferredObject;

        /**
         * @constructs ContentLink
         * @param options {object} An object implementing {@link IContentLinkOptions} interface
         */
        constructor(options: IContentLinkOptions) {
            super(options);
            this.Link = options.Link;
        }

    }
    /**
     * Interface for classes that represent a ContentLink.
     * @interface IContentLinkOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IContentLinkOptions extends IGenericContentOptions {
        Link?: Fields.DeferredObject;
    }

    /**
     * Class representing a File
     * @class File
     * @extends {@link GenericContent}
     */
    export class File extends GenericContent {
        Binary?: Fields.DeferredObject;
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
        constructor(options: IFileOptions) {
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
    /**
     * Interface for classes that represent a File.
     * @interface IFileOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IFileOptions extends IGenericContentOptions {
        Binary?: Fields.DeferredObject;
        Size?: number;
        FullSize?: number;
        PageCount?: number;
        MimeType?: string;
        Shapes?: string;
        PageAttributes?: string;
        Watermark?: string;
    }

    /**
     * Class representing a ContentView
     * @class ContentView
     * @extends {@link File}
     */
    export class ContentView extends File {

        /**
         * @constructs ContentView
         * @param options {object} An object implementing {@link IContentViewOptions} interface
         */
        constructor(options: IContentViewOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ContentView.
     * @interface IContentViewOptions
     * @extends {@link IFileOptions}
     */
    interface IContentViewOptions extends IFileOptions {
    }

    /**
     * Class representing a Contract
     * @class Contract
     * @extends {@link File}
     */
    export class Contract extends File {
        ContractId?: string;
        Project?: Fields.DeferredObject;
        Language?: Enums.Language;
        Responsee?: Fields.DeferredObject;
        Lawyer?: string;
        Keywords?: string;
        RelatedDocs?: Fields.DeferredObject;

        /**
         * @constructs Contract
         * @param options {object} An object implementing {@link IContractOptions} interface
         */
        constructor(options: IContractOptions) {
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
    /**
     * Interface for classes that represent a Contract.
     * @interface IContractOptions
     * @extends {@link IFileOptions}
     */
    interface IContractOptions extends IFileOptions {
        ContractId?: string;
        Project?: Fields.DeferredObject;
        Language?: Enums.Language;
        Responsee?: Fields.DeferredObject;
        Lawyer?: string;
        Keywords?: string;
        RelatedDocs?: Fields.DeferredObject;
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
        constructor(options: IDynamicJsonContentOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a DynamicJsonContent.
     * @interface IDynamicJsonContentOptions
     * @extends {@link IFileOptions}
     */
    interface IDynamicJsonContentOptions extends IFileOptions {
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
        constructor(options: IExecutableFileOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ExecutableFile.
     * @interface IExecutableFileOptions
     * @extends {@link IFileOptions}
     */
    interface IExecutableFileOptions extends IFileOptions {
    }

    /**
     * Class representing a FieldControlTemplate
     * @class FieldControlTemplate
     * @extends {@link File}
     */
    export class FieldControlTemplate extends File {

        /**
         * @constructs FieldControlTemplate
         * @param options {object} An object implementing {@link IFieldControlTemplateOptions} interface
         */
        constructor(options: IFieldControlTemplateOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a FieldControlTemplate.
     * @interface IFieldControlTemplateOptions
     * @extends {@link IFileOptions}
     */
    interface IFieldControlTemplateOptions extends IFileOptions {
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
        constructor(options: IHtmlTemplateOptions) {
            super(options);
            this.TemplateText = options.TemplateText;
        }

    }
    /**
     * Interface for classes that represent a HtmlTemplate.
     * @interface IHtmlTemplateOptions
     * @extends {@link IFileOptions}
     */
    interface IHtmlTemplateOptions extends IFileOptions {
        TemplateText?: string;
    }

    /**
     * Class representing a Image
     * @class Image
     * @extends {@link File}
     */
    export class Image extends File {
        Keywords?: string;
        DateTaken?: Date;
        Width?: number;
        Height?: number;

        /**
         * @constructs Image
         * @param options {object} An object implementing {@link IImageOptions} interface
         */
        constructor(options: IImageOptions) {
            super(options);
            this.Keywords = options.Keywords;
            this.DateTaken = options.DateTaken;
            this.Width = options.Width;
            this.Height = options.Height;
        }

    }
    /**
     * Interface for classes that represent a Image.
     * @interface IImageOptions
     * @extends {@link IFileOptions}
     */
    interface IImageOptions extends IFileOptions {
        Keywords?: string;
        DateTaken?: Date;
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
        constructor(options: IPreviewImageOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a PreviewImage.
     * @interface IPreviewImageOptions
     * @extends {@link IImageOptions}
     */
    interface IPreviewImageOptions extends IImageOptions {
    }

    /**
     * Class representing a OrderForm
     * @class OrderForm
     * @extends {@link File}
     */
    export class OrderForm extends File {
        CompanyName?: string;
        OrderFormId?: string;
        CompanySeat?: string;
        RepresentedBy?: string;
        ContactEmailAddress?: string;
        ContactPhoneNr?: string;

        /**
         * @constructs OrderForm
         * @param options {object} An object implementing {@link IOrderFormOptions} interface
         */
        constructor(options: IOrderFormOptions) {
            super(options);
            this.CompanyName = options.CompanyName;
            this.OrderFormId = options.OrderFormId;
            this.CompanySeat = options.CompanySeat;
            this.RepresentedBy = options.RepresentedBy;
            this.ContactEmailAddress = options.ContactEmailAddress;
            this.ContactPhoneNr = options.ContactPhoneNr;
        }

    }
    /**
     * Interface for classes that represent a OrderForm.
     * @interface IOrderFormOptions
     * @extends {@link IFileOptions}
     */
    interface IOrderFormOptions extends IFileOptions {
        CompanyName?: string;
        OrderFormId?: string;
        CompanySeat?: string;
        RepresentedBy?: string;
        ContactEmailAddress?: string;
        ContactPhoneNr?: string;
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
        constructor(options: ISettingsOptions) {
            super(options);
            this.GlobalOnly = options.GlobalOnly;
        }

    }
    /**
     * Interface for classes that represent a Settings.
     * @interface ISettingsOptions
     * @extends {@link IFileOptions}
     */
    interface ISettingsOptions extends IFileOptions {
        GlobalOnly?: boolean;
    }

    /**
     * Class representing a ADSettings
     * @class ADSettings
     * @extends {@link Settings}
     */
    export class ADSettings extends Settings {

        /**
         * @constructs ADSettings
         * @param options {object} An object implementing {@link IADSettingsOptions} interface
         */
        constructor(options: IADSettingsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ADSettings.
     * @interface IADSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    interface IADSettingsOptions extends ISettingsOptions {
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
        constructor(options: IIndexingSettingsOptions) {
            super(options);
            this.TextExtractorInstances = options.TextExtractorInstances;
        }

    }
    /**
     * Interface for classes that represent a IndexingSettings.
     * @interface IIndexingSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    interface IIndexingSettingsOptions extends ISettingsOptions {
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
        constructor(options: ILoggingSettingsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a LoggingSettings.
     * @interface ILoggingSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    interface ILoggingSettingsOptions extends ISettingsOptions {
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
        constructor(options: IPortalSettingsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a PortalSettings.
     * @interface IPortalSettingsOptions
     * @extends {@link ISettingsOptions}
     */
    interface IPortalSettingsOptions extends ISettingsOptions {
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
        constructor(options: ISystemFileOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a SystemFile.
     * @interface ISystemFileOptions
     * @extends {@link IFileOptions}
     */
    interface ISystemFileOptions extends IFileOptions {
    }

    /**
     * Class representing a MasterPage
     * @class MasterPage
     * @extends {@link SystemFile}
     */
    export class MasterPage extends SystemFile {

        /**
         * @constructs MasterPage
         * @param options {object} An object implementing {@link IMasterPageOptions} interface
         */
        constructor(options: IMasterPageOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a MasterPage.
     * @interface IMasterPageOptions
     * @extends {@link ISystemFileOptions}
     */
    interface IMasterPageOptions extends ISystemFileOptions {
    }

    /**
     * Class representing a PageTemplate
     * @class PageTemplate
     * @extends {@link SystemFile}
     */
    export class PageTemplate extends SystemFile {
        MasterPageNode?: Fields.DeferredObject;

        /**
         * @constructs PageTemplate
         * @param options {object} An object implementing {@link IPageTemplateOptions} interface
         */
        constructor(options: IPageTemplateOptions) {
            super(options);
            this.MasterPageNode = options.MasterPageNode;
        }

    }
    /**
     * Interface for classes that represent a PageTemplate.
     * @interface IPageTemplateOptions
     * @extends {@link ISystemFileOptions}
     */
    interface IPageTemplateOptions extends ISystemFileOptions {
        MasterPageNode?: Fields.DeferredObject;
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
        constructor(options: IResourceOptions) {
            super(options);
            this.Downloads = options.Downloads;
        }

    }
    /**
     * Interface for classes that represent a Resource.
     * @interface IResourceOptions
     * @extends {@link ISystemFileOptions}
     */
    interface IResourceOptions extends ISystemFileOptions {
        Downloads?: number;
    }

    /**
     * Class representing a UserControl
     * @class UserControl
     * @extends {@link File}
     */
    export class UserControl extends File {

        /**
         * @constructs UserControl
         * @param options {object} An object implementing {@link IUserControlOptions} interface
         */
        constructor(options: IUserControlOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a UserControl.
     * @interface IUserControlOptions
     * @extends {@link IFileOptions}
     */
    interface IUserControlOptions extends IFileOptions {
    }

    /**
     * Class representing a ViewBase
     * @class ViewBase
     * @extends {@link UserControl}
     */
    export class ViewBase extends UserControl {
        IsDefault?: boolean;
        Template?: Fields.DeferredObject;
        FilterXml?: string;
        EnableAutofilters?: Enums.EnableAutofilters;
        EnableLifespanFilter?: Enums.EnableLifespanFilter;
        QueryTop?: number;
        QuerySkip?: number;

        /**
         * @constructs ViewBase
         * @param options {object} An object implementing {@link IViewBaseOptions} interface
         */
        constructor(options: IViewBaseOptions) {
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
    /**
     * Interface for classes that represent a ViewBase.
     * @interface IViewBaseOptions
     * @extends {@link IUserControlOptions}
     */
    interface IViewBaseOptions extends IUserControlOptions {
        IsDefault?: boolean;
        Template?: Fields.DeferredObject;
        FilterXml?: string;
        EnableAutofilters?: Enums.EnableAutofilters;
        EnableLifespanFilter?: Enums.EnableLifespanFilter;
        QueryTop?: number;
        QuerySkip?: number;
    }

    /**
     * Class representing a ListView
     * @class ListView
     * @extends {@link ViewBase}
     */
    export class ListView extends ViewBase {
        Columns?: string;
        SortBy?: string;
        GroupBy?: string;
        Flat?: boolean;
        MainScenario?: string;

        /**
         * @constructs ListView
         * @param options {object} An object implementing {@link IListViewOptions} interface
         */
        constructor(options: IListViewOptions) {
            super(options);
            this.Columns = options.Columns;
            this.SortBy = options.SortBy;
            this.GroupBy = options.GroupBy;
            this.Flat = options.Flat;
            this.MainScenario = options.MainScenario;
        }

    }
    /**
     * Interface for classes that represent a ListView.
     * @interface IListViewOptions
     * @extends {@link IViewBaseOptions}
     */
    interface IListViewOptions extends IViewBaseOptions {
        Columns?: string;
        SortBy?: string;
        GroupBy?: string;
        Flat?: boolean;
        MainScenario?: string;
    }

    /**
     * Class representing a Video
     * @class Video
     * @extends {@link File}
     */
    export class Video extends File {
        Keywords?: string;

        /**
         * @constructs Video
         * @param options {object} An object implementing {@link IVideoOptions} interface
         */
        constructor(options: IVideoOptions) {
            super(options);
            this.Keywords = options.Keywords;
        }

    }
    /**
     * Interface for classes that represent a Video.
     * @interface IVideoOptions
     * @extends {@link IFileOptions}
     */
    interface IVideoOptions extends IFileOptions {
        Keywords?: string;
    }

    /**
     * Class representing a WorkflowDefinition
     * @class WorkflowDefinition
     * @extends {@link File}
     */
    export class WorkflowDefinition extends File {
        ContentWorkflow?: boolean;
        AssignableToContentList?: boolean;
        AbortOnRelatedContentChange?: boolean;
        DeleteInstanceAfterFinished?: Enums.DeleteInstanceAfterFinished;

        /**
         * @constructs WorkflowDefinition
         * @param options {object} An object implementing {@link IWorkflowDefinitionOptions} interface
         */
        constructor(options: IWorkflowDefinitionOptions) {
            super(options);
            this.ContentWorkflow = options.ContentWorkflow;
            this.AssignableToContentList = options.AssignableToContentList;
            this.AbortOnRelatedContentChange = options.AbortOnRelatedContentChange;
            this.DeleteInstanceAfterFinished = options.DeleteInstanceAfterFinished;
        }

    }
    /**
     * Interface for classes that represent a WorkflowDefinition.
     * @interface IWorkflowDefinitionOptions
     * @extends {@link IFileOptions}
     */
    interface IWorkflowDefinitionOptions extends IFileOptions {
        ContentWorkflow?: boolean;
        AssignableToContentList?: boolean;
        AbortOnRelatedContentChange?: boolean;
        DeleteInstanceAfterFinished?: Enums.DeleteInstanceAfterFinished;
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
        constructor(options: IFolderOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Folder.
     * @interface IFolderOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IFolderOptions extends IGenericContentOptions {
    }

    /**
     * Class representing a ADFolder
     * @class ADFolder
     * @extends {@link Folder}
     */
    export class ADFolder extends Folder {
        SyncGuid?: string;
        LastSync?: Date;

        /**
         * @constructs ADFolder
         * @param options {object} An object implementing {@link IADFolderOptions} interface
         */
        constructor(options: IADFolderOptions) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }

    }
    /**
     * Interface for classes that represent a ADFolder.
     * @interface IADFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface IADFolderOptions extends IFolderOptions {
        SyncGuid?: string;
        LastSync?: Date;
    }

    /**
     * Class representing a ArticleSection
     * @class ArticleSection
     * @extends {@link Folder}
     */
    export class ArticleSection extends Folder {

        /**
         * @constructs ArticleSection
         * @param options {object} An object implementing {@link IArticleSectionOptions} interface
         */
        constructor(options: IArticleSectionOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ArticleSection.
     * @interface IArticleSectionOptions
     * @extends {@link IFolderOptions}
     */
    interface IArticleSectionOptions extends IFolderOptions {
    }

    /**
     * Class representing a ContentList
     * @class ContentList
     * @extends {@link Folder}
     */
    export class ContentList extends Folder {
        ContentListDefinition?: string;
        DefaultView?: string;
        AvailableViews?: Fields.DeferredObject;
        FieldSettingContents?: Fields.DeferredObject;
        AvailableContentTypeFields?: Fields.DeferredObject;
        ListEmail?: string;
        ExchangeSubscriptionId?: string;
        OverwriteFiles?: boolean;
        GroupAttachments?: Enums.GroupAttachments;
        SaveOriginalEmail?: boolean;
        IncomingEmailWorkflow?: Fields.DeferredObject;
        OnlyFromLocalGroups?: boolean;
        InboxFolder?: string;
        OwnerWhenVisitor?: Fields.DeferredObject;

        /**
         * @constructs ContentList
         * @param options {object} An object implementing {@link IContentListOptions} interface
         */
        constructor(options: IContentListOptions) {
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
    /**
     * Interface for classes that represent a ContentList.
     * @interface IContentListOptions
     * @extends {@link IFolderOptions}
     */
    interface IContentListOptions extends IFolderOptions {
        ContentListDefinition?: string;
        DefaultView?: string;
        AvailableViews?: Fields.DeferredObject;
        FieldSettingContents?: Fields.DeferredObject;
        AvailableContentTypeFields?: Fields.DeferredObject;
        ListEmail?: string;
        ExchangeSubscriptionId?: string;
        OverwriteFiles?: boolean;
        GroupAttachments?: Enums.GroupAttachments;
        SaveOriginalEmail?: boolean;
        IncomingEmailWorkflow?: Fields.DeferredObject;
        OnlyFromLocalGroups?: boolean;
        InboxFolder?: string;
        OwnerWhenVisitor?: Fields.DeferredObject;
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
        constructor(options: IAspectOptions) {
            super(options);
            this.AspectDefinition = options.AspectDefinition;
        }

    }
    /**
     * Interface for classes that represent a Aspect.
     * @interface IAspectOptions
     * @extends {@link IContentListOptions}
     */
    interface IAspectOptions extends IContentListOptions {
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
        constructor(options: IItemListOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ItemList.
     * @interface IItemListOptions
     * @extends {@link IContentListOptions}
     */
    interface IItemListOptions extends IContentListOptions {
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
        constructor(options: ICustomListOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a CustomList.
     * @interface ICustomListOptions
     * @extends {@link IItemListOptions}
     */
    interface ICustomListOptions extends IItemListOptions {
    }

    /**
     * Class representing a EventList
     * @class EventList
     * @extends {@link ItemList}
     */
    export class EventList extends ItemList {
        RegistrationFolder?: Fields.DeferredObject;

        /**
         * @constructs EventList
         * @param options {object} An object implementing {@link IEventListOptions} interface
         */
        constructor(options: IEventListOptions) {
            super(options);
            this.RegistrationFolder = options.RegistrationFolder;
        }

    }
    /**
     * Interface for classes that represent a EventList.
     * @interface IEventListOptions
     * @extends {@link IItemListOptions}
     */
    interface IEventListOptions extends IItemListOptions {
        RegistrationFolder?: Fields.DeferredObject;
    }

    /**
     * Class representing a Form
     * @class Form
     * @extends {@link ItemList}
     */
    export class Form extends ItemList {
        TitleSubmitter?: string;
        AfterSubmitText?: string;
        EmailList?: string;
        EmailFrom?: string;
        EmailFromSubmitter?: string;
        EmailField?: string;
        EmailTemplate?: string;
        EmailTemplateSubmitter?: string;

        /**
         * @constructs Form
         * @param options {object} An object implementing {@link IFormOptions} interface
         */
        constructor(options: IFormOptions) {
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
    /**
     * Interface for classes that represent a Form.
     * @interface IFormOptions
     * @extends {@link IItemListOptions}
     */
    interface IFormOptions extends IItemListOptions {
        TitleSubmitter?: string;
        AfterSubmitText?: string;
        EmailList?: string;
        EmailFrom?: string;
        EmailFromSubmitter?: string;
        EmailField?: string;
        EmailTemplate?: string;
        EmailTemplateSubmitter?: string;
    }

    /**
     * Class representing a EventRegistrationForm
     * @class EventRegistrationForm
     * @extends {@link Form}
     */
    export class EventRegistrationForm extends Form {

        /**
         * @constructs EventRegistrationForm
         * @param options {object} An object implementing {@link IEventRegistrationFormOptions} interface
         */
        constructor(options: IEventRegistrationFormOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a EventRegistrationForm.
     * @interface IEventRegistrationFormOptions
     * @extends {@link IFormOptions}
     */
    interface IEventRegistrationFormOptions extends IFormOptions {
    }

    /**
     * Class representing a ForumTopic
     * @class ForumTopic
     * @extends {@link ItemList}
     */
    export class ForumTopic extends ItemList {

        /**
         * @constructs ForumTopic
         * @param options {object} An object implementing {@link IForumTopicOptions} interface
         */
        constructor(options: IForumTopicOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ForumTopic.
     * @interface IForumTopicOptions
     * @extends {@link IItemListOptions}
     */
    interface IForumTopicOptions extends IItemListOptions {
    }

    /**
     * Class representing a LinkList
     * @class LinkList
     * @extends {@link ItemList}
     */
    export class LinkList extends ItemList {

        /**
         * @constructs LinkList
         * @param options {object} An object implementing {@link ILinkListOptions} interface
         */
        constructor(options: ILinkListOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a LinkList.
     * @interface ILinkListOptions
     * @extends {@link IItemListOptions}
     */
    interface ILinkListOptions extends IItemListOptions {
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
        constructor(options: IMemoListOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a MemoList.
     * @interface IMemoListOptions
     * @extends {@link IItemListOptions}
     */
    interface IMemoListOptions extends IItemListOptions {
    }

    /**
     * Class representing a Survey
     * @class Survey
     * @extends {@link ItemList}
     */
    export class Survey extends ItemList {
        LandingPage?: Fields.DeferredObject;
        PageContentView?: Fields.DeferredObject;
        InvalidSurveyPage?: Fields.DeferredObject;
        EnableNotificationMail?: boolean;
        SenderAddress?: string;
        Evaluators?: Fields.DeferredObject;
        MailTemplatePage?: Fields.DeferredObject;
        EnableMoreFilling?: boolean;

        /**
         * @constructs Survey
         * @param options {object} An object implementing {@link ISurveyOptions} interface
         */
        constructor(options: ISurveyOptions) {
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
    /**
     * Interface for classes that represent a Survey.
     * @interface ISurveyOptions
     * @extends {@link IItemListOptions}
     */
    interface ISurveyOptions extends IItemListOptions {
        LandingPage?: Fields.DeferredObject;
        PageContentView?: Fields.DeferredObject;
        InvalidSurveyPage?: Fields.DeferredObject;
        EnableNotificationMail?: boolean;
        SenderAddress?: string;
        Evaluators?: Fields.DeferredObject;
        MailTemplatePage?: Fields.DeferredObject;
        EnableMoreFilling?: boolean;
    }

    /**
     * Class representing a Voting
     * @class Voting
     * @extends {@link Survey}
     */
    export class Voting extends Survey {
        LandingPageContentView?: Fields.DeferredObject;
        ResultPageContentView?: Fields.DeferredObject;
        VotingPageContentView?: Fields.DeferredObject;
        CannotSeeResultContentView?: Fields.DeferredObject;
        IsResultVisibleBefore?: boolean;

        /**
         * @constructs Voting
         * @param options {object} An object implementing {@link IVotingOptions} interface
         */
        constructor(options: IVotingOptions) {
            super(options);
            this.LandingPageContentView = options.LandingPageContentView;
            this.ResultPageContentView = options.ResultPageContentView;
            this.VotingPageContentView = options.VotingPageContentView;
            this.CannotSeeResultContentView = options.CannotSeeResultContentView;
            this.IsResultVisibleBefore = options.IsResultVisibleBefore;
        }

    }
    /**
     * Interface for classes that represent a Voting.
     * @interface IVotingOptions
     * @extends {@link ISurveyOptions}
     */
    interface IVotingOptions extends ISurveyOptions {
        LandingPageContentView?: Fields.DeferredObject;
        ResultPageContentView?: Fields.DeferredObject;
        VotingPageContentView?: Fields.DeferredObject;
        CannotSeeResultContentView?: Fields.DeferredObject;
        IsResultVisibleBefore?: boolean;
    }

    /**
     * Class representing a SurveyList
     * @class SurveyList
     * @extends {@link ItemList}
     */
    export class SurveyList extends ItemList {
        RawJson?: string;
        IntroText?: string;
        OutroText?: string;
        OutroRedirectLink?: Fields.DeferredObject;
        LandingPage?: Fields.DeferredObject;
        OnlySingleResponse?: boolean;
        EnableNotificationMail?: boolean;
        EmailList?: string;
        EmailField?: string;
        EmailFrom?: string;
        MailSubject?: string;
        AdminEmailTemplate?: string;
        SubmitterEmailTemplate?: string;

        /**
         * @constructs SurveyList
         * @param options {object} An object implementing {@link ISurveyListOptions} interface
         */
        constructor(options: ISurveyListOptions) {
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
    /**
     * Interface for classes that represent a SurveyList.
     * @interface ISurveyListOptions
     * @extends {@link IItemListOptions}
     */
    interface ISurveyListOptions extends IItemListOptions {
        RawJson?: string;
        IntroText?: string;
        OutroText?: string;
        OutroRedirectLink?: Fields.DeferredObject;
        LandingPage?: Fields.DeferredObject;
        OnlySingleResponse?: boolean;
        EnableNotificationMail?: boolean;
        EmailList?: string;
        EmailField?: string;
        EmailFrom?: string;
        MailSubject?: string;
        AdminEmailTemplate?: string;
        SubmitterEmailTemplate?: string;
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
        constructor(options: ITaskListOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a TaskList.
     * @interface ITaskListOptions
     * @extends {@link IItemListOptions}
     */
    interface ITaskListOptions extends IItemListOptions {
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
        constructor(options: ILibraryOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Library.
     * @interface ILibraryOptions
     * @extends {@link IContentListOptions}
     */
    interface ILibraryOptions extends IContentListOptions {
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
        constructor(options: IDocumentLibraryOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a DocumentLibrary.
     * @interface IDocumentLibraryOptions
     * @extends {@link ILibraryOptions}
     */
    interface IDocumentLibraryOptions extends ILibraryOptions {
    }

    /**
     * Class representing a ImageLibrary
     * @class ImageLibrary
     * @extends {@link Library}
     */
    export class ImageLibrary extends Library {
        CoverImage?: Fields.DeferredObject;

        /**
         * @constructs ImageLibrary
         * @param options {object} An object implementing {@link IImageLibraryOptions} interface
         */
        constructor(options: IImageLibraryOptions) {
            super(options);
            this.CoverImage = options.CoverImage;
        }

    }
    /**
     * Interface for classes that represent a ImageLibrary.
     * @interface IImageLibraryOptions
     * @extends {@link ILibraryOptions}
     */
    interface IImageLibraryOptions extends ILibraryOptions {
        CoverImage?: Fields.DeferredObject;
    }

    /**
     * Class representing a ContentViews
     * @class ContentViews
     * @extends {@link Folder}
     */
    export class ContentViews extends Folder {

        /**
         * @constructs ContentViews
         * @param options {object} An object implementing {@link IContentViewsOptions} interface
         */
        constructor(options: IContentViewsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ContentViews.
     * @interface IContentViewsOptions
     * @extends {@link IFolderOptions}
     */
    interface IContentViewsOptions extends IFolderOptions {
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
        constructor(options: IDeviceOptions) {
            super(options);
            this.UserAgentPattern = options.UserAgentPattern;
        }

    }
    /**
     * Interface for classes that represent a Device.
     * @interface IDeviceOptions
     * @extends {@link IFolderOptions}
     */
    interface IDeviceOptions extends IFolderOptions {
        UserAgentPattern?: string;
    }

    /**
     * Class representing a DiscussionForum
     * @class DiscussionForum
     * @extends {@link Folder}
     */
    export class DiscussionForum extends Folder {

        /**
         * @constructs DiscussionForum
         * @param options {object} An object implementing {@link IDiscussionForumOptions} interface
         */
        constructor(options: IDiscussionForumOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a DiscussionForum.
     * @interface IDiscussionForumOptions
     * @extends {@link IFolderOptions}
     */
    interface IDiscussionForumOptions extends IFolderOptions {
    }

    /**
     * Class representing a DocumentWorkspaceFolder
     * @class DocumentWorkspaceFolder
     * @extends {@link Folder}
     */
    export class DocumentWorkspaceFolder extends Folder {

        /**
         * @constructs DocumentWorkspaceFolder
         * @param options {object} An object implementing {@link IDocumentWorkspaceFolderOptions} interface
         */
        constructor(options: IDocumentWorkspaceFolderOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a DocumentWorkspaceFolder.
     * @interface IDocumentWorkspaceFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface IDocumentWorkspaceFolderOptions extends IFolderOptions {
    }

    /**
     * Class representing a Domain
     * @class Domain
     * @extends {@link Folder}
     */
    export class Domain extends Folder {
        SyncGuid?: string;
        LastSync?: Date;

        /**
         * @constructs Domain
         * @param options {object} An object implementing {@link IDomainOptions} interface
         */
        constructor(options: IDomainOptions) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }

    }
    /**
     * Interface for classes that represent a Domain.
     * @interface IDomainOptions
     * @extends {@link IFolderOptions}
     */
    interface IDomainOptions extends IFolderOptions {
        SyncGuid?: string;
        LastSync?: Date;
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
        constructor(options: IDomainsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Domains.
     * @interface IDomainsOptions
     * @extends {@link IFolderOptions}
     */
    interface IDomainsOptions extends IFolderOptions {
    }

    /**
     * Class representing a Email
     * @class Email
     * @extends {@link Folder}
     */
    export class Email extends Folder {
        From?: string;
        Body?: string;
        Sent?: Date;

        /**
         * @constructs Email
         * @param options {object} An object implementing {@link IEmailOptions} interface
         */
        constructor(options: IEmailOptions) {
            super(options);
            this.From = options.From;
            this.Body = options.Body;
            this.Sent = options.Sent;
        }

    }
    /**
     * Interface for classes that represent a Email.
     * @interface IEmailOptions
     * @extends {@link IFolderOptions}
     */
    interface IEmailOptions extends IFolderOptions {
        From?: string;
        Body?: string;
        Sent?: Date;
    }

    /**
     * Class representing a ExpenseClaim
     * @class ExpenseClaim
     * @extends {@link Folder}
     */
    export class ExpenseClaim extends Folder {
        Sum?: number;

        /**
         * @constructs ExpenseClaim
         * @param options {object} An object implementing {@link IExpenseClaimOptions} interface
         */
        constructor(options: IExpenseClaimOptions) {
            super(options);
            this.Sum = options.Sum;
        }

    }
    /**
     * Interface for classes that represent a ExpenseClaim.
     * @interface IExpenseClaimOptions
     * @extends {@link IFolderOptions}
     */
    interface IExpenseClaimOptions extends IFolderOptions {
        Sum?: number;
    }

    /**
     * Class representing a FieldControlTemplates
     * @class FieldControlTemplates
     * @extends {@link Folder}
     */
    export class FieldControlTemplates extends Folder {

        /**
         * @constructs FieldControlTemplates
         * @param options {object} An object implementing {@link IFieldControlTemplatesOptions} interface
         */
        constructor(options: IFieldControlTemplatesOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a FieldControlTemplates.
     * @interface IFieldControlTemplatesOptions
     * @extends {@link IFolderOptions}
     */
    interface IFieldControlTemplatesOptions extends IFolderOptions {
    }

    /**
     * Class representing a KPIDatasource
     * @class KPIDatasource
     * @extends {@link Folder}
     */
    export class KPIDatasource extends Folder {
        KPIData?: string;

        /**
         * @constructs KPIDatasource
         * @param options {object} An object implementing {@link IKPIDatasourceOptions} interface
         */
        constructor(options: IKPIDatasourceOptions) {
            super(options);
            this.KPIData = options.KPIData;
        }

    }
    /**
     * Interface for classes that represent a KPIDatasource.
     * @interface IKPIDatasourceOptions
     * @extends {@link IFolderOptions}
     */
    interface IKPIDatasourceOptions extends IFolderOptions {
        KPIData?: string;
    }

    /**
     * Class representing a KPIDatasources
     * @class KPIDatasources
     * @extends {@link Folder}
     */
    export class KPIDatasources extends Folder {

        /**
         * @constructs KPIDatasources
         * @param options {object} An object implementing {@link IKPIDatasourcesOptions} interface
         */
        constructor(options: IKPIDatasourcesOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a KPIDatasources.
     * @interface IKPIDatasourcesOptions
     * @extends {@link IFolderOptions}
     */
    interface IKPIDatasourcesOptions extends IFolderOptions {
    }

    /**
     * Class representing a OrganizationalUnit
     * @class OrganizationalUnit
     * @extends {@link Folder}
     */
    export class OrganizationalUnit extends Folder {
        SyncGuid?: string;
        LastSync?: Date;

        /**
         * @constructs OrganizationalUnit
         * @param options {object} An object implementing {@link IOrganizationalUnitOptions} interface
         */
        constructor(options: IOrganizationalUnitOptions) {
            super(options);
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }

    }
    /**
     * Interface for classes that represent a OrganizationalUnit.
     * @interface IOrganizationalUnitOptions
     * @extends {@link IFolderOptions}
     */
    interface IOrganizationalUnitOptions extends IFolderOptions {
        SyncGuid?: string;
        LastSync?: Date;
    }

    /**
     * Class representing a OtherWorkspaceFolder
     * @class OtherWorkspaceFolder
     * @extends {@link Folder}
     */
    export class OtherWorkspaceFolder extends Folder {

        /**
         * @constructs OtherWorkspaceFolder
         * @param options {object} An object implementing {@link IOtherWorkspaceFolderOptions} interface
         */
        constructor(options: IOtherWorkspaceFolderOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a OtherWorkspaceFolder.
     * @interface IOtherWorkspaceFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface IOtherWorkspaceFolderOptions extends IFolderOptions {
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
        constructor(options: IPortalRootOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a PortalRoot.
     * @interface IPortalRootOptions
     * @extends {@link IFolderOptions}
     */
    interface IPortalRootOptions extends IFolderOptions {
    }

    /**
     * Class representing a PortletCategory
     * @class PortletCategory
     * @extends {@link Folder}
     */
    export class PortletCategory extends Folder {

        /**
         * @constructs PortletCategory
         * @param options {object} An object implementing {@link IPortletCategoryOptions} interface
         */
        constructor(options: IPortletCategoryOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a PortletCategory.
     * @interface IPortletCategoryOptions
     * @extends {@link IFolderOptions}
     */
    interface IPortletCategoryOptions extends IFolderOptions {
    }

    /**
     * Class representing a Posts
     * @class Posts
     * @extends {@link Folder}
     */
    export class Posts extends Folder {

        /**
         * @constructs Posts
         * @param options {object} An object implementing {@link IPostsOptions} interface
         */
        constructor(options: IPostsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Posts.
     * @interface IPostsOptions
     * @extends {@link IFolderOptions}
     */
    interface IPostsOptions extends IFolderOptions {
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
        constructor(options: IProfileDomainOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ProfileDomain.
     * @interface IProfileDomainOptions
     * @extends {@link IFolderOptions}
     */
    interface IProfileDomainOptions extends IFolderOptions {
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
        constructor(options: IProfilesOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Profiles.
     * @interface IProfilesOptions
     * @extends {@link IFolderOptions}
     */
    interface IProfilesOptions extends IFolderOptions {
    }

    /**
     * Class representing a ProjectWorkspaceFolder
     * @class ProjectWorkspaceFolder
     * @extends {@link Folder}
     */
    export class ProjectWorkspaceFolder extends Folder {

        /**
         * @constructs ProjectWorkspaceFolder
         * @param options {object} An object implementing {@link IProjectWorkspaceFolderOptions} interface
         */
        constructor(options: IProjectWorkspaceFolderOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ProjectWorkspaceFolder.
     * @interface IProjectWorkspaceFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface IProjectWorkspaceFolderOptions extends IFolderOptions {
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
        constructor(options: IRuntimeContentContainerOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a RuntimeContentContainer.
     * @interface IRuntimeContentContainerOptions
     * @extends {@link IFolderOptions}
     */
    interface IRuntimeContentContainerOptions extends IFolderOptions {
    }

    /**
     * Class representing a SalesWorkspaceFolder
     * @class SalesWorkspaceFolder
     * @extends {@link Folder}
     */
    export class SalesWorkspaceFolder extends Folder {

        /**
         * @constructs SalesWorkspaceFolder
         * @param options {object} An object implementing {@link ISalesWorkspaceFolderOptions} interface
         */
        constructor(options: ISalesWorkspaceFolderOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a SalesWorkspaceFolder.
     * @interface ISalesWorkspaceFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface ISalesWorkspaceFolderOptions extends IFolderOptions {
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
        constructor(options: ISitesOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Sites.
     * @interface ISitesOptions
     * @extends {@link IFolderOptions}
     */
    interface ISitesOptions extends IFolderOptions {
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
        constructor(options: ISmartFolderOptions) {
            super(options);
            this.Query = options.Query;
            this.EnableAutofilters = options.EnableAutofilters;
            this.EnableLifespanFilter = options.EnableLifespanFilter;
        }

    }
    /**
     * Interface for classes that represent a SmartFolder.
     * @interface ISmartFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface ISmartFolderOptions extends IFolderOptions {
        Query?: string;
        EnableAutofilters?: Enums.EnableAutofilters;
        EnableLifespanFilter?: Enums.EnableLifespanFilter;
    }

    /**
     * Class representing a ContentRotator
     * @class ContentRotator
     * @extends {@link SmartFolder}
     */
    export class ContentRotator extends SmartFolder {
        SelectionMode?: Enums.SelectionMode;
        OrderingMode?: Enums.OrderingMode;

        /**
         * @constructs ContentRotator
         * @param options {object} An object implementing {@link IContentRotatorOptions} interface
         */
        constructor(options: IContentRotatorOptions) {
            super(options);
            this.SelectionMode = options.SelectionMode;
            this.OrderingMode = options.OrderingMode;
        }

    }
    /**
     * Interface for classes that represent a ContentRotator.
     * @interface IContentRotatorOptions
     * @extends {@link ISmartFolderOptions}
     */
    interface IContentRotatorOptions extends ISmartFolderOptions {
        SelectionMode?: Enums.SelectionMode;
        OrderingMode?: Enums.OrderingMode;
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
        constructor(options: ISystemFolderOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a SystemFolder.
     * @interface ISystemFolderOptions
     * @extends {@link IFolderOptions}
     */
    interface ISystemFolderOptions extends IFolderOptions {
    }

    /**
     * Class representing a Portlets
     * @class Portlets
     * @extends {@link SystemFolder}
     */
    export class Portlets extends SystemFolder {

        /**
         * @constructs Portlets
         * @param options {object} An object implementing {@link IPortletsOptions} interface
         */
        constructor(options: IPortletsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Portlets.
     * @interface IPortletsOptions
     * @extends {@link ISystemFolderOptions}
     */
    interface IPortletsOptions extends ISystemFolderOptions {
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
        constructor(options: IResourcesOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Resources.
     * @interface IResourcesOptions
     * @extends {@link ISystemFolderOptions}
     */
    interface IResourcesOptions extends ISystemFolderOptions {
    }

    /**
     * Class representing a Skin
     * @class Skin
     * @extends {@link SystemFolder}
     */
    export class Skin extends SystemFolder {
        NewSkin?: boolean;

        /**
         * @constructs Skin
         * @param options {object} An object implementing {@link ISkinOptions} interface
         */
        constructor(options: ISkinOptions) {
            super(options);
            this.NewSkin = options.NewSkin;
        }

    }
    /**
     * Interface for classes that represent a Skin.
     * @interface ISkinOptions
     * @extends {@link ISystemFolderOptions}
     */
    interface ISkinOptions extends ISystemFolderOptions {
        NewSkin?: boolean;
    }

    /**
     * Class representing a Skins
     * @class Skins
     * @extends {@link SystemFolder}
     */
    export class Skins extends SystemFolder {

        /**
         * @constructs Skins
         * @param options {object} An object implementing {@link ISkinsOptions} interface
         */
        constructor(options: ISkinsOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Skins.
     * @interface ISkinsOptions
     * @extends {@link ISystemFolderOptions}
     */
    interface ISkinsOptions extends ISystemFolderOptions {
    }

    /**
     * Class representing a TrashBag
     * @class TrashBag
     * @extends {@link Folder}
     */
    export class TrashBag extends Folder {
        KeepUntil?: Date;
        OriginalPath?: string;
        WorkspaceRelativePath?: string;
        WorkspaceId?: number;
        DeletedContent?: Fields.DeferredObject;

        /**
         * @constructs TrashBag
         * @param options {object} An object implementing {@link ITrashBagOptions} interface
         */
        constructor(options: ITrashBagOptions) {
            super(options);
            this.KeepUntil = options.KeepUntil;
            this.OriginalPath = options.OriginalPath;
            this.WorkspaceRelativePath = options.WorkspaceRelativePath;
            this.WorkspaceId = options.WorkspaceId;
            this.DeletedContent = options.DeletedContent;
        }

    }
    /**
     * Interface for classes that represent a TrashBag.
     * @interface ITrashBagOptions
     * @extends {@link IFolderOptions}
     */
    interface ITrashBagOptions extends IFolderOptions {
        KeepUntil?: Date;
        OriginalPath?: string;
        WorkspaceRelativePath?: string;
        WorkspaceId?: number;
        DeletedContent?: Fields.DeferredObject;
    }

    /**
     * Class representing a Workspace
     * @class Workspace
     * @extends {@link Folder}
     */
    export class Workspace extends Folder {
        Manager?: Fields.DeferredObject;
        Deadline?: Date;
        IsActive: boolean;
        WorkspaceSkin?: Fields.DeferredObject;
        IsCritical?: boolean;
        IsWallContainer?: boolean;
        IsFollowed?: boolean;

        /**
         * @constructs Workspace
         * @param options {object} An object implementing {@link IWorkspaceOptions} interface
         */
        constructor(options: IWorkspaceOptions) {
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
    /**
     * Interface for classes that represent a Workspace.
     * @interface IWorkspaceOptions
     * @extends {@link IFolderOptions}
     */
    interface IWorkspaceOptions extends IFolderOptions {
        Manager?: Fields.DeferredObject;
        Deadline?: Date;
        IsActive: boolean;
        WorkspaceSkin?: Fields.DeferredObject;
        IsCritical?: boolean;
        IsWallContainer?: boolean;
        IsFollowed?: boolean;
    }

    /**
     * Class representing a Blog
     * @class Blog
     * @extends {@link Workspace}
     */
    export class Blog extends Workspace {
        ShowAvatar?: boolean;

        /**
         * @constructs Blog
         * @param options {object} An object implementing {@link IBlogOptions} interface
         */
        constructor(options: IBlogOptions) {
            super(options);
            this.ShowAvatar = options.ShowAvatar;
        }

    }
    /**
     * Interface for classes that represent a Blog.
     * @interface IBlogOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface IBlogOptions extends IWorkspaceOptions {
        ShowAvatar?: boolean;
    }

    /**
     * Class representing a DocumentWorkspace
     * @class DocumentWorkspace
     * @extends {@link Workspace}
     */
    export class DocumentWorkspace extends Workspace {

        /**
         * @constructs DocumentWorkspace
         * @param options {object} An object implementing {@link IDocumentWorkspaceOptions} interface
         */
        constructor(options: IDocumentWorkspaceOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a DocumentWorkspace.
     * @interface IDocumentWorkspaceOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface IDocumentWorkspaceOptions extends IWorkspaceOptions {
    }

    /**
     * Class representing a ProjectWorkspace
     * @class ProjectWorkspace
     * @extends {@link Workspace}
     */
    export class ProjectWorkspace extends Workspace {
        Completion?: number;

        /**
         * @constructs ProjectWorkspace
         * @param options {object} An object implementing {@link IProjectWorkspaceOptions} interface
         */
        constructor(options: IProjectWorkspaceOptions) {
            super(options);
            this.Completion = options.Completion;
        }

    }
    /**
     * Interface for classes that represent a ProjectWorkspace.
     * @interface IProjectWorkspaceOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface IProjectWorkspaceOptions extends IWorkspaceOptions {
        Completion?: number;
    }

    /**
     * Class representing a SalesWorkspace
     * @class SalesWorkspace
     * @extends {@link Workspace}
     */
    export class SalesWorkspace extends Workspace {
        Customer?: string;
        ExpectedRevenue?: number;
        ChanceOfWinning?: number;
        StartDate?: Date;
        Contacts?: string;
        Notes?: string;
        Completion?: number;
        ContractSigned?: boolean;
        ContractSignedDate?: Date;

        /**
         * @constructs SalesWorkspace
         * @param options {object} An object implementing {@link ISalesWorkspaceOptions} interface
         */
        constructor(options: ISalesWorkspaceOptions) {
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
    /**
     * Interface for classes that represent a SalesWorkspace.
     * @interface ISalesWorkspaceOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface ISalesWorkspaceOptions extends IWorkspaceOptions {
        Customer?: string;
        ExpectedRevenue?: number;
        ChanceOfWinning?: number;
        StartDate?: Date;
        Contacts?: string;
        Notes?: string;
        Completion?: number;
        ContractSigned?: boolean;
        ContractSignedDate?: Date;
    }

    /**
     * Class representing a Site
     * @class Site
     * @extends {@link Workspace}
     */
    export class Site extends Workspace {
        Language?: Enums.SiteLanguage;
        EnableClientBasedCulture?: boolean;
        EnableUserBasedCulture?: boolean;
        UrlList?: string;
        StartPage?: Fields.DeferredObject;
        LoginPage?: Fields.DeferredObject;
        SiteSkin?: Fields.DeferredObject;
        DenyCrossSiteAccess?: boolean;

        /**
         * @constructs Site
         * @param options {object} An object implementing {@link ISiteOptions} interface
         */
        constructor(options: ISiteOptions) {
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
    /**
     * Interface for classes that represent a Site.
     * @interface ISiteOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface ISiteOptions extends IWorkspaceOptions {
        Language?: Enums.SiteLanguage;
        EnableClientBasedCulture?: boolean;
        EnableUserBasedCulture?: boolean;
        UrlList?: string;
        StartPage?: Fields.DeferredObject;
        LoginPage?: Fields.DeferredObject;
        SiteSkin?: Fields.DeferredObject;
        DenyCrossSiteAccess?: boolean;
    }

    /**
     * Class representing a TeamWorkspace
     * @class TeamWorkspace
     * @extends {@link Workspace}
     */
    export class TeamWorkspace extends Workspace {

        /**
         * @constructs TeamWorkspace
         * @param options {object} An object implementing {@link ITeamWorkspaceOptions} interface
         */
        constructor(options: ITeamWorkspaceOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a TeamWorkspace.
     * @interface ITeamWorkspaceOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface ITeamWorkspaceOptions extends IWorkspaceOptions {
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
        constructor(options: ITrashBinOptions) {
            super(options);
            this.MinRetentionTime = options.MinRetentionTime;
            this.SizeQuota = options.SizeQuota;
            this.BagCapacity = options.BagCapacity;
        }

    }
    /**
     * Interface for classes that represent a TrashBin.
     * @interface ITrashBinOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface ITrashBinOptions extends IWorkspaceOptions {
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
        User?: Fields.DeferredObject;

        /**
         * @constructs UserProfile
         * @param options {object} An object implementing {@link IUserProfileOptions} interface
         */
        constructor(options: IUserProfileOptions) {
            super(options);
            this.User = options.User;
        }

    }
    /**
     * Interface for classes that represent a UserProfile.
     * @interface IUserProfileOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface IUserProfileOptions extends IWorkspaceOptions {
        User?: Fields.DeferredObject;
    }

    /**
     * Class representing a Wiki
     * @class Wiki
     * @extends {@link Workspace}
     */
    export class Wiki extends Workspace {

        /**
         * @constructs Wiki
         * @param options {object} An object implementing {@link IWikiOptions} interface
         */
        constructor(options: IWikiOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Wiki.
     * @interface IWikiOptions
     * @extends {@link IWorkspaceOptions}
     */
    interface IWikiOptions extends IWorkspaceOptions {
    }

    /**
     * Class representing a Group
     * @class Group
     * @extends {@link GenericContent}
     */
    export class Group extends GenericContent {
        Members?: Fields.DeferredObject;
        SyncGuid?: string;
        LastSync?: Date;

        /**
         * @constructs Group
         * @param options {object} An object implementing {@link IGroupOptions} interface
         */
        constructor(options: IGroupOptions) {
            super(options);
            this.Members = options.Members;
            this.SyncGuid = options.SyncGuid;
            this.LastSync = options.LastSync;
        }

    }
    /**
     * Interface for classes that represent a Group.
     * @interface IGroupOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IGroupOptions extends IGenericContentOptions {
        Members?: Fields.DeferredObject;
        SyncGuid?: string;
        LastSync?: Date;
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
        constructor(options: IListItemOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a ListItem.
     * @interface IListItemOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IListItemOptions extends IGenericContentOptions {
    }

    /**
     * Class representing a BlogPost
     * @class BlogPost
     * @extends {@link ListItem}
     */
    export class BlogPost extends ListItem {
        LeadingText: string;
        BodyText?: string;
        IsPublished?: boolean;
        PublishedOn: Date;

        /**
         * @constructs BlogPost
         * @param options {object} An object implementing {@link IBlogPostOptions} interface
         */
        constructor(options: IBlogPostOptions) {
            super(options);
            this.LeadingText = options.LeadingText;
            this.BodyText = options.BodyText;
            this.IsPublished = options.IsPublished;
            this.PublishedOn = options.PublishedOn;
        }

    }
    /**
     * Interface for classes that represent a BlogPost.
     * @interface IBlogPostOptions
     * @extends {@link IListItemOptions}
     */
    interface IBlogPostOptions extends IListItemOptions {
        LeadingText: string;
        BodyText?: string;
        IsPublished?: boolean;
        PublishedOn: Date;
    }

    /**
     * Class representing a CalendarEvent
     * @class CalendarEvent
     * @extends {@link ListItem}
     */
    export class CalendarEvent extends ListItem {
        Location?: string;
        StartDate: Date;
        EndDate: Date;
        Lead?: string;
        AllDay?: boolean;
        EventUrl?: string;
        RequiresRegistration?: boolean;
        RegistrationForm?: Fields.DeferredObject;
        OwnerEmail?: string;
        NotificationMode?: Enums.NotificationMode;
        EmailTemplate?: string;
        EmailTemplateSubmitter?: string;
        EmailFrom?: string;
        EmailFromSubmitter?: string;
        EmailField?: string;
        MaxParticipants?: number;
        NumParticipants?: number;
        EventType?: Enums.EventType;

        /**
         * @constructs CalendarEvent
         * @param options {object} An object implementing {@link ICalendarEventOptions} interface
         */
        constructor(options: ICalendarEventOptions) {
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
    /**
     * Interface for classes that represent a CalendarEvent.
     * @interface ICalendarEventOptions
     * @extends {@link IListItemOptions}
     */
    interface ICalendarEventOptions extends IListItemOptions {
        Location?: string;
        StartDate: Date;
        EndDate: Date;
        Lead?: string;
        AllDay?: boolean;
        EventUrl?: string;
        RequiresRegistration?: boolean;
        RegistrationForm?: Fields.DeferredObject;
        OwnerEmail?: string;
        NotificationMode?: Enums.NotificationMode;
        EmailTemplate?: string;
        EmailTemplateSubmitter?: string;
        EmailFrom?: string;
        EmailFromSubmitter?: string;
        EmailField?: string;
        MaxParticipants?: number;
        NumParticipants?: number;
        EventType?: Enums.EventType;
    }

    /**
     * Class representing a Car
     * @class Car
     * @extends {@link ListItem}
     */
    export class Car extends ListItem {
        Make?: string;
        Model?: string;
        Style?: Enums.Style;
        StartingDate?: Date;
        Color?: string;
        EngineSize?: string;
        Power?: string;
        Price?: number;

        /**
         * @constructs Car
         * @param options {object} An object implementing {@link ICarOptions} interface
         */
        constructor(options: ICarOptions) {
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
    /**
     * Interface for classes that represent a Car.
     * @interface ICarOptions
     * @extends {@link IListItemOptions}
     */
    interface ICarOptions extends IListItemOptions {
        Make?: string;
        Model?: string;
        Style?: Enums.Style;
        StartingDate?: Date;
        Color?: string;
        EngineSize?: string;
        Power?: string;
        Price?: number;
    }

    /**
     * Class representing a Comment
     * @class Comment
     * @extends {@link ListItem}
     */
    export class Comment extends ListItem {

        /**
         * @constructs Comment
         * @param options {object} An object implementing {@link ICommentOptions} interface
         */
        constructor(options: ICommentOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Comment.
     * @interface ICommentOptions
     * @extends {@link IListItemOptions}
     */
    interface ICommentOptions extends IListItemOptions {
    }

    /**
     * Class representing a ConfirmationItem
     * @class ConfirmationItem
     * @extends {@link ListItem}
     */
    export class ConfirmationItem extends ListItem {
        Confirmed?: boolean;

        /**
         * @constructs ConfirmationItem
         * @param options {object} An object implementing {@link IConfirmationItemOptions} interface
         */
        constructor(options: IConfirmationItemOptions) {
            super(options);
            this.Confirmed = options.Confirmed;
        }

    }
    /**
     * Interface for classes that represent a ConfirmationItem.
     * @interface IConfirmationItemOptions
     * @extends {@link IListItemOptions}
     */
    interface IConfirmationItemOptions extends IListItemOptions {
        Confirmed?: boolean;
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
        constructor(options: ICustomListItemOptions) {
            super(options);
            this.WorkflowsRunning = options.WorkflowsRunning;
        }

    }
    /**
     * Interface for classes that represent a CustomListItem.
     * @interface ICustomListItemOptions
     * @extends {@link IListItemOptions}
     */
    interface ICustomListItemOptions extends IListItemOptions {
        WorkflowsRunning?: boolean;
    }

    /**
     * Class representing a ExpenseClaimItem
     * @class ExpenseClaimItem
     * @extends {@link ListItem}
     */
    export class ExpenseClaimItem extends ListItem {
        Amount?: number;
        Date?: Date;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        ScannedImage?: Fields.DeferredObject;

        /**
         * @constructs ExpenseClaimItem
         * @param options {object} An object implementing {@link IExpenseClaimItemOptions} interface
         */
        constructor(options: IExpenseClaimItemOptions) {
            super(options);
            this.Amount = options.Amount;
            this.Date = options.Date;
            this.ImageRef = options.ImageRef;
            this.ImageData = options.ImageData;
            this.ScannedImage = options.ScannedImage;
        }

    }
    /**
     * Interface for classes that represent a ExpenseClaimItem.
     * @interface IExpenseClaimItemOptions
     * @extends {@link IListItemOptions}
     */
    interface IExpenseClaimItemOptions extends IListItemOptions {
        Amount?: number;
        Date?: Date;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        ScannedImage?: Fields.DeferredObject;
    }

    /**
     * Class representing a FormItem
     * @class FormItem
     * @extends {@link ListItem}
     */
    export class FormItem extends ListItem {

        /**
         * @constructs FormItem
         * @param options {object} An object implementing {@link IFormItemOptions} interface
         */
        constructor(options: IFormItemOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a FormItem.
     * @interface IFormItemOptions
     * @extends {@link IListItemOptions}
     */
    interface IFormItemOptions extends IListItemOptions {
    }

    /**
     * Class representing a EventRegistrationFormItem
     * @class EventRegistrationFormItem
     * @extends {@link FormItem}
     */
    export class EventRegistrationFormItem extends FormItem {
        Email: string;
        GuestNumber: number;

        /**
         * @constructs EventRegistrationFormItem
         * @param options {object} An object implementing {@link IEventRegistrationFormItemOptions} interface
         */
        constructor(options: IEventRegistrationFormItemOptions) {
            super(options);
            this.Email = options.Email;
            this.GuestNumber = options.GuestNumber;
        }

    }
    /**
     * Interface for classes that represent a EventRegistrationFormItem.
     * @interface IEventRegistrationFormItemOptions
     * @extends {@link IFormItemOptions}
     */
    interface IEventRegistrationFormItemOptions extends IFormItemOptions {
        Email: string;
        GuestNumber: number;
    }

    /**
     * Class representing a ForumEntry
     * @class ForumEntry
     * @extends {@link ListItem}
     */
    export class ForumEntry extends ListItem {
        ReplyTo?: Fields.DeferredObject;
        ReplyToNo?: number;
        SerialNo?: number;
        PostedBy?: Fields.DeferredObject;

        /**
         * @constructs ForumEntry
         * @param options {object} An object implementing {@link IForumEntryOptions} interface
         */
        constructor(options: IForumEntryOptions) {
            super(options);
            this.ReplyTo = options.ReplyTo;
            this.ReplyToNo = options.ReplyToNo;
            this.SerialNo = options.SerialNo;
            this.PostedBy = options.PostedBy;
        }

    }
    /**
     * Interface for classes that represent a ForumEntry.
     * @interface IForumEntryOptions
     * @extends {@link IListItemOptions}
     */
    interface IForumEntryOptions extends IListItemOptions {
        ReplyTo?: Fields.DeferredObject;
        ReplyToNo?: number;
        SerialNo?: number;
        PostedBy?: Fields.DeferredObject;
    }

    /**
     * Class representing a Like
     * @class Like
     * @extends {@link ListItem}
     */
    export class Like extends ListItem {

        /**
         * @constructs Like
         * @param options {object} An object implementing {@link ILikeOptions} interface
         */
        constructor(options: ILikeOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a Like.
     * @interface ILikeOptions
     * @extends {@link IListItemOptions}
     */
    interface ILikeOptions extends IListItemOptions {
    }

    /**
     * Class representing a Link
     * @class Link
     * @extends {@link ListItem}
     */
    export class Link extends ListItem {
        Url?: string;

        /**
         * @constructs Link
         * @param options {object} An object implementing {@link ILinkOptions} interface
         */
        constructor(options: ILinkOptions) {
            super(options);
            this.Url = options.Url;
        }

    }
    /**
     * Interface for classes that represent a Link.
     * @interface ILinkOptions
     * @extends {@link IListItemOptions}
     */
    interface ILinkOptions extends IListItemOptions {
        Url?: string;
    }

    /**
     * Class representing a Memo
     * @class Memo
     * @extends {@link ListItem}
     */
    export class Memo extends ListItem {
        Date?: Date;
        MemoType?: Enums.MemoType;
        SeeAlso?: Fields.DeferredObject;

        /**
         * @constructs Memo
         * @param options {object} An object implementing {@link IMemoOptions} interface
         */
        constructor(options: IMemoOptions) {
            super(options);
            this.Date = options.Date;
            this.MemoType = options.MemoType;
            this.SeeAlso = options.SeeAlso;
        }

    }
    /**
     * Interface for classes that represent a Memo.
     * @interface IMemoOptions
     * @extends {@link IListItemOptions}
     */
    interface IMemoOptions extends IListItemOptions {
        Date?: Date;
        MemoType?: Enums.MemoType;
        SeeAlso?: Fields.DeferredObject;
    }

    /**
     * Class representing a Portlet
     * @class Portlet
     * @extends {@link ListItem}
     */
    export class Portlet extends ListItem {
        TypeName?: string;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        PortletImage?: Fields.DeferredObject;

        /**
         * @constructs Portlet
         * @param options {object} An object implementing {@link IPortletOptions} interface
         */
        constructor(options: IPortletOptions) {
            super(options);
            this.TypeName = options.TypeName;
            this.ImageRef = options.ImageRef;
            this.ImageData = options.ImageData;
            this.PortletImage = options.PortletImage;
        }

    }
    /**
     * Interface for classes that represent a Portlet.
     * @interface IPortletOptions
     * @extends {@link IListItemOptions}
     */
    interface IPortletOptions extends IListItemOptions {
        TypeName?: string;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        PortletImage?: Fields.DeferredObject;
    }

    /**
     * Class representing a Post
     * @class Post
     * @extends {@link ListItem}
     */
    export class Post extends ListItem {
        JournalId?: number;
        PostType?: number;
        SharedContent?: Fields.DeferredObject;
        PostDetails?: string;

        /**
         * @constructs Post
         * @param options {object} An object implementing {@link IPostOptions} interface
         */
        constructor(options: IPostOptions) {
            super(options);
            this.JournalId = options.JournalId;
            this.PostType = options.PostType;
            this.SharedContent = options.SharedContent;
            this.PostDetails = options.PostDetails;
        }

    }
    /**
     * Interface for classes that represent a Post.
     * @interface IPostOptions
     * @extends {@link IListItemOptions}
     */
    interface IPostOptions extends IListItemOptions {
        JournalId?: number;
        PostType?: number;
        SharedContent?: Fields.DeferredObject;
        PostDetails?: string;
    }

    /**
     * Class representing a SliderItem
     * @class SliderItem
     * @extends {@link ListItem}
     */
    export class SliderItem extends ListItem {
        Background?: Fields.DeferredObject;
        YouTubeBackground?: string;
        VerticalAlignment?: Enums.VerticalAlignment;
        HorizontalAlignment?: Enums.HorizontalAlignment;
        OuterCallToActionButton?: Fields.HyperLink;
        InnerCallToActionButton?: string;

        /**
         * @constructs SliderItem
         * @param options {object} An object implementing {@link ISliderItemOptions} interface
         */
        constructor(options: ISliderItemOptions) {
            super(options);
            this.Background = options.Background;
            this.YouTubeBackground = options.YouTubeBackground;
            this.VerticalAlignment = options.VerticalAlignment;
            this.HorizontalAlignment = options.HorizontalAlignment;
            this.OuterCallToActionButton = options.OuterCallToActionButton;
            this.InnerCallToActionButton = options.InnerCallToActionButton;
        }

    }
    /**
     * Interface for classes that represent a SliderItem.
     * @interface ISliderItemOptions
     * @extends {@link IListItemOptions}
     */
    interface ISliderItemOptions extends IListItemOptions {
        Background?: Fields.DeferredObject;
        YouTubeBackground?: string;
        VerticalAlignment?: Enums.VerticalAlignment;
        HorizontalAlignment?: Enums.HorizontalAlignment;
        OuterCallToActionButton?: Fields.HyperLink;
        InnerCallToActionButton?: string;
    }

    /**
     * Class representing a SurveyItem
     * @class SurveyItem
     * @extends {@link ListItem}
     */
    export class SurveyItem extends ListItem {
        EvaluatedBy?: Fields.DeferredObject;
        EvaluatedAt?: Date;
        Evaluation?: string;

        /**
         * @constructs SurveyItem
         * @param options {object} An object implementing {@link ISurveyItemOptions} interface
         */
        constructor(options: ISurveyItemOptions) {
            super(options);
            this.EvaluatedBy = options.EvaluatedBy;
            this.EvaluatedAt = options.EvaluatedAt;
            this.Evaluation = options.Evaluation;
        }

    }
    /**
     * Interface for classes that represent a SurveyItem.
     * @interface ISurveyItemOptions
     * @extends {@link IListItemOptions}
     */
    interface ISurveyItemOptions extends IListItemOptions {
        EvaluatedBy?: Fields.DeferredObject;
        EvaluatedAt?: Date;
        Evaluation?: string;
    }

    /**
     * Class representing a SurveyListItem
     * @class SurveyListItem
     * @extends {@link ListItem}
     */
    export class SurveyListItem extends ListItem {

        /**
         * @constructs SurveyListItem
         * @param options {object} An object implementing {@link ISurveyListItemOptions} interface
         */
        constructor(options: ISurveyListItemOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a SurveyListItem.
     * @interface ISurveyListItemOptions
     * @extends {@link IListItemOptions}
     */
    interface ISurveyListItemOptions extends IListItemOptions {
    }

    /**
     * Class representing a Task
     * @class Task
     * @extends {@link ListItem}
     */
    export class Task extends ListItem {
        StartDate?: Date;
        DueDate: Date;
        AssignedTo?: Fields.DeferredObject;
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
        constructor(options: ITaskOptions) {
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
    /**
     * Interface for classes that represent a Task.
     * @interface ITaskOptions
     * @extends {@link IListItemOptions}
     */
    interface ITaskOptions extends IListItemOptions {
        StartDate?: Date;
        DueDate: Date;
        AssignedTo?: Fields.DeferredObject;
        Priority?: Enums.Priority;
        Status?: Enums.Status;
        TaskCompletion?: number;
        RemainingDays?: number;
        DueText?: string;
        DueCssClass?: string;
    }

    /**
     * Class representing a ApprovalWorkflowTask
     * @class ApprovalWorkflowTask
     * @extends {@link Task}
     */
    export class ApprovalWorkflowTask extends Task {
        Comment: string;
        Result?: Enums.Result;
        ContentToApprove?: Fields.DeferredObject;

        /**
         * @constructs ApprovalWorkflowTask
         * @param options {object} An object implementing {@link IApprovalWorkflowTaskOptions} interface
         */
        constructor(options: IApprovalWorkflowTaskOptions) {
            super(options);
            this.Comment = options.Comment;
            this.Result = options.Result;
            this.ContentToApprove = options.ContentToApprove;
        }

    }
    /**
     * Interface for classes that represent a ApprovalWorkflowTask.
     * @interface IApprovalWorkflowTaskOptions
     * @extends {@link ITaskOptions}
     */
    interface IApprovalWorkflowTaskOptions extends ITaskOptions {
        Comment: string;
        Result?: Enums.Result;
        ContentToApprove?: Fields.DeferredObject;
    }

    /**
     * Class representing a ExpenseClaimWorkflowTask
     * @class ExpenseClaimWorkflowTask
     * @extends {@link ApprovalWorkflowTask}
     */
    export class ExpenseClaimWorkflowTask extends ApprovalWorkflowTask {
        Reason?: string;
        ExpenseClaim?: Fields.DeferredObject;
        Sum?: number;

        /**
         * @constructs ExpenseClaimWorkflowTask
         * @param options {object} An object implementing {@link IExpenseClaimWorkflowTaskOptions} interface
         */
        constructor(options: IExpenseClaimWorkflowTaskOptions) {
            super(options);
            this.Reason = options.Reason;
            this.ExpenseClaim = options.ExpenseClaim;
            this.Sum = options.Sum;
        }

    }
    /**
     * Interface for classes that represent a ExpenseClaimWorkflowTask.
     * @interface IExpenseClaimWorkflowTaskOptions
     * @extends {@link IApprovalWorkflowTaskOptions}
     */
    interface IExpenseClaimWorkflowTaskOptions extends IApprovalWorkflowTaskOptions {
        Reason?: string;
        ExpenseClaim?: Fields.DeferredObject;
        Sum?: number;
    }

    /**
     * Class representing a VotingItem
     * @class VotingItem
     * @extends {@link ListItem}
     */
    export class VotingItem extends ListItem {

        /**
         * @constructs VotingItem
         * @param options {object} An object implementing {@link IVotingItemOptions} interface
         */
        constructor(options: IVotingItemOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a VotingItem.
     * @interface IVotingItemOptions
     * @extends {@link IListItemOptions}
     */
    interface IVotingItemOptions extends IListItemOptions {
    }

    /**
     * Class representing a WebContent
     * @class WebContent
     * @extends {@link ListItem}
     */
    export class WebContent extends ListItem {
        ReviewDate?: Date;
        ArchiveDate?: Date;

        /**
         * @constructs WebContent
         * @param options {object} An object implementing {@link IWebContentOptions} interface
         */
        constructor(options: IWebContentOptions) {
            super(options);
            this.ReviewDate = options.ReviewDate;
            this.ArchiveDate = options.ArchiveDate;
        }

    }
    /**
     * Interface for classes that represent a WebContent.
     * @interface IWebContentOptions
     * @extends {@link IListItemOptions}
     */
    interface IWebContentOptions extends IListItemOptions {
        ReviewDate?: Date;
        ArchiveDate?: Date;
    }

    /**
     * Class representing a Article
     * @class Article
     * @extends {@link WebContent}
     */
    export class Article extends WebContent {
        Subtitle?: string;
        Lead?: string;
        Body?: string;
        Pinned?: boolean;
        Keywords?: string;
        Author?: string;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        Image?: Fields.DeferredObject;

        /**
         * @constructs Article
         * @param options {object} An object implementing {@link IArticleOptions} interface
         */
        constructor(options: IArticleOptions) {
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
    /**
     * Interface for classes that represent a Article.
     * @interface IArticleOptions
     * @extends {@link IWebContentOptions}
     */
    interface IArticleOptions extends IWebContentOptions {
        Subtitle?: string;
        Lead?: string;
        Body?: string;
        Pinned?: boolean;
        Keywords?: string;
        Author?: string;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        Image?: Fields.DeferredObject;
    }

    /**
     * Class representing a HTMLContent
     * @class HTMLContent
     * @extends {@link WebContent}
     */
    export class HTMLContent extends WebContent {
        HTMLFragment?: string;

        /**
         * @constructs HTMLContent
         * @param options {object} An object implementing {@link IHTMLContentOptions} interface
         */
        constructor(options: IHTMLContentOptions) {
            super(options);
            this.HTMLFragment = options.HTMLFragment;
        }

    }
    /**
     * Interface for classes that represent a HTMLContent.
     * @interface IHTMLContentOptions
     * @extends {@link IWebContentOptions}
     */
    interface IHTMLContentOptions extends IWebContentOptions {
        HTMLFragment?: string;
    }

    /**
     * Class representing a WebContentDemo
     * @class WebContentDemo
     * @extends {@link WebContent}
     */
    export class WebContentDemo extends WebContent {
        Subtitle?: string;
        RelatedImage?: Fields.DeferredObject;
        Header?: string;
        Body?: string;
        Details?: Fields.HyperLink;
        Language?: Enums.WebContentDemoLanguage;
        Keywords?: string;
        Author?: string;

        /**
         * @constructs WebContentDemo
         * @param options {object} An object implementing {@link IWebContentDemoOptions} interface
         */
        constructor(options: IWebContentDemoOptions) {
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
    /**
     * Interface for classes that represent a WebContentDemo.
     * @interface IWebContentDemoOptions
     * @extends {@link IWebContentOptions}
     */
    interface IWebContentDemoOptions extends IWebContentOptions {
        Subtitle?: string;
        RelatedImage?: Fields.DeferredObject;
        Header?: string;
        Body?: string;
        Details?: Fields.HyperLink;
        Language?: Enums.WebContentDemoLanguage;
        Keywords?: string;
        Author?: string;
    }

    /**
     * Class representing a NotificationConfig
     * @class NotificationConfig
     * @extends {@link GenericContent}
     */
    export class NotificationConfig extends GenericContent {
        Subject?: string;
        Body?: string;
        SenderAddress?: string;

        /**
         * @constructs NotificationConfig
         * @param options {object} An object implementing {@link INotificationConfigOptions} interface
         */
        constructor(options: INotificationConfigOptions) {
            super(options);
            this.Subject = options.Subject;
            this.Body = options.Body;
            this.SenderAddress = options.SenderAddress;
        }

    }
    /**
     * Interface for classes that represent a NotificationConfig.
     * @interface INotificationConfigOptions
     * @extends {@link IGenericContentOptions}
     */
    interface INotificationConfigOptions extends IGenericContentOptions {
        Subject?: string;
        Body?: string;
        SenderAddress?: string;
    }

    /**
     * Class representing a PublicRegistrationConfig
     * @class PublicRegistrationConfig
     * @extends {@link GenericContent}
     */
    export class PublicRegistrationConfig extends GenericContent {
        SecurityGroups?: Fields.DeferredObject;
        DefaultDomainPath?: Fields.DeferredObject;
        UserTypeName?: string;
        DuplicateErrorMessage?: string;
        IsBodyHtml?: boolean;
        ActivationEnabled?: boolean;
        ActivationEmailTemplate?: string;
        ActivationSuccessTemplate?: string;
        AlreadyActivatedMessage?: string;
        MailSubjectTemplate?: string;
        MailFrom?: string;
        AdminEmailAddress?: string;
        RegistrationSuccessTemplate?: string;
        ResetPasswordTemplate?: string;
        ResetPasswordSubjectTemplate?: string;
        ResetPasswordSuccessfulTemplate?: string;
        ChangePasswordUserInterfacePath?: string;
        ChangePasswordSuccessfulMessage?: string;
        ForgottenPasswordUserInterfacePath?: string;
        NewRegistrationContentView?: string;
        EditProfileContentView?: string;
        AutoGeneratePassword?: boolean;
        DisableCreatedUser?: boolean;
        IsUniqueEmail?: boolean;
        AutomaticLogon?: boolean;
        ChangePasswordPagePath?: Fields.DeferredObject;
        ChangePasswordRestrictedText?: string;
        AlreadyRegisteredUserMessage?: string;
        UpdateProfileSuccessTemplate?: string;
        EmailNotValid?: string;
        NoEmailGiven?: string;
        ActivateByAdmin?: boolean;
        ActivateEmailSubject?: string;
        ActivateEmailTemplate?: string;
        ActivateAdmins?: Fields.DeferredObject;

        /**
         * @constructs PublicRegistrationConfig
         * @param options {object} An object implementing {@link IPublicRegistrationConfigOptions} interface
         */
        constructor(options: IPublicRegistrationConfigOptions) {
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
    /**
     * Interface for classes that represent a PublicRegistrationConfig.
     * @interface IPublicRegistrationConfigOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IPublicRegistrationConfigOptions extends IGenericContentOptions {
        SecurityGroups?: Fields.DeferredObject;
        DefaultDomainPath?: Fields.DeferredObject;
        UserTypeName?: string;
        DuplicateErrorMessage?: string;
        IsBodyHtml?: boolean;
        ActivationEnabled?: boolean;
        ActivationEmailTemplate?: string;
        ActivationSuccessTemplate?: string;
        AlreadyActivatedMessage?: string;
        MailSubjectTemplate?: string;
        MailFrom?: string;
        AdminEmailAddress?: string;
        RegistrationSuccessTemplate?: string;
        ResetPasswordTemplate?: string;
        ResetPasswordSubjectTemplate?: string;
        ResetPasswordSuccessfulTemplate?: string;
        ChangePasswordUserInterfacePath?: string;
        ChangePasswordSuccessfulMessage?: string;
        ForgottenPasswordUserInterfacePath?: string;
        NewRegistrationContentView?: string;
        EditProfileContentView?: string;
        AutoGeneratePassword?: boolean;
        DisableCreatedUser?: boolean;
        IsUniqueEmail?: boolean;
        AutomaticLogon?: boolean;
        ChangePasswordPagePath?: Fields.DeferredObject;
        ChangePasswordRestrictedText?: string;
        AlreadyRegisteredUserMessage?: string;
        UpdateProfileSuccessTemplate?: string;
        EmailNotValid?: string;
        NoEmailGiven?: string;
        ActivateByAdmin?: boolean;
        ActivateEmailSubject?: string;
        ActivateEmailTemplate?: string;
        ActivateAdmins?: Fields.DeferredObject;
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
        constructor(options: IQueryOptions) {
            super(options);
            this.Query = options.Query;
            this.QueryType = options.QueryType;
        }

    }
    /**
     * Interface for classes that represent a Query.
     * @interface IQueryOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IQueryOptions extends IGenericContentOptions {
        Query?: string;
        QueryType?: Enums.QueryType;
    }

    /**
     * Class representing a Subscription
     * @class Subscription
     * @extends {@link GenericContent}
     */
    export class Subscription extends GenericContent {
        ContentPath?: string;
        UserPath?: string;
        UserEmail?: string;
        UserId?: number;
        UserName?: string;
        IsActive?: boolean;
        Frequency?: Enums.Frequency;
        Language?: Enums.SubscriptionLanguage;

        /**
         * @constructs Subscription
         * @param options {object} An object implementing {@link ISubscriptionOptions} interface
         */
        constructor(options: ISubscriptionOptions) {
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
    /**
     * Interface for classes that represent a Subscription.
     * @interface ISubscriptionOptions
     * @extends {@link IGenericContentOptions}
     */
    interface ISubscriptionOptions extends IGenericContentOptions {
        ContentPath?: string;
        UserPath?: string;
        UserEmail?: string;
        UserId?: number;
        UserName?: string;
        IsActive?: boolean;
        Frequency?: Enums.Frequency;
        Language?: Enums.SubscriptionLanguage;
    }

    /**
     * Class representing a Tag
     * @class Tag
     * @extends {@link GenericContent}
     */
    export class Tag extends GenericContent {
        Description2?: string;
        BlackListPath?: string;

        /**
         * @constructs Tag
         * @param options {object} An object implementing {@link ITagOptions} interface
         */
        constructor(options: ITagOptions) {
            super(options);
            this.Description2 = options.Description2;
            this.BlackListPath = options.BlackListPath;
        }

    }
    /**
     * Interface for classes that represent a Tag.
     * @interface ITagOptions
     * @extends {@link IGenericContentOptions}
     */
    interface ITagOptions extends IGenericContentOptions {
        Description2?: string;
        BlackListPath?: string;
    }

    /**
     * Class representing a User
     * @class User
     * @extends {@link GenericContent}
     */
    export class User extends GenericContent {
        LoginName: string;
        JobTitle?: string;
        Enabled?: boolean;
        Domain?: string;
        Email: string;
        FullName: string;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        Avatar?: Fields.DeferredObject;
        Password: string;
        SyncGuid?: string;
        LastSync?: Date;
        Captcha?: string;
        Manager?: Fields.DeferredObject;
        Department?: string;
        Languages?: string;
        Phone?: string;
        Gender?: Enums.Gender;
        MaritalStatus?: Enums.MaritalStatus;
        BirthDate?: Date;
        Education?: string;
        TwitterAccount?: string;
        FacebookURL?: string;
        LinkedInURL?: string;
        Language?: Enums.UserLanguage;
        FollowedWorkspaces?: Fields.DeferredObject;
        ProfilePath?: string;

        /**
         * @constructs User
         * @param options {object} An object implementing {@link IUserOptions} interface
         */
        constructor(options: IUserOptions) {
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
    /**
     * Interface for classes that represent a User.
     * @interface IUserOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IUserOptions extends IGenericContentOptions {
        LoginName: string;
        JobTitle?: string;
        Enabled?: boolean;
        Domain?: string;
        Email: string;
        FullName: string;
        ImageRef?: Fields.DeferredObject;
        ImageData?: Fields.DeferredObject;
        Avatar?: Fields.DeferredObject;
        Password: string;
        SyncGuid?: string;
        LastSync?: Date;
        Captcha?: string;
        Manager?: Fields.DeferredObject;
        Department?: string;
        Languages?: string;
        Phone?: string;
        Gender?: Enums.Gender;
        MaritalStatus?: Enums.MaritalStatus;
        BirthDate?: Date;
        Education?: string;
        TwitterAccount?: string;
        FacebookURL?: string;
        LinkedInURL?: string;
        Language?: Enums.UserLanguage;
        FollowedWorkspaces?: Fields.DeferredObject;
        ProfilePath?: string;
    }

    /**
     * Class representing a RegisteredUser
     * @class RegisteredUser
     * @extends {@link User}
     */
    export class RegisteredUser extends User {
        ResetKey?: string;
        ActivationId?: string;
        Activated?: boolean;
        SecurityQuestion?: string;
        SecurityAnswer?: string;

        /**
         * @constructs RegisteredUser
         * @param options {object} An object implementing {@link IRegisteredUserOptions} interface
         */
        constructor(options: IRegisteredUserOptions) {
            super(options);
            this.ResetKey = options.ResetKey;
            this.ActivationId = options.ActivationId;
            this.Activated = options.Activated;
            this.SecurityQuestion = options.SecurityQuestion;
            this.SecurityAnswer = options.SecurityAnswer;
        }

    }
    /**
     * Interface for classes that represent a RegisteredUser.
     * @interface IRegisteredUserOptions
     * @extends {@link IUserOptions}
     */
    interface IRegisteredUserOptions extends IUserOptions {
        ResetKey?: string;
        ActivationId?: string;
        Activated?: boolean;
        SecurityQuestion?: string;
        SecurityAnswer?: string;
    }

    /**
     * Class representing a UserSearch
     * @class UserSearch
     * @extends {@link GenericContent}
     */
    export class UserSearch extends GenericContent {
        Search?: string;

        /**
         * @constructs UserSearch
         * @param options {object} An object implementing {@link IUserSearchOptions} interface
         */
        constructor(options: IUserSearchOptions) {
            super(options);
            this.Search = options.Search;
        }

    }
    /**
     * Interface for classes that represent a UserSearch.
     * @interface IUserSearchOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IUserSearchOptions extends IGenericContentOptions {
        Search?: string;
    }

    /**
     * Class representing a WikiArticle
     * @class WikiArticle
     * @extends {@link GenericContent}
     */
    export class WikiArticle extends GenericContent {
        WikiArticleText?: string;
        ReferencedWikiTitles?: string;

        /**
         * @constructs WikiArticle
         * @param options {object} An object implementing {@link IWikiArticleOptions} interface
         */
        constructor(options: IWikiArticleOptions) {
            super(options);
            this.WikiArticleText = options.WikiArticleText;
            this.ReferencedWikiTitles = options.ReferencedWikiTitles;
        }

    }
    /**
     * Interface for classes that represent a WikiArticle.
     * @interface IWikiArticleOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IWikiArticleOptions extends IGenericContentOptions {
        WikiArticleText?: string;
        ReferencedWikiTitles?: string;
    }

    /**
     * Class representing a Workflow
     * @class Workflow
     * @extends {@link GenericContent}
     */
    export class Workflow extends GenericContent {
        WorkflowDefinitionVersion?: string;
        WorkflowInstanceGuid?: string;
        WorkflowTypeName?: string;
        WorkflowHostType?: string;
        WorkflowStarted?: boolean;
        WorkflowStatus?: Enums.WorkflowStatus;
        AllowManualStart?: boolean;
        AutostartOnPublished?: boolean;
        AutostartOnCreated?: boolean;
        AutostartOnChanged?: boolean;
        ContentWorkflow?: boolean;
        AbortOnRelatedContentChange?: boolean;
        RelatedContent?: Fields.DeferredObject;
        SystemMessages?: string;
        OwnerSiteUrl?: string;

        /**
         * @constructs Workflow
         * @param options {object} An object implementing {@link IWorkflowOptions} interface
         */
        constructor(options: IWorkflowOptions) {
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
    /**
     * Interface for classes that represent a Workflow.
     * @interface IWorkflowOptions
     * @extends {@link IGenericContentOptions}
     */
    interface IWorkflowOptions extends IGenericContentOptions {
        WorkflowDefinitionVersion?: string;
        WorkflowInstanceGuid?: string;
        WorkflowTypeName?: string;
        WorkflowHostType?: string;
        WorkflowStarted?: boolean;
        WorkflowStatus?: Enums.WorkflowStatus;
        AllowManualStart?: boolean;
        AutostartOnPublished?: boolean;
        AutostartOnCreated?: boolean;
        AutostartOnChanged?: boolean;
        ContentWorkflow?: boolean;
        AbortOnRelatedContentChange?: boolean;
        RelatedContent?: Fields.DeferredObject;
        SystemMessages?: string;
        OwnerSiteUrl?: string;
    }

    /**
     * Class representing a ApprovalWorkflow
     * @class ApprovalWorkflow
     * @extends {@link Workflow}
     */
    export class ApprovalWorkflow extends Workflow {
        FirstLevelApprover: Fields.DeferredObject;
        FirstLevelTimeFrame: string;
        SecondLevelApprover?: Fields.DeferredObject;
        SecondLevelTimeFrame?: string;
        WaitForAll?: boolean;

        /**
         * @constructs ApprovalWorkflow
         * @param options {object} An object implementing {@link IApprovalWorkflowOptions} interface
         */
        constructor(options: IApprovalWorkflowOptions) {
            super(options);
            this.FirstLevelApprover = options.FirstLevelApprover;
            this.FirstLevelTimeFrame = options.FirstLevelTimeFrame;
            this.SecondLevelApprover = options.SecondLevelApprover;
            this.SecondLevelTimeFrame = options.SecondLevelTimeFrame;
            this.WaitForAll = options.WaitForAll;
        }

    }
    /**
     * Interface for classes that represent a ApprovalWorkflow.
     * @interface IApprovalWorkflowOptions
     * @extends {@link IWorkflowOptions}
     */
    interface IApprovalWorkflowOptions extends IWorkflowOptions {
        FirstLevelApprover: Fields.DeferredObject;
        FirstLevelTimeFrame: string;
        SecondLevelApprover?: Fields.DeferredObject;
        SecondLevelTimeFrame?: string;
        WaitForAll?: boolean;
    }

    /**
     * Class representing a DocumentPreviewWorkflow
     * @class DocumentPreviewWorkflow
     * @extends {@link Workflow}
     */
    export class DocumentPreviewWorkflow extends Workflow {
        StartIndex?: number;
        ContentVersion?: string;

        /**
         * @constructs DocumentPreviewWorkflow
         * @param options {object} An object implementing {@link IDocumentPreviewWorkflowOptions} interface
         */
        constructor(options: IDocumentPreviewWorkflowOptions) {
            super(options);
            this.StartIndex = options.StartIndex;
            this.ContentVersion = options.ContentVersion;
        }

    }
    /**
     * Interface for classes that represent a DocumentPreviewWorkflow.
     * @interface IDocumentPreviewWorkflowOptions
     * @extends {@link IWorkflowOptions}
     */
    interface IDocumentPreviewWorkflowOptions extends IWorkflowOptions {
        StartIndex?: number;
        ContentVersion?: string;
    }

    /**
     * Class representing a ExpenseClaimWorkflow
     * @class ExpenseClaimWorkflow
     * @extends {@link Workflow}
     */
    export class ExpenseClaimWorkflow extends Workflow {
        CEO: Fields.DeferredObject;
        BudgetLimit: number;
        FinanceEmail?: string;

        /**
         * @constructs ExpenseClaimWorkflow
         * @param options {object} An object implementing {@link IExpenseClaimWorkflowOptions} interface
         */
        constructor(options: IExpenseClaimWorkflowOptions) {
            super(options);
            this.CEO = options.CEO;
            this.BudgetLimit = options.BudgetLimit;
            this.FinanceEmail = options.FinanceEmail;
        }

    }
    /**
     * Interface for classes that represent a ExpenseClaimWorkflow.
     * @interface IExpenseClaimWorkflowOptions
     * @extends {@link IWorkflowOptions}
     */
    interface IExpenseClaimWorkflowOptions extends IWorkflowOptions {
        CEO: Fields.DeferredObject;
        BudgetLimit: number;
        FinanceEmail?: string;
    }

    /**
     * Class representing a ForgottenPasswordWorkflow
     * @class ForgottenPasswordWorkflow
     * @extends {@link Workflow}
     */
    export class ForgottenPasswordWorkflow extends Workflow {
        EmailForPassword: string;

        /**
         * @constructs ForgottenPasswordWorkflow
         * @param options {object} An object implementing {@link IForgottenPasswordWorkflowOptions} interface
         */
        constructor(options: IForgottenPasswordWorkflowOptions) {
            super(options);
            this.EmailForPassword = options.EmailForPassword;
        }

    }
    /**
     * Interface for classes that represent a ForgottenPasswordWorkflow.
     * @interface IForgottenPasswordWorkflowOptions
     * @extends {@link IWorkflowOptions}
     */
    interface IForgottenPasswordWorkflowOptions extends IWorkflowOptions {
        EmailForPassword: string;
    }

    /**
     * Class representing a MailProcessorWorkflow
     * @class MailProcessorWorkflow
     * @extends {@link Workflow}
     */
    export class MailProcessorWorkflow extends Workflow {

        /**
         * @constructs MailProcessorWorkflow
         * @param options {object} An object implementing {@link IMailProcessorWorkflowOptions} interface
         */
        constructor(options: IMailProcessorWorkflowOptions) {
            super(options);
        }

    }
    /**
     * Interface for classes that represent a MailProcessorWorkflow.
     * @interface IMailProcessorWorkflowOptions
     * @extends {@link IWorkflowOptions}
     */
    interface IMailProcessorWorkflowOptions extends IWorkflowOptions {
    }

    /**
     * Class representing a RegistrationWorkflow
     * @class RegistrationWorkflow
     * @extends {@link Workflow}
     */
    export class RegistrationWorkflow extends Workflow {
        FullName?: string;
        UserName: string;
        Email: string;
        InitialPassword: string;
        RegistrationType?: Enums.RegistrationType;

        /**
         * @constructs RegistrationWorkflow
         * @param options {object} An object implementing {@link IRegistrationWorkflowOptions} interface
         */
        constructor(options: IRegistrationWorkflowOptions) {
            super(options);
            this.FullName = options.FullName;
            this.UserName = options.UserName;
            this.Email = options.Email;
            this.InitialPassword = options.InitialPassword;
            this.RegistrationType = options.RegistrationType;
        }

    }
    /**
     * Interface for classes that represent a RegistrationWorkflow.
     * @interface IRegistrationWorkflowOptions
     * @extends {@link IWorkflowOptions}
     */
    interface IRegistrationWorkflowOptions extends IWorkflowOptions {
        FullName?: string;
        UserName: string;
        Email: string;
        InitialPassword: string;
        RegistrationType?: Enums.RegistrationType;
    }

}

/**
 * Creates a Content object by the given type and options Object that hold the field values.
 * @param type {string} The Content will be a copy of the given type.
 * @param options {SenseNet.IContentOptions} Optional list of fields and values.
 * @returns {SenseNet.Content}
 * ```ts
 * var content = SenseNet.Content.Create('Folder', { DisplayName: 'My folder' }); // content is an instance of the Folder with the DisplayName 'My folder'
 * ```
 */
export function CreateContent<T>(type: string, options: IContentOptions = {}): Content {
    let content = new ContentTypes[type](options);
    return content;
}