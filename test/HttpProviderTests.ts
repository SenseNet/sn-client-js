import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { AjaxRequest } from 'rxjs/observable/dom/AjaxObservable';
import { RxAjaxHttpProvider } from '../src/HttpProviders';
import { MockHttpProvider } from './Mocks/MockHttpProvider';

const expect = Chai.expect;
// tslint:disable:naming-convention

@suite('BaseHttpProvider')
export class HttpProviderTests {

    private readonly _testHeaderName: string = 'testHeader';
    private readonly _testHeaderValue: string = 'testHeaderValue';

    @test
    public SetGlobalHeaders() {
        const p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);
        Chai.expect(p.ActualHeaders.get(this._testHeaderName)).to.be.eq(this._testHeaderValue);
    }

    @test
    public UnsetGlobalHeaders() {
        const p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);
        Chai.expect(p.ActualHeaders.get(this._testHeaderName)).to.be.eq(this._testHeaderValue);

        p.UnsetGlobalHeader(this._testHeaderName);
        Chai.expect(p.ActualHeaders.get(this._testHeaderName)).to.be.eq(undefined);
    }

    @test
    public 'globalHeaders should override options.headers'() {
        const p = new MockHttpProvider();
        p.UseTimeout = false;
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);

        const options: AjaxRequest = {
            headers: {
            }
        };
        p.AddResponse({});
        (options.headers as any)[this._testHeaderName] = 'modifiedValue';
        p.Ajax(Object, options).share();
        expect((p.RequestLog[0].Options.headers as any)[this._testHeaderName]).to.be.eq(this._testHeaderValue);
    }

    @test
    public 'globalHeaders should be overridden by additional headers'() {
        const p = new MockHttpProvider();
        p.SetGlobalHeader(this._testHeaderName, this._testHeaderValue);
        p.AddResponse({});
        p.UseTimeout = false;
        p.Ajax(Object, {}, [{name: this._testHeaderName, value: 'modifiedValue'}]).toPromise();
        expect((p.RequestLog[0].Options.headers as any)[this._testHeaderName]).to.be.eq('modifiedValue');
    }

    @test
    public 'RxHttpProvider Ajax should make an XmlHttpRequest call'(done: MochaDone) {
        const p = new RxAjaxHttpProvider();
        (global as any).XMLHttpRequest = class {
            public open() { /* */ }
            public send() {
                this.readyState = 1;
                // Shouldn't resolve for now
                this.onreadystatechange();

                this.readyState = 4;
                this.status = 200;
                this.response = {};
                this.onreadystatechange();
            }
            public setRequestHeader() { /**/ }
            public onreadystatechange: () => void;
            public readyState: number;
            public status: number;
            public response: any; };
        p.Ajax(Object, {}).subscribe((result) => {
            done();
        }, (err) => done(err));
    }

    @test
    public 'RxHttpProvider Upload should make an XmlHttpRequest call and parses response if possible'(done: MochaDone) {
        (global as any).XMLHttpRequest = class {
            public open() { /**/ } public send() {
                setTimeout(() => {
                    this.readyState = 1;
                    this.onreadystatechange();  // Should be skipped
                    this.readyState = 4;
                    this.status = 200;
                    this.response = '{"success": "true"}';
                    this.onreadystatechange();
                }, 10);
            } public setRequestHeader() { /**/ } public onreadystatechange: () => void; public readyState: number; public status: number; public response: any;
        };
        (global as any).FormData = class { public append() { /**/ } };
        const p = new RxAjaxHttpProvider();
        const file = new File(['alma'], 'alma.txt');
        p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        }).subscribe((result) => {
            expect((result as any).success).to.be.eq('true');
            done();
        }, (err) => done(err));
    }

    @test
    public 'RxHttpProvider Upload should make an XmlHttpRequest call and returns raw response if failed to parse'(done: MochaDone) {
        (global as any).XMLHttpRequest = class {
            public open() { /**/ } public send() {
                setTimeout(() => {
                    this.readyState = 4; this.status = 200; this.response = 'a*b*c'; this.onreadystatechange();
                }, 10);
            } public setRequestHeader() { /**/ } public onreadystatechange: () => void; public readyState: number; public status: number; public response: any;
        };
        (global as any).FormData = class { public append() { /**/ } };
        const p = new RxAjaxHttpProvider();
        const file = new File(['alma'], 'alma.txt');
        p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        }).subscribe((result) => {
            expect(result).to.be.eq('a*b*c');
            done();
        }, (err) => done(err));
    }

    @test
    public 'RxHttpProvider Upload should distribute an Error if the request has an invalid status'(done: MochaDone) {
        (global as any).XMLHttpRequest = class {
            public open() { /**/ } public send() {
                setTimeout(() => {
                    this.readyState = 4; this.status = 404; this.response = 'a*b*c'; this.onreadystatechange();
                }, 10);
            } public setRequestHeader() { /**/ } public onreadystatechange: () => void; public readyState: number; public status: number; public response: any;
        };
        (global as any).FormData = class { public append() { /**/ } };
        const p = new RxAjaxHttpProvider();
        const file = new File(['alma'], 'alma.txt');
        p.Upload(Object, file, {
            url: '',
            body: {
                data: 1
            },
            headers: {
                'X-Alma': 1
            }
        }).subscribe((result) => {
            done('This request should be failed');
        }, (err) => done());
    }

}
