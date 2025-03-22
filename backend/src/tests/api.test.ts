import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = `http://localhost:${process.env.PORT || 3001}/api`;
let authToken: string;
let userId: string;
let scholarshipId: string;

describe('API Tests', () => {
  // Test user registration
  test('Register new user', async () => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: 'test@example.com',
      password: 'password123',
      full_name: 'Test User',
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('user');
    authToken = response.data.token;
    userId = response.data.user.id;
  });

  // Test user login
  test('Login user', async () => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  // Test creating a scholarship (requires admin token)
  test('Create scholarship', async () => {
    const response = await axios.post(
      `${API_URL}/scholarships`,
      {
        title: 'Test Scholarship',
        organization: 'Test Organization',
        location: 'Test Location',
        category: 'Test Category',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        benefits: 'Test Benefits',
        eligibility: 'Test Eligibility',
        description: 'Test Description',
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('scholarship');
    scholarshipId = response.data.scholarship.id;
  });

  // Test getting all scholarships
  test('Get all scholarships', async () => {
    const response = await axios.get(`${API_URL}/scholarships`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  // Test applying for a scholarship
  test('Apply for scholarship', async () => {
    const response = await axios.post(
      `${API_URL}/applications/${scholarshipId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('application');
  });

  // Test getting user's applications
  test('Get user applications', async () => {
    const response = await axios.get(`${API_URL}/applications/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });
}); 