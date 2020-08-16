import * as yup from "yup";

export const loginSchema = yup.object().shape({
   email: yup.string().email('Введите корректный email').required('Обязательное поле'),
   password: yup.string().required('Обязательное поле')
});
