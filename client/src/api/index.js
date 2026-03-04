import axios from "axios";

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("luminary_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("luminary_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register:       (data) => api.post("/auth/register", data),
  login:          (data) => api.post("/auth/login", data),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword:  (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
  getMe:          () => api.get("/auth/me"),
};

export const booksAPI = {
  getAll:  (params) => api.get("/books", { params }),
  getById: (id)     => api.get(`/books/${id}`),
  create:  (form)   => api.post("/books", form, { headers: { "Content-Type": "multipart/form-data" } }),
  delete:  (id)     => api.delete(`/books/${id}`),
};

export const storiesAPI = {
  getAll:  (params) => api.get("/stories", { params }),
  getById: (id)     => api.get(`/stories/${id}`),
};

export default api;