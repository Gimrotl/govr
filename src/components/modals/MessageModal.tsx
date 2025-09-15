import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { useModals } from '../../hooks/useModals';
import { useMessages } from '../../hooks/useMessages';

export const MessageModal: React.FC = () => {
  const { selectedRide, closeModal } = useModals();
  const { sendMessage } = useMessages();
  const [messageContent, setMessageContent] = useState('');

  if (!selectedRide) return null;

  const handleSendMessage = () => {
    if (!messageContent.trim()) {
      alert('Please enter a message.');
      return;
    }
    
    sendMessage({
      to: selectedRide.driver,
      content: messageContent,
      timestamp: new Date().toLocaleString(),
      sent: true
    });
    
    setMessageContent('');
    closeModal('message');
    closeModal('rideDetails');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Message to {selectedRide.driver}
          </h2>
          <div className="flex-shrink-0 ml-4">
            <button
              onClick={() => closeModal('message')}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
            placeholder="Type your message here..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></textarea>
          
          <div className="flex space-x-3">
            <button
              onClick={handleSendMessage}
              className="flex-1 flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              <Send size={18} className="mr-2" />
              <span>Send</span>
            </button>
            <button
              onClick={() => closeModal('message')}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};