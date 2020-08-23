import React                      from 'react';
import {Controller, useForm}      from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addPost}                  from '../../redux/posts-reducer';
import {AppState}                 from "../../redux/store";
import {Button}                   from "@material-ui/core";
import TextField                  from "@material-ui/core/TextField/TextField";
import s                          from "./AddForm.module.scss";

type Props = {
   setClose: () => void
}

export const AddForm:React.FC<Props> = React.forwardRef(({setClose}) => {
   const user = useSelector((state: AppState) => state.auth.currentUser);
   const dispatch = useDispatch();
   const {register, control, handleSubmit, setValue, errors} = useForm({
      /*validationSchema: addModalSchema*/
   });

   const onSubmit = async (data:any) => {
      const {imgCaption, imgFile} = data;

      let file = imgFile[0];

      dispatch(addPost(user, file, imgCaption));
      setClose();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
         <h2>Add Photo</h2>
         <Controller
            as={TextField}
            name="imgCaption"
            control={control}
            label="Enter photo caption"
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
            className={s.fileInput}
         />
         <label htmlFor="contained-button-file" className={s.fileButton}>
            <Button variant="contained" color="primary" component="span">
               Upload
            </Button>
         </label>
         {errors.imgLink && <span>This field is required</span>}

         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
         >
            Send form
         </Button>
      </form>
   );
})

