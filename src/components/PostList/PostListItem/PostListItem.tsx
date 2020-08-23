import React     from 'react';
import {IPosts}  from "../../../types/posts-types";
import s         from '../PostList.module.scss'
import {Avatar}  from "@material-ui/core";
import {NavLink} from "react-router-dom";

type Props = {
   item: IPosts
   itemId: string
}

export const PostListItem: React.FC<Props> = ({item, itemId}) => {
   return (
      <div className={s.post}>
         <div className={s.postTop}>
            <Avatar alt="" src={item.userPhoto} aria-controls="simple-menu" aria-haspopup="true"/>

            <NavLink to={`/profile/${item.userId}`} className={s.postUserName}>{item.userName}</NavLink>
         </div>
         <div className={s.img} style={{backgroundImage: 'url(' + item.imgLink + ')'}}>

         </div>
         <div className={s.caption}>{item.imgCaption}</div>
      </div>
   );
}

