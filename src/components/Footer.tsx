import React from 'react';
import { Shield } from 'lucide-react';
import { useModals } from '../hooks/useModals';
import { useAuth } from '../hooks/useAuth';

export const Footer: React.FC = () => {
  const { openModal } = useModals();
  const { isAdmin } = useAuth();
  
  return (
    <footer className="bg-slate-800/80 backdrop-blur-md text-white py-6 mt-auto border-t border-slate-700">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-between items-center">
          <div className="text-left">
            {isAdmin ? (
              <button
                onClick={() => openModal('adminDashboard')}
                className="flex items-center text-slate-400 hover:text-cyan-400 transition-all duration-200 text-xs hover:scale-105"
              >
                <Shield size={12} className="mr-1" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                onClick={() => openModal('adminLogin')}
                className="flex items-center text-slate-400 hover:text-cyan-400 transition-all duration-200 text-xs hover:scale-105"
              >
                <Shield size={12} className="mr-1" />
                <span>Admin</span>
              </button>
            )}
          </div>

          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent font-semibold">Word</span>{' '}
            <button
              onClick={() => openModal('terms')}
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-all duration-200"
            >
              Terms of Service
            </button>
          </p>

          <div className="w-16"></div>
        </div>
      </div>
    </footer>
  );
};