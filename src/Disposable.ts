/**
 * @module Disposable
 * @preferred
 */
/** */

/**
 * Resources in using an usingAsync should implement this interface
 */
export interface IDisposable {
    /**
     * Method called when the IDisposable is disposed.
     */
    Dispose: () => void;
}

/**
 * Method that accepts an IDisposable resource that will be disposed after the callback
 * @param {IDisposable} resource The resource that is used in the callback and will be disposed afterwards
 * @param {()=>void}callback The callback that will be executed synchrounously before the resource will be disposed
 * ```ts
 * class Resource implements IDisposable{
 *       Dispose(){
 *           // cleanup logics
 *      }
 * }
 *
 * using(new Resource(), (resource)=>{
 *      // do something with the resource
 * })
 * ```
 */
export const using = <T extends IDisposable>(resource: T, callback: (resource: T) => void) => {
    try {
        callback(resource);
    } finally {
        resource.Dispose();
    }
};

/**
 * Method that accepts an IDisposable resource that will be disposed after the callback
 * @param {IDisposable} resource The resource that is used in the callback and will be disposed afterwards
 * @param {()=>Promise<{}>} callback The callback that will be executed asynchrounously before the resource will be disposed
 * ```ts
 * class Resource implements IDisposable{
 *       Dispose(){
 *           // cleanup logics
 *      }
 * }
 *
 * using(new Resource(), async (resource)=>{
 *      // do something with the resource
 * })
 * ```
 */
export const usingAsync = async <T extends IDisposable, K>(resource: T, callback: (resource: T) => Promise<K>) => {
    try {
        await callback(resource);
    } finally {
        resource.Dispose();
    }
};
