import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Token } from '../src/Authentication/Token';

const expect = Chai.expect;

@suite('Tokens')
export class TokenTests {

    private head = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9';
    private payload = 'eyJpc3MiOiJzZW5zZW5ldCIsInN1YiI6ImF1dGgiLCJhdWQiOiJjbGllbnQiLCJleHAiOjE0OTMyODQ1NDYsImlhdCI6MTQ5MzI4NDQ4NiwibmJmIjoxNDkzMjg0NDg2LCJuYW1lIjoiQnVpbHRJblxcQWRtaW4ifQ';

    private createTestToken(){
        return Token.FromHeadAndPayload(`${this.head}.${this.payload}`);
    }


    @test('Construct token from encoded head and payload has valid serialized values')
    public ConstructFromHeadAndPayload(){
        let t = this.createTestToken();
        
        expect(t.Username).to.be.eq('BuiltIn\\Admin');

        expect(t.GetPayload().name).to.be.eq('BuiltIn\\Admin');
        expect(t.IssuedDate.toUTCString()).to.be.eq('Thu, 27 Apr 2017 09:14:46 GMT');
        expect(t.NotBefore.toUTCString()).to.be.eq('Thu, 27 Apr 2017 09:14:46 GMT');
    }

    @test('Create empty token')
    public CreateEmpty(){
        let t = Token.CreateEmpty();
        expect(t.Username).to.be.eq('')
        expect(t.IsValid()).to.be.false;
    }

    @test('toString should return the original head and payload')
    public toStringTest(){
        let t = this.createTestToken();
        expect(t.toString()).to.be.eq(`${this.head}.${this.payload}`);
    }
}