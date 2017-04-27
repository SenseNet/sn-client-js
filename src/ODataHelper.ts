/**
 * @module ODataHelper
 * @preferred
 * 
 * @description Helper methods for OData Operations
 */ /** */

// TODO: ezeket vhova kivezetni
const ODATA_PARAMS = ['select', 'expand', 'orderby', 'top', 'skip', 'filter', 'format', 'inlinecount'];
export const DATA_ROOT = 'OData.svc';

/**
 * Method to build proper parameter string to OData requests based on the given option Object.
 *
 * Checks whether a given parameter is standard OData param or not and based on this information this params get the '$' sign.
 *
 * If there's no select param given, or it is empty 'Id' is the default, so only this field will be on the content in the JSON result. To get all the field values, without selection, set it to 'all', but please avoid this if it's possible.
 * @param options {IODataOptions} Represents an ODataOptions obejct based through the IODataOptions interface. Holds the possible url parameters as properties.
 * @returns {string} String with the url params in the correct format e.g. '$select=DisplayName,Index'&$top=2&metadata=no'.
 */
export function buildUrlParamString(options?): string {
    if (typeof options === 'undefined') {
        return '';
    }
    let params: string = '?';
    let currentCount = 0;
    if (typeof options.select !== 'undefined') {
        if (typeof options.select === 'string' && options.select !== 'all') {
            let value = options.select;
            options.select = [value, 'Id', 'Type'];
        }
        else if (options.select !== 'all') {
            options.select = [...options.select, 'Id', 'Type']
        }
        else {
            delete options['select'];
        }
    }
    else {
        options.select = ['Id', 'Type'];
    }
    for (let key in options) {

        if (typeof options[key] !== 'undefined') {
            if (ODATA_PARAMS.indexOf(key) > -1) {
                params += `$${key}=`;
                if (typeof options[key] === 'string') {
                    params += options[key];
                }
                else if (typeof options[key] !== 'undefined') {
                    for (let x = 0; x < options[key].length; x++) {
                        if (typeof options[key] !== 'undefined') {
                            params += `${options[key][x]}`;
                            if (x < options[key].length - 1) {
                                params += `,`;
                            }
                        }
                    }
                }

            }
            else {
                if (typeof options[key] !== 'undefined') {
                    params += `${key}=${options[key]}`;
                }
            }
            params += `&`;
        }
    }
    if (typeof options.metadata === 'undefined') {
        params += 'metadata=no&';
    }

    return params.slice(0, params.length - 1);
}
/**
 * Method to help building body part of a POST OData request.
 *
 * Converts the given JSON to string and wraps it into a 'models' array.
 * @param options
 * @returns {string} Models array with the given options in string format e.g. 'models=["{ '__ContentType':'EventList' , 'DisplayName': 'Calendar', 'Index': 2 }"]'.
 */
export function buildRequestBody(options) {
    let stringifiedOptions = JSON.stringify(options);
    return `models=[${stringifiedOptions}]`;
}
/**
 * Method that gets the URL that refers to a single item in the Sense/Net Content Repository
 * @param path {string} Path that you want to format.
 * @returns {string} Path in entity format e.g. /workspaces('project') from /workspaces/project
 */
export function getContentURLbyPath(path: string): string {
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
export function getContentUrlbyId(id: number): string {
    return `/content(${id})`;
}
/**
 * Method that tells if a path is an item path.
 * @param path {string} Path that you want to test.
 * @returns {boolean} Returns if the given path is a path of a Content or not.
 */
export function isItemPath(path: string): boolean {
    return path.indexOf("('") >= 0 && path.indexOf("')") === path.length - 2;
}

/**
 * Method that allows to serialize an object, without circular dependencies. Already serialized objects will be skipped.
 * @param content The content object to be serialized
 */
export function stringifyWithoutCircularDependency(content: any): string {
    let serialized = [];
    return JSON.stringify(content, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (serialized.indexOf(value) !== -1) {
                return;
            }
            serialized.push(value);
        }
        return value;
    });
}

/**
 * Method that allows to join paths without multiple or missing slashes
 * @param args The list of the paths to join
 */
export function joinPaths(...args: string[]) {
    function trimSlashes(path: string): string {
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