import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { useRides } from '../../hooks/useRides';

// Function to generate consistent color for each username
const getUserColor = (username: string) => {
  const colors = [
    'bg-sky-500 hover:bg-sky-600',
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-2 md:p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl h-[55vh] md:h-[380px] max-h-[380px] flex flex-col animate-scaleIn mt-16">
        {/* Chat Header */}
        <div className="flex-1 flex flex-col">
          <div className="p-2 border-b border-gray-200 flex justify-between items-center bg-emerald-500 text-white rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-1.5" />
              <h2 className="text-sm font-semibold">Chat</h2>
            </div>
            <button
              onClick={() => closeModal('chat')}
              className="text-white hover:text-gray-200 transition duration-200 p-0.5"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
            <div className="space-y-2">
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
                          className={`w-5 h-5 ${getUserColor(message.user)} rounded-full flex items-center justify-center transition-colors ${
                            message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'ml-2' : 'mr-2'
                          }`}
                        >
                          <span className="text-white font-bold text-xs">
                            {message.user.charAt(0).toUpperCase()}
                          </span>
                        </button>
                        <div className={`flex flex-col ${
                          message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'items-end' : 'items-start'
                        }`}>
                          <button
                            onClick={() => handleUserClick(message.user)}
                            className="font-medium text-gray-800 hover:text-emerald-500 transition-colors text-xs"
                          >
                            {message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'Sie' : message.user}
                          </button>
                          <span className="text-xs text-gray-500 hidden md:block">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-lg shadow-sm border ${
                      message.user === (userEmail?.split('@')[0] || 'Benutzer')
                        ? 'bg-emerald-500 text-white rounded-br-none'
                        : 'bg-white text-gray-700 rounded-bl-none'
                    }`}>
                      <p className="break-words text-xs">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-gray-200 rounded-b-lg">
            {!isLoggedIn && (
              <div className="mb-1 p-1 bg-yellow-100 border border-yellow-300 rounded text-center">
                <p className="text-yellow-800 text-xs">
                  Yazda läa, çuvalar döxu / LogIn / Нужно авторизоваться
                </p>
              </div>
            )}
            <div className="flex space-x-1">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isLoggedIn ? "Text..." : ""}
                  className="w-full p-1.5 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-xs"
                  rows={1}
                  disabled={!isLoggedIn}
                />
              </div>
              <button
                type="submit"
                disabled={!isLoggedIn || !newMessage.trim()}
                className="bg-emerald-500 text-white px-2 py-1.5 rounded hover:bg-emerald-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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