import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getDepartmentById,
  createDepartment,
  updateDeparment,
} from "../services/DepartmentService";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      loadDepartment();
    }
  }, [id]);

  const loadDepartment = async () => {
    setIsLoadingData(true);
    try {
      const response = await getDepartmentById(id);
      const department = response.data;
      setDepartmentName(department.departmentName);
      setDepartmentDescription(department.departmentDescription || "");
    } catch (error) {
      console.error("Error loading department:", error);
      toast.error("Failed to load department");
      navigate("/departments");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!departmentName.trim()) {
      toast.error("Department name is required");
      return;
    }

    if (!departmentDescription.trim()) {
      toast.error("Department description is required");
      return;
    }

    setLoading(true);
    try {
      const department = {
        departmentName: departmentName.trim(),
        departmentDescription: departmentDescription.trim(),
      };

      if (isEditMode) {
        await updateDeparment(id, department);
        toast.success("Department updated successfully!");
      } else {
        await createDepartment(department);
        toast.success("Department created successfully!");
      }
      navigate("/departments");
    } catch (error) {
      console.error("Error saving department:", error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "create"} department`
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/departments")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 font-medium"
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
            Back to Departments
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            {isEditMode ? "Edit Department" : "Add New Department"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditMode
              ? "Update department information"
              : "Create a new department for the system"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Name */}
            <div>
              <label
                htmlFor="departmentName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="e.g., Computer Science"
                required
              />
            </div>

            {/* Department Description */}
            <div>
              <label
                htmlFor="departmentDescription"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="departmentDescription"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                placeholder="Enter a detailed description of the department..."
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/departments")}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-blue-700 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Update Department"
                  : "Create Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
