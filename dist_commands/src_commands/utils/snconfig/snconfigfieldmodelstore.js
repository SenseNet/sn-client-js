"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SnConfigFieldModelStore {
    static Add(newModel) {
        if (this.Contains(newModel.FieldName)) {
            throw new Error(`Field ${newModel.FieldName} for configuration model already in the store!`);
        }
        this._store[newModel.FieldName] = newModel;
    }
    static Get(fieldName) {
        let found = this._store[fieldName];
        if (!found) {
            throw new Error(`No entry found with the field name '${fieldName}'`);
        }
        return this._store[fieldName];
    }
    static Contains(fieldName) {
        let found = this._store[fieldName];
        return found !== undefined;
    }
}
SnConfigFieldModelStore._store = [];
exports.SnConfigFieldModelStore = SnConfigFieldModelStore;

//# sourceMappingURL=snconfigfieldmodelstore.js.map
