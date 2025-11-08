import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Vision from "../components/Vision";
import AdmissionForm from "../components/AdmissionForm";
import Button from "../components/Button";
import FacultyForm from "../components/FacultyForm";
import "../styles/style.css";
import logo from "../assets/images/darkLogo.png";
import useLocalData from "../hooks/useLocalData"; // ✅ correct hook name

export default function Home() {
  const { students, setStudents, teachers, setTeachers } = useLocalData();
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

  return (
    <>
      <Navbar />
      <HeroCarousel />

      {/* 🧾 Admission Section */}
      <section id="student-admission" className="py-2 px-3">
        <div className="row align-items-center">
          {/* Left Image */}
          <div className="col-lg-6 d-flex justify-content-center mb-4 mb-lg-0">
            <img
              src={logo}
              alt="Government School for Girls"
              className="img-fluid rounded-circle"
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Right Text */}
          <div className="col-lg-6 text-center text-lg-start px-5">
            <h2 className="mb-4 text-maroon fw-bold">
              Join Government School for Girls
            </h2>
            <p className="mb-4 text-secondary fs-5">
              Empowering the next generation with education, confidence, and excellence.
              Apply now to be a part of our vibrant and nurturing community.
            </p>

            <div className="d-flex justify-content-center mt-2">
              <Button
                onClick={() => setShowAdmissionModal(true)}
                type="button"
                label="Fill Admission Form"
                bg="#800000"
                hoverBg="#a00000"
                color="#fff"
              />
            </div>
          </div>
        </div>

        {/* Admission Modal */}
        {showAdmissionModal && (
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-4 rounded shadow">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAdmissionModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <AdmissionForm
                    students={students}
                    setStudents={setStudents}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 👨‍🏫 Faculty Section */}
      <section
        id="faculty-section"
        style={{ backgroundColor: "#f9f2ebff" }}
        className="mt-5 py-5 px-4"
      >
        <div className="text-center mb-5">
          <Heading title="Our Faculty" className="text-maroon" />
          <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: "700px" }}>
            Our experienced faculty members bring years of teaching expertise and
            a passion for nurturing young minds. Each teacher contributes to a
            culture of excellence and care shaping confident, creative, and
            capable students.
          </p>

          <Button
            onClick={() => setShowFacultyModal(true)}
            label="+ Add Faculty"
            bg="#800000"
            hoverBg="#a00000"
            color="#ffffffff"
            className="mt-3"
          />
        </div>

        {/* Teacher Cards */}
        <div className="row g-4 justify-content-center">
          {teachers.length > 0 ? (
            teachers.map((t, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 d-flex" key={index}>
                <div className="faculty-card shadow-sm border-0 rounded bg-light overflow-hidden w-100">
                  <div className="faculty-img-wrapper">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="card-img-top"
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  <div className="card-body text-center py-3">
                    <h5 className="card-title text-maroon fw-bold">{t.name}</h5>
                    <p className="card-text text-secondary mb-1">
                      <strong>Subject:</strong> {t.subject}
                    </p>
                    <p className="text-muted medium p-3">{t.bio}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No faculty added yet.</p>
          )}
        </div>

        {/* Faculty Form Modal */}
        {showFacultyModal && (
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content p-4 rounded shadow">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowFacultyModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <FacultyForm teachers={teachers} setTeachers={setTeachers} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Vision />
      <Footer />
    </>
  );
}
