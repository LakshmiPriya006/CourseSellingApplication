import React, { useState, useEffect } from 'react';
import { BookOpen, Users, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import CourseModal from '../components/CourseModal';
import axios from 'axios';

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    loading: true
  });

  // Calculate metrics from courses data
  const calculateMetrics = (coursesData) => {
    const totalRevenue = coursesData.reduce((sum, course) => sum + (course.price || 0), 0);
    return {
      totalStudents: 0, // Would need to fetch from purchase data
      totalRevenue,
      loading: false
    };
  };

  // 1. Fetch Admin's courses on load
  useEffect(() => {
    const fetchAdminCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/admin/course/bulk", {
          headers: { token: token } // Send the token!
        });
        const coursesData = response.data.courses || [];
        setCourses(coursesData);
        setAnalytics(calculateMetrics(coursesData));
      } catch (error) {
        console.error("Failed to fetch courses", error);
        setAnalytics({ totalStudents: 0, totalRevenue: 0, loading: false });
      }
    };
    fetchAdminCourses();
  }, []);

  // 2. Update Handle Submit to Create Course
  const handleSubmit = async (formData) => {
    const token = localStorage.getItem('token');

    if (editingCourse) {
      // Logic for edit (PUT request)
      await axios.put("http://localhost:3000/admin/course", {
        courseId: editingCourse._id, // MongoDB uses _id, not id
        ...formData
      }, { headers: { token } });
    } else {
      // Logic for create (POST request)
      const response = await axios.post("http://localhost:3000/admin/course", formData, {
        headers: { token }
      });
      // Add the new course to the local list so the UI updates immediately
      setCourses([...courses, { ...formData, _id: response.data.courseId }]);
    }
    setShowModal(false);
    setEditingCourse(null);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleDelete = async (courseId) => {
  const token = localStorage.getItem('token');
  if(confirm("Are you sure you want to delete this course?")) {
    try {
      // You need to add this DELETE route to your backend first!
      // await axios.delete(`http://localhost:3000/admin/course/${courseId}`, { headers: { token } });
      
      // For now, just update UI using _id
      setCourses(courses.filter(c => c._id !== courseId)); 
    } catch (error) {
      alert("Failed to delete");
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
            <p className="text-gray-600 mt-2">Create and manage your course content</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Course</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Enrollments</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map(course => (
                <tr key={course._id || course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={course.imageUrl} alt={course.title} className="w-16 h-16 rounded object-cover" />
                      <div>
                        <div className="font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">₹{course.price}</td>
                  <td className="px-6 py-4 text-gray-900">-</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id || course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Courses</h3>
              <BookOpen className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
            <p className="text-sm text-gray-500 mt-2">Active courses</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {analytics.loading ? '...' : analytics.totalStudents}
            </p>
            <p className="text-sm text-gray-500 mt-2">Enrolled students</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {analytics.loading ? '...' : `₹${analytics.totalRevenue.toLocaleString()}`}
            </p>
            <p className="text-sm text-gray-500 mt-2">From all courses</p>
          </div>
        </div>
      </div>

      {showModal && (
        <CourseModal
          editingCourse={editingCourse}
          onClose={() => {
            setShowModal(false);
            setEditingCourse(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;