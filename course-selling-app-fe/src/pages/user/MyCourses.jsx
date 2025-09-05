import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import CourseCard from '../../components/CourseCard';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchasedCourses = async () => {
            try {
                const response = await apiClient.get('/user/purchases');
                setCourses(response.data.coursesData);
            } catch (error) {
                console.error("Failed to fetch purchased courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedCourses();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400 mx-auto mb-4"></div>
                    <p className="text-xl font-medium text-gray-300">Loading your courses...</p>
                    <p className="text-gray-500 mt-2">Fetching your purchased course data.</p>
                </div>
            );
        }

        if (courses.length === 0) {
            return (
                <div className="text-center py-20 px-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl max-w-2xl mx-auto shadow-xl">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                        No Courses Found
                    </h3>
                    <p className="text-gray-400 text-lg mb-8">
                        It looks like you haven't purchased any courses yet. Explore our catalog and start learning!
                    </p>
                    <Link
                        to="/courses"
                        className="group relative inline-flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-gray-200 to-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/25"
                    >
                        Explore All Courses
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course} purchased={true} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-200 py-20 px-4">
            <div className="relative z-10 container mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                    <div>
                        <h1 className="mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-black text-transparent">
                            My Learning
                        </h1>
                        <p className="text-gray-400">All the courses you have purchased.</p>
                    </div>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default MyCourses;