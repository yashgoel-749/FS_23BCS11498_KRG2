import axios from "axios";

const REST_API_URL = "http://localhost:8081/api/auth";

export const register = (userData) => {
  return axios.post(`${REST_API_URL}/register`, userData);
};

export const login = (loginData) => {
  return axios.post(`${REST_API_URL}/login`, loginData);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const logout = () => {
  removeToken();
  removeUser();
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

// Axios interceptor to add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

