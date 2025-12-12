import React, { useState } from 'react';
import { Send, X, Image as ImageIcon, Smile, Reply, AtSign, ChevronLeft, MessageSquare } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useMessages } from '../../hooks/useMessages';
import { useDropzone } from 'react-dropzone';

export const MessagesModal: React.FC = () => {
  const { closeModal, openUserProfile } = useModals();
  const { messages, sendMessage, markAsRead } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showContacts, setShowContacts] = useState(true);

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '😢', '😡', '🤝', '🚗', '✈️', '🏠'];

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    }
  });

  const contacts = Array.from(new Set(messages.map(m => m.sent ? m.to : m.from).filter(Boolean)))
    .sort((a, b) => {
      const aLastMessage = messages.find(m => (m.sent && m.to === a) || (!m.sent && m.from === a));
      const bLastMessage = messages.find(m => (m.sent && m.to === b) || (!m.sent && m.from === b));
      return (bLastMessage?.id || 0) - (aLastMessage?.id || 0);
    });

  const filteredMessages = selectedContact
    ? messages.filter(m => (m.sent && m.to === selectedContact) || (!m.sent && m.from === selectedContact))
        .sort((a, b) => b.id - a.id)
    : [];

  const getUnreadCount = (contact: string) => {
    return messages.filter(m => !m.sent && m.from === contact && !m.read).length;
  };

  const handleContactClick = (contact: string) => {
    openUserProfile({
      firstName: contact,
      age: '30',
      mobile: '+1234567890',
      whatsapp: '+1234567890',
      telegram: `@${contact}`,
      instagram: `@${contact}`,
      bio: '',
      carImages: []
    });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!newMessage.trim() && !selectedImage) return;
    if (!selectedContact) return;
    
    const mentions = newMessage.match(/@(\w+)/g)?.map(mention => mention.substring(1)) || [];
    
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sendMessage({
          to: selectedContact,
          content: newMessage,
          image: reader.result as string,
          timestamp: new Date().toLocaleString(),
          sent: true,
          replyTo: replyingTo || undefined,
          mentions
        });
        setSelectedImage(null);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      sendMessage({
        to: selectedContact,
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        sent: true,
        replyTo: replyingTo || undefined,
        mentions
      });
    }
    
    setNewMessage('');
    setReplyingTo(null);
  };
  const handleReply = (messageId: number) => {
    setReplyingTo(messageId);
  };
  
  const handleMention = (username: string) => {
    setNewMessage(prev => prev + `@${username} `);
  };
  
  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };
  
  const getRepliedMessage = (replyId: number) => {
    return filteredMessages.find(m => m.id === replyId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_accepted':
        return '✅';
      case 'order_rejected':
        return '❌';
      case 'booking_confirmed':
        return '🎉';
      case 'booking_request':
        return '📨';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order_accepted':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'order_rejected':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'booking_confirmed':
        return 'bg-blue-50 border-l-4 border-blue-500';
      case 'booking_request':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  React.useEffect(() => {
    filteredMessages.forEach(msg => {
      if (!msg.sent && !msg.read) {
        markAsRead(msg.id);
      }
    });
  }, [selectedContact, filteredMessages]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/60 to-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] max-h-[700px] flex overflow-hidden animate-scaleIn">
        {/* Mobile: Show contacts or chat based on selection */}
        <div className={`${showContacts ? 'block' : 'hidden'} md:block w-full md:w-80 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/50`}>
          <div className="p-5 border-b border-slate-200/50 flex justify-between items-center bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Nachrichten</h2>
            <button
              onClick={() => closeModal('messages')}
              className="text-slate-400 hover:text-red-500 transition-all duration-200 hover:rotate-90 hover:scale-110"
            >
              <X size={22} />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-76px)] p-2">
            {contacts.map((contact) => {
              const unreadForContact = getUnreadCount(contact);
              const hasUnread = unreadForContact > 0;

              return (
                <button
                  key={contact}
                  onClick={() => {
                    setSelectedContact(contact);
                    setShowContacts(false);
                  }}
                  className={`w-full p-4 mb-2 text-left transition-all duration-200 rounded-xl group ${
                    selectedContact === contact
                      ? hasUnread
                        ? 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 shadow-md transform scale-[1.02]'
                        : 'bg-gradient-to-r from-slate-100 to-slate-50 shadow-md transform scale-[1.02]'
                      : hasUnread
                      ? 'bg-red-50/50 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 border-l-4 border-red-400 hover:shadow-md hover:scale-[1.01]'
                      : 'hover:bg-gradient-to-r hover:from-slate-50 hover:to-white hover:shadow-sm hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(contact);
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 cursor-pointer transition-all duration-200 group-hover:scale-110 ${
                          hasUnread
                            ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-200'
                            : 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-200'
                        }`}
                      >
                        <span className="font-bold text-white text-lg">
                          {contact?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactClick(contact);
                          }}
                          className={`font-semibold cursor-pointer hover:text-blue-600 transition-colors truncate block ${
                            hasUnread ? 'text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          {contact}
                        </span>
                        <p className="text-xs text-slate-500 truncate mt-1">Klicken zum Öffnen</p>
                      </div>
                    </div>
                    {hasUnread && (
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 shadow-lg animate-pulse">
                        {unreadForContact}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${!showContacts ? 'block' : 'hidden'} md:block flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30`}>
          {selectedContact ? (
            <>
              <div className="p-5 border-b border-slate-200/50 flex items-center flex-shrink-0 bg-white/80 backdrop-blur-sm">
                <button
                  onClick={() => setShowContacts(true)}
                  className="md:hidden mr-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg">Chat mit {selectedContact}</h3>
                  <p className="text-xs text-slate-500">Aktiv</p>
                </div>
                <button
                  onClick={() => closeModal('messages')}
                  className="hidden md:block text-slate-400 hover:text-red-500 transition-all duration-200 hover:rotate-90 hover:scale-110"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse min-h-0">
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className="group">
                      {message.notificationType ? (
                        <div className={`p-5 rounded-2xl ${getNotificationColor(message.notificationType)} mb-4 shadow-lg backdrop-blur-sm`}>
                          <div className="flex items-start">
                            <span className="text-3xl mr-4">
                              {getNotificationIcon(message.notificationType)}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-slate-900">{message.from}</span>
                                {!message.read && (
                                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-300"></span>
                                )}
                              </div>
                              <p className="text-slate-700 mb-2 leading-relaxed">{message.content}</p>
                              <div className="text-xs text-slate-500 font-medium">{message.timestamp}</div>
                              <button
                                onClick={() => handleReply(message.id)}
                                className="mt-3 text-sm bg-white/50 hover:bg-white px-4 py-2 rounded-lg text-blue-600 hover:text-blue-800 font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                Antworten
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                          <div className="relative max-w-[70%]">
                            {message.replyTo && (
                              <div className="mb-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl text-xs border border-slate-200 shadow-sm">
                                <span className="font-semibold text-slate-600">Antwort auf:</span>
                                <p className="truncate text-slate-700 mt-1">{getRepliedMessage(message.replyTo)?.content}</p>
                              </div>
                            )}
                            <div
                              className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
                                message.sent
                                  ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-sm'
                                  : 'bg-white text-slate-800 rounded-bl-sm border border-slate-200/50'
                              }`}
                            >
                            {message.image && (
                              <img
                                src={message.image}
                                alt="Shared"
                                className="max-w-full rounded-xl mb-3 shadow-md"
                              />
                            )}
                            {message.content && (
                              <p className="break-words leading-relaxed">
                                {message.content.split(/(@\w+)/g).map((part, index) =>
                                  part.startsWith('@') ? (
                                    <span key={index} className={`font-bold ${message.sent ? 'text-emerald-100' : 'text-blue-600'}`}>
                                      {part}
                                    </span>
                                  ) : part
                                )}
                              </p>
                            )}
                              <div className={`text-xs mt-2 font-medium ${message.sent ? 'text-emerald-100' : 'text-slate-500'}`}>
                                {message.timestamp}
                              </div>
                            </div>
                            {!message.sent && (
                              <button
                                onClick={() => handleReply(message.id)}
                                className="absolute -right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-md"
                              >
                                <Reply size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="relative p-5 bg-white/80 backdrop-blur-sm border-t border-slate-200/50 flex-shrink-0 max-h-[40vh] overflow-y-auto">
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 mx-5 p-3 bg-white rounded-xl border border-slate-200 shadow-xl z-10">
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addEmoji(emoji)}
                          className="text-2xl hover:bg-slate-100 hover:scale-125 p-2 rounded-lg transition-all duration-200"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {replyingTo && (
                  <div className="mb-3 p-3 bg-blue-50 rounded-xl flex justify-between items-center border border-blue-200 shadow-sm">
                    <div className="text-sm flex-1 min-w-0">
                      <span className="font-semibold text-blue-700">Antwort auf:</span>
                      <p className="truncate text-slate-700 mt-1">{getRepliedMessage(replyingTo)?.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="text-slate-400 hover:text-red-500 transition-all duration-200 hover:rotate-90 ml-2 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nachricht eingeben... @username für Erwähnung"
                      className="w-full p-4 pr-14 md:pr-24 border border-slate-300 rounded-2xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm md:text-base shadow-sm transition-all duration-200 bg-white"
                      rows={1}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="text-slate-400 hover:text-emerald-500 p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 hidden md:block"
                      >
                        <Smile size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMention(selectedContact || '')}
                        className="text-slate-400 hover:text-emerald-500 p-2 rounded-lg hover:bg-slate-100 transition-all duration-200 hidden md:block"
                      >
                        <AtSign size={18} />
                      </button>
                      <div {...getRootProps()} className="cursor-pointer p-2 text-slate-400 hover:text-emerald-500 rounded-lg hover:bg-slate-100 transition-all duration-200">
                      <input {...getInputProps()} />
                        <ImageIcon size={18} />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() && !selectedImage}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Send size={20} />
                  </button>
                </div>
                {selectedImage && (
                  <div className="mt-3 p-3 bg-slate-100 rounded-xl flex items-center justify-between text-xs md:text-sm shadow-sm border border-slate-200">
                    <span className="text-slate-700 truncate mr-2 font-medium">{selectedImage.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-slate-400 hover:text-red-500 flex-shrink-0 transition-all duration-200 hover:scale-110"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 p-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-slate-200/50">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 animate-bounce">
                    <MessageSquare size={40} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Wählen Sie einen Kontakt</p>
                  <p className="text-base text-slate-500">um eine Unterhaltung zu beginnen</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};