'use client'

import { useState } from 'react'
import { 
  Search, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  TestTube,
  MapPin, 
  Calendar 
} from 'lucide-react'
import Link from 'next/link'

export default function Opportunities() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Opportunities', icon: Briefcase },
    { id: 'scholarships', name: 'Scholarships', icon: GraduationCap },
    { id: 'internships', name: 'Internships', icon: Briefcase },
    { id: 'exchange-programs', name: 'Exchange Programs', icon: Globe },
    { id: 'research-grants', name: 'Research Grants', icon: TestTube }
  ]

  const featuredOpportunities = [
    {
      id: 1,
      title: 'Software Engineering Internship',
      category: 'internships',
      company: 'Tech Solutions Africa',
      location: 'South Africa',
      type: 'Full-time',
      duration: '6 months',
      description: 'Join our dynamic team of software engineers and work on cutting-edge projects.',
      requirements: ['Computer Science degree', 'React experience', 'Git knowledge'],
      deadline: '2024-04-30',
      stipend: '$1,500/month',
      link: '/categories/internships'
    },
    {
      id: 2,
      title: 'Master\'s Scholarship in Business',
      category: 'scholarships',
      company: 'African Business School',
      location: 'Kenya',
      type: 'Full-time',
      duration: '2 years',
      description: 'Full scholarship for outstanding students pursuing an MBA degree.',
      requirements: ['Bachelor\'s degree', 'GMAT score', 'Work experience'],
      deadline: '2024-05-15',
      stipend: 'Full tuition + $1,000/month',
      link: '/categories/scholarships'
    },
    {
      id: 3,
      title: 'Exchange Program in Europe',
      category: 'exchange-programs',
      company: 'European University Network',
      location: 'Germany',
      type: 'Full-time',
      duration: '1 semester',
      description: 'Study abroad opportunity at top European universities.',
      requirements: ['GPA 3.5+', 'Language proficiency', 'Valid passport'],
      deadline: '2024-06-01',
      stipend: 'Partial funding available',
      link: '/categories/exchange-programs'
    },
    {
      id: 4,
      title: 'Climate Change Research Grant',
      category: 'research-grants',
      company: 'African Climate Institute',
      location: 'Nigeria',
      type: 'Full-time',
      duration: '2 years',
      description: 'Research funding for climate change impact studies in Africa.',
      requirements: ['PhD degree', 'Research proposal', 'Team collaboration'],
      deadline: '2024-05-20',
      stipend: '$50,000/year',
      link: '/categories/research-grants'
    },
    {
      id: 5,
      title: 'KNB Indonesian Government Scholarship',
      category: 'scholarships',
      company: 'Indonesian Ministry of Education',
      location: 'Indonesia',
      type: 'Full-time',
      duration: '4 years',
      description: 'Full scholarship for international students to study in Indonesia, covering tuition, living expenses, and round-trip airfare.',
      requirements: ['Bachelor\'s degree', 'TOEFL/IELTS', 'Age under 35', 'Research proposal'],
      deadline: '2024-05-15',
      stipend: 'Full tuition + Living expenses + Airfare',
      link: '/categories/scholarships'
    },
    {
      id: 6,
      title: 'MEXT Japanese Government Scholarship',
      category: 'scholarships',
      company: 'Japanese Ministry of Education',
      location: 'Japan',
      type: 'Full-time',
      duration: '5 years',
      description: 'Comprehensive scholarship for international students to pursue research studies in Japan.',
      requirements: ['Master\'s degree', 'Japanese/English proficiency', 'Research proposal', 'Health certificate'],
      deadline: '2024-05-30',
      stipend: '¥143,000/month + Tuition + Airfare',
      link: '/categories/scholarships'
    },
    {
      id: 7,
      title: 'Chevening UK Government Scholarship',
      category: 'scholarships',
      company: 'British Foreign Office',
      location: 'United Kingdom',
      type: 'Full-time',
      duration: '1 year',
      description: 'Prestigious scholarship for future leaders to pursue a master\'s degree in the UK.',
      requirements: ['Bachelor\'s degree', 'IELTS 6.5+', '2 years work experience', 'Leadership potential'],
      deadline: '2024-06-15',
      stipend: 'Full tuition + £18,000 living allowance + Airfare',
      link: '/categories/scholarships'
    },
    {
      id: 8,
      title: 'DAAD German Government Scholarship',
      category: 'scholarships',
      company: 'German Academic Exchange Service',
      location: 'Germany',
      type: 'Full-time',
      duration: '2 years',
      description: 'Scholarship for international students to pursue master\'s or PhD studies in Germany.',
      requirements: ['Bachelor\'s/Master\'s degree', 'German/English proficiency', 'Research proposal', 'Academic excellence'],
      deadline: '2024-06-30',
      stipend: '€850/month + Health insurance + Travel allowance',
      link: '/categories/scholarships'
    },
    {
      id: 9,
      title: 'Swedish Institute Scholarship',
      category: 'scholarships',
      company: 'Swedish Government',
      location: 'Sweden',
      type: 'Full-time',
      duration: '2 years',
      description: 'Scholarship for global professionals to pursue master\'s studies in Sweden.',
      requirements: ['Bachelor\'s degree', 'Work experience', 'Leadership experience', 'English proficiency'],
      deadline: '2024-05-20',
      stipend: 'Full tuition + SEK 10,000/month + Insurance + Airfare',
      link: '/categories/scholarships'
    },
    {
      id: 10,
      title: 'New Zealand Government Scholarship',
      category: 'scholarships',
      company: 'New Zealand Ministry of Foreign Affairs',
      location: 'New Zealand',
      type: 'Full-time',
      duration: '3 years',
      description: 'Scholarship for international students to pursue tertiary studies in New Zealand.',
      requirements: ['Bachelor\'s degree', 'IELTS 6.5+', 'Work experience', 'Development focus'],
      deadline: '2024-06-10',
      stipend: 'Full tuition + NZ$491/week + Travel + Insurance',
      link: '/categories/scholarships'
    }
  ]

  const filteredOpportunities = featuredOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Browse Opportunities
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover scholarships, internships, exchange programs, and research grants
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search opportunities..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className={`bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Icon className="h-8 w-8 mx-auto text-blue-600 mb-3" />
                <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
              </Link>
            )
          })}
        </div>

        {/* Featured Opportunities */}
        <div className="space-y-6">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {opportunity.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{opportunity.company}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {opportunity.duration}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">{opportunity.description}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {opportunity.requirements.map((req, index) => (
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
                    {opportunity.stipend}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    </span>
                    <Link
                      href={opportunity.link}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </Link>
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