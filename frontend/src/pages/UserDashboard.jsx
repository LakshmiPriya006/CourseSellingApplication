import React, { useState, useEffect } from 'react';
import { Play, BookOpen } from 'lucide-react';
import axios from 'axios';

const UserDashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:3000/user/purchases", {
          headers: { token }
        });
        // The backend returns { purchases, coursesData }
        // We want to display the course details (coursesData)
        setPurchasedCourses(response.data.coursesData || []);
      } catch (error) {
        console.error("Error fetching purchases", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : purchasedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map(course => (
              <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">₹{course.price}</span>
                    <span className="text-sm text-gray-500">{course.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Enrolled Courses</h3>
            <p className="text-gray-600 mb-6">You haven't purchased any courses yet.</p>
            <a href="/courses" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition inline-block">
              Browse Courses
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;