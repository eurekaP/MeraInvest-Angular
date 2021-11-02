import { Action } from "@ngrx/store";

export const USER_DATA = 'user data';
export const USER_DETAILS = 'user details';
export const COMPANY_DETAILS = 'company details';


export class UserAuthenticationData implements Action {
    readonly type = USER_DATA;

    constructor(public payload: any) {}
}

export class UserAuthenticationDetails implements Action {
    readonly type = USER_DETAILS;

    constructor(public payload: any) {}
}


export class IssuerCompanyDetails implements Action {
    readonly type = COMPANY_DETAILS;

    constructor(public payload: any) {}
}

export type AuthDataActions = UserAuthenticationData | UserAuthenticationDetails | IssuerCompanyDetails;
