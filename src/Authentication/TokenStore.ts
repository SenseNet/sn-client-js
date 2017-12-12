/**
 * @module Authentication
 */ /** */
import { Token, TokenPersist, TokenStoreType } from './';

/**
 * Indicates the type of the token
 */
export type TokenType = 'access' | 'refresh';

/**
 * This class is intended to store token data in LocalStorage or in-memory storage.
 */
export class TokenStore {

    /**
     * @param {strnig} baseUrl The Base URL to the related site
     * @param {string} keyTemplate The template to use when generating keys in the local/session storage or for a cookie. ${siteName} and ${tokenName} will be replaced. Example: 'sn-${siteName}-${tokenName}'
     * @param {TokenPersist} tokenPersist Setting that indicates if the token should be persisted per session (browser close) or per Token expiration (based on the token `exp` property)
     * @param {Partial<Document>} documentRef The Document reference (used by unit tests)
     * @param {Storage} localStorageRef The localStorage reference (used by unit tests)
     * @param {Storage} sessionStorageRef The sessionStorage reference (used by unit tests)
     */
    constructor(private readonly _baseUrl: string,
                private readonly _keyTemplate: string,
                private readonly _tokenPersist: TokenPersist,
                private _documentRef = (typeof document === 'object') ? document : undefined,
                private _localStorageRef = (typeof localStorage === 'object') ? localStorage : undefined,
                private _sessionStorageRef = (typeof sessionStorage === 'object') ? sessionStorage : undefined) {
        const storesAvailable = (typeof this._localStorageRef !== 'undefined' && typeof this._sessionStorageRef !== 'undefined');
        const cookieAvailable = (typeof this._documentRef !== 'undefined' && typeof this._documentRef.cookie !== 'undefined');

        if (!storesAvailable && !cookieAvailable) {
            this.TokenStoreType = TokenStoreType.InMemory;
        } else if (this._tokenPersist === TokenPersist.Expiration) {
            storesAvailable ? this.TokenStoreType = TokenStoreType.LocalStorage : this.TokenStoreType = TokenStoreType.ExpirationCookie;
        } else {
            storesAvailable ? this.TokenStoreType = TokenStoreType.SessionStorage : this.TokenStoreType = TokenStoreType.SessionCookie;
        }
    }

    /**
     * If localStorage is not available, stores the token data in this in-memory array
     */
    private _innerStore: Map<string, string> = new Map();

    /**
     * The type of the generated Token Store
     */
    public readonly TokenStoreType: TokenStoreType;

    private getStoreKey(key: TokenType) {
        return this._keyTemplate.replace('${siteName}', this._baseUrl).replace('${tokenName}', key);
    }

    private getTokenFromCookie(key: string, document: Document): Token {
        const prefix = key + '=';
        if (document && document.cookie) {
            const cookieVal = document.cookie.split(';')
                .map((v) => v.trim())
                .find((v) => v.trim().indexOf(prefix) === 0);
            if (cookieVal) {
                return Token.FromHeadAndPayload(cookieVal.substring(prefix.length));
            }
        }
        return Token.CreateEmpty();
    }

    private setTokenToCookie(key: string, token: Token, persist: TokenPersist, doc: Document): void {
        let cookie = `${key}=${token.toString()}`;
        if (persist === TokenPersist.Expiration) {
            cookie += `; expires=${token.ExpirationTime.toUTCString()};`;
        }
        doc.cookie = cookie;
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
                    return this._innerStore.has(storeKey) ? Token.FromHeadAndPayload(this._innerStore.get(storeKey) as string) : Token.CreateEmpty();
                case TokenStoreType.LocalStorage:
                    return Token.FromHeadAndPayload((this._localStorageRef as any).getItem(storeKey));
                case TokenStoreType.SessionStorage:
                    return Token.FromHeadAndPayload((this._sessionStorageRef as any).getItem(storeKey));
                case TokenStoreType.ExpirationCookie:
                case TokenStoreType.SessionCookie:
                    return this.getTokenFromCookie(storeKey, this._documentRef as Document);
            }
        } catch (err) {
            //
        }
        return Token.CreateEmpty();
    }

    /**
     * Sets the token with the specified key to the specified value
     * @param key {TokenType} The key for the token to set
     * @param token {Token} The token to set with the specified key
     */
    public SetToken(key: TokenType, token: Token) {
        const storeKey = this.getStoreKey(key);
        const dtaString = token.toString();
        switch (this.TokenStoreType) {
            case TokenStoreType.InMemory:
                this._innerStore.set(storeKey, dtaString);
                break;
            case TokenStoreType.LocalStorage:
                (this._localStorageRef as Storage).setItem(storeKey, dtaString);
                break;
            case TokenStoreType.SessionStorage:
                (this._sessionStorageRef as Storage).setItem(storeKey, dtaString);
                break;
            case TokenStoreType.ExpirationCookie:
                this.setTokenToCookie(storeKey, token, TokenPersist.Expiration, this._documentRef as Document);
                break;
            case TokenStoreType.SessionCookie:
                this.setTokenToCookie(storeKey, token, TokenPersist.Session, this._documentRef as Document);
                break;
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
