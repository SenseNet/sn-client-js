export interface IDisposable {
    Dispose: () => void;
}

export const using = <T extends IDisposable>(resource: T, callback: (resource: T) => void) => {
    try {
        callback(resource);
    } finally {
        resource.Dispose();
    }
};

export const usingAsync = async <T extends IDisposable, K>(resource: T, callback: (resource: T) => Promise<K>) => {
    try {
        await callback(resource);
    } finally {
        resource.Dispose();
    }
};
