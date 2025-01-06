import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Tradescape</Link>
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <span className="text-white mr-4">Welcome, {user?.name}</span>
              <Link to="/dashboard" className="text-white mr-4 hover:text-gray-300">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4 hover:text-gray-300">Login</Link>
              <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;