"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnConfigFieldModelStore {
    static Add(newModel) {
        if (this.Get(newModel.FieldName)) {
            throw new Error(`Field ${newModel.FieldName} for configuration model already in the store!`);
        }
        this._store.push(newModel);
    }
    static Get(fieldName) {
        return this._store.find(item => item.FieldName === fieldName);
    }
}
SnConfigFieldModelStore._store = [];
exports.SnConfigFieldModelStore = SnConfigFieldModelStore;
//# sourceMappingURL=snconfigfieldmodelstore.js.map