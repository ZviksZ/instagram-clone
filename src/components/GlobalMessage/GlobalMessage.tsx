import React         from 'react';
import {useSelector} from "react-redux";
import {AppState}    from "../../redux/store";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GlobalMessage = () => {
   const message = useSelector((state: AppState) => state.app.message);
   return (
      <>
         {
            message && <Alert severity={message.type}>{message.text}</Alert>
         }
      </>
   );
}

export default GlobalMessage

