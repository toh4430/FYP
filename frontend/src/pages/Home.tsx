import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-bold mb-6 text-white">Welcome to Tradescape Cloud</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Empower your trading strategies with our cutting-edge cloud platform. 
          Deploy, analyze, and optimize your algorithms with ease.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            title="Instance Management" 
            description="Deploy and manage your trading bots effortlessly."
            link="/dashboard"
          />
          <FeatureCard 
            title="Backtest Analysis" 
            description="Analyze your strategies with comprehensive reports."
            link="/analyzer"
          />
          <FeatureCard 
            title="Strategy Composer" 
            description="Build and customize your trading algorithms."
            link="/composer"
          />
        </div>
        <Link 
          to="/dashboard" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300"
        >
          Get Started
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
    </Layout>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  link: string
}

function FeatureCard({ title, description, link }: FeatureCardProps) {
  return (
    <Link to={link} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </Link>
  )
}