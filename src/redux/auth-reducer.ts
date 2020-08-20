import {AuthActionTypes, SET_USER_DATA, SetUserDataAction, IAuthInitialState, CurrentUser} from "../types/auth-types";
import {Dispatch}                                                                          from "redux";
import {AppActions}                                                                        from "../types/common_types";
import {AppState}                                                                          from "./store";
import {auth}                                                                              from "../service/firebase";
import {deleteCookie, getCookie, setCookie}                                                from "../utils/helpers";
import {setMessage}                                                                        from "./app-reducer";
import {IMessage}                                                                          from "../types/app-types";

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


export const getCookieUser = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      const cookies = getCookie('userData');
      const data = JSON.parse(cookies + '');
      if (data) {
         dispatch(setUserData(data));
      }
   } catch (e) {

      setMessage({type: 'error', text: 'Error. Try again, please.'})
   }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   let userData = null;
   try {
      await auth().signInWithEmailAndPassword(email, password);
      let currentUser = auth().currentUser;

      if (currentUser) {
         userData = {
            name: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL,
            uid: currentUser.uid
         }
      }


      setCookie('userData', JSON.stringify(userData), {expires: 2147483647});
      dispatch(setUserData(userData));
   } catch (error) {
      setMessage({type: "error", text: "Error. Try again, please."})
   }
}
export const register = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {

   try {
      await auth().createUserWithEmailAndPassword(email, password);

      //dispatch(setUserData(userData))
   } catch (error) {
      setMessage({type: 'error', text: 'Error. Try again, please.'})
   }
}

export const logout = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await auth().signOut();

      deleteCookie('userData');
      dispatch(setUserData(null));
   } catch (error) {
      setMessage({type: 'error', text: 'Error. Try again, please.'})
   }
}
export default authReducer;
