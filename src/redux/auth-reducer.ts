import {AuthActionTypes, CurrentUser, IAuthInitialState, SET_USER_DATA, SetUserDataAction} from "../types/auth-types";
import {Dispatch}                                                                          from "redux";
import {AppActions}                                                                        from "../types/common_types";
import {AppState}                                                                          from "./store";
import {auth, db, storage}                                                                 from "../service/firebase";
import {deleteCookie, getCookie, setCookie}                                                from "../utils/helpers";
import {setMessageData}                                                                    from "./app-reducer";


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
   const cookies = getCookie('userData');
   const data = cookies && JSON.parse(cookies + '') || '';

   if (data) {
      dispatch(setUserData(data));
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
      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}
export const register = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {

   try {
      await auth().createUserWithEmailAndPassword(email, password);
   } catch (error) {
      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}

export const logout = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await auth().signOut();

      deleteCookie('userData');
      dispatch(setUserData(null));
   } catch (error) {
      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}

export const updateProfile = (userName: string, userPhoto: any) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      const user = auth().currentUser;

      let imgLink = ``;
      let userData = null;

      if (user) {
         let uploadedFile = await storage.ref().child(`/users/${userPhoto.name}`).put(userPhoto);

         await uploadedFile.ref.getDownloadURL().then(downloadURL => {
            imgLink = downloadURL;
         });
         await user.updateProfile({
            photoURL: imgLink,
            displayName: userName
         }).then(() => console.log(user));

         await db.ref("posts").orderByChild("userId").startAt(user.uid).endAt(user.uid).on("child_added", (snap) => {
            if(snap.val().userId === user.uid) {
               db.ref(`posts/${snap.key}`).set({
                  ...snap.val(),
                  userPhoto: imgLink,
                  userName: userName
               })
            }

         });

         userData = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            uid: user.uid
         }

         setCookie('userData', JSON.stringify(userData), {expires: 2147483647});
         dispatch(setUserData(userData));
      }

   } catch (error) {
      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}



export default authReducer;
