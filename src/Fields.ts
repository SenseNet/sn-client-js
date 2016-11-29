export module Fields {

    export class ChoiceOption {
        Value: string;
        Text: string;
        Enabled: boolean;
        Selected: boolean;

        constructor(value: string, text?: string, enabled?: boolean, selected?: boolean) {
            this.Value = value;
            this.Text = text;
            this.Enabled = enabled;
            this.Selected = selected;
        }
    }

    export interface DeferredUriObject {
        uri: string;
    }

    export interface DeferredObject extends Object {
        __deferred: DeferredUriObject;
    }

    export interface MediaObject {
        edit_media: string;
        media_src: string;
        content_type: string;
        media_etag: string,
    }

    export interface MediaResourceObject extends Object {
        __mediaresource: MediaObject;
    }

    export enum SavedQueryType { Public, Private, NonDefined }
}