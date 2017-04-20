"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldVisibility;
(function (FieldVisibility) {
    FieldVisibility[FieldVisibility["Show"] = 0] = "Show";
    FieldVisibility[FieldVisibility["Hide"] = 1] = "Hide";
    FieldVisibility[FieldVisibility["Advanced"] = 2] = "Advanced";
})(FieldVisibility = exports.FieldVisibility || (exports.FieldVisibility = {}));
var OutputMethod;
(function (OutputMethod) {
    OutputMethod[OutputMethod["Default"] = 0] = "Default";
    OutputMethod[OutputMethod["Raw"] = 1] = "Raw";
    OutputMethod[OutputMethod["Text"] = 2] = "Text";
    OutputMethod[OutputMethod["Html"] = 3] = "Html";
})(OutputMethod = exports.OutputMethod || (exports.OutputMethod = {}));
var DisplayChoice;
(function (DisplayChoice) {
    DisplayChoice[DisplayChoice["DropDown"] = 0] = "DropDown";
    DisplayChoice[DisplayChoice["RadioButtons"] = 1] = "RadioButtons";
    DisplayChoice[DisplayChoice["CheckBoxes"] = 2] = "CheckBoxes";
})(DisplayChoice = exports.DisplayChoice || (exports.DisplayChoice = {}));
var DateTimeMode;
(function (DateTimeMode) {
    DateTimeMode[DateTimeMode["None"] = 0] = "None";
    DateTimeMode[DateTimeMode["Date"] = 1] = "Date";
    DateTimeMode[DateTimeMode["DateAndTime"] = 2] = "DateAndTime";
})(DateTimeMode = exports.DateTimeMode || (exports.DateTimeMode = {}));
var DateTimePrecision;
(function (DateTimePrecision) {
    DateTimePrecision[DateTimePrecision["Millisecond"] = 0] = "Millisecond";
    DateTimePrecision[DateTimePrecision["Second"] = 1] = "Second";
    DateTimePrecision[DateTimePrecision["Minute"] = 2] = "Minute";
    DateTimePrecision[DateTimePrecision["Hour"] = 3] = "Hour";
    DateTimePrecision[DateTimePrecision["Day"] = 4] = "Day";
})(DateTimePrecision = exports.DateTimePrecision || (exports.DateTimePrecision = {}));
var TextType;
(function (TextType) {
    TextType[TextType["LongText"] = 0] = "LongText";
    TextType[TextType["RichText"] = 1] = "RichText";
    TextType[TextType["AdvancedRichText"] = 2] = "AdvancedRichText";
})(TextType = exports.TextType || (exports.TextType = {}));
var UrlFormat;
(function (UrlFormat) {
    UrlFormat[UrlFormat["Hyperlink"] = 0] = "Hyperlink";
    UrlFormat[UrlFormat["Picture"] = 1] = "Picture";
})(UrlFormat = exports.UrlFormat || (exports.UrlFormat = {}));
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
exports.FieldSetting = FieldSetting;
class IntegerFieldSetting extends FieldSetting {
    constructor(options) {
        super(options);
        this.MinValue = options.minValue;
        this.MaxValue = options.maxValue;
        this.ShowAsPercentage = options.showAsPercentage;
        this.Step = options.step;
    }
}
exports.IntegerFieldSetting = IntegerFieldSetting;
class TextFieldSetting extends FieldSetting {
    constructor(options) {
        super(options);
        this.MinLength = options.minLength;
        this.MaxLength = options.maxLength;
    }
}
exports.TextFieldSetting = TextFieldSetting;
class ShortTextFieldSetting extends TextFieldSetting {
    constructor(options) {
        super(options);
        this.Regex = options.regex;
    }
}
exports.ShortTextFieldSetting = ShortTextFieldSetting;
class NullFieldSetting extends FieldSetting {
    constructor(options) {
        super(options);
    }
}
exports.NullFieldSetting = NullFieldSetting;
class LongTextFieldSetting extends TextFieldSetting {
    constructor(options) {
        super(options);
        this.Rows = options.rows;
        this.TextType = options.textType;
        this.AppendModifications = options.appendModifications;
    }
}
exports.LongTextFieldSetting = LongTextFieldSetting;
class BinaryFieldSetting extends FieldSetting {
    constructor(options) {
        super(options);
        this.IsText = options.isText;
    }
}
exports.BinaryFieldSetting = BinaryFieldSetting;
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
exports.ReferenceFieldSetting = ReferenceFieldSetting;
class DateTimeFieldSetting extends FieldSetting {
    constructor(options) {
        super(options);
        this.DateTimeMode = options.dateTimeMode;
        this.Precision = options.precision;
    }
}
exports.DateTimeFieldSetting = DateTimeFieldSetting;
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
exports.ChoiceFieldSetting = ChoiceFieldSetting;
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
exports.NumberFieldSetting = NumberFieldSetting;
class RatingFieldSetting extends ShortTextFieldSetting {
    constructor(options) {
        super(options);
        this.Range = options.range;
        this.Split = options.split;
    }
}
exports.RatingFieldSetting = RatingFieldSetting;
class PasswordFieldSetting extends ShortTextFieldSetting {
    constructor(options) {
        super(options);
        this.ReenterTitle = options.reenterTitle;
        this.ReenterDescription = options.reenterDescription;
        this.PasswordHistoryLength = options.passwordHistoryLength;
    }
}
exports.PasswordFieldSetting = PasswordFieldSetting;
class CaptchaFieldSetting extends FieldSetting {
    constructor(options) {
        super(options);
    }
}
exports.CaptchaFieldSetting = CaptchaFieldSetting;
//# sourceMappingURL=FieldSettings.js.map