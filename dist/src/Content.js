"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("./SN");
class Content {
    constructor(options, repository) {
        this.options = options;
        this.repository = repository;
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
        return this.repository.Contents.Delete(this.Id, permanently);
    }
    Rename(newDisplayName, newName, options) {
        let fields = {};
        if (typeof newDisplayName !== 'undefined') {
            fields['DisplayName'] = newDisplayName;
        }
        if (typeof newName !== 'undefined') {
            fields['Name'] = newName;
        }
        return this.repository.Contents.Patch(this.Id, fields);
    }
    Save(fields, override = false, options) {
        if (override) {
            return this.repository.Contents.Put(this.Id, fields);
        }
        else {
            return this.repository.Contents.Patch(this.Id, fields);
        }
    }
    GetSchema() {
        return SN_1.Schemas[`${this.Type}CTD`]();
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
        return this.repository.Contents.Get(optionList);
    }
    GetAllowedChildTypes(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'AllowedChildTypes', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    GetEffectiveAllowedChildTypes(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'EffectiveAllowedChildTypes', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    GetOwner(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'Owner', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    Creator(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'CreatedBy', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    Modifier(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'ModifiedBy', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    CheckedOutBy(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'CheckedOutTo', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    Children(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, '', options ? options : null);
        return this.repository.Contents.Fetch(optionList);
    }
    GetVersions(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'Versions', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    GetWorkspace(options) {
        let optionList = this.deferredFunctionBuilder(this.Id, 'Workspace', options ? options : null);
        return this.repository.Contents.Get(optionList);
    }
    Checkout() {
        return this.repository.Contents.CreateCustomAction({ name: 'CheckOut', id: this.Id, isAction: true });
    }
    CheckIn(checkInComments) {
        let action;
        (typeof checkInComments !== 'undefined') ?
            action = { name: 'CheckIn', id: this.Id, isAction: true, params: ['checkInComments'] } :
            action = { name: 'CheckIn', id: this.Id, isAction: true };
        return this.repository.Contents.CreateCustomAction(action, { data: { 'checkInComments': checkInComments ? checkInComments : '' } });
    }
    UndoCheckout() {
        return this.repository.Contents.CreateCustomAction({ name: 'UndoCheckOut', id: this.Id, isAction: true });
    }
    ForceUndoCheckout() {
        return this.repository.Contents.CreateCustomAction({ name: 'ForceUndoCheckout', id: this.Id, isAction: true });
    }
    Approve() {
        return this.repository.Contents.CreateCustomAction({ name: 'Approve', id: this.Id, isAction: true });
    }
    Reject(rejectReason) {
        return this.repository.Contents.CreateCustomAction({ name: 'Reject', id: this.Id, isAction: true, params: ['rejectReason'] }, { data: { 'rejectReason': rejectReason ? rejectReason : '' } });
    }
    Publish(rejectReason) {
        return this.repository.Contents.CreateCustomAction({ name: 'Publish', id: this.Id, isAction: true });
    }
    RestoreVersion(version) {
        return this.repository.Contents.CreateCustomAction({ name: 'Publish', id: this.Id, isAction: true, requiredParams: ['version'] }, { data: { 'version': version ? version : '' } });
    }
    Restore(destination, newname) {
        return this.repository.Contents.CreateCustomAction({ name: 'Restore', id: this.Id, isAction: true, params: ['destination', 'newname'] }, {
            data: {
                'destination': destination ? destination : '',
                'newname': newname ? newname : ''
            }
        });
    }
    MoveTo(path) {
        return this.repository.Contents.CreateCustomAction({ name: 'MoveTo', id: this.Id, isAction: true, requiredParams: ['targetPath'] }, { data: { 'targetPath': path ? path : '' } });
    }
    CopyTo(path) {
        return this.repository.Contents.CreateCustomAction({ name: 'CopyTo', id: this.Id, isAction: true, requiredParams: ['targetPath'] }, { data: { 'targetPath': path ? path : '' } });
    }
    AddAllowedChildTypes(contentTypes) {
        return this.repository.Contents.CreateCustomAction({ name: 'AddAllowedChildTypes', id: this.Id, isAction: true, requiredParams: ['contentTypes'] }, { data: { 'contentTypes': contentTypes } });
    }
    RemoveAllowedChildTypes(contentTypes) {
        return this.repository.Contents.CreateCustomAction({ name: 'RemoveAllowedChildTypes', id: this.Id, isAction: true, requiredParams: ['contentTypes'] }, { data: { 'contentTypes': contentTypes } });
    }
    static GetSchema(type) {
        return SN_1.Schemas[`${type}CTD`]();
    }
    static Create(newContent, opt, repository) {
        let constructed = new newContent(opt, repository);
        return constructed;
    }
    Schema() {
        return SN_1.Schemas[`${this.Type}CTD`]();
    }
    SetPermissions(arg) {
        let action;
        if (arg instanceof Array) {
            return this.repository.Contents.CreateCustomAction({ name: 'SetPermissions', id: this.Id, isAction: true, requiredParams: ['entryList'] }, { data: { 'entryList': arg } });
        }
        else {
            return this.repository.Contents.CreateCustomAction({ name: 'SetPermissions', path: this.Path, isAction: true, requiredParams: ['inheritance'] }, { data: { 'inheritance': arg } });
        }
    }
    ;
    GetPermission(identity) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetPermission', id: this.Id, isAction: false, params: ['identity'] }, { data: { 'identity': identity ? identity : '' } });
    }
    HasPermission(permissions, user) {
        return this.repository.Contents.CreateCustomAction({ name: 'HasPermission', id: this.Id, isAction: false, requiredParams: ['permissions'], params: ['user'] }, { data: { 'permissions': permissions, 'user': user ? user : '' } });
    }
    TakeOwnership(userOrGroup) {
        return this.repository.Contents.CreateCustomAction({ name: 'TakeOwnership', id: this.Id, isAction: true, params: ['userOrGroup'] }, { data: { 'userOrGroup': userOrGroup ? userOrGroup : '' } });
    }
    SaveQuery(query, displayName, queryType) {
        return this.repository.Contents.CreateCustomAction({ name: 'SaveQuery', id: this.Id, isAction: true, requiredParams: ['query', 'displayName', 'queryType'] }, { data: { 'query': query, 'displayName': displayName ? displayName : '', queryType: queryType } });
    }
    GetQueries(onlyPublic = true) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetQueries', id: this.Id, isAction: false, noCache: true, requiredParams: ['onlyPublic'] }, { data: { 'onlyPublic': onlyPublic } });
    }
    Finalize() {
        return this.repository.Contents.CreateCustomAction({ name: 'FinalizeContent', id: this.Id, isAction: true });
    }
    TakeLockOver(userId) {
        return this.repository.Contents.CreateCustomAction({ name: 'TakeLockOver', id: this.Id, isAction: true, params: ['user'] }, { data: { 'user': userId ? userId : '' } });
    }
    RebuildIndex(recursive, rebuildLevel) {
        return this.repository.Contents.CreateCustomAction({ name: 'RebuildIndex', id: this.Id, isAction: true, params: ['recursive', 'rebuildLevel'] }, { data: { 'recursive': recursive ? recursive : false, 'rebuildLevel': rebuildLevel ? rebuildLevel : 0 } });
    }
    RebuildIndexSubtree() {
        return this.repository.Contents.CreateCustomAction({ name: 'RebuildIndexSubtree', id: this.Id, isAction: true });
    }
    RefreshIndexSubtree() {
        return this.repository.Contents.CreateCustomAction({ name: 'RefreshIndexSubtree', id: this.Id, isAction: true });
    }
    CheckPreviews(generateMissing) {
        return this.repository.Contents.CreateCustomAction({ name: 'CheckPreviews', id: this.Id, isAction: true, params: ['generateMissing'] }, { data: { 'generateMissing': generateMissing ? generateMissing : false } });
    }
    RegeneratePreviews() {
        return this.repository.Contents.CreateCustomAction({ name: 'RegeneratePreviews', id: this.Id, isAction: true });
    }
    GetPageCount() {
        return this.repository.Contents.CreateCustomAction({ name: 'GetPageCount', id: this.Id, isAction: true });
    }
    PreviewAvailable(page) {
        return this.repository.Contents.CreateCustomAction({ name: 'PreviewAvailable', id: this.Id, isAction: false, requiredParams: ['page'] }, { data: { 'page': page } });
    }
    GetPreviewImagesForOData() {
        return this.repository.Contents.CreateCustomAction({ name: 'GetPreviewImagesForOData', id: this.Id, isAction: false });
    }
    GetExistingPreviewImagesForOData() {
        return this.repository.Contents.CreateCustomAction({ name: 'GetExistingPreviewImagesForOData', id: this.Id, isAction: false });
    }
    GetAllowedChildTypesFromCTD() {
        return this.repository.Contents.CreateCustomAction({ name: 'GetAllowedChildTypesFromCTD', id: this.Id, isAction: false });
    }
    GetRelatedIdentities(level, kind) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetRelatedIdentities', id: this.Id, isAction: true, requiredParams: ['level', 'kind'] }, { data: { 'level': level, 'kind': kind } });
    }
    GetRelatedPermissions(level, explicitOnly, member, includedTypes) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetRelatedPermissions', id: this.Id, isAction: true, requiredParams: ['level', 'explicitOnly', 'member', 'includedTypes'] }, { data: { 'level': level, 'explicitOnly': explicitOnly, 'member': member, 'includedTypes': includedTypes } });
    }
    GetRelatedItems(level, explicitOnly, member, permissions) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetRelatedItems', id: this.Id, isAction: true, requiredParams: ['level', 'explicitOnly', 'member', 'permissions'] }, { data: { 'level': level, 'explicitOnly': explicitOnly, 'member': member, 'permissions': permissions } });
    }
    GetRelatedIdentitiesByPermissions(level, kind, permissions) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetRelatedIdentitiesByPermissions', id: this.Id, isAction: true, requiredParams: ['level', 'kind', 'permissions'] }, { data: { 'level': level, 'kind': kind, 'permissions': permissions } });
    }
    GetRelatedItemsOneLevel(level, member, permissions) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetRelatedItemsOneLevel', id: this.Id, isAction: true, requiredParams: ['level', 'member', 'permissions'] }, { data: { 'level': level, 'member': member, 'permissions': permissions } });
    }
    GetAllowedUsers(permissions) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetAllowedUsers', id: this.Id, isAction: true, requiredParams: ['permissions'] }, { data: { 'permissions': permissions } });
    }
    GetParentGroups(directOnly) {
        return this.repository.Contents.CreateCustomAction({ name: 'GetParentGroups', id: this.Id, isAction: true, requiredParams: ['directOnly'] }, { data: { 'directOnly': directOnly } });
    }
    AddMembers(contentIds) {
        return this.repository.Contents.CreateCustomAction({ name: 'AddMembers', id: this.Id, isAction: true, requiredParams: ['contentIds'] }, { data: { 'contentIds': contentIds } });
    }
    RemoveMembers(contentIds) {
        return this.repository.Contents.CreateCustomAction({ name: 'RemoveMembers', id: this.Id, isAction: true, requiredParams: ['contentIds'] }, { data: { 'contentIds': contentIds } });
    }
    deferredFunctionBuilder(idOrPath, fieldName, options) {
        let contentURL;
        if (typeof idOrPath === 'string') {
            contentURL = SN_1.ODataHelper.getContentURLbyPath(idOrPath);
        }
        else {
            contentURL = SN_1.ODataHelper.getContentUrlbyId(idOrPath);
        }
        let o = {};
        if (options) {
            o['params'] = options;
        }
        o['path'] = `${contentURL}/${fieldName}`;
        return o;
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
        let uploadCreation = this.repository.Contents.Upload(this.Path, data, true);
        uploadCreation.subscribe({
            next: (response) => {
                const data = {
                    ContentType: contentType,
                    FileName: fileName,
                    Overwrite: o,
                    ChunkToken: response
                };
                return this.repository.Contents.Upload(this.Path, data, false);
            }
        });
        return uploadCreation;
    }
}
exports.Content = Content;
//# sourceMappingURL=Content.js.map