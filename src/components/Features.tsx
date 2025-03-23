import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiBookOpen, 
  FiBriefcase, 
  FiGlobe, 
  FiUsers, 
  FiBell, 
  FiTarget,
  FiAward,
  FiTrendingUp,
  FiHeart
} from 'react-icons/fi';

const features = [
  {
    icon: FiBookOpen,
    title: 'Comprehensive Database',
    description: 'Access thousands of scholarships, internships, and job opportunities across Africa.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: FiBriefcase,
    title: 'Career Opportunities',
    description: 'Discover professional opportunities from leading companies and organizations.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: FiGlobe,
    title: 'Global Reach',
    description: 'Connect with opportunities across different African countries and beyond.',
    color: 'from-green-500 to-teal-600',
  },
  {
    icon: FiUsers,
    title: 'Community Support',
    description: 'Join a network of students and professionals sharing experiences and advice.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: FiBell,
    title: 'Smart Notifications',
    description: 'Get personalized alerts for opportunities matching your profile and interests.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: FiTarget,
    title: 'Tailored Matches',
    description: 'Find opportunities that perfectly align with your skills and aspirations.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: FiAward,
    title: 'Exclusive Programs',
    description: 'Access premium scholarships and programs not available elsewhere.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: FiTrendingUp,
    title: 'Career Growth',
    description: 'Track your progress and discover paths for professional development.',
    color: 'from-teal-500 to-cyan-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides comprehensive access to educational and professional opportunities across Africa.
            Join thousands of successful students and professionals who have found their path to success.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-2 text-indigo-600">
            <FiHeart className="w-5 h-5" />
            <span className="font-medium">Join our growing community of successful professionals</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 