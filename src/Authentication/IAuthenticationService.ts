/**
 * @module Authentication
 */ /** */

import { Observable } from 'rxjs/Observable';
import { LoginState } from './';

/**
 * Interface that describes how injectable Authentication Services should work
 */
export interface IAuthenticationService {
    /**
     * This observable is a public API for subscribing the current state and it's changes.
     * Recommended to work with a private BehaviorSubject in the backgroud.
     */
    readonly State: Observable<LoginState>;

    /**
     * Represents the actual LoginState. Recommended to use the State's BehaviorSubject's .Value
     */
    readonly CurrentState: LoginState;

    /**
     * Executes a check for the current state
     * @returns An observable that will be resolved with a boolean, that indicates if a refres was needed.
     */
    CheckForUpdate(): Observable<boolean>;

    /**
     * Tries to log in with a specified credentials. Updates the current state subject based on the login response.
     * @param {string} username The user's name
     * @param {string} password The user's password
     * @returns {Observable<boolean>} that indicates if the login was successful
     */
    Login(username: string, password: string): Observable<boolean>;

    /**
     * Logs out the current user, invalidates the session
     * @returns {Observable<boolean>} that indicates if logging out was successful
     */
    Logout(): Observable<boolean>;

    CurrentUser: string;

}
