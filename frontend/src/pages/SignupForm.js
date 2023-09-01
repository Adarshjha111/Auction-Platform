import React from 'react';
import { useFormik } from 'formik'; // custom React hook that simplifies form handling and validation
import * as yup from 'yup';//define validation rules for our form fields using a simple and declarative syntax
import axios from 'axios';// to make HTTP requests from the frontend to the backend
import '../styles/SignupForm.css';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      // Send the form data to the backend
      axios
        .post('http://localhost:8000/signup', values)
        .then((response) => {
            alert('Reistered successfully');
          window.location.href = '/login';
        })
        .catch((error) => {
          console.error('Failed to register user:', error.response.data);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
      <h1>Join Us!</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
        {/* 1. This conditionally renders an error message if the 'name' field has been touched (visited by the user) and has a validation error.   
       2. formik.errors.email && <div>{formik.errors.email}</div>  :--   <div>{formik.errors.email}</div>: This is the right-side expression of the && operator. If formik.errors.email is truthy (i.e., there is a validation error for the email field), this expression will render a <div> element containing the error message (formik.errors.email). If formik.errors.email is falsy (i.e., there is no validation error for the email field), this part will not be evaluated or rendered.
        */}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
