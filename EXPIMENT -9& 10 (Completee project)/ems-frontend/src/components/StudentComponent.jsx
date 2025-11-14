import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listDepartments } from "../services/DepartmentService";
import {
  updateStudent,
  createStudent,
  getStudentById,
} from "../services/StudentService";

const StudentComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    loadDepartments();
    if (id) {
      loadStudent();
    }
  }, [id]);

  const loadDepartments = async () => {
    try {
      const response = await listDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error("Error loading departments:", error);
      toast.error("Failed to load departments");
    }
  };

  const loadStudent = async () => {
    setIsLoadingData(true);
    try {
      const response = await getStudentById(id);
      const student = response.data;
      setFirstName(student.firstName || "");
      setLastName(student.lastName || "");
      setEmail(student.email || "");
      // Handle department - could be an object or just an ID
      if (student.department) {
        setDepartmentId(
          typeof student.department === "object"
            ? student.department.id
            : student.department
        );
      } else if (student.departmentId) {
        setDepartmentId(student.departmentId);
      }
    } catch (error) {
      console.error("Error loading student:", error);
      toast.error("Failed to load student");
      navigate("/students");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!departmentId || departmentId === "Select Department") {
      toast.error("Please select a department");
      return;
    }

    setLoading(true);
    try {
      const student = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        departmentId: parseInt(departmentId),
      };

      if (isEditMode) {
        await updateStudent(id, student);
        toast.success("Student updated successfully!");
      } else {
        await createStudent(student);
        toast.success("Student created successfully!");
      }
      navigate("/students");
    } catch (error) {
      console.error("Error saving student:", error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} student`
      );
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/students")}
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Students
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            {isEditMode ? "Edit Student" : "Add New Student"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditMode
              ? "Update student information"
              : "Add a new student to the system"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                placeholder="John"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                placeholder="Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                placeholder="john.doe@example.com"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              {departments.length === 0 && (
                <p className="mt-2 text-sm text-yellow-600">
                  No departments available. Please create a department first.
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/students")}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || departments.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Update Student"
                  : "Create Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentComponent;
