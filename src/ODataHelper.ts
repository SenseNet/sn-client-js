/**
 * @module ODataHelper
 * @preferred
 * 
 * @description Helper methods for OData Operations
 */ /** */

// TODO: ezeket vhova kivezetni
import { IODataParams, ODataFieldParameter } from './ODataApi';
import { SnConfigModel } from './Config/snconfigmodel';
import { Content } from './Content';

const ODATA_PARAMS = ['select', 'expand', 'orderby', 'top', 'skip', 'filter', 'format', 'inlinecount'];
export const DATA_ROOT = 'OData.svc';


export const combineODataFieldParameters: <T extends Content>(...params: ODataFieldParameter<T>[]) => ODataFieldParameter<T>
    = <T extends Content>(...params: ODataFieldParameter<T>[]) => {
        params.forEach(param => {
            if (typeof param === 'string') {
                param = [param];
            }
        });
        params = params.filter(param => param && param.length > 0);
        return [...new Set([...params])] as ODataFieldParameter<T>;
    }

/**
 * Method to build proper parameter string to OData requests based on the given option Object.
 *
 * Checks whether a given parameter is standard OData param or not and based on this information this params get the '$' sign.
 *
 * If there's no select param given, or it is empty 'Id' is the default, so only this field will be on the content in the JSON result. To get all the field values, without selection, set it to 'all', but please avoid this if it's possible.
 * @param {IODataOptions} options Represents an ODataOptions obejct based through the IODataOptions interface. Holds the possible url parameters as properties.
 * @returns {string} String with the url params in the correct format e.g. '$select=DisplayName,Index'&$top=2&metadata=no'.
 */
export const buildUrlParamString: <T extends Content>(config: Partial<SnConfigModel>, options?: IODataParams<T>) => string = <T extends Content>(config: SnConfigModel, options?: IODataParams<T>): string => {
    if (!options) {
        return '';
    }
    if (config.RequiredSelect === 'all' || config.DefaultSelect === 'all' || options.select === 'all') {
        options.select = undefined;
    } else {
        options.select = combineODataFieldParameters<T>(config.RequiredSelect, options.select || config.DefaultSelect)
    }
    options.metadata = options.metadata || config.DefaultMetadata;
    options.inlinecount = options.inlinecount || config.DefaultInlineCount;
    options.expand = options.expand || config.DefaultExpand;
    options.top = options.top || config.DefaultTop;

    const segments: {name: string, value: string}[] = [];
    for (let key in options) {
        const name = ODATA_PARAMS.indexOf(key) > -1 ? `$${key}` : key;
        const plainValue = options[key];
        let parsedValue = plainValue;
        if (plainValue instanceof Array && plainValue.length && plainValue.length > 0){
            parsedValue = plainValue.join(',');
        }
        if (name && parsedValue && parsedValue.length){
            segments.push({name, value: parsedValue});
        }
    }

    return segments.map(s => `${s.name}=${s.value}`).join('&');
}

/**
 * Method that gets the URL that refers to a single item in the Sense/Net Content Repository
 * @param path {string} Path that you want to format.
 * @returns {string} Path in entity format e.g. /workspaces('project') from /workspaces/project
 */
export const getContentURLbyPath: (path: string) => string = (path: string): string => {
    if (typeof path === 'undefined' || path.indexOf('/') < 0 || path.length <= 1) {
        throw new Error('This is not a valid path.');
    }
    if (isItemPath(path))
        return path;

    let lastSlashPosition = path.lastIndexOf('/');
    let name = path.substring(lastSlashPosition + 1);
    let parentPath = path.substring(0, lastSlashPosition);

    let url;
    if (name.indexOf('Root') > -1)
        url = `${parentPath}/('${name}')`;
    else
        url = `${parentPath}('${name}')`
    return url;
}
/**
 * Method that gets the URL that refers to a single item in the Sense/Net Content Repository by its Id
 * @param id {number} Id of the Content.
 * @returns {string} e.g. /content(123)
 */
export const getContentUrlbyId: (id: number) => string = (id: number) => {
    return `/content(${id})`;
}
/**
 * Method that tells if a path is an item path.
 * @param path {string} Path that you want to test.
 * @returns {boolean} Returns if the given path is a path of a Content or not.
 */
export const isItemPath: (path: string) => boolean = (path) => {
    return path.indexOf("('") >= 0 && path.indexOf("')") === path.length - 2;
}

/**
 * Method that allows to join paths without multiple or missing slashes
 * @param args The list of the paths to join
 */
export const joinPaths = (...args: string[]) => {
    const trimSlashes = (path: string) => {
        if (path.endsWith('/')) {
            path = path.substring(0, path.length - 1)
        }
        if (path.startsWith('/')) {
            path = path.substring(1, path.length);
        }
        return path;
    }

    return args.map(trimSlashes).join('/');
}