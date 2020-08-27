import React, {ChangeEvent}     from 'react';
import {IPosts}                 from "../../../types/posts-types";
import cn                       from "classnames";
import s                        from '../PostList.module.scss'
import {Avatar, Menu, MenuItem} from "@material-ui/core";
import {NavLink}                from "react-router-dom";
import IconButton               from "@material-ui/core/IconButton";
import MoreVertIcon             from '@material-ui/icons/MoreVert';
import TextField                from "@material-ui/core/TextField/TextField";
import CloseIcon                from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import {useDispatch}            from "react-redux";
import {deletePost, updatePost} from '../../../redux/posts-reducer';

type Props = {
   item: IPosts
   itemId: string
   isSingle?: boolean
}

export const PostListItem: React.FC<Props> = React.forwardRef(({item, itemId, isSingle}) => {
   const [editMode, setEditMode] = React.useState<boolean>(false);
   const [caption, setCaption] = React.useState<any>(item.imgCaption);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const dispatch = useDispatch();
   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };
   const openCaptionInput = () => {
      setEditMode(true)
      handleClose()
   }
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCaption(e.currentTarget.value)
   }
   const sendCaption = () => {
      dispatch(updatePost(itemId, caption));
      setEditMode(false);
   }


   return (
      <div className={cn(s.post, isSingle ? 'single-post' : '')}>
         <div className={s.postTop}>
            <Avatar alt="" src={item.userPhoto} aria-controls="simple-menu" aria-haspopup="true"/>

            <NavLink to={`/profile/${item.userId}`} className={s.postUserName}>{item.userName}</NavLink>

            <IconButton
               className={s.controlsBtn}
               aria-label="more"
               aria-controls="long-menu"
               aria-haspopup="true"
               onClick={handleClick}
            >
               <MoreVertIcon/>
            </IconButton>

            <Menu
               id="simple-menu"
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
            >
               <MenuItem onClick={openCaptionInput}>Изменить подпись</MenuItem>
               <MenuItem onClick={() => dispatch(deletePost(itemId))}>Удалить</MenuItem>
            </Menu>
         </div>
         <div className={s.img} style={{backgroundImage: 'url(' + item.imgLink + ')'}}>

         </div>
         {
            editMode ? <div className={s.captionUpdate}>
                  <TextField
                     label="Подпись"
                     variant="outlined"
                     value={caption}
                     onChange={handleChange}
                     name="imgCaption"
                     fullWidth
                     margin="normal"
                     autoFocus
                  />
               <SendIcon onClick={sendCaption} className={s.captionUpdateIcon}/>
               <CloseIcon onClick={() => setEditMode(false)} className={s.captionUpdateIcon} />
            </div>
            : <div className={s.caption}>{item.imgCaption}</div>
         }

      </div>
   );
});

