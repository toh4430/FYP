import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-orange-500 border-b-2 border-orange-500' : 'text-white'
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-800 to-black">
      <header className="px-48 pt-14 pb-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Tradescape Cloud</h1>
          <nav>
            <ul className="text-xl flex space-x-4 text-white items-center">
              <li><Link to="/home" className={`${isActive('/home')} hover:text-orange-500 transition-colors duration-300`}>Home</Link></li>
              <li><Link to="/dashboard" className={`${isActive('/dashboard')} hover:text-orange-500 transition-colors duration-300`}>Dashboard</Link></li>
              <li><Link to="/analyzer" className={`${isActive('/analyzer')} hover:text-orange-500 transition-colors duration-300`}>Analyzer</Link></li>
              <li><Link to="/storage" className={`${isActive('/storage')} hover:text-orange-500 transition-colors duration-300`}>Storage</Link></li>
              <li><Link to="/billing" className={`${isActive('/billing')} hover:text-orange-500 transition-colors duration-300`}>Billing</Link></li>
              <li><Link to="/composer" className={`${isActive('/composer')} hover:text-orange-500 transition-colors duration-300`}>Composer</Link></li>
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-orange-500 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className={`${isActive('/login')} hover:text-orange-500 transition-colors duration-300`}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow px-48 pb-8">
        <div className="bg-black bg-opacity-90 rounded-3xl min-h-[calc(90vh-12rem)] p-8 text-white mb-8">
          {children}
        </div>
      </main>

      <footer className="text-center text-white text-sm pb-4">
        <p>Copyright © 2024 KohBT Sdn Bhd</p>
        <div className="mt-2">
          <button className="mr-4 hover:text-orange-500 transition-colors duration-300">Terms of use</button>
          <button className="mr-4 hover:text-orange-500 transition-colors duration-300">Privacy Policy</button>
          <button className="hover:text-orange-500 transition-colors duration-300">Disclaimer</button>
        </div>
      </footer>
    </div>
  )
}