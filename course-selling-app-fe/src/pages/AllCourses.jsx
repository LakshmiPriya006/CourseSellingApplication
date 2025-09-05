// import React, { useState, useEffect } from 'react';
// import apiClient from '../api/axiosConfig';
// import CourseCard from '../components/CourseCard';
// import { useAuth } from '../hooks/useAuth';

// const AllCourses = () => {
//     const [courses, setCourses] = useState([]);
//     const [purchasedCourses, setPurchasedCourses] = useState(new Set());
//     const [loading, setLoading] = useState(true);
//     const { isAuthenticated, userType } = useAuth();

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await apiClient.get('/courses/preview');
//                 setCourses(response.data.courses);

//                 // If user is logged in, fetch their purchased courses
//                 if (isAuthenticated && userType === 'user') {
//                     const purchaseResponse = await apiClient.get('/user/purchases');
//                     const purchasedIds = new Set(purchaseResponse.data.coursesData.map(c => c._id));
//                     setPurchasedCourses(purchasedIds);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch courses:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, [isAuthenticated, userType]);

//     const handlePurchase = async (courseId) => {
//         if (!isAuthenticated || userType !== 'user') {
//             alert("Please sign in as a user to purchase a course.");
//             return;
//         }
//         try {
//             await apiClient.post('/courses/purchase', { courseId });
//             alert("Course purchased successfully!");
//             setPurchasedCourses(prev => new Set(prev).add(courseId));
//         } catch (error) {
//             console.error("Purchase failed:", error);
//             alert("Purchase failed. Please try again.");
//         }
//     };


//     if (loading) return <p className="text-center text-gray-500">Loading courses...</p>;

//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Courses</h1>
//             {courses.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {courses.map(course => (
//                         <CourseCard
//                             key={course._id}
//                             course={course}
//                             onPurchase={handlePurchase}
//                             purchased={purchasedCourses.has(course._id)}
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-16 px-4 bg-neutral-100 rounded-lg">
//                     <h3 className="text-xl font-medium text-neutral-700">No Courses Available Yet</h3>
//                     <p className="text-neutral-500 mt-2">Please check back later for new and exciting courses!</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllCourses;
import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import CourseCard from '../components/CourseCard'; // This now imports your actual component
import { useAuth } from '../hooks/useAuth';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [purchasedCourses, setPurchasedCourses] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, userType } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get('/courses/preview');
                setCourses(response.data.courses);

                if (isAuthenticated && userType === 'user') {
                    const purchaseResponse = await apiClient.get('/user/purchases');
                    const purchasedIds = new Set(purchaseResponse.data.coursesData.map(c => c._id));
                    setPurchasedCourses(purchasedIds);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [isAuthenticated, userType]);

    const handlePurchase = async (courseId) => {
        if (!isAuthenticated || userType !== 'user') {
            alert("Please sign in as a user to purchase a course.");
            return;
        }
        try {
            await apiClient.post('/courses/purchase', { courseId });
            alert("Course purchased successfully!");
            setPurchasedCourses(prev => new Set(prev).add(courseId));
        } catch (error) {
            console.error("Purchase failed:", error);
            alert("Purchase failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden py-20">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
            </div>

            <div className="relative z-10 container mx-auto px-8 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent text-center mb-12">
                    Explore Our World-Class Courses
                </h1>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-xl font-medium text-gray-300">Loading inspiring courses...</p>
                        <p className="text-gray-500 mt-2">Just a moment while we fetch everything for you.</p>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onPurchase={handlePurchase}
                                purchased={purchasedCourses.has(course._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl max-w-2xl mx-auto shadow-xl">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                            No Courses Available Yet!
                        </h3>
                        <p className="text-gray-400 text-lg mb-6">
                            We're busy crafting new and exciting content. Please check back soon or
                            <a href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1">contact us</a> to suggest a topic!
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-6 py-3 border border-indigo-500 rounded-full text-base font-medium text-indigo-300 bg-indigo-700/30 hover:bg-indigo-600/40 transition-all duration-300 transform hover:scale-105"
                        >
                            Refresh Page
                            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12c0 4.418 3.582 8 8 8s8-3.582 8-8V9m-11 3h3m-3 0a1 1 0 00-1 1v2a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 00-1-1z"></path></svg>
                        </button>
                    </div>
                )}
            </div>
            
            {/* Custom Tailwind animation for pulse-slow */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.1;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.15;
                    }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default AllCourses;