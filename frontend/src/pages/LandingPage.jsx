import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, BookOpen, Award, TrendingUp, Plus, BarChart3, DollarSign } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import axios from 'axios';

const LandingPage = ({ isAuthenticated = false, userType = 'user' }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [instructorStats, setInstructorStats] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses/preview");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchInstructorData = async () => {
      if (isAuthenticated && userType === 'admin') {
        try {
          const token = localStorage.getItem('token');
          const coursesResponse = await axios.get("http://localhost:3000/admin/course/bulk", {
            headers: { token }
          });
          const instructorCoursesData = coursesResponse.data.courses || [];
          setInstructorCourses(instructorCoursesData);
          
          // Calculate instructor stats
          const totalCourses = instructorCoursesData.length;
          const totalStudents = instructorCoursesData.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);
          const averagePrice = totalCourses > 0 
            ? instructorCoursesData.reduce((sum, course) => sum + (course.price || 0), 0) / totalCourses 
            : 0;
          
          setInstructorStats({
            totalCourses,
            totalStudents,
            averagePrice: averagePrice.toFixed(0),
            totalEarnings: instructorCoursesData.reduce((sum, course) => 
              sum + ((course.price || 0) * (course.enrolledStudents || 0)), 0
            )
          });
        } catch (error) {
          console.error("Error fetching instructor data:", error);
        }
      }
    };

    fetchCourses();
    fetchInstructorData();
  }, [isAuthenticated, userType]);

  // Instructor Home Page
  if (isAuthenticated && userType === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* Instructor Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome Back, Instructor!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to inspire and educate? Manage your courses and track your impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/admin-dashboard"
                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition"
              >
                <Plus className="w-5 h-5 inline-block mr-2" />
                Create New Course
              </Link>
              <Link 
                to="/admin-dashboard"
                className="inline-block border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-600 hover:text-white transform hover:scale-105 transition"
              >
                <BarChart3 className="w-5 h-5 inline-block mr-2" />
                View Analytics
              </Link>
            </div>
          </div>

          {/* Instructor Stats */}
          {instructorStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
              <StatsCard 
                icon={BookOpen} 
                value={instructorStats.totalCourses} 
                label="Your Courses" 
                bgColor="bg-green-100" 
              />
              <StatsCard 
                icon={Users} 
                value={instructorStats.totalStudents} 
                label="Total Students" 
                bgColor="bg-blue-100" 
              />
              <StatsCard 
                icon={DollarSign} 
                value={`₹${instructorStats.averagePrice}`} 
                label="Avg Course Price" 
                bgColor="bg-yellow-100" 
              />
              <StatsCard 
                icon={TrendingUp} 
                value={`₹${instructorStats.totalEarnings}`} 
                label="Total Earnings" 
                bgColor="bg-purple-100" 
              />
            </div>
          )}
        </div>

        {/* Your Courses Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Your Courses</h2>
            <Link 
              to="/admin-dashboard"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
              ))}
            </div>
          ) : instructorCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructorCourses.slice(0, 4).map(course => (
                <CourseCard 
                  key={course._id} 
                  course={course} 
                  onClick={() => navigate(`/course-preview/${course._id}`)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No courses created yet.</p>
              <p className="text-gray-400 mb-6">Start creating your first course to share your knowledge!</p>
              <Link 
                to="/admin-dashboard"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <Plus className="w-5 h-5 inline-block mr-2" />
                Create Your First Course
              </Link>
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }

  // Default Landing Page for non-authenticated users and regular users
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Without Limits
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start, switch, or advance your career with thousands of courses from world-class instructors
          </p>
          <Link 
            to="/courses"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition"
          >
            Start Learning Today
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <StatsCard icon={Users} value="50K+" label="Active Students" bgColor="bg-indigo-100" />
          <StatsCard icon={BookOpen} value="1000+" label="Courses" bgColor="bg-indigo-100" />
          <StatsCard icon={Award} value="95%" label="Success Rate" bgColor="bg-indigo-100" />
          <StatsCard icon={TrendingUp} value="4.8/5" label="Average Rating" bgColor="bg-indigo-100" />
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Courses</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map(course => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onClick={() => navigate(`/course-preview/${course._id}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No courses available yet.</p>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;