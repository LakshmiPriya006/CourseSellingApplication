import  { useState,useEffect } from 'react'
import Course from '../components/Course';


const Courses = () => {
    const [coursesList,setCoursesList]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            let response=await fetch(`https://csa-backend.vercel.app/courses/preview`)
            let data=await response.json();
            setCoursesList(data.course);
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
            Explore our comprehensive selection of computer science courses
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

export default Courses
