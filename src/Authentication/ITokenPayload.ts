/**
 * @module "Authentication"
 */ /** */
export interface ITokenPayload {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    nbf: number;
    name: string;
}