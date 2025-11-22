import React from 'react';

const CourseCard = ({ course, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
      onClick={onClick}
    >
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">₹{course.price}</span>
          <span className="text-sm text-gray-500">{course.instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;