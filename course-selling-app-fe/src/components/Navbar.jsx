import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinkComponent = ({ to, children }) => (
    <NavLink
      to={to}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
        'text-gray-300 hover:text-white'
      }`}
      style={({ isActive }) => ({
        color: isActive ? 'white' : undefined,
      })}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 to-white transform origin-left transition-transform duration-300 ${
        ({ isActive }) => isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
    </NavLink>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-slate-900/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-slate-900 font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CoursePlatform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinkComponent to="/courses">All Courses</NavLinkComponent>

            {isAuthenticated && userType === 'user' && (
              <NavLinkComponent to="/my-courses">My Courses</NavLinkComponent>
            )}

            {isAuthenticated && userType === 'admin' && (
              <NavLinkComponent to="/admin/dashboard">Admin Dashboard</NavLinkComponent>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/signin" 
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 text-sm font-medium text-slate-900 bg-gradient-to-r from-gray-200 to-white rounded-lg hover:from-white hover:to-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-600/30">
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-white rounded-full"></div>
                  <span className="text-sm text-gray-300">{userType === 'admin' ? 'Admin' : 'User'}</span>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-300 border border-slate-600/50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-md border-b border-slate-700/50">
            <div className="px-4 py-4 space-y-3">
              <NavLinkComponent to="/courses">All Courses</NavLinkComponent>

              {isAuthenticated && userType === 'user' && (
                <NavLinkComponent to="/my-courses">My Courses</NavLinkComponent>
              )}

              {isAuthenticated && userType === 'admin' && (
                <NavLinkComponent to="/admin/dashboard">Admin Dashboard</NavLinkComponent>
              )}

              <div className="border-t border-slate-700/50 pt-3 mt-3">
                {!isAuthenticated ? (
                  <div className="space-y-2">
                    <Link 
                      to="/signin" 
                      className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block px-3 py-2 text-slate-900 bg-gradient-to-r from-gray-200 to-white rounded-lg text-center font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button 
                    onClick={logout}
                    className="block w-full px-3 py-2 text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-300 text-left"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;