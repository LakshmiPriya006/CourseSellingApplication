import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="text-6xl font-medium text-gray-900 mt-8">Page Not Found</h2>
        <p className="text-xl text-gray-600 mt-4">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link 
          to="/" 
          className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound