import React, {useEffect} from 'react';
import {useRoutes}        from "./routes";
import {useSelector}      from "react-redux";
import {AppState}         from "./redux/store";
import {authAPI}          from "./api/api";

const App = () => {
   const isAuth = useSelector((state: AppState) => state.auth.currentUser);
   const routes = useRoutes(isAuth ? true : false);

   useEffect(() => {
      authAPI.logout();
   }, [])

   return (
      <>
         {routes}
      </>
   );
}

export default App;
