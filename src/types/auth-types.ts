export const SET_USER_DATA = 'instagram-clone/auth/SET_USER_DATA';

export interface IAuthInitialState {
   currentUser: CurrentUser | null
}

export interface CurrentUser {
   name: string | null
   email: string | null
   photoUrl: string | null
   uid: string | null
}

export interface SetUserDataAction {
   type: typeof SET_USER_DATA;
   payload: CurrentUser;
}

export type AuthActionTypes = SetUserDataAction;
