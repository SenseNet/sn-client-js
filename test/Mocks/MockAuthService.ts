/**
 * @module Mocks
 */ /** */
import { IAuthenticationService, LoginState } from '../../src/Authentication';
import { Observable, BehaviorSubject, ReplaySubject } from '@reactivex/rxjs';

export class MockAuthService implements IAuthenticationService {
    public stateSubject: BehaviorSubject<LoginState>;

    constructor() {
        this.stateSubject = new BehaviorSubject(LoginState.Pending);
    }

    public validUserName: string;
    public validPassword: string

    public get State(): Observable<LoginState>{
        return this.stateSubject.asObservable();
    }

    public get CurrentState(): LoginState{
        return this.stateSubject.value;
    }
    CheckForUpdate() {
        return Observable.from([false]);
    }
    Login(username: string, password: string): Observable<boolean> {
        let subject = new ReplaySubject<boolean>();
        if (username === this.validUserName && password === this.validPassword){
            subject.next(true);
        } else {
            subject.next(false);
        }
        return subject.asObservable();

    }
    Logout(): Observable<boolean> {
        return Observable.from([true]);
    }

}