import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { LoginModal } from './modals/LoginModal';
import { RideDetailsModal } from './modals/RideDetailsModal';
import { MessageModal } from './modals/MessageModal';
import { MessagesModal } from './modals/MessagesModal';
import { TermsModal } from './modals/TermsModal';
import { ComplaintModal } from './modals/ComplaintModal';
import { OrdersModal } from './modals/OrdersModal';
import { ProfileModal } from './modals/ProfileModal';
import { MyRidesModal } from './modals/MyRidesModal';
import { OfferRideModal } from './modals/OfferRideModal';
import { NotificationsModal } from './modals/NotificationsModal';
import { ChatModal } from './modals/ChatModal';
import { BookingModal } from './modals/BookingModal';
import { ContactModal } from './modals/ContactModal';
import { ReviewsModal } from './modals/ReviewsModal';
import { RestStopDetailsModal } from './modals/RestStopDetailsModal';
import { AdminLoginModal } from './modals/AdminLoginModal';
import { AdminDashboardModal } from './modals/AdminDashboardModal';
import { CreateRestStopModal } from './modals/CreateRestStopModal';
import { EditRestStopModal } from './modals/EditRestStopModal';
import { ReportDetailsModal } from './modals/ReportDetailsModal';
import { InfoCardModal } from './modals/InfoCardModal';
import { useModals } from '../hooks/useModals';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeModals } = useModals();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {children}
      
      <Footer />

      {/* Modals */}
      {activeModals.login && <LoginModal />}
      {activeModals.rideDetails && <RideDetailsModal />}
      {activeModals.message && <MessageModal />}
      {activeModals.messages && <MessagesModal />}
      {activeModals.terms && <TermsModal />}
      {activeModals.complaint && <ComplaintModal />}
      {activeModals.orders && <OrdersModal />}
      {activeModals.profile && <ProfileModal />}
      {activeModals.offerRide && <OfferRideModal />}
      {activeModals.myRides && <MyRidesModal />}
      {activeModals.notifications && <NotificationsModal />}
      {activeModals.chat && <ChatModal />}
      {activeModals.booking && <BookingModal />}
      {activeModals.contact && <ContactModal />}
      {activeModals.reviews && <ReviewsModal />}
      {activeModals.adminLogin && <AdminLoginModal />}
      {activeModals.adminDashboard && <AdminDashboardModal />}
      {activeModals.createRestStop && <CreateRestStopModal />}
      {activeModals.editRestStop && <EditRestStopModal />}
      {activeModals.reportDetails && <ReportDetailsModal />}
      {activeModals.infoCard && <InfoCardModal />}
    </div>
  );
};