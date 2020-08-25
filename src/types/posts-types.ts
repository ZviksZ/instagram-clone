export const SET_POSTS = 'instagram-clone/posts/SET_POSTS';
export const SET_PROFILE_POSTS = 'instagram-clone/posts/SET_PROFILE_POSTS';
export const SET_PROFILE_MODAL = 'instagram-clone/posts/SET_PROFILE_MODAL';

export interface IPostsInitialState {
   posts: IPostObject
   profilePosts: IPostObject
   profileModalItem:  ProfileModal | null
}

export interface IPostObject {
   [name: string]: IPosts
}

export interface IPosts {
   imgCaption: string
   imgLink: string
   userId: string
   userPhoto: string
   userName: string
}

export interface PostData {
   imgLink: string | null
   imgCaption: string | null
   userId: string | undefined
   userPhoto: string | null | undefined
   userName: string | null | undefined
}

export interface SetPostsAction {
   type: typeof SET_POSTS;
   payload: IPostObject;
}
export interface SetProfilePostsAction {
   type: typeof SET_PROFILE_POSTS;
   payload: IPostObject;
}
export interface SetProfileModalAction {
   type: typeof SET_PROFILE_MODAL;
   payload: ProfileModal | null
}
export type ProfileModal = {
   post: IPosts
   itemId: string
}


export type PostsActionTypes = SetPostsAction | SetProfilePostsAction | SetProfileModalAction;
