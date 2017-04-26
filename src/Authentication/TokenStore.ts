/**
 * @module Authentication
 */ /** */
import { Token, TokenPersist, TokenStoreType } from './';

/**
 * Indicates the type of the token
 */
type TokenType = 'access' | 'refresh';


/**
 * This class is intended to store token data in LocalStorage or in-memory storage.
 */
export class TokenStore {
    constructor(private readonly baseUrl: string, private readonly keyTemplate: string = 'sn-${siteName}-${tokenName}', private readonly tokenPersist: TokenPersist) {
        let storesAvailable = (typeof localStorage !== 'undefined' && typeof sessionStorage !== 'undefined');
        let cookieAvailable = (typeof document !== 'undefined' && typeof document.cookie !== 'undefined');

        if (!storesAvailable && !cookieAvailable) {
            this.TokenStoreType = TokenStoreType.InMemory;
        } else if (tokenPersist === TokenPersist.Expiration) {
            storesAvailable ? this.TokenStoreType = TokenStoreType.LocalStorage : this.TokenStoreType = TokenStoreType.ExpirationCookie;
        } else {
            storesAvailable ? this.TokenStoreType = TokenStoreType.SessionStorage : this.TokenStoreType = TokenStoreType.SessionCookie;
        }
    }


    /**
     * If localStorage is not available, stores the token data in this in-memory array
     */
    private innerStore: string[] = [];

    public readonly TokenStoreType: TokenStoreType;

    private getStoreKey(key: TokenType) {
        return this.keyTemplate.replace('${siteName}', this.baseUrl).replace('${tokenName}', key);
    }

    private getTokenFromCookie(key: string): Token {
        let prefix = key + '=';
        let cookieVal = document.cookie.split(';')
                .map(v => v.trim())
                .find(v => v.trim().indexOf(prefix) === 0)
                .substring(prefix.length);
        return Token.FromHeadAndPayload(cookieVal);
    }

    private setTokenToCookie(key: string, Token: Token, persist: TokenPersist): void{
        let cookie = `${key}=${Token.toString()}`;
        if (persist === TokenPersist.Expiration){
            cookie += `; expires=${Token.ExpirationTime.toUTCString()};`
        }
        document.cookie = cookie;
    }

    /**
     * Gets the specified token
     * @param key {TokenType} The key for the token
     * @returns {Token} The requested token, or Token.Empty in case of error
     */
    public GetToken(key: TokenType): Token {
        const storeKey = this.getStoreKey(key);
        try {
            switch (this.TokenStoreType) {
                case TokenStoreType.InMemory:
                    return Token.FromHeadAndPayload(this.innerStore[storeKey]);
                case TokenStoreType.LocalStorage:
                    return Token.FromHeadAndPayload(localStorage.getItem(storeKey));
                case TokenStoreType.SessionStorage:
                    return Token.FromHeadAndPayload(sessionStorage.getItem(storeKey));
                
                case TokenStoreType.ExpirationCookie:
                case TokenStoreType.SessionCookie:
                    return this.getTokenFromCookie(storeKey);
                default:
                    return Token.CreateEmpty();
            }
        } catch (err) {
            return Token.CreateEmpty();
        }
    }

    /**
     * Sets the token with the specified key to the specified value
     * @param key {TokenType} The key for the token to set
     * @param token {Token} The token to set with the specified key
     */
    public SetToken(key: TokenType, token: Token) {
        const storeKey = this.getStoreKey(key);
        let dtaString = token.toString();
        switch (this.TokenStoreType) {
            case TokenStoreType.InMemory:
                this.innerStore[storeKey] = dtaString;
                break;
            case TokenStoreType.LocalStorage:
                localStorage.setItem(storeKey, dtaString);
                break;
            case TokenStoreType.SessionStorage:
                sessionStorage.setItem(storeKey, dtaString);
                break;
            case TokenStoreType.ExpirationCookie:
                this.setTokenToCookie(storeKey, token, TokenPersist.Expiration);
                break;
            case TokenStoreType.SessionCookie:
                this.setTokenToCookie(storeKey, token, TokenPersist.Session);
                break;
            default:
                break;
        }
        // if (typeof localStorage === 'undefined') {
        //     this.innerStore[storeKey] = dtaString;
        // } else {
        //     localStorage.setItem(storeKey, dtaString);
        // }
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