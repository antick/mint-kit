import { createLazyFileRoute, Link } from '@tanstack/react-router';
// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Motion from '../../modules/shared/components/Motion';
// import userActions from '../../user/actions/userAction';
// import alertAction from '../../shared/actions/alertAction';
// import useAlert from '../../shared/hooks/useAlert';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be at least 6 characters long.'),
});

function LoginPage() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const alert = useAlert();

  const handleLogin = (inputs: any) => {
    const { email, password } = inputs;

    if (email && password) {
      // const { from } = location.state || { from: { pathname: '/' } };
      // const actionData = {
      //   email, password, from,
      // };

      // dispatch(alertAction.clear());
      // dispatch(userActions.login(actionData));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(inputs) => handleLogin(inputs)}
    >
      {(formik) => {
        const {
          errors, touched, isValid, dirty,
        } = formik;

        return (
          <div className="guest-container">
            <Motion type="5" className="guest-block">
              <h3 className="guest-title">Login</h3>
              {/* {alert} */}
              <Form className="auth-form">
                <div className="mb-8">
                  <label className="input-label-top" htmlFor="email">Email</label>
                  <Field
                    data-testid="email"
                    type="email"
                    name="email"
                    placeholder="email@domain.com"
                    className={`form-input${errors.email && touched.email ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="span" className="input-error" />
                </div>

                <div className="mb-8">
                  <label className="input-label-top" htmlFor="password">Password</label>
                  <Field
                    data-testid="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    className={`form-input${errors.password && touched.password ? ' is-invalid' : ''}`}
                  />
                  <ErrorMessage name="password" component="span" className="input-error" />
                </div>

                <div className="mb-4 text-center">
                  <button
                    data-testid="btn-submit"
                    type="submit"
                    className={`btn-submit${!(dirty && isValid) ? ' btn-disabled' : ''}`}
                    disabled={!(dirty && isValid)}>
                    Login
                  </button>
                </div>

                <div className="text-center">
                  <Link to="/forgot-password" className="guest-link">Forgot Password?</Link>
                </div>

                <hr className="my-4 border-t" />

                <div className="text-center">
                  <Link to="/sign-up" className="guest-link">Create an Account!</Link>
                </div>
              </Form>
            </Motion>
          </div>
        );
      }}
    </Formik>
  );
}

export const Route = createLazyFileRoute('/(auth)/login')({
  component: LoginPage,
});
