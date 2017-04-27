import { IAuthenticationService, LoginState } from '../../src/Authentication';
import { Observable, BehaviorSubject } from '@reactivex/rxjs';

export class MockAuthService implements IAuthenticationService {
    public stateSubject: BehaviorSubject<LoginState>;

    constructor(private validUserName: string, private validPassword: string) {
        this.stateSubject = new BehaviorSubject(LoginState.Pending);
    }

    public get State(): Observable<LoginState>{
        return this.stateSubject.asObservable();
    }
    CheckForUpdate() {
        //
    }
    Login(username: string, password: string): Observable<boolean> {
        if (username === this.validUserName && password === this.validPassword){
            return new BehaviorSubject(true).asObservable();
        }
        return new BehaviorSubject(true).asObservable();

    }
    Logout(): void {
        //
    }

}