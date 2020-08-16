import React                     from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Navbar}                  from "./components/general/Navbar/Navbar";
import {AuthPage}                from "./components/pages/AuthPage/AuthPage";

export const useRoutes = (isAuth: boolean) => {
   if (isAuth) {
      return (
         <>
            <Navbar/>
            <div className="content">
               <div className="header-margin"></div>
               <Switch>
                  <Route path="/todo">
                     {/*<MainPage/>*/}
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
