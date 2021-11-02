import { Action } from "@ngrx/store";

export const ISSUER_REGISTER = 'issuer-registration';
export const USER_REGISTER = 'user-registration';

export class IssuerRegState implements Action {
    readonly type = ISSUER_REGISTER;
}

export class UserRegState implements Action {
    readonly type = USER_REGISTER;
}

export type RouteAction = IssuerRegState | UserRegState;
