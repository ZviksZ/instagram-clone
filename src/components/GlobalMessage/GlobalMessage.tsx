import React, {useEffect}         from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState}                 from "../../redux/store";
import MuiAlert, { AlertProps }   from '@material-ui/lab/Alert';
import {setMessageData}           from "../../redux/app-reducer";
import s                          from './GlobalMessage.module.scss'

function Alert(props: AlertProps) {
   return <MuiAlert className={s.alert} elevation={6} variant="filled" {...props} />;
}

export const GlobalMessage = () => {
   const message = useSelector((state: AppState) => state.app.message);
   const dispatch =useDispatch();

   useEffect(() => {
      if (message !== null) {
         setTimeout(() => {
            dispatch(setMessageData(null))
         }, 3000)      }
   }, [message])
   return (
      <>
         {
            message && <Alert severity={message.type}>{message.text}</Alert>
         }
      </>
   );
}

