import { Action } from "@ngrx/store";
import { AuthActions, AUTH_IN, AUTH_OUT } from "./auth.action";

export interface State {
    isAuthenticated:boolean
}

const initialState:State = {
    isAuthenticated: false
}


export function BatpAuthenticateReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AUTH_IN:
            return {
              isAuthenticated:true
            };
        case AUTH_OUT:
            return {
              isAuthenticated:false
            };
        default: {
            return state;
        }
    }
}

export const getAuthStatus = (state:State) => { state.isAuthenticated };
