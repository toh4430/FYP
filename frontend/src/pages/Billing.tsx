import React from 'react'
import { Plus } from 'lucide-react'
import Layout from '../components/Layout'

export default function Billing() {
  return (
    <Layout>
      <div className="space-y-12">
        <section>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4 text-white">Billing breakdown</h2>
              <button className="bg-[#2C2C2C] text-white px-4 py-2 rounded-full text-sm mb-4">
                Current Billing Cycle
              </button>
            </div>
            <div className="lg:w-2/3 space-y-4">
              <div className="bg-[#2C2C2C] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Current Month Cost</h3>
                <div className="bg-[#3C3C3C] h-24 w-1/3 rounded-lg"></div>
              </div>
              <div className="bg-[#2C2C2C] rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Description</span>
                  <span className="text-gray-400">Amount</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#3C3C3C] h-6 rounded"></div>
                  <div className="bg-[#3C3C3C] h-6 rounded"></div>
                  <div className="bg-[#3C3C3C] h-6 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Payment method</h2>
              <p className="text-gray-400 max-w-2xl">
                After adding a payment method, make sure to <br/> mark it as active to use it for billing. You can <br/> remove unused cards.
              </p>
            </div>
            <button className="bg-transparent border border-orange-500 text-orange-500 px-4 py-2 rounded-lg flex items-center hover:bg-orange-500 hover:text-white transition-colors duration-300">
              <Plus size={20} className="mr-2" />
              Add payment method
            </button>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold mb-2 text-white">Invoices</h2>
            <p className="text-gray-400">
              Previous and current invoices that are paid or waiting to be paid.
            </p>
          </div>
          <div className="lg:w-2/3">
            <div className="bg-[#2C2C2C] rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 mb-2">
                <span className="text-gray-400">Date</span>
                <span className="text-gray-400">Amount due</span>
                <span className="text-gray-400">Invoice number</span>
                <span className="text-gray-400">Status</span>
              </div>
              <div className="space-y-2">
                <div className="bg-[#3C3C3C] h-6 rounded"></div>
                <div className="bg-[#3C3C3C] h-6 rounded"></div>
                <div className="bg-[#3C3C3C] h-6 rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}