/**
 * @module Repository
 * @preferred
 * 
 * @description This module contains a Content Action model for sensenet ECM
 */ /** */

export class ActionModel {
        Name: string;
        DisplayName: string;
        Index: number
        Icon: string;
        Url: string;
        IncludeBackUrl: number;
        ClientAction: boolean;
        Forbidden: boolean;
}