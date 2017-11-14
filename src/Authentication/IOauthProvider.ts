/**
 * @module Authentication
 */ /** */

/**
 * Interface that represents a basic structure for an additional OAuth Provider
 */
export interface IOauthProvider {
    /**
     * Method that retrieves the token info
     */
    GetToken(): Promise<string>;

    /**
     * Method that handles the user login. Should be responsible for updating the Authentication State as well.
     */
    Login(token: string): Promise<any>;
}
