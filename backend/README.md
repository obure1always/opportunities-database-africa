# Opportunities Database Africa - Backend API

This is the backend API for the Opportunities Database Africa project, built with Express.js, TypeScript, and Supabase.

## Features

- User authentication (registration and login)
- JWT-based authorization
- Scholarship management (CRUD operations)
- Application management
- Role-based access control (Admin/User)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project
- PostgreSQL database (provided by Supabase)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
PORT=3001
NODE_ENV=development
```

4. Set up the Supabase database tables:

```sql
-- Users table
create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null,
  full_name text not null,
  role text not null default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Scholarships table
create table scholarships (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  organization text not null,
  location text not null,
  category text not null,
  deadline timestamp with time zone not null,
  benefits text not null,
  eligibility text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Applications table
create table applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) not null,
  scholarship_id uuid references scholarships(id) not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

5. Start the development server:
```bash
npm run dev
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

#### POST /api/auth/login
Login user.

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

### Scholarship Endpoints

#### GET /api/scholarships
Get all scholarships.

Response:
```json
[
  {
    "id": "uuid",
    "title": "Scholarship Title",
    "organization": "Organization Name",
    "location": "Location",
    "category": "Category",
    "deadline": "2024-12-31T23:59:59Z",
    "benefits": "Scholarship benefits",
    "eligibility": "Eligibility criteria",
    "description": "Scholarship description"
  }
]
```

#### POST /api/scholarships
Create a new scholarship (Admin only).

Request body:
```json
{
  "title": "Scholarship Title",
  "organization": "Organization Name",
  "location": "Location",
  "category": "Category",
  "deadline": "2024-12-31T23:59:59Z",
  "benefits": "Scholarship benefits",
  "eligibility": "Eligibility criteria",
  "description": "Scholarship description"
}
```

### Application Endpoints

#### POST /api/applications/:scholarshipId
Apply for a scholarship.

Response:
```json
{
  "message": "Application submitted successfully",
  "application": {
    "id": "uuid",
    "user_id": "uuid",
    "scholarship_id": "uuid",
    "status": "pending"
  }
}
```

#### GET /api/applications/user/:userId
Get user's applications.

Response:
```json
[
  {
    "id": "uuid",
    "user_id": "uuid",
    "scholarship_id": "uuid",
    "status": "pending",
    "scholarships": {
      "title": "Scholarship Title",
      "organization": "Organization Name",
      "deadline": "2024-12-31T23:59:59Z"
    }
  }
]
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Role-based access control for admin operations
- Input validation using express-validator
- CORS enabled for frontend integration

## Deployment

The API can be deployed to Vercel or Railway.app. Make sure to:

1. Set up environment variables in your deployment platform
2. Configure CORS settings for your frontend domain
3. Set up proper database backups
4. Enable SSL/TLS for secure communication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 