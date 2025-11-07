import React, { useState } from "react";
import Button from "./Button";

const StudentTable = ({ students, updateStudent, deleteStudent, tableHeadColor }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (student) => {
    setEditId(student.id);
    setEditData({ ...student });
  };

  const handleSave = () => {
    updateStudent(editData);
    setEditId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead style={{ backgroundColor: tableHeadColor, color: "#fff" }}>
          <tr>
            <th>Full Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Grade</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length ? students.map((s) => (
            <tr key={s.id}>
              <td>{editId === s.id ? <input value={editData.fullName} onChange={(e) => setEditData({...editData, fullName:e.target.value})} /> : s.fullName}</td>
              <td>{editId === s.id ? <input type="date" value={editData.dob} onChange={(e) => setEditData({...editData, dob:e.target.value})} /> : s.dob}</td>
              <td>{editId === s.id ? <input value={editData.email} onChange={(e) => setEditData({...editData, email:e.target.value})} /> : s.email}</td>
              <td>{editId === s.id ? <input value={editData.contact} onChange={(e) => setEditData({...editData, contact:e.target.value})} /> : s.contact}</td>
              <td>{editId === s.id ? <input value={editData.grade} onChange={(e) => setEditData({...editData, grade:e.target.value})} /> : s.grade}</td>
              <td>{editId === s.id ? <input value={editData.address} onChange={(e) => setEditData({...editData, address:e.target.value})} /> : s.address}</td>
              <td>
                {editId === s.id ? (
                  <select value={editData.status} onChange={(e) => setEditData({...editData, status:e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  <span className={`badge ${s.status==="Accepted"?"bg-success":s.status==="Rejected"?"bg-danger":"bg-secondary"}`}>{s.status}</span>
                )}
              </td>
              <td className="d-flex justify-content-center flex-wrap gap-1">
                {editId === s.id ? (
                  <>
                    <Button label="Save" bg="#198754" hoverBg="#146c43" color="#fff" onClick={handleSave} />
                    <Button label="Cancel" bg="#6c757d" hoverBg="#5a6268" color="#fff" onClick={()=>setEditId(null)} />
                  </>
                ) : (
                  <>
                    <Button label="Edit" bg="#ffc107" hoverBg="#e0a800" color="#000" onClick={()=>handleEditClick(s)} />
                    <Button label="Delete" bg="#dc3545" hoverBg="#a71d2a" color="#fff" onClick={()=>deleteStudent(s.id)} />
                  </>
                )}
              </td>
            </tr>
          )) : (
            <tr><td colSpan="8">No students found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
