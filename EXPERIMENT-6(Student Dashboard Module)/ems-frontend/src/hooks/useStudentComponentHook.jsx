import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listDepartments } from "../services/DepartmentService";
import {
  updateStudent,
  createStudent,
  getStudentById,
} from "../services/StudentService";

const useStudentComponentHook = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDepartment = async () => {
    const response = await listDepartments();
    setDepartments(response.data);
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const saveOrUpdateStudent = async (e) => {
    e.preventDefault();

    if (!departmentId || departmentId === "Select Department") {
      toast.error("Please select a department");
      return;
    }

    const student = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      departmentId: parseInt(departmentId),
    };

    if (firstName && lastName && email) {
      try {
        if (id) {
          await updateStudent(id, student);
          toast.success("Student updated successfully!");
          navigate("/students");
        } else {
          await createStudent(student);
          toast.success("Student added successfully!");
          navigate("/students");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred. Please try again."
        );
        console.error("Error saving/updating student:", error);
      }
    } else {
      toast.error("Please fill in all the fields!");
    }
  };

  const getStudentData = async (studentId) => {
    const response = await getStudentById(studentId);
    const student = response.data;
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setEmail(student.email);
    // Handle department - could be an object or just an ID
    if (student.department) {
      setDepartmentId(
        typeof student.department === "object"
          ? student.department.id
          : student.department
      );
    } else if (student.departmentId) {
      setDepartmentId(student.departmentId.toString());
    }
  };

  useEffect(() => {
    if (id) {
      setTitle("Update Student");
      getStudentData(id);
    } else {
      setTitle("Add Student");
    }
  }, [id]);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    departmentId,
    setDepartmentId,
    departments,
    saveOrUpdateStudent,
    title,
  };
};

export default useStudentComponentHook;
