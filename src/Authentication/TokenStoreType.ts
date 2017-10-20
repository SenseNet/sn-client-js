/**
 * @module Authentication
 */ /** */

 /**
  * This enum represents how the token will be stored on the client-side.
  */
export enum TokenStoreType {

    /**
     * The is stored in a cookie, without expiration date (Session Cookie).
     */
    SessionCookie,

    /**
     * The token is stored in a cookie, the expiration dates will match the token expiration dates
     */
    ExpirationCookie,

    /**
     * The token is stored in the local sessionStorage
     */
    SessionStorage,

    /**
     * The token is stored in the localStorage
     */
    LocalStorage,
    /**
     *  The token is stored in an in-memory storage (fallback)
     */
    InMemory
}