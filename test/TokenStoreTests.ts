import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { TokenStore, TokenPersist, TokenStoreType, Token } from '../src/Authentication';

const expect = Chai.expect;

@suite('TokenStore')
export class TokenStoreTests {

    private readonly siteName: string = 'https://localhost';
    private readonly tokenTemplate: string = '${siteName}-${tokenName}';

    private tokenStore: TokenStore;

    private testToken: Token;

    before(){
        this.tokenStore = new TokenStore(this.siteName, this.tokenTemplate, TokenPersist.Expiration);
        this.testToken = Token.FromHeadAndPayload('eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzZW5zZW5ldCIsInN1YiI6ImF1dGgiLCJhdWQiOiJjbGllbnQiLCJleHAiOjE0OTMzODM3NTQsImlhdCI6MTQ5MzM4MzY5NCwibmJmIjoxNDkzMzgzNjk0LCJuYW1lIjoiQnVpbHRJblxcQWRtaW4ifQ');
    }

    @test
    public 'Construct an in-memory store'(){
        expect(this.tokenStore.TokenStoreType).to.be.eq(TokenStoreType.InMemory)
    }

    
    @test
    public 'Verify that store is constructed with invalid tokens initially'(){
        expect(this.tokenStore.AccessToken.IsValid()).to.be.eq(false);
        expect(this.tokenStore.RefreshToken.IsValid()).to.be.eq(false);
    }

    @test
    public 'Verify setting AccessToken'(){
        this.tokenStore.AccessToken = this.testToken;
        expect(this.tokenStore.AccessToken.toString()).to.be.eq(this.testToken.toString());
    }    

    @test
    public 'Verify setting RefreshToken'(){
        this.tokenStore.RefreshToken = this.testToken;
        expect(this.tokenStore.RefreshToken.toString()).to.be.eq(this.testToken.toString());
    }

    
}