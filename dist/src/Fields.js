"use strict";
var Fields;
(function (Fields) {
    class HyperLink {
        constructor(href, text, title, target) {
            this.Href = href;
            this.Text = text;
            this.Title = title;
            this.Target = target;
        }
    }
    Fields.HyperLink = HyperLink;
    class ChoiceOption {
        constructor(value, text, enabled, selected) {
            this.Value = value;
            this.Text = text;
            this.Enabled = enabled;
            this.Selected = selected;
        }
    }
    Fields.ChoiceOption = ChoiceOption;
    class DeferredUriObject {
    }
    Fields.DeferredUriObject = DeferredUriObject;
    class DeferredObject extends Object {
    }
    Fields.DeferredObject = DeferredObject;
    class MediaObject {
    }
    Fields.MediaObject = MediaObject;
    class MediaResourceObject extends Object {
    }
    Fields.MediaResourceObject = MediaResourceObject;
})(Fields = exports.Fields || (exports.Fields = {}));

//# sourceMappingURL=Fields.js.map
