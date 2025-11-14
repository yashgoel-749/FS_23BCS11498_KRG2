import { useEffect, useState } from "react";
import { getUser } from "../services/AuthService";
import { listStudents } from "../services/StudentService";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await listStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration - in real app, this would come from API
  const attendanceData = [
    { month: "Jan", attendance: 95 },
    { month: "Feb", attendance: 92 },
    { month: "Mar", attendance: 98 },
    { month: "Apr", attendance: 94 },
    { month: "May", attendance: 96 },
    { month: "Jun", attendance: 97 },
  ];

  const marksData = [
    { subject: "Math", marks: 85 },
    { subject: "Science", marks: 90 },
    { subject: "English", marks: 88 },
    { subject: "History", marks: 82 },
    { subject: "Physics", marks: 87 },
  ];

  const attendancePercentage = 95;
  const overallPerformance = 86.4;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-blue-100">Student Dashboard - Track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Attendance</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {attendancePercentage}%
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Overall Performance</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {overallPerformance}%
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Subjects</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">5</p>
              </div>
              <div className="bg-purple-100 rounded-full p-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Monthly Attendance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Attendance %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Marks Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Subject-wise Marks
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="#8B5CF6" name="Marks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Performance Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marksData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ subject, marks }) => `${subject}: ${marks}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="marks"
                >
                  {marksData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Profile</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-lg font-semibold capitalize">{user?.role?.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

