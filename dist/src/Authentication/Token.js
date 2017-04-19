"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    constructor(headerEncoded, payloadEncoded) {
        this.headerEncoded = headerEncoded;
        this.payloadEncoded = payloadEncoded;
    }
    get tokenPayload() {
        try {
            return JSON.parse(Buffer.from(this.payloadEncoded, 'base64').toString());
        }
        catch (err) {
            return {
                aud: '',
                exp: 0,
                iat: 0,
                iss: '',
                name: '',
                nbf: 0,
                sub: ''
            };
        }
    }
    ;
    fromEpoch(epoch) {
        let d = new Date(0);
        d.setUTCSeconds(epoch);
        return d;
    }
    get Username() {
        return this.tokenPayload.name;
    }
    ;
    GetPayload() {
        return this.tokenPayload;
    }
    get ExpirationTime() {
        return this.fromEpoch(this.tokenPayload.exp);
    }
    get NotBefore() {
        return this.fromEpoch(this.tokenPayload.nbf);
    }
    IsValid() {
        let now = new Date();
        return this.tokenPayload && this.ExpirationTime > now && this.NotBefore < now;
    }
    get IssuedDate() {
        return this.fromEpoch(this.tokenPayload.iat);
    }
    toString() {
        return `${this.headerEncoded}.${this.payloadEncoded}`;
    }
    static FromHeadAndPayload(headAndPayload) {
        let [head, payload] = headAndPayload.split('.');
        return new Token(head, payload);
    }
    static get Empty() {
        return new Token('', '');
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map