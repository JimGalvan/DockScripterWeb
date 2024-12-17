import axios from 'axios';
import authStore from "../state/authStore";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_VERSION = 'v1';

const axiosInstance = axios.create({
    baseURL: `http://localhost:80/api/${API_VERSION}`, // Replace with your API base URL
});


const activeToasts = new Set();
axiosInstance.interceptors.request.use(
    (config) => {
        const token = authStore.getState?.().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        let errorMessage = 'An unexpected error occurred.';
        const errorDetails = [];

        if (error.response?.data?.errors) {
            const validationErrors = error.response.data.errors;
            for (const field in validationErrors) {
                if (validationErrors.hasOwnProperty(field)) {
                    errorDetails.push(`${field}: ${validationErrors[field].join(', ')}`);
                }
            }
        }

        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.response?.data?.title) {
            errorMessage = error.response.data.title;
            // this has to be first because the login page is the only one that has a 401 status code
        } else if (error.response?.status === 401 && window.location.pathname === '/login') {
            errorMessage = 'Invalid email or password.';
        } else if (error.response?.status === 401) {
            errorMessage = 'You are not authorized to perform this action.';
        } else if (error.response?.status === 404) {
            errorMessage = 'Resource not found.';
        } else if (error.response?.status === 500) {
            errorMessage = 'Server error. Please try again later.';
        } else if (!navigator.onLine) {
            errorMessage = 'You are offline. Check your connection.';
        }

        // Combine main error message with validation errors
        if (errorDetails.length > 0) {
            errorMessage += `\nDetails:\n- ${errorDetails.join('\n- ')}`;
        }

        if (!activeToasts.has(errorMessage)) {
            toast.error(errorMessage, {
                onClose: () => activeToasts.delete(errorMessage),
                autoClose: 5000,
            });
            activeToasts.add(errorMessage);
        }

        if (error.response?.status === 429) {
            // TODO: Implement rate limiting
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
