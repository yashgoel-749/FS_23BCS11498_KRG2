import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listDepartments, deleteDepartment } from "../services/DepartmentService";
import { toast } from "react-toastify";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await listDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error("Error loading departments:", error);
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        toast.success("Department deleted successfully");
        loadDepartments();
      } catch (error) {
        toast.error("Failed to delete department");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-department/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Departments</h1>
              <p className="text-blue-100">Manage all departments in the system</p>
            </div>
            <button
              onClick={() => navigate("/add-department")}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200 shadow-lg"
            >
              + Add Department
            </button>
          </div>
        </div>

        {/* Departments Grid */}
        {departments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No departments</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new department.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/add-department")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                + Add Department
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department) => (
              <div
                key={department.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {department.departmentName}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ID: {department.id}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {department.departmentDescription || "No description provided"}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(department.id)}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(department.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDepartmentComponent;
