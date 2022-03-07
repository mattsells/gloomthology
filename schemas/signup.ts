import { object, ref, string } from 'yup';

const SignupSchema = object().shape({
  email: string().trim().email(),
  password: string().trim().min(6).required(),
  passwordConfirmation: string().equals(
    [ref('password'), null],
    'Password confirmation does not match'
  ),
});

export default SignupSchema;
