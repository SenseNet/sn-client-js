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

export type ComponentMapping<TComponentType extends { Settings: any }> = TComponentType | [FieldSettings.FieldSetting, TComponentType, TComponentType['Settings']]

export type ActionName = 'new' | 'edit' | 'view';

export class ControlMapper<TComponentBaseType, TClientControlSettings> {

    constructor(
        private readonly componentBaseType: { new (...args: any[]): TComponentBaseType },
        private readonly defaultComponentType: { new (...args: any[]): TComponentBaseType },
        private readonly clientControlSettingsType: { new (): TClientControlSettings }
    ) {
    }

    private GetTypeSchema<TContentType extends Content>(contentType: { new (args: any[]): TContentType }, actionName?: ActionName): Schemas.Schema {
        const schema = (Schemas as any)[`${contentType.name}CTD` as any]() as Schemas.Schema;
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

    private componentMaps: TComponentBaseType[] = [];

    /**
     * Maps a specified Component to a Content type
     * @param content The Content to be mapped
     * @param component The Component for the content
     * @returns {ControlMapper}
     */
    public MapToComponent(content: { new (...args: any[]): Content }, component: { new (...args: any[]): TComponentBaseType }) {
        this.componentMaps[content.name] = component;
        return this;
    }

    /**
     *
     * @param content The content to get the control for.
     * @returns {TComponentBaseType} The mapped component, Default if nothing is mapped.
     */
    public GetComponentForContentType<TContentType extends Content>(content: { new (...args: any[]): TContentType }) {
        return this.componentMaps[content.name] || this.defaultComponentType;
    }


    private fieldSettingDefaults: ((fieldSetting: FieldSettings.FieldSetting & TClientControlSettings) => { new (...args: any[]) })[] = [];


    /**
     * 
     * @param fieldSetting 
     * @param setupControl Callback method that returns a Component Type based on the provided FieldSetting
     */
    public SetupFieldSettingDefault<TFieldSettingType extends FieldSettings.FieldSetting>(
        fieldSetting: { new (...args: any[]): TFieldSettingType },
        setupControl: (fieldSetting: TFieldSettingType & TClientControlSettings) => { new (...args: any[]): TComponentBaseType }
    ) {
        this.fieldSettingDefaults[fieldSetting.name] = setupControl;
        return this;
    }

    public GetDefaultControlForFieldSetting<TFieldSettingType extends FieldSettings.FieldSetting>(fieldSetting: { new (...args: any[]): TFieldSettingType}): TComponentBaseType {
        return this.fieldSettingDefaults[fieldSetting.name];
    }

    public OverrideContentTypeFieldComponent<TComponentType extends TComponentBaseType & { Settings: any }>(content: Content, settingMaps: [FieldSettings.FieldSetting, TComponentBaseType, TComponentType['Settings']]) {
        return this;
    }

    public ProvideClientControlSetting(providerMethod: (content: Content, fieldSetting: FieldSettings.FieldSetting) => TClientControlSettings) {

    }

    public GetFieldSettingsForContentTye<TContentType extends Content>(content: { new (...args: any[]): TContentType }, actionName?: ActionName) {
        this.GetTypeSchema(content, actionName);
    }
}

/** example mocks */
class MyClientSettings {
    AureliaStuff: string;
}

class MyComponentBase {
    componentBaseValue: boolean;
}


class MyDefaultComponent extends MyComponentBase {

}

class MyFieldComponent extends MyComponentBase {
    Settings: { fieldVal: string, fieldReadOnly: boolean };
}

class MyTaskComponent extends MyComponentBase {
    Settings: { alma: number, körte: number };
}

const mapper = new ControlMapper(MyComponentBase, MyDefaultComponent, MyClientSettings);  // e.g. React.Control, ContentViewComponent(?)

mapper.MapToComponent(ContentTypes.Task, MyTaskComponent);
mapper.GetComponentForContentType(ContentTypes.Task);  // => get mapped component


mapper.SetupFieldSettingDefault(FieldSettings.ChoiceFieldSetting, (setting) => {
    if (setting.AureliaStuff) {
        // hümm?
    }
    if (setting.ControlHint) {
        // bleh
        console.log(setting.ControlHint);
    }
    return MyFieldComponent;
}).SetupFieldSettingDefault(FieldSettings.ReferenceFieldSetting, (setting) => {
    return MyFieldComponent;
})
mapper.GetFieldSettingsForContentTye(ContentTypes.Task, 'view');