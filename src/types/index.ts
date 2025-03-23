export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Scholarship {
  id: string;
  title: string;
  description: string;
  organization: string;
  amount: number;
  deadline: string;
  requirements: string;
  benefits: string;
  location: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  scholarship_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  scholarship?: Scholarship;
  user?: User;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
} 