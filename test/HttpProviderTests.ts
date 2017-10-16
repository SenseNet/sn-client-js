import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { RxAjaxHttpProvider } from '../src/HttpProviders';
import { Observable, AjaxRequest } from '@reactivex/rxjs';
import { MockHttpProvider } from './Mocks/MockHttpProvider';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class HttpProviderTests {

    private readonly _testHeaderName: string = 'testHeader';
    private readonly _testHeaderValue: string = 'testHeaderValue';

    @test
    public SetGlobalHeaders(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);
        let headers = p.ActualHeaders;
        Chai.expect(headers[this._testHeaderName as any]).to.be.eq(this._testHeaderValue);
    }

    @test
    public UnsetGlobalHeaders(){
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);
        let headers = p.ActualHeaders;
        Chai.expect(headers[this._testHeaderName as any]).to.be.eq(this._testHeaderValue);

        p.UnsetGlobalHeader(this._testHeaderName);
        headers = p.ActualHeaders;
        Chai.expect(headers[this._testHeaderName as any]).to.be.eq(undefined);
    }

    @test
    public 'globalHeaders should override options.headers'() {
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);

        let options: AjaxRequest = {
            headers: {
            }
        };
        (options.headers as any)[this._testHeaderName] = 'modifiedValue';
        p.Ajax(Object, options).toPromise();
        expect((p.ActualHeaders as any)[this._testHeaderName as any]).to.be.eq(this._testHeaderValue);
    }

    @test
    public 'RxHttpProvider Ajax should return an Observable<TReturns>'() {
        let p = new RxAjaxHttpProvider();
        let obs = p.Ajax(Object, {});
        expect(obs).to.be.instanceof(Observable);
    }

    @test
    public 'RxHttpProvider Upload should return an Observable<TReturns>'(){
        (global as any).XMLHttpRequest = class { open(){}; send(){}; setRequestHeader(){}};
        (global as any).File = class { slice(from: number, size: number){ return ''} };
        (global as any).FormData = class { append(){}; };
        let p = new RxAjaxHttpProvider();
        let file = new File(['alma'], 'alma.txt');
        let obs = p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        });
        expect(obs).to.be.instanceof(Observable);
    }

}