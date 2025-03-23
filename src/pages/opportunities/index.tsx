import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Scholarship } from '../../types';
import { scholarshipService } from '../../services/api';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiTag, FiAward, FiBookOpen, FiBriefcase, FiStar, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

// Featured scholarships data
const featuredScholarships = [
  {
    id: 'mastercard-1',
    title: "Mastercard Foundation Scholars Program",
    description: "Full scholarship for African students to pursue undergraduate and graduate studies at top universities worldwide.",
    amount: 50000,
    deadline: "2024-05-30",
    category: "Academic",
    location: "Global",
    organization: "Mastercard Foundation",
    applicationUrl: "https://mastercardfdn.org/all/scholars/becoming-a-scholar/apply/",
    featured: true,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'chevening-1',
    title: "Chevening Scholarships",
    description: "Fully-funded scholarships for outstanding professionals to pursue a one-year master's degree in the UK.",
    amount: 45000,
    deadline: "2024-11-01",
    category: "Academic",
    location: "United Kingdom",
    organization: "UK Government",
    applicationUrl: "https://www.chevening.org/scholarships/",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'fulbright-1',
    title: "Fulbright Foreign Student Program",
    description: "Prestigious scholarships for graduate studies, research, and teaching in the United States.",
    amount: 40000,
    deadline: "2024-06-15",
    category: "Academic",
    location: "United States",
    organization: "Fulbright",
    applicationUrl: "https://foreign.fulbrightonline.org/",
    featured: true,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'gates-1',
    title: "Gates Cambridge Scholarship",
    description: "Full-cost scholarship for outstanding international students to pursue postgraduate studies at the University of Cambridge.",
    amount: 55000,
    deadline: "2024-10-11",
    category: "Academic",
    location: "United Kingdom",
    organization: "Gates Cambridge Trust",
    applicationUrl: "https://www.gatescambridge.org/apply/",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'rhodes-1',
    title: "Rhodes Scholarship",
    description: "World's oldest and most prestigious international scholarship program for postgraduate studies at the University of Oxford.",
    amount: 60000,
    deadline: "2024-08-01",
    category: "Academic",
    location: "United Kingdom",
    organization: "Rhodes Trust",
    applicationUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/apply/",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'aauw-1',
    title: "AAUW International Fellowships",
    description: "Fellowships for women pursuing full-time graduate or postdoctoral studies in the United States.",
    amount: 35000,
    deadline: "2024-11-15",
    category: "Academic",
    location: "United States",
    organization: "American Association of University Women",
    applicationUrl: "https://www.aauw.org/resources/programs/fellowships-grants/current-opportunities/international/",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'erasmus-1',
    title: "Erasmus+ Scholarships",
    description: "EU-funded program supporting education, training, youth, and sport in Europe.",
    amount: 30000,
    deadline: "2024-03-15",
    category: "Academic",
    location: "Europe",
    organization: "European Commission",
    applicationUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'daad-1',
    title: "DAAD Scholarships",
    description: "German Academic Exchange Service scholarships for international students to study in Germany.",
    amount: 40000,
    deadline: "2024-10-31",
    category: "Academic",
    location: "Germany",
    organization: "DAAD",
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'monbukagakusho-1',
    title: "MEXT Japanese Government Scholarship",
    description: "Japanese government scholarships for international students to study in Japan.",
    amount: 35000,
    deadline: "2024-05-15",
    category: "Academic",
    location: "Japan",
    organization: "Japanese Government",
    applicationUrl: "https://www.studyinjapan.go.jp/en/smap_stopj-students_e.html",
    featured: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export default function OpportunitiesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: '',
  });

  const categories = [
    'Academic',
    'Athletic',
    'Arts',
    'STEM',
    'Business',
    'Community Service',
    'Leadership',
    'Military',
    'Minority',
    'Need-Based',
    'Merit-Based',
    'International',
  ];

  const locations = [
    'North America',
    'Europe',
    'Asia',
    'Africa',
    'South America',
    'Oceania',
    'Global',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchScholarships();
    }, 300); // Debounce the API call

    return () => clearTimeout(timer);
  }, [page, filters.category, filters.location, filters.search]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scholarshipService.getAll(page, 12, {
        category: filters.category || undefined,
        location: filters.location || undefined,
        search: filters.search || undefined
      });
      console.log('API Response:', response); // Debug log
      if (response && response.data) {
        setScholarships(response.data);
        setTotalPages(response.total_pages || 1);
      } else {
        setScholarships([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching scholarships:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch scholarships');
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleApply = (scholarshipId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    router.push(`/opportunities/${scholarshipId}/apply`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic':
        return <FiBookOpen className="w-5 h-5" />;
      case 'athletic':
        return <FiAward className="w-5 h-5" />;
      case 'stem':
        return <FiBriefcase className="w-5 h-5" />;
      default:
        return <FiTag className="w-5 h-5" />;
    }
  };

  const ScholarshipCard = ({ scholarship }: { scholarship: Scholarship }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-square p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(scholarship.category)}
            <span className="text-sm font-medium text-indigo-600">{scholarship.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">{scholarship.location}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{scholarship.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{scholarship.description}</p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Amount:</span>
            <span className="font-semibold text-indigo-600">${scholarship.amount?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Deadline:</span>
            <span className="font-semibold text-gray-900">
              {new Date(scholarship.deadline).toLocaleDateString()}
            </span>
          </div>
          <button
            onClick={() => handleApply(scholarship.id)}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );

  const FeaturedScholarshipCard = ({ scholarship }: { scholarship: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ aspectRatio: '1' }}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${scholarship.image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      
      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FiStar className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Featured Scholarship</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 line-clamp-2">{scholarship.title}</h3>
          <p className="text-gray-200 text-sm mb-4 line-clamp-3">{scholarship.description}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-gray-400">Amount</span>
              <span className="font-semibold">${scholarship.amount?.toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-gray-400">Deadline</span>
              <span className="font-semibold">
                {new Date(scholarship.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <a
            href={scholarship.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-white text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium group"
          >
            Apply Now
            <FiExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Scholarship Opportunities</h1>
            <p className="text-xl text-gray-600">Discover and apply for scholarships that match your goals</p>
          </div>

          {/* Featured Scholarships Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Scholarships</h2>
              <div className="flex items-center text-indigo-600">
                <FiStar className="w-5 h-5 mr-2" />
                <span className="font-medium">Top Opportunities</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredScholarships.map((scholarship) => (
                <FeaturedScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          </div>

          {/* Existing search form */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gradient-to-b from-gray-50 to-white text-lg font-medium text-gray-900">
                All Scholarships
              </span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                ))}
              </div>

              {scholarships.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
} 