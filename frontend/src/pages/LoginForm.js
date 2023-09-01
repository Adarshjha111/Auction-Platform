import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import '../styles/SignupForm.css';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false); // State variable to control password visibility
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Send the form data to the backend for login
      axios
        .post('http://localhost:8000/login', values, {
          withCredentials: true,//to ensure that the cookies set by the backend are sent with the request
          //setting withCredentials: true in an Axios request ensures that cookies and other credentials are included in all subsequent requests made to the same domain, allowing the backend to maintain user sessions and authenticate users.
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          alert('Logged in successfully');
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('Failed to login:', error.response.data);
          alert("Invalid Credentials!")
        });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggle the showPassword state
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Email field */}
      <div className="form-group">
        <h1>Join Us!</h1>
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
      </div>
      {/* Password field */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="show-password-label-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className="show-password-checkbox"
            type="checkbox"
            id="showPasswordCheckbox"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label
            className="show-password-label"
            htmlFor="showPasswordCheckbox"
          >
            Show Password
          </label>
        </div>
        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
      </div>
      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
