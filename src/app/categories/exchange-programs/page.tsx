'use client'

import { useState } from 'react'
import { Search, Globe, MapPin, Calendar } from 'lucide-react'

export default function ExchangePrograms() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')

  const regions = ['all', 'North America', 'Europe', 'Asia', 'Africa']
  const durations = ['all', 'Semester', 'Year', 'Summer', 'Short-term']

  const programs = [
    {
      id: 1,
      title: 'European University Exchange Program',
      institution: 'European University Network',
      region: 'Europe',
      duration: 'Semester',
      location: 'Germany',
      description: 'Study abroad opportunity at top European universities with focus on STEM fields.',
      requirements: ['GPA 3.5+', 'Language proficiency', 'Valid passport'],
      deadline: '2024-06-01',
      funding: 'Partial funding available',
      link: '#'
    },
    {
      id: 2,
      title: 'North American Cultural Exchange',
      institution: 'American Universities Consortium',
      region: 'North America',
      duration: 'Year',
      location: 'United States',
      description: 'Full-year exchange program focusing on cultural immersion and academic excellence.',
      requirements: ['GPA 3.0+', 'TOEFL/IELTS', 'Academic references'],
      deadline: '2024-05-15',
      funding: 'Full tuition + Living expenses',
      link: '#'
    },
    {
      id: 3,
      title: 'Asian Business Exchange',
      institution: 'Asian Business School Network',
      region: 'Asia',
      duration: 'Summer',
      location: 'Singapore',
      description: 'Intensive summer program in Asian business practices and entrepreneurship.',
      requirements: ['Business background', 'English proficiency', 'CV'],
      deadline: '2024-04-30',
      funding: 'Program fees covered',
      link: '#'
    },
    {
      id: 4,
      title: 'African Leadership Exchange',
      institution: 'Pan-African University Network',
      region: 'Africa',
      duration: 'Short-term',
      location: 'South Africa',
      description: 'Leadership development program across multiple African countries.',
      requirements: ['Leadership experience', 'Community involvement', 'Interview'],
      deadline: '2024-05-20',
      funding: 'Full program costs covered',
      link: '#'
    }
  ]

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.institution.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === 'all' || program.region === selectedRegion
    const matchesDuration = selectedDuration === 'all' || program.duration === selectedDuration
    return matchesSearch && matchesRegion && matchesDuration
  })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Exchange Programs
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover study abroad opportunities across different regions
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
                placeholder="Search programs..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
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

        {/* Program Listings */}
        <div className="space-y-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {program.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{program.institution}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="h-4 w-4 mr-1" />
                      {program.region}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {program.location}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">{program.description}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {program.requirements.map((req, index) => (
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
                    {program.funding}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(program.deadline).toLocaleDateString()}
                    </span>
                    <a
                      href={program.link}
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