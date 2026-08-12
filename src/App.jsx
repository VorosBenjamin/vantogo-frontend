import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { VehicleDetails } from './components/VehicleDetails';
import { BookingModal } from './components/BookingModal';
import { FleetPage } from './components/FleetPage';
import { FAQPage } from './components/FAQPage';
import { ASZFPage } from './components/ASZFPage';
import { AdatvedelemPage } from './components/AdatvedelemPage';
import { ContactPage } from './components/ContactPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { AccessoryDetails } from './components/AccessoryDetails';
import { CatalogProvider, useCatalog } from './components/CatalogContext';
import { Toast } from './components/Toast';
import './styles.css';

const ROUTES = {
  home: '/',
  fleet: '/autok/',
  accessories: '/kiegeszitok/',
  segments: '/#kinek',
  faq: '/gyik/',
  contact: '/kapcsolat/',
  aszf: '/aszf/',
  privacy: '/adatvedelem/',
};

function VanToGoShell({ initialView = 'home', selectedId = '' }) {
  const { fleet, accessories } = useCatalog();
  const [view] = useState(initialView);
  const [bookingData, setBookingData] = useState(null); // When not null, opens BookingModal
  const [searchParams, setSearchParams] = useState({ 
    startDate: '', 
    endDate: '',
    pickupTime: '08:00',
    returnTime: '08:00'
  });

  const selectedVehicle = useMemo(
    () => fleet.find((vehicle) => vehicle.id === selectedId) ?? (selectedId ? null : fleet[0] ?? null),
    [fleet, selectedId],
  );
  const selectedAccessory = useMemo(
    () => accessories.find((accessory) => accessory.id === selectedId) ?? (selectedId ? null : accessories[0] ?? null),
    [accessories, selectedId],
  );

  const navigate = (id) => {
    const target = ROUTES[id] || ROUTES.home;
    window.location.assign(target);
  };

  const openVehicle = (vehicle) => {
    window.location.assign(`/autok/${encodeURIComponent(vehicle.id)}/`);
  };

  const openAccessory = (accessory) => {
    window.location.assign(`/kiegeszitok/${encodeURIComponent(accessory.id)}/`);
  };

  // Called when clicking "Foglalj most" globally
  const handleGlobalBook = () => {
    // If we are already viewing a vehicle, use it
    const vehicle = selectedVehicle || fleet[0];
    if (!vehicle) return;
    setBookingData({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      startDate: searchParams.startDate || '',
      pickupTime: searchParams.pickupTime || '08:00',
      endDate: searchParams.endDate || '',
      returnTime: searchParams.returnTime || '08:00',
      deliveryOption: 'telephely',
      days: 0,
      totalPrice: 0
    });
  };

  // Called from VehicleDetails/AccessoryDetails form submit with computed prices/days
  const handleVehicleBook = (computedData) => {
    setBookingData(computedData);
  };

  const handleConfirmBooking = async (finalBookingData) => {
    const response = await fetch('/api/rental-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(finalBookingData),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(result.error || 'Az ajánlatkérés mentése nem sikerült.');
      error.code = result.code;
      error.field = result.field;
      throw error;
    }
    return result;
  };

  return (
    <div className="app-scroll" style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <Header current={view} navigate={navigate} onBook={handleGlobalBook} />
      
      {view === 'home' && (
        <Home 
          navigate={navigate} 
          openVehicle={openVehicle} 
          onBook={handleGlobalBook} 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
      
      {view === 'fleet' && (
        <FleetPage openVehicle={openVehicle} />
      )}

      {view === 'accessories' && (
        <AccessoriesPage openAccessory={openAccessory} />
      )}
      
      {view === 'faq' && (
        <FAQPage navigate={navigate} />
      )}

      {view === 'aszf' && (
        <ASZFPage navigate={navigate} />
      )}

      {view === 'privacy' && (
        <AdatvedelemPage navigate={navigate} />
      )}

      {view === 'contact' && (
        <ContactPage navigate={navigate} />
      )}
      
      {view === 'vehicle-details' && (
        selectedVehicle ? <VehicleDetails 
          v={selectedVehicle} 
          onBack={() => navigate('fleet')} 
          onBook={handleVehicleBook} 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        /> : <MissingItem kind="jármű" />
      )}

      {view === 'accessory-details' && (
        selectedAccessory ? <AccessoryDetails 
          a={selectedAccessory} 
          onBack={() => navigate('accessories')} 
          onBook={handleVehicleBook} 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        /> : <MissingItem kind="kiegészítő" />
      )}
      
      <Footer navigate={navigate} />

      {bookingData && (
        <BookingModal 
          bookingData={bookingData} 
          onClose={() => setBookingData(null)} 
          onConfirm={handleConfirmBooking}
        />
      )}
      <Toast />
    </div>
  );
}

function MissingItem({ kind }) {
  return (
    <section className="container section" style={{ minHeight: '55vh', textAlign: 'center' }}>
      <h1>Ez a {kind} nem található</h1>
      <p style={{ color: 'var(--fg-muted)', marginBottom: '24px' }}>Lehet, hogy az oldal címe megváltozott, vagy a tétel már nem elérhető.</p>
      <a className="btn btn--primary" href={kind === 'jármű' ? '/autok/' : '/kiegeszitok/'}>Vissza a kínálathoz</a>
    </section>
  );
}

export function VanToGoApp({ initialCatalog, ...props }) {
  return (
    <CatalogProvider initialCatalog={initialCatalog}>
      <VanToGoShell {...props} />
    </CatalogProvider>
  );
}

VanToGoApp.propTypes = {
  initialView: PropTypes.string,
  selectedId: PropTypes.string,
  initialCatalog: PropTypes.shape({
    fleet: PropTypes.array,
    accessories: PropTypes.array,
    source: PropTypes.string,
  }),
};

export default VanToGoApp;
