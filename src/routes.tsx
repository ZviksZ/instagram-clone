import React                     from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Navbar                    from "./components/Navbar/Navbar";
import {AuthPage}                from "./components/pages/AuthPage/AuthPage";
import {MainPage}                from "./components/pages/MainPage/MainPage";
import {GlobalMessage}           from './components/GlobalMessage/GlobalMessage';
import {SettingsPage}            from "./components/pages/SettingsPage/SettingsPage";
import ProfilePage               from "./components/pages/ProfilePage/ProfilePage";

export const useRoutes = (isAuth: boolean) => {
   if (isAuth) {
      return (
         <>
            <Navbar/>
            <GlobalMessage/>
            <div className="content">
               <div className="header-margin"></div>
               <Switch>
                  <Route path="/" exact>
                     <MainPage/>
                  </Route>
                  <Route path="/settings" exact>
                     <SettingsPage/>
                  </Route>
                  <Route path="/profile/:userId" exact>
                     <ProfilePage/>
                  </Route>
                  <Route path="/"
                         render={() => <Redirect from='/' to='/'/>}/>
               </Switch>
            </div>

         </>
      )
   }

   return (
      <>
         <GlobalMessage/>
         <div className="content">
            <div className="header-margin"></div>
            <Switch>
               <Route path="/" exact>
                  <AuthPage/>
               </Route>
               <Redirect to="/"/>
            </Switch>
         </div>

      </>
   )
}
