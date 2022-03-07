export const errors =  {
    name: [
      { type: 'required', message: 'El campo es requerido' }
    ],
    email: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Debe ser un correo válido' },
    ],
    password: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'Debe poseer mínimo 8 caracteres' },
    ],
    password_confirmation: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'Debe poseer mínimo 8 caracteres' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' },
    ],
    code: [
      { type: 'required', message: 'El campo es requerido' }
    ]
};