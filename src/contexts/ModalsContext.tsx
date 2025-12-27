import React, { createContext, useState, ReactNode } from 'react';
import { Ride, UserProfile } from '../types';

type ModalType = 'login' | 'rideDetails' | 'message' | 'messages' | 'terms' | 'complaint' | 'orders' | 'profile' | 'offerRide' | 'myRides' | 'notifications' | 'chat' | 'booking' | 'contact' | 'reviews' | 'adminLogin' | 'adminDashboard' | 'createRestStop' | 'editRestStop' | 'currentRides' | 'reportDetails' | 'infoCard';

export interface InfoCardData {
  id: string;
  title: string;
  description: string;
  iconType: 'car' | 'shield' | 'luggage';
}

interface ModalsContextType {
  activeModals: Record<ModalType, boolean>;
  selectedRide: Ride | null;
  selectedUser: UserProfile | null;
  selectedRestStop: any | null;
  selectedReport: any | null;
  selectedInfoCard: InfoCardData | null;
  openModal: (modal: ModalType) => void;
  closeModal: (modal: ModalType) => void;
  openRideDetails: (ride: Ride) => void;
  openUserProfile: (user: UserProfile) => void;
  openUserReviews: (user: UserProfile) => void;
  openRestStopEdit: (restStop: any) => void;
  openReportDetails: (report: any) => void;
  openInfoCard: (card: InfoCardData) => void;
  isAnyModalOpen: boolean;
}

export const ModalsContext = createContext<ModalsContextType>({
  activeModals: {
    login: false,
    rideDetails: false,
    message: false,
    messages: false,
    terms: false,
    complaint: false,
    orders: false,
    profile: false,
    offerRide: false,
    myRides: false,
    notifications: false,
    chat: false,
    booking: false,
    contact: false,
    reviews: false,
    adminLogin: false,
    adminDashboard: false,
    createRestStop: false,
    editRestStop: false,
    currentRides: false,
    reportDetails: false,
    infoCard: false
  },
  selectedRide: null,
  selectedUser: null,
  selectedRestStop: null,
  selectedReport: null,
  selectedInfoCard: null,
  openModal: () => {},
  closeModal: () => {},
  openRideDetails: () => {},
  openUserProfile: () => {},
  openUserReviews: () => {},
  openRestStopEdit: () => {},
  openReportDetails: () => {},
  openInfoCard: () => {},
  isAnyModalOpen: false
});

interface ModalsProviderProps {
  children: ReactNode;
}

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {
  const [activeModals, setActiveModals] = useState<Record<ModalType, boolean>>({
    login: false,
    rideDetails: false,
    message: false,
    messages: false,
    terms: false,
    complaint: false,
    orders: false,
    profile: false,
    offerRide: false,
    myRides: false,
    notifications: false,
    chat: false,
    booking: false,
    contact: false,
    reviews: false,
    adminLogin: false,
    adminDashboard: false,
    createRestStop: false,
    editRestStop: false,
    currentRides: false,
    reportDetails: false,
    infoCard: false
  });

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedRestStop, setSelectedRestStop] = useState<any | null>(null);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedInfoCard, setSelectedInfoCard] = useState<InfoCardData | null>(null);
  
  const openModal = (modal: ModalType) => {
    setActiveModals((prev) => ({ ...prev, [modal]: true }));
  };
  
  const closeModal = (modal: ModalType) => {
    setActiveModals((prev) => ({ ...prev, [modal]: false }));

    if (modal === 'rideDetails') {
      setSelectedRide(null);
    }

    if (modal === 'profile') {
      setSelectedUser(null);
    }

    if (modal === 'editRestStop') {
      setSelectedRestStop(null);
    }

    if (modal === 'reportDetails') {
      setSelectedReport(null);
    }

    if (modal === 'infoCard') {
      setSelectedInfoCard(null);
    }

    if (modal === 'adminDashboard') {
      setActiveModals((prev) => ({ ...prev, adminLogin: false }));
    }
  };

  const openRideDetails = (ride: Ride) => {
    setSelectedRide(ride);
    openModal('rideDetails');
  };
  
  const openUserProfile = (user: UserProfile) => {
    setSelectedUser(user);
    openModal('profile');
  };

  const openUserReviews = (user: UserProfile) => {
    setSelectedUser(user);
    openModal('reviews');
  };

  const openRestStopEdit = (restStop: any) => {
    setSelectedRestStop(restStop);
    openModal('editRestStop');
  };

  const openReportDetails = (report: any) => {
    setSelectedReport(report);
    openModal('reportDetails');
  };

  const openInfoCard = (card: InfoCardData) => {
    setSelectedInfoCard(card);
    openModal('infoCard');
  };

  const isAnyModalOpen = Object.values(activeModals).some(Boolean);
  
  return (
    <ModalsContext.Provider
      value={{
        activeModals,
        selectedRide,
        selectedUser,
        selectedRestStop,
        selectedReport,
        selectedInfoCard,
        openModal,
        closeModal,
        openRideDetails,
        openUserProfile,
        openUserReviews,
        openRestStopEdit,
        openReportDetails,
        openInfoCard,
        isAnyModalOpen
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};