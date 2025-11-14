import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListStudentComponent from "./components/ListStudentComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentComponent from "./components/StudentComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          
          {/* Protected Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <ListStudentComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-student"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <StudentComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-student/:id"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <StudentComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <ListDepartmentComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-department"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <DepartmentComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-department/:id"
            element={
              <ProtectedRoute allowedRoles={["TEACHER"]}>
                <DepartmentComponent />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
}

export default App;
