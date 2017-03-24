import { SnConfigFieldModel } from './snconfigfieldmodel';

/**
 * Class that stores the model data for the SnConfigModel's fields, filled by the SnConfigField decorator
 */
export class SnConfigFieldModelStore {

    /**
     * An array that contains the field definitions
     */
    private static _store: SnConfigFieldModel[] = [];


    /**
     * Adds a new model to the store
     * @param newModel {SnConfigFieldModel} The field model to be added
     * @throws error {Error} if a field with the same name already exists
     */
    public static Add(newModel: SnConfigFieldModel) {
        if (this.Contains(newModel.FieldName)) {
            throw new Error(`Field ${newModel.FieldName} for configuration model already in the store!`)
        }
        this._store[newModel.FieldName] = newModel;
    }

    /**
     * Returns an entry for the specified field
     * @param fieldName {string} The field's name to search for
     * @throws error {error} if the store doesn't contain entry for the field.
     */
    public static Get(fieldName: string): SnConfigFieldModel {
        let found = this._store[fieldName];
        if (!found) {
            throw new Error(`No entry found with the field name '${fieldName}'`);
        }
        return this._store[fieldName];
    }


    /**
     * Checks if the store contains value with the specified field
     * @param fieldName fieldName {string} The field's name to search for
     */
    public static Contains(fieldName: string): boolean {
        let found = this._store[fieldName];
        return found !== undefined;
    }
}