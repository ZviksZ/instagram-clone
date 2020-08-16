import React         from 'react';
import {useRoutes}   from "./routes";
import {useSelector} from "react-redux";
import {AppState}    from "./redux/store";

const App = () => {
   const isAuth = useSelector((state: AppState) => state.auth.currentUser);
   const routes = useRoutes(isAuth ? true : false)

   return (
      <>
         {routes}
      </>
   );
}

export default App;
