// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_USERNAME = "testuser@gmail.com"; // Your API username
const API_PASSWORD = "test123"; // Your API password

const API_BASE_URL = "/api/v1";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // 'token' in state will now specifically refer to the FINAL authentication token for data access
    const [token, setToken] = useState(
        localStorage.getItem("finalAuthToken") || null
    );
    const [authLoading, setAuthLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    const tokenAcquisitionPromise = React.useRef(null); // Use a ref to manage the async token acquisition

    // This axios instance will be used for ALL data fetching requests,
    // and will automatically include the FINAL authentication token.
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request Interceptor: Add the Bearer FINAL_TOKEN if available
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                // 'token' here is the finalAuthToken
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                // If no finalAuthToken, and it's not the initial token acquisition call itself
                // (those initial calls will use a temporary instance or axios directly)
                if (config.url !== "/auth/tokens" && !config._isAuthFlow) {
                    // _isAuthFlow to mark internal auth calls
                    console.warn(
                        "Attempting data request without final authentication token:",
                        config.url
                    );
                    return Promise.reject(
                        new axios.Cancel(
                            "Request cancelled: No final authentication token available."
                        )
                    );
                }
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    // Response Interceptor: Handle finalAuthToken expiration/invalidation (e.g., 401 Unauthorized)
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (err) => {
            const originalRequest = err.config;

            // Only retry if it's a 401 AND it's NOT the initial token acquisition endpoint itself
            // AND it's not already a retried request AND it's not an internal auth flow request
            if (
                err.response &&
                err.response.status === 401 &&
                originalRequest.url !== "/auth/tokens" &&
                !originalRequest._retry &&
                !originalRequest._isAuthFlow // Do not retry internal auth flow steps
            ) {
                originalRequest._retry = true;
                console.warn(
                    "Final API token expired or invalid for data request, attempting to re-authenticate the application..."
                );

                // Use a single promise for token acquisition to prevent multiple concurrent calls
                if (!tokenAcquisitionPromise.current) {
                    tokenAcquisitionPromise.current = acquireFinalApplicationToken(); // Re-acquire the FINAL token
                }

                try {
                    await tokenAcquisitionPromise.current;
                    const newFinalToken = localStorage.getItem("finalAuthToken"); // Get the newly acquired final token
                    if (newFinalToken) {
                        originalRequest.headers.Authorization = `Bearer ${newFinalToken}`;
                        tokenAcquisitionPromise.current = null;
                        return axiosInstance(originalRequest); // Retry the original data request
                    } else {
                        console.error(
                            "Token re-acquisition failed. Clearing token and redirecting."
                        );
                        setAuthError(
                            "Session expired or authentication failed. Please refresh."
                        );
                        setToken(null); // Clear the state token
                        localStorage.removeItem("finalAuthToken");
                        tokenAcquisitionPromise.current = null;
                        return Promise.reject(err);
                    }
                } catch (refreshError) {
                    console.error(
                        "Failed to re-authenticate during interceptor:",
                        refreshError
                    );
                    setAuthError("Authentication required. Please refresh.");
                    setToken(null);
                    localStorage.removeItem("finalAuthToken");
                    tokenAcquisitionPromise.current = null;
                    return Promise.reject(err);
                }
            }

            // If it's a 401 from /auth/tokens, or any other error, or already retried, just reject
            if (
                err.response &&
                err.response.status === 401 &&
                originalRequest.url === "/auth/tokens"
            ) {
                console.error(
                    "Initial /auth/tokens request failed with 401. Check credentials."
                );
                setAuthError(err.response.data?.error || "Invalid API credentials.");
                setToken(null);
                localStorage.removeItem("finalAuthToken");
                setAuthLoading(false); // Stop loading, show error
                return Promise.reject(err);
            }
            // If it's a 401 for an internal auth flow step, also reject directly to avoid loop
            if (
                err.response &&
                err.response.status === 401 &&
                originalRequest._isAuthFlow
            ) {
                console.error(
                    "Authentication flow step failed with 401:",
                    originalRequest.url,
                    err.response.data
                );
                setAuthError(
                    err.response.data?.error ||
                    `Authentication step failed for ${originalRequest.url}`
                );
                setToken(null);
                localStorage.removeItem("finalAuthToken");
                setAuthLoading(false);
                return Promise.reject(err);
            }

            return Promise.reject(err);
        }
    );

    // This function encapsulates the entire multi-step token acquisition process
    const acquireFinalApplicationToken = async () => {
        setAuthLoading(true);
        setAuthError(null);

        console.log("Starting full application token acquisition process...");
        try {
            // Step 1: POST to /auth/tokens using the hardcoded API credentials
            // Use a temporary axios instance or axios directly to avoid interceptor issues here
            const tempAxios = axios.create({
                baseURL: API_BASE_URL,
                headers: { "Content-Type": "application/json" },
            });
            const loginResponse = await tempAxios.post(
                "/auth/tokens",
                {
                    userName: API_USERNAME,
                    password: API_PASSWORD,
                },
                { _isAuthFlow: true }
            ); // Mark as internal auth flow

            console.log("1. Initial /auth/tokens response data:", loginResponse.data);

            const initialToken = loginResponse.data.token;
            const clients = loginResponse.data.clients;

            if (!initialToken) {
                throw new Error("Initial token missing in response.");
            }
            if (!Array.isArray(clients) || clients.length === 0) {
                throw new Error(
                    "Clients array missing or empty in initial token response. Cannot proceed without a client ID."
                );
            }
            const clientId = clients[0].id; // Assuming there's at least one client with an 'id'
            console.log("2. Client ID obtained:", clientId);

            // Use the initialToken for the subsequent GET calls (manually add header)
            const authFlowAxios = axios.create({
                baseURL: API_BASE_URL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${initialToken}`, // Use initialToken here
                },
            });

            // Step 2: GET roles
            const rolesResponse = await authFlowAxios.get(
                `/auth/roles?client=${clientId}`,
                { _isAuthFlow: true }
            );
            const roles = rolesResponse.data.roles;
            console.log("3. Roles response data:", roles);

            if (!Array.isArray(roles) || roles.length === 0) {
                throw new Error(
                    "No roles found for API user or roles response is malformed/empty. Cannot proceed without a role ID."
                );
            }
            const roleId = roles[0].id;
            console.log("4. Role ID obtained:", roleId);

            // Step 3: GET organizations
            const orgsResponse = await authFlowAxios.get(
                `/auth/organizations?client=${clientId}&role=${roleId}`,
                { _isAuthFlow: true }
            );
            const organizations = orgsResponse.data.organizations;
            console.log("5. Organizations response data:", organizations);

            if (!Array.isArray(organizations) || organizations.length === 0) {
                throw new Error(
                    "No organizations found for API user or organizations response malformed/empty. Cannot proceed without an organization ID."
                );
            }
            const organizationId = organizations[0].id;
            console.log("6. Organization ID obtained:", organizationId);

            // Step 4: GET warehouses
            const warehousesResponse = await authFlowAxios.get(
                `/auth/warehouses?client=${clientId}&role=${roleId}&organization=${organizationId}`,
                { _isAuthFlow: true }
            );
            const warehouses = warehousesResponse.data;
            console.log("7. Warehouses response data:", warehouses);
            // Warehouses can sometimes be null or empty, so handle gracefully
            const warehouseId =
                Array.isArray(warehouses) && warehouses.length > 0 && warehouses[0].id
                    ? warehouses[0].id
                    : null;
            console.log("8. Warehouse ID obtained:", warehouseId);

            // Step 5: GET languages
            const languagesResponse = await authFlowAxios.get(
                `/auth/language?client=${clientId}`,
                { _isAuthFlow: true }
            );
            const languages = languagesResponse.data;
            console.log("9. Languages response data:", languages);

            // Extract the language code directly from the response object
            const languageData = languagesResponse.data;

            // Check if the expected property exists and is a string
            if (
                !languageData ||
                typeof languageData.AD_Language !== "string" ||
                languageData.AD_Language.trim() === ""
            ) {
                throw new Error(
                    "Language data missing or malformed in API response. Cannot proceed without a language."
                );
            }
            const language = languageData.AD_Language; // Get the language string directly
            console.log("10. Language obtained:", language); // Add back the log for debugging
            console.log("10. Language obtained:", language);

            // Step 6: Final PUT request to /auth/tokens to get the FINAL token
            const finalTokenResponse = await authFlowAxios.put(
                "/auth/tokens",
                {
                    // Use authFlowAxios here too as it has initialToken
                    clientId: clientId,
                    roleId: roleId,
                    organizationId: organizationId,
                    warehouseId: warehouseId,
                    language: language,
                },
                { _isAuthFlow: true }
            ); // Mark as internal auth flow

            const finalAuthToken = finalTokenResponse.data.token;
            if (!finalAuthToken) {
                throw new Error(
                    "Final authentication token missing after PUT request."
                );
            }

            console.log(
                "11. Final authentication token successfully acquired and session context established."
            );
            setToken(finalAuthToken); // Set the state with the FINAL token
            localStorage.setItem("finalAuthToken", finalAuthToken); // Store the FINAL token

            setAuthLoading(false);
            setAuthError(null);
            return true;
        } catch (err) {
            console.error(
                "Application API authentication failed during acquisition:",
                err.response?.data || err.message || err
            );
            const errorMessage =
                err.response?.data?.error ||
                err.message ||
                "Application API authentication failed";
            setAuthError(errorMessage);
            setToken(null);
            localStorage.removeItem("finalAuthToken");
            setAuthLoading(false);
            return false;
        }
    };

    useEffect(() => {
        // Only attempt to acquire the token if we don't have a final one and no prior error
        if (!token && !authError) {
            if (!tokenAcquisitionPromise.current) {
                // Prevent multiple calls from useEffect
                tokenAcquisitionPromise.current =
                    acquireFinalApplicationToken().finally(() => {
                        tokenAcquisitionPromise.current = null; // Clear promise after completion
                    });
            }
        } else if (token) {
            setAuthLoading(false); // We have a valid final token, so loading is complete
        }
    }, [token, authError]);

    const value = {
        token, // This is the FINAL token for data requests
        authLoading,
        authError,
        axiosInstance, // This axios instance will use the FINAL token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
