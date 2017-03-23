import { SnConfigFieldModel } from './snconfigfieldmodel';

export class SnConfigFieldModelStore {
    private static _store: SnConfigFieldModel[] = [];
    public static Add(newModel: SnConfigFieldModel) {
        if (this.Get(newModel.FieldName)) {
            throw new Error(`Field ${newModel.FieldName} for configuration model already in the store!`)
        }
        this._store.push(newModel);
    }

    public static Get(fieldName: string): SnConfigFieldModel {
        return this._store.find(item => item.FieldName === fieldName);
    }
}