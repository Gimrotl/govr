import React from 'react';
import { Shield } from 'lucide-react';
import { useModals } from '../hooks/useModals';
import { useAuth } from '../hooks/useAuth';

export const Footer: React.FC = () => {
  const { openModal } = useModals();
  const { isAdmin } = useAuth();
  
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center space-y-4 md:space-y-0">
          <div className="text-left">
            {isAdmin ? (
              <button
                onClick={() => openModal('adminDashboard')}
                className="flex items-center text-slate-500 hover:text-cyan-600 transition duration-200 text-xs font-medium"
              >
                <Shield size={14} className="mr-1.5" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={() => openModal('adminLogin')}
                className="flex items-center text-slate-500 hover:text-cyan-600 transition duration-200 text-xs font-medium"
              >
                <Shield size={14} className="mr-1.5" />
                <span>Admin</span>
              </button>
            )}
          </div>

          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Word
            <span className="mx-2 text-slate-400">·</span>
            <button
              onClick={() => openModal('terms')}
              className="text-cyan-600 hover:text-cyan-700 transition duration-200 font-medium"
            >
              Terms of Service
            </button>
          </p>

          <div className="text-xs text-slate-500 font-medium">Caucasus RideShare Network</div>
        </div>
      </div>
    </footer>
  );
};