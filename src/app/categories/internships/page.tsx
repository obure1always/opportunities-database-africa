'use client'

import { useState } from 'react'
import { Search, MapPin, Briefcase, Clock } from 'lucide-react'

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')

  const locations = ['all', 'Remote', 'On-site', 'Hybrid']
  const durations = ['all', 'Part-time', 'Full-time', 'Contract']

  const internships = [
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      duration: 'Full-time',
      description: 'Join our development team to work on cutting-edge web applications.',
      requirements: ['React', 'TypeScript', 'Node.js'],
      deadline: '2024-04-30',
      stipend: '$500/month',
      link: '#'
    },
    {
      id: 2,
      title: 'Marketing Intern',
      company: 'Digital Marketing Agency',
      location: 'Hybrid',
      duration: 'Part-time',
      description: 'Help create and manage social media campaigns for our clients.',
      requirements: ['Social Media', 'Content Creation', 'Analytics'],
      deadline: '2024-05-15',
      stipend: '$400/month',
      link: '#'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'AI Research Lab',
      location: 'On-site',
      duration: 'Full-time',
      description: 'Work on machine learning projects and data analysis.',
      requirements: ['Python', 'Machine Learning', 'Data Analysis'],
      deadline: '2024-04-20',
      stipend: '$600/month',
      link: '#'
    }
  ]

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === 'all' || internship.location === selectedLocation
    const matchesDuration = selectedDuration === 'all' || internship.duration === selectedDuration
    return matchesSearch && matchesLocation && matchesDuration
  })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Internship Opportunities
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect internship to kickstart your career
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
                placeholder="Search internships..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration === 'all' ? 'All Durations' : duration}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Internship Listings */}
        <div className="space-y-6">
          {filteredInternships.map((internship) => (
            <div key={internship.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {internship.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{internship.company}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {internship.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {internship.duration}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">{internship.description}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {internship.requirements.map((req, index) => (
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
                    <Briefcase className="h-4 w-4 mr-1" />
                    {internship.stipend}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(internship.deadline).toLocaleDateString()}
                    </span>
                    <a
                      href={internship.link}
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