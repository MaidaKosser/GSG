import React, { useState } from "react";
import Button from "./Button";

const FacultyTable = ({ teachers, updateTeacher, deleteTeacher, tableHeadColor }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditClick = (teacher) => {
    setEditId(teacher.id);
    setEditData({...teacher});
  };

  const handleSave = () => {
    updateTeacher(editData);
    setEditId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle text-center">
        <thead style={{ backgroundColor: tableHeadColor, color: "#fff" }}>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length ? teachers.map((t) => (
            <tr key={t.id}>
              <td>{editId===t.id ? <input value={editData.image} onChange={(e)=>setEditData({...editData,image:e.target.value})} /> : t.image ? <img src={t.image} alt={t.name} style={{width:"60px",height:"60px",objectFit:"cover"}} className="rounded-circle" /> : "No Image"}</td>
              <td>{editId===t.id ? <input value={editData.name} onChange={(e)=>setEditData({...editData,name:e.target.value})}/> : t.name}</td>
              <td>{editId===t.id ? <input value={editData.subject} onChange={(e)=>setEditData({...editData,subject:e.target.value})}/> : t.subject}</td>
              <td>{editId===t.id ? <input value={editData.bio} onChange={(e)=>setEditData({...editData,bio:e.target.value})}/> : t.bio}</td>
              <td className="d-flex justify-content-center flex-wrap gap-1">
                {editId===t.id ? (
                  <>
                    <Button label="Save" bg="#198754" hoverBg="#146c43" color="#fff" onClick={handleSave}/>
                    <Button label="Cancel" bg="#6c757d" hoverBg="#5a6268" color="#fff" onClick={()=>setEditId(null)} />
                  </>
                ) : (
                  <>
                    <Button label="Edit" bg="#ffc107" hoverBg="#e0a800" color="#000" onClick={()=>handleEditClick(t)} />
                    <Button label="Delete" bg="#dc3545" hoverBg="#a71d2a" color="#fff" onClick={()=>deleteTeacher(t.id)} />
                  </>
                )}
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5">No teachers found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyTable;
