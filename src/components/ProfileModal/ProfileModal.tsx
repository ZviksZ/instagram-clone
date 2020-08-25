import React                      from 'react';
import {Modal}                    from "@material-ui/core";
import {PostListItem}             from "../PostList/PostListItem/PostListItem";
import {useDispatch, useSelector} from "react-redux";
import {AppState}                 from "../../redux/store";
import {setProfileModalItem}      from '../../redux/posts-reducer';
import s                          from './ProfileModal.module.scss'

export const ProfileModal = () => {
   const profileItem = useSelector((state: AppState) => state.posts.profileModalItem);
   const dispatch = useDispatch();

   const onClose = () => {
      dispatch(setProfileModalItem(null))
   }

   if (!profileItem) {
      return <></>
   }

   return <>
      {
         profileItem && <Modal
            open={!!profileItem}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={s.photoModal}
         >
            <PostListItem item={profileItem.post} itemId={profileItem.itemId} isSingle={true}/>
         </Modal>
      }

   </>


}

