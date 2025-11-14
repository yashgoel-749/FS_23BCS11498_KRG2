import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../services/AuthService";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const user = getUser();
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === "STUDENT") {
      return <Navigate to="/student-dashboard" replace />;
    } else if (user?.role === "TEACHER") {
      return <Navigate to="/teacher-dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

