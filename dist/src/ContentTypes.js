"use strict";
const Content_1 = require('./Content');
var ContentTypes;
(function (ContentTypes) {
    class GenericContent extends Content_1.Content {
        constructor(options) {
            super(options);
            this.ParentId = null;
            this.OwnerId = null;
            this.Owner = null;
            this.VersionId = null;
            this.TypeIs = null;
            this.Icon = null;
            this.CreatedById = null;
            this.ModifiedById = null;
            this.Version = null;
            this.Path = null;
            this.Depth = null;
            this.InTree = null;
            this.InFolder = null;
            this.IsSystemContent = false;
            this.IsFolder = false;
            this.Hidden = null;
            this.EnableLifespan = false;
            this.ValidFrom = null;
            this.ValidTill = null;
            this.AllowedChildTypes = null;
        }
    }
    ContentTypes.GenericContent = GenericContent;
    class Folder extends GenericContent {
    }
    ContentTypes.Folder = Folder;
    class ListItem extends GenericContent {
    }
    ContentTypes.ListItem = ListItem;
    class WebContent extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.WebContent = WebContent;
    class Article extends WebContent {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Article = Article;
    class Task extends ListItem {
        constructor(options) {
            super(options);
        }
    }
    ContentTypes.Task = Task;
})(ContentTypes = exports.ContentTypes || (exports.ContentTypes = {}));
function CreateContent(type, options = {}) {
    let content = new ContentTypes[type](options);
    return content;
}
exports.CreateContent = CreateContent;
var Priority;
(function (Priority) {
})(Priority || (Priority = {}));
var Status;
(function (Status) {
})(Status || (Status = {}));

//# sourceMappingURL=ContentTypes.js.map
