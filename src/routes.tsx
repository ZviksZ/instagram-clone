import React                     from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Navbar                    from "./components/general/Navbar/Navbar";
import {AuthPage}                from "./components/pages/AuthPage/AuthPage";
import {MainPage}                from "./components/pages/MainPage/MainPage";

export const useRoutes = (isAuth: boolean) => {
   if (isAuth) {
      return (
         <>
            <Navbar/>
            <div className="content">
               <div className="header-margin"></div>
               <Switch>
                  <Route path="/">
                     <MainPage/>
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
