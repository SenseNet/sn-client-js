import { DeferredObject } from '../ComplexTypes';
import { IContent } from './IContent';
import { ContentInternal } from './index';
import { ISavedContent } from './ISavedContent';

export type Content<T extends IContent = any> = ContentInternal<T> & T;

export type SavedContent<T extends IContent = any> = ContentInternal<T> & T & ISavedContent;

/**
 * Typeguard that determines if the specified Object is a DeferredObject
 * @param fieldObject The object that needs to be checked
 */
export const isDeferred = (fieldObject: any): fieldObject is DeferredObject => {
    return fieldObject && fieldObject.__deferred && fieldObject.__deferred.uri && fieldObject.__deferred.uri.length > 0 || false;
};

/**
 * Typeguard that determines if the specified Object is an IContentOptions instance
 * @param object The object that needs to be checked
 */
export const isIContent = (object: any): object is IContent => {
    return object && object.Id && object.Path && object.Type && object.Type.length > 0 || false;
};

/**
 * Typeguard that determines if the specified Object is a Content instance
 * @param object The object that needs to be checked
 */
export const isContent = <T extends IContent = IContent>(object: any): object is ContentInternal<T> => {
    return object instanceof ContentInternal;
};

/**
 * Typeguard that determines if the specified Object is an IContentOptions array
 * @param {any[]} objectList The object that needs to be checked
 */
export const isIContentList = (objectList: any[]): objectList is IContent[] => {
    return objectList && objectList.length !== undefined && objectList.find((o) => !isIContent(o)) === undefined || false;
};

export const isSavedContent = <T extends IContent>(c: ContentInternal<T>): c is SavedContent<T> => {
    return c && isContent(c) && c.Id && c.Path && c.Path.length && c.Name && c.Name.length > 0 || false;
};
