import React, { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: '🎯', title: 'Expert-Led', desc: 'Industry professionals' },
    { icon: '⚡', title: 'Fast Track', desc: 'Learn efficiently' },
    { icon: '🏆', title: 'Certified', desc: 'Recognized credentials' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Interactive cursor glow */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-gray-400/10 to-transparent rounded-full pointer-events-none blur-2xl transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-10">
        {/* Hero section */}
        <div className={`text-center max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-slate-700/40 to-gray-700/40 backdrop-blur-sm border border-gray-400/20 rounded-full text-gray-300 text-sm font-semibold">
              ✨ Transform Your Future Today
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-6 leading-tight">
            Unlock Your
            <span className="block bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
              Potential
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Discover world-class courses designed to 
            <span className="text-gray-100 font-semibold"> accelerate your career </span>
            and unlock new opportunities in today's digital world.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <button 
              onClick={() => window.location.href = '/courses'}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-slate-700 to-gray-800 rounded-full hover:from-slate-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/25 border border-slate-600/50"
            >
              <span className="relative z-10 flex items-center">
                Explore Courses
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-slate-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-slate-800/30 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 hover:bg-slate-700/40 transition-all duration-300 hover:scale-105 hover:border-slate-500/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className={`mt-20 mb-16 grid grid-cols-2 md:grid-cols-4 gap-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group">
            <div className="text-3xl font-bold text-gray-200 mb-1 group-hover:scale-110 transition-transform duration-300">50k+</div>
            <div className="text-gray-400 text-sm">Students</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-gray-200 mb-1 group-hover:scale-110 transition-transform duration-300">200+</div>
            <div className="text-gray-400 text-sm">Courses</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-gray-200 mb-1 group-hover:scale-110 transition-transform duration-300">95%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-gray-200 mb-1 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;