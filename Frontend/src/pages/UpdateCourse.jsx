import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://csa-backend.vercel.app/admin/course/bulk`, {
          headers: {
            'token': `${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          const course = data.courses.find(e => e._id === id);
          if (course) {
            setFormData({
              title: course.title,
              description: course.description,
              price: course.price,
              imageURL: course.imageURL
            });
          } else {
            setError('Course not found');
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://csa-backend.vercel.app/admin/course`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          courseId: id
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/admin/courses');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Course</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Updating...' : 'Update Course'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;