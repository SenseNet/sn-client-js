import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { RxAjaxHttpProvider } from '../src/HttpProviders';
import { AjaxRequest } from '@reactivex/rxjs';
import { MockHttpProvider } from './Mocks/MockHttpProvider';

const expect = Chai.expect;

@suite('BaseHttpProvider')
export class HttpProviderTests {

    private readonly _testHeaderName: string = 'testHeader';
    private readonly _testHeaderValue: string = 'testHeaderValue';

    @test
    public SetGlobalHeaders() {
        let p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);
        let headers = p.ActualHeaders;
        Chai.expect(headers[this._testHeaderName as any]).to.be.eq(this._testHeaderValue);
    }

    @test
    public UnsetGlobalHeaders() {
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
    public 'RxHttpProvider Ajax should make an XmlHttpRequest call'(done: MochaDone) {
        let p = new RxAjaxHttpProvider();
        (global as any).XMLHttpRequest = class { open() { }; send() { this.readyState = 4; this.status = 200; this.response = {}; this.onreadystatechange() }; setRequestHeader() { }; onreadystatechange: () => void; readyState: number; status: number; response: any };
        p.Ajax(Object, {}).subscribe(result => {
            done();
        }, err => done(err));
    }

    @test
    public 'RxHttpProvider Upload should make an XmlHttpRequest call and parses response if possible'(done: MochaDone) {
        (global as any).XMLHttpRequest = class {
            open() { }; send() {
                setTimeout(() => {
                    this.readyState = 4; this.status = 200; this.response = '{"success": "true"}'; this.onreadystatechange()
                }, 10);
            }; setRequestHeader() { }; onreadystatechange: () => void; readyState: number; status: number; response: any
        };
        (global as any).File = class { slice(from: number, size: number) { return '' } };
        (global as any).FormData = class { append() { }; };
        let p = new RxAjaxHttpProvider();
        let file = new File(['alma'], 'alma.txt');
        p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        }).subscribe(result => {
            expect((result as any).success).to.be.eq('true');
            done()
        }, err => done(err));
    }

    @test
    public 'RxHttpProvider Upload should make an XmlHttpRequest call and returns raw response if failed to parse'(done: MochaDone) {
        (global as any).XMLHttpRequest = class {
            open() { }; send() {
                setTimeout(() => {
                    this.readyState = 4; this.status = 200; this.response = 'a*b*c'; this.onreadystatechange()
                }, 10);
            }; setRequestHeader() { }; onreadystatechange: () => void; readyState: number; status: number; response: any
        };
        (global as any).File = class { slice(from: number, size: number) { return '' } };
        (global as any).FormData = class { append() { }; };
        let p = new RxAjaxHttpProvider();
        let file = new File(['alma'], 'alma.txt');
        p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        }).subscribe(result => {
            expect(result).to.be.eq('a*b*c');
            done()
        }, err => done(err));
    }

    @test
    public 'RxHttpProvider Upload should distribute an Error if the request has an invalid status'(done: MochaDone) {
        (global as any).XMLHttpRequest = class {
            open() { }; send() {
                setTimeout(() => {
                    this.readyState = 4; this.status = 404; this.response = 'a*b*c'; this.onreadystatechange()
                }, 10);
            }; setRequestHeader() { }; onreadystatechange: () => void; readyState: number; status: number; response: any
        };
        (global as any).File = class { slice(from: number, size: number) { return '' } };
        (global as any).FormData = class { append() { }; };
        let p = new RxAjaxHttpProvider();
        let file = new File(['alma'], 'alma.txt');
        p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        }).subscribe(result => {
            done('This request should be failed')
        }, err => done());
    }

}