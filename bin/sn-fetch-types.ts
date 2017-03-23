import * as Path from 'path';
import * as Prompt from 'prompt';
import * as FileSystem from 'fs';
import * as Http from 'http';
import * as File from 'fs';
import * as Stream from 'stream';
import * as AdmZip from 'adm-zip';

class SnConfig {
    RepositoryUrl: string;
    UserName?: string;
    Password?: string;
}

const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip'
const SN_CONFIG_NAME = 'sn.config.js';
const SN_TEMPDIR_NAME = 'sntmp';

class Config {

    private static async ReadConfigFile(): Promise<SnConfig> {
        let cfg: SnConfig;

        try {
            cfg = require(cwd + Path.sep + SN_CONFIG_NAME);
        } catch (error) {
            console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
            cfg = new SnConfig();
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

class TypeDownloader {
    public static async Fetch(cfg: SnConfig): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            let filePath = `./${SN_TEMPDIR_NAME}/meta.zip`;
            let auth = 'Basic ' + new Buffer(`${cfg.UserName}:${cfg.Password}`).toString('base64');
            let headers = {
                'Authorization': auth,
            };
            Http.get({
                host: cfg.RepositoryUrl,
                path: SN_REPOSITORY_URL_POSTFIX,
                headers: headers,
            }, (response: Http.IncomingMessage) => {

                if (response.readable) {
                    let data = [];
                    let contentLength: number = parseInt(response.headers['content-length']);
                    response.on('data', chunk => {
                        data.push(chunk);
                    })

                    response.on('end', () => {
                        let pos = 0;
                        let buffer = new Buffer(contentLength);
                        data.forEach(chunk => {
                            chunk.copy(buffer, pos);
                            pos += chunk.length;
                        });
                        resolve(buffer);
                    });
                }
                else {
                    reject();
                }
            })
        });
    }

}

console.log('Sn-Fetch-Types starting...');

let path = Path.parse(__dirname);
let cwd = process.cwd();

console.log(`The current working directory is: ${cwd}`);
console.log('Reading Config file...');

let cfg = Config.Create().then(async cfg => {
    let zipBuffer = await TypeDownloader.Fetch(cfg);

    let zip = new AdmZip(zipBuffer);

    process.exit(0);
});