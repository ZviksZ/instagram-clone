import React, {useEffect}         from 'react';
import {useRoutes}                from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {AppState}                 from "./redux/store";
import {getCookieUser}            from "./redux/auth-reducer";

const App = () => {
   const isAuth = useSelector((state: AppState) => state.auth.currentUser);
   const routes = useRoutes(isAuth ? true : false);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getCookieUser())
   }, [dispatch])

   return (
      <>
         {routes}
      </>
   );
}

export default App;
