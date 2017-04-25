/**
 * @module Authentication
 */ /** */
 
import { Observable } from '@reactivex/rxjs';
import { LoginState } from './';
import { HttpProviders } from '../SN';

export interface IAuthenticationService {
    readonly State: Observable<LoginState>;
    CheckForUpdate();
    Login(username: string, password: string): Observable<boolean>;
    Logout(): void;

}