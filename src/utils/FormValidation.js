import * as yup from "yup";
// Esquema de validación formulario de registro
export const SignUpFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .max(30, "El nombre debe contener máximo 30 caracteres")
    .required("Rellena este campo"),
  email: yup.string().email("Correo inválido").required("Rellena este campo"),
  birthday: yup.date().required("Rellena este campo"),
  location: yup.object().shape({
    department: yup.string().required("Rellena este campo"),
    city: yup.string().required("Rellena este campo"),
  }),
  // gender: yup.string().required("Rellena este campo"),
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
// Esquema de validación formulario de logueo
export const LoginFormValidation = yup.object().shape({
  email: yup.string().email("Correo inválido").required("Rellena este campo"),
  password: yup.string().required("Rellena este campo"),
});
// Esquema de validación formulario de editar perfil
export const EditFormValidation = yup.object().shape({
  description: yup
    .string()
    .max(300, "La descripción debe contener máximo 300 caracteres"),
  photo: yup.mixed(),
  name: yup
    .string()
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .max(30, "El nombre debe contener máximo 30 caracteres")
    .required("Rellena este campo"),
  birthday: yup.date(),
  location: yup.object().shape({
    department: yup.string().required("Rellena este campo"),
    city: yup.string().required("Rellena este campo"),
  }),
  career: yup.string(),
});
