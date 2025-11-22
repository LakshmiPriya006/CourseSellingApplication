import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AllCoursesPage from './pages/AllCoursesPage';
import CoursePreview from './pages/CoursePreview';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CoursePlayer from './pages/CoursePlayer';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const storedUserType = localStorage.getItem('userType');
      
      if (token && storedUserType) {
        // Optional: Validate token with backend
        try {
          // You can add a token validation endpoint here if needed
          // const response = await axios.get(`http://localhost:3000/${storedUserType}/validate`, {
          //   headers: { token }
          // });
          
          setIsAuthenticated(true);
          setUserType(storedUserType);
        } catch (error) {
          console.error('Token validation failed:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('userType');
        }
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  // Hide navbar on auth and course-player pages
  const hideNavbar = location.pathname === '/auth' || location.pathname.includes('/course-player');

  // Show loading spinner during initial auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {!hideNavbar && (
        <Navbar 
          isAuthenticated={isAuthenticated}
          userType={userType}
          onLogout={handleLogout}
        />
      )}
      
      <Routes>
        <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} userType={userType} />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/course-preview/:id?" element={<CoursePreview isAuthenticated={isAuthenticated} userType={userType} />} />
        <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/course-player/:id?" element={<CoursePlayer />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;