import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import Button from "../components/Button";
import "../styles/style.css";

export default function Login() {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values) => {
    let role;
    if (values.email === "admin@gmail.com" && values.password === "123456") {
      role = "admin";
    } else {
      role = "user";
    }

    // Save logged-in user info and role
    localStorage.setItem("loggedUser", JSON.stringify(values));
    localStorage.setItem("userRole", role);

    // Ensure students and teachers arrays exist only once
    if (!localStorage.getItem("students")) {
      localStorage.setItem("students", JSON.stringify([]));
    }
    if (!localStorage.getItem("teachers")) {
      localStorage.setItem("teachers", JSON.stringify([]));
    }

    // Redirect based on role
    navigate(role === "admin" ? "/admin" : "/home");
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-box p-4 p-md-5 shadow-lg rounded-4 bg-white">
        <Heading
          title="Login"
          className="text-center text-maroon fw-bold mb-4"/>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
          {() => (
            <Form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <Button
                type="submit"
                label="Login"
                className="btn-maroon w-100 py-2 mt-3 fw-semibold"
              />
            </Form>
          )}
        </Formik>

        <div
          className="text-center text-muted mt-4"
          style={{ fontSize: "0.9rem" }}
        >
        </div>
      </div>
    </div>
  );
}


