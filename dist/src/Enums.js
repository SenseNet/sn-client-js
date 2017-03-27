"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums;
(function (Enums) {
    var VersioningMode;
    (function (VersioningMode) {
        VersioningMode[VersioningMode["Option0"] = 0] = "Option0";
        VersioningMode[VersioningMode["Option1"] = 1] = "Option1";
        VersioningMode[VersioningMode["Option2"] = 2] = "Option2";
        VersioningMode[VersioningMode["Option3"] = 3] = "Option3";
    })(VersioningMode = Enums.VersioningMode || (Enums.VersioningMode = {}));
    var InheritableVersioningMode;
    (function (InheritableVersioningMode) {
        InheritableVersioningMode[InheritableVersioningMode["Option0"] = 0] = "Option0";
        InheritableVersioningMode[InheritableVersioningMode["Option1"] = 1] = "Option1";
        InheritableVersioningMode[InheritableVersioningMode["Option2"] = 2] = "Option2";
        InheritableVersioningMode[InheritableVersioningMode["Option3"] = 3] = "Option3";
    })(InheritableVersioningMode = Enums.InheritableVersioningMode || (Enums.InheritableVersioningMode = {}));
    var ApprovingMode;
    (function (ApprovingMode) {
        ApprovingMode[ApprovingMode["Option0"] = 0] = "Option0";
        ApprovingMode[ApprovingMode["Option1"] = 1] = "Option1";
        ApprovingMode[ApprovingMode["Option2"] = 2] = "Option2";
    })(ApprovingMode = Enums.ApprovingMode || (Enums.ApprovingMode = {}));
    var InheritableApprovingMode;
    (function (InheritableApprovingMode) {
        InheritableApprovingMode[InheritableApprovingMode["Option0"] = 0] = "Option0";
        InheritableApprovingMode[InheritableApprovingMode["Option1"] = 1] = "Option1";
        InheritableApprovingMode[InheritableApprovingMode["Option2"] = 2] = "Option2";
    })(InheritableApprovingMode = Enums.InheritableApprovingMode || (Enums.InheritableApprovingMode = {}));
    var SavingState;
    (function (SavingState) {
        SavingState[SavingState["Finalized"] = 0] = "Finalized";
        SavingState[SavingState["Creating"] = 1] = "Creating";
        SavingState[SavingState["Modifying"] = 2] = "Modifying";
        SavingState[SavingState["ModifyingLocked"] = 3] = "ModifyingLocked";
    })(SavingState = Enums.SavingState || (Enums.SavingState = {}));
    var GroupAttachments;
    (function (GroupAttachments) {
        GroupAttachments[GroupAttachments["email"] = 0] = "email";
        GroupAttachments[GroupAttachments["root"] = 1] = "root";
        GroupAttachments[GroupAttachments["subject"] = 2] = "subject";
        GroupAttachments[GroupAttachments["sender"] = 3] = "sender";
    })(GroupAttachments = Enums.GroupAttachments || (Enums.GroupAttachments = {}));
    var EnableAutofilters;
    (function (EnableAutofilters) {
        EnableAutofilters[EnableAutofilters["Default"] = 0] = "Default";
        EnableAutofilters[EnableAutofilters["Enabled"] = 1] = "Enabled";
        EnableAutofilters[EnableAutofilters["Disabled"] = 2] = "Disabled";
    })(EnableAutofilters = Enums.EnableAutofilters || (Enums.EnableAutofilters = {}));
    var EnableLifespanFilter;
    (function (EnableLifespanFilter) {
        EnableLifespanFilter[EnableLifespanFilter["Default"] = 0] = "Default";
        EnableLifespanFilter[EnableLifespanFilter["Enabled"] = 1] = "Enabled";
        EnableLifespanFilter[EnableLifespanFilter["Disabled"] = 2] = "Disabled";
    })(EnableLifespanFilter = Enums.EnableLifespanFilter || (Enums.EnableLifespanFilter = {}));
    var Language;
    (function (Language) {
        Language[Language["En"] = 0] = "En";
        Language[Language["Hu"] = 1] = "Hu";
    })(Language = Enums.Language || (Enums.Language = {}));
    var MemoType;
    (function (MemoType) {
        MemoType[MemoType["generic"] = 0] = "generic";
        MemoType[MemoType["iso"] = 1] = "iso";
        MemoType[MemoType["iaudit"] = 2] = "iaudit";
    })(MemoType = Enums.MemoType || (Enums.MemoType = {}));
    var Priority;
    (function (Priority) {
        Priority[Priority["Option0"] = 0] = "Option0";
        Priority[Priority["Option1"] = 1] = "Option1";
        Priority[Priority["Option2"] = 2] = "Option2";
    })(Priority = Enums.Priority || (Enums.Priority = {}));
    var Status;
    (function (Status) {
        Status[Status["pending"] = 0] = "pending";
        Status[Status["active"] = 1] = "active";
        Status[Status["completed"] = 2] = "completed";
        Status[Status["deferred"] = 3] = "deferred";
        Status[Status["waiting"] = 4] = "waiting";
    })(Status = Enums.Status || (Enums.Status = {}));
    var QueryType;
    (function (QueryType) {
        QueryType[QueryType["Public"] = 0] = "Public";
        QueryType[QueryType["Private"] = 1] = "Private";
    })(QueryType = Enums.QueryType || (Enums.QueryType = {}));
    var Gender;
    (function (Gender) {
        Gender[Gender["Option0"] = 0] = "Option0";
        Gender[Gender["Female"] = 1] = "Female";
        Gender[Gender["Male"] = 2] = "Male";
    })(Gender = Enums.Gender || (Enums.Gender = {}));
    var MaritalStatus;
    (function (MaritalStatus) {
        MaritalStatus[MaritalStatus["Option0"] = 0] = "Option0";
        MaritalStatus[MaritalStatus["Single"] = 1] = "Single";
        MaritalStatus[MaritalStatus["Married"] = 2] = "Married";
    })(MaritalStatus = Enums.MaritalStatus || (Enums.MaritalStatus = {}));
})(Enums = exports.Enums || (exports.Enums = {}));
//# sourceMappingURL=Enums.js.map