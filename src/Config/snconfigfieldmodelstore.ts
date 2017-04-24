import { SnConfigBehavior } from './snconfigbehavior';
import { SnConfigFieldModel } from './snconfigfieldmodel';

/**
 * Class that stores the model data for the SnConfigModel's fields, it's values are, filled by the SnConfigField decorator.
 */
export class SnConfigFieldModelStore {

    /**
     * An array that contains the field definitions.
     */
    private static store: SnConfigFieldModel[] = [];

    /**
     * Adds a new model to the store
     * @param newModel {SnConfigFieldModel} The field model to be added
     * @throws error if a field with the same name already exists
     */
    public static Add(newModel: SnConfigFieldModel) {
        if (this.Contains(newModel.StoreKey)) {
            throw new Error(`Field ${newModel.StoreKey} for configuration model already in the store!`);
        }
        this.store[newModel.StoreKey] = newModel;
    }

    /**
     * Returns an entry for the specified field
     * @param fieldName {string} The field's name to search for
     * @throws error {error} if the store doesn't contain entry for the field.
     */
    public static Get(storeKey: string): SnConfigFieldModel {
        const found = this.store[storeKey];
        if (!found) {
            throw new Error(`No entry found with the field name '${storeKey}'`);
        }
        return this.store[storeKey];
    }

    /**
     * Checks if the store contains value with the specified field
     * @param fieldName fieldName {string} The field's name to search for
     */
    public static Contains(fieldName: string): boolean {
        const found = this.store[fieldName];
        return found !== undefined;
    }

    /**
     * Gets the fields which are available for command line option input
     * @returns {SnCofigFieldModel[]} The listof the fields
     */
    public static GetCommandOptions(): SnConfigFieldModel[] {
        const items: SnConfigFieldModel[] = [];
        for (const field in this.store) {
            if (field && (this.store[field].Behavior & SnConfigBehavior.AllowFromCommandLine) === SnConfigBehavior.AllowFromCommandLine) {
                items.push(this.store[field]);
            }
        }
        return items;
    }
}
