'use client'

import { useState } from 'react'
import { Search, GraduationCap, MapPin, Calendar } from 'lucide-react'

export default function Scholarships() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedField, setSelectedField] = useState('all')

  const levels = ['all', 'Undergraduate', 'Masters', 'PhD']
  const fields = ['all', 'Engineering', 'Business', 'Arts', 'Science']

  const scholarships = [
    {
      id: 1,
      title: 'African Leadership Scholarship',
      institution: 'University of Cape Town',
      level: 'Masters',
      field: 'Business',
      location: 'South Africa',
      description: 'Full scholarship for outstanding African students pursuing a Master\'s degree in Business Administration.',
      requirements: ['Bachelor\'s degree', 'Minimum GPA 3.5', 'Leadership experience'],
      deadline: '2024-05-30',
      amount: 'Full tuition + living expenses',
      link: '#'
    },
    {
      id: 2,
      title: 'STEM Excellence Scholarship',
      institution: 'African University of Science and Technology',
      level: 'Undergraduate',
      field: 'Engineering',
      location: 'Nigeria',
      description: 'Scholarship for talented students pursuing degrees in Science, Technology, Engineering, and Mathematics.',
      requirements: ['High school diploma', 'Strong math background', 'Innovation project'],
      deadline: '2024-06-15',
      amount: 'Partial tuition + research funding',
      link: '#'
    },
    {
      id: 3,
      title: 'Research Excellence Fellowship',
      institution: 'University of Nairobi',
      level: 'PhD',
      field: 'Science',
      location: 'Kenya',
      description: 'Fellowship for doctoral students conducting groundbreaking research in scientific fields.',
      requirements: ['Master\'s degree', 'Research proposal', 'Academic publications'],
      deadline: '2024-04-20',
      amount: 'Full funding + research grant',
      link: '#'
    }
  ]

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.institution.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || scholarship.level === selectedLevel
    const matchesField = selectedField === 'all' || scholarship.field === selectedField
    return matchesSearch && matchesLevel && matchesField
  })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Scholarship Opportunities
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover funding opportunities for your academic journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search scholarships..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field === 'all' ? 'All Fields' : field}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarship Listings */}
        <div className="space-y-6">
          {filteredScholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {scholarship.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{scholarship.institution}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {scholarship.level}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {scholarship.location}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">{scholarship.description}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {scholarship.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {scholarship.amount}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                    <a
                      href={scholarship.link}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 