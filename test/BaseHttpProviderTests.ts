import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigBehavior } from '../src/Config/snconfigbehavior';
import { SnConfigFieldModel } from '../src/Config/snconfigfieldmodel';
import { SnConfigFieldModelStore } from '../src/Config/snconfigfieldmodelstore';
import { MockHttpProvider } from '../src/HttpProviders';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class BaseHttpProviderTests {

    private readonly testHeaderName = 'testHeader';
    private readonly testHeaderValue = 'testHeaderValue';

    @test('#setGlobalHeaders')
    public setGlobalHeaders(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);
        let headers = p.actualHeaders;
        Chai.expect(headers[this.testHeaderName]).to.be.eq(this.testHeaderValue);
    }
    @test('globalHeaders should override options.headers')
    public globalHeadersOverride(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this.testHeaderName, this.testHeaderValue);

        let options = {};
        options[this.testHeaderName] = 'modifiedValue';
        p.Ajax(Object, options).toPromise();
        expect(p.lastOptions.headers[this.testHeaderName, this.testHeaderValue]);

    }

}