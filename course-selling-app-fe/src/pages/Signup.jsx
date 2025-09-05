import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(firstName, lastName, email, password, 'user');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-200 flex items-center justify-center py-20 px-4">
            <div className="relative z-10 w-full max-w-md p-8 space-y-6 backdrop-blur-md bg-slate-900/80 rounded-xl shadow-2xl border border-slate-700">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="firstName">First Name</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="lastName">Last Name</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center pt-4">
                        <button
                            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-semibold bg-gradient-to-r from-gray-200 to-white text-slate-900 transition-all duration-300 transform hover:scale-105 hover:from-white hover:to-gray-100"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-gray-400 mt-4">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-gray-300 hover:text-white transition-colors duration-300">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;