import * as yup from 'yup';

export const UserSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(8).required(),
  type: yup.string().required(),
  clientId: yup.number().nullable(),
});
