/**
 * @module Repository
 */
/** */

// tslint:disable:naming-convention
import { IdentityKind } from '../Security';

export class PermissionIdentity {
    public id: number;
    public path: string;
    public name: string;
    public displayName: string;
    public domain: string;
    public kind: IdentityKind;
}

export class PermissionValue {
    public value: string;   // ToDo: to enum?
    public from: string;
    public identity: string;
}

export class PermissionEntry {
    public identity: PermissionIdentity;
    public propagates: boolean;
    public permissions: {
        See: PermissionValue | null,
        Preview: PermissionValue | null,
        PreviewWithoutWatermark: PermissionValue | null,
        PreviewWithoutRedaction: PermissionValue | null,
        Open: PermissionValue | null,
        OpenMinor: PermissionValue | null,
        Save: PermissionValue | null,
        Publish: PermissionValue | null,
        ForceCheckin: PermissionValue | null,
        AddNew: PermissionValue | null,
        Approve: PermissionValue | null,
        Delete: PermissionValue | null,
        RecallOldVersion: PermissionValue | null,
        DeleteOldVersion: PermissionValue | null,
        SeePermissions: PermissionValue | null,
        SetPermissions: PermissionValue | null,
        RunApplication: PermissionValue | null,
        ManageListsAndWorkspaces: PermissionValue | null,
        TakeOwnership: PermissionValue | null,
        Unused13: PermissionValue | null,
        Unused12: PermissionValue | null,
        Unused11: PermissionValue | null,
        Unused10: PermissionValue | null,
        Unused09: PermissionValue | null,
        Unused08: PermissionValue | null,
        Unused07: PermissionValue | null,
        Unused06: PermissionValue | null,
        Unused05: PermissionValue | null,
        Unused04: PermissionValue | null,
        Unused03: PermissionValue | null,
        Unused02: PermissionValue | null,
        Unused01: PermissionValue | null,
        Custom01: PermissionValue | null,
        Custom02: PermissionValue | null,
        Custom03: PermissionValue | null,
        Custom04: PermissionValue | null,
        Custom05: PermissionValue | null,
        Custom06: PermissionValue | null,
        Custom07: PermissionValue | null,
        Custom08: PermissionValue | null,
        Custom09: PermissionValue | null,
        Custom10: PermissionValue | null,
        Custom11: PermissionValue | null,
        Custom12: PermissionValue | null,
        Custom13: PermissionValue | null,
        Custom14: PermissionValue | null,
        Custom15: PermissionValue | null,
        Custom16: PermissionValue | null,
        Custom17: PermissionValue | null,
        Custom18: PermissionValue | null,
        Custom19: PermissionValue | null,
        Custom20: PermissionValue | null,
        Custom21: PermissionValue | null,
        Custom22: PermissionValue | null,
        Custom23: PermissionValue | null,
        Custom24: PermissionValue | null,
        Custom25: PermissionValue | null,
        Custom26: PermissionValue | null,
        Custom27: PermissionValue | null,
        Custom28: PermissionValue | null,
        Custom29: PermissionValue | null,
        Custom30: PermissionValue | null,
        Custom31: PermissionValue | null,
        Custom32: PermissionValue | null
    };
}

export class PermissionResponseModel {
    public id: number;
    public path: string;
    public inherits: boolean;
    public entries: PermissionEntry[];
}
