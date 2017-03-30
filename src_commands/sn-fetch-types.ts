import { SnConfigReader } from './utils/snconfig';
import { Download, Stage, PathHelper } from './utils';
import * as AdmZip from 'adm-zip';
import * as Path from 'path';

/**
 * Executeable node.js file for fetching / updating pre-generated Typescript proxy classes from a Sense/Net Content Repository
 */

const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';

(async () => {

    console.log('Sn-Fetch-Types starting...');
    let pathHelper = new PathHelper(process.cwd(), `${__dirname}${Path.sep}..`)
    let stage = new Stage(pathHelper);
    await stage.PrepareAsync();
    console.log('Checking sn.config.js...');
    let reader = new SnConfigReader(pathHelper.PackageRootPath);
    await reader.ReadConfigFile();
    let cfg = await reader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
    console.log('Downloading type definitions...');
    let zipBuffer = await new Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();
    let zip = new AdmZip(zipBuffer);
    console.log('Download completed, extracting...');
    zip.extractAllTo(stage.TempFolderPath + Path.sep + 'src', true);
    console.log('Files extracted, running Build...');
    await stage.CompileAsync();
    console.log('All done.');
    process.exit(0);
})()