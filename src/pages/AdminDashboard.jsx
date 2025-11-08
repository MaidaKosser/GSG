import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import StudentTable from "../components/StudentTable";
import FacultyTable from "../components/FacultyTable";
import AdmissionForm from "../components/AdmissionForm";
import FacultyForm from "../components/FacultyForm";
import useLocalData from "../hooks/useLocalData";
import { getStudents, getTeachers, saveStudents, saveTeachers } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard({ setUserRole }) {
  const navigate = useNavigate();
  const { students, setStudents, teachers, setTeachers } = useLocalData();
  const [admin, setAdmin] = useState(null);

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") navigate("/login");

    const storedStudents = getStudents();
    const storedTeachers = getTeachers();

    if (storedStudents.length > 0) setStudents(storedStudents);
    if (storedTeachers.length > 0) setTeachers(storedTeachers);

    const loggedAdmin = JSON.parse(localStorage.getItem("loggedUser")) || null;
    setAdmin(loggedAdmin);
  }, [navigate, setStudents, setTeachers]);

  const acceptedCount = students.filter((s) => s.status?.toLowerCase() === "accepted").length;

  const handleAdminLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("userRole");
    if (setUserRole) setUserRole(null);
    navigate("/login");
  };

  const handleAddStudent = (student) => {
    const updated = [...students, student];
    setStudents(updated);
    saveStudents(updated);
    setShowStudentModal(false);
  };

  const handleAddTeacher = (teacher) => {
    const updated = [...teachers, teacher];
    setTeachers(updated);
    saveTeachers(updated);
    setShowFacultyModal(false);
  };

  const updateStudent = (updatedStudent) => {
    const updated = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    setStudents(updated);
    saveStudents(updated);
  };

  const deleteStudent = (id) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    saveStudents(updated);
  };

  const updateTeacher = (updatedTeacher) => {
    const updated = teachers.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t));
    setTeachers(updated);
    saveTeachers(updated);
  };

  const deleteTeacher = (id) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    saveTeachers(updated);
  };

  return (
  <div style={{ backgroundColor: "#fbf6f1ff", minHeight: "100vh", padding: "20px" }}>
    <div className="container p-3 my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <Heading title="Admin Dashboard" className="text-maroon mb-2" />
          {admin && <p className="text-muted small mb-0">Logged in as: <b>{admin.email}</b></p>}
        </div>
        <Button label="Logout" bg="#800000" hoverBg="#a00000" color="#fff" onClick={handleAdminLogout} />
      </div>

      {/* Stats */}
      <div className="row mb-5 g-3 text-center">
        <div className="col-sm-6 col-md-4">
          <div className="card p-3 border-0 shadow-sm bg-light">
            <h6 className="text-muted">Total Students</h6>
            <h3 className="fw-bold text-maroon">{students.length}</h3>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="card p-3 border-0 shadow-sm bg-light">
            <h6 className="text-muted">Accepted Students</h6>
            <h3 className="fw-bold text-success">{acceptedCount}</h3>
          </div>
        </div>
        <div className="col-sm-6 col-md-4">
          <div className="card p-3 border-0 shadow-sm bg-light">
            <h6 className="text-muted">Total Teachers</h6>
            <h3 className="fw-bold text-maroon">{teachers.length}</h3>
          </div>
        </div>
      </div>

      {/* Student Management */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Heading title="Student Management" className="text-maroon mb-0" />
        <Button label="Add Student" bg="#800000" hoverBg="#a00000" color="#fff" onClick={() => setShowStudentModal(true)} />
      </div>

      <StudentTable students={students} updateStudent={updateStudent} deleteStudent={deleteStudent} tableHeadColor="#800000"/>

      {/* Faculty Management */}
      <div style={{ marginTop: "80px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Heading title="Faculty Management" className="text-maroon mb-0" />
          <Button label="Add Faculty" bg="#800000" hoverBg="#a00000" color="#fff" onClick={() => setShowFacultyModal(true)} />
        </div>

        <FacultyTable teachers={teachers} updateTeacher={updateTeacher} deleteTeacher={deleteTeacher} tableHeadColor="#800000"/>
      </div>

      {/* Modals */}
      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal-content position-relative">
            <button
              className="btn-close"
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => setShowStudentModal(false)}
            >
              ×
            </button>
            <AdmissionForm onSubmit={handleAddStudent} onClose={() => setShowStudentModal(false)} />
          </div>
        </div>
      )}
      {showFacultyModal && (
        <div className="modal-overlay">
          <div className="modal-content position-relative">
            <button
              className="btn-close"
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => setShowFacultyModal(false)}
            >
              ×
            </button>
            <FacultyForm onSubmit={handleAddTeacher} onClose={() => setShowFacultyModal(false)} />
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; top:0; left:0; right:0; bottom:0;
          background: rgba(0,0,0,0.5);
          display:flex; justify-content:center; align-items:center;
          z-index:1000;
        }
        .modal-content {
          background:#fff; padding:25px; border-radius:10px;
          width:100%; max-width:500px; box-shadow:0 4px 15px rgba(0,0,0,0.2);
        }
        .btn-close {
          font-size: 20px;
          border: none;
          background: transparent;
          cursor: pointer;
        }
      `}</style>
    </div>
   </div>
  );
}
