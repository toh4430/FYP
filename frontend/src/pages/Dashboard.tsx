import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, RefreshCw, Play, Square, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import { getInstances, updateInstance, deleteInstance, startInstance, stopInstance } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

interface Instance {
  _id: string;
  name: string;
  status: 'running' | 'stopped' | 'terminated';
  region: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publicDnsName?: string;
}

export default function Dashboard() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      fetchInstances();
    }
  }, [isAuthenticated, navigate]);

  const fetchInstances = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getInstances();
      setInstances(response.data);
    } catch (error) {
      console.error('Error fetching instances:', error);
      setError('Failed to fetch instances. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshInstances = () => {
    fetchInstances();
  };

  const handleInstanceAction = async (id: string, action: 'stop' | 'start' | 'terminate' | 'delete') => {
    setIsLoading(true);
    setError(null);
    try {
      if (action === 'delete') {
        await deleteInstance(id);
        setInstances(instances.filter(instance => instance._id !== id));
      } else if (action === 'stop' || action === 'start') {
        const updatedInstance = action === 'stop' 
          ? await stopInstance(id)
          : await startInstance(id);
        setInstances(instances.map(instance =>
          instance._id === id ? updatedInstance.data : instance
        ));
      } else {
        const updatedInstance = await updateInstance(id, { status: 'terminated' });
        setInstances(instances.map(instance =>
          instance._id === id ? updatedInstance.data : instance
        ));
      }
    } catch (error) {
      console.error(`Error ${action}ing instance:`, error);
      setError(`Failed to ${action} instance. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="bg-black bg-opacity-80 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Instances</h2> 
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/create-instance')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm flex items-center justify-center transition-colors duration-300"
            >
              Create <Plus size={16} className="ml-2" />
            </button>
            <button 
              onClick={refreshInstances}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded text-sm flex items-center justify-center transition-colors duration-300"
            >
              Refresh <RefreshCw size={16} className="ml-2" />
            </button>
          </div>  
        </div>

        {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instance Type</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Public DNS</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated at</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {instances.length === 0 ? (
                  <tr>
                    <td className="py-4 px-6 text-sm text-gray-300" colSpan={8}>
                      No instances found.
                    </td>
                  </tr>
                ) : (
                  instances.map((instance) => (
                    <tr key={instance._id} className="border-b border-gray-700">
                      <td className="py-4 px-6 text-sm text-gray-300">{instance.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          instance.status === 'running' ? 'bg-green-100 text-green-800' :
                          instance.status === 'stopped' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {instance.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-300">{instance.region}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{instance.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{instance.publicDnsName || 'N/A'}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{new Date(instance.createdAt).toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">{new Date(instance.updatedAt).toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm text-gray-300">
                        {instance.status === 'running' && (
                          <button
                            onClick={() => handleInstanceAction(instance._id, 'stop')}
                            className="text-yellow-500 hover:text-yellow-600 mr-2"
                            title="Stop"
                          >
                            <Square size={16} />
                          </button>
                        )}
                        {instance.status === 'stopped' && (
                          <button
                            onClick={() => handleInstanceAction(instance._id, 'start')}
                            className="text-green-500 hover:text-green-600 mr-2"
                            title="Start"
                          >
                            <Play size={16} />
                          </button>
                        )}
                        {instance.status !== 'terminated' && (
                          <button
                            onClick={() => handleInstanceAction(instance._id, 'terminate')}
                            className="text-red-500 hover:text-red-600 mr-2"
                            title="Terminate"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        {instance.status === 'terminated' && (
                          <button
                            onClick={() => handleInstanceAction(instance._id, 'delete')}
                            className="text-red-500 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}