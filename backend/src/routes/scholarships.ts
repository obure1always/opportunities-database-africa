import express from 'express';
import { body } from 'express-validator';
import { supabase } from '../index';
import { auth, adminAuth, AuthRequest } from '../middleware/auth';
import { Scholarship } from '../types';

const router = express.Router();

// Validation middleware
const scholarshipValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('organization').notEmpty().withMessage('Organization is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('deadline').notEmpty().withMessage('Deadline is required'),
  body('benefits').notEmpty().withMessage('Benefits are required'),
  body('eligibility').notEmpty().withMessage('Eligibility criteria are required'),
  body('description').notEmpty().withMessage('Description is required'),
];

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const { data: scholarships, error } = await supabase
      .from('scholarships')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships' });
  }
});

// Get single scholarship
router.get('/:id', async (req, res) => {
  try {
    const { data: scholarship, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ message: 'Error fetching scholarship' });
  }
});

// Add new scholarship (Admin only)
router.post('/', adminAuth, scholarshipValidation, async (req, res) => {
  try {
    const scholarshipData = {
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: scholarship, error } = await supabase
      .from('scholarships')
      .insert([scholarshipData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: 'Scholarship created successfully',
      scholarship,
    });
  } catch (error) {
    console.error('Error creating scholarship:', error);
    res.status(500).json({ message: 'Error creating scholarship' });
  }
});

// Update scholarship (Admin only)
router.put('/:id', adminAuth, scholarshipValidation, async (req, res) => {
  try {
    const scholarshipData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    const { data: scholarship, error } = await supabase
      .from('scholarships')
      .update(scholarshipData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.json({
      message: 'Scholarship updated successfully',
      scholarship,
    });
  } catch (error) {
    console.error('Error updating scholarship:', error);
    res.status(500).json({ message: 'Error updating scholarship' });
  }
});

// Delete scholarship (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('scholarships')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ message: 'Error deleting scholarship' });
  }
});

export default router; 