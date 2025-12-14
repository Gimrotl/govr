import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useMessages } from '../../hooks/useMessages';
import { useAuth } from '../../hooks/useAuth';

export const ContactModal: React.FC = () => {
  const { selectedUser, closeModal } = useModals();
  const { sendMessage } = useMessages();
  const { isLoggedIn } = useAuth();
  const [messageContent, setMessageContent] = useState('');

  if (!selectedUser) return null;

  const handleSendMessage = () => {
    if (!messageContent.trim()) {
      alert('Bitte geben Sie eine Nachricht ein.');
      return;
    }
    
    if (!isLoggedIn) {
      alert('Bitte loggen Sie sich ein, um Nachrichten zu senden.');
      return;
    }
    
    sendMessage({
      to: selectedUser.firstName,
      content: messageContent,
      timestamp: new Date().toLocaleString(),
      sent: true
    });
    
    setMessageContent('');
    closeModal('contact');
    alert(`Nachricht an ${selectedUser.firstName} gesendet!`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <MessageCircle size={20} className="text-sky-400 mr-2" />
            Nachricht an {selectedUser.firstName}
          </h2>
          <button
            onClick={() => closeModal('contact')}
            className="text-red-500 hover:text-red-700 transition duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-sky-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-sky-500 font-bold">
                  {selectedUser.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{selectedUser.firstName}</p>
                {selectedUser.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-sm text-gray-600">{selectedUser.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent h-32 resize-none"
            placeholder="Schreiben Sie Ihre Nachricht hier..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            maxLength={500}
          ></textarea>
          
          <p className="text-xs text-gray-500 text-right">
            {messageContent.length}/500 Zeichen
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={() => closeModal('contact')}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Abbrechen
            </button>
            <button
              onClick={handleSendMessage}
              className="flex-1 flex items-center justify-center bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition duration-200"
            >
              <Send size={18} className="mr-2" />
              Senden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};