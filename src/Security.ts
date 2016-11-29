/**
 * Module for security related stuff
 */
export module Security {

    /**
     * Provides metadata about identity kind.
    */
    export enum IdentityKind { All, Users, Groups, OrganizationalUnits, UsersAndGroups, UsersAndOrganizationalUnits, GroupsAndOrganizationalUnits }
    /**
     * Provides metadata about permission level.
    */
    export enum PermissionLevel { AllowedOrDenied, Allowed, Denied }
    /**
    * Type to provide an Object with the permission information that has to be set.
    */
    export class PermissionRequestBody {
        identity: string;
        localOnly?: boolean;
        RestrictedPreview?: PermissionValues;
        PreviewWithoutWatermakr?: PermissionValues;
        PreviewWithoutRedaction?: PermissionValues;
        Open?: PermissionValues;
        OpenMinor?: PermissionValues;
        Save?: PermissionValues;
        Publish?: PermissionValues;
        ForceUndoCheckout?: PermissionValues;
        AddNew?: PermissionValues;
        Approve?: PermissionValues;
        Delete?: PermissionValues;
        RecallOldVersion?: PermissionValues;
        DeleteOldVersion?: PermissionValues;
        SeePermissions?: PermissionValues;
        SetPermissions?: PermissionValues;
        RunApplication?: PermissionValues;
        ManageListsAndWorkspaces?: PermissionValues;
        TakeOwnership?: PermissionValues;
        Custom01?: PermissionValues;
        Custom02?: PermissionValues;
        Custom03?: PermissionValues;
        Custom04?: PermissionValues;
        Custom05?: PermissionValues;
        Custom06?: PermissionValues;
        Custom07?: PermissionValues;
        Custom08?: PermissionValues;
        Custom09?: PermissionValues;
        Custom10?: PermissionValues;
        Custom11?: PermissionValues;
        Custom12?: PermissionValues;
        Custom13?: PermissionValues;
        Custom14?: PermissionValues;
    }
    /**
     * Provides metadata about permission values.
    */
    export enum PermissionValues { undefined = 0, allow = 1, deny = 2 }

    /**
     * Provides metadata about permission inheritance.
     */
    export enum Inheritance {'break', 'unbreak'};

}