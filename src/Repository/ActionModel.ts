/**
 * @module Repository
 * @preferred
 *
 * @description This module contains a Content Action model for sensenet ECM
 */ /** */

export class ActionModel {
        public Name: string;
        public DisplayName: string;
        public Index: number;
        public Icon: string;
        public Url: string;
        public IncludeBackUrl: number;
        public ClientAction: boolean;
        public Forbidden: boolean;
}
