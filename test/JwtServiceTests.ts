import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { JwtService, TokenStore, TokenPersist, LoginResponse, Token, LoginState } from '../src/Authentication';
import { MockHttpProvider } from './Mocks/MockHttpProvider';
import { Observable, BehaviorSubject } from '@reactivex/rxjs';


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
    public 'State change should update global header on HttpProvider to access token head & payload'(){
        let headers = this.httpProvider.actualHeaders;
        expect(headers['X-Access-Data']).to.be.eq('.');

        (this.jwtService['TokenStore'] as TokenStore).AccessToken = Token.FromHeadAndPayload('a.b');
        (this.jwtService['stateSubject'] as BehaviorSubject<LoginState>).next(LoginState.Authenticated);
        expect(headers['X-Access-Data']).to.be.eq('a.b');
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

}