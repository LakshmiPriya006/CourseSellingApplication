import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Play } from 'lucide-react';

const CoursePlayer = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(1);

  const lessons = [
    { id: 1, title: 'Introduction to the Course', duration: '10:32', completed: true },
    { id: 2, title: 'Setting Up Your Environment', duration: '15:20', completed: true },
    { id: 3, title: 'Your First Project', duration: '22:45', completed: false },
    { id: 4, title: 'Advanced Concepts', duration: '18:30', completed: false },
    { id: 5, title: 'Building a Real Application', duration: '35:15', completed: false },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <Link 
            to="/user-dashboard" 
            className="text-indigo-400 hover:text-indigo-300 mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h2 className="text-xl font-bold text-white">Course Content</h2>
        </div>
        
        <div className="p-4 space-y-2">
          {lessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson.id)}
              className={`w-full text-left p-4 rounded-lg transition ${
                selectedLesson === lesson.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{lesson.title}</span>
                {lesson.completed && (
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-400">{lesson.duration}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="bg-black flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-800 rounded-full p-8 inline-block mb-4">
              <Play className="w-20 h-20 text-white" />
            </div>
            <p className="text-white text-xl">Video Player</p>
            <p className="text-gray-400 mt-2">Lesson {selectedLesson}: {lessons[selectedLesson - 1].title}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button className="text-white hover:text-indigo-400 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-indigo-400 transition">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10l6 2-6 2V10z" />
                </svg>
              </button>
              <span className="text-white">00:00 / {lessons[selectedLesson - 1].duration}</span>
            </div>

            <button className="text-white hover:text-indigo-400 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
