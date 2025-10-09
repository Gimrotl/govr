import React, { useState, useContext, createContext, ReactNode } from 'react';
import { Message } from '../types';
import { useAuth } from './useAuth';

interface MessagesContextType {
  messages: Message[];
  sendMessage: (message: Omit<Message, 'id'>) => Message | undefined;
  addSystemMessage: (content: string, from?: string) => void;
}

const MessagesContext = createContext<MessagesContextType>({
  messages: [],
  sendMessage: () => undefined,
  addSystemMessage: () => {}
});

export const useMessages = () => {
  return useContext(MessagesContext);
};

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

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { isLoggedIn, userEmail } = useAuth();

  const sendMessage = (message: Omit<Message, 'id'>) => {
    if (!isLoggedIn) {
      alert('Please log in to send messages.');
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      ...message
    };

    setMessages(prev => [...prev, newMessage]);

    return newMessage;
  };

  const addSystemMessage = (content: string, from?: string) => {
    const newMessage: Message = {
      id: Date.now(),
      from: from || 'System',
      content,
      timestamp: new Date().toLocaleString('de-DE'),
      sent: false
    };

    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <MessagesContext.Provider value={{ messages, sendMessage, addSystemMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};
