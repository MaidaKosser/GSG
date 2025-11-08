import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Heading from "./Heading";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdmissionForm({ onSubmit, onClose }) {
  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    fatherName: Yup.string().required("Father Name is required"),
    dob: Yup.string().required("Date of Birth is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string().required("Contact number is required"),
    grade: Yup.string().required("Grade is required"),
    address: Yup.string().required("Address is required"),
  });

  // Success toast
  const notifySuccess = () =>
    toast.success("Student added successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: "#fbeee3",
        color: "#800000",
        borderLeft: "5px solid #800000",
        fontWeight: "500",
      },
    });

  return (
    <div>
      {/* Heading */}
      <div className="text-center">
        <Heading title="Student Admission Form" className="text-maroon" />
        <hr
          className="mx-auto"
          style={{ width: "60px", borderTop: "3px solid #800000" }}
        />
      </div>

      <Formik
        initialValues={{
          fullName: "",
          fatherName: "",
          dob: "",
          email: "",
          contact: "",
          grade: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newStudent = { ...values, id: Date.now() }; // add unique id
          onSubmit(newStudent); // call parent callback
          resetForm();
          notifySuccess();
          if (onClose) onClose(); // close modal if provided
        }}
      >
        {() => (
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <Field name="fullName" className="form-control" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-danger small"/>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Father Name</label>
                <Field name="fatherName" className="form-control" />
                <ErrorMessage
                  name="fatherName"
                  component="div"
                  className="text-danger small"/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Date of Birth</label>
                <Field name="dob" type="date" className="form-control" />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-danger small"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Email</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Contact</label>
                <Field name="contact" className="form-control" />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-danger small"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Grade</label>
                <Field name="grade" as="select" className="form-select">
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Grade {i + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="grade"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Address</label>
              <Field name="address" className="form-control" />
              <ErrorMessage
                name="address"
                component="div"
                className="text-danger small"
              />
            </div>

            <div className="text-center mt-4">
              <Button
                type="submit"
                label="Submit"
                bg="#800000"
                hoverBg="#a00000"
                color="#fff"
                className="px-5 py-2"
              />
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
}
