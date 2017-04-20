"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ODATA_PARAMS = ['select', 'expand', 'orderby', 'top', 'skip', 'filter', 'format', 'inlinecount'];
exports.DATA_ROOT = 'OData.svc';
function buildUrlParamString(options) {
    if (typeof options === 'undefined') {
        return '';
    }
    let params = '?';
    let currentCount = 0;
    if (typeof options.select !== 'undefined') {
        if (typeof options.select === 'string' && options.select !== 'all') {
            let value = options.select;
            options.select = [value, 'Id', 'Type'];
        }
        else if (options.select !== 'all') {
            options.select = [...options.select, 'Id', 'Type'];
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
exports.buildUrlParamString = buildUrlParamString;
function buildRequestBody(options) {
    let stringifiedOptions = JSON.stringify(options);
    return `models=[${stringifiedOptions}]`;
}
exports.buildRequestBody = buildRequestBody;
function getContentURLbyPath(path) {
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
        url = `${parentPath}('${name}')`;
    return url;
}
exports.getContentURLbyPath = getContentURLbyPath;
function getContentUrlbyId(id) {
    return `/content(${id})`;
}
exports.getContentUrlbyId = getContentUrlbyId;
function isItemPath(path) {
    return path.indexOf("('") >= 0 && path.indexOf("')") === path.length - 2;
}
exports.isItemPath = isItemPath;
function stringifyWithoutCircularDependency(content) {
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
exports.stringifyWithoutCircularDependency = stringifyWithoutCircularDependency;
//# sourceMappingURL=ODataHelper.js.map