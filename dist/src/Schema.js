"use strict";
const FieldSettings_1 = require('./FieldSettings');
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
    function GenericContentCTD() {
        let options = {
            DisplayName: 'Generic Content',
            Description: 'vmi',
            Icon: 'content',
            AllowIndexing: true,
            AllowIncrementalNaming: true,
            AllowedChildTypes: ['ContentTypeName1', 'ContentTypeName2'],
            FieldSettings: []
        };
        let schema = new Schema(options);
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DisplayName',
            displayName: 'DisplayName',
            description: 'DisplayName',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Show,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Show
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Id',
            displayName: 'Id',
            description: 'Id',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'ParentId',
            displayName: 'Parent id',
            description: 'Id of the parent content',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'OwnerId',
            displayName: 'Owner id',
            description: 'Id of the owner',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ReferenceFieldSetting({
            name: 'Owner',
            displayName: 'Owner',
            description: 'Owner',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'VersionId',
            displayName: 'Version id',
            description: 'Version id',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Type',
            displayName: 'Type',
            description: 'Type',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'TypeIs',
            displayName: 'TypeIs',
            description: 'TypeIs',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Icon',
            displayName: 'Icon',
            description: 'Icon',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Name',
            displayName: 'Name',
            description: 'Name of the content',
            compulsory: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'CreatedById',
            displayName: 'Createdby id',
            description: 'Id of the creator',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'ModifiedById',
            displayName: 'Modifiedby id',
            description: 'Id of the last modifier',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Version',
            displayName: 'Version',
            description: 'Version',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'Path',
            displayName: 'Path',
            description: 'Path',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Depth',
            displayName: 'Depth',
            description: 'Depth',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'InTree',
            displayName: 'InTree',
            description: 'InTree',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'InFolder',
            displayName: 'InFolder',
            description: 'InFolder',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BooleanFieldSetting({
            name: 'IsSystemContent',
            displayName: 'System content',
            description: 'It is a system content',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BooleanFieldSetting({
            name: 'IsFolder',
            displayName: 'Folder',
            description: 'It is a folder',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            readOnly: true
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ShortTextFieldSetting({
            name: 'DisplayName',
            displayName: 'Displayname',
            description: 'Displayname'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.LongTextFieldSetting({
            name: 'Description',
            displayName: 'Description',
            description: 'Description'
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BooleanFieldSetting({
            name: 'Hidden',
            displayName: 'Hidden',
            description: 'Hidden',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.IntegerFieldSetting({
            name: 'Index',
            displayName: 'Index',
            description: 'Index',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Advanced,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Advanced
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BooleanFieldSetting({
            name: 'EnableLifespan',
            displayName: 'EnableLifespan',
            description: 'EnableLifespan',
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            name: 'ValidFrom',
            displayName: 'Valid from',
            description: 'Valid from',
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide
        }));
        schema.FieldSettings.push(new FieldSettings_1.FieldSettings.DateTimeFieldSetting({
            name: 'ValidTill',
            displayName: 'Valid till',
            description: 'Valid till',
            dateTimeMode: FieldSettings_1.FieldSettings.DateTimeMode.DateAndTime,
            visibleBrowse: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleEdit: FieldSettings_1.FieldSettings.FieldVisibility.Hide,
            visibleNew: FieldSettings_1.FieldSettings.FieldVisibility.Hide
        }));
        return schema;
    }
    Schemas.GenericContentCTD = GenericContentCTD;
})(Schemas = exports.Schemas || (exports.Schemas = {}));

//# sourceMappingURL=Schema.js.map
