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
    var Language;
    (function (Language) {
        Language[Language["Magyar"] = 0] = "Magyar";
        Language[Language["English"] = 1] = "English";
        Language[Language["Deutsch"] = 2] = "Deutsch";
    })(Language = Enums.Language || (Enums.Language = {}));
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
    var DeleteInstanceAfterFinished;
    (function (DeleteInstanceAfterFinished) {
        DeleteInstanceAfterFinished[DeleteInstanceAfterFinished["DeleteWhenCompleted"] = 0] = "DeleteWhenCompleted";
        DeleteInstanceAfterFinished[DeleteInstanceAfterFinished["DeleteWhenCompletedOrAborted"] = 1] = "DeleteWhenCompletedOrAborted";
        DeleteInstanceAfterFinished[DeleteInstanceAfterFinished["AlwaysKeep"] = 2] = "AlwaysKeep";
    })(DeleteInstanceAfterFinished = Enums.DeleteInstanceAfterFinished || (Enums.DeleteInstanceAfterFinished = {}));
    var GroupAttachments;
    (function (GroupAttachments) {
        GroupAttachments[GroupAttachments["email"] = 0] = "email";
        GroupAttachments[GroupAttachments["root"] = 1] = "root";
        GroupAttachments[GroupAttachments["subject"] = 2] = "subject";
        GroupAttachments[GroupAttachments["sender"] = 3] = "sender";
    })(GroupAttachments = Enums.GroupAttachments || (Enums.GroupAttachments = {}));
    var SelectionMode;
    (function (SelectionMode) {
        SelectionMode[SelectionMode["Random"] = 0] = "Random";
        SelectionMode[SelectionMode["First"] = 1] = "First";
    })(SelectionMode = Enums.SelectionMode || (Enums.SelectionMode = {}));
    var OrderingMode;
    (function (OrderingMode) {
        OrderingMode[OrderingMode["DefaultOrder"] = 0] = "DefaultOrder";
        OrderingMode[OrderingMode["ValidityOrder"] = 1] = "ValidityOrder";
    })(OrderingMode = Enums.OrderingMode || (Enums.OrderingMode = {}));
    var SiteLanguage;
    (function (SiteLanguage) {
        SiteLanguage[SiteLanguage["En"] = 0] = "En";
        SiteLanguage[SiteLanguage["Hu"] = 1] = "Hu";
    })(SiteLanguage = Enums.SiteLanguage || (Enums.SiteLanguage = {}));
    var UserLanguage;
    (function (UserLanguage) {
        UserLanguage[UserLanguage["En"] = 0] = "En";
        UserLanguage[UserLanguage["Hu"] = 1] = "Hu";
    })(UserLanguage = Enums.UserLanguage || (Enums.UserLanguage = {}));
    var RegisteredUserLanguage;
    (function (RegisteredUserLanguage) {
        RegisteredUserLanguage[RegisteredUserLanguage["En"] = 0] = "En";
        RegisteredUserLanguage[RegisteredUserLanguage["Hu"] = 1] = "Hu";
    })(RegisteredUserLanguage = Enums.RegisteredUserLanguage || (Enums.RegisteredUserLanguage = {}));
    var NotificationMode;
    (function (NotificationMode) {
        NotificationMode[NotificationMode["Email"] = 0] = "Email";
        NotificationMode[NotificationMode["EmailDigest"] = 1] = "EmailDigest";
        NotificationMode[NotificationMode["None"] = 2] = "None";
    })(NotificationMode = Enums.NotificationMode || (Enums.NotificationMode = {}));
    var EventType;
    (function (EventType) {
        EventType[EventType["Deadline"] = 0] = "Deadline";
        EventType[EventType["Meeting"] = 1] = "Meeting";
        EventType[EventType["Demo"] = 2] = "Demo";
    })(EventType = Enums.EventType || (Enums.EventType = {}));
    var Style;
    (function (Style) {
        Style[Style["Sedan"] = 0] = "Sedan";
        Style[Style["Coupe"] = 1] = "Coupe";
        Style[Style["Cabrio"] = 2] = "Cabrio";
        Style[Style["Roadster"] = 3] = "Roadster";
        Style[Style["SUV"] = 4] = "SUV";
        Style[Style["Van"] = 5] = "Van";
    })(Style = Enums.Style || (Enums.Style = {}));
    var MemoType;
    (function (MemoType) {
        MemoType[MemoType["generic"] = 0] = "generic";
        MemoType[MemoType["iso"] = 1] = "iso";
        MemoType[MemoType["iaudit"] = 2] = "iaudit";
    })(MemoType = Enums.MemoType || (Enums.MemoType = {}));
    var VerticalAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
        VerticalAlignment[VerticalAlignment["Middle"] = 1] = "Middle";
        VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
    })(VerticalAlignment = Enums.VerticalAlignment || (Enums.VerticalAlignment = {}));
    var HorizontalAlignment;
    (function (HorizontalAlignment) {
        HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
        HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
        HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
    })(HorizontalAlignment = Enums.HorizontalAlignment || (Enums.HorizontalAlignment = {}));
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
    var Result;
    (function (Result) {
        Result[Result["Approved"] = 0] = "Approved";
        Result[Result["Rejected"] = 1] = "Rejected";
    })(Result = Enums.Result || (Enums.Result = {}));
    var WebContentDemoLanguage;
    (function (WebContentDemoLanguage) {
        WebContentDemoLanguage[WebContentDemoLanguage["English"] = 0] = "English";
    })(WebContentDemoLanguage = Enums.WebContentDemoLanguage || (Enums.WebContentDemoLanguage = {}));
    var QueryType;
    (function (QueryType) {
        QueryType[QueryType["Public"] = 0] = "Public";
        QueryType[QueryType["Private"] = 1] = "Private";
    })(QueryType = Enums.QueryType || (Enums.QueryType = {}));
    var Frequency;
    (function (Frequency) {
        Frequency[Frequency["Option0"] = 0] = "Option0";
        Frequency[Frequency["Option1"] = 1] = "Option1";
        Frequency[Frequency["Option2"] = 2] = "Option2";
        Frequency[Frequency["Option3"] = 3] = "Option3";
    })(Frequency = Enums.Frequency || (Enums.Frequency = {}));
    var SubscriptionLanguage;
    (function (SubscriptionLanguage) {
        SubscriptionLanguage[SubscriptionLanguage["en"] = 0] = "en";
        SubscriptionLanguage[SubscriptionLanguage["hu"] = 1] = "hu";
    })(SubscriptionLanguage = Enums.SubscriptionLanguage || (Enums.SubscriptionLanguage = {}));
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
    var WorkflowStatus;
    (function (WorkflowStatus) {
        WorkflowStatus[WorkflowStatus["Created"] = 0] = "Created";
        WorkflowStatus[WorkflowStatus["Running"] = 1] = "Running";
        WorkflowStatus[WorkflowStatus["Aborted"] = 2] = "Aborted";
        WorkflowStatus[WorkflowStatus["Completed"] = 3] = "Completed";
    })(WorkflowStatus = Enums.WorkflowStatus || (Enums.WorkflowStatus = {}));
    var RegistrationType;
    (function (RegistrationType) {
        RegistrationType[RegistrationType["client"] = 0] = "client";
        RegistrationType[RegistrationType["media"] = 1] = "media";
        RegistrationType[RegistrationType["community"] = 2] = "community";
        RegistrationType[RegistrationType["public"] = 3] = "public";
    })(RegistrationType = Enums.RegistrationType || (Enums.RegistrationType = {}));
})(Enums = exports.Enums || (exports.Enums = {}));

//# sourceMappingURL=Enums.js.map
