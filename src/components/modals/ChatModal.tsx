import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ChevronDown } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { useRides } from '../../hooks/useRides';

// Function to generate consistent color for each username
const getUserColor = (username: string) => {
  const colors = [
    'bg-blue-500 hover:bg-blue-600',
    'bg-purple-500 hover:bg-purple-600', 
    'bg-pink-500 hover:bg-pink-600',
    'bg-indigo-500 hover:bg-indigo-600',
    'bg-red-500 hover:bg-red-600',
    'bg-orange-500 hover:bg-orange-600',
    'bg-yellow-500 hover:bg-yellow-600',
    'bg-teal-500 hover:bg-teal-600',
    'bg-cyan-500 hover:bg-cyan-600',
    'bg-emerald-500 hover:bg-emerald-600',
    'bg-lime-500 hover:bg-lime-600',
    'bg-amber-500 hover:bg-amber-600'
  ];
  
  // Create a simple hash from username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get consistent color index
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

export const ChatModal: React.FC = () => {
  const { closeModal, openUserProfile } = useModals();
  const { messages, sendMessage } = useChat();
  const { isLoggedIn, userEmail } = useAuth();
  const { rides } = useRides();
  const [newMessage, setNewMessage] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um Nachrichten zu senden.');
      return;
    }
    
    if (!newMessage.trim()) return;
    
    const userName = userEmail?.split('@')[0] || 'Benutzer';
    sendMessage(newMessage, userName);
    setNewMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };
  
  const handleUserClick = (username: string) => {
    // Don't open profile for own user
    if (username === (userEmail?.split('@')[0] || 'Benutzer') || username === 'Sie') {
      return;
    }
    
    // Find user's rides to get more information
    const userRides = rides.filter(ride => ride.driver === username);
    const latestRide = userRides[0]; // Get the most recent ride for user info
    
    // Create user profile data
    const userProfile = {
      firstName: username,
      age: latestRide?.driverInfo?.match(/(\d+) years old/)?.[1] || 'Nicht angegeben',
      mobile: latestRide?.mobile || 'Nicht angegeben',
      whatsapp: latestRide?.whatsapp || 'Nicht angegeben',
      telegram: latestRide?.telegram || 'Nicht angegeben',
      carImages: latestRide?.carImage ? [latestRide.carImage, ...(latestRide.additionalImages || [])] : [],
      car: latestRide?.car || 'Nicht angegeben',
      rating: latestRide?.rating || 0,
      driverInfo: latestRide?.driverInfo || `${username}, Informationen nicht verfügbar`,
      bio: `Fahrer mit ${userRides.length} angebotenen Fahrten`,
      userRides: userRides // Add user's rides to profile
    };
    
    openUserProfile(userProfile);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 p-4 pt-1 md:pt-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-[40vh] md:h-[350px] max-h-[350px] flex flex-col animate-scaleIn mt-0 mb-4 md:my-auto relative">
        {/* Chat Header */}
        <div className="flex-1 flex flex-col">
          <div className="px-3 py-2 md:px-4 md:py-2 border-b border-gray-200 flex justify-between items-center bg-slate-100 rounded-t-lg">
            <h2 className="text-base font-medium text-gray-900">Chat</h2>
            <button
              onClick={() => closeModal('chat')}
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-2 md:p-3 bg-white relative"
          >
            <div className="space-y-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${
                  message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`max-w-[75%]`}>
                    <div className={`flex items-end gap-1 ${
                      message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <button
                        onClick={() => handleUserClick(message.user)}
                        className={`w-5 h-5 ${getUserColor(message.user)} rounded-full flex items-center justify-center transition-colors flex-shrink-0`}
                      >
                        <span className="text-white font-bold text-xs">
                          {message.user.charAt(0).toUpperCase()}
                        </span>
                      </button>
                      <div className={`px-2 py-1 rounded text-xs ${
                        message.user === (userEmail?.split('@')[0] || 'Benutzer')
                          ? 'bg-slate-200 text-gray-900'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="break-words">{message.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-32 md:bottom-40 right-8 bg-slate-700 text-white p-1.5 rounded-full shadow-md hover:bg-slate-800 transition-all duration-200 animate-fadeIn"
                aria-label="Scroll to bottom"
              >
                <ChevronDown size={16} />
              </button>
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-white border-t border-gray-200 rounded-b-lg">
            <div className="flex gap-1 md:gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isLoggedIn ? "Nachricht..." : "Anmelden..."}
                className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
                disabled={!isLoggedIn}
              />
              <button
                type="submit"
                disabled={!isLoggedIn || !newMessage.trim()}
                className="bg-slate-700 text-white px-2 py-1.5 rounded hover:bg-slate-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};