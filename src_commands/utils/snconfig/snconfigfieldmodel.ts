import { SnConfigBehavior } from './snconfigbehavior'

/**
 * Class that represents a model for a field in the SnConfig (usually sn.config.js) module file
 */
export class SnConfigFieldModel {
    /**
     * The name of the field
     */
    public FieldName?: string;

    /**
     * The question to be asked when the field is needed but not provided
     */
    public Question: string;

    /**
     * The behavoir of the field
     * @default SnConfigBehavior.Default
     */
    public Behavior: SnConfigBehavior = SnConfigBehavior.Default;
}