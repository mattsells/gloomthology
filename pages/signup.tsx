import { Form, Formik } from 'formik';
import type { NextPage } from 'next';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Panel from '@/components/Panel';
import useSession from '@/hooks/useSession';
import http, { Routes } from '@/lib/http';

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

type FormState = typeof initialValues;

const Signup: NextPage = () => {
  const { setUser } = useSession();

  const handleSubmit = (values: FormState) => {
    setUser(async () => {
      const { user } = await http.post(Routes.Registrations, values);
      return user;
    });
  };

  return (
    <Panel>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, handleBlur, handleChange, isSubmitting, values }) => (
          <Form>
            <Input
              className="mb-5"
              errorMessage={errors.email}
              label="Email Address"
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
              type="text"
              value={values.email}
            />

            <Input
              className="mb-5"
              errorMessage={errors.password}
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              type="password"
              value={values.password}
            />

            <Input
              className="mb-6"
              errorMessage={errors.passwordConfirmation}
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="passwordConfirmation"
              type="password"
              value={values.passwordConfirmation}
            />

            <Button appearance="primary" type="submit" disabled={isSubmitting}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Panel>
  );
};

export default Signup;
