import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigBehavior } from '../src/Config/snconfigbehavior';
import { SnConfigFieldModel } from '../src/Config/snconfigfieldmodel';
import { SnConfigFieldModelStore } from '../src/Config/snconfigfieldmodelstore';
import { RxAjaxHttpProvider } from '../src/HttpProviders';
import { Observable } from '@reactivex/rxjs';
import { MockHttpProvider } from './Mocks/MockHttpProvider';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class HttpProviderTests {

    private readonly testHeaderName = 'testHeader';
    private readonly testHeaderValue = 'testHeaderValue';

    @test
    public setGlobalHeaders(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);
        let headers = p.actualHeaders;
        Chai.expect(headers[this.testHeaderName]).to.be.eq(this.testHeaderValue);
    }
    @test
    public 'globalHeaders should override options.headers'() {
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);

        let options = {};
        options[this.testHeaderName] = 'modifiedValue';
        p.Ajax(Object, options).toPromise();
        expect(p.lastOptions.headers[this.testHeaderName, this.testHeaderValue]);
    }

    @test
    public 'RxHttpProvider should return an Observable<TReturns>'() {
        let p = new RxAjaxHttpProvider();
        let obs = p.Ajax(Object, {});
        expect(obs).to.be.instanceof(Observable);
    }

}