/**
 * @module Authentication
 */ /** */
import { ITokenPayload } from './';

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

    public get Username(): string {
        return this.tokenPayload.name;
    };

    public GetPayload() {
        return this.tokenPayload;
    }

    public get ExpirationTime() {
        return this.fromEpoch(this.tokenPayload.exp);
    }

    public get NotBefore() {
        return this.fromEpoch(this.tokenPayload.nbf);
    }

    public IsValid() {
        let now = new Date();
        return this.tokenPayload && this.ExpirationTime > now && this.NotBefore < now;
    }

    public get IssuedDate() {
        return this.fromEpoch(this.tokenPayload.iat);
    }

    public toString() {
        return `${this.headerEncoded}.${this.payloadEncoded}`;
    }


    public static FromHeadAndPayload(headAndPayload: string): Token {
        let [head, payload] = headAndPayload.split('.');
        return new Token(head, payload)
    }

    public static CreateEmpty(): Token {
        return new Token('', '');
    }

    private constructor(private readonly headerEncoded: string, private readonly payloadEncoded: string) {
    }
}
