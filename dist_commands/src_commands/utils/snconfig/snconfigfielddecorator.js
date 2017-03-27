"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
function SnConfigField(model) {
    return function (target, propertyName) {
        model.FieldName = propertyName;
        _1.SnConfigFieldModelStore.Add(model);
    };
}
exports.SnConfigField = SnConfigField;

//# sourceMappingURL=snconfigfielddecorator.js.map
