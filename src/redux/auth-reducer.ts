import {AuthActionTypes, SET_USER_DATA, SetUserDataAction, IAuthInitialState, CurrentUser} from "../types/auth-types";
import {Dispatch}                                          from "redux";
import {AppActions}                                        from "../types/common_types";
import {AppState}                                          from "./store";
import {authAPI}                                           from "../api/api";
import {auth} from "../service/firebase";

let initialState: IAuthInitialState = {
   currentUser: null
}

const authReducer = (state = initialState, action: AuthActionTypes) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload
         }
      default:
         return state;
   }
}

export const setUserData = (currentUser: CurrentUser): SetUserDataAction => ({type: SET_USER_DATA, payload: currentUser})


export const login = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   let userData;
   try {
      await authAPI.signin(email, password);
      let currentUser = auth().currentUser || null;

      if (currentUser) {
         userData = {
            name: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL,
            uid: currentUser.uid
         }
      }

      dispatch(setUserData(userData))
   } catch (error) {

   }
}



export default authReducer;
