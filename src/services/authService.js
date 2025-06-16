// src/services/authService.js
import { post } from './apiService'; // Make sure this path is correct!

const TOKEN_EXPIRY_KEY = 'authTokenExpiry';
const TOKEN_KEY = 'authToken';
const CLIENT_KEY = 'client'; // Used for storing client data after login

// Set token expiration to 30 minutes from now
const setTokenExpiry = () => {
    const expiryTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes in milliseconds
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

// Check if token is expired
export const isTokenExpired = () => { // No type annotation for return
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;

    return new Date().getTime() > parseInt(expiryTime);
};

export const login = async (username, password) => { // No type annotations
    try {
        // This endpoint should match what your backend expects for token generation
        const response = await post(`auth/tokens`, {
            userName: username,
            password: password,
        });

        if (!response.ok) {
            // Parse error message from backend if available
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json(); // Data will contain { clients: [], token: "" }

        // Store token and client information in localStorage
        localStorage.setItem(TOKEN_KEY, data.token);
        // Assuming 'data.clients' is an array and you want to store the first one or just an object
        if (data.clients && data.clients.length > 0) {
            localStorage.setItem(CLIENT_KEY, JSON.stringify(data.clients[0]));
        } else {
            localStorage.removeItem(CLIENT_KEY); // Clear if no client data
        }

        // Set token expiry when logging in
        setTokenExpiry();

        return data; // Return the full response data (token, clients)
    } catch (error) {
        // Centralized error logging/handling
        console.error("Auth Service Login Error:", error);
        throw new Error(error.message || 'Login failed due to an unexpected error.');
    }
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CLIENT_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

export const getStoredAuth = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const client = localStorage.getItem(CLIENT_KEY);

    // Check if token exists and is expired
    if (token && isTokenExpired()) {
        logout(); // Clear all auth data if expired
        return { token: null, client: null };
    }

    // If token is valid, refresh the expiry time to extend session
    if (token) {
        setTokenExpiry();
    }

    return {
        token,
        client: client ? JSON.parse(client) : null,
    };
};