import express from 'express';
import { body } from 'express-validator';
import { supabase } from '../config/supabase';
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

// Get all scholarships with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const { category, location, search } = req.query;

    let query = supabase
      .from('scholarships')
      .select('*', { count: 'exact' });

    // Apply filters only if the columns exist
    try {
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      if (location && location !== 'All') {
        query = query.eq('location', location);
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }
    } catch (filterError) {
      console.warn('Filter error:', filterError);
      // Continue without filters if columns don't exist
    }

    // Get total count
    const { count } = await query;
    const totalPages = Math.ceil((count || 0) / limit);

    // Get paginated data
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Add default values for missing columns
    const scholarships = (data || []).map(scholarship => ({
      ...scholarship,
      category: scholarship.category || 'Academic',
      location: scholarship.location || 'Global',
      benefits: scholarship.benefits || 'Standard benefits package',
      eligibility: scholarship.eligibility || 'Open to all eligible candidates'
    }));

    res.json({
      data: scholarships,
      total: count || 0,
      page,
      limit,
      totalPages,
    });
  } catch (error: any) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ 
      error: 'Failed to fetch scholarships',
      details: error.message || 'Unknown error'
    });
  }
});

// Get a single scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    // Add default values for missing columns
    const scholarship = {
      ...data,
      category: data.category || 'Academic',
      location: data.location || 'Global',
      benefits: data.benefits || 'Standard benefits package',
      eligibility: data.eligibility || 'Open to all eligible candidates'
    };

    res.json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ error: 'Failed to fetch scholarship' });
  }
});

// Create a new scholarship
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating scholarship:', error);
    res.status(500).json({ error: 'Failed to create scholarship' });
  }
});

// Update a scholarship
router.put('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('scholarships')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating scholarship:', error);
    res.status(500).json({ error: 'Failed to update scholarship' });
  }
});

// Delete a scholarship
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('scholarships')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ error: 'Failed to delete scholarship' });
  }
});

export default router; 