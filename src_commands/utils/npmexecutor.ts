import * as Path from 'path';
import * as ChildProcess from 'child_process';

/**
 * This class executes a specified NPM command synchron in a specified working directory in a child process synchronously
 */
export class NpmExecutor {

    /**
     * @constructs NpmExecutor
     * @param workingDirectory {string} The path for the working directory
     */
    constructor(private workingDirectory: string) {

    }

    /**
     * Runs a command in the working directory synchronously.
     * @param npmCommand {string} The NPM command to be exec.
     */
    public Run(npmCommand: string) {
        return ChildProcess.execSync(`npm run ${npmCommand}`, {
            cwd: this.workingDirectory,
            stdio: [0, 1, 2]
        });
    }
}