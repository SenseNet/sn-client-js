import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Query } from '../src/Query';


const expect = Chai.expect;

@suite('ContentSerializer')
export class QueryTests {
    @test
    public 'Can be constructed'(){
        const q = Query.Create('root/a', q => q.TypeIs);
        expect(q).to.be.instanceof(Query);
    }
}