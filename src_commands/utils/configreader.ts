import { SnConfigModel } from './snconfigmodel';
import { SnConfigFieldModelStore } from './snconfigfieldmodelstore';
import { Ask } from './ask';
import * as Path from 'path';


const SN_CONFIG_NAME = 'sn.config.js';

/**
 * This class reads, verifies and extends a configuration file from the specified project directory.
 */
export class ConfigReader {

    private config: SnConfigModel = new SnConfigModel;

    /**
     * @constructs SnConfigReader
     * @param projectDirectory {string} The directory to look sn.config.js for
     */
    constructor(private projectDirectory: string) { }

    /**
     * Reads an sn.config.js file from the project directory, warns the user if there is no sn.config.js available
     * @returns {Promise<any>} An awaitable promise that will be resolved when the reading is completed or the new Config model is constructed.
     */
    private async ReadConfigFile(): Promise<any> {
        let cfg: SnConfigModel;
        try {
            cfg = require(this.projectDirectory + Path.sep + SN_CONFIG_NAME);
        } catch (error) {
            console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
            cfg = new SnConfigModel();
        }
        this.config = cfg;
    }

    /**
     * Validates a specified option set and asks the user if there are some missing option values
     * @param requiredValues An array of tuples containing a key for the config and a string that will be a question to be asked if the value is missing and needs to be provided.
     * @returns {Promise<Readonly<SnConfigModel>>} An awaitable promise with the readonly SnAdminConfigModel that will contain all specified values
     */
    public async ValidateAsync<K extends keyof SnConfigModel>(...requiredValues: K[]): Promise<Readonly<SnConfigModel>> {
        await this.ReadConfigFile();
        for (let fieldName of requiredValues) {
            let fieldModel = SnConfigFieldModelStore.Get(fieldName);
            let value = this.config[fieldModel.FieldName];
            if (!value || !value.length || fieldModel.Type === 'ConsoleOnly') {
                this.config[fieldModel.FieldName] =
                    (fieldModel.Type === 'Password')
                        ?
                        await Ask.PasswordAsync(fieldModel.Question) :
                        await Ask.TextAsync(fieldModel.Question);
            }
        }

        return this.config;
    }
}