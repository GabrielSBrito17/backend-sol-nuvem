import * as yup from 'yup';

export const ClientSchema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  address: yup.string().nullable(),
  cep: yup
    .string()
    .matches(/^\d{5}-?\d{3}$/, 'CEP is not valid')
    .nullable(),
  phone: yup.number().nullable(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  whatsapp: yup.boolean().nullable(),
  clientId: yup.mixed().nullable(),
});
