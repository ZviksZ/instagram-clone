import React, {useEffect}   from 'react';
import s                    from './PostList.module.scss'
import {AppState}           from "../../redux/store";
import {ThunkDispatch}      from "redux-thunk";
import {AppActions}         from "../../types/common_types";
import {bindActionCreators} from "redux";
import {connect}            from "react-redux";
import {getPosts}           from '../../redux/posts-reducer';
import {IPostObject}        from "../../types/posts-types";
import {PostListItem}       from "./PostListItem/PostListItem";
import {CurrentUser}        from "../../types/auth-types";


type Props = LinkStateProps & LinkDispatchProps;

const PostList: React.FC<Props> = ({posts, getPosts, currentUser}) => {

   useEffect(() => {
      getPosts()
   },[getPosts])

   return (
      <div className="container">
         {
            posts && Object.keys(posts).length
               ? Object.keys(posts).map((key: any) => <PostListItem key={key} currentUser={currentUser} item={posts[key]} itemId={key}/>)
               : <div className="center-text mt50">Постов пока нет</div>
         }
      </div>
   );
}

interface LinkStateProps {
   posts: IPostObject
   currentUser: CurrentUser
}
interface LinkDispatchProps {
   getPosts: typeof getPosts
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      posts: state.posts.posts,
      currentUser: state.auth.currentUser
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   getPosts: bindActionCreators(getPosts, dispatch)
});



export default connect(mapStateToProps, mapDispatchToProps)(PostList)

