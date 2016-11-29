import { Fields } from './Fields';


/**
 * Module for FieldSettings.
 *
 * FieldSetting object is the implementation of the configuration element in a Sense/Net Content Type Definition.
 * The FieldSetting of a Field contains properties that define the behavior of the Field - for example a Field can be configured as read only or compulsory to fill.
 * FieldSettings helps us to autogenerate type and schema TS files from Sense/Net CTDs and use these files to reach all the configuration options of the Content Types fields on
 * client-side e.g. for validation.
 *
 * This module also contains some FieldSetting related enums to use them as types in properties e.g. visibitily or datetime mode options.
 */
export module FieldSettings {

    /**
     * Enum for Field visibility values.
     */
    export enum FieldVisibility { Show, Hide, Advanced }
    /**
     * Enum for Field output method values.
     */
    export enum OutputMethod { Default, Raw, Text, Html }
    /**
     * Enum for Choice Field control values.
     */
    export enum DisplayChoice { DropDown, RadioButtons, CheckBoxes }
    /**
     * Enum for DateTime Field mode values.
     */
    export enum DateTimeMode { None, Date, DateAndTime }
    /**
     * Enum for DateTime Field precision values.
     */
    export enum DateTimePrecision { Millisecond, Second, Minute, Hour, Day }

    export class FieldSetting {
        Name: string = 'Content';
        DisplayName?: string;
        Description?: string;
        Icon?: string;
        ReadOnly?: boolean;
        Compulsory?: boolean;
        DefaultValue?: string;
        OutputMethod?: OutputMethod;
        VisibleBrowse?: FieldVisibility;
        VisibleNew?: FieldVisibility;
        VisibleEdit?: FieldVisibility;
        FieldIndex?: number;

        constructor(options: IFieldSettingOptions) {
            this.Name = options.name;
            this.DisplayName = options.displayName;
            this.Icon = options.icon;
            this.ReadOnly = options.readOnly;
            this.Compulsory = options.compulsory;
            this.DefaultValue = options.defaultValue;
            this.OutputMethod = options.outputMethod;
            this.VisibleBrowse = options.visibleBrowse;
            this.VisibleEdit = options.visibleEdit;
            this.VisibleNew = options.visibleNew;
            this.FieldIndex = options.fieldIndex;
        }
    }

    export interface IFieldSettingOptions {
        name?: string;
        displayName?: string;
        description?: string;
        icon?: string;
        readOnly?: boolean;
        compulsory?: boolean;
        defaultValue?: string;
        outputMethod?: OutputMethod;
        visibleBrowse?: FieldVisibility;
        visibleNew?: FieldVisibility;
        visibleEdit?: FieldVisibility;
        fieldIndex?: number;
    }

    export class TextFieldSetting extends FieldSetting {
        MinLength: number;
        MaxLength: number;

        constructor(options: ITextFieldSettingOptions) {
            super(options);

            this.MinLength = options.minLength;
            this.MaxLength = options.maxLength;
        }
    }

    export interface ITextFieldSettingOptions extends IFieldSettingOptions {
        minLength?: number;
        maxLength?: number;
    }

    export class ShortTextFieldSetting extends TextFieldSetting {
        Regex: string;

        constructor(options: IShortTextFieldSettingOptions) {
            super(options);

            this.Regex = options.regex;
        }
    }

    export interface IShortTextFieldSettingOptions extends ITextFieldSettingOptions {
        regex?: string;
    }

    export class NumberFieldSetting extends FieldSetting {
        MinValue: number;
        MaxValue: number;
        Digits: number;
        ShowAsPercentage: boolean;
        Step: number;

        constructor(options: INumberFieldSettingOptions) {
            super(options);
            this.MinValue = options.minValue;
            this.MaxValue = options.maxValue;
            this.Digits = options.digits;
            this.ShowAsPercentage = options.showAsPercentage;
            this.Step = options.step;
        }
    }

    export interface INumberFieldSettingOptions extends IFieldSettingOptions {
        minValue?: number;
        maxValue?: number;
        digits?: number;
        showAsPercentage?: boolean;
        step?: number;
    }

    export class BinaryFieldSetting extends FieldSetting {
        IsText: boolean;

        constructor(options: IBinaryFieldSettingOptions) {
            super(options);

            this.IsText = options.isText;
        }
    }

    export interface IBinaryFieldSettingOptions extends IFieldSettingOptions {
        isText?: boolean;
    }

    export class BooleanFieldSetting extends FieldSetting { }

    export interface IBooleanFieldSettingOptions extends IFieldSettingOptions { }

    export class ChoiceFieldSetting extends ShortTextFieldSetting {
        AllowExtraValue: boolean;
        AllowMultiple: boolean;
        DisplayChoice: DisplayChoice;
        Options: Fields.ChoiceOption[];

        constructor(options: IChoiceFieldSettingOptions) {
            super(options);
            this.AllowExtraValue = options.allowExtraValue;
            this.AllowMultiple = options.allowMultiple;
            this.DisplayChoice = options.displayChoice;
            this.Options = options.options;
        }
    }
    
    export interface IChoiceFieldSettingOptions extends IShortTextFieldSettingOptions {
        allowExtraValue?: boolean;
        allowMultiple?: boolean;
        displayChoice?: DisplayChoice;
        options: Fields.ChoiceOption[];
    }

    export class ColorFieldSetting extends TextFieldSetting {
        Palette: string;

        constructor(options: IColorFieldSettingOption) {
            super(options);
            this.Palette = options.palette;
        }
    }

    interface IColorFieldSettingOption extends ITextFieldSettingOptions {
        palette?: string;
    }

    export class CurrencyFieldSetting extends NumberFieldSetting {
        Format: string;

        constructor(options: ICurrencyFieldSettingOptions) {
            super(options);

            this.Format = options.format;
        }
    }

    interface ICurrencyFieldSettingOptions extends INumberFieldSettingOptions {
        format?: string;
    }

    export class DateTimeFieldSetting extends FieldSetting {
        DateTimeMode: DateTimeMode;
        Precision: DateTimePrecision;

        constructor(options: IDateTimeFieldSettingOptions) {
            super(options);
            this.DateTimeMode = options.dateTimeMode;
            this.Precision = options.precision;
        }
    }

    interface IDateTimeFieldSettingOptions extends IFieldSettingOptions {
        dateTimeMode?: DateTimeMode;
        precision?: DateTimePrecision;
    }

    export class HyperLinkFieldSetting extends FieldSetting {
        Format: string;

        constructor(options: IHyperLinkFieldSettingOptions) {
            super(options);
            this.Format = options.format;
        }
    }

    interface IHyperLinkFieldSettingOptions extends IFieldSettingOptions {
        format?: string;
    }

    export class IntegerFieldSetting extends FieldSetting {
        MinValue: number;
        MaxValue: number;
        ShowAsPercentage: boolean;
        Step: number;

        constructor(options: IIntegerFieldSettingOptions) {
            super(options);
            this.MinValue = options.minValue;
            this.MaxValue = options.maxValue;
            this.ShowAsPercentage = options.showAsPercentage;
            this.Step = options.step;
        }
    }

    export interface IIntegerFieldSettingOptions extends IFieldSettingOptions {
        minValue?: number;
        maxValue?: number;
        showAsPercentage?: boolean;
        step?: number;
    }

    export class LongTextFieldSetting extends TextFieldSetting {
        Rows: number;
        TextType: TextType;

        constructor(options: ILongtTextFieldSettingOptions) {
            super(options);

            this.Rows = options.rows;
            this.TextType = options.textType;
        }
    }

    interface ILongtTextFieldSettingOptions extends ITextFieldSettingOptions {
        rows?: number;
        textType?: TextType;
    }

    enum TextType {
        LongText, RichText, AdvancedRichText
    }

    export class PasswordFieldSetting extends ShortTextFieldSetting {
        constructor(options: IPasswordFieldSettingOptions) {
            super(options);
        }
    }

    interface IPasswordFieldSettingOptions extends IShortTextFieldSettingOptions { }

    export class ReferenceFieldSetting extends FieldSetting {
        AllowMultiple: boolean;
        AllowedTypes: string[];
        SelectionRoots: string[];
        Query: string;
        FieldName: string;

        constructor(options: IReferenceFieldSettingOptions) {
            super(options);
            this.AllowMultiple = options.allowMultiple;
            this.AllowedTypes = options.allowedTypes;
            this.SelectionRoots = options.selectionRoots;
            this.Query = options.query;
            this.FieldName = options.fieldName;
        }
    }

    interface IReferenceFieldSettingOptions extends IFieldSettingOptions {
        allowMultiple?: boolean;
        allowedTypes?: string[];
        selectionRoots?: string[];
        query?: string;
        fieldName?: string;
    }
}