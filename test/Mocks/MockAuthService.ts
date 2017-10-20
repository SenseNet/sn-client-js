/**
 * @module Mocks
 */ /** */
import { IAuthenticationService, LoginState } from '../../src/Authentication';
import { Observable, BehaviorSubject, ReplaySubject } from '@reactivex/rxjs';

export class MockAuthService implements IAuthenticationService {
    CurrentUser: string = 'BuiltIn\\Visitor';
    public StateSubject: BehaviorSubject<LoginState>;

    constructor() {
        this.StateSubject = new BehaviorSubject(LoginState.Pending);
    }

    public ValidUserName: string;
    public ValidPassword: string

    public get State(): Observable<LoginState>{
        return this.StateSubject.asObservable();
    }

    public get CurrentState(): LoginState{
        return this.StateSubject.value;
    }
    CheckForUpdate() {
        return Observable.from([false]);
    }
    Login(username: string, password: string): Observable<boolean> {
        let subject = new ReplaySubject<boolean>();
        if (username === this.ValidUserName && password === this.ValidPassword){
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