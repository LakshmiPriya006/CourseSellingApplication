import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Will be { id, email, type: 'user'/'admin' }
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // If there's a token, set it in storage
            localStorage.setItem('token', token);
            localStorage.setItem('userType', userType);
        } else {
            // If there is NO token (i.e., on logout), REMOVE it from storage
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
        }
    }, [token, userType]); // This logic is now correct

    const login = async (email, password, type = 'user') => {
        const promise = apiClient.post(type === 'admin' ? '/admin/signin' : '/user/signin', { email, password });

        toast.promise(promise, {
            loading: 'Signing in...',
            success: (response) => {
                if (response.data.token) {
                    setToken(response.data.token);
                    setUserType(type);
                    if (type === 'admin') {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/my-courses');
                    }
                    return 'Successfully signed in!';
                }
                // This part might not be reached if API throws an error on failure
                throw new Error('No token received');
            },
            error: 'Login failed. Please check your credentials.',
        });
    };

    const signup = async (firstName, lastName, email, password, type = 'user') => {
        try {
            const endpoint = type === 'admin' ? '/admin/signup' : '/user/signup';
            await apiClient.post(endpoint, { firstName, lastName, email, password });
            alert("Signup successful! Please sign in.");
            if (type === 'admin') {
                navigate('/admin/signin');
            } else {
                navigate('/signin');
            }
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. The user might already exist.");
        }
    };

    const logout = () => {
        setToken(null);
        setUserType(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    const value = { token, userType, login, logout, signup, isAuthenticated: !!token };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};