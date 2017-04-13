"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("./SN");
class Collection {
    constructor(items, service) {
        this.items = items;
        this.service = service;
        this.Path = '';
    }
    Items() {
        return this.items;
    }
    Item(id) {
        let item;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].Id === id) {
                return this.items[i];
            }
        }
    }
    Count() {
        return this.items.length;
    }
    Add(content) {
        const newcontent = this.service.Post(this.Path, content);
        newcontent
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
            return this.service.Delete(content.Id, permanently ? permanently : false);
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            this.items =
                this.items.filter((item, i) => arg.indexOf(i) > -1);
            let action = new SN_1.CustomAction({ name: 'DeleteBatch', path: this.Path, isAction: true, requiredParams: ['paths'] });
            return this.service.CreateCustomAction(action, { data: [{ 'paths': ids }, { 'permanently': permanently }] });
        }
    }
    Read(path, options) {
        this.Path = path;
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        o['path'] = path;
        let optionList = new SN_1.ODataRequestOptions(o);
        const children = this.service.Fetch(optionList);
        children
            .subscribe({
            next: (items) => {
                this.items = items;
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
            let action = new SN_1.CustomAction({ name: 'Move', id: arg, isAction: true, requiredParams: ['targetPath'] });
            return this.service.CreateCustomAction(action, { data: [{ 'targetPath': targetPath }] });
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            this.items =
                this.items.filter((item, i) => arg.indexOf(i) > -1);
            let action = new SN_1.CustomAction({ name: 'MoveBatch', path: this.Path, isAction: true, requiredParams: ['paths', 'targetPath'] });
            return this.service.CreateCustomAction(action, { data: [{ 'paths': ids, 'targetPath': targetPath }] });
        }
    }
    Copy(arg, targetPath) {
        if (typeof arg === 'number') {
            let content = this.items[arg];
            let action = new SN_1.CustomAction({ name: 'Copy', id: arg, isAction: true, requiredParams: ['targetPath'] });
            return this.service.CreateCustomAction(action, { data: [{ 'targetPath': targetPath }] });
        }
        else {
            let ids = arg.map(i => this.items[i].Id);
            let action = new SN_1.CustomAction({ name: 'CopyBatch', path: this.Path, isAction: true, requiredParams: ['paths', 'targetPath'] });
            return this.service.CreateCustomAction(action, { data: [{ 'paths': ids, 'targetPath': targetPath }] });
        }
    }
    AllowedChildTypes(options) {
        let o = {};
        if (options) {
            o['params'] = options;
        }
        o['path'] = SN_1.ODataHelper.getContentURLbyPath(this.Path);
        let optionList = new SN_1.ODataRequestOptions(o);
        return this.service.Get(optionList, SN_1.Content);
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
        let uploadCreation = this.service.Upload(this.Path, data, true);
        uploadCreation.subscribe({
            next: (response) => {
                const data = {
                    ContentType: contentType,
                    FileName: fileName,
                    Overwrite: o,
                    ChunkToken: response
                };
                return this.service.Upload(this.Path, data, false);
            }
        });
        return uploadCreation;
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map