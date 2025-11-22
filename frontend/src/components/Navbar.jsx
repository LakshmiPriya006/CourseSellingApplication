import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Menu, LogOut } from 'lucide-react';

const Navbar = ({ isAuthenticated, userType, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">LearnHub</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition ${
              isActive('/') 
                ? 'text-indigo-600 font-medium' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}>Home</Link>
            <Link to="/courses" className={`transition ${
              isActive('/courses') 
                ? 'text-indigo-600 font-medium' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}>Courses</Link>
            
            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/auth" className="text-indigo-600 hover:text-indigo-700 font-medium transition">Sign In</Link>
                <Link to="/auth" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Get Started</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to={userType === 'admin' ? '/admin-dashboard' : '/user-dashboard'} className={`transition ${
                  isActive('/admin-dashboard') || isActive('/user-dashboard')
                    ? 'text-indigo-600 font-medium' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}>Dashboard</Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left transition ${
              isActive('/') 
                ? 'text-indigo-600 font-medium' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}>Home</Link>
            <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left transition ${
              isActive('/courses') 
                ? 'text-indigo-600 font-medium' 
                : 'text-gray-700 hover:text-indigo-600'
            }`}>Courses</Link>
            {!isAuthenticated ? (
              <>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left text-indigo-600 hover:text-indigo-700 font-medium transition">Sign In</Link>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Get Started</Link>
              </>
            ) : (
              <>
                <Link to={userType === 'admin' ? '/admin-dashboard' : '/user-dashboard'} onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left transition ${
                  isActive('/admin-dashboard') || isActive('/user-dashboard')
                    ? 'text-indigo-600 font-medium' 
                    : 'text-gray-700 hover:text-indigo-600'
                }`}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block w-full text-left text-red-600 hover:text-red-700 transition">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;