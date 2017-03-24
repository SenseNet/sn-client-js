import { SnConfigFieldModel, SnConfigFieldModelStore } from './';

/**
 * This function has to be used in the SnConfigModel class to provide additional metadata for the SnConfig fields
 * @param model {SnConfigFieldModel} The field model parameters
 * @returns {function(SnConfigModel)} A factory method which fills the SnConfigModelStore with for the decorated field with the provided field model data
 */
export function SnConfigField(model: SnConfigFieldModel) {
    return function (target: any, propertyName: string) {
        model.FieldName = propertyName;
        SnConfigFieldModelStore.Add(model);
    }
}