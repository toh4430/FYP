import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { register } from '../../services/api';
import { Loader2 } from 'lucide-react';
import { AxiosError } from 'axios';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'An error occurred during registration');
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
        <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
              minLength={6}
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
                Creating account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-400">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

