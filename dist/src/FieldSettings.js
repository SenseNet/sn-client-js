"use strict";
var FieldSettings;
(function (FieldSettings) {
    (function (FieldVisibility) {
        FieldVisibility[FieldVisibility["Show"] = 0] = "Show";
        FieldVisibility[FieldVisibility["Hide"] = 1] = "Hide";
        FieldVisibility[FieldVisibility["Advanced"] = 2] = "Advanced";
    })(FieldSettings.FieldVisibility || (FieldSettings.FieldVisibility = {}));
    var FieldVisibility = FieldSettings.FieldVisibility;
    (function (OutputMethod) {
        OutputMethod[OutputMethod["Default"] = 0] = "Default";
        OutputMethod[OutputMethod["Raw"] = 1] = "Raw";
        OutputMethod[OutputMethod["Text"] = 2] = "Text";
        OutputMethod[OutputMethod["Html"] = 3] = "Html";
    })(FieldSettings.OutputMethod || (FieldSettings.OutputMethod = {}));
    var OutputMethod = FieldSettings.OutputMethod;
    (function (DisplayChoice) {
        DisplayChoice[DisplayChoice["DropDown"] = 0] = "DropDown";
        DisplayChoice[DisplayChoice["RadioButtons"] = 1] = "RadioButtons";
        DisplayChoice[DisplayChoice["CheckBoxes"] = 2] = "CheckBoxes";
    })(FieldSettings.DisplayChoice || (FieldSettings.DisplayChoice = {}));
    var DisplayChoice = FieldSettings.DisplayChoice;
    (function (DateTimeMode) {
        DateTimeMode[DateTimeMode["None"] = 0] = "None";
        DateTimeMode[DateTimeMode["Date"] = 1] = "Date";
        DateTimeMode[DateTimeMode["DateAndTime"] = 2] = "DateAndTime";
    })(FieldSettings.DateTimeMode || (FieldSettings.DateTimeMode = {}));
    var DateTimeMode = FieldSettings.DateTimeMode;
    (function (DateTimePrecision) {
        DateTimePrecision[DateTimePrecision["Millisecond"] = 0] = "Millisecond";
        DateTimePrecision[DateTimePrecision["Second"] = 1] = "Second";
        DateTimePrecision[DateTimePrecision["Minute"] = 2] = "Minute";
        DateTimePrecision[DateTimePrecision["Hour"] = 3] = "Hour";
        DateTimePrecision[DateTimePrecision["Day"] = 4] = "Day";
    })(FieldSettings.DateTimePrecision || (FieldSettings.DateTimePrecision = {}));
    var DateTimePrecision = FieldSettings.DateTimePrecision;
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
        }
    }
    FieldSettings.FieldSetting = FieldSetting;
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
    class BinaryFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.IsText = options.isText;
        }
    }
    FieldSettings.BinaryFieldSetting = BinaryFieldSetting;
    class BooleanFieldSetting extends FieldSetting {
    }
    FieldSettings.BooleanFieldSetting = BooleanFieldSetting;
    class ChoiceFieldSetting extends ShortTextFieldSetting {
        constructor(options) {
            super(options);
            this.AllowExtraValue = options.allowExtraValue;
            this.AllowMultiple = options.allowMultiple;
            this.DisplayChoice = options.displayChoice;
            this.Options = options.options;
        }
    }
    FieldSettings.ChoiceFieldSetting = ChoiceFieldSetting;
    class ColorFieldSetting extends TextFieldSetting {
        constructor(options) {
            super(options);
            this.Palette = options.palette;
        }
    }
    FieldSettings.ColorFieldSetting = ColorFieldSetting;
    class CurrencyFieldSetting extends NumberFieldSetting {
        constructor(options) {
            super(options);
            this.Format = options.format;
        }
    }
    FieldSettings.CurrencyFieldSetting = CurrencyFieldSetting;
    class DateTimeFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.DateTimeMode = options.dateTimeMode;
            this.Precision = options.precision;
        }
    }
    FieldSettings.DateTimeFieldSetting = DateTimeFieldSetting;
    class HyperLinkFieldSetting extends FieldSetting {
        constructor(options) {
            super(options);
            this.Format = options.format;
        }
    }
    FieldSettings.HyperLinkFieldSetting = HyperLinkFieldSetting;
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
    class LongTextFieldSetting extends TextFieldSetting {
        constructor(options) {
            super(options);
            this.Rows = options.rows;
            this.TextType = options.textType;
        }
    }
    FieldSettings.LongTextFieldSetting = LongTextFieldSetting;
    var TextType;
    (function (TextType) {
        TextType[TextType["LongText"] = 0] = "LongText";
        TextType[TextType["RichText"] = 1] = "RichText";
        TextType[TextType["AdvancedRichText"] = 2] = "AdvancedRichText";
    })(TextType || (TextType = {}));
    class PasswordFieldSetting extends ShortTextFieldSetting {
        constructor(options) {
            super(options);
        }
    }
    FieldSettings.PasswordFieldSetting = PasswordFieldSetting;
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
})(FieldSettings = exports.FieldSettings || (exports.FieldSettings = {}));

//# sourceMappingURL=FieldSettings.js.map
