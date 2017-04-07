"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ODataApi_1 = require("./ODataApi");
const ODataHelper_1 = require("./ODataHelper");
const Schemas_1 = require("./Schemas");
class Content {
    constructor(options) {
        this.options = options;
        this.Id = options.Id;
        this.Name = options.Name;
        this.DisplayName = options.DisplayName;
        this.ModificationDate = options.ModificationDate;
        this.CreationDate = options.CreationDate;
        this.Description = options.Description;
        this.Icon = options.Icon;
        this.IsFolder = options.IsFolder;
        this.Path = options.Path;
        this.Index = options.Index;
    }
    get Type() {
        return this._type || this.constructor.name;
    }
    set Type(newType) {
        this._type = newType;
    }
    Delete(permanently = false) {
        return ODataApi_1.ODataApi.DeleteContent(this.Id, permanently);
    }
    Rename(newDisplayName, newName, options) {
        let fields = {};
        if (typeof newDisplayName !== 'undefined') {
            fields['DisplayName'] = newDisplayName;
        }
        if (typeof newName !== 'undefined') {
            fields['Name'] = newName;
        }
        return ODataApi_1.ODataApi.PatchContent(this.Id, fields);
    }
    Save(fields, override = false, options) {
        if (override) {
            return ODataApi_1.ODataApi.PutContent(this.Id, fields);
        }
        else {
            return ODataApi_1.ODataApi.PatchContent(this.Id, fields);
        }
    }
    GetSchema() {
        return Schemas_1.Schemas[`${this.Type}CTD`]();
    }
    Actions(scenario) {
        let options = {};
        if (typeof scenario !== 'undefined') {
            options = {
                'scenario': scenario
            };
        }
        let optionList;
        if (typeof this.Id !== 'undefined') {
            optionList = this.deferredFunctionBuilder(this.Id, 'Actions', options);
        }
        else {
            optionList = this.deferredFunctionBuilder(this.Path, 'Actions', options);
        }
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    GetAllowedChildTypes(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'AllowedChildTypes', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    GetEffectiveAllowedChildTypes(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'EffectiveAllowedChildTypes', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    GetOwner(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'Owner', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    Creator(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'CreatedBy', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    Modifier(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'ModifiedBy', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    CheckedOutBy(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'CheckedOutTo', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    Children(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, '', options ? options : null);
        return ODataApi_1.ODataApi.FetchContent(optionList);
    }
    GetVersions(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'Versions', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    GetWorkspace(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'Workspace', options ? options : null);
        return ODataApi_1.ODataApi.GetContent(optionList);
    }
    Checkout() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'CheckOut', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    CheckIn(checkInComments) {
        let action;
        (typeof checkInComments !== 'undefined') ?
            action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'CheckIn', id: this.Id, isAction: true, params: ['checkInComments'] }) :
            action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'CheckIn', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'checkInComments': checkInComments ? checkInComments : '' } });
    }
    UndoCheckout() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'UndoCheckOut', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    ForceUndoCheckout() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'ForceUndoCheckout', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    Approve() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'Approve', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    Reject(rejectReason) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'Reject', id: this.Id, isAction: true, params: ['rejectReason'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'rejectReason': rejectReason ? rejectReason : '' } });
    }
    Publish(rejectReason) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'Publish', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    RestoreVersion(version) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'Publish', id: this.Id, isAction: true, requiredParams: ['version'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'version': version ? version : '' } });
    }
    Restore(destination, newname) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'Restore', id: this.Id, isAction: true, params: ['destination', 'newname'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, {
            data: {
                'destination': destination ? destination : '',
                'newname': newname ? newname : ''
            }
        });
    }
    MoveTo(path) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'MoveTo', id: this.Id, isAction: true, requiredParams: ['targetPath'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'targetPath': path ? path : '' } });
    }
    CopyTo(path) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'CopyTo', id: this.Id, isAction: true, requiredParams: ['targetPath'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'targetPath': path ? path : '' } });
    }
    AddAllowedChildTypes(contentTypes) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'AddAllowedChildTypes', id: this.Id, isAction: true, requiredParams: ['contentTypes'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'contentTypes': contentTypes } });
    }
    RemoveAllowedChildTypes(contentTypes) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'RemoveAllowedChildTypes', id: this.Id, isAction: true, requiredParams: ['contentTypes'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'contentTypes': contentTypes } });
    }
    static Load(arg, options, version) {
        let o = {};
        if (typeof options !== 'undefined') {
            o['params'] = options;
        }
        if (typeof arg === 'string') {
            let contentURL = ODataHelper_1.ODataHelper.getContentURLbyPath(arg);
            o['path'] = contentURL;
            let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
            return ODataApi_1.ODataApi.GetContent(optionList);
        }
        else if (typeof arg === 'number') {
            let contentURL = ODataHelper_1.ODataHelper.getContentUrlbyId(arg);
            o['path'] = contentURL;
            let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
            return ODataApi_1.ODataApi.GetContent(optionList);
        }
    }
    static GetSchema(type) {
        return Schemas_1.Schemas[`${type}CTD`]();
    }
    static Create(newContent, opt) {
        let constructed = new newContent(opt);
        return constructed;
    }
    Schema() {
        return Schemas_1.Schemas[`${this.Type}CTD`]();
    }
    SetPermissions(arg) {
        let action;
        if (arg instanceof Array) {
            action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'SetPermissions', id: this.Id, isAction: true, requiredParams: ['entryList'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'entryList': arg } });
        }
        else {
            action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'SetPermissions', path: this.Path, isAction: true, requiredParams: ['inheritance'] });
            return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'inheritance': arg } });
        }
    }
    ;
    GetPermission(identity) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetPermission', id: this.Id, isAction: false, params: ['identity'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'identity': identity ? identity : '' } });
    }
    HasPermission(permissions, user) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'HasPermission', id: this.Id, isAction: false, requiredParams: ['permissions'], params: ['user'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'permissions': permissions, 'user': user ? user : '' } });
    }
    TakeOwnership(userOrGroup) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'TakeOwnership', id: this.Id, isAction: true, params: ['userOrGroup'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'userOrGroup': userOrGroup ? userOrGroup : '' } });
    }
    SaveQuery(query, displayName, queryType) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'SaveQuery', id: this.Id, isAction: true, requiredParams: ['query', 'displayName', 'queryType'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'query': query, 'displayName': displayName ? displayName : '', queryType: queryType } });
    }
    GetQueries(onlyPublic = true) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetQueries', id: this.Id, isAction: false, noCache: true, requiredParams: ['onlyPublic'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'onlyPublic': onlyPublic } });
    }
    Finalize() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'FinalizeContent', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    TakeLockOver(userId) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'TakeLockOver', id: this.Id, isAction: true, params: ['user'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'user': userId ? userId : '' } });
    }
    RebuildIndex(recursive, rebuildLevel) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'RebuildIndex', id: this.Id, isAction: true, params: ['recursive', 'rebuildLevel'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'recursive': recursive ? recursive : false, 'rebuildLevel': rebuildLevel ? rebuildLevel : 0 } });
    }
    RebuildIndexSubtree() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'RebuildIndexSubtree', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    RefreshIndexSubtree() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'RefreshIndexSubtree', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    CheckPreviews(generateMissing) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'CheckPreviews', id: this.Id, isAction: true, params: ['generateMissing'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'generateMissing': generateMissing ? generateMissing : false } });
    }
    RegeneratePreviews() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'RegeneratePreviews', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    GetPageCount() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetPageCount', id: this.Id, isAction: true });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    PreviewAvailable(page) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'PreviewAvailable', id: this.Id, isAction: false, requiredParams: ['page'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'page': page } });
    }
    GetPreviewImagesForOData() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetPreviewImagesForOData', id: this.Id, isAction: false });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    GetExistingPreviewImagesForOData() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetExistingPreviewImagesForOData', id: this.Id, isAction: false });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    GetAllowedChildTypesFromCTD() {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetAllowedChildTypesFromCTD', id: this.Id, isAction: false });
        return ODataApi_1.ODataApi.CreateCustomAction(action);
    }
    GetRelatedIdentities(level, kind) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetRelatedIdentities', id: this.Id, isAction: true, requiredParams: ['level', 'kind'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'level': level, 'kind': kind } });
    }
    GetRelatedPermissions(level, explicitOnly, member, includedTypes) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetRelatedPermissions', id: this.Id, isAction: true, requiredParams: ['level', 'explicitOnly', 'member', 'includedTypes'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'level': level, 'explicitOnly': explicitOnly, 'member': member, 'includedTypes': includedTypes } });
    }
    GetRelatedItems(level, explicitOnly, member, permissions) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetRelatedItems', id: this.Id, isAction: true, requiredParams: ['level', 'explicitOnly', 'member', 'permissions'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'level': level, 'explicitOnly': explicitOnly, 'member': member, 'permissions': permissions } });
    }
    GetRelatedIdentitiesByPermissions(level, kind, permissions) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetRelatedIdentitiesByPermissions', id: this.Id, isAction: true, requiredParams: ['level', 'kind', 'permissions'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'level': level, 'kind': kind, 'permissions': permissions } });
    }
    GetRelatedItemsOneLevel(level, member, permissions) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetRelatedItemsOneLevel', id: this.Id, isAction: true, requiredParams: ['level', 'member', 'permissions'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'level': level, 'member': member, 'permissions': permissions } });
    }
    GetAllowedUsers(permissions) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetAllowedUsers', id: this.Id, isAction: true, requiredParams: ['permissions'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'permissions': permissions } });
    }
    GetParentGroups(directOnly) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'GetParentGroups', id: this.Id, isAction: true, requiredParams: ['directOnly'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'directOnly': directOnly } });
    }
    AddMembers(contentIds) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'AddMembers', id: this.Id, isAction: true, requiredParams: ['contentIds'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'contentIds': contentIds } });
    }
    RemoveMembers(contentIds) {
        let action = new ODataApi_1.ODataApi.CustomContentAction({ name: 'RemoveMembers', id: this.Id, isAction: true, requiredParams: ['contentIds'] });
        return ODataApi_1.ODataApi.CreateCustomAction(action, { data: { 'contentIds': contentIds } });
    }
    deferredFunctionBuilder(arg, fieldName, options) {
        let contentURL;
        if (typeof arg === 'string') {
            contentURL = ODataHelper_1.ODataHelper.getContentURLbyPath(arg);
        }
        else {
            contentURL = ODataHelper_1.ODataHelper.getContentUrlbyId(arg);
        }
        let o = {};
        if (options) {
            o['params'] = options;
        }
        o['path'] = `${contentURL}/${fieldName}`;
        let optionList = new ODataApi_1.ODataApi.ODataRequestOptions(o);
        return optionList;
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
exports.Content = Content;
//# sourceMappingURL=Content.js.map