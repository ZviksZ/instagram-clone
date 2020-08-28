import React, {useState} from 'react';
import {Controller, useForm}          from "react-hook-form";
import {useDispatch, useSelector}     from "react-redux";
import {addPost}                      from '../../redux/posts-reducer';
import {AppState}                     from "../../redux/store";
import {Button}                       from "@material-ui/core";
import TextField                      from "@material-ui/core/TextField/TextField";
import s                              from "./AddForm.module.scss";

type Props = {
   setClose: () => void
}

export const AddForm:React.FC<Props> = ({setClose}) => {
   const user = useSelector((state: AppState) => state.auth.currentUser);
   const dispatch = useDispatch();

   const [fileName, setFileName] = useState<string>('');
   const {register, control, handleSubmit, getValues , errors} = useForm({
      /*validationSchema: addModalSchema*/
   });

   const onSubmit = async (data:any) => {
      const {imgCaption, imgFile} = data;

      let file = imgFile[0];

      dispatch(addPost(user, file, imgCaption));
      setClose();
   };

   const changeHandler = () => {
      setFileName(getValues('imgFile')[0].name)
   }


   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
         <h2>Добавить фото</h2>
         <Controller
            as={TextField}
            name="imgCaption"
            control={control}
            label="Введите подпись к фото"
            fullWidth
            variant="outlined"
            margin="normal"
            autoFocus
            defaultValue=""
         />
         <input
            accept="image/*"
            name="imgFile"
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
};

