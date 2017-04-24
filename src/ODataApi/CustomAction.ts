/**
 * @module ODataApi
 */ /** */

/**
 * Class that represents a custom action that is not bounded to a specified content
 */
export class CustomAction {
    name: string;
    id: number;
    path: string;
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
 * Class that represents a custom action that bounds to a specified content, that has to be identified by its Id or Path
 */
export class CustomContentAction extends CustomAction {

    /**
     * @constructs {CustomContentAction}
     * @param options The custom action options
     * @throws {Error} if the Id or Path is not provided
     */
    constructor(options: ICustomActionOptions) {
        if (!options.id && !options.path) {
            throw Error('Content.Id or Content.Path is required for this action');
        }
        super(options);

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