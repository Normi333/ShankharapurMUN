// src/context/AuthContext.js (create a new folder and file)
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/axiosConfig'; // Your configured Axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // Optional: store user details
    const [loadingAuth, setLoadingAuth] = useState(true); // For initial auth check

    // Check for token on initial app load
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Optional: Verify token with backend or decode JWT client-side
            // For a real app, you might make a request to /api/user/me
            // to validate the token and fetch fresh user data
            apiClient.get('/api/user/me') // Example endpoint
                .then(response => {
                    setIsLoggedIn(true);
                    setUser(response.data.user); // Store actual user data
                })
                .catch(() => {
                    // Token invalid or expired, clear it
                    localStorage.removeItem('authToken');
                    setIsLoggedIn(false);
                    setUser(null);
                })
                .finally(() => {
                    setLoadingAuth(false);
                });
        } else {
            setLoadingAuth(false);
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUser(null);
        // If using refresh tokens, send a request to backend to invalidate it
        // apiClient.post('/api/auth/logout').catch(err => console.error("Logout API error", err));
    };

    const authContextValue = {
        isLoggedIn,
        user,
        loadingAuth,
        login,
        logout,
        setIsLoggedIn // Still needed for Login component to update directly
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use auth context
export const useAuth = () => useContext(AuthContext);