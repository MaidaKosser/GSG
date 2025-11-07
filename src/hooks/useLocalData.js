import { useState, useEffect } from "react";
import {
  getStudents,
  getTeachers,
  saveStudents,
  saveTeachers,
} from "../utils/LocalStorage";

export default function useLocalData() {
  const [students, setStudents] = useState(() => getStudents());
  const [teachers, setTeachers] = useState(() => getTeachers());

  // Sync localStorage only when valid data exists
  useEffect(() => {
    if (Array.isArray(students)) {
      saveStudents(students);
    }
  }, [students]);

  useEffect(() => {
    if (Array.isArray(teachers)) {
      saveTeachers(teachers);
    }
  }, [teachers]);

  return { students, setStudents, teachers, setTeachers };
}
