/**
 * 
 * @module ControlMapper
 * 
 * @preferred
 * 
 * @description Module for mapping controls content types and / or field settings to specified front-end controls
 *
 * ```
 * let controlMapper = new ControlMapper(MyBaseControlClass, myConfigFactory, DefaultViewComponent, DefaultFieldComponent)
 *       .SetupFieldSettingDefault(FieldSettings.ShortTextFieldSetting, (setting) => {
 *          switch (setting.Name) {
 *              case 'Name':
 *                  return NameField;
 *              case 'DisplayName':
 *                  return DisplayName;
 *              default:
 *                  break;
 *          }
 *          return ShortText;
 *       })
 * 
 * ```
 */ /** */

import { Content } from './Content';
import * as FieldSettings from './FieldSettings';
import { Schemas } from './SN';

export type ActionName = 'new' | 'edit' | 'view';

export class ControlSchema<TControlBaseType, TClientControlSettings> {
    ContentTypeControl: {new(...args: any[]): TControlBaseType};
    Schema: Schemas.Schema<Content>;
    FieldMappings: {FieldSettings: FieldSettings.FieldSetting, ControlType: {new(...args: any[]): TControlBaseType}, ClientSettings: TClientControlSettings}[];
}

export class ControlMapper<TControlBaseType, TClientControlSettings> {

    constructor(
        public readonly controlBaseType: { new (...args: any[]): TControlBaseType },
        private readonly clientControlSettingsFactory: (fieldSetting: FieldSettings.FieldSetting) => TClientControlSettings,
        private readonly defaultControlType?: { new (...args: any[]): TControlBaseType },
        private readonly defaultFieldSettingControlType?: { new (...args: any[]): TControlBaseType },
    ) {
    }

    /**
     * Method for getting a specified Schema object for a content type. The FieldSettings will be filtered based on the provided actionName.
     * @param contentType The type of the content (e.g. ContentTypes.Task)
     * @param actionName The name of the action. Can be 'new' / 'view' / 'edit'
     */
    private GetTypeSchema<TContentType extends Content>(contentType: { new (args: any[]): TContentType }, actionName: ActionName): Schemas.Schema<TContentType> {
        const schema = new Schemas.Schema<TContentType>(Content.GetSchema(contentType));

        if (actionName) {
            schema.FieldSettings = schema.FieldSettings.filter(s => {
                switch (actionName) {
                    case 'new':
                        return s.VisibleNew === FieldSettings.FieldVisibility.Show;
                    case 'edit':
                        return s.VisibleEdit === FieldSettings.FieldVisibility.Show;
                    case 'view':
                        return s.VisibleBrowse === FieldSettings.FieldVisibility.Show;
                }
            })
        }
        return schema;
    }

    private contentTypeControlMaps: { new (...args: any[]): TControlBaseType }[] = [];

    /**
     * Maps a specified Control to a Content type
     * @param content The Content to be mapped
     * @param control The Control for the content
     * @returns {ControlMapper}
     */
    public MapContentTypeToControl(contentType: { new (...args: any[]): Content }, control: { new (...args: any[]): TControlBaseType }) {
        this.contentTypeControlMaps[contentType.name as any] = control;
        return this;
    }

    /**
     *
     * @param content The content to get the control for.
     * @returns {TControlBaseType} The mapped control, Default if nothing is mapped.
     */
    public GetControlForContentType<TContentType extends Content>(contentType: { new (...args: any[]): TContentType }) {
        return this.contentTypeControlMaps[contentType.name as any] || this.defaultControlType;
    }


    private fieldSettingDefaults: ((fieldSetting: FieldSettings.FieldSetting) => { new (...args: any[]): TControlBaseType })[] = [];


    /**
     * 
     * @param fieldSetting The FieldSetting to get the control for.
     * @param setupControl Callback method that returns a Control Type based on the provided FieldSetting
     * @returns the Mapper instance (can be used fluently)
     */
    public SetupFieldSettingDefault<TFieldSettingType extends FieldSettings.FieldSetting>(
        fieldSetting: { new (...args: any[]): TFieldSettingType },
        setupControl: (fieldSetting: TFieldSettingType) => { new (...args: any[]): TControlBaseType }
    ) {
        this.fieldSettingDefaults[fieldSetting.name as any] = setupControl;
        return this;
    }

    /**
     * @returns {TControlBaseType} The specified FieldSetting control
     * @param fieldSetting The FieldSetting to get the control class.
     */
    public GetControlForFieldSetting<TFieldSettingType extends FieldSettings.FieldSetting>(fieldSetting: TFieldSettingType): { new (...args: any[]): TControlBaseType } {
        const fieldSettingSetup = this.fieldSettingDefaults[fieldSetting.constructor.name as any];
        return fieldSettingSetup && fieldSettingSetup(fieldSetting) || this.defaultFieldSettingControlType;
    }

    private contentTypeBoundfieldSettings: ((fieldSetting: FieldSettings.FieldSetting) => { new (...args: any[]): TControlBaseType })[] = [];

    /**
     * 
     * @param contentType The Content Type 
     * @param fieldName The name of the field on the Content Type
     * @param setupControl The callback function that will setup the Control
     * @param fieldSetting Optional type hint for the FieldSetting
     */

    public SetupFieldSettingForControl<TFieldSettingType extends FieldSettings.FieldSetting, TContentType extends Content, TField extends keyof TContentType>(
        contentType: { new (...args: any[]): TContentType },
        fieldName: TField,
        setupControl: (fieldSetting: TFieldSettingType) => { new (...args: any[]): TControlBaseType },
        fieldSetting?: { new (...args: any[]): TFieldSettingType },

    ) {
        this.contentTypeBoundfieldSettings[`${contentType.name}-${fieldName}` as any] = setupControl;
        return this;
    }


    /**
     * 
     * @param contentType The type of the content (e.g. ContentTypes.Task)
     * @param fieldName The name of the field (must be one of the ContentType's fields), e.g. 'DisplayName'
     * @param actionName The name of the Action (can be 'new' / 'edit' / 'view')
     * @returns The assigned Control constructor or the default Field control
     */
    public GetControlForContentField<TContentType extends Content, TField extends keyof TContentType>(
        contentType: { new (...args: any[]): TContentType },
        fieldName: TField,
        actionName: ActionName
    ): {new(...args: any[]): TControlBaseType} {

        const fieldSetting = this.GetTypeSchema(contentType, actionName).FieldSettings.filter(s => s.Name === fieldName)[0];

        if (this.contentTypeBoundfieldSettings[`${contentType.name}-${fieldName}` as any]) {
            return this.contentTypeBoundfieldSettings[`${contentType.name}-${fieldName}` as any](fieldSetting);
        }
        else {
            return this.GetControlForFieldSetting(fieldSetting);
        }
    }

    private fieldSettingBoundClientSettingFactories: ((setting: FieldSettings.FieldSetting) => TClientControlSettings)[] = []
    
    /**
     * Sets up a Factory method to create library-specific settings from FieldSettings per type
     * @param fieldSettingType The type of the FieldSetting (e.g. FieldSettings.ShortTextFieldSetting)
     * @param factoryMethod The factory method that constructs or transforms the Settings object
     */
    public SetClientControlFactory<TFieldSetting extends FieldSettings.FieldSetting>(fieldSettingType: {new(...args: any[]): TFieldSetting}, factoryMethod: (setting: TFieldSetting) => TClientControlSettings){
        this.fieldSettingBoundClientSettingFactories[fieldSettingType.name as any] = factoryMethod;
        return this;
    }

    /**
     * Creates a ClientSetting from a specified FieldSetting based on the assigned Factory method
     * @param fieldSetting The FieldSetting object that should be used for creating the new Setting entry
     * @returns the created or transformed Client Setting
     */
    public CreateClientSetting<TFieldSetting extends FieldSettings.FieldSetting>(fieldSetting: TFieldSetting){
        const factoryMethod = this.fieldSettingBoundClientSettingFactories[fieldSetting.constructor.name as any] || this.clientControlSettingsFactory;
        return factoryMethod(fieldSetting);
    }

    /**
     * Gets the full ControlSchema object for a specific ContentType
     * @param contentType The type of the Content (e.g. ContentTypes.Task)
     * @param actionName The name of the Action (can be 'new' / 'edit' / 'view')
     * @returns the fully created ControlSchema
     */
    public GetFullSchemaForContentType<TContentType extends Content, K extends keyof TContentType>(
        contentType: { new (...args: any[]): TContentType },
        actionName: ActionName): 
        ControlSchema<TControlBaseType, TClientControlSettings> {
        const schema = this.GetTypeSchema(contentType, actionName);
        const mappings = schema.FieldSettings.map(f => {
            const clientSetting: TClientControlSettings = this.CreateClientSetting(f);
            const control: {new(...args: any[]): TControlBaseType} = this.GetControlForContentField<TContentType, K>(contentType, f.Name as K, actionName);
            return {
                FieldSettings: f,
                ClientSettings: clientSetting,
                ControlType: control
            };
        });
        return {
            Schema: schema,
            ContentTypeControl: this.GetControlForContentType(contentType),
            FieldMappings: mappings
        }
    }

    /**
     * Gets the full ControlSchema object for a specific Content
     * @param contentType The type of the Content (e.g. ContentTypes.Task)
     * @param actionName The name of the Action (can be 'new' / 'edit' / 'view')
     * @returns the fully created ControlSchema
     */    
    public GetFullSchemaForContent<TContentType extends Content>(content: TContentType, actionName: ActionName){
        return this.GetFullSchemaForContentType(content.constructor as {new(...args: any[])}, actionName);
    }
}