import { Form, Formik } from 'formik';
import type { NextPage } from 'next';

import useSession from '@/hooks/useSession';
import http, { Routes } from '@/lib/http';

const initialValues = {
  email: '',
  password: '',
};

type FormState = typeof initialValues;

const Login: NextPage = () => {
  const { user, mutateUser } = useSession();

  const handleSubmit = (values: FormState) => {
    mutateUser(async () => {
      const { user } = await http.post(Routes.Sessions, values);
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

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
