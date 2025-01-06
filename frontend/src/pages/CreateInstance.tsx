'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ChevronDown } from 'lucide-react'
import Layout from '../components/Layout'
import { createInstance, CreateInstanceParams } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

interface FormState {
  name: string;
  image: string;
  type: string;
  region: string;
  botFiles: File[];
}

export default function CreateInstance() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [newInstance, setNewInstance] = useState<FormState>({
    name: '',
    image: 'python',
    type: '',
    region: 'singapore',
    botFiles: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateInstance = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const instanceParams: CreateInstanceParams = {
        name: newInstance.name,
        type: newInstance.type,
        region: newInstance.region,
        botFiles: newInstance.botFiles
      }

      await createInstance(instanceParams)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating instance:', error)
      setError(error instanceof Error ? error.message : 'Failed to create instance. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewInstance({ ...newInstance, botFiles: Array.from(e.target.files) })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewInstance(prev => ({ ...prev, [name]: value }))
  }

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-medium text-white mb-6">Create instance</h1>
        
        <form onSubmit={handleCreateInstance} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name of your instance"
              className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              value={newInstance.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm text-gray-400 mb-2">Image</label>
            <div className="relative">
              <select
                id="image"
                name="image"
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-white appearance-none focus:outline-none focus:border-orange-500"
                value={newInstance.image}
                onChange={handleInputChange}
              >
                <option value="python">python</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm text-gray-400 mb-2">Region</label>
            <div className="relative">
              <select
                id="region"
                name="region"
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-white appearance-none focus:outline-none focus:border-orange-500"
                value={newInstance.region}
                onChange={handleInputChange}
                disabled
              >
                <option value="singapore">singapore</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm text-gray-400 mb-2">Instance Type</label>
            <div className="relative">
              <select
                id="type"
                name="type"
                className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-white appearance-none focus:outline-none focus:border-orange-500"
                value={newInstance.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an instance type</option>
                <option value="basic">Basic (t2.micro)</option>
                <option value="standard">Standard (t2.small)</option>
                <option value="premium">Premium (t2.medium)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="botFiles" className="block text-sm text-gray-400 mb-2">Object</label>
            <input
              id="botFiles"
              name="botFiles"
              type="file"
              onChange={handleFileChange}
              multiple
              className="w-full bg-black/50 border border-gray-800 rounded-lg px-3 py-2 text-gray-400
                file:mr-4 file:py-1 file:px-3
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-transparent file:text-gray-400
                hover:file:text-white"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full bg-black/50 border border-gray-800 text-gray-400 rounded-lg px-3 py-2 flex justify-between items-center hover:text-white transition-colors"
          >
            Advanced
            <ChevronDown className={`h-4 w-4 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-4">
              {/* Add advanced options here if needed */}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              Create <Plus className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

