import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from main .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleScholarships = [
  {
    title: "African Leadership Academy Scholarship",
    organization: "African Leadership Academy",
    description: "Full scholarship for outstanding African students to attend the African Leadership Academy.",
    amount: 50000,
    deadline: "2024-12-31",
    category: "Academic",
    location: "South Africa",
    benefits: "Full tuition, accommodation, meals, and travel expenses",
    eligibility: "African students aged 15-19 with outstanding academic records and leadership potential"
  },
  {
    title: "Mastercard Foundation Scholars Program",
    organization: "Mastercard Foundation",
    description: "Comprehensive scholarship program for academically talented young Africans.",
    amount: 75000,
    deadline: "2024-11-30",
    category: "Academic",
    location: "Multiple African Countries",
    benefits: "Full tuition, accommodation, meals, books, and travel expenses",
    eligibility: "African students with demonstrated academic excellence and leadership potential"
  },
  {
    title: "African Women in Technology Scholarship",
    organization: "African Women in Tech",
    description: "Scholarship program supporting African women pursuing technology degrees.",
    amount: 25000,
    deadline: "2024-10-15",
    category: "Technology",
    location: "Pan-African",
    benefits: "Tuition support, mentorship, and internship opportunities",
    eligibility: "African women pursuing technology-related degrees"
  },
  {
    title: "Agribusiness Innovation Grant",
    organization: "African Agricultural Foundation",
    description: "Grant for innovative agricultural projects in Africa.",
    amount: 50000,
    deadline: "2024-09-30",
    category: "Business",
    location: "East Africa",
    benefits: "Funding, mentorship, and access to agricultural networks",
    eligibility: "African entrepreneurs with innovative agricultural solutions"
  },
  {
    title: "Healthcare Leadership Fellowship",
    organization: "African Healthcare Initiative",
    description: "Fellowship program for healthcare professionals in Africa.",
    amount: 35000,
    deadline: "2024-08-31",
    category: "Healthcare",
    location: "West Africa",
    benefits: "Training, mentorship, and networking opportunities",
    eligibility: "Healthcare professionals with 3+ years of experience"
  }
];

async function seedScholarships() {
  try {
    console.log('Starting to seed scholarships...');
    
    // First, check if we can connect to the database
    const { data: testData, error: testError } = await supabase
      .from('scholarships')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('Error connecting to database:', testError);
      process.exit(1);
    }

    // Insert scholarships
    const { data, error } = await supabase
      .from('scholarships')
      .insert(sampleScholarships)
      .select();

    if (error) {
      console.error('Error seeding scholarships:', error);
      process.exit(1);
    }

    console.log('Successfully seeded scholarships:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedScholarships();