import React                           from 'react';
import s                               from './Navbar.module.scss'
import logo                            from '../../assets/images/logo.png';
import {connect}                       from "react-redux";
import {logout}                        from '../../redux/auth-reducer';
import {AppState}                      from "../../redux/store";
import {ThunkDispatch}                 from "redux-thunk";
import {AppActions}                    from "../../types/common_types";
import {bindActionCreators}            from "redux";
import {Avatar, Menu, MenuItem, Modal} from "@material-ui/core";
import {CurrentUser}                   from "../../types/auth-types";
import {AddForm}                       from "../AddForm/AddForm";


type Props = LinkStateProps & LinkDispatchProps;


const Navbar: React.FC<Props> = ({logout, currentUser}) => {
   const logoutHandler = (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();

      logout()
   }

   const [open, setOpen] = React.useState(false);
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

   const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleOpenModal = () => {
      setOpen(true);
      setAnchorEl(null);
   };

   const handleCloseModal = () => {
      setOpen(false);
      setAnchorEl(null);
   };


   let photo = currentUser?.photoUrl || '';

   return (
      <div className={s.navbar}>
         <div className='container'>
            <div className={s.navbarWrapper}>
               <a href="#" className={s.navbarLogo} rel="noreferrer noopener">
                  <img src={logo} alt=""/>
               </a>

               <Avatar alt="" src={photo}  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>

               <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
               >
                  <MenuItem onClick={handleOpenModal}>Add post</MenuItem>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
               </Menu>


               <Modal
                  open={open}
                  onClose={handleCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className={s.addPhotoModal}
               >
                  <AddForm setClose={handleCloseModal}/>
               </Modal>
            </div>

         </div>
      </div>
   );
}

interface LinkStateProps {
   currentUser: CurrentUser | null
}

interface LinkDispatchProps {
   logout: typeof logout
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {
      currentUser: state.auth.currentUser
   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   logout: bindActionCreators(logout, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
