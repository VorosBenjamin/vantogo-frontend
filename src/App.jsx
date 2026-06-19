import React, { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { VehicleDetails } from './components/VehicleDetails';
import { BookingModal } from './components/BookingModal';
import { FleetPage } from './components/FleetPage';
import { FAQPage } from './components/FAQPage';
import { ASZFPage } from './components/ASZFPage';
import { FLEET } from './components/data';
import './styles.css';

export function VanToGoApp() {
  const [view, setView] = useState('home'); // 'home' | 'fleet' | 'faq' | 'aszf' | 'vehicle-details'
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingData, setBookingData] = useState(null); // When not null, opens BookingModal

  const scrollToAnchor = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigate = (id) => {
    console.log('Navigating to:', id);
    
    // In Wix environment, we also dispatch an event
    window.dispatchEvent(new CustomEvent('vantogoNavigate', { detail: id }));

    if (id === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'fleet') {
      setView('fleet');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'faq') {
      setView('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'aszf') {
      setView('aszf');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'segments') {
      // If we want to view segments, they are on the Home page, so switch to home first
      if (view !== 'home') {
        setView('home');
        // Wait for React to render the Home view before scrolling
        setTimeout(() => {
          scrollToAnchor('segments-anchor');
        }, 100);
      } else {
        scrollToAnchor('segments-anchor');
      }
    }
  };

  const openVehicle = (vehicle) => {
    console.log('Opening vehicle:', vehicle);
    setSelectedVehicle(vehicle);
    setView('vehicle-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when clicking "Foglalj most" globally
  const handleGlobalBook = () => {
    // If we are already viewing a vehicle, use it
    const vehicle = selectedVehicle || FLEET[0];
    setBookingData({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      startDate: '',
      pickupTime: '08:00',
      endDate: '',
      returnTime: '08:00',
      deliveryOption: 'telephely',
      days: 0,
      totalPrice: 0
    });
  };

  // Called from VehicleDetails form submit with computed prices/days
  const handleVehicleBook = (computedData) => {
    setBookingData(computedData);
  };

  // Called when customer submits the final form inside the Modal
  const handleConfirmBooking = (finalBookingData) => {
    console.log('Final booking confirmed:', finalBookingData);
    
    // Dispatch custom event for Wix Velo to capture and save to database
    const event = new CustomEvent('vantogoBookingSubmit', {
      detail: finalBookingData
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="app-scroll" style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <Header current={view} navigate={navigate} onBook={handleGlobalBook} />
      
      {view === 'home' && (
        <Home navigate={navigate} openVehicle={openVehicle} onBook={handleGlobalBook} />
      )}
      
      {view === 'fleet' && (
        <FleetPage openVehicle={openVehicle} />
      )}
      
      {view === 'faq' && (
        <FAQPage navigate={navigate} />
      )}

      {view === 'aszf' && (
        <ASZFPage navigate={navigate} />
      )}
      
      {view === 'vehicle-details' && (
        <VehicleDetails 
          v={selectedVehicle} 
          onBack={() => navigate('fleet')} 
          onBook={handleVehicleBook} 
        />
      )}
      
      <Footer navigate={navigate} />

      {bookingData && (
        <BookingModal 
          bookingData={bookingData} 
          onClose={() => setBookingData(null)} 
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

// Ensure propTypes are set for react-to-webcomponent compatibility
import PropTypes from 'prop-types';
VanToGoApp.propTypes = {};
export default VanToGoApp;
