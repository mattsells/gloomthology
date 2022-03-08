import { Form, Formik } from 'formik';
import type { NextPage } from 'next';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Panel from '@/components/Panel';
import Text from '@/components/Text';
import useSession from '@/hooks/useSession';
import http, { Routes, SuccessResponse } from '@/lib/http';
import LoginSchema from '@/schemas/login';
import { isHttpError } from '@/types/response';
import { User } from '@/types/user';

const initialValues = {
  email: '',
  password: '',
};

type Response = SuccessResponse<{ user: User }>;

type FormState = typeof initialValues;

// TODO: Move to reusable function
async function postLogin(values: FormState): Promise<User> {
  const response = await http.post<Response>(Routes.Sessions, values);
  return response.data.user;
}

const Login: NextPage = () => {
  const { setUser, user } = useSession();

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
    <Panel className="mx-auto">
      <Text as="h1" appearance="header" className="mb-4">
        Log In
      </Text>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({
          dirty,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          isValid,
          touched,
          values,
        }) => (
          <Form>
            <Input
              className="mb-5"
              error={errors.email}
              isTouched={touched.email}
              label="Email Address"
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
              type="text"
              value={values.email}
            />

            <Input
              className="mb-6"
              error={errors.password}
              isTouched={touched.password}
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              type="password"
              value={values.password}
            />

            <Button
              appearance="primary"
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Panel>
  );
};

export default Login;
