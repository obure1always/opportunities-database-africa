import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Scholarship } from '../../../types';
import { scholarshipService, applicationService } from '../../../services/api';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';

export default function ApplyPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchScholarship();
    }
  }, [id]);

  const fetchScholarship = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scholarshipService.getById(id as string);
      setScholarship(data);
    } catch (err) {
      console.error('Error fetching scholarship:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch scholarship details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user || !scholarship) return;

    try {
      setApplying(true);
      setError(null);
      await applicationService.apply(scholarship.id, {
        user_id: user.id,
        scholarship_id: scholarship.id,
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error applying for scholarship:', err);
      setError(err instanceof Error ? err.message : 'Failed to apply for scholarship');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!scholarship) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Scholarship not found</h2>
              <p className="mt-2 text-gray-600">The scholarship you're looking for doesn't exist or has been removed.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
              >
                <FiArrowLeft className="mr-2" />
                Back to Scholarships
              </button>

              {success ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <FiCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                  <p className="text-gray-600 mb-6">
                    Your application for {scholarship.title} has been submitted successfully.
                  </p>
                  <button
                    onClick={() => router.push('/opportunities')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    View Other Scholarships
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">Apply for {scholarship.title}</h1>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Scholarship Details</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600 mb-2">{scholarship.description}</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Organization</p>
                            <p className="text-gray-900">{scholarship.organization}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Amount</p>
                            <p className="text-gray-900">${scholarship.amount?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Deadline</p>
                            <p className="text-gray-900">
                              {new Date(scholarship.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-gray-900">{scholarship.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Requirements</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600">{scholarship.eligibility}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-600">{scholarship.benefits}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => router.back()}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApply}
                      disabled={applying}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
                    >
                      {applying ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 