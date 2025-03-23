import axios from 'axios';
import { User, Scholarship, Application, ApiResponse, AuthResponse, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Create API service instance
export const apiService = {
  // Auth methods
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', {
        email,
        password,
        name,
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', {
        email,
        password,
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Scholarship methods
  async getAll(page = 1, limit = 10, filters = {}): Promise<PaginatedResponse<Scholarship>> {
    try {
      const response = await api.get<ApiResponse<PaginatedResponse<Scholarship>>>('/scholarships', {
        params: { page, limit, ...filters },
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch scholarships');
      }
      throw error;
    }
  },

  async getById(id: string): Promise<Scholarship> {
    try {
      const response = await api.get<ApiResponse<Scholarship>>(`/scholarships/${id}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch scholarship details');
      }
      throw error;
    }
  },

  // Application methods
  async apply(scholarshipId: string, data: any): Promise<Application> {
    try {
      const response = await api.post<ApiResponse<Application>>('/applications', {
        scholarship_id: scholarshipId,
        ...data,
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to apply for scholarship');
      }
      throw error;
    }
  },

  async getUserApplications(userId: string): Promise<Application[]> {
    try {
      const response = await api.get<ApiResponse<Application[]>>(`/applications/user/${userId}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch applications');
      }
      throw error;
    }
  },
};

// Export individual services for convenience
export const authService = {
  register: apiService.register,
  login: apiService.login,
  getCurrentUser: apiService.getCurrentUser,
};

export const scholarshipService = {
  getAll: apiService.getAll,
  getById: apiService.getById,
};

export const applicationService = {
  apply: apiService.apply,
  getUserApplications: apiService.getUserApplications,
};

export default api; 