import React    from 'react';
import {IPosts} from "../../../types/posts-types";
import s        from '../PostList.module.scss'

type Props = {
   item: IPosts
   itemId: string
}

export const PostListItem: React.FC<Props> = ({item, itemId}) => {
   return (
      <div className={s.post}>
         <div className={s.img} style={{backgroundImage: 'url(' + item.imgLink + ')'}}>

         </div>
         <div className={s.caption}>{item.imgCaption}</div>
      </div>
   );
}

