import { SnConfigFieldModel } from './snconfigfieldmodel';
import { SnConfigFieldModelStore } from './snconfigfieldmodelstore';

export function SnConfigField(model: SnConfigFieldModel) {
    return function (target: any, propertyName: string) {
        model.FieldName = propertyName;
        SnConfigFieldModelStore.Add(model);
    }
}