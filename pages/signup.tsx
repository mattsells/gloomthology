import { Form, Formik } from 'formik';
import type { NextPage } from 'next';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Panel from '@/components/Panel';
import Text from '@/components/Text';
import useSession from '@/hooks/useSession';
import http, { Routes } from '@/lib/http';
import SignupSchema from '@/schemas/signup';

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
    <Panel className="mx-auto">
      <Text as="h1" appearance="header" className="mb-4">
        Join the Adventure
      </Text>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
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
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.email}
            />

            <Input
              className="mb-5"
              error={errors.password}
              isTouched={touched.password}
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              type="password"
              value={values.password}
            />

            <Input
              className="mb-6"
              error={errors.passwordConfirmation}
              isTouched={touched.passwordConfirmation}
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              name="passwordConfirmation"
              type="password"
              value={values.passwordConfirmation}
            />

            <Button
              appearance="primary"
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Panel>
  );
};

export default Signup;
