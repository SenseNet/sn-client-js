/**
 * @module Authentication
 */ /** */

/**
 * This class represents a plain response body that is returned from Sense/NET ECM in case of a succesfully login.
 */
export class RefreshResponse {
    /**
     * The Access Token head and payload in a Base64 encoded format
     */
    access: string;
}