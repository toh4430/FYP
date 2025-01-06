import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '.././contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Composer from './pages/Composer';
import Billing from './pages/Billing';
import Storage from './pages/Storage';
import CreateInstance from './pages/CreateInstance';


const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/create-instance" element={<PrivateRoute element={<CreateInstance />} />} />
          <Route path="/analyzer" element={<PrivateRoute element={<Analyzer />} />} />
          <Route path="/composer" element={<PrivateRoute element={<Composer />} />} />
          <Route path="/billing" element={<PrivateRoute element={<Billing />} />} />
          <Route path="/storage" element={<PrivateRoute element={<Storage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;