/**
 * @module Authentication
 */ /** */

/**
 * This enum represents the current state of the user session
 */
export enum LoginState {
    /**
     * There is a request (login or token refresh) in progress
     */
    Pending,
    /**
     * The user is not authenticated
     */
    Unauthenticated,
    /**
     * The user is authenticated and has a valid access token
     */
    Authenticated
}