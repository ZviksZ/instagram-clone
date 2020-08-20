export const SET_USER_DATA = 'instagram-clone/auth/SET_USER_DATA';

export interface IAuthInitialState {
   currentUser: CurrentUser | null
}
export type CurrentUser = CurrentUserObj | null;

export interface CurrentUserObj {
   name: string | null
   email: string | null
   photoUrl: string | null
   uid: string | null
}

export interface SetUserDataAction {
   type: typeof SET_USER_DATA;
   payload: CurrentUser | null;
}

export type AuthActionTypes = SetUserDataAction;
