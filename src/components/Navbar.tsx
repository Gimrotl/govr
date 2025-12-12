import React from 'react';
import { Menu, User, LogOut, LogIn, MessageSquare, ShoppingBag, PlusCircle, Car, Bell, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useModals } from '../hooks/useModals';
import { useMessages } from '../hooks/useMessages';

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  const { openModal } = useModals();
  const { unreadCount } = useMessages();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-slate-800/80 backdrop-blur-md text-white shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Word</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-cyan-400 hover:text-cyan-300 focus:outline-none transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => openModal('chat')}
              className="flex items-center text-slate-300 hover:text-cyan-400 transition-all duration-200 hover:scale-105"
            >
              <MessageSquare size={18} className="mr-1" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  alert('Nur registrierte Benutzer können Fahrten anbieten. Bitte melden Sie sich an.');
                  openModal('login');
                  return;
                }
                openModal('offerRide');
              }}
              className="flex items-center text-slate-300 hover:text-cyan-400 transition-all duration-200 hover:scale-105"
            >
              <PlusCircle size={18} className="mr-1" />
              <span>Offer a Ride</span>
            </button>
            
            {isLoggedIn && (
              <>
                <button
                  onClick={() => openModal('myRides')}
                  className="flex items-center text-slate-300 hover:text-cyan-400 transition-all duration-200 hover:scale-105"
                >
                  <Car size={18} className="mr-1" />
                  <span>My Rides</span>
                </button>
                <button
                  onClick={() => openModal('messages')}
                  className="flex items-center text-slate-300 hover:text-cyan-400 transition-all duration-200 hover:scale-105 relative"
                >
                  <MessageSquare size={18} className="mr-1" />
                  <span>Messages</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => openModal('profile')}
                  className="flex items-center text-slate-300 hover:text-cyan-400 transition-all duration-200 hover:scale-105"
                >
                  <User size={18} className="mr-1" />
                  <span>Profile</span>
                </button>
              </>
            )}

            <button
              onClick={isLoggedIn ? logout : () => openModal('login')}
              className="flex items-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {isLoggedIn ? (
                <>
                  <LogOut size={18} className="mr-1" />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <LogIn size={18} className="mr-1" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                openModal('chat');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-lg hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
            >
              Chat
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  alert('Nur registrierte Benutzer können Fahrten anbieten. Bitte melden Sie sich an.');
                  openModal('login');
                  setIsMenuOpen(false);
                  return;
                }
                openModal('offerRide');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-lg hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
            >
              Offer a Ride
            </button>
            {isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    openModal('myRides');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-lg hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
                >
                  My Rides
                </button>
                <button
                  onClick={() => {
                    openModal('messages');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-lg hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all relative"
                >
                  Messages
                  {unreadCount > 0 && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    openModal('profile');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-lg hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
                >
                  Profile
                </button>
              </>
            )}
            <button
              onClick={() => {
                isLoggedIn ? logout() : openModal('login');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white transition-all mt-2"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};