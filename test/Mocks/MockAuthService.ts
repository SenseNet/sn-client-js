import { IAuthenticationService, LoginState } from '../../src/Authentication';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from '@reactivex/rxjs';

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
    CheckForUpdate() {
        //
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
    Logout(): void {
        //
    }

}