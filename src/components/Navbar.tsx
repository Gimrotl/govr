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
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">Word</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => openModal('chat')}
              className="flex items-center text-white hover:text-moonlit-300 transition duration-200"
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
              className="flex items-center text-white hover:text-moonlit-300 transition duration-200"
            >
              <PlusCircle size={18} className="mr-1" />
              <span>Offer a Ride</span>
            </button>
            
            {isLoggedIn && (
              <>
                <button
                  onClick={() => openModal('myRides')}
                  className="flex items-center hover:text-moonlit-300 transition duration-200"
                >
                  <Car size={18} className="mr-1" />
                  <span>My Rides</span>
                </button>
                <button
                  onClick={() => openModal('messages')}
                  className="flex items-center hover:text-moonlit-300 transition duration-200 relative"
                >
                  <MessageSquare size={18} className="mr-1" />
                  <span>Messages</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => openModal('profile')}
                  className="flex items-center hover:text-moonlit-300 transition duration-200"
                >
                  <User size={18} className="mr-1" />
                  <span>Profile</span>
                </button>
              </>
            )}
            
            <button 
              onClick={isLoggedIn ? logout : () => openModal('login')}
              className="flex items-center hover:text-moonlit-300 transition duration-200"
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
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => {
                openModal('chat');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
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
              className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
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
                  className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600"
                >
                  My Rides
                </button>
                <button
                  onClick={() => {
                    openModal('messages');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base w-full text-left rounded-md hover:bg-gray-600 relative"
                >
                  Messages
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
                  Profile
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
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};