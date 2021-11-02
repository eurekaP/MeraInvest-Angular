
import { ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import * as authState from './shared/states/authentication/auth.reducer';
import * as routeState from './shared/states/route-state/route.reducer';
import * as udState from './shared/states/auth-data/auth-data.reducer';



export interface State {
    auth: authState.State,
    route: routeState.State,
    authData: udState.userDataState
}

export const batpReducers: ActionReducerMap<State> = {
    auth: authState.BatpAuthenticateReducer,
    route: routeState.BatpRouteReducer,
    authData: udState.BatpUserDataReducer
};


export const getAuthState = createFeatureSelector<authState.State>('auth');
export const getisAuthenticated = createSelector(getAuthState,authState.getAuthStatus);

export const getRouteState = createFeatureSelector<routeState.State>('route');
export const getCurrentRouteStatus = createSelector(getRouteState,routeState.getRouteStatus);

export const getDataState = createFeatureSelector<udState.userDataState>('authData');
export const getuserDataStatus = createSelector(getDataState,udState.getUserData);
