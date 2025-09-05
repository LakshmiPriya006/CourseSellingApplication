// import React from 'react';

// const CourseCard = ({ course, onPurchase, purchased = false }) => {
//   return (
//     <div className="group flex flex-col h-full bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//       <img 
//         className="h-52 w-full object-cover" 
//         src={course.imageUrl || 'https://placehold.co/600x400/3b82f6/white?text=Course+Image'} 
//         alt={course.title} 
//       />
//       <div className="p-4 md:p-6 flex flex-col flex-grow">
//         <h3 className="text-lg font-semibold text-neutral-800 mb-2">{course.title}</h3>
//         <p className="text-sm text-neutral-500 flex-grow">{course.description}</p>
//       </div>
//       <div className="px-6 pb-4 border-t border-neutral-200 mt-auto pt-4 flex justify-between items-center">
//         <span className="text-2xl font-bold text-primary-600">${course.price}</span>
//         {/* The change is only for the button, when the onPurchase prop is provided and the course is not purchased */}
//         {onPurchase && !purchased && (
//            <button 
//              onClick={() => onPurchase(course._id)} 
//              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white px-4 py-2 hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
//            >
//               {/* --- THIS TEXT HAS BEEN UPDATED --- */}
//               Purchase Course
//            </button>
//         )}
//          {purchased && (
//            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
//               ✓ Enrolled
//            </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CourseCard = ({ course, onPurchase, purchased = false }) => {
    // Get user authentication status and type from the auth hook
    const { isAuthenticated, userType } = useAuth();

    const isBestseller = course.isBestseller || false;
    const isAdmin = isAuthenticated && userType === 'admin';

    return (
        <div className="group relative flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-slate-600">
            
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-70"></div>

            <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-slate-900">
                
                <div className="overflow-hidden">
                    <img
                        className="h-52 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        src={course.imageUrl || 'https://placehold.co/600x400/1e293b/94a3b8?text=Course+Image'}
                        alt={course.title || 'Course thumbnail'}
                    />
                </div>

                {isBestseller && (
                    <span className="absolute top-4 right-4 z-20 inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        Best Seller
                    </span>
                )}

                <div className="flex flex-grow flex-col p-4 md:p-6">
                    <h3 className="mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent">
                        {course.title || "Untitled Course"}
                    </h3>
                    <p className="flex-grow text-sm text-gray-400">
                        {course.description || "No description provided."}
                    </p>
                </div>

                <div className="mt-auto flex items-center justify-between px-6 pb-5 pt-4">
                    <span className="text-2xl font-bold text-white">
                        ${course.price != null ? course.price : '0.00'}
                    </span>

                    {/* Conditional rendering based on 'purchased' and the user's role */}
                    {purchased ? (
                        <span className="inline-flex items-center gap-x-1.5 rounded-full border border-emerald-500/50 bg-emerald-600/40 py-1.5 px-3 text-xs font-medium text-emerald-300">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                            Enrolled
                        </span>
                    ) : (isAuthenticated && !isAdmin) ? (
                        <button
                            onClick={() => onPurchase(course._id)}
                            className="group/button relative inline-flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
                        >
                            Purchase
                            <svg className="h-4 w-4 transition-transform group-hover/button:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;