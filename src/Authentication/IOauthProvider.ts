export interface IOauthProvider {
    GetToken(): Promise<string>;
    Login(token: string): Promise<any>;
}
