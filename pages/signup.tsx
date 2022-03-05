import { Form, Formik } from 'formik';
import type { NextPage } from 'next';

import useSession from '@/hooks/useSession';
import http, { Routes } from '@/lib/http';

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

type FormState = typeof initialValues;

const Signup: NextPage = () => {
  const { user, setUser } = useSession();

  const handleSubmit = (values: FormState) => {
    setUser(async () => {
      const { user } = await http.post(Routes.Registrations, values);
      return user;
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleBlur, handleChange, isSubmitting, values }) => (
        <Form>
          <input
            className="border-solid border-2 border-black"
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            type="text"
            value={values.email}
          />

          <br />

          <input
            className="border-solid border-2 border-black"
            onBlur={handleBlur}
            onChange={handleChange}
            name="password"
            type="password"
            value={values.password}
          />

          <br />

          <input
            className="border-solid border-2 border-black"
            onBlur={handleBlur}
            onChange={handleChange}
            name="passwordConfirmation"
            type="passwordConfirmation"
            value={values.passwordConfirmation}
          />

          <br />

          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
