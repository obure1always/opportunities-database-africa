import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import Features from '../components/Features';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiMapPin, FiBookOpen } from 'react-icons/fi';

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>African Opportunities Database - Find Scholarships and Jobs</title>
        <meta name="description" content="Discover educational and professional opportunities across Africa. Access scholarships, internships, and job opportunities." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-purple-700/50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Path to Success
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Access thousands of scholarships, internships, and job opportunities across Africa.
              Your future starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/opportunities">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors duration-200"
                >
                  Explore Opportunities
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors duration-200"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-indigo-100">Active Opportunities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-indigo-100">African Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-indigo-100">Successful Applicants</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Find Your Perfect Opportunity
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Search through our comprehensive database of opportunities across Africa
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center gap-2">
                  Search
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students and professionals who have found their path to success through our platform.
            </p>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors duration-200 mx-auto"
              >
                Create Your Account
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 