import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';

// Page Imports
import Home from './pages/Home';
import AllCourses from './pages/AllCourses';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import MyCourses from './pages/user/MyCourses';

import AdminSignin from './pages/admin/AdminSignin';
import AdminSignup from './pages/admin/AdminSignup'; 
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateEditCourse from './pages/admin/CreateEditCourse';

import { Toaster } from 'react-hot-toast';
import { UserProtectedRoute, AdminProtectedRoute } from './utils/ProtectedRoutes';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} /> {/* Add this line */}
        <div className="bg-slate-50 min-h-screen">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/signin" element={<AdminSignin />} />
              <Route path="/admin/signup" element={<AdminSignup />} /> 

              {/* Protected User Routes */}
              <Route element={<UserProtectedRoute />}>
                <Route path="/my-courses" element={<MyCourses />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/course/new" element={<CreateEditCourse />} />
                <Route path="/admin/course/edit/:courseId" element={<CreateEditCourse />} />
              </Route>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;