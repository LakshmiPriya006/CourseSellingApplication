import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';

const CreateEditCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(courseId);

    const [course, setCourse] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            // Fetching a single course by ID is more efficient than fetching all courses
            const fetchCourse = async () => {
                try {
                    const response = await apiClient.get(`/admin/course/${courseId}`);
                    setCourse(response.data.course);
                } catch (error) {
                    console.error("Failed to fetch course data:", error);
                    // Handle error, e.g., redirect to dashboard or show a message
                } finally {
                    setLoading(false);
                }
            };
            fetchCourse();
        } else {
            setLoading(false);
        }
    }, [courseId, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await apiClient.put('/admin/course', { ...course, courseId });
                alert('Course updated successfully!');
            } else {
                await apiClient.post('/admin/course', course);
                alert('Course created successfully!');
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Failed to save course:', error);
            alert('Operation failed. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-gray-200 flex items-center justify-center">
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400 mx-auto mb-4"></div>
                    <p className="text-xl font-medium text-gray-300">Loading Course Data...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-200 py-20 px-4">
            <div className="relative z-10 max-w-2xl mx-auto backdrop-blur-md bg-slate-900/80 p-8 rounded-xl shadow-2xl border border-slate-700">
                <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                    {isEditing ? 'Edit Course' : 'Create New Course'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="title">Course Title</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="title"
                            name="title"
                            type="text"
                            value={course.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="description">Description</label>
                        <textarea
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 h-32"
                            id="description"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="price">Price ($)</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="price"
                            name="price"
                            type="number"
                            value={course.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="imageUrl">Image URL</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="imageUrl"
                            name="imageUrl"
                            type="text"
                            value={course.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-indigo-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
                        >
                            {isEditing ? 'Save Changes' : 'Create Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditCourse;