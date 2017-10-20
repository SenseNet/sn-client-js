/**
 * @module ODataApi
 */ /** */

 // tslint:disable:naming-convention

/**
 * Class that represents a custom OData Action
 */
export class CustomAction {
    public name: string;
    public id?: number;
    public path?: string;
    public params: string[] = [];
    public requiredParams: string[] = [];
    public isAction: boolean = false;
    public noCache: boolean = false;
    constructor(options: ICustomActionOptions) {
        this.name = options.name;
        this.id = options.id;
        this.path = options.path;
        this.isAction = options.isAction || false;
        this.noCache = options.noCache || false;
        if (options.params) {
            this.params = this.params.concat(options.params);
        }
        if (options.requiredParams) {
            this.params = this.params.concat(options.requiredParams);
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
