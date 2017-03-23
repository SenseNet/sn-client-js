import { Ask, SnConfigModel } from '../utils';
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
    public async ValidateAsync<K extends keyof SnConfigModel>(requiredValues: [K, string][]): Promise<Readonly<SnConfigModel>> {
        await this.ReadConfigFile();

        for (let requiredValue of requiredValues) {
            let value = this.config[requiredValue[0]];
            if (!value || !value.length) {
                this.config[requiredValue[0]] = await Ask.TextAsync(requiredValue[1]);
            }
        }

        return this.config;
    }
}