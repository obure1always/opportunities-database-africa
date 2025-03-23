export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  location: string;
  category: string;
  deadline: string;
  benefits: string;
  eligibility: string;
  description: string;
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
}

export interface AuthRequest extends Request {
  user?: User;
} 