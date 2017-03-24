import { SnConfigReader } from './utils/snconfig';
import { Download } from './utils/download';
import { NpmExecutor } from './utils/npmexecutor';
import * as AdmZip from 'adm-zip';
import * as Path from 'path';

/**
 * Executeable node.js file for fetching / updating pre-generated Typescript proxy classes from a Sense/Net Content Repository
 */

const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';

(async () => {

    console.log('Sn-Fetch-Types starting...');
    console.log('Checking sn.config.js...');

    let cfg = await new SnConfigReader(process.cwd())
        .ValidateAsync('RepositoryUrl', 'UserName', 'Password');
    console.log('Downloading type definitions...');

    let zipBuffer = await new Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();

    let zip = new AdmZip(zipBuffer);
    console.log('Download completed, extracting...');
    zip.extractAllTo(`${__dirname}${Path.sep}..${Path.sep}..${Path.sep}src`, true);
    console.log('Files extracted, running Build...');

    let result = new NpmExecutor(__dirname).Run('gulp');

    console.log('All done.');

    process.exit(0);
})()