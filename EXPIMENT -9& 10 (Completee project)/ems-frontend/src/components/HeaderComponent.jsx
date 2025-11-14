import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, getUser, logout } from "../services/AuthService";
import { toast } from "react-toastify";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!authenticated) {
    return null; // Don't show header on login/register pages
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-xl font-bold">
                Student Management System
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {user?.role === "STUDENT" ? (
                <NavLink
                  to="/student-dashboard"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-indigo-100 hover:border-indigo-300 hover:text-white"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/teacher-dashboard"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? "border-white text-white"
                          : "border-transparent text-indigo-100 hover:border-indigo-300 hover:text-white"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/students"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? "border-white text-white"
                          : "border-transparent text-indigo-100 hover:border-indigo-300 hover:text-white"
                      }`
                    }
                  >
                    Students
                  </NavLink>
                  <NavLink
                    to="/departments"
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? "border-white text-white"
                          : "border-transparent text-indigo-100 hover:border-indigo-300 hover:text-white"
                      }`
                    }
                  >
                    Departments
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-sm mr-4">
                {user?.name} ({user?.role?.toLowerCase()})
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
