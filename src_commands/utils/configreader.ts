import { Ask, SnConfigModel } from '../utils';
import * as Path from 'path';

const SN_CONFIG_NAME = 'sn.config.js';

export class ConfigReader {

    private config: SnConfigModel = new SnConfigModel;

    constructor(private projectDirectory: string) { }

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