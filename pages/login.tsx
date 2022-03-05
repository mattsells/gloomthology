import { Form, Formik } from 'formik';
import type { NextPage } from 'next';

import useSession from '@/hooks/useSession';
import http, { Routes, SuccessResponse } from '@/lib/http';
import { isHttpError } from '@/types/response';
import { User } from '@/types/user';

const initialValues = {
  email: '',
  password: '',
};

type Response = SuccessResponse<{ user: User }>;

type FormState = typeof initialValues;

async function postLogin(values: FormState): Promise<User> {
  const {
    data: { user },
  } = await http.post<Response>(Routes.Sessions, values);
  return user;
}

const Login: NextPage = () => {
  const { setUser, user } = useSession();

  console.log('session user', user);

  const handleSubmit = async (values: FormState) => {
    try {
      await setUser(() => postLogin(values));
    } catch (err) {
      // Create function to handle errors globally (ex show toast messages)
      if (isHttpError(err)) {
        console.log(err.response.data.status);
      }
    }
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
