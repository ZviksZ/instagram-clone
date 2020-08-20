import React, {useState}      from 'react';
import Button                 from '@material-ui/core/Button';
import TextField              from '@material-ui/core/TextField';
import Link                   from '@material-ui/core/Link';
import Grid                   from '@material-ui/core/Grid';
import logo                   from '../../assets/images/logo.png';
import {Controller, useForm} from "react-hook-form";
import s                     from './LoginForm.module.scss'
import {loginSchema}         from '../../utils/validation-shemas';
import {yupResolver}         from '@hookform/resolvers';
import {connect}             from "react-redux";
import {AppState}            from "../../redux/store";
import {AppActions}          from "../../types/common_types";
import {ThunkDispatch}       from "redux-thunk";
import {bindActionCreators}  from "redux";
import {login, register}     from '../../redux/auth-reducer';
import {db}                  from "../../service/firebase";

type FormType = {
   email: string,
   password: string
}

type Props = LinkStateProps & LinkDispatchProps;

export const LoginForm: React.FC<Props> = ({login, register}) => {

   const [signIn, setSignIn] = useState(true)
   const {control, handleSubmit, setValue, errors} = useForm<FormType>({
      resolver: yupResolver(loginSchema)
   });

   const changeType = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      setSignIn(!signIn);
   }

   const onSubmit = (data: FormType) => {
      if (signIn) {
         login(data.email, data.password);

      } else {
         register(data.email, data.password);
      }
   };

   return (
      <div className={s.paper}>
         <img className={s.logo} src={logo} alt="instagram"/>
         {!signIn && <p className={s.subtitle}>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</p>}

         <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
               as={TextField}
               name="email"
               control={control}
               label="Электронная почта"
               fullWidth
               variant="outlined"
               margin="normal"
               autoFocus
               defaultValue=""
            />
            <p>{errors.email?.message}</p>
            <Controller
               as={TextField}
               name="password"
               control={control}
               label="Пароль"
               fullWidth
               variant="outlined"
               type="password"
               margin="normal"
               defaultValue=""
            />
            <p>{errors.password?.message}</p>

            <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               className={s.submitBtn}
            >
               {signIn ? 'Войти' : 'Регистрация'}
            </Button>
            <Grid container>
               <Grid item className={s.changeTypeLink}>
                  {signIn ? 'У вас ещё нет аккаунта? ' : 'Есть аккаунт? '}
                  <Link href="#" variant="body2" onClick={changeType}>
                     {signIn ? 'Зарегистрироваться' : 'Войти'}
                  </Link>
               </Grid>
            </Grid>
         </form>
      </div>
   );
}

interface LinkStateProps {

}

interface LinkDispatchProps {
   login: typeof login
   register: typeof register
}

let mapStateToProps = (state: AppState): LinkStateProps => {
   return {

   }
}
let mapDispatchToProps = (
   dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
   login: bindActionCreators(login, dispatch),
   register: bindActionCreators(register, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
