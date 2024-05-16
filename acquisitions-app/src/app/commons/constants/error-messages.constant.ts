export const VALIDATOR_MESSAGES = {
  required: 'Este campo es requerido.',
  minlength: (value: any) => `Debe tener al menos ${value.requiredLength} caracteres.`,
  maxlength: (value: any) => `No puede tener más de ${value.requiredLength} caracteres.`,
  customError: 'Mensaje de error personalizado para la validación personalizada.'
};
