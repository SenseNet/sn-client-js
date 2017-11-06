import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { BehaviorSubject, } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { JwtService, LoginResponse, LoginState, TokenPersist, TokenStore } from '../src/Authentication';
import { MockHttpProvider } from './Mocks/MockHttpProvider';
import { MockTokenFactory } from './Mocks/MockTokenFactory';

// tslint:disable:no-string-literal

const expect = Chai.expect;

@suite('JwtService')
export class JwtServiceTests {

    private readonly _hostUrl: string = 'https://localhost';
    private readonly _tokenTemplate: string = '${siteName}-${tokenName}';

    private _httpProvider: MockHttpProvider;
    private _jwtService: JwtService;

    // tslint:disable-next-line:naming-convention
    public before() {
        this._httpProvider = new MockHttpProvider();
        this._jwtService = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'session');
    }

    @test
    public 'Construct with session persistance'() {
        const store = this._jwtService['_tokenStore'] as TokenStore;
        expect(store['_tokenPersist']).to.be.eq(TokenPersist.Session);
    }

    @test
    public 'State change should update global header on HttpProvider to access token head & payload'() {
        const headers = this._httpProvider.ActualHeaders as any;
        const validToken = MockTokenFactory.CreateValid();

        expect(headers['X-Access-Data']).to.be.eq(undefined);

        (this._jwtService['_tokenStore'] as TokenStore).AccessToken =  validToken; // Token.FromHeadAndPayload('a.b');
        (this._jwtService['_stateSubject'] as BehaviorSubject<LoginState>).next(LoginState.Authenticated);
        expect(headers['X-Access-Data']).to.be.eq(validToken.toString());
    }

    @test
    public 'Construct with expiration persistance'() {
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        expect(store['_tokenPersist']).to.be.eq(TokenPersist.Expiration);
    }

    @test
    public 'checkForUpdate should return an observable'() {
        const obs = this._jwtService.CheckForUpdate();
        expect(obs).to.be.instanceof(Observable);
    }

    @test
    public 'LoginResponse with invalid token sould be emit False'(done: MochaDone) {
        this._httpProvider.AddResponse({
            access: 'invalidEncodedValue',
            refresh: 'invalidEncodedValue'
        } as LoginResponse);

        const obs = this._jwtService.Login('usr', 'pass');
        obs.subscribe((t) => {
            expect(t).to.be.eq(false);
            expect(this._jwtService.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test
    public 'Error response from Http endpoint response sould be emit False'(done: MochaDone) {
        this._httpProvider.AddError('Error happened :(');
        const obs = this._jwtService.Login('usr', 'pass');
        obs.subscribe((t) => {
            expect(t).to.be.eq(false);
            expect(this._jwtService.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test public 'CheckForUpdate should resolve with false and state should be Authenticated, if the access token is valid'(done: MochaDone) {
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateValid());
        t.CheckForUpdate().first().subscribe((result) => {
            expect(result).to.be.eq(false);
            expect(t.CurrentState).to.be.eq(LoginState.Authenticated);
            done();
        });
    }

    @test public 'CheckForUpdate should resolve with false and state should be Unauthenticated, if refresh token has been expired'(done: MochaDone) {

        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateExpired());
        store.SetToken('refresh', MockTokenFactory.CreateExpired());
        t.CheckForUpdate().first().subscribe((result) => {
            expect(result).to.be.eq(false);
            expect(t.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        });
    }

    @test public 'CheckForUpdate should resolve with true and state should be Authenticated, if refresh token is valid, but the access token has been expired and the request was valid'(done: MochaDone) {
        const refreshToken = MockTokenFactory.CreateValid();
        this._httpProvider.AddResponse({
            access: MockTokenFactory.CreateValid().toString(),
            refresh: refreshToken.toString()
        });
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateExpired());
        store.SetToken('refresh', refreshToken);
        t.CheckForUpdate().first().subscribe((result) => {
            expect(result).to.be.eq(true);
            expect(t.CurrentState).to.be.eq(LoginState.Authenticated);
            done();
        });
    }

    @test public 'CheckForUpdate should resolve with false and state should be Unauthenticated, if refresh token is valid, but the access token has been expired and the request has failed'(done: MochaDone) {
        const refreshToken = MockTokenFactory.CreateValid();
        this._httpProvider.AddError(new Error('There was some error during the token refresh request.'));
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateExpired());
        store.SetToken('refresh', refreshToken);
        t.CheckForUpdate().first().subscribe((result) => {
            done('This request should be failed, but it succeeded.');
        }, (err) => {
            expect(t.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        });
    }

    @test public 'Login should resolve with true and set state to Authenticated, when request succeeded. '(done: MochaDone) {
        const refreshToken = MockTokenFactory.CreateValid();
        this._httpProvider.AddResponse({
            access: MockTokenFactory.CreateValid().toString(),
            refresh: refreshToken.toString()
        });
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        t.Login('user', 'pass').first().subscribe((result) => {
            expect(t.CurrentState).to.be.eq(LoginState.Authenticated);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test public 'Login should resolve with false and set state to Unauthenticated, when request failed. '(done: MochaDone) {
        this._httpProvider.AddError(new Error('There was some error during the token refresh request.'));
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        t.Login('user', 'pass').first().subscribe((result) => {
            expect(t.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test public 'Logout should invalidate both Access and Refresh tokens'(done: MochaDone) {
        this._httpProvider.AddResponse({success: true});
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateValid());
        store.SetToken('refresh', MockTokenFactory.CreateValid());
        t.CheckForUpdate().subscribe((result) => {
            expect(t.CurrentState).to.be.eq(LoginState.Authenticated);
            t.Logout().subscribe((newState) => {
                expect(t.CurrentState).to.be.eq(LoginState.Unauthenticated);
                done();
            });
        });
    }

    @test public 'CurrentUser should return BuiltIn\\Visitor by default'() {
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        expect(t.CurrentUser).to.be.eq('BuiltIn\\Visitor');
    }

    @test public 'CurrentUser should return user from payload when access token is set and valid'() {
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateValid());
        expect(t.CurrentUser).to.be.eq('BuiltIn\\Mock');
    }

    @test public 'CurrentUser should return user from payload when refresh token is set and valid'() {
        const t = new JwtService(this._httpProvider, this._hostUrl, this._tokenTemplate, 'expiration');
        const store = t['_tokenStore'] as TokenStore;
        store.SetToken('refresh', MockTokenFactory.CreateValid());
        expect(t.CurrentUser).to.be.eq('BuiltIn\\Mock');
    }

}
