import { Ask, Download, ConfigReader } from '../utils';
import * as AdmZip from 'adm-zip';

/**
 * Executeable node.js file for fetching / updating pre-generated Typescript proxy classes from a Sense/Net Content Repository
 */

const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';

(async () => {

    console.log('Sn-Fetch-Types starting...');
    console.log('Checking sn.config.js...');

    let cfg = await new ConfigReader(process.cwd())
                .ValidateAsync([
                    ['RepositoryUrl', 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com): '],
                    ['UserName', 'Please enter the admin username: '],
                    ['Password', 'Please enter the password for the user: ']
                ]);
    console.log('Downloading type definitions...');

    let zipBuffer = await new Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();

    let zip = new AdmZip(zipBuffer);
    console.log('Download completed, extracting...');

    process.exit(0);
})()