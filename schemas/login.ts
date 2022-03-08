import { object, string } from 'yup';

const LoginSchema = object().shape({
  email: string().trim().email(),
  password: string().trim().required(),
});

export default LoginSchema;
