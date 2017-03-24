/**
 * This type represents an SnConfig field type and
 */

export enum SnConfigBehavior {
    Default = 0,
    AllowFromConfig = 1 << 0,
    HideConsoleInput = 1 << 1,
}
