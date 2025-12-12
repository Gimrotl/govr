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
        return 'bg-emerald-900/40 border-l-4 border-emerald-400';
      case 'order_rejected':
        return 'bg-rose-900/40 border-l-4 border-rose-400';
      case 'booking_confirmed':
        return 'bg-cyan-900/40 border-l-4 border-cyan-400';
      case 'booking_request':
        return 'bg-amber-900/40 border-l-4 border-amber-400';
      default:
        return 'bg-zinc-800/40 border-l-4 border-zinc-500';
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-5xl h-[90vh] max-h-[700px] flex overflow-hidden animate-scaleIn border border-zinc-700/50">
        <div className={`${showContacts ? 'block' : 'hidden'} md:block w-full md:w-80 bg-zinc-900 border-r border-zinc-800`}>
          <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Nachrichten</h2>
            <button
              onClick={() => closeModal('messages')}
              className="text-zinc-500 hover:text-rose-400 transition-all duration-200 hover:rotate-90"
            >
              <X size={22} />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-76px)] p-3 space-y-1">
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
                  className={`w-full p-3 text-left transition-all duration-200 rounded-xl group ${
                    selectedContact === contact
                      ? 'bg-zinc-800 ring-1 ring-teal-500/50'
                      : hasUnread
                      ? 'bg-zinc-800/50 hover:bg-zinc-800'
                      : 'hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactClick(contact);
                      }}
                      className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 group-hover:scale-105 ${
                        hasUnread
                          ? 'bg-gradient-to-br from-rose-500 to-orange-500 ring-2 ring-rose-500/30'
                          : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                      }`}
                    >
                      <span className="font-bold text-white">
                        {contact?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactClick(contact);
                          }}
                          className={`font-medium cursor-pointer hover:text-teal-400 transition-colors truncate ${
                            hasUnread ? 'text-zinc-100' : 'text-zinc-300'
                          }`}
                        >
                          {contact}
                        </span>
                        {hasUnread && (
                          <span className="bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                            {unreadForContact}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {hasUnread ? 'Neue Nachricht' : 'Tippen zum Öffnen'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${!showContacts ? 'block' : 'hidden'} md:block flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-zinc-950`}>
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-zinc-800 flex items-center flex-shrink-0 bg-zinc-900/80 backdrop-blur-sm">
                <button
                  onClick={() => setShowContacts(true)}
                  className="md:hidden mr-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 p-2 rounded-lg transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mr-3">
                  <span className="font-bold text-white">{selectedContact?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100">{selectedContact}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <p className="text-xs text-zinc-500">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => closeModal('messages')}
                  className="hidden md:block text-zinc-500 hover:text-rose-400 transition-all duration-200 p-2 hover:bg-zinc-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse min-h-0">
                <div className="space-y-3">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className="group">
                      {message.notificationType ? (
                        <div className={`p-4 rounded-xl ${getNotificationColor(message.notificationType)} mb-3`}>
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{getNotificationIcon(message.notificationType)}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-zinc-100">{message.from}</span>
                                {!message.read && (
                                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                )}
                              </div>
                              <p className="text-zinc-300 text-sm leading-relaxed">{message.content}</p>
                              <div className="text-xs text-zinc-500 mt-2">{message.timestamp}</div>
                              <button
                                onClick={() => handleReply(message.id)}
                                className="mt-2 text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-teal-400 hover:text-teal-300 font-medium transition-all duration-200"
                              >
                                Antworten
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                          <div className="relative max-w-[75%]">
                            {message.replyTo && (
                              <div className="mb-1.5 px-3 py-2 bg-zinc-800/50 rounded-lg text-xs border-l-2 border-teal-500">
                                <span className="text-teal-400 font-medium">Antwort auf:</span>
                                <p className="truncate text-zinc-400 mt-0.5">{getRepliedMessage(message.replyTo)?.content}</p>
                              </div>
                            )}
                            <div
                              className={`px-4 py-3 rounded-2xl transition-all duration-200 ${
                                message.sent
                                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-br-md'
                                  : 'bg-zinc-800 text-zinc-100 rounded-bl-md'
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
                                <p className="break-words text-sm leading-relaxed">
                                  {message.content.split(/(@\w+)/g).map((part, index) =>
                                    part.startsWith('@') ? (
                                      <span key={index} className={`font-semibold ${message.sent ? 'text-teal-200' : 'text-teal-400'}`}>
                                        {part}
                                      </span>
                                    ) : part
                                  )}
                                </p>
                              )}
                              <div className={`text-[10px] mt-1.5 ${message.sent ? 'text-teal-200/70' : 'text-zinc-500'}`}>
                                {message.timestamp}
                              </div>
                            </div>
                            {!message.sent && (
                              <button
                                onClick={() => handleReply(message.id)}
                                className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 text-zinc-600 hover:text-teal-400 hover:bg-zinc-800 rounded-lg"
                              >
                                <Reply size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="relative p-4 bg-zinc-900 border-t border-zinc-800 flex-shrink-0">
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 p-3 bg-zinc-800 rounded-xl border border-zinc-700 shadow-xl z-10">
                    <div className="flex flex-wrap gap-1">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addEmoji(emoji)}
                          className="text-xl hover:bg-zinc-700 hover:scale-110 p-2 rounded-lg transition-all duration-200"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {replyingTo && (
                  <div className="mb-3 p-3 bg-zinc-800 rounded-xl flex justify-between items-center border-l-2 border-teal-500">
                    <div className="text-sm flex-1 min-w-0">
                      <span className="text-teal-400 font-medium text-xs">Antwort auf:</span>
                      <p className="truncate text-zinc-300 text-sm mt-0.5">{getRepliedMessage(replyingTo)?.content}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="text-zinc-500 hover:text-rose-400 transition-all duration-200 ml-2 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nachricht schreiben..."
                      className="w-full p-3 pr-24 bg-zinc-800 border border-zinc-700 rounded-xl resize-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 text-sm text-zinc-100 placeholder-zinc-500 transition-all duration-200"
                      rows={1}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`p-2 rounded-lg transition-all duration-200 hidden md:block ${showEmojiPicker ? 'text-teal-400 bg-zinc-700' : 'text-zinc-500 hover:text-teal-400 hover:bg-zinc-700'}`}
                      >
                        <Smile size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMention(selectedContact || '')}
                        className="text-zinc-500 hover:text-teal-400 p-2 rounded-lg hover:bg-zinc-700 transition-all duration-200 hidden md:block"
                      >
                        <AtSign size={18} />
                      </button>
                      <div {...getRootProps()} className="cursor-pointer p-2 text-zinc-500 hover:text-teal-400 rounded-lg hover:bg-zinc-700 transition-all duration-200">
                        <input {...getInputProps()} />
                        <ImageIcon size={18} />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() && !selectedImage}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-3 rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send size={20} />
                  </button>
                </div>
                {selectedImage && (
                  <div className="mt-2 p-2.5 bg-zinc-800 rounded-lg flex items-center justify-between text-xs border border-zinc-700">
                    <span className="text-zinc-300 truncate mr-2">{selectedImage.name}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-zinc-500 hover:text-rose-400 flex-shrink-0 transition-all duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center border border-teal-500/30">
                  <MessageSquare size={36} className="text-teal-400" />
                </div>
                <p className="text-xl font-semibold text-zinc-300 mb-2">Wählen Sie einen Kontakt</p>
                <p className="text-sm text-zinc-500">um eine Unterhaltung zu beginnen</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};