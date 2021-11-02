import { Action } from "@ngrx/store";
import { RouteAction, ISSUER_REGISTER, USER_REGISTER } from "./route.action";

export interface State {
    routeState:string
}

const initialState:State = {
  routeState: ''
}


export function BatpRouteReducer(state = initialState ,action:RouteAction) {
    switch (action.type) {
        case ISSUER_REGISTER:
            return {
              routeState:''
            };
        case USER_REGISTER:
            return {
              routeState:''
            };
        default: {
            return state;
        }
    }
}

export const getRouteStatus = (state:State) => { state.routeState };
