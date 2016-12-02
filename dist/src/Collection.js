"use strict";
const ODataApi_1 = require('./ODataApi');
const ODataHelper_1 = require('./ODataHelper');
class Collection {
    constructor(items) {
        this.items = [];
        this.Path = '';
        this.items = items;
    }
    Items() {
        return this.items;
    }
    Item(id) {
        let item;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].Id === id) {
                return this.items[i];
            }
        }
    }
    Count() {
        return this.items.length;
    }
    Add(content) {
        const newcontent = ODataApi_1.ODataApi.CreateContent(this.Path, content);
        newcontent
            .map(response => response.d)
            .subscribe({
            next: (response) => {
                this.items = [
                    ...this.items,
                    response
                ];
            }
        });
        return newcontent;
    }
    Remove(arg, permanently = false) {
        if (typeof arg === 'number') {
            let content = this.items[arg];
            this.items =
                this.items.slice(0, arg)
                    .concat(this.items.slice(arg + 1));
            return ODataApi_1.ODataApi.DeleteContent(content.Id, permanently ? permanently : false);
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            this.items =
                this.items.filter((item, i) => arg.indexOf(i) > -1);
            let action = new ODataApi_1.ODataApi.CustomAction({ name: 'DeleteBatch', path: this.Path, isAction: true, requiredParams: ['paths'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: [{ 'paths': ids }, { 'permanently': permanently }] });
        }
    }
    Read(path, options) {
        this.Path = path;
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        o['path'] = path;
        let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
        const children = ODataApi_1.ODataApi.FetchContent(optionList);
        children
            .map(response => response.d)
            .subscribe({
            next: (response) => {
                this.items = response.results;
            }
        });
        return children;
    }
    Move(arg, targetPath) {
        if (typeof arg === 'number') {
            let content = this.items[arg];
            this.items =
                this.items.slice(0, arg)
                    .concat(this.items.slice(arg + 1));
            let action = new ODataApi_1.ODataApi.CustomAction({ name: 'Move', id: arg, isAction: true, requiredParams: ['targetPath'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: [{ 'targetPath': targetPath }] });
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            this.items =
                this.items.filter((item, i) => arg.indexOf(i) > -1);
            let action = new ODataApi_1.ODataApi.CustomAction({ name: 'MoveBatch', path: this.Path, isAction: true, requiredParams: ['paths', 'targetPath'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: [{ 'paths': ids, 'targetPath': targetPath }] });
        }
    }
    Copy(arg, targetPath) {
        if (typeof arg === 'number') {
            let content = this.items[arg];
            let action = new ODataApi_1.ODataApi.CustomAction({ name: 'Copy', id: arg, isAction: true, requiredParams: ['targetPath'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: [{ 'targetPath': targetPath }] });
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            let action = new ODataApi_1.ODataApi.CustomAction({ name: 'CopyBatch', path: this.Path, isAction: true, requiredParams: ['paths', 'targetPath'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: [{ 'paths': ids, 'targetPath': targetPath }] });
        }
    }
    AllowedChildTypes(options) {
        let o = {};
        if (options) {
            o['params'] = options;
        }
        o['path'] = ODataHelper_1.ODataHelper.getContentURLbyPath(this.Path);
        let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    Upload(contentType, fileName, overwrite, useChunk, propertyName, fileText) {
        const o = overwrite ? overwrite : true;
        const data = {
            ContentType: contentType,
            FileName: fileName,
            Overwrite: o,
            UseChunk: useChunk ? useChunk : false
        };
        if (typeof propertyName !== 'undefined') {
            data['PropertyName'] = propertyName;
        }
        if (typeof fileText !== 'undefined') {
            data['FileText'] = fileText;
        }
        let uploadCreation = ODataApi_1.ODataApi.Upload(this.Path, data, true);
        uploadCreation.subscribe({
            next: (response) => {
                const data = {
                    ContentType: contentType,
                    FileName: fileName,
                    Overwrite: o,
                    ChunkToken: response
                };
                return ODataApi_1.ODataApi.Upload(this.Path, data, false);
            }
        });
        return uploadCreation;
    }
}
exports.Collection = Collection;

//# sourceMappingURL=Collection.js.map
