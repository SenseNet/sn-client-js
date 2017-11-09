/**
 * @module Mocks
 */ /** */
import { BehaviorSubject,  } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IAuthenticationService, IOauthProvider, LoginResponse, LoginState } from '../../src/Authentication';

export class MockAuthService implements IAuthenticationService {
    public HandleAuthenticationResponse(response: LoginResponse): boolean {
        throw new Error('Method not implemented.');
    }
    public SetOauthProvider<T extends IOauthProvider>(provider: T) {
        throw new Error('Method not implemented.');
    }
    public GetOauthProvider<T extends IOauthProvider>(providerType: new (...args: any[]) => T): T {
        throw new Error('Method not implemented.');
    }

    public CurrentUser: string = 'BuiltIn\\Visitor';
    public StateSubject: BehaviorSubject<LoginState>;

    constructor() {
        this.StateSubject = new BehaviorSubject(LoginState.Pending);
    }

    public ValidUserName: string;
    public ValidPassword: string;

    public get State(): Observable<LoginState> {
        return this.StateSubject.asObservable();
    }

    public get CurrentState(): LoginState {
        return this.StateSubject.value;
    }
    public CheckForUpdate() {
        return Observable.from([false]);
    }
    public Login(username: string, password: string): Observable<boolean> {
        const subject = new ReplaySubject<boolean>();
        if (username === this.ValidUserName && password === this.ValidPassword) {
            subject.next(true);
        } else {
            subject.next(false);
        }
        return subject.asObservable();

    }
    public Logout(): Observable<boolean> {
        return Observable.from([true]);
    }

}
