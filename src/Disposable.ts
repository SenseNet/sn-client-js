export interface IDisposable {
    dispose: () => void;
}

export const using = <T extends IDisposable>(resource: T, callback: (resource: T) => void) => {
    try {
        callback(resource);
    } finally {
        resource.dispose();
    }
};

export const usingAsync = async <T extends IDisposable>(resource: T, callback: (resource: T) => Promise<void>) => {
    try {
        await callback(resource);
    } finally {
        resource.dispose();
    }
};
