import React from 'react';
import { Shield } from 'lucide-react';
import { useModals } from '../hooks/useModals';
import { useAuth } from '../hooks/useAuth';

export const Footer: React.FC = () => {
  const { openModal } = useModals();
  const { isAdmin } = useAuth();
  
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-between items-center">
          <div className="text-left">
            {isAdmin ? (
              <button 
                onClick={() => openModal('adminDashboard')}
                className="flex items-center text-gray-400 hover:text-gray-300 transition duration-200 text-xs"
              >
                <Shield size={12} className="mr-1" />
                <span>Admin</span>
              </button>
            ) : (
              <button 
                onClick={() => openModal('adminLogin')}
                className="flex items-center text-gray-400 hover:text-gray-300 transition duration-200 text-xs"
              >
                <Shield size={22} className="mr-1" />
                <span>Admin</span>
              </button>
            )}
          </div>
          
          <p className="text-sm">
            © {new Date().getFullYear()} Word{' '}
            <button
              onClick={() => openModal('terms')}
              className="text-emerald-200 hover:underline transition duration-200"
            >
              Terms of Service
            </button>
          </p>
          
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>
      </div>
    </footer>
  );
};