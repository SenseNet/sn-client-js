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
     * Class representing a GenericContent
     * @class GenericContent
     * @extends {@link Content}
     */
    export class GenericContent extends Content {
        ParentId?: number = null;
        OwnerId?: number = null;
        Owner?: Fields.DeferredObject = null;
        VersionId?: number = null;
        TypeIs?: string = null;
        Icon?: string = null;
        CreatedById?: number = null;
        ModifiedById?: number = null;
        Version?: string = null;
        Path?: string = null;
        Depth?: number = null;
        InTree?: string = null;
        InFolder?: string = null;
        IsSystemContent?: boolean = false;
        IsFolder?: boolean = false;
        Hidden?: boolean = null;
        EnableLifespan?: boolean = false;
        ValidFrom?: Date = null;
        ValidTill?: Date = null;
        AllowedChildTypes?: Fields.DeferredObject = null

        /**
         * @constructs GenericContent
         * @param options {object} An object implementing {@link IGenericContentOptions} interface;
         */
        constructor(options: IGenericContentOptions) {
            super(options);
        }

    }

    /**
    * Interface for classes that represent a GenericContent.
    *
    * @interface IGenericContentOptions
    * @extends {@link IContentOptions}
    */

    interface IGenericContentOptions extends IContentOptions {
        ParentId?: number;
        OwnerId?: number;
        Owner?: Fields.DeferredObject;
        VersionId?: number;
        Type?: string;
        TypeIs?: string;
        Icon?: string;
        CreatedById?: number;
        ModifiedById?: number;
        Version?: string;
        Path?: string;
        Depth?: number;
        InTree?: string;
        InFolder?: string;
        IsSystemContent?: boolean;
        IsFolder?: boolean;
        Hidden?: boolean;
        EnableLifespan?: boolean;
        ValidFrom?: string;
        ValidTill?: string;
        AllowedChildTypes?: Fields.DeferredObject;
    }
    /**
     * Class representing a Folder
     * @class Folder
     * @extends {@link GenericContent}
     */
    export class Folder extends GenericContent {
    }

    export class ListItem extends GenericContent{}

    export class WebContent extends ListItem{
        ReviewDate?: Date;
        ArchiveDate?: Date;
        constructor(options: IWebContentOptions){
            super(options);
        }
    }

    interface IWebContentOptions extends IGenericContentOptions {
        ReviewDate?: Date;
        ArchiveDate?: Date;
    }

    export class Article extends WebContent {
        Subtitle?: string;
        Lead?: string;
        Body?: string;
        Pinned?: boolean;
        Keywords?: string;
        Author?: string;
        constructor(options: IArticleOptions){
            super(options);
        }
    }

    interface IArticleOptions extends IWebContentOptions {
        Subtitle?: string;
        Lead?: string;
        Body?: string;
        Pinned?: boolean;
        Keywords?: string;
        Author?: string;
    }

    export class Task extends ListItem {
        StartDate?: Date;
        DueDate?: Date;
        AssignedTo?: string;
        Priority?: Priority;
        Status?: Status;
        TaskCompletion?: number;
        RemainingDays?: number;
        DueText?: string;
        DueCssClass?: string;
        constructor(options: ITaskOptions){
            super(options);
        }
    }

    interface ITaskOptions extends IGenericContentOptions {
        StartDate?: Date;
        DueDate?: Date;
        AssignedTo?: string;
        Priority?: Priority;
        Status?: Status;
        TaskCompletion?: number;
        RemainingDays?: number;
        DueText?: string;
        DueCssClass?: string;
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

enum Priority {}
enum Status {}