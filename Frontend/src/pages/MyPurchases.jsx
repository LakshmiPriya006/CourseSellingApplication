import  { useState,useEffect } from 'react'
import Course from '../components/Course';



const MyPurchases = () => {
    const [coursesList,setCoursesList]=useState([]);
    useEffect(()=>{
        async function fetchData() {
            try {
                // First fetch - get purchased course IDs
                const response = await fetch(`https://csa-backend.vercel.app/user/purchases`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${localStorage.getItem('token')}`
                    }
                });
                const purchasedData = await response.json();
                let purchasedIds = purchasedData.courses;
                purchasedIds = purchasedIds.map(course => course.courseId);
                // Second fetch - get all courses
                const coursesResponse = await fetch(`https://csa-backend.vercel.app/courses/preview`);
                let allCourses = await coursesResponse.json();
                allCourses = allCourses.course;
                // Filter courses that match purchased IDs
                let purchasedCourses = allCourses.filter((course) => {
                    return purchasedIds.includes(course._id)}
                );
                
                setCoursesList(purchasedCourses);
                
            } catch (err) {
                setError('Failed to fetch purchases');
                console.error('Error:', err);
            }
        }
        fetchData();
    },[])

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Courses</h1>
          <p className="text-xl text-gray-600 mb-12">
            your purchased courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            coursesList.map((course)=><Course course={course}/>)
          }
        </div>
      </div>
    </div>
    </div>
  )
}

export default MyPurchases
