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
import { Enums, FieldSettings, ComplexTypes } from './SN';
import { IRepository } from './Repository/IRepository';


/**
 * Class representing a ContentType
 * @class ContentType
 * @extends {@link Content}
 */
export class ContentType extends Content {
    Id?: number;
    ParentId?: number;
    VersionId?: number;
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
    Binary?: ComplexTypes.DeferredObject;
    CreatedBy?: ComplexTypes.DeferredObject;
    CreationDate?: Date;
    ModifiedBy?: ComplexTypes.DeferredObject;
    ModificationDate?: Date;
    EnableLifespan?: boolean;

    /**
     * @constructs ContentType
     * @param options {object} An object implementing {@link IContentTypeOptions} interface
     */
    constructor(options: IContentTypeOptions, repository: IRepository<any, any>) {
        super(options, repository);
        this.Id = options.Id;
        this.ParentId = options.ParentId;
        this.VersionId = options.VersionId;
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
    Id?: number;
    ParentId?: number;
    VersionId?: number;
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
    Binary?: ComplexTypes.DeferredObject;
    CreatedBy?: ComplexTypes.DeferredObject;
    CreationDate?: Date;
    ModifiedBy?: ComplexTypes.DeferredObject;
    ModificationDate?: Date;
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
    CreatedBy?: ComplexTypes.DeferredObject;
    CreationDate?: Date;
    ModifiedBy?: ComplexTypes.DeferredObject;
    ModificationDate?: Date;
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
    constructor(options: IGenericContentOptions, repository: IRepository<any, any>) {
        super(options, repository);
        this.Id = options.Id;
        this.ParentId = options.ParentId;
        this.OwnerId = options.OwnerId;
        this.Owner = options.Owner;
        this.VersionId = options.VersionId;
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
    Id?: number;
    ParentId?: number;
    OwnerId?: number;
    Owner?: ComplexTypes.DeferredObject;
    VersionId?: number;
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
    CreatedBy?: ComplexTypes.DeferredObject;
    CreationDate?: Date;
    ModifiedBy?: ComplexTypes.DeferredObject;
    ModificationDate?: Date;
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
    constructor(options: IContentLinkOptions, repository: IRepository<any, any>) {
        super(options, repository);
        this.Link = options.Link;
    }

}
/**
 * Interface for classes that represent a ContentLink.
 * @interface IContentLinkOptions
 * @extends {@link IGenericContentOptions}
 */
interface IContentLinkOptions extends IGenericContentOptions {
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
    constructor(options: IFileOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IDynamicJsonContentOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IExecutableFileOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IHtmlTemplateOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IImageOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IPreviewImageOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ISettingsOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IIndexingSettingsOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ILoggingSettingsOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IPortalSettingsOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ISystemFileOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IResourceOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a Folder
 * @class Folder
 * @extends {@link GenericContent}
 */
export class Folder extends GenericContent {

    /**
     * @constructs Folder
     * @param options {object} An object implementing {@link IFolderOptions} interface
     */
    constructor(options: IFolderOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IContentListOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IAspectOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IItemListOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ICustomListOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a MemoList
 * @class MemoList
 * @extends {@link ItemList}
 */
export class MemoList extends ItemList {

    /**
     * @constructs MemoList
     * @param options {object} An object implementing {@link IMemoListOptions} interface
     */
    constructor(options: IMemoListOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a TaskList
 * @class TaskList
 * @extends {@link ItemList}
 */
export class TaskList extends ItemList {

    /**
     * @constructs TaskList
     * @param options {object} An object implementing {@link ITaskListOptions} interface
     */
    constructor(options: ITaskListOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ILibraryOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IDocumentLibraryOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    CoverImage?: ComplexTypes.DeferredObject;

    /**
     * @constructs ImageLibrary
     * @param options {object} An object implementing {@link IImageLibraryOptions} interface
     */
    constructor(options: IImageLibraryOptions, repository: IRepository<any, any>) {
        super(options, repository);
        this.CoverImage = options.CoverImage;
    }

}
/**
 * Interface for classes that represent a ImageLibrary.
 * @interface IImageLibraryOptions
 * @extends {@link ILibraryOptions}
 */
interface IImageLibraryOptions extends ILibraryOptions {
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
    constructor(options: IDeviceOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IDomainOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IDomainsOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IEmailOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IOrganizationalUnitOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a PortalRoot
 * @class PortalRoot
 * @extends {@link Folder}
 */
export class PortalRoot extends Folder {

    /**
     * @constructs PortalRoot
     * @param options {object} An object implementing {@link IPortalRootOptions} interface
     */
    constructor(options: IPortalRootOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a ProfileDomain
 * @class ProfileDomain
 * @extends {@link Folder}
 */
export class ProfileDomain extends Folder {

    /**
     * @constructs ProfileDomain
     * @param options {object} An object implementing {@link IProfileDomainOptions} interface
     */
    constructor(options: IProfileDomainOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IProfilesOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a RuntimeContentContainer
 * @class RuntimeContentContainer
 * @extends {@link Folder}
 */
export class RuntimeContentContainer extends Folder {

    /**
     * @constructs RuntimeContentContainer
     * @param options {object} An object implementing {@link IRuntimeContentContainerOptions} interface
     */
    constructor(options: IRuntimeContentContainerOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a Sites
 * @class Sites
 * @extends {@link Folder}
 */
export class Sites extends Folder {

    /**
     * @constructs Sites
     * @param options {object} An object implementing {@link ISitesOptions} interface
     */
    constructor(options: ISitesOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ISmartFolderOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a SystemFolder
 * @class SystemFolder
 * @extends {@link Folder}
 */
export class SystemFolder extends Folder {

    /**
     * @constructs SystemFolder
     * @param options {object} An object implementing {@link ISystemFolderOptions} interface
     */
    constructor(options: ISystemFolderOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a Resources
 * @class Resources
 * @extends {@link SystemFolder}
 */
export class Resources extends SystemFolder {

    /**
     * @constructs Resources
     * @param options {object} An object implementing {@link IResourcesOptions} interface
     */
    constructor(options: IResourcesOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a TrashBag
 * @class TrashBag
 * @extends {@link Folder}
 */
export class TrashBag extends Folder {
    KeepUntil?: Date;
    OriginalPath?: string;
    WorkspaceRelativePath?: string;
    WorkspaceId?: number;
    DeletedContent?: ComplexTypes.DeferredObject;

    /**
     * @constructs TrashBag
     * @param options {object} An object implementing {@link ITrashBagOptions} interface
     */
    constructor(options: ITrashBagOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    DeletedContent?: ComplexTypes.DeferredObject;
}

/**
 * Class representing a Workspace
 * @class Workspace
 * @extends {@link Folder}
 */
export class Workspace extends Folder {
    Manager?: ComplexTypes.DeferredObject;
    Deadline?: Date;
    IsActive: boolean;
    WorkspaceSkin?: ComplexTypes.DeferredObject;
    IsCritical?: boolean;
    IsWallContainer?: boolean;
    IsFollowed?: boolean;

    /**
     * @constructs Workspace
     * @param options {object} An object implementing {@link IWorkspaceOptions} interface
     */
    constructor(options: IWorkspaceOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    Manager?: ComplexTypes.DeferredObject;
    Deadline?: Date;
    IsActive: boolean;
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
    constructor(options: ISiteOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ITrashBinOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    User?: ComplexTypes.DeferredObject;

    /**
     * @constructs UserProfile
     * @param options {object} An object implementing {@link IUserProfileOptions} interface
     */
    constructor(options: IUserProfileOptions, repository: IRepository<any, any>) {
        super(options, repository);
        this.User = options.User;
    }

}
/**
 * Interface for classes that represent a UserProfile.
 * @interface IUserProfileOptions
 * @extends {@link IWorkspaceOptions}
 */
interface IUserProfileOptions extends IWorkspaceOptions {
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
    LastSync?: Date;

    /**
     * @constructs Group
     * @param options {object} An object implementing {@link IGroupOptions} interface
     */
    constructor(options: IGroupOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    Members?: ComplexTypes.DeferredObject;
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
    constructor(options: IListItemOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: ICustomListItemOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
 * Class representing a Memo
 * @class Memo
 * @extends {@link ListItem}
 */
export class Memo extends ListItem {
    Date?: Date;
    MemoType?: Enums.MemoType;
    SeeAlso?: ComplexTypes.DeferredObject;

    /**
     * @constructs Memo
     * @param options {object} An object implementing {@link IMemoOptions} interface
     */
    constructor(options: IMemoOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    SeeAlso?: ComplexTypes.DeferredObject;
}

/**
 * Class representing a Task
 * @class Task
 * @extends {@link ListItem}
 */
export class Task extends ListItem {
    StartDate?: Date;
    DueDate: Date;
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
    constructor(options: ITaskOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    constructor(options: IQueryOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    ImageRef?: ComplexTypes.DeferredObject;
    ImageData?: ComplexTypes.DeferredObject;
    Avatar?: ComplexTypes.DeferredObject;
    Password: string;
    SyncGuid?: string;
    LastSync?: Date;
    Captcha?: string;
    Manager?: ComplexTypes.DeferredObject;
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
    Language?: Enums.Language;
    FollowedWorkspaces?: ComplexTypes.DeferredObject;
    ProfilePath?: string;

    /**
     * @constructs User
     * @param options {object} An object implementing {@link IUserOptions} interface
     */
    constructor(options: IUserOptions, repository: IRepository<any, any>) {
        super(options, repository);
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
    ImageRef?: ComplexTypes.DeferredObject;
    ImageData?: ComplexTypes.DeferredObject;
    Avatar?: ComplexTypes.DeferredObject;
    Password: string;
    SyncGuid?: string;
    LastSync?: Date;
    Captcha?: string;
    Manager?: ComplexTypes.DeferredObject;
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
    Language?: Enums.Language;
    FollowedWorkspaces?: ComplexTypes.DeferredObject;
    ProfilePath?: string;
}
