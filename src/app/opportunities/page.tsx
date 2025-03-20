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
  const { data: opportunities, isLoading } = trpc.opportunity.getAll.useQuery({
    published: true,
  })

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Opportunities</h1>
      
      {/* Create Opportunity Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Opportunity
        </button>
      </form>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities?.map((opportunity) => (
          <div
            key={opportunity.id}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{opportunity.title}</h2>
            <p className="text-gray-600 mb-4">{opportunity.description}</p>
            <div className="text-sm text-gray-500">
              <p>Company: {opportunity.company}</p>
              <p>Location: {opportunity.location}</p>
              <p>Type: {opportunity.type}</p>
              <p>Category: {opportunity.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 