'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, TestTube } from 'lucide-react'

export default function ResearchGrants() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedField, setSelectedField] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')

  const fields = ['all', 'Science', 'Technology', 'Medicine', 'Social Sciences', 'Environmental']
  const durations = ['all', '1 year', '2 years', '3 years', 'Long-term']

  const grants = [
    {
      id: 1,
      title: 'Climate Change Impact Study',
      institution: 'African Climate Institute',
      field: 'Environmental',
      duration: '2 years',
      location: 'Nigeria',
      description: 'Research funding for climate change impact studies in Africa.',
      requirements: ['PhD degree', 'Research proposal', 'Team collaboration'],
      deadline: '2024-05-20',
      amount: '$50,000/year',
      link: '#'
    },
    {
      id: 2,
      title: 'AI in Healthcare Research',
      institution: 'Tech Health Foundation',
      field: 'Technology',
      duration: '3 years',
      location: 'Kenya',
      description: 'Research grant for AI applications in healthcare delivery.',
      requirements: ['Computer Science background', 'Healthcare experience', 'Research team'],
      deadline: '2024-06-15',
      amount: '$75,000/year',
      link: '#'
    },
    {
      id: 3,
      title: 'Sustainable Agriculture Study',
      institution: 'Agricultural Research Center',
      field: 'Science',
      duration: '2 years',
      location: 'Ethiopia',
      description: 'Research on sustainable farming practices in arid regions.',
      requirements: ['Agricultural science degree', 'Field experience', 'Local partnerships'],
      deadline: '2024-05-30',
      amount: '$40,000/year',
      link: '#'
    },
    {
      id: 4,
      title: 'Public Health Policy Research',
      institution: 'Health Policy Institute',
      field: 'Social Sciences',
      duration: '1 year',
      location: 'South Africa',
      description: 'Research on healthcare policy implementation in rural areas.',
      requirements: ['Public health background', 'Policy analysis experience', 'Community engagement'],
      deadline: '2024-06-20',
      amount: '$30,000/year',
      link: '#'
    }
  ]

  const filteredGrants = grants.filter(grant => {
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grant.institution.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesField = selectedField === 'all' || grant.field === selectedField
    const matchesDuration = selectedDuration === 'all' || grant.duration === selectedDuration
    return matchesSearch && matchesField && matchesDuration
  })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Research Grants
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Find funding opportunities for your research projects
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search grants..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

        {/* Grant Listings */}
        <div className="space-y-6">
          {filteredGrants.map((grant) => (
            <div key={grant.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {grant.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{grant.institution}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <TestTube className="h-4 w-4 mr-1" />
                      {grant.field}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {grant.location}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">{grant.description}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {grant.requirements.map((req, index) => (
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
                    {grant.amount}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(grant.deadline).toLocaleDateString()}
                    </span>
                    <a
                      href={grant.link}
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