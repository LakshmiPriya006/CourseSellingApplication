import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User, Users } from 'lucide-react';
import axios from 'axios';

const CoursePreview = ({ isAuthenticated = false, userType = 'user' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (userType === 'admin') {
      return; // Admins can't purchase courses
    }

    setPurchasing(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:3000/courses/purchase", 
        { courseId: id },
        { headers: { token } }
      );
      
      // Success - redirect to user dashboard or course player
      alert('Course purchased successfully!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error("Error purchasing course:", error);
      if (error.response?.status === 409) {
        alert('You have already purchased this course!');
      } else {
        alert('Failed to purchase course. Please try again.');
      }
    } finally {
      setPurchasing(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses/preview");
        const courses = response.data.courses || [];
        const foundCourse = courses.find(c => c._id === id);
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
            ← Back to Courses
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-xl p-6 text-gray-900">
                <img src={course.imageUrl} alt={course.title} className="w-full h-52 object-cover rounded-lg mb-4" />
                <div className="text-3xl font-bold text-indigo-600 mb-4">₹{course.price}</div>
                {isAuthenticated && userType === 'admin' ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-2">You are viewing this as an instructor</p>
                    <p className="text-sm text-gray-500">Purchase options are not available for instructors</p>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={handlePurchase}
                      disabled={purchasing}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {purchasing ? 'Processing...' : 'Buy Now'}
                    </button>
                    <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;