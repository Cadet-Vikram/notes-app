import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.body.style.background = 'linear-gradient(to bottom right, #c471ed, #f64f59)';
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    navigate('/notes');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', fontFamily: 'Roboto Slab, serif' }}
    >
      <div
        className="p-4 shadow"
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#e0e0e0',
            borderRadius: '50%',
            margin: '0 auto 16px auto',
          }}
        >
          <img
            src="../assets/account.png"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
        </div>
        <h4 className="mb-1">Create an account</h4>
        <p style={{ fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <a href="#" style={{ textDecoration: 'underline' }}>
            Log in
          </a>
        </p>

        <button className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center">
          <img
            src="https://img.icons8.com/color/24/000000/facebook.png"
            alt="fb"
            className="me-2"
          />
          Continue with Facebook
        </button>
        <button className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center">
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="google"
            className="me-2"
          />
          Continue with Google
        </button>

        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">OR</span>
          <hr className="flex-grow-1" />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, dirty }) => (
            <Form>
              <div className="mb-3 text-start">
                <label className="form-label">Your email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: isValid && dirty ? '#1a237e' : '#d3d3d3',
                  color: '#fff',
                  borderRadius: '999px',
                  transition: 'background-color 0.2s',
                }}
                disabled={!(isValid && dirty)}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
