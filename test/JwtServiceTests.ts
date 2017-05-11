import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { JwtService, TokenStore, TokenPersist, LoginResponse, Token, LoginState } from '../src/Authentication';
import { MockHttpProvider } from './Mocks/MockHttpProvider';
import { Observable, BehaviorSubject } from '@reactivex/rxjs';
import { MockTokenFactory } from './Mocks/MockTokenFactory';


const expect = Chai.expect;

@suite('JwtService')
export class JwtServiceTests {

    private readonly hostUrl: string = 'https://localhost';
    private readonly tokenTemplate: string = '${siteName}-${tokenName}';

    private httpProvider: MockHttpProvider;
    private jwtService: JwtService;

    before() {
        this.httpProvider = new MockHttpProvider();
        this.jwtService = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'session');
    }

    @test
    public 'Construct with session persistance'() {
        let store = this.jwtService['TokenStore'] as TokenStore;
        expect(store['tokenPersist']).to.be.eq(TokenPersist.Session);
    }

    @test
    public 'State change should update global header on HttpProvider to access token head & payload'() {
        let headers = this.httpProvider.actualHeaders;
        let validToken = MockTokenFactory.CreateValid();

        expect(headers['X-Access-Data']).to.be.eq(undefined);


        (this.jwtService['TokenStore'] as TokenStore).AccessToken =  validToken; // Token.FromHeadAndPayload('a.b');
        (this.jwtService['stateSubject'] as BehaviorSubject<LoginState>).next(LoginState.Authenticated);
        expect(headers['X-Access-Data']).to.be.eq(validToken.toString());
    }


    @test
    public 'Construct with expiration persistance'() {
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        let store = t['TokenStore'] as TokenStore;
        expect(store['tokenPersist']).to.be.eq(TokenPersist.Expiration);
    }

    @test
    public 'checkForUpdate should return an observable'() {
        let obs = this.jwtService.CheckForUpdate();
        expect(obs).to.be.instanceof(Observable);
    }

    @test
    public 'LoginResponse with invalid token sould be emit False'(done) {
        this.httpProvider.setResponse({
            access: 'invalidEncodedValue',
            refresh: 'invalidEncodedValue'
        } as LoginResponse)

        let obs = this.jwtService.Login('usr', 'pass');
        obs.subscribe(t => {
            expect(t).to.be.eq(false);
            expect(this.jwtService.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        }, err => {
            done(err);
        });
    }

    @test
    public 'Error response from Http endpoint response sould be emit False'(done) {
        this.httpProvider.setError('Error happened :(');
        let obs = this.jwtService.Login('usr', 'pass');
        obs.subscribe(t => {
            expect(t).to.be.eq(false);
            expect(this.jwtService.CurrentState).to.be.eq(LoginState.Unauthenticated);
            done();
        }, err => {
            done(err);
        });
    }

    @test 'CheckForUpdate should resolve with false and state should be Authenticated, if the access token is valid'(done) {
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        let store = t['TokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateValid());
        t.CheckForUpdate().first().subscribe(result => {
            expect(result).to.be.eq(false);
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Authenticated]);
            done();
        })
    }

    @test 'CheckForUpdate should resolve with false and state should be Unauthenticated, if refresh token has been expired'(done) {

        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        let store = t['TokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateExpired());
        store.SetToken('refresh', MockTokenFactory.CreateExpired());
        t.CheckForUpdate().first().subscribe(result => {
            expect(result).to.be.eq(false);
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Unauthenticated]);
            done();
        })
    }

    @test 'CheckForUpdate should resolve with true and state should be Authenticated, if refresh token is valid, but the access token has been expired and the request was valid'(done) {
        let refreshToken = MockTokenFactory.CreateValid();
        this.httpProvider.setResponse({
            access: MockTokenFactory.CreateValid().toString(),
            refresh: refreshToken.toString()
        })
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        let store = t['TokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateExpired());
        store.SetToken('refresh', refreshToken);
        t.CheckForUpdate().first().subscribe(result => {
            expect(result).to.be.eq(true);
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Authenticated]);
            done();
        })
    }

    @test 'CheckForUpdate should resolve with false and state should be Unauthenticated, if refresh token is valid, but the access token has been expired and the request has failed'(done) {
        let refreshToken = MockTokenFactory.CreateValid();
        this.httpProvider.setError(new Error('There was some error during the token refresh request.'));
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        let store = t['TokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateExpired());
        store.SetToken('refresh', refreshToken);
        t.CheckForUpdate().first().subscribe(result => {
            done('This request should be failed, but it succeeded.');
        }, (err) => {
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Unauthenticated]);
            done();
        });
    }

    @test 'Login should resolve with true and set state to Authenticated, when request succeeded. '(done) {
        let refreshToken = MockTokenFactory.CreateValid();
                this.httpProvider.setResponse({
            access: MockTokenFactory.CreateValid().toString(),
            refresh: refreshToken.toString()
        });
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        t.Login('user', 'pass').first().subscribe(result => {
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Authenticated]);
            done();
        }, (err) => {
            done(err);
        });
    }    

    @test 'Login should resolve with false and set state to Unauthenticated, when request failed. '(done) {
        let refreshToken = MockTokenFactory.CreateValid();
        this.httpProvider.setError(new Error('There was some error during the token refresh request.'));
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        t.Login('user', 'pass').first().subscribe(result => {
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Unauthenticated]);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test 'Logout should invalidate both Access and Refresh tokens' (done) {
        this.httpProvider.setError(new Error('There was some error during the token refresh request.'));
        let t = new JwtService(this.httpProvider, this.hostUrl, this.tokenTemplate, 'expiration');
        let store = t['TokenStore'] as TokenStore;
        store.SetToken('access', MockTokenFactory.CreateValid());
        store.SetToken('refresh', MockTokenFactory.CreateValid());
        t.CheckForUpdate().subscribe(result => {
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Authenticated]);
            t.Logout();
            expect(LoginState[t.CurrentState]).to.be.eq(LoginState[LoginState.Unauthenticated]);
            done();
        });
    }

}