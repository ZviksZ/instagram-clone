import React from 'react';
import s     from './Navbar.module.scss'
import logo from '../../../assets/images/logo.png'
import firebase from 'firebase'


export const Navbar = () => {
   return (
      <div className={s.navbar}>
         <div className='container'>
            <div className={s.navbarWrapper}>
               <a href="#" className={s.navbarLogo} rel="noreferrer noopener">
                  <img src={logo} alt=""/>
               </a>
            </div>

         </div>
      </div>
   );
}

