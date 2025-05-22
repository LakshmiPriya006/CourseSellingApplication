import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`https://csa-backend.vercel.app/admin/course/bulk`, {
          headers: {
            'token': `${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCourses(data.courses);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Link 
          to="/admin/create-course"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New Course
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-lg shadow-sm p-4">
            <img 
              src={course.imageURL} 
              alt={course.title} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${course.price}</span>
              <Link 
                to={`/admin/update-course/${course._id}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;