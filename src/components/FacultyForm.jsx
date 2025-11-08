import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import Heading from "./Heading";

export default function FacultyForm({ onSubmit, closeModal, setTeachers }) {
  const [preview, setPreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    subject: Yup.string().required("Subject is required"),
    bio: Yup.string().required("Bio is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const notifySuccess = () =>
    toast.success("Faculty added successfully!", {
      position: "top-center",
      autoClose: 2500,
      style: {
        backgroundColor: "#fbeee3",
        color: "#800000",
        borderLeft: "5px solid #800000",
        fontWeight: "500",
      },
    });

  // 🖼 Resize image before saving
  const resizeImage = (file, maxWidth = 300, maxHeight = 300) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
      };
      reader.readAsDataURL(file);
    });

  return (
    <div className="faculty-form-container">
      <div className="text-center">
        <Heading title="Add Faculty" className="text-maroon" />
        <hr
          className="mx-auto"
          style={{ width: "60px", borderTop: "3px solid #800000" }}
        />
      </div>

      <Formik
        initialValues={{ name: "", subject: "", bio: "", image: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          let imageData = values.image;
          if (values.image instanceof File) {
            imageData = await resizeImage(values.image);
          }

          const newTeacher = { ...values, id: Date.now(), image: imageData };

          // ✅ Get old teachers from localStorage
          const storedTeachers =
            JSON.parse(localStorage.getItem("teachers")) || [];
          const updatedTeachers = [...storedTeachers, newTeacher];

          // ✅ Update localStorage
          localStorage.setItem("teachers", JSON.stringify(updatedTeachers));

          // ✅ Update state on both sides instantly
          if (setTeachers) setTeachers(updatedTeachers);

          // ✅ Notify all open tabs/pages (Home + Admin)
          window.dispatchEvent(new Event("storage"));

          // ✅ Trigger custom onSubmit (optional)
          if (onSubmit) onSubmit(newTeacher);

          resetForm();
          setPreview(null);
          notifySuccess();
          if (closeModal) closeModal();
        }}
      >
        {({ setFieldValue }) => (
          <Form className="px-3">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <Field
                  name="name"
                  className="form-control"
                  style={{ height: "45px", fontSize: "0.95rem" }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Subject</label>
                <Field
                  name="subject"
                  className="form-control"
                  style={{ height: "45px", fontSize: "0.95rem" }}
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Bio</label>
              <Field
                name="bio"
                as="textarea"
                rows="3"
                className="form-control"
                style={{ minHeight: "90px", fontSize: "0.95rem" }}
              />
              <ErrorMessage
                name="bio"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreview(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {preview && (
                <div className="text-center mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    className="rounded shadow-sm"
                  />
                </div>
              )}
            </div>

            <div className="text-center">
              <Button
                type="submit"
                label="Add Faculty"
                bg="#800000"
                hoverBg="#a00000"
                color="#fff"
                className="px-4 py-1"
              />
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer />
    </div>
  );
}
