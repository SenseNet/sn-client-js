"use strict";
var Fields;
(function (Fields) {
    class ChoiceOption {
        constructor(value, text, enabled, selected) {
            this.Value = value;
            this.Text = text;
            this.Enabled = enabled;
            this.Selected = selected;
        }
    }
    Fields.ChoiceOption = ChoiceOption;
    (function (SavedQueryType) {
        SavedQueryType[SavedQueryType["Public"] = 0] = "Public";
        SavedQueryType[SavedQueryType["Private"] = 1] = "Private";
        SavedQueryType[SavedQueryType["NonDefined"] = 2] = "NonDefined";
    })(Fields.SavedQueryType || (Fields.SavedQueryType = {}));
    var SavedQueryType = Fields.SavedQueryType;
})(Fields = exports.Fields || (exports.Fields = {}));

//# sourceMappingURL=Fields.js.map
