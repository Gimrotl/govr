import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { RidesProvider } from './contexts/RidesContext';
import { ModalsProvider } from './contexts/ModalsContext';
import { NotificationsProvider } from './hooks/useNotifications.tsx';
import { MessagesProvider } from './hooks/useMessages.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <NotificationsProvider>
        <MessagesProvider>
          <RidesProvider>
            <ModalsProvider>
              <App />
            </ModalsProvider>
          </RidesProvider>
        </MessagesProvider>
      </NotificationsProvider>
    </AuthProvider>
  </StrictMode>
);