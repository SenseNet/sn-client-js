import * as Chai from 'chai';
import { TokenStore, TokenPersist, TokenStoreType, Token } from '../src/Authentication';

const expect = Chai.expect;

class MockStorage {
    private _innerStore: any[] = []
    public getItem(key: string){
        return this._innerStore[key as any];
    }

    public setItem(key: string, value: any){
        this._innerStore[key as any] = value;
    }
}

type testParams = [TokenPersist, Partial<Document>, Storage, Storage, TokenStoreType];

let tokenStorageStoreParameters = {
    'InMemory with Expiration': [TokenPersist.Expiration, undefined, undefined, undefined, TokenStoreType.InMemory],
    'InMemory with Session': [TokenPersist.Session, undefined, undefined, undefined, TokenStoreType.InMemory],

    'Cookie with Expiration': [TokenPersist.Expiration, {cookie: ''}, undefined, undefined, TokenStoreType.ExpirationCookie],
    'Cookie with Session': [TokenPersist.Session, {cookie: ''}, undefined, undefined, TokenStoreType.SessionCookie],

    'Storage with Expiration': [TokenPersist.Expiration, undefined, new MockStorage(), new MockStorage(), TokenStoreType.LocalStorage],
    'Storage with Session': [TokenPersist.Session, undefined, new MockStorage(), new MockStorage(), TokenStoreType.SessionStorage],
}

for (let key in tokenStorageStoreParameters) {
    if (tokenStorageStoreParameters.hasOwnProperty(key)) {

        let siteName: string = 'https://localhost';
        let tokenTemplate: string = '${siteName}-${tokenName}';

        let element = (tokenStorageStoreParameters as any)[key] as testParams;
        let testToken = Token.FromHeadAndPayload('eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzZW5zZW5ldCIsInN1YiI6ImF1dGgiLCJhdWQiOiJjbGllbnQiLCJleHAiOjE0OTMzODM3NTQsImlhdCI6MTQ5MzM4MzY5NCwibmJmIjoxNDkzMzgzNjk0LCJuYW1lIjoiQnVpbHRJblxcQWRtaW4ifQ');


        describe(`TokenStore - ${key}`, () => {

            let tokenStore = new TokenStore(siteName, tokenTemplate, element[0], element[1] as any, element[2], element[3])
            it('should construct the proper store', () => {
                expect(TokenStoreType[tokenStore.TokenStoreType]).to.be.eq(TokenStoreType[element[4]]);
            });

            it('Should be constructed with with invalid tokens', () => {
                expect(tokenStore.AccessToken.IsValid()).to.be.eq(false);
                expect(tokenStore.RefreshToken.IsValid()).to.be.eq(false);
            });

            it('Should be able to set AccessToken', () => {
                tokenStore.AccessToken = testToken;
                expect(tokenStore.AccessToken.toString()).to.be.eq(testToken.toString());
            });

            it('Should be able to set RefreshToken', () => {
                tokenStore.RefreshToken = testToken;
                expect(tokenStore.RefreshToken.toString()).to.be.eq(testToken.toString());
            });
        })
    }
}