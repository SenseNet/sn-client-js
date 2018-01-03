import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { setTimeout } from 'timers';
import { IDisposable, using, usingAsync } from '../src/SN';
const expect = Chai.expect;

class MockDisposable implements IDisposable {
    private _disposed: boolean = false;
    public IsDisposed = () => this._disposed;
    public Dispose = () => {
        this._disposed = true;
        this.DisposeCallback && this.DisposeCallback();
    }

    public Whooops() {
        throw Error('Whooops');
    }

    public DisposeCallback: () => void;

}

@suite('Disposable Tests')
export class DisposableTests {
    @test
    public 'Can be constructed'() {
        using(new MockDisposable(), (d) => {
            expect(d).to.be.instanceof(MockDisposable);
        });
    }

    @test
    public 'Dispose value is correct before and after disposition'() {
        const d = new MockDisposable();
        expect(d.IsDisposed()).to.be.eq(false);
        d.Dispose();
        expect(d.IsDisposed()).to.be.eq(true);
    }

    @test
    public 'Is disposed on error'(done: MochaDone) {
        try {
            using(new MockDisposable(), (d) => {
                d.DisposeCallback = () => { done(); };

                d.Whooops();
            });
        } catch {
            /** ignore */
        }

    }

    @test
    public 'Is disposed with usingAsync'(done: MochaDone) {
        usingAsync(new MockDisposable(), async (d) => {
            d.DisposeCallback = () => {
                done();
            };
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 1);
            });
        });
    }

    @test
    public 'Is disposed when usingAsync fails'(done: MochaDone) {
        usingAsync(new MockDisposable(), async (d) => {
            d.DisposeCallback = () => {
                done();
            };
            return new Promise((resolve, reject) => {
                setTimeout(reject, 1);
            });
        }).catch((err) => {
            /** ignore */
        });
    }
}
