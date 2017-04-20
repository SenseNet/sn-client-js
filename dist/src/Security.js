"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdentityKind;
(function (IdentityKind) {
    IdentityKind[IdentityKind["All"] = 0] = "All";
    IdentityKind[IdentityKind["Users"] = 1] = "Users";
    IdentityKind[IdentityKind["Groups"] = 2] = "Groups";
    IdentityKind[IdentityKind["OrganizationalUnits"] = 3] = "OrganizationalUnits";
    IdentityKind[IdentityKind["UsersAndGroups"] = 4] = "UsersAndGroups";
    IdentityKind[IdentityKind["UsersAndOrganizationalUnits"] = 5] = "UsersAndOrganizationalUnits";
    IdentityKind[IdentityKind["GroupsAndOrganizationalUnits"] = 6] = "GroupsAndOrganizationalUnits";
})(IdentityKind = exports.IdentityKind || (exports.IdentityKind = {}));
var PermissionLevel;
(function (PermissionLevel) {
    PermissionLevel[PermissionLevel["AllowedOrDenied"] = 0] = "AllowedOrDenied";
    PermissionLevel[PermissionLevel["Allowed"] = 1] = "Allowed";
    PermissionLevel[PermissionLevel["Denied"] = 2] = "Denied";
})(PermissionLevel = exports.PermissionLevel || (exports.PermissionLevel = {}));
class PermissionRequestBody {
}
exports.PermissionRequestBody = PermissionRequestBody;
var PermissionValues;
(function (PermissionValues) {
    PermissionValues[PermissionValues["undefined"] = 0] = "undefined";
    PermissionValues[PermissionValues["allow"] = 1] = "allow";
    PermissionValues[PermissionValues["deny"] = 2] = "deny";
})(PermissionValues = exports.PermissionValues || (exports.PermissionValues = {}));
var Inheritance;
(function (Inheritance) {
    Inheritance[Inheritance["break"] = 0] = "break";
    Inheritance[Inheritance["unbreak"] = 1] = "unbreak";
})(Inheritance = exports.Inheritance || (exports.Inheritance = {}));
;
//# sourceMappingURL=Security.js.map