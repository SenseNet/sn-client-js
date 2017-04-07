"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComplexTypes;
(function (ComplexTypes) {
    class ChoiceOption {
        constructor(value, text, enabled, selected) {
            this.Value = value;
            this.Text = text;
            this.Enabled = enabled;
            this.Selected = selected;
        }
    }
    ComplexTypes.ChoiceOption = ChoiceOption;
    class DeferredUriObject {
    }
    ComplexTypes.DeferredUriObject = DeferredUriObject;
    class DeferredObject extends Object {
    }
    ComplexTypes.DeferredObject = DeferredObject;
    class MediaObject {
    }
    ComplexTypes.MediaObject = MediaObject;
    class MediaResourceObject extends Object {
    }
    ComplexTypes.MediaResourceObject = MediaResourceObject;
})(ComplexTypes = exports.ComplexTypes || (exports.ComplexTypes = {}));
//# sourceMappingURL=ComplexTypes.js.map