import React, { useState } from 'react';
import { X, Shield, User, Lock } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useAuth } from '../../hooks/useAuth';

export const AdminLoginModal: React.FC = () => {
  const { closeModal, openModal } = useModals();
  const { adminLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      alert('Bitte geben Sie Benutzername und Passwort ein.');
      return;
    }
    
    // Simple admin validation (in real app, this would be secure)
    // Aktuelle Anmeldedaten: Benutzername: admin, Passwort: password123
    if (credentials.username === 'admin' && credentials.password === 'password123') {
      adminLogin();
      closeModal('adminLogin');
      openModal('adminDashboard');
    } else {
      alert('Ungültige Anmeldedaten. Nur autorisierte Administratoren dürfen sich anmelden.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Shield size={24} className="text-sky-500 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Admin Login</h2>
          </div>
          <button
            onClick={() => closeModal('adminLogin')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Benutzername
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="admin-username"
                name="username"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="Admin Username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="admin-password"
                name="password"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="Passwort"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition duration-200 font-medium"
          >
            Anmelden
          </button>
        </form>
        
        <p className="mt-4 text-sm text-gray-600 text-center">
          Nur autorisierte Administratoren dürfen sich anmelden.
        </p>
      </div>
    </div>
  );
};