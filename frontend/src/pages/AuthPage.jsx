import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen } from 'lucide-react';

const AuthPage = ({ setIsAuthenticated, setUserType }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userTypeSelect, setUserTypeSelect] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Determine the endpoint based on User Type (user vs admin) and Action (signin vs signup)
    const endpoint = isSignIn
      ? `http://localhost:3000/${userTypeSelect}/signin`
      : `http://localhost:3000/${userTypeSelect}/signup`;

    try {
      console.log('Attempting to authenticate:', { endpoint, userType: userTypeSelect, isSignIn });
      
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
        ...((!isSignIn) && { 
          firstName: formData.firstName, 
          lastName: formData.lastName 
        })
      });

      console.log('Authentication response:', response.data);

      // 2. If Sign In is successful, save the token!
      if (isSignIn && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', userTypeSelect);
        setIsAuthenticated(true);
        setUserType(userTypeSelect);
        navigate(userTypeSelect === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      } else if (!isSignIn) {
        setError('');
        alert("Signup successful! Please sign in.");
        setIsSignIn(true);
        setFormData(prev => ({ ...prev, firstName: '', lastName: '' }));
      }

    } catch (error) {
      console.error('Authentication error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Authentication failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">LearnHub</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignIn ? 'Sign in to continue learning' : 'Start your learning journey'}
          </p>
        </div>

        <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
          <button
            onClick={() => setUserTypeSelect('user')}
            className={`flex-1 py-2 rounded-md font-medium transition ${userTypeSelect === 'user'
                ? 'bg-white text-indigo-600 shadow'
                : 'text-gray-600'
              }`}
          >
            Student
          </button>
          <button
            onClick={() => setUserTypeSelect('admin')}
            className={`flex-1 py-2 rounded-md font-medium transition ${userTypeSelect === 'admin'
                ? 'bg-white text-indigo-600 shadow'
                : 'text-gray-600'
              }`}
          >
            Instructor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {!isSignIn && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="John"
                  required={!isSignIn}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="Doe"
                  required={!isSignIn}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isSignIn ? 'Signing In...' : 'Creating Account...'}
              </span>
            ) : (
              isSignIn ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;