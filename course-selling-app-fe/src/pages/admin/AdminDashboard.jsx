// import React, { useState, useEffect } from 'react';
// import apiClient from '../../api/axiosConfig';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchAdminCourses = async () => {
//             try {
//                 const response = await apiClient.get('/admin/course/bulk');
//                 setCourses(response.data.courses);
//             } catch (error) {
//                 console.error("Failed to fetch admin courses:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAdminCourses();
//     }, []);

//     if (loading) return <p className="text-center text-gray-500">Loading dashboard...</p>;

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
//                 <Link to="/admin/course/new" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
//                     + Create New Course
//                 </Link>
//             </div>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <table className="min-w-full leading-normal">
//                     <thead>
//                         <tr>
//                             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
//                             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
//                             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {courses.map(course => (
//                             <tr key={course._id}>
//                                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                     <p className="text-gray-900 whitespace-no-wrap">{course.title}</p>
//                                 </td>
//                                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                     <p className="text-gray-900 whitespace-no-wrap">${course.price}</p>
//                                 </td>
//                                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                                     <Link to={`/admin/course/edit/${course._id}`} className="text-indigo-600 hover:text-indigo-900">
//                                         Edit
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminCourses = async () => {
            try {
                const response = await apiClient.get('/admin/course/bulk');
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Failed to fetch admin courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminCourses();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-xl font-medium text-gray-300">Loading Dashboard...</p>
                    <p className="text-gray-500 mt-2">Fetching your course data.</p>
                </div>
            );
        }

        if (courses.length === 0) {
            return (
                <div className="text-center py-20 px-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl max-w-2xl mx-auto shadow-xl">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                        No Courses Found
                    </h3>
                    <p className="text-gray-400 text-lg mb-8">
                        It looks like you haven't created any courses yet. Get started by adding your first one!
                    </p>
                    <Link
                        to="/admin/course/new"
                        className="group relative inline-flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
                    >
                        Create Your First Course
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </Link>
                </div>
            );
        }

        return (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-1 shadow-2xl shadow-slate-900/50 backdrop-blur-md">
                <div className="overflow-x-auto rounded-xl bg-slate-900">
                    <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-900/70">
                            <tr>
                                <th scope="col" className="py-3.5 px-6 text-left text-sm font-semibold text-gray-300">Title</th>
                                <th scope="col" className="py-3.5 px-6 text-left text-sm font-semibold text-gray-300">Price</th>
                                <th scope="col" className="relative py-3.5 px-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {courses.map(course => (
                                <tr key={course._id} className="transition-colors duration-300 hover:bg-slate-800/50">
                                    <td className="whitespace-nowrap py-5 px-6 text-sm font-medium text-white">{course.title}</td>
                                    <td className="whitespace-nowrap py-5 px-6 text-sm text-gray-300">${course.price}</td>
                                    <td className="relative whitespace-nowrap py-5 px-6 text-right text-sm font-medium">
                                        <Link to={`/admin/course/edit/${course._id}`} className="inline-flex items-center gap-x-2 font-semibold text-indigo-400 transition-colors hover:text-indigo-300">
                                            Edit
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative pt-24 sm:px-6 lg:px-8">
             <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            </div>
            <div className="relative z-10 container mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                    <div>
                         <h1 className="mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-black text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">Manage all your created courses in one place.</p>
                    </div>
                   
                    <Link
                        to="/admin/course/new"
                        className="group mt-4 sm:mt-0 relative inline-flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        Create New Course
                    </Link>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;