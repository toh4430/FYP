import React from 'react'
import { Search, Plus, FileText } from 'lucide-react'
import Layout from '../components/Layout'

export default function Storage() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-[#1C1C1C] rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Bucket</h2>
              <div className="flex space-x-2">
                <button className="bg-transparent border border-orange-500 text-orange-500 p-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300">
                  <Search size={20} />
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                  <Plus size={20} className="mr-2" />
                  New Bucket
                </button>
              </div>
            </div>
            <p className="text-gray-400">No buckets found</p>
          </div>
          <div className="bg-[#1C1C1C] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Files</h2>
            <p className="text-gray-400">Open a bucket to view files.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#1C1C1C] rounded-lg p-6">
          <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
            <FileText size={48} className="text-white" />
          </div>
          <p className="text-xl font-semibold text-white">Select a file</p>
        </div>
      </div>
    </Layout>
  )
}