import * as Path from 'path';

export class PathHelper {

    constructor(public readonly PackageRootPath: string, public readonly  SnClientPath: string) {
        this.PackageRootPath = Path.normalize(this.PackageRootPath);
        this.SnClientPath = Path.normalize(this.SnClientPath);
        console.log(`Sn Client package path: ${this.SnClientPath}`);
        console.log(`Package root path: ${this.PackageRootPath}`);
     }

    public GetRelativeToPackageRootPath(relativePath: string): string {
        return Path.join(this.PackageRootPath, relativePath);
    }

    public GetRelativeToSnClientPath(relativePath: string): string {
        return Path.join(this.SnClientPath, relativePath);
    }
}