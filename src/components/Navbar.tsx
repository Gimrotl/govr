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
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-cyan-600">Word</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-600 hover:text-cyan-600 focus:outline-none transition"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => openModal('chat')}
              className="flex items-center text-slate-600 hover:text-cyan-600 transition px-3 py-2 rounded-lg hover:bg-cyan-50"
            >
              <MessageSquare size={16} className="mr-1.5" />
              <span className="text-sm font-medium">Chat</span>
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
              className="flex items-center text-slate-600 hover:text-cyan-600 transition px-3 py-2 rounded-lg hover:bg-cyan-50"
            >
              <PlusCircle size={16} className="mr-1.5" />
              <span className="text-sm font-medium">Offer Ride</span>
            </button>

            {isLoggedIn && (
              <>
                <button
                  onClick={() => openModal('myRides')}
                  className="flex items-center text-slate-600 hover:text-cyan-600 transition px-3 py-2 rounded-lg hover:bg-cyan-50"
                >
                  <Car size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">My Rides</span>
                </button>
                <button
                  onClick={() => openModal('messages')}
                  className="flex items-center text-slate-600 hover:text-cyan-600 transition px-3 py-2 rounded-lg hover:bg-cyan-50 relative"
                >
                  <MessageSquare size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">Messages</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => openModal('profile')}
                  className="flex items-center text-slate-600 hover:text-cyan-600 transition px-3 py-2 rounded-lg hover:bg-cyan-50"
                >
                  <User size={16} className="mr-1.5" />
                  <span className="text-sm font-medium">Profile</span>
                </button>
              </>
            )}

            <div className="ml-2 pl-2 border-l border-slate-200">
              <button
                onClick={isLoggedIn ? logout : () => openModal('login')}
                className="flex items-center text-slate-600 hover:text-cyan-600 transition px-3 py-2 rounded-lg hover:bg-cyan-50"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut size={16} className="mr-1.5" />
                    <span className="text-sm font-medium">Logout</span>
                  </>
                ) : (
                  <>
                    <LogIn size={16} className="mr-1.5" />
                    <span className="text-sm font-medium">Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-2 py-2 space-y-1">
            <button
              onClick={() => {
                openModal('chat');
                setIsMenuOpen(false);
              }}
              className="block px-4 py-2 text-sm w-full text-left rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 transition"
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
              className="block px-4 py-2 text-sm w-full text-left rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 transition"
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
                  className="block px-4 py-2 text-sm w-full text-left rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 transition"
                >
                  My Rides
                </button>
                <button
                  onClick={() => {
                    openModal('messages');
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm w-full text-left rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 transition relative"
                >
                  Messages
                  {unreadCount > 0 && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    openModal('profile');
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm w-full text-left rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 transition"
                >
                  Profile
                </button>
              </>
            )}
            <div className="border-t border-slate-200 pt-2">
              <button
                onClick={() => {
                  isLoggedIn ? logout() : openModal('login');
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm w-full text-left rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-600 transition"
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};