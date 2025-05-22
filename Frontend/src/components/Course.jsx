//import React from 'react'


const Course = ({course}) => {
  function handleEnroll(courseId) {
    fetch(`https://csa-backend.vercel.app/courses/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify({
        courseId: courseId,
      })
    })
  }
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={course.imageURL}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-gray-600 mb-4">₹{course.price}</p>
                
                {localStorage.getItem("userType")==="user"&&<button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {handleEnroll(course._id)}}>
                  Enroll Now
                </button>}
              </div>
            </div>
    </div>
  )
}

export default Course
