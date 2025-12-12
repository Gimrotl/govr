import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, ChevronDown, Smile, AtSign, Paperclip } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { useRides } from '../../hooks/useRides';

// Function to generate consistent color for each username
const getUserColor = (username: string) => {
  const colors = [
    'bg-blue-500 hover:bg-blue-400',
    'bg-cyan-500 hover:bg-cyan-400',
    'bg-teal-500 hover:bg-teal-400',
    'bg-emerald-500 hover:bg-emerald-400',
    'bg-rose-500 hover:bg-rose-400',
    'bg-orange-500 hover:bg-orange-400',
    'bg-amber-500 hover:bg-amber-400',
    'bg-lime-500 hover:bg-lime-400',
    'bg-pink-500 hover:bg-pink-400',
    'bg-fuchsia-500 hover:bg-fuchsia-400',
    'bg-violet-500 hover:bg-violet-400',
    'bg-sky-500 hover:bg-sky-400'
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start md:items-center justify-center z-50 p-4 pt-1 md:pt-4 animate-fadeIn overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl h-[75vh] md:h-[600px] max-h-[600px] flex flex-col animate-scaleIn mt-0 mb-4 md:my-auto relative border border-slate-700/50 overflow-hidden">
        {/* Chat Header */}
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 flex justify-between items-center bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <MessageCircle size={20} />
              </div>
              <h2 className="text-lg md:text-2xl font-bold tracking-tight">Öffentlicher Chat</h2>
            </div>
            <button
              onClick={() => closeModal('chat')}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto pb-4 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='2' /%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%231e293b'/%3E%3Cg filter='url(%23blur)' opacity='0.3'%3E%3Cpath d='M -50 300 Q 100 100, 300 200 T 700 150 T 1200 250 L 1200 500 L -50 500 Z' fill='%230ea5e9' /%3E%3Cpath d='M 0 350 Q 200 200, 400 280 T 900 250 T 1300 350 L 1300 500 L 0 500 Z' fill='%2306b6d4' opacity='0.6' /%3E%3C/g%3E%3Cg filter='url(%23blur)' opacity='0.4'%3E%3Crect x='200' y='280' width='40' height='20' fill='%23fee2e2' /%3E%3Crect x='220' y='290' width='8' height='10' fill='%23000'/%3E%3Crect x='232' y='290' width='8' height='10' fill='%23000'/%3E%3Ccircle cx='210' cy='305' r='8' fill='%23fca5a5'/%3E%3Ccircle cx='238' cy='305' r='8' fill='%23fca5a5'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-4 relative z-10 p-4 md:p-6">
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
                          className={`w-8 h-8 md:w-10 md:h-10 ${getUserColor(message.user)} rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white/10 ${
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
                            className={`font-semibold transition-colors ${
                              message.user === (userEmail?.split('@')[0] || 'Benutzer')
                                ? 'text-slate-700 hover:text-slate-800'
                                : 'text-cyan-300 hover:text-cyan-200'
                            }`}
                          >
                            {message.user === (userEmail?.split('@')[0] || 'Benutzer') ? 'Sie' : message.user}
                          </button>
                          <span className={`text-xs hidden md:block ${
                            message.user === (userEmail?.split('@')[0] || 'Benutzer')
                              ? 'text-slate-600'
                              : 'text-slate-400'
                          }`}>{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border ${
                      message.user === (userEmail?.split('@')[0] || 'Benutzer')
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 rounded-br-none border-blue-300/50'
                        : 'bg-slate-700/50 text-gray-100 rounded-bl-none border-slate-600/30'
                    }`}>
                      <p className="break-words text-sm md:text-base font-medium">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-40 md:bottom-48 right-8 bg-cyan-600 text-white p-3 rounded-full shadow-xl hover:bg-cyan-500 hover:scale-110 transition-all duration-300 animate-fadeIn backdrop-blur-sm border border-cyan-400/30"
                aria-label="Scroll to bottom"
              >
                <ChevronDown size={20} />
              </button>
            )}
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800/80 border-t border-slate-700/50 rounded-b-3xl backdrop-blur-sm">
            {!isLoggedIn && (
              <div className="mb-4 p-3 bg-amber-900/30 border border-amber-600/30 rounded-xl">
                <p className="text-amber-300 text-xs md:text-sm">
                  Sie können den Chat lesen, aber müssen eingeloggt sein, um Nachrichten zu senden.
                </p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isLoggedIn ? "Nachricht eingeben..." : "Melden Sie sich an, um zu schreiben..."}
                  className="w-full px-4 py-3 pr-40 bg-slate-700/40 border border-slate-600/50 rounded-2xl resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm md:text-base text-white placeholder-slate-400 transition-all duration-200 backdrop-blur-sm"
                  rows={1}
                  disabled={!isLoggedIn}
                />
                {isLoggedIn && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-300 hover:bg-slate-600/30 p-2 rounded-lg transition-all duration-200"
                      title="Emoji"
                    >
                      <Smile size={18} />
                    </button>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-300 hover:bg-slate-600/30 p-2 rounded-lg transition-all duration-200"
                      title="Mention"
                    >
                      <AtSign size={18} />
                    </button>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-300 hover:bg-slate-600/30 p-2 rounded-lg transition-all duration-200"
                      title="Datei"
                    >
                      <Paperclip size={18} />
                    </button>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!isLoggedIn || !newMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-900 p-3 rounded-2xl hover:from-blue-400 hover:to-cyan-400 hover:scale-105 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center shadow-lg border border-blue-300/50 font-semibold"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};