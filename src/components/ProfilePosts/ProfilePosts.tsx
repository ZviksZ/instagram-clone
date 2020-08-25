import React, {useEffect}   from 'react';
import {IPostObject}        from "../../types/posts-types";
import {getProfilePosts}    from "../../redux/posts-reducer";
import {AppState}           from "../../redux/store";
import {ThunkDispatch}      from "redux-thunk";
import {AppActions}         from "../../types/common_types";
import {bindActionCreators} from "redux";
import {connect}            from "react-redux";
import {PostListItem}       from "../PostList/PostListItem/PostListItem";
import s                    from './ProfilePosts.module.scss'



type ProfilePostsProps = { userId: string }
type Props = LinkStateProps & LinkDispatchProps & ProfilePostsProps;

export const ProfilePosts: React.FC<Props> = ({profilePosts, getProfilePosts, userId}) => {
   console.log(profilePosts)
   useEffect(() => {
      getProfilePosts(userId)
   }, [getProfilePosts])

   console.log(profilePosts)

   return (
      <div className={s.profilePosts}>
         {
            Object.keys(profilePosts).length
               ? Object.keys(profilePosts).map((key: any) => {
                  return <div className={s.profilePostsItem} style={{backgroundImage:"url(" + profilePosts[key].imgLink + ")"}}></div>
               })
               : <div className="center-text">Постов пока нет</div>
         }
      </div>
   );
}


interface LinkStateProps {
   profilePosts: IPostObject
}

interface LinkDispatchProps {
   getProfilePosts: typeof getProfilePosts
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      profilePosts: state.posts.profilePosts
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   getProfilePosts: bindActionCreators(getProfilePosts, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)
