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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] max-h-[600px] flex animate-scaleIn">
        {/* Mobile: Show contacts or chat based on selection */}
        <div className={`${showContacts ? 'block' : 'hidden'} md:block w-full md:w-64 border-r border-gray-200`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Kontakte</h2>
            <button
              onClick={() => closeModal('messages')}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-64px)]">
            {contacts.map((contact) => {
              const unreadForContact = getUnreadCount(contact);
              const hasUnread = unreadForContact > 0;

              return (
                <button
                  key={contact}
                  onClick={() => {
                    setSelectedContact(contact);
                    setShowContacts(false); // Hide contacts on mobile when selecting
                  }}
                  className={`w-full p-4 text-left transition-colors ${
                    selectedContact === contact
                      ? hasUnread
                        ? 'bg-red-100 border-l-4 border-red-500'
                        : 'bg-gray-100'
                      : hasUnread
                      ? 'bg-red-50 hover:bg-red-100 border-l-4 border-red-400'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(contact);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${
                          hasUnread ? 'bg-red-200' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`font-semibold ${
                          hasUnread ? 'text-red-700' : 'text-gray-600'
                        }`}>
                          {contact?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(contact);
                        }}
                        className={`font-medium cursor-pointer hover:text-blue-600 transition-colors truncate ${
                          hasUnread ? 'text-red-700' : ''
                        }`}
                      >
                        {contact}
                      </span>
                    </div>
                    {hasUnread && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                        {unreadForContact}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${!showContacts ? 'block' : 'hidden'} md:block flex-1 flex flex-col min-h-0`}>
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-gray-200 flex items-center flex-shrink-0">
                <button
                  onClick={() => setShowContacts(true)}
                  className="md:hidden mr-3 text-gray-600 hover:text-gray-800"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-semibold">Chat mit {selectedContact}</h3>
                <button
                  onClick={() => closeModal('messages')}
                  className="hidden md:block ml-auto text-red-500 hover:text-red-700 transition duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col-reverse min-h-0">
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className="group">
                      {message.notificationType ? (
                        <div className={`p-4 rounded-lg ${getNotificationColor(message.notificationType)} mb-4`}>
                          <div className="flex items-start">
                            <span className="text-2xl mr-3">
                              {getNotificationIcon(message.notificationType)}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-800">{message.from}</span>
                                {!message.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-gray-700 mb-1">{message.content}</p>
                              <div className="text-xs text-gray-500">{message.timestamp}</div>
                              <button
                                onClick={() => handleReply(message.id)}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
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
                              <div className="mb-1 p-2 bg-gray-200 rounded-lg text-xs">
                                <span className="font-medium">Replying to:</span>
                                <p className="truncate">{getRepliedMessage(message.replyTo)?.content}</p>
                              </div>
                            )}
                            <div
                              className={`p-3 rounded-lg ${
                                message.sent
                                  ? 'bg-green-500 text-white rounded-br-none'
                                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                              }`}
                            >
                            {message.image && (
                              <img 
                                src={message.image} 
                                alt="Shared" 
                                className="max-w-full rounded-lg mb-2"
                              />
                            )}
                            {message.content && (
                              <p className="break-words">
                                {message.content.split(/(@\w+)/g).map((part, index) => 
                                  part.startsWith('@') ? (
                                    <span key={index} className="font-bold text-blue-300">
                                      {part}
                                    </span>
                                  ) : part
                                )}
                              </p>
                            )}
                              <div className={`text-xs mt-1 ${message.sent ? 'text-green-100' : 'text-gray-500'}`}>
                                {message.timestamp}
                              </div>
                            </div>
                            {!message.sent && (
                              <button
                                onClick={() => handleReply(message.id)}
                                className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-gray-600"
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

              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                {replyingTo && (
                  <div className="mb-2 p-2 bg-blue-50 rounded-lg flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Replying to:</span>
                      <p className="truncate">{getRepliedMessage(replyingTo)?.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {showEmojiPicker && (
                  <div className="mb-2 p-2 bg-gray-50 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addEmoji(emoji)}
                          className="text-xl hover:bg-gray-200 p-1 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nachricht eingeben... @username für Erwähnung"
                      className="w-full p-2 pr-12 md:pr-20 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                      rows={1}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1 md:space-x-1">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="text-gray-400 hover:text-green-500 p-1 hidden md:block"
                      >
                        <Smile size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMention(selectedContact || '')}
                        className="text-gray-400 hover:text-green-500 p-1 hidden md:block"
                      >
                        <AtSign size={16} />
                      </button>
                      <div {...getRootProps()} className="cursor-pointer p-1">
                      <input {...getInputProps()} />
                        <ImageIcon size={14} className="text-gray-400 hover:text-green-500" />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() && !selectedImage}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </div>
                {selectedImage && (
                  <div className="mt-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between text-xs md:text-sm">
                    <span className="text-gray-600 truncate mr-2">{selectedImage.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 p-4 text-center">
              <div>
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">Wählen Sie einen Kontakt</p>
                <p className="text-sm">um eine Unterhaltung zu beginnen</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};