/**
 * @module Authentication
 */ /** */
import { ITokenPayload } from './';

/**
 * This class represents a sense NET JWT Token instance.
 */
export class Token {

    private get tokenPayload(): ITokenPayload {
        try {
            return JSON.parse(Buffer.from(this.payloadEncoded, 'base64').toString()) as ITokenPayload;
        } catch (err) {
            return {
                aud: '',
                exp: 0,
                iat: 0,
                iss: '',
                name: '',
                nbf: 0,
                sub: ''
            }
        }
    };

    private fromEpoch(epoch: number): Date {
        let d = new Date(0);
        d.setUTCSeconds(epoch);
        return d;
    }

    /**
     * The Username from the current Token payload
     */
    public get Username(): string {
        return this.tokenPayload.name;
    };

    /**
     * The current Token full Payload
     */
    public GetPayload(): ITokenPayload {
        return this.tokenPayload;
    }

    /**
     * The Date when the token will expire
     */
    public get ExpirationTime(): Date {
        return this.fromEpoch(this.tokenPayload.exp);
    }

    /**
     * The token will be valid only after this date
     */
    public get NotBefore(): Date {
        return this.fromEpoch(this.tokenPayload.nbf);
    }

    /**
     * Indicates if the Token is valid based on it's ExpirationTime and NotBefore values.
     */
    public IsValid(): boolean {
        let now = new Date();
        return this.tokenPayload && this.ExpirationTime > now && this.NotBefore < now;
    }

    /**
     * The date when the Token was issued
     */
    public get IssuedDate() {
        return this.fromEpoch(this.tokenPayload.iat);
    }

    /**
     * Returns the Token in string format (in a base64 encoded, dot separated header and payload)
     */
    public toString() {
        return `${this.headerEncoded}.${this.payloadEncoded}`;
    }


    /**
     * Factory method to create a token from a sense NET specific base64 encoded header and payload string, e.g.:
     * ```
     * const myToken = Token.FromHeadAndPayload("e30=.eyJhdWQiOiIiLCJleHAiOjE0OTQ1NzkwOTUuMTIsImlhdCI6MCwiaXNzIjoiIiwibmFtZSI6IiIsIm5iZiI6MSwic3ViIjoiIn0=");
     * ```
     * @constructs Token
     */
    public static FromHeadAndPayload(headAndPayload: string): Token {
        let [head, payload] = headAndPayload.split('.');
        return new Token(head, payload)
    }

    /**
     * Factory method for creating empty (invalid) tokens
     * ```
     * const invalidToken = Token.CreateEmpty();
     * ```
     * @constructs Token
     */
    public static CreateEmpty(): Token {
        return new Token('', '');
    }

    private constructor(private readonly headerEncoded: string, private readonly payloadEncoded: string) {
    }
}
