import { useState } from 'react';
import { ChatMessage } from '../types';

// Initial mock chat messages
const initialMessages: ChatMessage[] = [
  {
    id: 1,
    user: 'Anna',
    content: 'Hallo zusammen! Ich fahre morgen von Berlin nach München, falls jemand mitfahren möchte.',
    timestamp: '2025-01-20 10:30',
    isLoggedIn: true
  },
  {
    id: 2,
    user: 'Tom',
    content: 'Hi Anna! Wie viel kostet die Fahrt?',
    timestamp: '2025-01-20 10:35',
    isLoggedIn: true
  },
  {
    id: 3,
    user: 'Anna',
    content: '45€ pro Person. Abfahrt um 8:00 Uhr.',
    timestamp: '2025-01-20 10:37',
    isLoggedIn: true
  },
  {
    id: 4,
    user: 'Lisa',
    content: 'Gibt es noch freie Plätze für die Fahrt nach Hamburg am Wochenende?',
    timestamp: '2025-01-20 11:15',
    isLoggedIn: true
  },
  {
    id: 5,
    user: 'Mark',
    content: 'Ja Lisa, ich habe noch 2 Plätze frei. Schreib mir eine private Nachricht!',
    timestamp: '2025-01-20 11:20',
    isLoggedIn: true
  }
];

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  
  const sendMessage = (content: string, user: string) => {
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user,
      content,
      timestamp: new Date().toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isLoggedIn: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };
  
  return {
    messages,
    sendMessage
  };
};