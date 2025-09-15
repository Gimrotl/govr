import { useState, useContext } from 'react';
import { Message } from '../types';
import { useAuth } from './useAuth';

// Initial mock data for messages
const initialMessages: Message[] = [
  {
    id: 1,
    to: 'Anna',
    content: 'Hello, is there a free seat available?',
    timestamp: '2025-04-20 10:00',
    sent: true
  },
  {
    id: 2,
    from: 'Tom',
    content: 'Yes, there are still seats available!',
    timestamp: '2025-04-20 10:05',
    sent: false
  }
];

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { isLoggedIn, userEmail } = useAuth();
  
  const sendMessage = (message: Omit<Message, 'id'>) => {
    if (!isLoggedIn) {
      alert('Please log in to send messages.');
      return;
    }
    
    const newMessage: Message = {
      id: messages.length + 1,
      ...message
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // In a real app, this would send an API request
    
    return newMessage;
  };
  
  return {
    messages,
    sendMessage
  };
};