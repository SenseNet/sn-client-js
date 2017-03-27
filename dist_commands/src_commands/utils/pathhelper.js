"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
class PathHelper {
    constructor(PackageRootPath, SnClientPath) {
        this.PackageRootPath = PackageRootPath;
        this.SnClientPath = SnClientPath;
        this.PackageRootPath = Path.normalize(this.PackageRootPath);
        this.SnClientPath = Path.normalize(this.SnClientPath);
        console.log(`Sn Client package path: ${this.SnClientPath}`);
        console.log(`Package root path: ${this.PackageRootPath}`);
    }
    GetRelativeToPackageRootPath(relativePath) {
        return Path.join(this.PackageRootPath, relativePath);
    }
    GetRelativeToSnClientPath(relativePath) {
        return Path.join(this.SnClientPath, relativePath);
    }
}
exports.PathHelper = PathHelper;

//# sourceMappingURL=pathhelper.js.map
