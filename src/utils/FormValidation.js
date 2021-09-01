import * as yup from "yup";

export const SignUpFormValidation = yup.object().shape({
  name: yup.string().min(2, 'El nombre debe contener al menos 2 caracteres').max(30, 'El nombre debe contener máximo 30 caracteres').required("Rellena este campo"),
  email: yup.string().email("Correo inválido").required("Rellena este campo"),
  birthday: yup.date().required("Rellena este campo"),
  gender: yup.string().required("Rellena este campo"),
  career: yup.string().required("Rellena este campo"),
  photo: yup.mixed(),
  password: yup
    .string()
    .min(8, "La contraseña debe contener al menos 8 caracteres")
    .max(15, "La contraseña debe contener máximo 15 caracteres")
    .required("Rellena este campo"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Rellena este campo"),
  terms: yup
    .boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones"),
});

export const LoginFormValidation = yup.object().shape({
  email: yup.string().email("Correo inválido"),
  password: yup.string()
});