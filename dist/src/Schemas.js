"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldSettings_1 = require("./FieldSettings");
var Schemas;
(function (Schemas) {
    class Schema {
        constructor(options) {
            this.Icon = options.Icon;
            this.DisplayName = options.DisplayName;
            this.Description = options.Description;
            this.FieldSettings = options.FieldSettings;
            this.AllowIndexing = options.AllowIndexing;
            this.AllowIncrementalNaming = options.AllowIncrementalNaming;
            this.AllowedChildTypes = options.AllowedChildTypes;
        }
    }
    Schemas.Schema = Schema;
    function ContentTypeCTD() {
        let options = {
            DisplayName: '$Ctd-ContentType,DisplayName',
            Description: '$Ctd-ContentType,Description',
            Icon: 'ContentType',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Id',
            displayName: 'Id',
            description: 'A unique ID for the Content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'ParentId',
            displayName: 'Id',
            description: 'A unique ID for the Content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'VersionId',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Type',
            displayName: 'NodeType',
            description: 'The type of the Node in the Repository.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Name',
            displayName: 'Uri name',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'CreatedById',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'ModifiedById',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Version',
            displayName: 'Version',
            description: 'Latest version number.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Path',
            displayName: 'Path',
            description: 'Content type path.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Depth',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsSystemContent',
            displayName: 'System Content',
            description: 'This field is true if content is in a system folder/trash or the content is a system folder/file.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'HandlerName',
            displayName: 'Handler Name',
            description: 'Fully Qualified Name.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'ParentTypeName',
            displayName: 'Parent Type Name',
            description: 'Name of the parent content type.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DisplayName',
            displayName: 'Name',
            description: 'User friendly name of the content type.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Description',
            displayName: 'Description',
            description: 'Longer description of the content type.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Icon',
            displayName: 'Icon',
            description: 'Content type icon.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BinaryFieldSetting({
            isText: true,
            name: 'Binary',
            displayName: 'Binary',
            description: 'The content type definition in XML format.',
            readOnly: false,
            compulsory: false,
            defaultValue: '<?xml version="1.0" encoding="utf-8"?>\<ContentType name="MyType" parentType="GenericContent" handler="SenseNet.ContentRepository.GenericContent" xmlns="http://schemas.sensenet.com/SenseNet/ContentRepository/ContentTypeDefinition">\  <DisplayName>MyType</DisplayName>\  <Description></Description>\  <Icon>Content</Icon>\  <AllowIncrementalNaming>true</AllowIncrementalNaming>\  <AllowedChildTypes>ContentTypeName1,ContentTypeName2</AllowedChildTypes>\  <Fields>\    <Field name="ShortTextField" type="ShortText">\      <DisplayName>ShortTextField</DisplayName>\      <Description></Description>\      <Configuration>\        <MaxLength>100</MaxLength>\        <MinLength>0</MinLength>\        <Regex>[a-zA-Z0-9]*$</Regex>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="LongTextField" type="LongText">\      <DisplayName>LongTextField</DisplayName>\      <Description></Description>\      <Configuration>\        <MaxLength>100</MaxLength>\        <MinLength>0</MinLength>\        <TextType>LongText|RichText|AdvancedRichText</TextType>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="NumberField" type="Number">\      <DisplayName>NumberField</DisplayName>\      <Description></Description>\      <Configuration>\        <MinValue>0</MinValue>\        <MaxValue>100.5</MaxValue>\        <Digits>2</Digits>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="IntegerField" type="Integer">\      <DisplayName>IntegerField</DisplayName>\      <Description></Description>\      <Configuration>\        <MinValue>0</MinValue>\        <MaxValue>100</MaxValue>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="BooleanField" type="Boolean">\      <DisplayName>BooleanField</DisplayName>\      <Description></Description>\      <Configuration>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="ChoiceField" type="Choice">\      <DisplayName>ChoiceField</DisplayName>\      <Description></Description>\      <Configuration>\        <AllowMultiple>false</AllowMultiple>\        <AllowExtraValue>false</AllowExtraValue>\        <Options>\          <Option selected="true">1</Option>\          <Option>2</Option>\        </Options>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="DateTimeField" type="DateTime">\      <DisplayName>DateTimeField</DisplayName>\      <Description></Description>\      <Configuration>\        <DateTimeMode>DateAndTime</DateTimeMode>\        <Precision>Second</Precision>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="ReferenceField" type="Reference">\      <DisplayName>ReferenceField</DisplayName>\      <Description></Description>\      <Configuration>\        <AllowMultiple>true</AllowMultiple>\        <AllowedTypes>\          <Type>Type1</Type>\          <Type>Type2</Type>\        </AllowedTypes>\        <SelectionRoot>\          <Path>/Root/Path1</Path>\          <Path>/Root/Path2</Path>\        </SelectionRoot>\        <DefaultValue>/Root/Path1,/Root/Path2</DefaultValue>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\    <Field name="BinaryField" type="Binary">\      <DisplayName>BinaryField</DisplayName>\      <Description></Description>\      <Configuration>\        <IsText>true</IsText>\        <ReadOnly>false</ReadOnly>\        <Compulsory>false</Compulsory>\        <DefaultValue></DefaultValue>\        <VisibleBrowse>Show|Hide|Advanced</VisibleBrowse>\        <VisibleEdit>Show|Hide|Advanced</VisibleEdit>\        <VisibleNew>Show|Hide|Advanced</VisibleNew>\      </Configuration>\    </Field>\  </Fields>\</ContentType>',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'CreatedBy',
            displayName: 'Created by',
            description: 'Content creator.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'CreationDate',
            displayName: 'Creation date',
            description: 'Content creation date.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'ModifiedBy',
            displayName: 'Modified by',
            description: 'Content was last modified by the given user.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            name: 'ModificationDate',
            displayName: 'Modification date',
            description: 'Content was last modified on the given date.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'EnableLifespan',
            displayName: 'Enable Lifespan handling',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.ContentTypeCTD = ContentTypeCTD;
    function GenericContentCTD() {
        let options = {
            DisplayName: '$Ctd-GenericContent,DisplayName',
            Description: '$Ctd-GenericContent,Description',
            Icon: 'Content',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Id',
            displayName: 'Id',
            description: 'Unique Id for the content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'ParentId',
            displayName: 'Parent Id',
            description: 'Id of the parent content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'OwnerId',
            displayName: 'Owner Id',
            description: 'Id of the owner.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'Owner',
            displayName: 'Owner',
            description: 'Content owner.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'VersionId',
            displayName: 'Version Id',
            description: 'Database row Id of current version.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Type',
            displayName: 'Content Type Name',
            description: 'Content type of the node in the repository.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Icon',
            displayName: 'Icon',
            description: 'Icon',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Name',
            displayName: 'Name',
            description: 'Specify a name that will appear in the address bar of the browser.',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:Name'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'CreatedById',
            displayName: 'Created By (Id)',
            description: 'Id of creator.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'ModifiedById',
            displayName: 'Last Modified By (Id)',
            description: 'Id of last modifier.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Version',
            displayName: 'Version',
            description: 'Version number.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Path',
            displayName: 'Path',
            description: 'Content path in the repository.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Depth',
            displayName: 'Tree Depth',
            description: 'Content level in the tree. Root level is 0.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsSystemContent',
            displayName: 'System Content',
            description: 'This field is true if content is in a system folder/trash or the content is a system folder/file.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsFolder',
            displayName: 'Folder',
            description: 'This field is true if content can contain other content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DisplayName',
            displayName: 'Display Name',
            description: 'Content name. You can set any name you prefer without any restrictions.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:DisplayName'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Description',
            displayName: 'Description',
            description: 'Description of the content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:RichText'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Hidden',
            displayName: 'Hidden',
            description: 'If checked, content will not show up in navigation.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Index',
            displayName: 'Index',
            description: 'Content order in navigation. Numbers closer to 0 will appear first.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'EnableLifespan',
            displayName: 'Enable Lifespan',
            description: 'Specify whether you want to define starting and end date for the validity of this content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'ValidFrom',
            displayName: 'Valid From',
            description: 'This content will appear on the date you set if lifespan handling is enabled for this content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'ValidTill',
            displayName: 'Valid Till',
            description: 'This content will disappear on the date you set if lifespan handling is enabled for this content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'AllowedChildTypes',
            displayName: 'Allowed child types',
            description: 'You can get and set which content types are explicitly allowed to be created under this content. It is a local setting.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'EffectiveAllowedChildTypes',
            displayName: 'Effective allowed child types',
            description: 'You can get which content types are effective allowed to be created under this content. If there is no local setting, the global setting takes effect.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                { Value: '1', Text: 'None', Enabled: true, Selected: false },
                { Value: '2', Text: 'Major only', Enabled: true, Selected: false },
                { Value: '3', Text: 'Major and minor', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'VersioningMode',
            displayName: 'Versioning Mode For Current Content',
            description: 'It shows the versioning mode of the current content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                { Value: '1', Text: 'None', Enabled: true, Selected: false },
                { Value: '2', Text: 'Major only', Enabled: true, Selected: false },
                { Value: '3', Text: 'Major and minor', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'InheritableVersioningMode',
            displayName: 'Version history',
            description: 'Specify whether the system should create a new version whenever you create or modify a content below this content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0,
            controlHint: 'sn:VersioningModeChoice'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'CreatedBy',
            displayName: 'Created by',
            description: 'Content creator.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'CreationDate',
            displayName: 'Creation date',
            description: 'Content creation date.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'ModifiedBy',
            displayName: 'Modified By',
            description: 'Content was last modified by this user.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'ModificationDate',
            displayName: 'Modification Date',
            description: 'Content was last modified on this date.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                { Value: '1', Text: 'Off', Enabled: true, Selected: false },
                { Value: '2', Text: 'On', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'ApprovingMode',
            displayName: 'Content Approval For Current Content',
            description: 'It shows the approval mode of the current content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Inherited', Enabled: true, Selected: true },
                { Value: '1', Text: 'Off', Enabled: true, Selected: false },
                { Value: '2', Text: 'On', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'InheritableApprovingMode',
            displayName: 'Content approval',
            description: 'Specify whether new or changed content below the current one should remain in a draft state until they have been approved.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0,
            controlHint: 'sn:ApprovingModeChoice'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Locked',
            displayName: 'Locked',
            description: 'It shows whether the content is checked out or not.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'CheckedOutTo',
            displayName: 'Checked Out To',
            description: 'The user currently locking the content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'TrashDisabled',
            displayName: 'Disable Trash',
            description: 'You can disable trash for this content and its children. If set, you can not restore deleted content.',
            readOnly: false,
            compulsory: false,
            defaultValue: 'false',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Finalized', Enabled: true, Selected: false },
                { Value: '1', Text: 'Creating', Enabled: true, Selected: false },
                { Value: '2', Text: 'Modifying', Enabled: true, Selected: false },
                { Value: '3', Text: 'ModifyingLocked', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: 'SenseNet.ContentRepository.Storage.ContentSavingState',
            name: 'SavingState',
            displayName: 'Saving state',
            description: 'State of multi-step saving.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'ExtensionData',
            displayName: 'Extension data',
            description: 'You can set extra data in this field which is useful when extending a content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            name: 'BrowseApplication',
            displayName: 'Reference To Browse Application',
            description: 'Set this, if you would like to override the default browse application.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Approvable',
            displayName: 'Approvable By Current User',
            description: 'This fileld is true if the content is in \'pending\' state and can be approved by the current user.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsTaggable',
            displayName: 'Enable Tagging',
            description: 'Specify whether you would like to enable tagging capability for this content.',
            readOnly: false,
            compulsory: false,
            defaultValue: 'false',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Tags',
            displayName: 'Tags',
            description: 'List of tags and creators of them separated by commas.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0,
            controlHint: 'sn:TagList'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsRateable',
            displayName: 'Enable Rating',
            description: 'Specify whether you would like to enable rating capability for this content.',
            readOnly: false,
            compulsory: false,
            defaultValue: 'false',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'RateStr',
            displayName: 'Raw value of rating',
            description: '',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NumberFieldSetting({
            name: 'RateAvg',
            displayName: 'Average rate',
            description: 'Average rate of the content.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'RateCount',
            displayName: 'Rate count',
            description: 'Count of rates.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.RatingFieldSetting({
            range: 5,
            split: 1,
            name: 'Rate',
            displayName: 'Rate',
            description: '',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Publishable',
            displayName: 'Publishable By Current User',
            description: 'This fileld is true if the content can be published by the current user.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            name: 'Versions',
            displayName: 'Versions',
            description: 'Content version history.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'CheckInComments',
            displayName: 'Checkin comments',
            description: 'Comments for a new version.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'RejectReason',
            displayName: 'Reject reason',
            description: 'The reason why the content was rejected.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['Workspace'],
            name: 'Workspace',
            displayName: 'Workspace',
            description: 'The container workspace of the content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'BrowseUrl',
            displayName: 'Browse url',
            description: '',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.GenericContentCTD = GenericContentCTD;
    function ContentLinkCTD() {
        let options = {
            DisplayName: '$Ctd-ContentLink,DisplayName',
            Description: '$Ctd-ContentLink,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            name: 'Link',
            displayName: 'Linked content',
            description: 'Set this reference to the Content to link.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.ContentLinkCTD = ContentLinkCTD;
    function FileCTD() {
        let options = {
            DisplayName: '$Ctd-File,DisplayName',
            Description: '$Ctd-File,Description',
            Icon: 'File',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BinaryFieldSetting({
            name: 'Binary',
            displayName: 'Binary',
            description: 'The binary content of the document.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NumberFieldSetting({
            name: 'Size',
            displayName: 'Size',
            description: 'Size of the binary document.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NumberFieldSetting({
            name: 'FullSize',
            displayName: 'Full size',
            description: 'The total amount of space the Document occupies, counting all versions.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'PageCount',
            displayName: 'Page count',
            description: 'Read-only field for storing the number of pages in the document. It is filled by the document preview generator.',
            readOnly: false,
            compulsory: false,
            defaultValue: '-4',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'MimeType',
            displayName: 'Document MIME type',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Shapes',
            displayName: 'Shapes',
            description: 'Stores data used for document preview (redaction, highlight, annotation shapes). This value can be modified by the document preview plugin.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'PageAttributes',
            displayName: 'Page attributes',
            description: 'Stores data used for document preview (for example page rotation). This value can be modified by the document preview plugin.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Watermark',
            displayName: 'Watermark',
            description: 'The text that is displayed as a watermark on the document preview. The format can be set by modifying the Document Preview settings.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.FileCTD = FileCTD;
    function DynamicJsonContentCTD() {
        let options = {
            DisplayName: 'Dynamic JSON content',
            Description: '',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.DynamicJsonContentCTD = DynamicJsonContentCTD;
    function ExecutableFileCTD() {
        let options = {
            DisplayName: '$Ctd-ExecutableFile,DisplayName',
            Description: '$Ctd-ExecutableFile,Description',
            Icon: 'Application',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.ExecutableFileCTD = ExecutableFileCTD;
    function HtmlTemplateCTD() {
        let options = {
            DisplayName: '$Ctd-HtmlTemplate,DisplayName',
            Description: '$Ctd-HtmlTemplate,Description',
            Icon: 'File',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'TemplateText',
            displayName: 'Template text',
            description: 'Shows the contents of the html file as a text.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.HtmlTemplateCTD = HtmlTemplateCTD;
    function ImageCTD() {
        let options = {
            DisplayName: '$Ctd-Image,DisplayName',
            Description: '$Ctd-Image,Description',
            Icon: 'Image',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Keywords',
            displayName: 'Keywords',
            description: 'Keywords describing the image.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'DateTaken',
            displayName: 'Date taken',
            description: 'Date the photo was taken, if applicable.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Width',
            displayName: 'Width',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Height',
            displayName: 'Height',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.ImageCTD = ImageCTD;
    function PreviewImageCTD() {
        let options = {
            DisplayName: '$Ctd-PreviewImage,DisplayName',
            Description: '$Ctd-PreviewImage,Description',
            Icon: 'Image',
            AllowIndexing: false,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.PreviewImageCTD = PreviewImageCTD;
    function SettingsCTD() {
        let options = {
            DisplayName: '$Ctd-Settings,DisplayName',
            Description: '$Ctd-Settings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'GlobalOnly',
            displayName: 'Global only',
            description: 'Switching this ON will prevent the creation of local settings with the same name preventing others to gain access to the contents of this settings file through inheritance.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.SettingsCTD = SettingsCTD;
    function IndexingSettingsCTD() {
        let options = {
            DisplayName: '$Ctd-IndexingSettings,DisplayName',
            Description: '$Ctd-IndexingSettings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'TextExtractorInstances',
            displayName: 'Text extractor instances',
            description: 'Dynamically generated text extractor instance collection.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.IndexingSettingsCTD = IndexingSettingsCTD;
    function LoggingSettingsCTD() {
        let options = {
            DisplayName: '$Ctd-LoggingSettings,DisplayName',
            Description: '$Ctd-LoggingSettings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.LoggingSettingsCTD = LoggingSettingsCTD;
    function PortalSettingsCTD() {
        let options = {
            DisplayName: '$Ctd-PortalSettings,DisplayName',
            Description: '$Ctd-PortalSettings,Description',
            Icon: 'Settings',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.PortalSettingsCTD = PortalSettingsCTD;
    function SystemFileCTD() {
        let options = {
            DisplayName: '$Ctd-SystemFile,DisplayName',
            Description: '$Ctd-SystemFile,Description',
            Icon: 'File',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.SystemFileCTD = SystemFileCTD;
    function ResourceCTD() {
        let options = {
            DisplayName: '$Ctd-Resource,DisplayName',
            Description: '$Ctd-Resource,Description',
            Icon: 'Resource',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NumberFieldSetting({
            name: 'Downloads',
            displayName: 'Downloads',
            description: 'The number of downloads.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.ResourceCTD = ResourceCTD;
    function FolderCTD() {
        let options = {
            DisplayName: '$Ctd-Folder,DisplayName',
            Description: '$Ctd-Folder,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.FolderCTD = FolderCTD;
    function ContentListCTD() {
        let options = {
            DisplayName: '$Ctd-ContentList,DisplayName',
            Description: '$Ctd-ContentList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'ContentListDefinition',
            displayName: 'List Definition',
            description: 'XML definition for additional fields.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DefaultView',
            displayName: 'Default view',
            description: 'The default View to use.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            allowedTypes: ['ListView'],
            name: 'AvailableViews',
            displayName: 'Available views',
            description: 'Select global content list views here that you want to offer users to choose from.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            allowedTypes: ['FieldSettingContent'],
            name: 'FieldSettingContents',
            displayName: 'FieldSetting content',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            allowedTypes: ['FieldSettingContent'],
            name: 'AvailableContentTypeFields',
            displayName: 'Available ContentType Field content.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'ListEmail',
            displayName: 'Email address of Content List',
            description: 'Emails sent to this address will be imported as Email content into the Document Library.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'ExchangeSubscriptionId',
            displayName: 'Exchange Subscription Id',
            description: 'Ctd-ContentListen-USExchangeSubscriptionId-Descriptione',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'OverwriteFiles',
            displayName: 'Overwrite files with same name',
            description: 'If checked new emails and attachments with the same name will overwrite existing items in list. Otherwise increment suffix is used in the name of new mail items.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: 'email', Text: 'Save all attachments as children of separate Email content', Enabled: true, Selected: true },
                { Value: 'root', Text: 'Save all attachments in root', Enabled: true, Selected: false },
                { Value: 'subject', Text: 'Save all attachments in folders grouped by subject', Enabled: true, Selected: false },
                { Value: 'sender', Text: 'Save all attachments in folders grouped by sender', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'GroupAttachments',
            displayName: 'Group attachments',
            description: 'Select the appropriate option to group attachment files under folders or email content or not.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'SaveOriginalEmail',
            displayName: 'Save original email',
            description: 'A separate .eml file will be created for every incoming email.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            selectionRoots: ['/Root/System/Schema/ContentTypes/GenericContent/Workflow/MailProcessorWorkflow'],
            name: 'IncomingEmailWorkflow',
            displayName: 'Incoming email workflow',
            description: 'Select the workflow to be executed on every incoming email.',
            readOnly: false,
            compulsory: false,
            defaultValue: '/Root/System/Schema/ContentTypes/GenericContent/Workflow/MailProcessorWorkflow',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'OnlyFromLocalGroups',
            displayName: 'Accept e-mails only from users in local groups',
            description: 'If set, only users that are members of any local group are able to send e-mails to this library.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'InboxFolder',
            displayName: 'Inbox folder',
            description: 'A relative path of a folder to store incoming e-mails.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['User'],
            selectionRoots: ['/Root/IMS'],
            name: 'OwnerWhenVisitor',
            displayName: 'Owner of items created by visitor',
            description: 'If a Visitor adds content to this list, this user will be set as the creator instead of the Visitor. This prevents visitors see each others\' content.',
            readOnly: false,
            compulsory: false,
            defaultValue: '/Root/IMS/BuiltIn/Portal/Admin',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.ContentListCTD = ContentListCTD;
    function AspectCTD() {
        let options = {
            DisplayName: '$Ctd-Aspect,DisplayName',
            Description: '$Ctd-Aspect,Description',
            Icon: 'Aspect',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'AspectDefinition',
            displayName: 'Aspect definition',
            description: 'Definition of the extension in XML format.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.AspectCTD = AspectCTD;
    function ItemListCTD() {
        let options = {
            DisplayName: '$Ctd-ItemList,DisplayName',
            Description: '$Ctd-ItemList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.ItemListCTD = ItemListCTD;
    function CustomListCTD() {
        let options = {
            DisplayName: '$Ctd-CustomList,DisplayName',
            Description: '$Ctd-CustomList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['ListItem'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.CustomListCTD = CustomListCTD;
    function MemoListCTD() {
        let options = {
            DisplayName: '$Ctd-MemoList,DisplayName',
            Description: '$Ctd-MemoList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Memo'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.MemoListCTD = MemoListCTD;
    function TaskListCTD() {
        let options = {
            DisplayName: '$Ctd-TaskList,DisplayName',
            Description: '$Ctd-TaskList,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Task'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.TaskListCTD = TaskListCTD;
    function LibraryCTD() {
        let options = {
            DisplayName: '$Ctd-Library,DisplayName',
            Description: '$Ctd-Library,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.LibraryCTD = LibraryCTD;
    function DocumentLibraryCTD() {
        let options = {
            DisplayName: '$Ctd-DocumentLibrary,DisplayName',
            Description: '$Ctd-DocumentLibrary,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'File'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.DocumentLibraryCTD = DocumentLibraryCTD;
    function ImageLibraryCTD() {
        let options = {
            DisplayName: '$Ctd-ImageLibrary,DisplayName',
            Description: '$Ctd-ImageLibrary,Description',
            Icon: 'ContentList',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'Image'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['Image'],
            name: 'CoverImage',
            displayName: 'Cover image',
            description: 'Select cover image',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.ImageLibraryCTD = ImageLibraryCTD;
    function DeviceCTD() {
        let options = {
            DisplayName: '$Ctd-Device,DisplayName',
            Description: '$Ctd-Device,Description',
            Icon: 'Device',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'UserAgentPattern',
            displayName: 'User agent string',
            description: 'A regular expression to match the user agent string of the browser.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.DeviceCTD = DeviceCTD;
    function DomainCTD() {
        let options = {
            DisplayName: '$Ctd-Domain,DisplayName',
            Description: '$Ctd-Domain,Description',
            Icon: 'Domain',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['User', 'Group', 'OrganizationalUnit'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'SyncGuid',
            displayName: 'SyncGuid',
            description: 'GUID of corresponding AD object.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'LastSync',
            displayName: 'LastSync',
            description: 'Date of last synchronization.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.DomainCTD = DomainCTD;
    function DomainsCTD() {
        let options = {
            DisplayName: '$Ctd-Domains,DisplayName',
            Description: '$Ctd-Domains,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Domain'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.DomainsCTD = DomainsCTD;
    function EmailCTD() {
        let options = {
            DisplayName: '$Ctd-Email,DisplayName',
            Description: '$Ctd-Email,Description',
            Icon: 'Document',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: ['File'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'From',
            displayName: 'From',
            description: 'Sender name and address.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            textType: FieldSettings_1.FieldSettings.TextType.RichText,
            name: 'Body',
            displayName: 'Body',
            description: 'Body of email.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:RichText'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'Sent',
            displayName: 'Sent',
            description: 'Date of sending.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.EmailCTD = EmailCTD;
    function OrganizationalUnitCTD() {
        let options = {
            DisplayName: '$Ctd-OrganizationalUnit,DisplayName',
            Description: '$Ctd-OrganizationalUnit,Description',
            Icon: 'OrgUnit',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['User', 'Group', 'OrganizationalUnit'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'SyncGuid',
            displayName: 'SyncGuid',
            description: 'GUID of corresponding AD object.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'LastSync',
            displayName: 'LastSync',
            description: 'Date of last synchronization.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.OrganizationalUnitCTD = OrganizationalUnitCTD;
    function PortalRootCTD() {
        let options = {
            DisplayName: '$Ctd-PortalRoot,DisplayName',
            Description: '$Ctd-PortalRoot,Description',
            Icon: 'PortalRoot',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'TrashBin', 'DocumentLibrary', 'CustomList', 'Sites', 'Domains', 'Profiles', 'Resources'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.PortalRootCTD = PortalRootCTD;
    function ProfileDomainCTD() {
        let options = {
            DisplayName: '$Ctd-ProfileDomain,DisplayName',
            Description: '$Ctd-ProfileDomain,Description',
            Icon: 'Domain',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['UserProfile'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.ProfileDomainCTD = ProfileDomainCTD;
    function ProfilesCTD() {
        let options = {
            DisplayName: '$Ctd-Profiles,DisplayName',
            Description: '$Ctd-Profiles,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['ProfileDomain'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.ProfilesCTD = ProfilesCTD;
    function RuntimeContentContainerCTD() {
        let options = {
            DisplayName: '$Ctd-RuntimeContentContainer,DisplayName',
            Description: '$Ctd-RuntimeContentContainer,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.RuntimeContentContainerCTD = RuntimeContentContainerCTD;
    function SitesCTD() {
        let options = {
            DisplayName: '$Ctd-Sites,DisplayName',
            Description: '$Ctd-Sites,Description',
            Icon: 'Site',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Site'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.SitesCTD = SitesCTD;
    function SmartFolderCTD() {
        let options = {
            DisplayName: '$Ctd-SmartFolder,DisplayName',
            Description: '$Ctd-SmartFolder,Description',
            Icon: 'SmartFolder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Query',
            displayName: 'Query',
            description: 'Please give a query here that you want to use for collecting the children of this smart folder.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:QueryBuilder'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Default', Enabled: true, Selected: false },
                { Value: '1', Text: 'Enabled', Enabled: true, Selected: false },
                { Value: '2', Text: 'Disabled', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: 'SenseNet.Search.FilterStatus',
            name: 'EnableAutofilters',
            displayName: 'Enable autofilters',
            description: 'If autofilters are enabled, system content will be filtered from the query.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '0', Text: 'Default', Enabled: true, Selected: false },
                { Value: '1', Text: 'Enabled', Enabled: true, Selected: false },
                { Value: '2', Text: 'Disabled', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: 'SenseNet.Search.FilterStatus',
            name: 'EnableLifespanFilter',
            displayName: 'Enable lifespan filter',
            description: 'If lifespan filter is enabled, only valid content will be in the result.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.SmartFolderCTD = SmartFolderCTD;
    function SystemFolderCTD() {
        let options = {
            DisplayName: '$Ctd-SystemFolder,DisplayName',
            Description: '$Ctd-SystemFolder,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.SystemFolderCTD = SystemFolderCTD;
    function ResourcesCTD() {
        let options = {
            DisplayName: '$Ctd-Resources,DisplayName',
            Description: '$Ctd-Resources,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Resource'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.ResourcesCTD = ResourcesCTD;
    function TrashBagCTD() {
        let options = {
            DisplayName: '$Ctd-TrashBag,DisplayName',
            Description: '$Ctd-TrashBag,Description',
            Icon: 'Folder',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            name: 'KeepUntil',
            displayName: 'Keep until',
            description: 'The bag must be kept until this date.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'OriginalPath',
            displayName: 'Original path',
            description: 'The path where the bag content were deleted from.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'WorkspaceRelativePath',
            displayName: 'Ctd-TrashBagen-USWorkspaceRelativePath-DisplayName',
            description: 'Ctd-TrashBagen-USWorkspaceRelativePath-Description',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'WorkspaceId',
            displayName: 'Ctd-TrashBagen-USWorkspaceId-DisplayName',
            description: 'Ctd-TrashBagen-USWorkspaceId-Description',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            name: 'DeletedContent',
            displayName: 'Deleted content',
            description: 'The actual deleted content inside this trash bag.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.TrashBagCTD = TrashBagCTD;
    function WorkspaceCTD() {
        let options = {
            DisplayName: '$Ctd-Workspace,DisplayName',
            Description: '$Ctd-Workspace,Description',
            Icon: 'Workspace',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'DocumentLibrary', 'ImageLibrary', 'MemoList', 'TaskList', 'CustomList', 'Workspace'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['User'],
            selectionRoots: ['/Root/IMS', '/Root'],
            name: 'Manager',
            displayName: 'Project manager',
            description: 'The person responsible for the project.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'Deadline',
            displayName: 'Project deadline',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsActive',
            displayName: 'Active',
            description: 'This workspace is currently active.',
            readOnly: false,
            compulsory: true,
            defaultValue: 'true',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['Skin'],
            selectionRoots: ['/Root/Skins'],
            name: 'WorkspaceSkin',
            displayName: 'Skin',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsCritical',
            displayName: 'Is critical',
            description: 'This workspace is currently in a critical status.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsWallContainer',
            displayName: 'Wall Container',
            description: 'This workspace is configured to contain a wall - this indicates that posts are created under this workspace if Content are shared anywhere below this path.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'IsFollowed',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.WorkspaceCTD = WorkspaceCTD;
    function SiteCTD() {
        let options = {
            DisplayName: '$Ctd-Site,DisplayName',
            Description: '$Ctd-Site,Description',
            Icon: 'Site',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Folder', 'Workspace', 'Profiles', 'Image', 'DocumentLibrary', 'ImageLibrary', 'MemoList', 'TaskList', 'CustomList', 'SmartFolder'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: 'en', Text: 'English', Enabled: true, Selected: true },
                { Value: 'hu', Text: 'Hungarian', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'Language',
            displayName: 'Language',
            description: 'Please define the default language of this site.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'EnableClientBasedCulture',
            displayName: 'Enable client-based culture',
            description: 'Enable this to allow user browser settings override default site language settings.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'EnableUserBasedCulture',
            displayName: 'Enable user-based culture',
            description: 'Enable this to allow user language settings override default site language settings.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'UrlList',
            displayName: 'URL list',
            description: 'Select the URLs to associate with this Site.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            selectionRoots: ['.'],
            name: 'StartPage',
            displayName: 'Alternative start page',
            description: 'If set, the site will use this start page instead of the default.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            selectionRoots: ['.'],
            name: 'LoginPage',
            displayName: 'Login page',
            description: 'The login page to display when a user tries to access restricted Content (Forms authentication only).',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['Skin'],
            selectionRoots: ['/Root/Skins'],
            name: 'SiteSkin',
            displayName: 'Skin',
            description: '',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'DenyCrossSiteAccess',
            displayName: 'Deny cross-site access',
            description: 'If set, content under this site can only be accessed via this site and not via other sites using a Root relative path.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.SiteCTD = SiteCTD;
    function TrashBinCTD() {
        let options = {
            DisplayName: '$Ctd-TrashBin,DisplayName',
            Description: '$Ctd-TrashBin,Description',
            Icon: 'trash',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['TrashBag'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            minValue: 0,
            name: 'MinRetentionTime',
            displayName: 'Minimum retention time (in days)',
            description: '',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            minValue: 0,
            name: 'SizeQuota',
            displayName: 'Size quota',
            description: 'Set the size quote for the trash bin (Megabytes).',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            minValue: 0,
            name: 'BagCapacity',
            displayName: 'Trashbag capacity',
            description: 'The maximum number of nodes accepted for trash in a single operation.',
            readOnly: false,
            compulsory: false,
            defaultValue: '100',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.TrashBinCTD = TrashBinCTD;
    function UserProfileCTD() {
        let options = {
            DisplayName: '$Ctd-UserProfile,DisplayName',
            Description: '$Ctd-UserProfile,Description',
            Icon: 'UserProfile',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['DocumentLibrary', 'MemoList', 'TaskList', 'ImageLibrary', 'CustomList'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['User'],
            selectionRoots: ['/Root/IMS'],
            name: 'User',
            displayName: 'User',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.UserProfileCTD = UserProfileCTD;
    function GroupCTD() {
        let options = {
            DisplayName: '$Ctd-Group,DisplayName',
            Description: '$Ctd-Group,Description',
            Icon: 'Group',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            allowedTypes: ['User', 'Group'],
            selectionRoots: ['/Root/IMS', '/Root'],
            name: 'Members',
            displayName: 'Members',
            description: 'The members of this group.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'SyncGuid',
            displayName: 'Sync Guid',
            description: 'GUID of corresponding AD object.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'LastSync',
            displayName: 'Last synchronization',
            description: 'Date of last synchronization.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.GroupCTD = GroupCTD;
    function ListItemCTD() {
        let options = {
            DisplayName: '$Ctd-ListItem,DisplayName',
            Description: '$Ctd-ListItem,Description',
            Icon: 'FormItem',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        return schema;
    }
    Schemas.ListItemCTD = ListItemCTD;
    function CustomListItemCTD() {
        let options = {
            DisplayName: '$Ctd-CustomListItem,DisplayName',
            Description: '$Ctd-CustomListItem,Description',
            Icon: 'FormItem',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'WorkflowsRunning',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.CustomListItemCTD = CustomListItemCTD;
    function MemoCTD() {
        let options = {
            DisplayName: '$Ctd-Memo,DisplayName',
            Description: '$Ctd-Memo,Description',
            Icon: 'Document',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'Date',
            displayName: 'Date',
            description: 'Please set the due date of the memo.',
            readOnly: false,
            compulsory: false,
            defaultValue: '[Script:jScript] DateTime.UtcNow; [/Script]',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: true,
            allowMultiple: false,
            options: [
                { Value: 'generic', Text: 'Generic', Enabled: true, Selected: true },
                { Value: 'iso', Text: 'ISO', Enabled: true, Selected: false },
                { Value: 'iaudit', Text: 'Internal audit', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'MemoType',
            displayName: 'Memo type',
            description: 'Type of the memo.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            name: 'SeeAlso',
            displayName: 'See also...',
            description: 'A list of content this memo pertains to.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.MemoCTD = MemoCTD;
    function TaskCTD() {
        let options = {
            DisplayName: '$Ctd-Task,DisplayName',
            Description: '$Ctd-Task,Description',
            Icon: 'FormItem',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'StartDate',
            displayName: 'Start date',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'DueDate',
            displayName: 'Due date',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            allowedTypes: ['User'],
            selectionRoots: ['/Root/IMS', '/Root'],
            name: 'AssignedTo',
            displayName: 'Assigned to',
            description: 'List of internal stakeholders.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '1', Text: 'Urgent', Enabled: true, Selected: false },
                { Value: '2', Text: 'Normal', Enabled: true, Selected: true },
                { Value: '3', Text: 'Not urgent', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'Priority',
            displayName: 'Priority',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: 'pending', Text: 'Pending', Enabled: true, Selected: false },
                { Value: 'active', Text: 'Active', Enabled: true, Selected: true },
                { Value: 'completed', Text: 'Completed', Enabled: true, Selected: false },
                { Value: 'deferred', Text: 'Deferred', Enabled: true, Selected: false },
                { Value: 'waiting', Text: 'Waiting', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'Status',
            displayName: 'Status',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            minValue: 0,
            maxValue: 100,
            showAsPercentage: true,
            name: 'TaskCompletion',
            displayName: 'Completion',
            description: 'Completion percentage of the task.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'RemainingDays',
            displayName: 'Remaining days',
            description: 'Number of remaining days.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DueText',
            displayName: 'DueText',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DueCssClass',
            displayName: 'Due style',
            description: 'Css class',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.TaskCTD = TaskCTD;
    function QueryCTD() {
        let options = {
            DisplayName: '$Ctd-Query,DisplayName',
            Description: '$Ctd-Query,Description',
            Icon: 'Query',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: [],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Query',
            displayName: 'Query',
            description: 'Query text.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:QueryBuilder'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: 'Public', Text: 'Public', Enabled: true, Selected: true },
                { Value: 'Private', Text: 'Private', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.RadioButtons,
            enumTypeName: '',
            name: 'QueryType',
            displayName: 'Query type',
            description: 'Public queries are stored under the workspace, private queries are stored under the user profile.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.QueryCTD = QueryCTD;
    function UserCTD() {
        let options = {
            DisplayName: '$Ctd-User,DisplayName',
            Description: '$Ctd-User,Description',
            Icon: 'User',
            AllowIndexing: true,
            AllowIncrementalNaming: false,
            AllowedChildTypes: ['Image'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            maxLength: 100,
            name: 'LoginName',
            displayName: 'Login name',
            description: 'The name that the user has to type in on login forms (in some cases along with the domain name). It has to be unique under a domain.',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'JobTitle',
            displayName: 'Job title',
            description: '',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Enabled',
            displayName: 'Enabled',
            description: 'User account is enabled.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Domain',
            displayName: 'Domain',
            description: 'The domain of the user.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            regex: '^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$',
            name: 'Email',
            displayName: 'E-mail',
            description: 'The e-mail of the user.',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            regex: '[^<]+',
            name: 'FullName',
            displayName: 'Full name',
            description: 'Full name of the user (e.g. John Smith).',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            name: 'ImageRef',
            displayName: 'Cover image (reference)',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BinaryFieldSetting({
            name: 'ImageData',
            displayName: 'Cover image (binarydata)',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NullFieldSetting({
            name: 'Avatar',
            displayName: 'Avatar',
            description: 'Avatar image of user.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0,
            controlHint: 'sn:Image'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.PasswordFieldSetting({
            reenterTitle: 'Re-enter password',
            reenterDescription: 'Re-enter password.',
            passwordHistoryLength: 0,
            name: 'Password',
            displayName: 'Password',
            description: 'User password.',
            readOnly: false,
            compulsory: true,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'SyncGuid',
            displayName: 'SyncGuid',
            description: 'GUID of corresponding AD object.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            name: 'LastSync',
            displayName: 'LastSync',
            description: 'Date of last synchronization.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.CaptchaFieldSetting({
            name: 'Captcha',
            displayName: 'Captcha text',
            description: 'Captcha text entered by the user.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: false,
            allowedTypes: ['User'],
            selectionRoots: ['/Root/IMS'],
            name: 'Manager',
            displayName: 'Manager',
            description: 'Manager of the user.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Department',
            displayName: 'Department',
            description: 'Department of employee.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Languages',
            displayName: 'Languages',
            description: 'Spoken languages.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            regex: '(^\\d*([-\\s\\+\\(\\)]\\d*)*$)?',
            name: 'Phone',
            displayName: 'Phone',
            description: 'Phone number. (e.g. +123456789 or 1234).',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '...', Text: '...', Enabled: true, Selected: false },
                { Value: 'Female', Text: 'Female', Enabled: true, Selected: false },
                { Value: 'Male', Text: 'Male', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'Gender',
            displayName: 'Gender',
            description: 'Select one.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: '...', Text: '...', Enabled: true, Selected: false },
                { Value: 'Single', Text: 'Single', Enabled: true, Selected: false },
                { Value: 'Married', Text: 'Married', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'MaritalStatus',
            displayName: 'Marital status',
            description: 'Select one.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.Date,
            name: 'BirthDate',
            displayName: 'Birth date',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            textType: FieldSettings_1.FieldSettings.TextType.LongText,
            name: 'Education',
            displayName: 'Education',
            description: 'List of educations - e.g. high school, university.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0,
            controlHint: 'sn:EducationEditor'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'TwitterAccount',
            displayName: 'Twitter account',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'FacebookURL',
            displayName: 'Facebook URL',
            description: 'http://www.facebook.com/USERNAME.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'LinkedInURL',
            displayName: 'LinkedIn URL',
            description: 'http://www.linkedin.com/USERNAME.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
            allowExtraValue: false,
            allowMultiple: false,
            options: [
                { Value: 'en', Text: 'English', Enabled: true, Selected: true },
                { Value: 'hu', Text: 'Hungarian', Enabled: true, Selected: false }
            ],
            displayChoice: FieldSettings_1.FieldSettings.DisplayChoice.DropDown,
            enumTypeName: '',
            name: 'Language',
            displayName: 'Selected language',
            description: 'Language used to display texts on the site, if it is available.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            allowMultiple: true,
            allowedTypes: ['Workspace', 'DocumentWorkspace', 'ProjectWorkspace', 'SalesWorkspace'],
            name: 'FollowedWorkspaces',
            displayName: 'Followed workspaces',
            description: 'List of workspaces followed by the user.',
            readOnly: false,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            defaultOrder: 0
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'ProfilePath',
            displayName: 'Profile path',
            description: 'Path of the user\'s personal workspace.',
            readOnly: true,
            compulsory: false,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            defaultOrder: 0
        }));
        return schema;
    }
    Schemas.UserCTD = UserCTD;
})(Schemas = exports.Schemas || (exports.Schemas = {}));
//# sourceMappingURL=Schemas.js.map