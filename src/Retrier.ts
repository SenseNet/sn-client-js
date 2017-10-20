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
    public get Retries(): number {
        return this._retries !== undefined ? this._retries : RetrierOptions.RETRIES_DEFAULT;
    }
    public set Retries(v: number) {
        this._retries = v;
    }

    public static readonly RETRY_INTERVAL_MS_DEFAULT = 10;
    private _retryIntervalMs: number;
    /**
     * The interval between tries in milliseconds
     */
    public get RetryIntervalMs(): number {
        return this._retryIntervalMs !== undefined ? this._retryIntervalMs : RetrierOptions.RETRY_INTERVAL_MS_DEFAULT;
    }
    public set RetryIntervalMs(v: number) {
        this._retryIntervalMs = v;
    }


    public static readonly TIMEOUT_MS_DEFAULT = 1000;
    private _timeoutMs: number;
    /**
     * The Timeout interval in milliseconds
     */
    public get TimeoutMs(): number {
        return this._timeoutMs !== undefined ? this._timeoutMs : RetrierOptions.TIMEOUT_MS_DEFAULT;
    }
    public set TimeoutMs(v: number) {
        this._timeoutMs = v;
    }

    /**
     * Optional callback, triggered right before each try
     */
    public OnTry?: () => void;
    /**
     * Optional callback, triggered on success
     */
    public OnSuccess?: () => void;
    /**
     * Optional callback, triggered on fail (timeout or too many retries)
     */
    public OnFail?: () => void;
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

    private _isRunning: boolean = false;

    /**
     * Factory method for creating a Retrier
     * @param {()=>Promise<boolean>} callback The method that will be invoked on each try
     */
    public static Create(callback: () => Promise<boolean>) {
        return new Retrier(callback, new RetrierOptions());
    }

    private constructor(
        private _callback: () => Promise<boolean>,
        public readonly Options: RetrierOptions) {
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
        if (this._isRunning){
            throw Error('Retrier already started!');
        }
        Object.assign(this.Options, options);
        return this;
    }

    /**
     * Public method that starts the Retrier
     * @throws Error if the Retrier is already started.
     * @returns {Promise<boolean>} A boolean value that indicates if the process has been succeeded.
     */
    public async Run(): Promise<boolean> {

        if (this._isRunning){
            throw Error('Retrier already started!');
        }

        let succeeded = false;
        let retries = 0;
        let timedOut = false;

        this._isRunning = true;

        setTimeout(() => {
            if (!succeeded) {
                timedOut = true;
            }
        }, this.Options.TimeoutMs);

        while (!succeeded && !timedOut && (this.Options.Retries > retries)) {
            retries++;
            if (this.Options.OnTry){
                this.Options.OnTry();
            }
            succeeded = await this._callback();
            !succeeded && await this.wait(this.Options.RetryIntervalMs);
        }

        if (succeeded){
            if (!timedOut && this.Options.OnSuccess){
                this.Options.OnSuccess();
            }
        } else {
            if (this.Options.OnFail){
                this.Options.OnFail();
            }
        }
        return succeeded;
    }
}