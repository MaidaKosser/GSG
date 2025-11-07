// ✅ ---------- STUDENTS ----------
export const getStudents = () => {
  try {
    return JSON.parse(localStorage.getItem("students")) || [];
  } catch {
    return [];
  }
};

export const saveStudents = (students) => {
  localStorage.setItem("students", JSON.stringify(students));
};

export const saveStudent = (student) => {
  const students = getStudents();
  const newStudent = { id: Date.now(), status: "applied", ...student };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const updateStudentStatus = (id, newStatus) => {
  const students = getStudents().map((s) =>
    s.id === id ? { ...s, status: newStatus } : s
  );
  saveStudents(students);
};

// ✅ ---------- TEACHERS ----------
export const getTeachers = () => {
  try {
    return JSON.parse(localStorage.getItem("teachers")) || [];
  } catch {
    return [];
  }
};

export const saveTeachers = (teachers) => {
  localStorage.setItem("teachers", JSON.stringify(teachers));
};

export const saveTeacher = (teacher) => {
  const teachers = getTeachers();
  const newTeacher = { id: Date.now(), ...teacher };
  teachers.push(newTeacher);
  saveTeachers(teachers);
  return newTeacher;
};

// ✅ ---------- AUTH ----------
export const saveUser = (user) => {
  localStorage.setItem("loggedUser", JSON.stringify(user));
  localStorage.setItem("userRole", user.role || "admin");
};

export const getLoggedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loggedUser")) || null;
  } catch {
    return null;
  }
};

export const getUserRole = () => {
  return localStorage.getItem("userRole") || null;
};

// ✅ Only clear login info, not teachers/students
export const handleLogout = (navigate) => {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("userRole");
  navigate("/login");
};
