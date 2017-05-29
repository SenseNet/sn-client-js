/**
 * 
 * @module ControlMapper
 * 
 * @preferred
 * 
 * @description Module for mapping controls content types and / or field settings to specified front-end controls
 *
 * ```
 * // ToDo-Usage example
 * 
 * ```
 */ /** */

import { Content } from './Content';
import * as FieldSettings from './FieldSettings';
import { ContentTypes, Schemas } from './SN';

export type ActionName = 'new' | 'edit' | 'view';

export class ControlMapper<TControlBaseType, TClientControlSettings> {

    constructor(
        private readonly controlBaseType: { new (...args: any[]): TControlBaseType },
        private readonly clientControlSettingsFactory: (fieldSetting: FieldSettings.FieldSetting) => TClientControlSettings,
        private readonly defaultControlType?: { new (...args: any[]): TControlBaseType },
        private readonly defaultFieldSettingControlType?: { new (...args: any[]): TControlBaseType },
    ) {
    }

    private GetTypeSchema<TContentType extends Content>(contentType: { new (args: any[]): TContentType }, actionName?: ActionName): Schemas.Schema {
        const schema = (Schemas as any)[`${contentType.name}CTD` as any]() as Schemas.Schema;

        let currentType = Object.getPrototypeOf(contentType);
        while (currentType.name !== 'Content') {
            const parentSchema = (Schemas as any)[`${currentType.name}CTD` as any]();
            schema.FieldSettings = schema.FieldSettings.concat(parentSchema.FieldSettings);
            currentType = Object.getPrototypeOf(currentType);
        }

        if (actionName) {
            schema.FieldSettings = schema.FieldSettings.filter(s => {
                switch (actionName) {
                    case 'new':
                        return s.VisibleNew;
                    case 'edit':
                        return s.VisibleEdit;
                    case 'view':
                        return s.VisibleBrowse;
                    default:
                        return true;
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
        contentType: { new (...args: any[]): Content },
        fieldName: TField,
        setupControl: (fieldSetting: TFieldSettingType) => { new (...args: any[]): TControlBaseType },
        fieldSetting?: { new (...args: any[]): TFieldSettingType },

    ) {
        this.contentTypeBoundfieldSettings[`${contentType.name}-${fieldName}` as any] = setupControl;
        return this;
    }


    public GetControlForContentField<TContentType extends Content, TField extends keyof TContentType>(
        contentType: { new (...args: any[]): TContentType },
        fieldName: TField
    ): {new(...args: any[]): TControlBaseType} {

        const fieldSetting = this.GetTypeSchema(contentType).FieldSettings.find(s => s.Name === fieldName);
        if (fieldSetting == null) {
            if (this.defaultFieldSettingControlType == null){
                throw Error(`No Default field control specified and control not found for ${contentType.name} - ${fieldName} `);
            }
            return this.defaultFieldSettingControlType;
        }


        if (this.contentTypeBoundfieldSettings[`${contentType.name}-${fieldName}` as any]) {
            return this.contentTypeBoundfieldSettings[`${contentType.name}-${fieldName}` as any](fieldSetting);
        }
        else {
            return this.GetControlForFieldSetting(fieldSetting);
        }
    }

    private fieldSettingBoundClientSettingFactories: ((setting: FieldSettings.FieldSetting) => TClientControlSettings)[] = []
    public SetClientControlFactory<TFieldSetting extends FieldSettings.FieldSetting>(fieldSettingType: {new(...args: any[]): TFieldSetting}, factoryMethod: (setting: TFieldSetting) => TClientControlSettings){
        this.fieldSettingBoundClientSettingFactories[fieldSettingType.name] = factoryMethod;
    }

    public CreateClientSetting<TFieldSetting extends FieldSettings.FieldSetting>(fieldSetting: TFieldSetting){
        const factoryMethod = this.fieldSettingBoundClientSettingFactories[fieldSetting.constructor.name] || this.clientControlSettingsFactory;
        return factoryMethod(fieldSetting);
    }

    public GetAllMappingsForContentTye<TContentType extends Content, K extends keyof TContentType>(contentType: { new (...args: any[]): TContentType }, actionName?: ActionName): {control: {new(...args: any[]): TControlBaseType}, settings: TClientControlSettings}[] {
        const fieldSettings = this.GetTypeSchema(contentType, actionName).FieldSettings;
        return fieldSettings.map(f => {
            const clientSetting = this.CreateClientSetting(f);
            const control = this.GetControlForContentField<TContentType, K>(contentType, f.Name as K);
            return {
                settings: clientSetting,
                control: control
            };
        });

    }
}