"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = require("child_process");
class NpmExecutor {
    constructor(workingDirectory) {
        this.workingDirectory = workingDirectory;
    }
    Run(npmCommand) {
        return ChildProcess.execSync(`npm run ${npmCommand}`, {
            cwd: this.workingDirectory,
            stdio: [0, 1, 2]
        });
    }
}
exports.NpmExecutor = NpmExecutor;
//# sourceMappingURL=npmexecutor.js.map