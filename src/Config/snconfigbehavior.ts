/**
 * @module Config
 *//** */

/**
 * This enum represents an SnConfig field behavior. Values can be used as flags.
 */
export enum SnConfigBehavior {

    /**
     * Default, no special behavior defined. Not allowed to store in a Config file, will be asked as a plain text value
     */
    Default = 0,

    /**
     * Allows a config entry to be stored in a config file. Recommended for non-confidential values
     */
    AllowFromConfig = 1 << 0,

    /**
     * Allows a config entry to be specified via command line option. Recommended for non-confidential values
     */
    AllowFromCommandLine = 1 << 1,

    /**
     * The console input will be hidden, when a value is asked.
     * Recommended for confidential values (e.g. password for authentication)
     */
    HideConsoleInput = 1 << 2,

}
