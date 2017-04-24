import { BehaviorSubject, Observable } from '@reactivex/rxjs';
import { LoginState } from './';

export interface IAuthenticationService {
    readonly State: BehaviorSubject<LoginState>;
    CheckForUpdate();
    Login(username: string, password: string): Observable<boolean>;
    Logout(): void;
}