import axios, { AxiosError, AxiosResponse } from 'axios';

interface ErrorResponse {
  message: string;
}

export interface Instance {
  _id: string;
  name: string;
  status: 'running' | 'stopped' | 'terminated';
  region: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  InstanceId: string;
  InstanceType: string;
  State: { Name: string };
  LaunchTime: string;
  PublicDnsName: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isSubscribed: boolean;
}

interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateInstanceParams {
  name: string;
  type: string;
  region: string;
  botFiles: File[];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error handling interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    throw new Error(error.response.data.message || 'An unexpected error occurred');
  }
);

// Instance related API calls
export const getInstances = () => api.get<Instance[]>('/instances');

export const createInstance = async (params: CreateInstanceParams): Promise<Instance> => {
  const { name, type, region, botFiles } = params;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('type', type);
  formData.append('region', region);
  
  // Append each file with the same field name 'botFiles'
  botFiles.forEach(file => {
    formData.append('botFiles', file);
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await api.post<Instance>('/instances', formData, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to create instance';
      console.error('Create instance error:', errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};


export const updateInstance = (id: string, data: { name?: string; status?: string }) => 
  api.put<Instance>(`/instances/${id}`, data);

export const deleteInstance = (id: string) => api.delete(`/instances/${id}`);

export const startInstance = (id: string) => api.post<Instance>(`/instances/${id}/start`);

export const stopInstance = (id: string) => api.post<Instance>(`/instances/${id}/stop`);

// Auth related API calls
export const login = (email: string, password: string) => 
  api.post<LoginResponse>('/auth/login', { email, password });

export const register = (data: { name: string; email: string; password: string }) => 
  api.post<LoginResponse>('/auth/register', data);

export const getProfile = () => api.get<User>('/auth/profile');

export default api;