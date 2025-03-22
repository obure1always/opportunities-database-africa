import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (email: string, password: string, fullName: string) => {
    const response = await api.post('/auth/register', { email, password, full_name: fullName });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Scholarship services
export const scholarshipService = {
  getAll: async () => {
    const response = await api.get('/scholarships');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/scholarships/${id}`);
    return response.data;
  },

  create: async (scholarshipData: any) => {
    const response = await api.post('/scholarships', scholarshipData);
    return response.data;
  },

  update: async (id: string, scholarshipData: any) => {
    const response = await api.put(`/scholarships/${id}`, scholarshipData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/scholarships/${id}`);
    return response.data;
  },
};

// Application services
export const applicationService = {
  apply: async (scholarshipId: string) => {
    const response = await api.post(`/applications/${scholarshipId}`);
    return response.data;
  },

  getUserApplications: async (userId: string) => {
    const response = await api.get(`/applications/user/${userId}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/applications/${id}/status`, { status });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/applications');
    return response.data;
  },
};

export default api; 