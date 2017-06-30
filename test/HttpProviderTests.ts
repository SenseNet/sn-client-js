import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { RxAjaxHttpProvider } from '../src/HttpProviders';
import { Observable } from '@reactivex/rxjs';
import { MockHttpProvider } from './Mocks/MockHttpProvider';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class HttpProviderTests {

    private readonly testHeaderName: string = 'testHeader';
    private readonly testHeaderValue: string = 'testHeaderValue';

    @test
    public setGlobalHeaders(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);
        let headers = p.actualHeaders;
        Chai.expect(headers[this.testHeaderName as any]).to.be.eq(this.testHeaderValue);
    }

    @test
    public unsetGlobalHeaders(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);
        let headers = p.actualHeaders;
        Chai.expect(headers[this.testHeaderName as any]).to.be.eq(this.testHeaderValue);

        p.UnsetGlobalHeader(this.testHeaderName);
        headers = p.actualHeaders;
        Chai.expect(headers[this.testHeaderName as any]).to.be.undefined;
    }    

    @test
    public 'globalHeaders should override options.headers'() {
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);

        let options: any = {};
        options[this.testHeaderName as any] = 'modifiedValue';
        p.Ajax(Object, options).toPromise();
        expect((p.lastOptions as any).headers[this.testHeaderName as any]).to.be.eq(this.testHeaderValue);
    }

    @test
    public 'RxHttpProvider should return an Observable<TReturns>'() {
        let p = new RxAjaxHttpProvider();
        let obs = p.Ajax(Object, {});
        expect(obs).to.be.instanceof(Observable);
    }

}