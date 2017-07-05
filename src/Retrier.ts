/**
 * @module Retrier
 * @preferred
 * 
 * @description Module for Retrier.
 * 
 * */ /** */


/**
 * Options class for Retrier
 */
export class RetrierOptions {

    public static readonly RETRIES_DEFAULT = 10;
    private _retries: number = RetrierOptions.RETRIES_DEFAULT;
    /**
     * How many times should retry the operation
     */
    public get retries(): number {
        return this._retries !== undefined ? this._retries : RetrierOptions.RETRIES_DEFAULT;
    }
    public set retries(v: number) {
        this._retries = v;
    }

    public static readonly RETRY_INTERVAL_MS_DEFAULT = 10;
    private _retryIntervalMs: number;
    /**
     * The interval between tries in milliseconds
     */
    public get retryIntervalMs(): number {
        return this._retryIntervalMs !== undefined ? this._retryIntervalMs : RetrierOptions.RETRY_INTERVAL_MS_DEFAULT;
    }
    public set retryIntervalMs(v: number) {
        this._retryIntervalMs = v;
    }


    public static readonly TIMEOUT_MS_DEFAULT = 1000;
    private _timeoutMs: number;
    /**
     * The Timeout interval in milliseconds
     */
    public get timeoutMs(): number {
        return this._timeoutMs !== undefined ? this._timeoutMs : RetrierOptions.TIMEOUT_MS_DEFAULT;
    }
    public set timeoutMs(v: number) {
        this._timeoutMs = v;
    }

    /**
     * Optional callback, triggered right before each try
     */
    onTry?: () => void;
    /**
     * Optional callback, triggered on success
     */
    onSuccess?: () => void;
    /**
     * Optional callback, triggered on fail (timeout or too many retries)
     */
    onFail?: () => void;
}


/**
 * Utility class for retrying operations.
 * Usage example:
 * ```
 *          const funcToRetry: () => Promise<boolean> = async () => {
 *              let hasSucceeded = false;
 *              // ...
 *              // custom logic
 *              // ...
 *              return hasSucceeded;
 *          }
 *          const retrierSuccess = await Retrier.Create(funcToRetry)
 *              .Setup({
 *                  retries: 3,
 *                  retryIntervalMs: 1,
 *                  timeoutMs: 1000
 *              })
 *              .Run();
 * ```
 */
export class Retrier {

    private isRunning: boolean = false;

    /**
     * Factory method for creating a Retrier
     * @param {()=>Promise<boolean>} callback The method that will be invoked on each try
     */
    public static Create(callback: () => Promise<boolean>) {
        return new Retrier(callback, new RetrierOptions());
    }

    private constructor(
        private callback: () => Promise<boolean>,
        public readonly options: RetrierOptions) {
    }

    private async wait(ms: number) {
        return new Promise<any>((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }

    /**
     * Method to override the default Retrier settings.
     * @param {Partial<RetrierOptions>} options The options to be overridden
     * @throws Error if the Retrier is running.
     * @returns the Retrier instance
     */
    public Setup(options: Partial<RetrierOptions>){
        if (this.isRunning){
            throw Error('Retrier already started!');
        }
        Object.assign(this.options, options);
        return this;
    }

    /**
     * Public method that starts the Retrier
     * @throws Error if the Retrier is already started.
     * @returns {Promise<boolean>} A boolean value that indicates if the process has been succeeded.
     */
    public async Run(): Promise<boolean> {

        if (this.isRunning){
            throw Error('Retrier already started!');
        }

        let succeeded = false;
        let retries = 0;
        let timedOut = false;

        this.isRunning = true;

        setTimeout(() => {
            if (!succeeded) {
                timedOut = true;
            }
        }, this.options.timeoutMs);

        while (!succeeded && !timedOut && (this.options.retries > retries)) {
            retries++;
            if (this.options.onTry){
                this.options.onTry();
            }
            succeeded = await this.callback();
            !succeeded && await this.wait(this.options.retryIntervalMs);
        }

        if (succeeded){
            if (!timedOut && this.options.onSuccess){
                this.options.onSuccess();
            }
        } else {
            if (this.options.onFail){
                this.options.onFail();
            }
        }
        return succeeded;
    }
}