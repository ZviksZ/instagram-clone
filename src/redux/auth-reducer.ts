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
            currentUser: action.payload
         }
      default:
         return state;
   }
}

export const setUserData = (currentUser: CurrentUser | null): SetUserDataAction => ({type: SET_USER_DATA, payload: currentUser})


export const login = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   let userData = null;
   try {
      await authAPI.signin(email, password);
      let currentUser = auth().currentUser;

      console.log(currentUser)

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
export const register = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {

   try {
      await authAPI.signup(email, password);

      //dispatch(setUserData(userData))
   } catch (error) {
      console.log(error)
   }
}

export const logout = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await authAPI.logout();

      dispatch(setUserData(null))
   } catch (error) {
      console.log(error)
   }
}
export default authReducer;
