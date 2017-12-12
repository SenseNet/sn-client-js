/**
 * @module Config
 *//** */

import { SnConfigBehavior } from './snconfigbehavior';
import { SnConfigFieldModel } from './snconfigfieldmodel';

/**
 * Class that stores the model data for the SnConfigModel's fields, it's values are, filled by the SnConfigField decorator.
 */
export class SnConfigFieldModelStore {

    /**
     * An array that contains the field definitions.
     */
    private static _store: Map<string, SnConfigFieldModel> = new Map();

    /**
     * Adds a new model to the store
     * @param newModel {SnConfigFieldModel} The field model to be added
     * @throws error if a field with the same name already exists
     */
    public static Add(newModel: SnConfigFieldModel) {
        if (!newModel.StoreKey) {
            throw Error('No Store key defined');
        }
        if (this.Contains(newModel.StoreKey)) {
            throw new Error(`Field ${newModel.StoreKey} for configuration model already in the store!`);
        }
        this._store.set(newModel.StoreKey, newModel);
    }

    /**
     * Returns an entry for the specified field
     * @param fieldName {string} The field's name to search for
     * @throws error {error} if the store doesn't contain entry for the field.
     */
    public static Get(storeKey: string): SnConfigFieldModel {
        const found = this._store.get(storeKey);
        if (!found) {
            throw new Error(`No entry found with the field name '${storeKey}'`);
        }
        return found;
    }

    /**
     * Checks if the store contains value with the specified field
     * @param fieldName fieldName {string} The field's name to search for
     */
    public static Contains(fieldName: string): boolean {
        return this._store.has(fieldName);
    }

    /**
     * Gets the fields which are available for command line option input
     * @returns {SnCofigFieldModel[]} The listof the fields
     */
    public static GetCommandOptions(): SnConfigFieldModel[] {
        const items: SnConfigFieldModel[] = [];
        for (const field in this._store) {
            const found = this._store.get(field);
            if (field && found && (found.Behavior & SnConfigBehavior.AllowFromCommandLine) === SnConfigBehavior.AllowFromCommandLine) {
                items.push(found);
            }
        }
        return items;
    }
}
