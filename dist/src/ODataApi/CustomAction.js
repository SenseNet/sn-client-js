"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAction {
    constructor(options) {
        this.params = [];
        this.requiredParams = [];
        this.isAction = false;
        this.noCache = false;
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
exports.CustomAction = CustomAction;
class CustomContentAction extends CustomAction {
    constructor(options) {
        if (!options.id && !options.path) {
            throw Error('Content.Id or Content.Path is required for this action');
        }
        super(options);
    }
}
exports.CustomContentAction = CustomContentAction;
//# sourceMappingURL=CustomAction.js.map