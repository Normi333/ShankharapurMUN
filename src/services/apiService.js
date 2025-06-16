// src/services/apiService.js
import { getStoredAuth } from './authService'; // Make sure this path is correct!

// Helper function to get headers with authentication token
const getAuthHeaders = () => {
    // *** IMPORTANT: You need to uncomment the line below and REMOVE the hardcoded token! ***
    const { token } = getStoredAuth();
    // const token = "eyJraWQiOiJpZGVtcGllcmUiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJucmJUQWRtaW4iLCJBRF9MYW5ndWFnZSI6ImVuX1VTIiwiQURfU2Vzc2lvbl9JRCI6MTAxNDMxNCwiQURfVXNlcl9JRCI6MTAwMDAwMCwiQURfUm9sZV9JRCI6MTAwMDAwMCwiQURfQ2xpZW50X0lEIjoxMDAwMDAwfQ._Kb-vIx8Fbas40K3jkMCM1y0cvkGfkP360K5AescTCkr2f81GEl9eAQd_X9hv1SArybpOp83lWJ6qZpP4W4n9g"; 
    // ^^^ DELETE THE HARDCODED TOKEN LINE ABOVE ^^^

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

// Generic fetch function with authentication
export const fetchWithAuth = async (
    endpoint, // No 'endpoint: string' type annotation
    options = {} // No 'options: RequestInit' type annotation
) => {
    // IMPORTANT: Adjust '/api/' if your backend API has a different base URL
    const url = `/api/${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers,
        },
        credentials: 'include', // Important if you're using cookies or sessions alongside tokens
    });

    return response;
};

// GET request
export const get = async (endpoint, options = {}) => { // No type annotations
    return fetchWithAuth(endpoint, {
        ...options,
        method: 'GET',
    });
};

// POST request
export const post = async (endpoint, data, options = {}) => { // No type annotations
    return fetchWithAuth(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
    });
};

// PUT request
export const put = async (endpoint, data, options = {}) => { // No type annotations
    return fetchWithAuth(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

// DELETE request
export const del = async (endpoint, options = {}) => { // No type annotations
    return fetchWithAuth(endpoint, {
        ...options,
        method: 'DELETE',
    });
};