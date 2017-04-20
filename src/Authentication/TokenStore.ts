/**
 * @module Authentication
 */ /** */
import { Token } from './';

type TokenType = 'access' | 'refresh';

export class TokenStore {

    constructor(private readonly baseUrl: string) {
    }

    private get tokenKeyPrefix() {
        return `sn-${this.baseUrl}-`;
    }

    private innerStore: string[] = [];
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

    public SetToken(key: TokenType, token: Token) {
        const storeKey = `${this.tokenKeyPrefix}${key}`;
        let dtaString = token.toString();
        if (typeof localStorage === 'undefined') {
            this.innerStore[storeKey] = dtaString;
        } else {
            localStorage.setItem(storeKey, dtaString);
        }
    }

    public get AccessToken() {
        return this.GetToken('access');
    }
    public set AccessToken(value: Token) {
        this.SetToken('access', value);
    }

    public get RefreshToken() {
        return this.GetToken('refresh');
    }
    public set RefreshToken(value: Token) {
        this.SetToken('refresh', value);
    }

}