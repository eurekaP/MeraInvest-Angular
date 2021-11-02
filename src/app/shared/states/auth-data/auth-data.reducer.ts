import { Action } from "@ngrx/store";
import { USER_DATA,USER_DETAILS,COMPANY_DETAILS,AuthDataActions } from "./auth-data.action";

interface dataState {
  userData: any,
  userDetail: any,
  companyDetail: any
}


const initialState:dataState = {
  userData: {},
  userDetail: {},
  companyDetail: {}
}

export interface userDataState {
  userData:any,
  userDetail:any,
  companyDetail:any
}



export function BatpUserDataReducer(state = initialState , action: AuthDataActions) {
    switch (action.type) {
        case USER_DATA:
            return {
              ...state,
              userData: action.payload
            };
        case USER_DETAILS:
            return {
              ...state,
              userDetail: action.payload
            };
        case COMPANY_DETAILS:
            return {
              ...state,
              companyDetail: action.payload
            };
        default: {
            return state;
        }
    }
}

export const getUserData = (state:dataState) => { state.userData  };
export const getUserDetailData = (state:dataState) => { state.userDetail  };
export const getCompanyDetailData = (state:dataState) => { state.companyDetail  };
