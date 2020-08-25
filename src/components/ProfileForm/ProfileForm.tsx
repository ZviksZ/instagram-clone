import React, {useState}          from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm}      from "react-hook-form";
import TextField                  from "@material-ui/core/TextField/TextField";
import {Avatar, Button}           from "@material-ui/core";
import {updateProfile}            from "../../redux/auth-reducer";
import s                          from './ProfileForm.module.scss'
import {AppState}                 from "../../redux/store";

export const ProfileForm = () => {
   const user = useSelector((state: AppState) => state.auth.currentUser);
   const dispatch = useDispatch();
   const [fileName, setFileName] = useState<string>('');
   const {register, control, handleSubmit, getValues, errors} = useForm({
      /*validationSchema: addModalSchema*/
   });

   const onSubmit = async (data:any) => {
      const {userName, userPhoto} = data;

      let file = userPhoto[0]

      dispatch(updateProfile(userName, file));
   };

   const changeHandler = () => {
      setFileName(getValues('userPhoto')[0].name)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            {user && user?.photoUrl && <Avatar className={s.formAvatar} alt="" src={user.photoUrl}  aria-controls="simple-menu" aria-haspopup="true"/>}

         <h2 className="center-text">Изменить профиль {user && user?.name && user.name}</h2>
         <Controller
            as={TextField}
            name="userName"
            control={control}
            label="Введите ник"
            fullWidth
            variant="outlined"
            margin="normal"
            autoFocus
            defaultValue=""
         />
         <input
            accept="image/*"
            name="userPhoto"
            ref={register}
            id="contained-button-file"
            multiple
            type="file"
            onChange={changeHandler}
            className={s.fileInput}
         />
         <label htmlFor="contained-button-file" className={s.fileButton}>
            <Button variant="contained" color="primary" component="span">
               {
                  fileName.length ? fileName : 'Загрузить изображение'
               }
            </Button>
         </label>

         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
         >
            Отправить
         </Button>
      </form>
   );
}

