"use strict";
var Security;
(function (Security) {
    (function (IdentityKind) {
        IdentityKind[IdentityKind["All"] = 0] = "All";
        IdentityKind[IdentityKind["Users"] = 1] = "Users";
        IdentityKind[IdentityKind["Groups"] = 2] = "Groups";
        IdentityKind[IdentityKind["OrganizationalUnits"] = 3] = "OrganizationalUnits";
        IdentityKind[IdentityKind["UsersAndGroups"] = 4] = "UsersAndGroups";
        IdentityKind[IdentityKind["UsersAndOrganizationalUnits"] = 5] = "UsersAndOrganizationalUnits";
        IdentityKind[IdentityKind["GroupsAndOrganizationalUnits"] = 6] = "GroupsAndOrganizationalUnits";
    })(Security.IdentityKind || (Security.IdentityKind = {}));
    var IdentityKind = Security.IdentityKind;
    (function (PermissionLevel) {
        PermissionLevel[PermissionLevel["AllowedOrDenied"] = 0] = "AllowedOrDenied";
        PermissionLevel[PermissionLevel["Allowed"] = 1] = "Allowed";
        PermissionLevel[PermissionLevel["Denied"] = 2] = "Denied";
    })(Security.PermissionLevel || (Security.PermissionLevel = {}));
    var PermissionLevel = Security.PermissionLevel;
    class PermissionRequestBody {
    }
    Security.PermissionRequestBody = PermissionRequestBody;
    (function (PermissionValues) {
        PermissionValues[PermissionValues["undefined"] = 0] = "undefined";
        PermissionValues[PermissionValues["allow"] = 1] = "allow";
        PermissionValues[PermissionValues["deny"] = 2] = "deny";
    })(Security.PermissionValues || (Security.PermissionValues = {}));
    var PermissionValues = Security.PermissionValues;
    (function (Inheritance) {
        Inheritance[Inheritance['break'] = 0] = 'break';
        Inheritance[Inheritance['unbreak'] = 1] = 'unbreak';
    })(Security.Inheritance || (Security.Inheritance = {}));
    var Inheritance = Security.Inheritance;
    ;
})(Security = exports.Security || (exports.Security = {}));

//# sourceMappingURL=Security.js.map
