"use strict";
var Enums;
(function (Enums) {
    (function (VersioningMode) {
        VersioningMode[VersioningMode["Option0"] = 0] = "Option0";
        VersioningMode[VersioningMode["Option1"] = 1] = "Option1";
        VersioningMode[VersioningMode["Option2"] = 2] = "Option2";
        VersioningMode[VersioningMode["Option3"] = 3] = "Option3";
    })(Enums.VersioningMode || (Enums.VersioningMode = {}));
    var VersioningMode = Enums.VersioningMode;
    (function (InheritableVersioningMode) {
        InheritableVersioningMode[InheritableVersioningMode["Option0"] = 0] = "Option0";
        InheritableVersioningMode[InheritableVersioningMode["Option1"] = 1] = "Option1";
        InheritableVersioningMode[InheritableVersioningMode["Option2"] = 2] = "Option2";
        InheritableVersioningMode[InheritableVersioningMode["Option3"] = 3] = "Option3";
    })(Enums.InheritableVersioningMode || (Enums.InheritableVersioningMode = {}));
    var InheritableVersioningMode = Enums.InheritableVersioningMode;
    (function (ApprovingMode) {
        ApprovingMode[ApprovingMode["Option0"] = 0] = "Option0";
        ApprovingMode[ApprovingMode["Option1"] = 1] = "Option1";
        ApprovingMode[ApprovingMode["Option2"] = 2] = "Option2";
    })(Enums.ApprovingMode || (Enums.ApprovingMode = {}));
    var ApprovingMode = Enums.ApprovingMode;
    (function (InheritableApprovingMode) {
        InheritableApprovingMode[InheritableApprovingMode["Option0"] = 0] = "Option0";
        InheritableApprovingMode[InheritableApprovingMode["Option1"] = 1] = "Option1";
        InheritableApprovingMode[InheritableApprovingMode["Option2"] = 2] = "Option2";
    })(Enums.InheritableApprovingMode || (Enums.InheritableApprovingMode = {}));
    var InheritableApprovingMode = Enums.InheritableApprovingMode;
    (function (SavingState) {
        SavingState[SavingState["Finalized"] = 0] = "Finalized";
        SavingState[SavingState["Creating"] = 1] = "Creating";
        SavingState[SavingState["Modifying"] = 2] = "Modifying";
        SavingState[SavingState["ModifyingLocked"] = 3] = "ModifyingLocked";
    })(Enums.SavingState || (Enums.SavingState = {}));
    var SavingState = Enums.SavingState;
    (function (Language) {
        Language[Language["Magyar"] = 0] = "Magyar";
        Language[Language["English"] = 1] = "English";
        Language[Language["Deutsch"] = 2] = "Deutsch";
    })(Enums.Language || (Enums.Language = {}));
    var Language = Enums.Language;
    (function (EnableAutofilters) {
        EnableAutofilters[EnableAutofilters["Default"] = 0] = "Default";
        EnableAutofilters[EnableAutofilters["Enabled"] = 1] = "Enabled";
        EnableAutofilters[EnableAutofilters["Disabled"] = 2] = "Disabled";
    })(Enums.EnableAutofilters || (Enums.EnableAutofilters = {}));
    var EnableAutofilters = Enums.EnableAutofilters;
    (function (EnableLifespanFilter) {
        EnableLifespanFilter[EnableLifespanFilter["Default"] = 0] = "Default";
        EnableLifespanFilter[EnableLifespanFilter["Enabled"] = 1] = "Enabled";
        EnableLifespanFilter[EnableLifespanFilter["Disabled"] = 2] = "Disabled";
    })(Enums.EnableLifespanFilter || (Enums.EnableLifespanFilter = {}));
    var EnableLifespanFilter = Enums.EnableLifespanFilter;
    (function (DeleteInstanceAfterFinished) {
        DeleteInstanceAfterFinished[DeleteInstanceAfterFinished["DeleteWhenCompleted"] = 0] = "DeleteWhenCompleted";
        DeleteInstanceAfterFinished[DeleteInstanceAfterFinished["DeleteWhenCompletedOrAborted"] = 1] = "DeleteWhenCompletedOrAborted";
        DeleteInstanceAfterFinished[DeleteInstanceAfterFinished["AlwaysKeep"] = 2] = "AlwaysKeep";
    })(Enums.DeleteInstanceAfterFinished || (Enums.DeleteInstanceAfterFinished = {}));
    var DeleteInstanceAfterFinished = Enums.DeleteInstanceAfterFinished;
    (function (GroupAttachments) {
        GroupAttachments[GroupAttachments["email"] = 0] = "email";
        GroupAttachments[GroupAttachments["root"] = 1] = "root";
        GroupAttachments[GroupAttachments["subject"] = 2] = "subject";
        GroupAttachments[GroupAttachments["sender"] = 3] = "sender";
    })(Enums.GroupAttachments || (Enums.GroupAttachments = {}));
    var GroupAttachments = Enums.GroupAttachments;
    (function (SelectionMode) {
        SelectionMode[SelectionMode["Random"] = 0] = "Random";
        SelectionMode[SelectionMode["First"] = 1] = "First";
    })(Enums.SelectionMode || (Enums.SelectionMode = {}));
    var SelectionMode = Enums.SelectionMode;
    (function (OrderingMode) {
        OrderingMode[OrderingMode["DefaultOrder"] = 0] = "DefaultOrder";
        OrderingMode[OrderingMode["ValidityOrder"] = 1] = "ValidityOrder";
    })(Enums.OrderingMode || (Enums.OrderingMode = {}));
    var OrderingMode = Enums.OrderingMode;
    (function (SiteLanguage) {
        SiteLanguage[SiteLanguage["En"] = 0] = "En";
        SiteLanguage[SiteLanguage["Hu"] = 1] = "Hu";
    })(Enums.SiteLanguage || (Enums.SiteLanguage = {}));
    var SiteLanguage = Enums.SiteLanguage;
    (function (UserLanguage) {
        UserLanguage[UserLanguage["En"] = 0] = "En";
        UserLanguage[UserLanguage["Hu"] = 1] = "Hu";
    })(Enums.UserLanguage || (Enums.UserLanguage = {}));
    var UserLanguage = Enums.UserLanguage;
    (function (RegisteredUserLanguage) {
        RegisteredUserLanguage[RegisteredUserLanguage["En"] = 0] = "En";
        RegisteredUserLanguage[RegisteredUserLanguage["Hu"] = 1] = "Hu";
    })(Enums.RegisteredUserLanguage || (Enums.RegisteredUserLanguage = {}));
    var RegisteredUserLanguage = Enums.RegisteredUserLanguage;
    (function (NotificationMode) {
        NotificationMode[NotificationMode["Email"] = 0] = "Email";
        NotificationMode[NotificationMode["EmailDigest"] = 1] = "EmailDigest";
        NotificationMode[NotificationMode["None"] = 2] = "None";
    })(Enums.NotificationMode || (Enums.NotificationMode = {}));
    var NotificationMode = Enums.NotificationMode;
    (function (EventType) {
        EventType[EventType["Deadline"] = 0] = "Deadline";
        EventType[EventType["Meeting"] = 1] = "Meeting";
        EventType[EventType["Demo"] = 2] = "Demo";
    })(Enums.EventType || (Enums.EventType = {}));
    var EventType = Enums.EventType;
    (function (Style) {
        Style[Style["Sedan"] = 0] = "Sedan";
        Style[Style["Coupe"] = 1] = "Coupe";
        Style[Style["Cabrio"] = 2] = "Cabrio";
        Style[Style["Roadster"] = 3] = "Roadster";
        Style[Style["SUV"] = 4] = "SUV";
        Style[Style["Van"] = 5] = "Van";
    })(Enums.Style || (Enums.Style = {}));
    var Style = Enums.Style;
    (function (MemoType) {
        MemoType[MemoType["generic"] = 0] = "generic";
        MemoType[MemoType["iso"] = 1] = "iso";
        MemoType[MemoType["iaudit"] = 2] = "iaudit";
    })(Enums.MemoType || (Enums.MemoType = {}));
    var MemoType = Enums.MemoType;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
        VerticalAlignment[VerticalAlignment["Middle"] = 1] = "Middle";
        VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
    })(Enums.VerticalAlignment || (Enums.VerticalAlignment = {}));
    var VerticalAlignment = Enums.VerticalAlignment;
    (function (HorizontalAlignment) {
        HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
        HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
        HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
    })(Enums.HorizontalAlignment || (Enums.HorizontalAlignment = {}));
    var HorizontalAlignment = Enums.HorizontalAlignment;
    (function (Priority) {
        Priority[Priority["Option0"] = 0] = "Option0";
        Priority[Priority["Option1"] = 1] = "Option1";
        Priority[Priority["Option2"] = 2] = "Option2";
    })(Enums.Priority || (Enums.Priority = {}));
    var Priority = Enums.Priority;
    (function (Status) {
        Status[Status["pending"] = 0] = "pending";
        Status[Status["active"] = 1] = "active";
        Status[Status["completed"] = 2] = "completed";
        Status[Status["deferred"] = 3] = "deferred";
        Status[Status["waiting"] = 4] = "waiting";
    })(Enums.Status || (Enums.Status = {}));
    var Status = Enums.Status;
    (function (Result) {
        Result[Result["Approved"] = 0] = "Approved";
        Result[Result["Rejected"] = 1] = "Rejected";
    })(Enums.Result || (Enums.Result = {}));
    var Result = Enums.Result;
    (function (WebContentDemoLanguage) {
        WebContentDemoLanguage[WebContentDemoLanguage["English"] = 0] = "English";
    })(Enums.WebContentDemoLanguage || (Enums.WebContentDemoLanguage = {}));
    var WebContentDemoLanguage = Enums.WebContentDemoLanguage;
    (function (QueryType) {
        QueryType[QueryType["Public"] = 0] = "Public";
        QueryType[QueryType["Private"] = 1] = "Private";
    })(Enums.QueryType || (Enums.QueryType = {}));
    var QueryType = Enums.QueryType;
    (function (Frequency) {
        Frequency[Frequency["Option0"] = 0] = "Option0";
        Frequency[Frequency["Option1"] = 1] = "Option1";
        Frequency[Frequency["Option2"] = 2] = "Option2";
        Frequency[Frequency["Option3"] = 3] = "Option3";
    })(Enums.Frequency || (Enums.Frequency = {}));
    var Frequency = Enums.Frequency;
    (function (SubscriptionLanguage) {
        SubscriptionLanguage[SubscriptionLanguage["en"] = 0] = "en";
        SubscriptionLanguage[SubscriptionLanguage["hu"] = 1] = "hu";
    })(Enums.SubscriptionLanguage || (Enums.SubscriptionLanguage = {}));
    var SubscriptionLanguage = Enums.SubscriptionLanguage;
    (function (Gender) {
        Gender[Gender["Option0"] = 0] = "Option0";
        Gender[Gender["Female"] = 1] = "Female";
        Gender[Gender["Male"] = 2] = "Male";
    })(Enums.Gender || (Enums.Gender = {}));
    var Gender = Enums.Gender;
    (function (MaritalStatus) {
        MaritalStatus[MaritalStatus["Option0"] = 0] = "Option0";
        MaritalStatus[MaritalStatus["Single"] = 1] = "Single";
        MaritalStatus[MaritalStatus["Married"] = 2] = "Married";
    })(Enums.MaritalStatus || (Enums.MaritalStatus = {}));
    var MaritalStatus = Enums.MaritalStatus;
    (function (WorkflowStatus) {
        WorkflowStatus[WorkflowStatus["Created"] = 0] = "Created";
        WorkflowStatus[WorkflowStatus["Running"] = 1] = "Running";
        WorkflowStatus[WorkflowStatus["Aborted"] = 2] = "Aborted";
        WorkflowStatus[WorkflowStatus["Completed"] = 3] = "Completed";
    })(Enums.WorkflowStatus || (Enums.WorkflowStatus = {}));
    var WorkflowStatus = Enums.WorkflowStatus;
    (function (RegistrationType) {
        RegistrationType[RegistrationType["client"] = 0] = "client";
        RegistrationType[RegistrationType["media"] = 1] = "media";
        RegistrationType[RegistrationType["community"] = 2] = "community";
        RegistrationType[RegistrationType["public"] = 3] = "public";
    })(Enums.RegistrationType || (Enums.RegistrationType = {}));
    var RegistrationType = Enums.RegistrationType;
})(Enums = exports.Enums || (exports.Enums = {}));

//# sourceMappingURL=Enums.js.map
