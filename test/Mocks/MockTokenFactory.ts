/**
 * @module Mocks
 */ /** */
 
import { Token, ITokenPayload } from '../../src/Authentication';

export class MockTokenFactory {
    private static getStillValidDate(){
        let date = new Date()
        date.setTime(date.getTime() + 3000000);
        return date.getTime() / 1000;
    }

    private static createWithDates(expiration: number, notBefore: number): Token {
        let header = { };
        let payload = {
            aud: '',
            exp: expiration,
            iat: 0,
            iss: '',
            name: 'BuiltIn\\Mock',
            nbf: notBefore,
            sub: ''
        } as ITokenPayload;

        let headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64')

        let payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64')
        return Token.FromHeadAndPayload(`${headerEncoded}.${payloadEncoded}`);
    }

    public static CreateValid(){
        return this.createWithDates(this.getStillValidDate(), 1);
    }

    public static CreateExpired(){
        return this.createWithDates(1, this.getStillValidDate());
    }

    public static createNotValidYet(){
        return this.createWithDates(this.getStillValidDate(), this.getStillValidDate())
    }
}