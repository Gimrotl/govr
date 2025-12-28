import React from 'react';
import { Menu, User, LogOut, LogIn, MessageSquare, ShoppingBag, PlusCircle, Car, Bell, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useModals } from '../hooks/useModals';
import { useMessages } from '../hooks/useMessages';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageToggle } from './LanguageToggle';

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const { openModal } = useModals();
  const { unreadCount } = useMessages();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-bold text-white drop-shadow-lg">Word</a>
            <div className="hidden sm:flex">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => openModal('chat')}
              className="flex items-center text-white px-4 py-1.5 border border-white/50 rounded-full hover:bg-white/10 hover:border-white transition duration-200 backdrop-blur-sm"
            >
              <MessageSquare size={16} className="mr-1.5" />
              <span className="text-sm font-medium">{t('chat')}</span>
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  alert(t('onlyRegisteredUsers'));
                  openModal('login');
                  return;
                }
                openModal('offerRide');
              }}
              className="flex items-center text-white px-4 py-1.5 border border-white/50 rounded-full hover:bg-white/10 hover:border-white transition duration-200 backdrop-blur-sm"
            >
              <PlusCircle size={16} className="mr-1.5" />
              <span className="text-sm font-medium">{t('offerRide')}</span>
            </button>

            {isLoggedIn && (
              <>
                <button
                  onClick={() => openModal('myRides')}
                  className="flex items-center text-white px-4 py-1.5 border border-white/50 rounded-full hover:bg-white/10 hover:border-white transition duration-200 backdrop-blur-sm"
                >
                  <Car size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">{t('myRides')}</span>
                </button>
                <button
                  onClick={() => openModal('messages')}
                  className="flex items-center text-white px-4 py-1.5 border border-white/50 rounded-full hover:bg-white/10 hover:border-white transition duration-200 backdrop-blur-sm relative"
                >
                  <MessageSquare size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">{t('messages')}</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => openModal('profile')}
                  className="flex items-center text-white px-4 py-1.5 border border-white/50 rounded-full hover:bg-white/10 hover:border-white transition duration-200 backdrop-blur-sm"
                >
                  <User size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">{t('profile')}</span>
                </button>
              </>
            )}

            <button
              onClick={isLoggedIn ? logout : () => openModal('login')}
              className="flex items-center text-white px-4 py-1.5 border border-white/50 rounded-full hover:bg-white/10 hover:border-white transition duration-200 backdrop-blur-sm"
            >
              {isLoggedIn ? (
                <>
                  <LogOut size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">{t('logout')}</span>
                </>
              ) : (
                <>
                  <LogIn size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">{t('login')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2">
              <LanguageToggle />
            </div>
            <hr className="border-gray-600 my-2" />
            <button
              onClick={() => {
                openModal('chat');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
            >
              {t('chat')}
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  alert(t('onlyRegisteredUsers'));
                  openModal('login');
                  setIsMenuOpen(false);
                  return;
                }
                openModal('offerRide');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
            >
              {t('offerRide')}
            </button>
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    openModal('myRides');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
                >
                  {t('myRides')}
                </button>
                <button
                  onClick={() => {
                    openModal('messages');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600 relative"
                >
                  {t('messages')}
                  {unreadCount > 0 && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    openModal('profile');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
                >
                  {t('profile')}
                </button>
              </>
            )}
            <button
              onClick={() => {
                isLoggedIn ? logout() : openModal('login');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
            >
              {isLoggedIn ? t('logout') : t('login')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};