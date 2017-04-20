/**
 * @module Authentication
 */ /** */
import { Token } from './';

/**
 * Indicates the type of the token
 */
type TokenType = 'access' | 'refresh';

/**
 * This class is intended to store token data in LocalStorage or in-memory storage.
 */
export class TokenStore {

    constructor(private readonly baseUrl: string) {
    }

    /**
     * Gets the prefix to the token (will be used for localStorage key)
     */
    private get tokenKeyPrefix() {
        return `sn-${this.baseUrl}-`;
    }

    /**
     * If localStorage is not available, stores the token data in this in-memory array
     */
    private innerStore: string[] = [];
    
    /**
     * Gets the specified token
     * @param key {TokenType} The key for the token
     * @returns {Token} The requested token, or Token.Empty in case of error
     */
    public GetToken(key: TokenType): Token {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        try {
            if (typeof localStorage === 'undefined') {
                return Token.FromHeadAndPayload(this.innerStore[storeKey]);
            }
            return Token.FromHeadAndPayload(localStorage.getItem(storeKey));
        } catch (err) {
            return Token.Empty;
        }
    }

    /**
     * Sets the token with the specified key to the specified value
     * @param key {TokenType} The key for the token to set
     * @param token {Token} The token to set with the specified key
     */
    public SetToken(key: TokenType, token: Token) {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        let dtaString = token.toString();
        if (typeof localStorage === 'undefined') {
            this.innerStore[storeKey] = dtaString;
        } else {
            localStorage.setItem(storeKey, dtaString);
        }
    }

    /**
     * The current Access Token
     */
    public get AccessToken() {
        return this.GetToken('access');
    }
    public set AccessToken(value: Token) {
        this.SetToken('access', value);
    }

    /**
     * The current Refresh Token
     */
    public get RefreshToken() {
        return this.GetToken('refresh');
    }
    public set RefreshToken(value: Token) {
        this.SetToken('refresh', value);
    }

}