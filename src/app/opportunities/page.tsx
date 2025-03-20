'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'

export default function OpportunitiesPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')

  // Query to fetch all opportunities
  const { data: opportunities, isLoading } = trpc.opportunity.getAll.useQuery()

  // Mutation to create a new opportunity
  const createOpportunity = trpc.opportunity.create.useMutation({
    onSuccess: () => {
      // Reset form
      setTitle('')
      setDescription('')
      setCompany('')
      setLocation('')
      setType('')
      setCategory('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createOpportunity.mutate({
      title,
      description,
      company,
      location,
      type,
      category,
      published: false,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Opportunities</h1>

      {/* Create Opportunity Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Create New Opportunity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Opportunity
        </button>
      </form>

      {/* Display Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities?.map((opportunity) => (
          <div
            key={opportunity.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
            <p className="text-gray-600 mb-4">{opportunity.company}</p>
            <p className="text-gray-500 mb-2">{opportunity.location}</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {opportunity.type}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {opportunity.category}
              </span>
            </div>
            <p className="text-gray-700">{opportunity.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 