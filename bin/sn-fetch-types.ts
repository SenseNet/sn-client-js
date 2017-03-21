import * as Path from 'path';
import * as Prompt from 'prompt';
import * as FileSystem from 'fs';

class SnConfig {
    RepositoryUrl: string;
    UserName?: string;
    Password?: string;
}

const REPOSITORY_URL_POSTFIX = 'Root/System/Schema/Metadata/TypeScript/meta.zip'

class Config {

    private static async ReadConfigFile(): Promise<SnConfig> {
        let cfg: SnConfig;

        try {
            cfg = require(cwd + Path.sep + 'sn.config.js');
        } catch (error) {
            console.log('There was an error opening sn.config.js: ', error);
        }
        return cfg;
    }

    private static async Ask(question: string, hide: boolean = false): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            Prompt.start();
            Prompt.get([
                {
                    name: question,
                    required: true,
                    hidden: hide
                }
            ], (err, res) => {
                resolve(res[question]);
            })
        });
    }

    public static async Create(): Promise<SnConfig> {
        let cfg = await this.ReadConfigFile();
        if (!cfg.RepositoryUrl) {
            cfg.RepositoryUrl = await this.Ask('Please enter your Sense/Net Site URL(e.g.: http://www.my-awesome-sensenet-portal.net/');
        }
        if (!cfg.UserName) {
            cfg.UserName = await this.Ask('Please enter the admin username: ');
        }
        if (!cfg.Password) {
            cfg.Password = await this.Ask('Please enter the admin password: ', true);
        }

        return cfg;
    }
}

console.log('Sn-Fetch-Types starting...');

let path = Path.parse(__dirname);
let cwd = process.cwd();

console.log(`The current working directory is: ${cwd}`);
console.log('Reading Config file...');


/* ToDo: enter manual data */

let cfg = Config.Create().then(cfg => {
    console.log(cfg);
    process.exit(0);
});