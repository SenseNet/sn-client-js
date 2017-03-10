"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldSettings;
(function (FieldSettings) {
    var FieldVisibility;
    (function (FieldVisibility) {
        FieldVisibility[FieldVisibility["Show"] = 0] = "Show";
        FieldVisibility[FieldVisibility["Hide"] = 1] = "Hide";
        FieldVisibility[FieldVisibility["Advanced"] = 2] = "Advanced";
    })(FieldVisibility = FieldSettings.FieldVisibility || (FieldSettings.FieldVisibility = {}));
    var OutputMethod;
    (function (OutputMethod) {
        OutputMethod[OutputMethod["Default"] = 0] = "Default";
        OutputMethod[OutputMethod["Raw"] = 1] = "Raw";
        OutputMethod[OutputMethod["Text"] = 2] = "Text";
        OutputMethod[OutputMethod["Html"] = 3] = "Html";
    })(OutputMethod = FieldSettings.OutputMethod || (FieldSettings.OutputMethod = {}));
    var DisplayChoice;
    (function (DisplayChoice) {
        DisplayChoice[DisplayChoice["DropDown"] = 0] = "DropDown";
        DisplayChoice[DisplayChoice["RadioButtons"] = 1] = "RadioButtons";
        DisplayChoice[DisplayChoice["CheckBoxes"] = 2] = "CheckBoxes";
    })(DisplayChoice = FieldSettings.DisplayChoice || (FieldSettings.DisplayChoice = {}));
    var DateTimeMode;
    (function (DateTimeMode) {
        DateTimeMode[DateTimeMode["None"] = 0] = "None";
        DateTimeMode[DateTimeMode["Date"] = 1] = "Date";
        DateTimeMode[DateTimeMode["DateAndTime"] = 2] = "DateAndTime";
    })(DateTimeMode = FieldSettings.DateTimeMode || (FieldSettings.DateTimeMode = {}));
    var DateTimePrecision;
    (function (DateTimePrecision) {
        DateTimePrecision[DateTimePrecision["Millisecond"] = 0] = "Millisecond";
        DateTimePrecision[DateTimePrecision["Second"] = 1] = "Second";
        DateTimePrecision[DateTimePrecision["Minute"] = 2] = "Minute";
        DateTimePrecision[DateTimePrecision["Hour"] = 3] = "Hour";
        DateTimePrecision[DateTimePrecision["Day"] = 4] = "Day";
    })(DateTimePrecision = FieldSettings.DateTimePrecision || (FieldSettings.DateTimePrecision = {}));
    var TextType;
    (function (TextType) {
        TextType[TextType["LongText"] = 0] = "LongText";
        TextType[TextType["RichText"] = 1] = "RichText";
        TextType[TextType["AdvancedRichText"] = 2] = "AdvancedRichText";
    })(TextType = FieldSettings.TextType || (FieldSettings.TextType = {}));
    var UrlFormat;
    (function (UrlFormat) {
        UrlFormat[UrlFormat["Hyperlink"] = 0] = "Hyperlink";
        UrlFormat[UrlFormat["Picture"] = 1] = "Picture";
    })(UrlFormat = FieldSettings.UrlFormat || (FieldSettings.UrlFormat = {}));
    class FieldSetting {
        constructor(options) {
            this.Name = 'Content';
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
    FieldSettings.FieldSetting = FieldSetting;
    class IntegerFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.MinValue = options.minValue;
            this.MaxValue = options.maxValue;
            this.ShowAsPercentage = options.showAsPercentage;
            this.Step = options.step;
        }
    }
    FieldSettings.IntegerFieldSetting = IntegerFieldSetting;
    class NullFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
        }
    }
    FieldSettings.NullFieldSetting = NullFieldSetting;
    class TextFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.MinLength = options.minLength;
            this.MaxLength = options.maxLength;
        }
    }
    FieldSettings.TextFieldSetting = TextFieldSetting;
    class ShortTextFieldSetting extends TextFieldSetting {
        constructor(options) {
            super(options);
            this.Regex = options.regex;
        }
    }
    FieldSettings.ShortTextFieldSetting = ShortTextFieldSetting;
    class LongTextFieldSetting extends TextFieldSetting {
        constructor(options) {
            super(options);
            this.Rows = options.rows;
            this.TextType = options.textType;
            this.AppendModifications = options.appendModifications;
        }
    }
    FieldSettings.LongTextFieldSetting = LongTextFieldSetting;
    class BinaryFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.IsText = options.isText;
        }
    }
    FieldSettings.BinaryFieldSetting = BinaryFieldSetting;
    class ReferenceFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.AllowMultiple = options.allowMultiple;
            this.AllowedTypes = options.allowedTypes;
            this.SelectionRoots = options.selectionRoots;
            this.Query = options.query;
            this.FieldName = options.fieldName;
        }
    }
    FieldSettings.ReferenceFieldSetting = ReferenceFieldSetting;
    class DateTimeFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.DateTimeMode = options.dateTimeMode;
            this.Precision = options.precision;
        }
    }
    FieldSettings.DateTimeFieldSetting = DateTimeFieldSetting;
    class ChoiceFieldSetting extends ShortTextFieldSetting {
        constructor(options) {
            super(options);
            this.AllowExtraValue = options.allowExtraValue;
            this.AllowMultiple = options.allowMultiple;
            this.Options = options.options;
            this.DisplayChoice = options.displayChoice;
            this.EnumTypeName = options.enumTypeName;
        }
    }
    FieldSettings.ChoiceFieldSetting = ChoiceFieldSetting;
    class NumberFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.MinValue = options.minValue;
            this.MaxValue = options.maxValue;
            this.Digits = options.digits;
            this.ShowAsPercentage = options.showAsPercentage;
            this.Step = options.step;
        }
    }
    FieldSettings.NumberFieldSetting = NumberFieldSetting;
    class RatingFieldSetting extends ShortTextFieldSetting {
        constructor(options) {
            super(options);
            this.Range = options.range;
            this.Split = options.split;
        }
    }
    FieldSettings.RatingFieldSetting = RatingFieldSetting;
    class CurrencyFieldSetting extends NumberFieldSetting {
        constructor(options) {
            super(options);
            this.Format = options.format;
        }
    }
    FieldSettings.CurrencyFieldSetting = CurrencyFieldSetting;
    class ColorFieldSetting extends TextFieldSetting {
        constructor(options) {
            super(options);
            this.Palette = options.palette;
        }
    }
    FieldSettings.ColorFieldSetting = ColorFieldSetting;
    class HyperLinkFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.UrlFormat = options.urlFormat;
        }
    }
    FieldSettings.HyperLinkFieldSetting = HyperLinkFieldSetting;
    class PasswordFieldSetting extends ShortTextFieldSetting {
        constructor(options) {
            super(options);
            this.ReenterTitle = options.reenterTitle;
            this.ReenterDescription = options.reenterDescription;
            this.PasswordHistoryLength = options.passwordHistoryLength;
        }
    }
    FieldSettings.PasswordFieldSetting = PasswordFieldSetting;
    class CaptchaFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
        }
    }
    FieldSettings.CaptchaFieldSetting = CaptchaFieldSetting;
})(FieldSettings = exports.FieldSettings || (exports.FieldSettings = {}));

//# sourceMappingURL=FieldSettings.js.map
