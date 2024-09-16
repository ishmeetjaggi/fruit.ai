// src/AuthForm.js
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './AuthForm.css'
import { useNavigate } from "react-router-dom";

// Schema validation for the signup/signin form using Yup
const SignupSchema = Yup.object().shape({
  first_Name: Yup.string().required("First Name is required"),
  last_Name: Yup.string().required("Last Name is required"),
  description: Yup.string(),
});

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const handleSignupSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://fruit-ai-backend-eigz.onrender.com/account/signup/", values);
      alert("Account created successfully!");
    } catch (error) {
      alert("Account creation failed: " + error.response.data.detail);
    }
    setSubmitting(false);
  };

  const handleSigninSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://fruit-ai-backend-eigz.onrender.com/account/signin/", values);
      alert("Sign-in successful!");
      navigate("/chat");
    } catch (error) {
      alert("Sign-in failed: " + error.response.data.detail);
    }
    setSubmitting(false);
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Lets Get You Set Up" : "Log In"}</h2>
      <Formik
        initialValues={{ first_Name: "", last_Name: "", description: "" }}
        validationSchema={SignupSchema}
        onSubmit={isSignup ? handleSignupSubmit : handleSigninSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <Field name="first_Name" placeholder="First Name" />
              {errors.first_Name && touched.first_Name ? <div>{errors.first_Name}</div> : null}
            </div>
            <div>
              <Field name="last_Name" placeholder="Last Name" />
              {errors.last_Name && touched.last_Name ? <div>{errors.last_Name}</div> : null}
            </div>
            {isSignup && (
              <div>
                <Field name="description" placeholder="Description (Optional)" />
              </div>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default AuthForm;
