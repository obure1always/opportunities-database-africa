import express from 'express';
import { supabase } from '../index';
import { auth, adminAuth, AuthRequest } from '../middleware/auth';
import { Application } from '../types';

const router = express.Router();

// Get all applications
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get applications by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', req.params.userId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ error: 'Failed to fetch user applications' });
  }
});

// Submit a new application
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Update application status
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Get all applications (Admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const { data: applications, error } = await supabase
      .from('applications')
      .select(`
        *,
        scholarships (
          title,
          organization
        ),
        users (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

export default router; 