import express from 'express';
import { supabase } from '../index';
import { auth, adminAuth, AuthRequest } from '../middleware/auth';
import { Application } from '../types';

const router = express.Router();

// Get user's applications
router.get('/user/:userId', auth, async (req: AuthRequest, res) => {
  try {
    const { data: applications, error } = await supabase
      .from('applications')
      .select(`
        *,
        scholarships (
          title,
          organization,
          deadline
        )
      `)
      .eq('user_id', req.params.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Apply for a scholarship
router.post('/:scholarshipId', auth, async (req: AuthRequest, res) => {
  try {
    const { scholarshipId } = req.params;
    const userId = req.user!.id;

    // Check if scholarship exists
    const { data: scholarship, error: scholarshipError } = await supabase
      .from('scholarships')
      .select('deadline')
      .eq('id', scholarshipId)
      .single();

    if (scholarshipError || !scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    // Check if deadline has passed
    if (new Date(scholarship.deadline) < new Date()) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }

    // Check if user has already applied
    const { data: existingApplication, error: existingError } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', userId)
      .eq('scholarship_id', scholarshipId)
      .single();

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this scholarship' });
    }

    // Create application
    const { data: application, error } = await supabase
      .from('applications')
      .insert([
        {
          user_id: userId,
          scholarship_id: scholarshipId,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

// Update application status (Admin only)
router.put('/:id/status', adminAuth, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const { data: application, error } = await supabase
      .from('applications')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Error updating application status' });
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