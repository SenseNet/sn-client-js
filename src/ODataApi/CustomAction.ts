/**
 * @module ODataApi
 */ /** */

/**
 * Class that represents a custom OData Action
 */
export class CustomAction {
    name: string;
    id?: number;
    path?: string;
    params: string[] = [];
    requiredParams: string[] = [];
    isAction: boolean = false;
    noCache: boolean = false;
    constructor(options: ICustomActionOptions) {
        this.name = options.name;
        this.id = options.id;
        this.path = options.path;
        this.isAction = options.isAction || false;
        this.noCache = options.noCache || false;
        if (options.params) {
            for (let i = 0; i < options.params.length; i++) {
                this.params.push(options.params[i]);
            }
        }
        if (options.requiredParams) {
            for (let i = 0; i < options.requiredParams.length; i++) {
                this.params.push(options.requiredParams[i]);
            }
        }
    }
}

/**
 * Interface that represents an options to institiating a CustomAction or CustomContentAction
 */
export interface ICustomActionOptions {
    name: string;
    id?: number;
    path?: string;
    params?: string[];
    requiredParams?: string[];
    isAction?: boolean;
    noCache?: boolean;
}