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
    /**
     * Enum for LongText field editor values.
     */
    export enum TextType { LongText, RichText, AdvancedRichText }
    /**
     * Enum for HyperLink field href values.
     */
    export enum UrlFormat { Hyperlink, Picture }

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
        DefaultOrder?: number;
        ControlHint?: string;

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
            this.DefaultOrder = options.defaultOrder;
            this.ControlHint = options.controlHint;

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
        defaultOrder?: number;
        controlHint?: string;
    }


    // Used in ContentType, GenericContent, File, Image, ViewBase, ExpenseClaim, TrashBag, TrashBin, CalendarEvent, EventRegistrationFormItem, ForumEntry, Post, Task, ExpenseClaimWorkflowTask, DocumentPreviewWorkflow, ExpenseClaimWorkflow
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

    // Used in ContentType, GenericContent, Settings, IndexingSettings, ViewBase, ListView, WorkflowDefinition, ContentList, Survey, Voting, SurveyList, Skin, Workspace, Blog, SalesWorkspace, Site, BlogPost, CalendarEvent, ConfirmationItem, CustomListItem, ExpenseClaimItem, Portlet, Article, PublicRegistrationConfig, Subscription, User, RegisteredUser, Workflow, ApprovalWorkflow
    export class NullFieldSetting extends FieldSetting {

        constructor(options: INullFieldSettingOptions) {
            super(options);
        }
    }

    export interface INullFieldSettingOptions extends IFieldSettingOptions {
    }

    // 
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

    // Used in ContentType, GenericContent, File, Contract, OrderForm, ListView, ADFolder, ContentList, Form, Survey, SurveyList, Device, Domain, Email, OrganizationalUnit, TrashBag, Group, CalendarEvent, Car, EventRegistrationFormItem, Link, Portlet, SliderItem, Task, ApprovalWorkflowTask, Article, WebContentDemo, NotificationConfig, PublicRegistrationConfig, Subscription, Tag, User, RegisteredUser, UserSearch, Workflow, ApprovalWorkflow, DocumentPreviewWorkflow, ExpenseClaimWorkflow, ForgottenPasswordWorkflow, RegistrationWorkflow
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

    // Used in ContentType, GenericContent, File, Contract, HtmlTemplate, Image, OrderForm, ViewBase, ListView, Video, ContentList, Aspect, Form, SurveyList, Email, KPIDatasource, SmartFolder, SalesWorkspace, BlogPost, CalendarEvent, Post, SliderItem, SurveyItem, ExpenseClaimWorkflowTask, Article, HTMLContent, WebContentDemo, NotificationConfig, PublicRegistrationConfig, Query, Tag, User, WikiArticle, Workflow
    export class LongTextFieldSetting extends TextFieldSetting {
        Rows: number;
        TextType: TextType;
        AppendModifications: boolean;

        constructor(options: ILongTextFieldSettingOptions) {
            super(options);
            this.Rows = options.rows;
            this.TextType = options.textType;
            this.AppendModifications = options.appendModifications;
        }
    }

    export interface ILongTextFieldSettingOptions extends ITextFieldSettingOptions {
        rows?: number;
        textType?: TextType;
        appendModifications?: boolean;
    }

    // Used in ContentType, File, ExpenseClaimItem, Portlet, Article, User
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

    // Used in ContentType, GenericContent, ContentLink, Contract, PageTemplate, ViewBase, ContentList, EventList, Survey, Voting, SurveyList, ImageLibrary, TrashBag, Workspace, Site, UserProfile, Group, CalendarEvent, ExpenseClaimItem, ForumEntry, Memo, Portlet, Post, SliderItem, SurveyItem, Task, ApprovalWorkflowTask, ExpenseClaimWorkflowTask, Article, WebContentDemo, PublicRegistrationConfig, User, Workflow, ApprovalWorkflow, ExpenseClaimWorkflow
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

    export interface IReferenceFieldSettingOptions extends IFieldSettingOptions {
        allowMultiple?: boolean;
        allowedTypes?: string[];
        selectionRoots?: string[];
        query?: string;
        fieldName?: string;
    }

    // Used in ContentType, GenericContent, Image, ADFolder, Domain, Email, OrganizationalUnit, TrashBag, Workspace, SalesWorkspace, Group, BlogPost, CalendarEvent, Car, ExpenseClaimItem, Memo, SurveyItem, Task, WebContent, User
    export class DateTimeFieldSetting extends FieldSetting {
        DateTimeMode: DateTimeMode;
        Precision: DateTimePrecision;

        constructor(options: IDateTimeFieldSettingOptions) {
            super(options);
            this.DateTimeMode = options.dateTimeMode;
            this.Precision = options.precision;
        }
    }

    export interface IDateTimeFieldSettingOptions extends IFieldSettingOptions {
        dateTimeMode?: DateTimeMode;
        precision?: DateTimePrecision;
    }

    // Used in GenericContent, Contract, ViewBase, WorkflowDefinition, ContentList, SmartFolder, ContentRotator, Site, CalendarEvent, Car, Memo, SliderItem, Task, ApprovalWorkflowTask, WebContentDemo, Query, Subscription, User, Workflow, RegistrationWorkflow
    export class ChoiceFieldSetting extends ShortTextFieldSetting {
        AllowExtraValue: boolean;
        AllowMultiple: boolean;
        Options: Fields.ChoiceOption[];
        DisplayChoice: DisplayChoice;
        EnumTypeName: string;

        constructor(options: IChoiceFieldSettingOptions) {
            super(options);
            this.AllowExtraValue = options.allowExtraValue;
            this.AllowMultiple = options.allowMultiple;
            this.Options = options.options;
            this.DisplayChoice = options.displayChoice;
            this.EnumTypeName = options.enumTypeName;
        }
    }

    export interface IChoiceFieldSettingOptions extends IShortTextFieldSettingOptions {
        allowExtraValue?: boolean;
        allowMultiple?: boolean;
        options?: Fields.ChoiceOption[];
        displayChoice?: DisplayChoice;
        enumTypeName?: string;
    }

    // Used in GenericContent, File, Resource, ProjectWorkspace, SalesWorkspace, Car, Subscription
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

    // Used in GenericContent
    export class RatingFieldSetting extends ShortTextFieldSetting {
        Range: number;
        Split: number;

        constructor(options: IRatingFieldSettingOptions) {
            super(options);
            this.Range = options.range;
            this.Split = options.split;
        }
    }

    export interface IRatingFieldSettingOptions extends IShortTextFieldSettingOptions {
        range?: number;
        split?: number;
    }

    // Used in SalesWorkspace, ExpenseClaimItem
    export class CurrencyFieldSetting extends NumberFieldSetting {
        Format: string;

        constructor(options: ICurrencyFieldSettingOptions) {
            super(options);
            this.Format = options.format;
        }
    }

    export interface ICurrencyFieldSettingOptions extends INumberFieldSettingOptions {
        format?: string;
    }

    // Used in Car
    export class ColorFieldSetting extends TextFieldSetting {
        Palette: string;

        constructor(options: IColorFieldSettingOptions) {
            super(options);
            this.Palette = options.palette;
        }
    }

    export interface IColorFieldSettingOptions extends ITextFieldSettingOptions {
        palette?: string;
    }

    // Used in SliderItem, WebContentDemo
    export class HyperLinkFieldSetting extends FieldSetting {
        UrlFormat: UrlFormat;

        constructor(options: IHyperLinkFieldSettingOptions) {
            super(options);
            this.UrlFormat = options.urlFormat;
        }
    }

    export interface IHyperLinkFieldSettingOptions extends IFieldSettingOptions {
        urlFormat?: UrlFormat;
    }

    // Used in User
    export class PasswordFieldSetting extends ShortTextFieldSetting {
        ReenterTitle: string;
        ReenterDescription: string;
        PasswordHistoryLength: number;

        constructor(options: IPasswordFieldSettingOptions) {
            super(options);
            this.ReenterTitle = options.reenterTitle;
            this.ReenterDescription = options.reenterDescription;
            this.PasswordHistoryLength = options.passwordHistoryLength;
        }
    }

    export interface IPasswordFieldSettingOptions extends IShortTextFieldSettingOptions {
        reenterTitle?: string;
        reenterDescription?: string;
        passwordHistoryLength?: number;
    }

    // Used in User
    export class CaptchaFieldSetting extends FieldSetting {

        constructor(options: ICaptchaFieldSettingOptions) {
            super(options);
        }
    }

    export interface ICaptchaFieldSettingOptions extends IFieldSettingOptions {
    }
}
