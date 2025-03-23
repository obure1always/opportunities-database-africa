import dotenv from 'dotenv';
// Load environment variables first
dotenv.config();

import express from 'express';
import cors from 'cors';
import scholarshipsRouter from './routes/scholarships';
import authRouter from './routes/auth';
import applicationsRouter from './routes/applications';

// Initialize Express app
const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Root API route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Opportunities Database API',
    version: '1.0.0',
    endpoints: {
      scholarships: '/api/scholarships',
      auth: '/api/auth',
      applications: '/api/applications'
    }
  });
});

// Routes
app.use('/api/scholarships', scholarshipsRouter);
app.use('/api/auth', authRouter);
app.use('/api/applications', applicationsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 