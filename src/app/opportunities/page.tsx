'use client'

import React from 'react'

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = React.useState('scholarships')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedLocation, setSelectedLocation] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')

  // Sample opportunities data
  const opportunities = {
    scholarships: [
      {
        id: 1,
        title: "DAAD Scholarship for African Students",
        organization: "DAAD Germany",
        location: "Germany",
        category: "Masters/PhD",
        deadline: "2024-06-30",
        benefits: "Full tuition, Monthly stipend (861 euros), Health insurance, Travel costs, Research grants",
        eligibility: "Bachelor's degree with above average results, Not more than 6 years of work experience",
        description: "The DAAD scholarship program offers opportunities for postgraduate studies in Germany across all fields of study."
      },
      {
        id: 2,
        title: "Mastercard Foundation Scholars Program",
        organization: "University of Cape Town",
        location: "South Africa",
        category: "Undergraduate/Masters",
        deadline: "2024-07-15",
        benefits: "Full tuition, Accommodation, Living expenses, Laptop, Books, Career development support",
        eligibility: "Academic excellence, Demonstrated financial need, Leadership potential",
        description: "Full scholarships for young Africans who show academic talent and leadership potential."
      },
      {
        id: 3,
        title: "Chevening Scholarship",
        organization: "UK Government",
        location: "United Kingdom",
        category: "Masters",
        deadline: "2024-11-01",
        benefits: "Full tuition, Living expenses, Return flights, Networking opportunities",
        eligibility: "2+ years work experience, Bachelor's degree, Leadership qualities",
        description: "UK government's flagship scholarship programme for future leaders."
      },
      {
        id: 4,
        title: "Orange Knowledge Programme",
        organization: "Netherlands Government",
        location: "Netherlands",
        category: "Masters",
        deadline: "2024-07-30",
        benefits: "Full tuition, Living allowance, Insurance, Travel costs, Study materials",
        eligibility: "2+ years relevant work experience, Employer's recommendation",
        description: "Comprehensive scholarship for professionals seeking advanced education in the Netherlands."
      },
      {
        id: 5,
        title: "Australia Awards Scholarships",
        organization: "Australian Government",
        location: "Australia",
        category: "Masters/PhD",
        deadline: "2024-08-30",
        benefits: "Full tuition, Living allowance, Travel costs, Health insurance, Research support",
        eligibility: "Minimum 2 years work experience, Strong academic background",
        description: "Prestigious international scholarships funded by the Australian Government."
      }
    ],
    internships: [
      {
        id: 1,
        title: "Software Engineering Internship",
        organization: "Microsoft Africa",
        location: "Nigeria",
        category: "Technology",
        deadline: "2024-04-30",
        benefits: "Competitive salary, Mentorship, Housing allowance, Transportation",
        eligibility: "Computer Science students, Strong coding skills, Problem-solving ability",
        description: "12-week internship program for aspiring software engineers."
      },
      {
        id: 2,
        title: "Business Development Intern",
        organization: "African Development Bank",
        location: "Côte d'Ivoire",
        category: "Business",
        deadline: "2024-05-15",
        benefits: "Monthly stipend, Professional development, Networking opportunities",
        eligibility: "Business/Economics students, Fluent in English/French",
        description: "6-month internship focused on development finance and business strategy."
      },
      {
        id: 3,
        title: "Research Intern - Climate Change",
        organization: "UN Environment Programme",
        location: "Kenya",
        category: "Environment",
        deadline: "2024-06-01",
        benefits: "Monthly allowance, Training opportunities, International exposure",
        eligibility: "Environmental Science background, Research skills",
        description: "Support climate change research and policy development initiatives."
      },
      {
        id: 4,
        title: "Data Science Intern",
        organization: "IBM Research Africa",
        location: "Kenya",
        category: "Technology",
        deadline: "2024-07-01",
        benefits: "Competitive pay, Mentorship, Project ownership, Networking",
        eligibility: "Statistics/Computer Science background, Python/R proficiency",
        description: "Work on cutting-edge AI and data science projects in Africa."
      },
      {
        id: 5,
        title: "Marketing & Communications Intern",
        organization: "Safaricom",
        location: "Kenya",
        category: "Marketing",
        deadline: "2024-05-30",
        benefits: "Monthly stipend, Skills development, Real project experience",
        eligibility: "Marketing/Communications students, Creative mindset",
        description: "Gain hands-on experience in digital marketing and communications."
      }
    ],
    exchangePrograms: [
      {
        id: 1,
        title: "Africa-EU Youth Exchange",
        organization: "European Union",
        location: "Multiple EU Countries",
        category: "Cultural Exchange",
        deadline: "2024-07-30",
        benefits: "Travel costs, Accommodation, Cultural activities, Language training",
        eligibility: "Age 18-30, Leadership potential, Cultural awareness",
        description: "3-month exchange program promoting intercultural understanding."
      },
      {
        id: 2,
        title: "AIESEC Global Volunteer",
        organization: "AIESEC",
        location: "Various Countries",
        category: "Volunteering",
        deadline: "2024-08-15",
        benefits: "Cultural immersion, Leadership development, Global network",
        eligibility: "University students/recent graduates, Passion for social impact",
        description: "6-8 week international volunteer opportunities for youth development."
      },
      {
        id: 3,
        title: "Japan-Africa Exchange Program",
        organization: "JICA",
        location: "Japan",
        category: "Professional Development",
        deadline: "2024-09-01",
        benefits: "Full funding, Training, Cultural experiences, Professional networking",
        eligibility: "Young professionals, Public sector experience",
        description: "Professional exchange program with Japanese institutions."
      },
      {
        id: 4,
        title: "Young African Leaders Initiative",
        organization: "US State Department",
        location: "United States",
        category: "Leadership",
        deadline: "2024-08-30",
        benefits: "Full funding, Leadership training, Networking, Alumni community",
        eligibility: "Age 25-35, Demonstrated leadership experience",
        description: "6-week leadership development program in the United States."
      },
      {
        id: 5,
        title: "Commonwealth Professional Fellowship",
        organization: "Commonwealth",
        location: "United Kingdom",
        category: "Professional Development",
        deadline: "2024-10-15",
        benefits: "Living allowance, Travel, Training, Professional development",
        eligibility: "Mid-career professionals, Commonwealth country citizenship",
        description: "Professional development and knowledge exchange program."
      }
    ],
    researchGrants: [
      {
        id: 1,
        title: "Climate Change Research Grant",
        organization: "African Climate Foundation",
        location: "Pan-African",
        category: "Environmental Research",
        deadline: "2024-06-15",
        benefits: "Research funding up to $50,000, Equipment, Conference attendance",
        eligibility: "PhD holders, Research proposal required, African institution affiliation",
        description: "Supporting innovative climate change research in Africa."
      },
      {
        id: 2,
        title: "Health Innovation Research Grant",
        organization: "Africa CDC",
        location: "Multiple Countries",
        category: "Healthcare",
        deadline: "2024-07-01",
        benefits: "Project funding, Research support, Equipment, Publication support",
        eligibility: "Healthcare researchers, Innovative projects, Ethics approval",
        description: "Funding for healthcare innovation research and development."
      },
      {
        id: 3,
        title: "Technology Development Grant",
        organization: "African Development Bank",
        location: "Africa-wide",
        category: "Technology",
        deadline: "2024-08-30",
        benefits: "Funding up to $100,000, Mentorship, Technical support",
        eligibility: "Tech innovators, Prototype required, Business plan",
        description: "Supporting technology innovation projects across Africa."
      },
      {
        id: 4,
        title: "Agricultural Research Grant",
        organization: "AGRA",
        location: "East Africa",
        category: "Agriculture",
        deadline: "2024-09-15",
        benefits: "Research funding, Field support, Equipment, Training",
        eligibility: "Agricultural researchers, Field trial experience",
        description: "Supporting research in sustainable agriculture and food security."
      },
      {
        id: 5,
        title: "Social Sciences Research Grant",
        organization: "CODESRIA",
        location: "Africa-wide",
        category: "Social Sciences",
        deadline: "2024-07-30",
        benefits: "Research funding, Publication support, Conference participation",
        eligibility: "Social science researchers, African institutions",
        description: "Supporting social science research in Africa."
      }
    ]
  }

  const categoryDescriptions = {
    scholarships: "Access a wide range of fully-funded scholarships from leading institutions worldwide. These opportunities cover tuition, living expenses, and more.",
    internships: "Gain valuable work experience with top companies and organizations. Build your career with hands-on professional development.",
    exchangePrograms: "Broaden your horizons through international exchange opportunities. Experience new cultures and develop global perspectives.",
    researchGrants: "Access substantial funding for your research projects and academic pursuits. Advance knowledge in your field with dedicated support."
  }

  const filteredOpportunities = opportunities[activeTab as keyof typeof opportunities].filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !selectedLocation || opp.location === selectedLocation
    const matchesCategory = !selectedCategory || opp.category === selectedCategory
    return matchesSearch && matchesLocation && matchesCategory
  })

  const locations = Array.from(new Set(opportunities[activeTab as keyof typeof opportunities].map(opp => opp.location)))
  const categories = Array.from(new Set(opportunities[activeTab as keyof typeof opportunities].map(opp => opp.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Discover Your Next</span>
            <span className="block text-blue-600">Opportunity</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore a curated selection of opportunities to advance your education, career, and research goals.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex justify-center space-x-8">
              {Object.entries(categoryDescriptions).map(([key, description]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                    ${activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200
                  `}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600">{categoryDescriptions[activeTab as keyof typeof categoryDescriptions]}</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{opportunity.title}</h3>
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    {opportunity.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{opportunity.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="line-clamp-1">{opportunity.organization}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Deadline: {opportunity.deadline}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Benefits:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{opportunity.benefits}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">Eligibility:</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{opportunity.eligibility}</p>
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center">
                  <span>Apply Now</span>
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 