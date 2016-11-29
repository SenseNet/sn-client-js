import { FieldSettings } from './FieldSettings';

/**
 * Module for ContentType schemas.
 *
 * A Content Type Definition in Sense/Net is an xml-format configuration file for defining Content Types. The xml configuration (CTD) holds information about the types name and description
 * properties that control how content of this type look and behave (icon, preview generation, indexing), set of fields, etc. This information about the type and its Fields helps us for example
 * building forms. Based on the Field definitions we can render a Field with its DisplayName as a label or validate the Field on save by its validation related configs.
 *
 * This module provides us description of this Content schemas in Typesript.
 *
 * The ```Schema``` class represents an object that holds the basic information about the Content Type (name, icon, ect.) and an array of its ```FieldSettings``` and their full configuration.
 */

export module Schemas {


    /**
     * Class that represents a Schema.
     *
     * It represents an object that holds the basic information about the Content Type (name, icon, ect.) and an array of its ```FieldSettings``` and their full configuration.
     */
    export class Schema {
        Icon: string;
        DisplayName: string;
        Description: string;
        AllowIndexing: boolean;
        AllowIncrementalNaming: boolean;
        AllowedChildTypes: string[];
        FieldSettings: FieldSettings.FieldSetting[];
        /**
         * @constructs Schema
         * @param options {Object} An object implementing ISchemaOptions interface;
         */
        constructor(options: ISchemaOptions) {
            this.Icon = options.Icon;
            this.DisplayName = options.DisplayName;
            this.Description = options.Description;
            this.FieldSettings = options.FieldSettings;
            this.AllowIndexing = options.AllowIndexing;
            this.AllowIncrementalNaming = options.AllowIncrementalNaming;
            this.AllowedChildTypes = options.AllowedChildTypes;
        }
    }

    /**
    * Interface for classes that represent a Schema.
    *
    * @interface ISchemaOptions
    */
    export interface ISchemaOptions {
        Icon?: string;
        DisplayName?: string;
        Description?: string;
        AllowIndexing?: boolean;
        AllowIncrementalNaming?: boolean;
        AllowedChildTypes?: string[];
        FieldSettings?: FieldSettings.FieldSetting[];
    }

/**
 * Method that returns the Content Type Definition of the GenericContent
 * @returns {Schema}
 */
    export function GenericContentCTD(): Schema {
        let options: ISchemaOptions = {
            DisplayName: 'Generic Content',
            Description: 'vmi',
            Icon: 'content',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: ['ContentTypeName1', 'ContentTypeName2'],
            FieldSettings: []
        };

        let schema = new Schema(options);

        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'DisplayName',
                displayName: 'DisplayName',
                description: 'DisplayName',
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'Id',
                displayName: 'Id',
                description: 'Id',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'ParentId',
                displayName: 'Parent id',
                description: 'Id of the parent content',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'OwnerId',
                displayName: 'Owner id',
                description: 'Id of the owner',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ReferenceFieldSetting({
                name: 'Owner',
                displayName: 'Owner',
                description: 'Owner',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'VersionId',
                displayName: 'Version id',
                description: 'Version id',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'Type',
                displayName: 'Type',
                description: 'Type',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'TypeIs',
                displayName: 'TypeIs',
                description: 'TypeIs',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'Icon',
                displayName: 'Icon',
                description: 'Icon',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'Name',
                displayName: 'Name',
                description: 'Name of the content',
                compulsory: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'CreatedById',
                displayName: 'Createdby id',
                description: 'Id of the creator',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'ModifiedById',
                displayName: 'Modifiedby id',
                description: 'Id of the last modifier',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'Version',
                displayName: 'Version',
                description: 'Version',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'Path',
                displayName: 'Path',
                description: 'Path',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'Depth',
                displayName: 'Depth',
                description: 'Depth',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'InTree',
                displayName: 'InTree',
                description: 'InTree',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'InFolder',
                displayName: 'InFolder',
                description: 'InFolder',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.BooleanFieldSetting({
                name: 'IsSystemContent',
                displayName: 'System content',
                description: 'It is a system content',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.BooleanFieldSetting({
                name: 'IsFolder',
                displayName: 'Folder',
                description: 'It is a folder',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                readOnly: true
            }));
        schema.FieldSettings.push(
            new FieldSettings.ShortTextFieldSetting({
                name: 'DisplayName',
                displayName: 'Displayname',
                description: 'Displayname'
            }));
        schema.FieldSettings.push(
            new FieldSettings.LongTextFieldSetting({
                name: 'Description',
                displayName: 'Description',
                description: 'Description'
            }));
        schema.FieldSettings.push(
            new FieldSettings.BooleanFieldSetting({
                name: 'Hidden',
                displayName: 'Hidden',
                description: 'Hidden',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide
            }));
        schema.FieldSettings.push(
            new FieldSettings.IntegerFieldSetting({
                name: 'Index',
                displayName: 'Index',
                description: 'Index',
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced
            }));
        schema.FieldSettings.push(
            new FieldSettings.BooleanFieldSetting({
                name: 'EnableLifespan',
                displayName: 'EnableLifespan',
                description: 'EnableLifespan',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide
            }));
        schema.FieldSettings.push(
            new FieldSettings.DateTimeFieldSetting({
                name: 'ValidFrom',
                displayName: 'Valid from',
                description: 'Valid from',
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide
            }));
        schema.FieldSettings.push(
            new FieldSettings.DateTimeFieldSetting({
                name: 'ValidTill',
                displayName: 'Valid till',
                description: 'Valid till',
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide
            }));
        return schema;
    }
}
