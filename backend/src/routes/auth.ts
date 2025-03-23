import express from 'express';
import { supabase } from '../config/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', { email: req.body.email, name: req.body.name });
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      console.log('Missing required fields:', { email: !!email, password: !!password, name: !!name });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (checkError) {
      console.log('Error checking existing user:', checkError);
      if (checkError.code !== 'PGRST116') {
        throw checkError;
      }
    }

    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          full_name: name,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.log('Error inserting user:', insertError);
      throw insertError;
    }

    console.log('User created successfully:', { id: user.id, email: user.email });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password_hash: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to register user',
      details: error.details || 'No additional details available'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', { email: req.body.email });
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      console.log('Error fetching user:', userError);
      if (userError.code === 'PGRST116') {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      throw userError;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User logged in successfully:', { id: user.id, email: user.email });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password_hash: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to login',
      details: error.details || 'No additional details available'
    });
  }
});

export default router; 