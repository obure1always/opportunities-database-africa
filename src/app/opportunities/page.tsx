'use client'

import { useState } from 'react'
import type { FC } from 'react'

const OpportunitiesPage: FC = () => {
  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [organization, setOrganization] = useState('')
  const [location, setLocation] = useState('')
  const [deadline, setDeadline] = useState('')
  const [benefits, setBenefits] = useState('')
  const [eligibility, setEligibility] = useState('')

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState('')

  // Sample scholarships data
  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      title: "DAAD Scholarship for African Students",
      organization: "DAAD Germany",
      location: "Germany",
      degreeLevel: "Masters/PhD",
      deadline: "2024-06-30",
      benefits: "Full tuition, Monthly stipend, Health insurance, Travel costs",
      eligibility: "Bachelor's degree with above average results, Not more than 6 years of work experience",
      description: "The DAAD scholarship program offers opportunities for postgraduate studies in Germany. The scholarship is available for various fields of study."
    },
    {
      id: 2,
      title: "Mastercard Foundation Scholars Program",
      organization: "University of Cape Town",
      location: "South Africa",
      degreeLevel: "Bachelors/Masters",
      deadline: "2024-07-15",
      benefits: "Full tuition, Accommodation, Living expenses, Laptop, Books",
      eligibility: "Academic excellence, Demonstrated financial need, Leadership potential",
      description: "The Mastercard Foundation Scholars Program provides full scholarships to young Africans who show academic talent and leadership potential."
    },
    {
      id: 3,
      title: "Chevening Scholarship",
      organization: "UK Government",
      location: "United Kingdom",
      degreeLevel: "Masters",
      deadline: "2024-11-01",
      benefits: "Full tuition, Living expenses, Return flights, Thesis grant",
      eligibility: "2+ years work experience, Bachelor's degree, Strong leadership qualities",
      description: "Chevening is the UK government's global scholarship programme that offers future leaders the opportunity to study in the UK."
    },
    {
      id: 4,
      title: "Australia Awards Scholarships",
      organization: "Australian Government",
      location: "Australia",
      degreeLevel: "Masters/PhD",
      deadline: "2024-08-30",
      benefits: "Full tuition, Living allowance, Travel costs, Health insurance",
      eligibility: "Minimum 2 years work experience, Strong academic background",
      description: "Australia Awards Scholarships are long-term development awards administered by the Department of Foreign Affairs and Trade."
    },
    {
      id: 5,
      title: "Erasmus Mundus Joint Masters",
      organization: "European Union",
      location: "Europe",
      degreeLevel: "Masters",
      deadline: "2024-09-15",
      benefits: "Full tuition, Monthly allowance, Travel and installation costs",
      eligibility: "Excellence academic record, Bachelor's degree, Language proficiency",
      description: "Erasmus Mundus Joint Masters are high-level and integrated study programmes at master level."
    },
    {
      id: 6,
      title: "Orange Knowledge Programme",
      organization: "Netherlands Government",
      location: "Netherlands",
      degreeLevel: "Masters",
      deadline: "2024-07-30",
      benefits: "Full tuition, Living allowance, Insurance, Travel costs",
      eligibility: "2+ years relevant work experience, Employer's recommendation",
      description: "The Orange Knowledge Programme offers fully-funded scholarships for various master's programmes in the Netherlands."
    },
    {
      id: 7,
      title: "Swedish Institute Scholarships",
      organization: "Swedish Institute",
      location: "Sweden",
      degreeLevel: "Masters",
      deadline: "2024-05-15",
      benefits: "Full tuition, Living expenses, Travel grant, Insurance",
      eligibility: "Bachelor's degree, Work experience, Leadership experience",
      description: "The Swedish Institute Scholarships for Global Professionals programme offers full funding for master's studies in Sweden."
    },
    {
      id: 8,
      title: "Commonwealth Shared Scholarships",
      organization: "UK Universities",
      location: "United Kingdom",
      degreeLevel: "Masters",
      deadline: "2024-08-01",
      benefits: "Full tuition, Living allowance, Travel costs, Thesis grant",
      eligibility: "First degree with minimum upper second class, Resident in Commonwealth country",
      description: "Commonwealth Shared Scholarships are for candidates from least developed Commonwealth countries for full-time Master's study."
    },
    {
      id: 9,
      title: "MEXT Scholarship",
      organization: "Japanese Government",
      location: "Japan",
      degreeLevel: "Masters/PhD",
      deadline: "2024-06-15",
      benefits: "Full tuition, Monthly allowance, Round-trip flight ticket",
      eligibility: "Bachelor's degree, Under 35 years old, Language proficiency",
      description: "The MEXT Scholarship Program offers fully-funded scholarships to international students who wish to study in graduate courses at Japanese universities."
    },
    {
      id: 10,
      title: "Fulbright Foreign Student Program",
      organization: "US Government",
      location: "United States",
      degreeLevel: "Masters/PhD",
      deadline: "2024-07-01",
      benefits: "Full tuition, Living stipend, Health insurance, Travel costs",
      eligibility: "Bachelor's degree, Strong academic background, English proficiency",
      description: "The Fulbright Foreign Student Program enables graduate students to pursue full-time study in the United States."
    },
    {
      id: 11,
      title: "Korea Global Scholarship",
      organization: "Korean Government",
      location: "South Korea",
      degreeLevel: "Masters/PhD",
      deadline: "2024-08-15",
      benefits: "Full tuition, Monthly stipend, Settlement allowance, Language training",
      eligibility: "Bachelor's degree, Under 40 years old, Good health",
      description: "The Korean Government Scholarship Program offers full funding for graduate studies at Korean universities."
    },
    {
      id: 12,
      title: "Gates Cambridge Scholarship",
      organization: "University of Cambridge",
      location: "United Kingdom",
      degreeLevel: "Masters/PhD",
      deadline: "2024-10-15",
      benefits: "Full tuition, Living allowance, Travel costs, Family allowance",
      eligibility: "Outstanding academic achievement, Leadership potential",
      description: "The Gates Cambridge Scholarship programme offers full-cost scholarships to outstanding applicants from countries outside the UK."
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add new scholarship to the list
    const newScholarship = {
      id: scholarships.length + 1,
      title,
      organization,
      location,
      degreeLevel: selectedDegreeLevel,
      deadline,
      benefits,
      eligibility,
      description
    }
    setScholarships([...scholarships, newScholarship])
    
    // Reset form
    setTitle('')
    setDescription('')
    setOrganization('')
    setLocation('')
    setDeadline('')
    setBenefits('')
    setEligibility('')
  }

  // Filter scholarships based on search and filters
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !selectedLocation || scholarship.location === selectedLocation
    const matchesDegreeLevel = !selectedDegreeLevel || scholarship.degreeLevel.includes(selectedDegreeLevel)
    return matchesSearch && matchesLocation && matchesDegreeLevel
  })

  // Get unique locations for filter
  const locations = Array.from(new Set(scholarships.map(s => s.location)))

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Fully Funded Scholarships</h1>

      {/* Create Scholarship Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Scholarship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Benefits</label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Eligibility</label>
            <textarea
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Scholarship
          </button>
        </form>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <select
            value={selectedDegreeLevel}
            onChange={(e) => setSelectedDegreeLevel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Degree Levels</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
      </div>

      {/* Scholarships List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((scholarship) => (
          <div key={scholarship.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{scholarship.title}</h3>
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {scholarship.degreeLevel}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{scholarship.organization}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{scholarship.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Deadline: {scholarship.deadline}</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700">Benefits:</h4>
                  <p className="text-gray-600">{scholarship.benefits}</p>
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold text-gray-700">Eligibility:</h4>
                  <p className="text-gray-600">{scholarship.eligibility}</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OpportunitiesPage 