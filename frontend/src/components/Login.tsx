import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../services/api';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login(email, password);
      console.log('Login response:', response); // Debug log
      
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center gap-2"
        >

        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:text-orange-400">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;