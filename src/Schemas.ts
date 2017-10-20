/**
 * @module Schemas
 * @preferred
 * @description Module for ContentType schemas.
 *
 * A Content Type Definition in Sense/Net is an xml-format configuration file for defining Content Types. The xml configuration (CTD) holds information about the types name and description
 * properties that control how content of this type look and behave (icon, preview generation, indexing), set of fields, etc. This information about the type and its Fields helps us for example
 * building forms. Based on the Field definitions we can render a Field with its DisplayName as a label or validate the Field on save by its validation related configs.
 *
 * This module provides us description of this Content schemas in Typesript.
 *
 * The ```Schema``` class represents an object that holds the basic information about the Content Type (name, icon, ect.) and an array of its ```FieldSettings``` and their full configuration.
 */ /** */

import { FieldSettings, Content, ContentTypes } from './SN';

    /**
     * Class that represents a Schema.
     *
     * It represents an object that holds the basic information about the Content Type (name, icon, ect.) and an array of its ```FieldSettings``` and their full configuration.
     */
    export class Schema<TContentType extends Content> {
        ContentType: {new(...args: any[]): TContentType}
        Icon: string;
        DisplayName: string;
        Description: string;
        AllowIndexing: boolean;
        AllowIncrementalNaming: boolean;
        AllowedChildTypes: string[];
        FieldSettings: FieldSettings.FieldSetting[];

        constructor(schema: Partial<Schema<TContentType>>){
            Object.assign(this, schema);
        }
    }

    export const SchemaStore: Schema<Content>[] = [

    /**
     * Method that returns the Content Type Definition of the ContentType
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ContentType,
            DisplayName: '$Ctd-ContentType,DisplayName',
            Description: '$Ctd-ContentType,Description',
            Icon: 'ContentType',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.IntegerFieldSetting({
                name: 'Id',
                displayName: 'Id',
                description: 'A unique ID for the Content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'ParentId',
                displayName: 'Id',
                description: 'A unique ID for the Content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'VersionId',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Name',
                displayName: 'Uri name',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'CreatedById',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'ModifiedById',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Version',
                displayName: 'Version',
                description: 'Latest version number.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Path',
                displayName: 'Path',
                description: 'Content type path.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'Depth',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsSystemContent',
                displayName: 'System Content',
                description: 'This field is true if content is in a system folder/trash or the content is a system folder/file.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'HandlerName',
                displayName: 'Handler Name',
                description: 'Fully Qualified Name.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'ParentTypeName',
                displayName: 'Parent Type Name',
                description: 'Name of the parent content type.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'DisplayName',
                displayName: 'Name',
                description: 'User friendly name of the content type.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'Description',
                displayName: 'Description',
                description: 'Longer description of the content type.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Icon',
                displayName: 'Icon',
                description: 'Content type icon.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.BinaryFieldSetting({
                isText: true,
                name: 'Binary',
                displayName: 'Binary',
                description: 'The content type definition in XML format.',
                readOnly: false,
                compulsory: false,
                defaultValue: '<?xml version="1.0" encoding="utf-8"?>\<ContentType name="MyType" parentType="GenericContent" handler="SenseNet.ContentRepository.GenericContent" xmlns="http://schemas.sensenet.com/SenseNet/ContentRepository/ContentTypeDefinition">\  <DisplayName>MyType</DisplayName>\  <Description></Description>\  <Icon>Content</Icon>\  <AllowIncrementalNaming>true</AllowIncrementalNaming>\  <AllowedChildTypes>ContentTypeName1,ContentTypeName2</AllowedChildTypes>\  <Fields>\    <Field name="ShortTextField" type="ShortText">\      <DisplayName>ShortTextField</DisplayName>\      <Description></Description>\      <Configuration>\        <MaxLength>100</MaxLength>\        <MinLength>0</MinLength>\        <Regex>[a-zA-Z0-9]*$</Regex>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="LongTextField" type="LongText">\      <DisplayName>LongTextField</DisplayName>\      <Description></Description>\      <Configuration>\        <MaxLength>100</MaxLength>\        <MinLength>0</MinLength>\        <TextType>LongText|RichText|AdvancedRichText</TextType>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="NumberField" type="Number">\      <DisplayName>NumberField</DisplayName>\      <Description></Description>\      <Configuration>\        <MinValue>0</MinValue>\        <MaxValue>100.5</MaxValue>\        <Digits>2</Digits>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="IntegerField" type="Integer">\      <DisplayName>IntegerField</DisplayName>\      <Description></Description>\      <Configuration>\        <MinValue>0</MinValue>\        <MaxValue>100</MaxValue>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="BooleanField" type="Boolean">\      <DisplayName>BooleanField</DisplayName>\      <Description></Description>\      <Configuration>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="ChoiceField" type="Choice">\      <DisplayName>ChoiceField</DisplayName>\      <Description></Description>\      <Configuration>\        <AllowMultiple>false</AllowMultiple>\        <AllowExtraValue>false</AllowExtraValue>\        <Options>\          <Option selected="true">1</Option>\          <Option>2</Option>\        </Options>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="DateTimeField" type="DateTime">\      <DisplayName>DateTimeField</DisplayName>\      <Description></Description>\      <Configuration>\        <DateTimeMode>DateAndTime</DateTimeMode>\        <Precision>Second</Precision>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="ReferenceField" type="Reference">\      <DisplayName>ReferenceField</DisplayName>\      <Description></Description>\      <Configuration>\        <AllowMultiple>true</AllowMultiple>\        <AllowedTypes>\          <Type>Type1</Type>\          <Type>Type2</Type>\        </AllowedTypes>\        <SelectionRoot>\          <Path>/Root/Path1</Path>\          <Path>/Root/Path2</Path>\        </SelectionRoot>\        <DefaultValue>/Root/Path1,/Root/Path2</DefaultValue>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="BinaryField" type="Binary">\      <DisplayName>BinaryField</DisplayName>\      <Description></Description>\      <Configuration>\        <IsText>true</IsText>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\  </Fields>\</ContentType>',
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                name: 'CreatedBy',
                displayName: 'Created by',
                description: 'Content creator.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'CreationDate',
                displayName: 'Creation date',
                description: 'Content creation date.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                name: 'ModifiedBy',
                displayName: 'Modified by',
                description: 'Content was last modified by the given user.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                name: 'ModificationDate',
                displayName: 'Modification date',
                description: 'Content was last modified on the given date.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'EnableLifespan',
                displayName: 'Enable Lifespan handling',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the GenericContent
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.GenericContent,
            DisplayName: '$Ctd-GenericContent,DisplayName',
            Description: '$Ctd-GenericContent,Description',
            Icon: 'Content',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.IntegerFieldSetting({
                name: 'Id',
                displayName: 'Id',
                description: 'Unique Id for the content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'ParentId',
                displayName: 'Parent Id',
                description: 'Id of the parent content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'OwnerId',
                displayName: 'Owner Id',
                description: 'Id of the owner.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                name: 'Owner',
                displayName: 'Owner',
                description: 'Content owner.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'VersionId',
                displayName: 'Version Id',
                description: 'Database row Id of current version.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Icon',
                displayName: 'Icon',
                description: 'Icon',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Name',
                displayName: 'Name',
                description: 'Specify a name that will appear in the address bar of the browser.',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:Name'
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'CreatedById',
                displayName: 'Created By (Id)',
                description: 'Id of creator.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'ModifiedById',
                displayName: 'Last Modified By (Id)',
                description: 'Id of last modifier.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Version',
                displayName: 'Version',
                description: 'Version number.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Path',
                displayName: 'Path',
                description: 'Content path in the repository.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'Depth',
                displayName: 'Tree Depth',
                description: 'Content level in the tree. Root level is 0.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsSystemContent',
                displayName: 'System Content',
                description: 'This field is true if content is in a system folder/trash or the content is a system folder/file.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsFolder',
                displayName: 'Folder',
                description: 'This field is true if content can contain other content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'DisplayName',
                displayName: 'Display Name',
                description: 'Content name. You can set any name you prefer without any restrictions.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:DisplayName'
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'Description',
                displayName: 'Description',
                description: 'Description of the content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:RichText'
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Hidden',
                displayName: 'Hidden',
                description: 'If checked, content will not show up in navigation.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'Index',
                displayName: 'Index',
                description: 'Content order in navigation. Numbers closer to 0 will appear first.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'EnableLifespan',
                displayName: 'Enable Lifespan',
                description: 'Specify whether you want to define starting and end date for the validity of this content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'ValidFrom',
                displayName: 'Valid From',
                description: 'This content will appear on the date you set if lifespan handling is enabled for this content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'ValidTill',
                displayName: 'Valid Till',
                description: 'This content will disappear on the date you set if lifespan handling is enabled for this content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'AllowedChildTypes',
                displayName: 'Allowed child types',
                description: 'You can get and set which content types are explicitly allowed to be created under this content. It is a local setting.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'EffectiveAllowedChildTypes',
                displayName: 'Effective allowed child types',
                description: 'You can get which content types are effective allowed to be created under this content. If there is no local setting, the global setting takes effect.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                    {Value: '1', Text: 'None', Enabled: true, Selected: false },
                    {Value: '2', Text: 'Major only', Enabled: true, Selected: false },
                    {Value: '3', Text: 'Major and minor', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'VersioningMode',
                displayName: 'Versioning Mode For Current Content',
                description: 'It shows the versioning mode of the current content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                    {Value: '1', Text: 'None', Enabled: true, Selected: false },
                    {Value: '2', Text: 'Major only', Enabled: true, Selected: false },
                    {Value: '3', Text: 'Major and minor', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'InheritableVersioningMode',
                displayName: 'Version history',
                description: 'Specify whether the system should create a new version whenever you create or modify a content below this content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0,
                controlHint: 'sn:VersioningModeChoice'
            }),
            new FieldSettings.ReferenceFieldSetting({
                name: 'CreatedBy',
                displayName: 'Created by',
                description: 'Content creator.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'CreationDate',
                displayName: 'Creation date',
                description: 'Content creation date.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                name: 'ModifiedBy',
                displayName: 'Modified By',
                description: 'Content was last modified by this user.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'ModificationDate',
                displayName: 'Modification Date',
                description: 'Content was last modified on this date.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                    {Value: '1', Text: 'Off', Enabled: true, Selected: false },
                    {Value: '2', Text: 'On', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'ApprovingMode',
                displayName: 'Content Approval For Current Content',
                description: 'It shows the approval mode of the current content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                    {Value: '1', Text: 'Off', Enabled: true, Selected: false },
                    {Value: '2', Text: 'On', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'InheritableApprovingMode',
                displayName: 'Content approval',
                description: 'Specify whether new or changed content below the current one should remain in a draft state until they have been approved.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0,
                controlHint: 'sn:ApprovingModeChoice'
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Locked',
                displayName: 'Locked',
                description: 'It shows whether the content is checked out or not.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                name: 'CheckedOutTo',
                displayName: 'Checked Out To',
                description: 'The user currently locking the content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'TrashDisabled',
                displayName: 'Disable Trash',
                description: 'You can disable trash for this content and its children. If set, you can not restore deleted content.',
                readOnly: false,
                compulsory: false,
                defaultValue: 'false',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Finalized', Enabled: true, Selected: false },
                    {Value: '1', Text: 'Creating', Enabled: true, Selected: false },
                    {Value: '2', Text: 'Modifying', Enabled: true, Selected: false },
                    {Value: '3', Text: 'ModifyingLocked', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: 'SenseNet.ContentRepository.Storage.ContentSavingState',
                name: 'SavingState',
                displayName: 'Saving state',
                description: 'State of multi-step saving.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'ExtensionData',
                displayName: 'Extension data',
                description: 'You can set extra data in this field which is useful when extending a content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                name: 'BrowseApplication',
                displayName: 'Reference To Browse Application',
                description: 'Set this, if you would like to override the default browse application.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Approvable',
                displayName: 'Approvable By Current User',
                description: 'This fileld is true if the content is in \'pending\' state and can be approved by the current user.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsTaggable',
                displayName: 'Enable Tagging',
                description: 'Specify whether you would like to enable tagging capability for this content.',
                readOnly: false,
                compulsory: false,
                defaultValue: 'false',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'Tags',
                displayName: 'Tags',
                description: 'List of tags and creators of them separated by commas.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0,
                controlHint: 'sn:TagList'
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsRateable',
                displayName: 'Enable Rating',
                description: 'Specify whether you would like to enable rating capability for this content.',
                readOnly: false,
                compulsory: false,
                defaultValue: 'false',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'RateStr',
                displayName: 'Raw value of rating',
                description: '',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NumberFieldSetting({
                name: 'RateAvg',
                displayName: 'Average rate',
                description: 'Average rate of the content.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'RateCount',
                displayName: 'Rate count',
                description: 'Count of rates.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.RatingFieldSetting({
                range: 5,
                split: 1,
                name: 'Rate',
                displayName: 'Rate',
                description: '',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Publishable',
                displayName: 'Publishable By Current User',
                description: 'This fileld is true if the content can be published by the current user.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                name: 'Versions',
                displayName: 'Versions',
                description: 'Content version history.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'CheckInComments',
                displayName: 'Checkin comments',
                description: 'Comments for a new version.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'RejectReason',
                displayName: 'Reject reason',
                description: 'The reason why the content was rejected.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['Workspace'],
                name: 'Workspace',
                displayName: 'Workspace',
                description: 'The container workspace of the content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'BrowseUrl',
                displayName: 'Browse url',
                description: '',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ContentLink
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ContentLink,
            DisplayName: '$Ctd-ContentLink,DisplayName',
            Description: '$Ctd-ContentLink,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                name: 'Link',
                displayName: 'Linked content',
                description: 'Set this reference to the Content to link.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the File
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.File,
            DisplayName: '$Ctd-File,DisplayName',
            Description: '$Ctd-File,Description',
            Icon: 'File',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.BinaryFieldSetting({
                name: 'Binary',
                displayName: 'Binary',
                description: 'The binary content of the document.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NumberFieldSetting({
                name: 'Size',
                displayName: 'Size',
                description: 'Size of the binary document.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NumberFieldSetting({
                name: 'FullSize',
                displayName: 'Full size',
                description: 'The total amount of space the Document occupies, counting all versions.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'PageCount',
                displayName: 'Page count',
                description: 'Read-only field for storing the number of pages in the document. It is filled by the document preview generator.',
                readOnly: false,
                compulsory: false,
                defaultValue: '-4',
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'MimeType',
                displayName: 'Document MIME type',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'Shapes',
                displayName: 'Shapes',
                description: 'Stores data used for document preview (redaction, highlight, annotation shapes). This value can be modified by the document preview plugin.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                name: 'PageAttributes',
                displayName: 'Page attributes',
                description: 'Stores data used for document preview (for example page rotation). This value can be modified by the document preview plugin.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Watermark',
                displayName: 'Watermark',
                description: 'The text that is displayed as a watermark on the document preview. The format can be set by modifying the Document Preview settings.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the DynamicJsonContent
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.DynamicJsonContent,
            DisplayName: 'Dynamic JSON content',
            Description: '',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ExecutableFile
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ExecutableFile,
            DisplayName: '$Ctd-ExecutableFile,DisplayName',
            Description: '$Ctd-ExecutableFile,Description',
            Icon: 'Application',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the HtmlTemplate
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.HtmlTemplate,
            DisplayName: '$Ctd-HtmlTemplate,DisplayName',
            Description: '$Ctd-HtmlTemplate,Description',
            Icon: 'File',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.LongTextFieldSetting({
                name: 'TemplateText',
                displayName: 'Template text',
                description: 'Shows the contents of the html file as a text.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Image
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Image,
            DisplayName: '$Ctd-Image,DisplayName',
            Description: '$Ctd-Image,Description',
            Icon: 'Image',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.LongTextFieldSetting({
                name: 'Keywords',
                displayName: 'Keywords',
                description: 'Keywords describing the image.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'DateTaken',
                displayName: 'Date taken',
                description: 'Date the photo was taken, if applicable.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'Width',
                displayName: 'Width',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'Height',
                displayName: 'Height',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the PreviewImage
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.PreviewImage,
            DisplayName: '$Ctd-PreviewImage,DisplayName',
            Description: '$Ctd-PreviewImage,Description',
            Icon: 'Image',
            AllowIndexing: false,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Settings
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Settings,
            DisplayName: '$Ctd-Settings,DisplayName',
            Description: '$Ctd-Settings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.NullFieldSetting({
                name: 'GlobalOnly',
                displayName: 'Global only',
                description: 'Switching this ON will prevent the creation of local settings with the same name preventing others to gain access to the contents of this settings file through inheritance.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the IndexingSettings
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.IndexingSettings,
            DisplayName: '$Ctd-IndexingSettings,DisplayName',
            Description: '$Ctd-IndexingSettings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.NullFieldSetting({
                name: 'TextExtractorInstances',
                displayName: 'Text extractor instances',
                description: 'Dynamically generated text extractor instance collection.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the LoggingSettings
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.LoggingSettings,
            DisplayName: '$Ctd-LoggingSettings,DisplayName',
            Description: '$Ctd-LoggingSettings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the PortalSettings
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.PortalSettings,
            DisplayName: '$Ctd-PortalSettings,DisplayName',
            Description: '$Ctd-PortalSettings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the SystemFile
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.SystemFile,
            DisplayName: '$Ctd-SystemFile,DisplayName',
            Description: '$Ctd-SystemFile,Description',
            Icon: 'File',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Resource
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Resource,
            DisplayName: '$Ctd-Resource,DisplayName',
            Description: '$Ctd-Resource,Description',
            Icon: 'Resource',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.NumberFieldSetting({
                name: 'Downloads',
                displayName: 'Downloads',
                description: 'The number of downloads.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Folder
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Folder,
            DisplayName: '$Ctd-Folder,DisplayName',
            Description: '$Ctd-Folder,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ContentList
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ContentList,
            DisplayName: '$Ctd-ContentList,DisplayName',
            Description: '$Ctd-ContentList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.LongTextFieldSetting({
                name: 'ContentListDefinition',
                displayName: 'List Definition',
                description: 'XML definition for additional fields.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'DefaultView',
                displayName: 'Default view',
                description: 'The default View to use.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                allowedTypes: ['ListView'],
                name: 'AvailableViews',
                displayName: 'Available views',
                description: 'Select global content list views here that you want to offer users to choose from.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                allowedTypes: ['FieldSettingContent'],
                name: 'FieldSettingContents',
                displayName: 'FieldSetting content',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                allowedTypes: ['FieldSettingContent'],
                name: 'AvailableContentTypeFields',
                displayName: 'Available ContentType Field content.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'ListEmail',
                displayName: 'Email address of Content List',
                description: 'Emails sent to this address will be imported as Email content into the Document Library.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'ExchangeSubscriptionId',
                displayName: 'Exchange Subscription Id',
                description: 'Ctd-ContentListen-USExchangeSubscriptionId-Descriptione',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'OverwriteFiles',
                displayName: 'Overwrite files with same name',
                description: 'If checked new emails and attachments with the same name will overwrite existing items in list. Otherwise increment suffix is used in the name of new mail items.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: 'email', Text: 'Save all attachments as children of separate Email content', Enabled: true, Selected: true },
                    {Value: 'root', Text: 'Save all attachments in root', Enabled: true, Selected: false },
                    {Value: 'subject', Text: 'Save all attachments in folders grouped by subject', Enabled: true, Selected: false },
                    {Value: 'sender', Text: 'Save all attachments in folders grouped by sender', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'GroupAttachments',
                displayName: 'Group attachments',
                description: 'Select the appropriate option to group attachment files under folders or email content or not.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'SaveOriginalEmail',
                displayName: 'Save original email',
                description: 'A separate .eml file will be created for every incoming email.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                selectionRoots: ['/Root/System/Schema/ContentTypes/GenericContent/Workflow/MailProcessorWorkflow'],
                name: 'IncomingEmailWorkflow',
                displayName: 'Incoming email workflow',
                description: 'Select the workflow to be executed on every incoming email.',
                readOnly: false,
                compulsory: false,
                defaultValue: '/Root/System/Schema/ContentTypes/GenericContent/Workflow/MailProcessorWorkflow',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'OnlyFromLocalGroups',
                displayName: 'Accept e-mails only from users in local groups',
                description: 'If set, only users that are members of any local group are able to send e-mails to this library.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'InboxFolder',
                displayName: 'Inbox folder',
                description: 'A relative path of a folder to store incoming e-mails.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['User'],
                selectionRoots: ['/Root/IMS'],
                name: 'OwnerWhenVisitor',
                displayName: 'Owner of items created by visitor',
                description: 'If a Visitor adds content to this list, this user will be set as the creator instead of the Visitor. This prevents visitors see each others\' content.',
                readOnly: false,
                compulsory: false,
                defaultValue: '/Root/IMS/BuiltIn/Portal/Admin',
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Aspect
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Aspect,
            DisplayName: '$Ctd-Aspect,DisplayName',
            Description: '$Ctd-Aspect,Description',
            Icon: 'Aspect',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.LongTextFieldSetting({
                name: 'AspectDefinition',
                displayName: 'Aspect definition',
                description: 'Definition of the extension in XML format.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ItemList
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ItemList,
            DisplayName: '$Ctd-ItemList,DisplayName',
            Description: '$Ctd-ItemList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the CustomList
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.CustomList,
            DisplayName: '$Ctd-CustomList,DisplayName',
            Description: '$Ctd-CustomList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['ListItem'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the MemoList
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.MemoList,
            DisplayName: '$Ctd-MemoList,DisplayName',
            Description: '$Ctd-MemoList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Memo'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the TaskList
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.TaskList,
            DisplayName: '$Ctd-TaskList,DisplayName',
            Description: '$Ctd-TaskList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Task'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Library
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Library,
            DisplayName: '$Ctd-Library,DisplayName',
            Description: '$Ctd-Library,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the DocumentLibrary
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.DocumentLibrary,
            DisplayName: '$Ctd-DocumentLibrary,DisplayName',
            Description: '$Ctd-DocumentLibrary,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'File'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ImageLibrary
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ImageLibrary,
            DisplayName: '$Ctd-ImageLibrary,DisplayName',
            Description: '$Ctd-ImageLibrary,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'Image'],
            FieldSettings: [
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['Image'],
                name: 'CoverImage',
                displayName: 'Cover image',
                description: 'Select cover image',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Device
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Device,
            DisplayName: '$Ctd-Device,DisplayName',
            Description: '$Ctd-Device,Description',
            Icon: 'Device',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.ShortTextFieldSetting({
                name: 'UserAgentPattern',
                displayName: 'User agent string',
                description: 'A regular expression to match the user agent string of the browser.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Domain
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Domain,
            DisplayName: '$Ctd-Domain,DisplayName',
            Description: '$Ctd-Domain,Description',
            Icon: 'Domain',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['User', 'Group', 'OrganizationalUnit'],
            FieldSettings: [
            new FieldSettings.ShortTextFieldSetting({
                name: 'SyncGuid',
                displayName: 'SyncGuid',
                description: 'GUID of corresponding AD object.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'LastSync',
                displayName: 'LastSync',
                description: 'Date of last synchronization.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Domains
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Domains,
            DisplayName: '$Ctd-Domains,DisplayName',
            Description: '$Ctd-Domains,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Domain'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Email
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Email,
            DisplayName: '$Ctd-Email,DisplayName',
            Description: '$Ctd-Email,Description',
            Icon: 'Document',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: ['File'],
            FieldSettings: [
            new FieldSettings.ShortTextFieldSetting({
                name: 'From',
                displayName: 'From',
                description: 'Sender name and address.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                textType: FieldSettings.TextType.RichText,
                name: 'Body',
                displayName: 'Body',
                description: 'Body of email.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:RichText'
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'Sent',
                displayName: 'Sent',
                description: 'Date of sending.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the OrganizationalUnit
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.OrganizationalUnit,
            DisplayName: '$Ctd-OrganizationalUnit,DisplayName',
            Description: '$Ctd-OrganizationalUnit,Description',
            Icon: 'OrgUnit',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['User', 'Group', 'OrganizationalUnit'],
            FieldSettings: [
            new FieldSettings.ShortTextFieldSetting({
                name: 'SyncGuid',
                displayName: 'SyncGuid',
                description: 'GUID of corresponding AD object.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'LastSync',
                displayName: 'LastSync',
                description: 'Date of last synchronization.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the PortalRoot
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.PortalRoot,
            DisplayName: '$Ctd-PortalRoot,DisplayName',
            Description: '$Ctd-PortalRoot,Description',
            Icon: 'PortalRoot',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'SystemFolder', 'TrashBin', 'ContentList', 'CustomList', 'Sites', 'Domains', 'Profiles', 'Resources', 'Workspace'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ProfileDomain
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ProfileDomain,
            DisplayName: '$Ctd-ProfileDomain,DisplayName',
            Description: '$Ctd-ProfileDomain,Description',
            Icon: 'Domain',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['UserProfile'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Profiles
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Profiles,
            DisplayName: '$Ctd-Profiles,DisplayName',
            Description: '$Ctd-Profiles,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['ProfileDomain'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the RuntimeContentContainer
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.RuntimeContentContainer,
            DisplayName: '$Ctd-RuntimeContentContainer,DisplayName',
            Description: '$Ctd-RuntimeContentContainer,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Sites
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Sites,
            DisplayName: '$Ctd-Sites,DisplayName',
            Description: '$Ctd-Sites,Description',
            Icon: 'Site',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Site'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the SmartFolder
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.SmartFolder,
            DisplayName: '$Ctd-SmartFolder,DisplayName',
            Description: '$Ctd-SmartFolder,Description',
            Icon: 'SmartFolder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.LongTextFieldSetting({
                name: 'Query',
                displayName: 'Query',
                description: 'Please give a query here that you want to use for collecting the children of this smart folder.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:QueryBuilder'
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Default', Enabled: true, Selected: false },
                    {Value: '1', Text: 'Enabled', Enabled: true, Selected: false },
                    {Value: '2', Text: 'Disabled', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: 'SenseNet.Search.FilterStatus',
                name: 'EnableAutofilters',
                displayName: 'Enable autofilters',
                description: 'If autofilters are enabled, system content will be filtered from the query.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '0', Text: 'Default', Enabled: true, Selected: false },
                    {Value: '1', Text: 'Enabled', Enabled: true, Selected: false },
                    {Value: '2', Text: 'Disabled', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: 'SenseNet.Search.FilterStatus',
                name: 'EnableLifespanFilter',
                displayName: 'Enable lifespan filter',
                description: 'If lifespan filter is enabled, only valid content will be in the result.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the SystemFolder
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.SystemFolder,
            DisplayName: '$Ctd-SystemFolder,DisplayName',
            Description: '$Ctd-SystemFolder,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Resources
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Resources,
            DisplayName: '$Ctd-Resources,DisplayName',
            Description: '$Ctd-Resources,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Resource'],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the TrashBag
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.TrashBag,
            DisplayName: '$Ctd-TrashBag,DisplayName',
            Description: '$Ctd-TrashBag,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.DateTimeFieldSetting({
                name: 'KeepUntil',
                displayName: 'Keep until',
                description: 'The bag must be kept until this date.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'OriginalPath',
                displayName: 'Original path',
                description: 'The path where the bag content were deleted from.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'WorkspaceRelativePath',
                displayName: 'Ctd-TrashBagen-USWorkspaceRelativePath-DisplayName',
                description: 'Ctd-TrashBagen-USWorkspaceRelativePath-Description',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'WorkspaceId',
                displayName: 'Ctd-TrashBagen-USWorkspaceId-DisplayName',
                description: 'Ctd-TrashBagen-USWorkspaceId-Description',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                name: 'DeletedContent',
                displayName: 'Deleted content',
                description: 'The actual deleted content inside this trash bag.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Workspace
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Workspace,
            DisplayName: '$Ctd-Workspace,DisplayName',
            Description: '$Ctd-Workspace,Description',
            Icon: 'Workspace',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'DocumentLibrary', 'ImageLibrary', 'MemoList', 'TaskList', 'CustomList', 'Workspace'],
            FieldSettings: [
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['User'],
                selectionRoots: ['/Root/IMS', '/Root'],
                name: 'Manager',
                displayName: 'Project manager',
                description: 'The person responsible for the project.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'Deadline',
                displayName: 'Project deadline',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsActive',
                displayName: 'Active',
                description: 'This workspace is currently active.',
                readOnly: false,
                compulsory: true,
                defaultValue: 'true',
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['Skin'],
                selectionRoots: ['/Root/Skins'],
                name: 'WorkspaceSkin',
                displayName: 'Skin',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsCritical',
                displayName: 'Is critical',
                description: 'This workspace is currently in a critical status.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsWallContainer',
                displayName: 'Wall Container',
                description: 'This workspace is configured to contain a wall - this indicates that posts are created under this workspace if Content are shared anywhere below this path.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'IsFollowed',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Site
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Site,
            DisplayName: '$Ctd-Site,DisplayName',
            Description: '$Ctd-Site,Description',
            Icon: 'Site',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'Workspace', 'Profiles', 'Image', 'DocumentLibrary', 'ImageLibrary', 'MemoList', 'TaskList', 'CustomList', 'SmartFolder'],
            FieldSettings: [
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: 'en', Text: 'English', Enabled: true, Selected: true },
                    {Value: 'hu', Text: 'Hungarian', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'Language',
                displayName: 'Language',
                description: 'Please define the default language of this site.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'EnableClientBasedCulture',
                displayName: 'Enable client-based culture',
                description: 'Enable this to allow user browser settings override default site language settings.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'EnableUserBasedCulture',
                displayName: 'Enable user-based culture',
                description: 'Enable this to allow user language settings override default site language settings.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'UrlList',
                displayName: 'URL list',
                description: 'Select the URLs to associate with this Site.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                selectionRoots: ['.'],
                name: 'StartPage',
                displayName: 'Alternative start page',
                description: 'If set, the site will use this start page instead of the default.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                selectionRoots: ['.'],
                name: 'LoginPage',
                displayName: 'Login page',
                description: 'The login page to display when a user tries to access restricted Content (Forms authentication only).',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['Skin'],
                selectionRoots: ['/Root/Skins'],
                name: 'SiteSkin',
                displayName: 'Skin',
                description: '',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'DenyCrossSiteAccess',
                displayName: 'Deny cross-site access',
                description: 'If set, content under this site can only be accessed via this site and not via other sites using a Root relative path.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the TrashBin
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.TrashBin,
            DisplayName: '$Ctd-TrashBin,DisplayName',
            Description: '$Ctd-TrashBin,Description',
            Icon: 'trash',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['TrashBag'],
            FieldSettings: [
            new FieldSettings.IntegerFieldSetting({
                minValue: 0,
                name: 'MinRetentionTime',
                displayName: 'Minimum retention time (in days)',
                description: '',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                minValue: 0,
                name: 'SizeQuota',
                displayName: 'Size quota',
                description: 'Set the size quote for the trash bin (Megabytes).',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                minValue: 0,
                name: 'BagCapacity',
                displayName: 'Trashbag capacity',
                description: 'The maximum number of nodes accepted for trash in a single operation.',
                readOnly: false,
                compulsory: false,
                defaultValue: '100',
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the UserProfile
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.UserProfile,
            DisplayName: '$Ctd-UserProfile,DisplayName',
            Description: '$Ctd-UserProfile,Description',
            Icon: 'UserProfile',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['DocumentLibrary', 'MemoList', 'TaskList', 'ImageLibrary', 'CustomList'],
            FieldSettings: [
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['User'],
                selectionRoots: ['/Root/IMS'],
                name: 'User',
                displayName: 'User',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Group
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Group,
            DisplayName: '$Ctd-Group,DisplayName',
            Description: '$Ctd-Group,Description',
            Icon: 'Group',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                allowedTypes: ['User', 'Group'],
                selectionRoots: ['/Root/IMS', '/Root'],
                name: 'Members',
                displayName: 'Members',
                description: 'The members of this group.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'SyncGuid',
                displayName: 'Sync Guid',
                description: 'GUID of corresponding AD object.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'LastSync',
                displayName: 'Last synchronization',
                description: 'Date of last synchronization.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the ListItem
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.ListItem,
            DisplayName: '$Ctd-ListItem,DisplayName',
            Description: '$Ctd-ListItem,Description',
            Icon: 'FormItem',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the CustomListItem
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.CustomListItem,
            DisplayName: '$Ctd-CustomListItem,DisplayName',
            Description: '$Ctd-CustomListItem,Description',
            Icon: 'FormItem',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.NullFieldSetting({
                name: 'WorkflowsRunning',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Memo
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Memo,
            DisplayName: '$Ctd-Memo,DisplayName',
            Description: '$Ctd-Memo,Description',
            Icon: 'Document',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'Date',
                displayName: 'Date',
                description: 'Please set the due date of the memo.',
                readOnly: false,
                compulsory: false,
                defaultValue: '[Script:jScript] DateTime.UtcNow; [/Script]',
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: true,
                allowMultiple: false,
                options: [
                    {Value: 'generic', Text: 'Generic', Enabled: true, Selected: true },
                    {Value: 'iso', Text: 'ISO', Enabled: true, Selected: false },
                    {Value: 'iaudit', Text: 'Internal audit', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'MemoType',
                displayName: 'Memo type',
                description: 'Type of the memo.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                name: 'SeeAlso',
                displayName: 'See also...',
                description: 'A list of content this memo pertains to.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Task
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Task,
            DisplayName: '$Ctd-Task,DisplayName',
            Description: '$Ctd-Task,Description',
            Icon: 'FormItem',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'StartDate',
                displayName: 'Start date',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'DueDate',
                displayName: 'Due date',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                allowedTypes: ['User'],
                selectionRoots: ['/Root/IMS', '/Root'],
                name: 'AssignedTo',
                displayName: 'Assigned to',
                description: 'List of internal stakeholders.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '1', Text: 'Urgent', Enabled: true, Selected: false },
                    {Value: '2', Text: 'Normal', Enabled: true, Selected: true },
                    {Value: '3', Text: 'Not urgent', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'Priority',
                displayName: 'Priority',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: 'pending', Text: 'Pending', Enabled: true, Selected: false },
                    {Value: 'active', Text: 'Active', Enabled: true, Selected: true },
                    {Value: 'completed', Text: 'Completed', Enabled: true, Selected: false },
                    {Value: 'deferred', Text: 'Deferred', Enabled: true, Selected: false },
                    {Value: 'waiting', Text: 'Waiting', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'Status',
                displayName: 'Status',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                minValue: 0,
                maxValue: 100,
                showAsPercentage: true,
                name: 'TaskCompletion',
                displayName: 'Completion',
                description: 'Completion percentage of the task.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.IntegerFieldSetting({
                name: 'RemainingDays',
                displayName: 'Remaining days',
                description: 'Number of remaining days.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'DueText',
                displayName: 'DueText',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'DueCssClass',
                displayName: 'Due style',
                description: 'Css class',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the Query
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.Query,
            DisplayName: '$Ctd-Query,DisplayName',
            Description: '$Ctd-Query,Description',
            Icon: 'Query',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: [
            new FieldSettings.LongTextFieldSetting({
                name: 'Query',
                displayName: 'Query',
                description: 'Query text.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:QueryBuilder'
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: 'Public', Text: 'Public', Enabled: true, Selected: true },
                    {Value: 'Private', Text: 'Private', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.RadioButtons,
                enumTypeName: '',
                name: 'QueryType',
                displayName: 'Query type',
                description: 'Public queries are stored under the workspace, private queries are stored under the user profile.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
        ]
        }),

    /**
     * Method that returns the Content Type Definition of the User
     * @returns {Schema}
     */
    new Schema({
            ContentType: ContentTypes.User,
            DisplayName: '$Ctd-User,DisplayName',
            Description: '$Ctd-User,Description',
            Icon: 'User',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Image'],
            FieldSettings: [
            new FieldSettings.ShortTextFieldSetting({
                maxLength: 100,
                name: 'LoginName',
                displayName: 'Login name',
                description: 'The name that the user has to type in on login forms (in some cases along with the domain name). It has to be unique under a domain.',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'JobTitle',
                displayName: 'Job title',
                description: '',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Enabled',
                displayName: 'Enabled',
                description: 'User account is enabled.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Domain',
                displayName: 'Domain',
                description: 'The domain of the user.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                regex: '^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$',
                name: 'Email',
                displayName: 'E-mail',
                description: 'The e-mail of the user.',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                regex: '[^<]+',
                name: 'FullName',
                displayName: 'Full name',
                description: 'Full name of the user (e.g. John Smith).',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                name: 'ImageRef',
                displayName: 'Cover image (reference)',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.BinaryFieldSetting({
                name: 'ImageData',
                displayName: 'Cover image (binarydata)',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.NullFieldSetting({
                name: 'Avatar',
                displayName: 'Avatar',
                description: 'Avatar image of user.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0,
                controlHint: 'sn:Image'
            }),
            new FieldSettings.PasswordFieldSetting({
                reenterTitle: 'Re-enter password',
                reenterDescription: 'Re-enter password.',
                passwordHistoryLength: 0,
                name: 'Password',
                displayName: 'Password',
                description: 'User password.',
                readOnly: false,
                compulsory: true,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'SyncGuid',
                displayName: 'SyncGuid',
                description: 'GUID of corresponding AD object.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.DateAndTime,
                name: 'LastSync',
                displayName: 'LastSync',
                description: 'Date of last synchronization.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.CaptchaFieldSetting({
                name: 'Captcha',
                displayName: 'Captcha text',
                description: 'Captcha text entered by the user.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: false,
                allowedTypes: ['User'],
                selectionRoots: ['/Root/IMS'],
                name: 'Manager',
                displayName: 'Manager',
                description: 'Manager of the user.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Department',
                displayName: 'Department',
                description: 'Department of employee.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'Languages',
                displayName: 'Languages',
                description: 'Spoken languages.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                regex: '(^\\d*([-\\s\\+\\(\\)]\\d*)*$)?',
                name: 'Phone',
                displayName: 'Phone',
                description: 'Phone number. (e.g. +123456789 or 1234).',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '...', Text: '...', Enabled: true, Selected: false },
                    {Value: 'Female', Text: 'Female', Enabled: true, Selected: false },
                    {Value: 'Male', Text: 'Male', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'Gender',
                displayName: 'Gender',
                description: 'Select one.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: '...', Text: '...', Enabled: true, Selected: false },
                    {Value: 'Single', Text: 'Single', Enabled: true, Selected: false },
                    {Value: 'Married', Text: 'Married', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'MaritalStatus',
                displayName: 'Marital status',
                description: 'Select one.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.DateTimeFieldSetting({
                dateTimeMode: FieldSettings.DateTimeMode.Date,
                name: 'BirthDate',
                displayName: 'Birth date',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.LongTextFieldSetting({
                textType: FieldSettings.TextType.LongText,
                name: 'Education',
                displayName: 'Education',
                description: 'List of educations - e.g. high school, university.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0,
                controlHint: 'sn:EducationEditor'
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'TwitterAccount',
                displayName: 'Twitter account',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'FacebookURL',
                displayName: 'Facebook URL',
                description: 'http://www.facebook.com/USERNAME.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'LinkedInURL',
                displayName: 'LinkedIn URL',
                description: 'http://www.linkedin.com/USERNAME.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ChoiceFieldSetting({
                allowExtraValue: false,
                allowMultiple: false,
                options: [
                    {Value: 'en', Text: 'English', Enabled: true, Selected: true },
                    {Value: 'hu', Text: 'Hungarian', Enabled: true, Selected: false }
                ],
                displayChoice: FieldSettings.DisplayChoice.DropDown,
                enumTypeName: '',
                name: 'Language',
                displayName: 'Selected language',
                description: 'Language used to display texts on the site, if it is available.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Show,
                visibleEdit: FieldSettings.FieldVisibility.Show,
                visibleNew: FieldSettings.FieldVisibility.Show,
                defaultOrder: 0
            }),
            new FieldSettings.ReferenceFieldSetting({
                allowMultiple: true,
                allowedTypes: ['Workspace'],
                name: 'FollowedWorkspaces',
                displayName: 'Followed workspaces',
                description: 'List of workspaces followed by the user.',
                readOnly: false,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Advanced,
                visibleEdit: FieldSettings.FieldVisibility.Advanced,
                visibleNew: FieldSettings.FieldVisibility.Advanced,
                defaultOrder: 0
            }),
            new FieldSettings.ShortTextFieldSetting({
                name: 'ProfilePath',
                displayName: 'Profile path',
                description: 'Path of the user\'s personal workspace.',
                readOnly: true,
                compulsory: false,
                visibleBrowse: FieldSettings.FieldVisibility.Hide,
                visibleEdit: FieldSettings.FieldVisibility.Hide,
                visibleNew: FieldSettings.FieldVisibility.Hide,
                defaultOrder: 0
            }),
        ]
        }),

]
