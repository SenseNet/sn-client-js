"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snconfigfieldmodelstore_1 = require("./snconfigfieldmodelstore");
function SnConfigField(model) {
    return function (target, propertyName) {
        model.FieldName = propertyName;
        snconfigfieldmodelstore_1.SnConfigFieldModelStore.Add(model);
    };
}
exports.SnConfigField = SnConfigField;
//# sourceMappingURL=snconfigfielddecorator.js.map