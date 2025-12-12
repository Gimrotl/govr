import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[75vh] md:h-[600px] max-h-[600px] flex flex-col animate-scaleIn mt-0 mb-4 md:my-auto relative">
        {/* Chat Header */}
        <div className="flex-1 flex flex-col">
          <div className="p-3 md:p-4 border-b border-gray-200 flex justify-between items-center bg-green-600 text-white rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2 md:mr-2" />
              <h2 className="text-lg md:text-xl font-semibold">Öffentlicher Chat</h2>
            </div>
            <button
              onClick={() => closeModal('chat')}
              className="text-white hover:text-gray-200 transition duration-200"
            >
              <X size={20} className="md:hidden" />
              <X size={24} className="hidden md:block" />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50 pb-28 md:pb-32">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${
                  message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`max-w-[70%] ${
                    message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'order-2' : 'order-1'
                  }`}>
                    <div className={`flex items-center mb-1 ${
                      message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className={`flex items-center ${
                        message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <button
                          onClick={() => handleUserClick(message.user)}
                          className={`w-6 h-6 md:w-8 md:h-8 ${getUserColor(message.user)} rounded-full flex items-center justify-center transition-colors ${
                            message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'ml-2' : 'mr-2'
                          }`}
                        >
                          <span className="text-white font-bold text-xs md:text-sm">
                            {message.user.charAt(0).toUpperCase()}
                          </span>
                        </button>
                        <div className={`flex flex-col ${
                          message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'items-end' : 'items-start'
                        }`}>
                          <button
                            onClick={() => handleUserClick(message.user)}
                            className="font-medium text-gray-800 hover:text-green-600 transition-colors"
                          >
                            {message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'Sie' : message.user}
                          </button>
                          <span className="text-xs text-gray-500 hidden md:block">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg shadow-sm border ${
                      message.user === (userEmail?.split('@')[0] || 'Benutzer') 
                        ? 'bg-green-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-700 rounded-bl-none'
                    }`}>
                      <p className="break-words text-sm md:text-base">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-white border-t border-gray-200 rounded-b-lg">
            {!isLoggedIn && (
              <div className="mb-2 md:mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-yellow-800 text-xs md:text-sm">
                  Sie können den Chat lesen, aber müssen eingeloggt sein, um Nachrichten zu senden.
                </p>
              </div>
            )}
            <div className="flex space-x-1 md:space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isLoggedIn ? "Nachricht eingeben..." : "Melden Sie sich an, um zu schreiben..."}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                  rows={1}
                  disabled={!isLoggedIn}
                />
              </div>
              <button
                type="submit"
                disabled={!isLoggedIn || !newMessage.trim()}
                className="bg-green-600 text-white p-2 md:p-3 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send size={16} className="md:hidden" />
                <Send size={20} className="hidden md:block" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};