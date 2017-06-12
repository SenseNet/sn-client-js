export class RetrierOptions {

    public static readonly RETRIES_DEFAULT = 10;
    private _retries: number = RetrierOptions.RETRIES_DEFAULT;
    public get retries(): number {
        return this._retries !== undefined ? this._retries : RetrierOptions.RETRIES_DEFAULT;
    }
    public set retries(v: number) {
        this._retries = v;
    }

    public static readonly RETRY_INTERVAL_MS_DEFAULT = 10;
    private _retryIntervalMs: number;
    public get retryIntervalMs(): number {
        return this._retryIntervalMs !== undefined ? this._retryIntervalMs : RetrierOptions.RETRY_INTERVAL_MS_DEFAULT;
    }
    public set retryIntervalMs(v: number) {
        this._retryIntervalMs = v;
    }


    public static readonly TIMEOUT_MS_DEFAULT = 1000;
    private _timeoutMs: number;
    public get timeoutMs(): number {
        return this._timeoutMs !== undefined ? this._timeoutMs : RetrierOptions.TIMEOUT_MS_DEFAULT;
    }
    public set timeoutMs(v: number) {
        this._timeoutMs = v;
    }

    onTry?: () => void;
    onSuccess?: () => void;
    onTimeout?: () => void;
}


export class Retrier {

    private isRunning: boolean = false;

    public static Create(callback: () => Promise<boolean>) {
        return new Retrier(callback, new RetrierOptions());
    }

    constructor(
        private callback: () => Promise<boolean>,
        public readonly options: RetrierOptions) {
    }

    private async wait(ms: number) {
        return new Promise<any>((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }

    public Setup(options: Partial<RetrierOptions>){
        if (this.isRunning){
            throw Error('Retrier already started!');
        }

        for (let field in options){
            this.options[field] = options[field];
        }
        return this;
    }

    public async Run() {

        if (this.isRunning){
            throw Error('Retrier already started!');
        }

        let succeeded = false;
        let retries = 0;
        let timedOut = false;

        this.isRunning = true;

        let timeoutTimer = setTimeout(() => {
            if (!succeeded) {
                timedOut = true;
                if (this.options.onTimeout) {
                    this.options.onTimeout();
                };
            }
        }, this.options.timeoutMs);

        while (!succeeded && !timedOut && (this.options.retries > retries)) {
            if (this.options.onTry){
                this.options.onTry();
            }
            succeeded = await this.callback();
            !succeeded && await this.wait(this.options.retryIntervalMs);
        }

        if (succeeded && !timedOut && this.options.onSuccess) {
            this.options.onSuccess();
        }
        return succeeded;
    }
}