import { Action } from "@ngrx/store";

export const AUTH_IN = 'user authentication in';
export const AUTH_OUT = 'user authentication out';

export class LoginAuthentication implements Action {
    readonly type = AUTH_IN;
}

export class LogoutAuthentication implements Action {
    readonly type = AUTH_OUT;
}

export type AuthActions = LoginAuthentication | LogoutAuthentication;
