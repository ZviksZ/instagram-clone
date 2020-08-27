import React, {useEffect}    from 'react';
import {IPostObject, IPosts} from "../../types/posts-types";
import {getProfilePosts, setProfileModalItem}     from "../../redux/posts-reducer";
import {AppState}            from "../../redux/store";
import {ThunkDispatch}       from "redux-thunk";
import {AppActions}          from "../../types/common_types";
import {bindActionCreators}  from "redux";
import {connect}             from "react-redux";
import s                     from './ProfilePosts.module.scss'



type ProfilePostsProps = { userId: string }
type Props = LinkStateProps & LinkDispatchProps & ProfilePostsProps;

export const ProfilePosts: React.FC<Props> = ({profilePosts, getProfilePosts, setProfileModalItem, userId}) => {
   useEffect(() => {
      getProfilePosts(userId)
   }, [getProfilePosts])

   return (
      <div className={s.profilePosts}>
         {
            profilePosts && Object.keys(profilePosts).length
               ? Object.keys(profilePosts).map((key: any) => {
                  let profileObj = {
                     post: profilePosts[key],
                     itemId: key
                  }
                  return <div key={key}
                              className={s.profilePostsItem}
                              onClick={() => setProfileModalItem(profileObj)}
                              style={{backgroundImage:"url(" + profilePosts[key].imgLink + ")"}}></div>
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
   setProfileModalItem: typeof setProfileModalItem
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      profilePosts: state.posts.profilePosts
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   getProfilePosts: bindActionCreators(getProfilePosts, dispatch),
   setProfileModalItem: bindActionCreators(setProfileModalItem, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)
