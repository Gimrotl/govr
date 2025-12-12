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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[88vh] md:h-[85vh] max-h-[700px] flex animate-scaleIn overflow-hidden">
        {/* Mobile: Show contacts or chat based on selection */}
        <div className={`${showContacts ? 'block' : 'hidden'} md:block w-full md:w-72 border-r border-gray-100 bg-gray-50 flex flex-col`}>
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-2">
              <MessageSquare size={20} className="text-green-600" />
              <h2 className="text-base font-semibold text-gray-900">Nachrichten</h2>
            </div>
            <button
              onClick={() => closeModal('messages')}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
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
                  className={`w-full p-3 text-left transition-all duration-200 hover:bg-white ${
                    selectedContact === contact
                      ? 'bg-white border-l-4 border-green-500 shadow-sm'
                      : 'hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactClick(contact);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all flex-shrink-0 ${
                        hasUnread
                          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white ring-2 ring-green-200'
                          : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:ring-2 hover:ring-blue-200'
                      }`}
                    >
                      <span className="font-semibold text-sm">
                        {contact?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick(contact);
                        }}
                        className={`block font-medium text-sm truncate transition-colors cursor-pointer hover:text-green-600 ${
                          hasUnread ? 'text-gray-900 font-semibold' : 'text-gray-800'
                        }`}
                      >
                        {contact}
                      </span>
                      <p className="text-xs text-gray-500 truncate">Letzte Nachricht...</p>
                    </div>
                    {hasUnread && (
                      <span className="bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                        {unreadForContact > 9 ? '9+' : unreadForContact}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${!showContacts ? 'block' : 'hidden'} md:block flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-white`}>
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-gray-100 flex items-center gap-3 flex-shrink-0 bg-white">
                <button
                  onClick={() => setShowContacts(true)}
                  className="md:hidden text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {selectedContact.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{selectedContact}</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
                <button
                  onClick={() => closeModal('messages')}
                  className="hidden md:block text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse min-h-0">
                <div className="space-y-3">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className="group">
                      {message.notificationType ? (
                        <div className={`p-3 rounded-lg ${getNotificationColor(message.notificationType)}`}>
                          <div className="flex items-start gap-3">
                            <span className="text-xl flex-shrink-0">
                              {getNotificationIcon(message.notificationType)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-semibold text-gray-900 text-sm">{message.from}</span>
                                {!message.read && (
                                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                )}
                              </div>
                              <p className="text-gray-700 text-sm mb-1">{message.content}</p>
                              <div className="text-xs text-gray-500 mb-2">{message.timestamp}</div>
                              <button
                                onClick={() => handleReply(message.id)}
                                className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors"
                              >
                                Antworten
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                          <div className="relative max-w-[75%] lg:max-w-[60%]">
                            {message.replyTo && (
                              <div className={`mb-2 p-2 rounded-lg text-xs border-l-3 ${
                                message.sent
                                  ? 'bg-green-400 bg-opacity-30 border-green-400'
                                  : 'bg-gray-100 border-gray-300'
                              }`}>
                                <span className="font-medium text-gray-700">Antwortet auf:</span>
                                <p className="truncate text-gray-600">{getRepliedMessage(message.replyTo)?.content}</p>
                              </div>
                            )}
                            <div
                              className={`px-3 py-2 rounded-2xl transition-all ${
                                message.sent
                                  ? 'bg-green-500 text-white rounded-br-none shadow-md'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
                              }`}
                            >
                              {message.image && (
                                <img
                                  src={message.image}
                                  alt="Shared"
                                  className="max-w-full rounded-xl mb-2"
                                />
                              )}
                              {message.content && (
                                <p className="break-words text-sm leading-relaxed">
                                  {message.content.split(/(@\w+)/g).map((part, index) =>
                                    part.startsWith('@') ? (
                                      <span key={index} className={`font-bold ${message.sent ? 'text-green-100' : 'text-green-600'}`}>
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
                                className="absolute -right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-green-600 hover:bg-gray-100 rounded-lg"
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

              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
                {replyingTo && (
                  <div className="mb-3 p-2.5 bg-green-50 rounded-lg border border-green-200 flex justify-between items-center">
                    <div className="text-xs">
                      <span className="font-medium text-gray-700">Antwortet auf:</span>
                      <p className="truncate text-gray-600 mt-0.5">{getRepliedMessage(replyingTo)?.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-white transition-all flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {showEmojiPicker && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-wrap gap-1">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addEmoji(emoji)}
                          className="text-xl hover:bg-white p-1.5 rounded-lg transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nachricht eingeben... @username erwähnen"
                      className="w-full p-3 pr-16 md:pr-24 border border-gray-200 rounded-full resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm placeholder-gray-400 transition-all"
                      rows={1}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="text-gray-400 hover:text-green-600 p-1.5 rounded-lg hover:bg-gray-100 transition-all hidden md:block"
                      >
                        <Smile size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMention(selectedContact || '')}
                        className="text-gray-400 hover:text-green-600 p-1.5 rounded-lg hover:bg-gray-100 transition-all hidden md:block"
                      >
                        <AtSign size={16} />
                      </button>
                      <div {...getRootProps()} className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-all">
                        <input {...getInputProps()} />
                        <ImageIcon size={16} className="text-gray-400 hover:text-green-600" />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() && !selectedImage}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <Send size={18} />
                  </button>
                </div>
                {selectedImage && (
                  <div className="mt-3 p-2.5 bg-gray-100 rounded-lg flex items-center justify-between text-xs border border-gray-200">
                    <span className="text-gray-700 truncate mr-2 font-medium">{selectedImage.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-gray-400 hover:text-gray-600 hover:bg-white p-1 rounded transition-all flex-shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-900 font-semibold text-base mb-1">Wählen Sie einen Kontakt</p>
                <p className="text-gray-500 text-sm">um die Unterhaltung zu beginnen</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};