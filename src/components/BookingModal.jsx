import React, { useState, useEffect } from 'react';
import { Icon, Button } from './Primitives';
import { useCatalog } from './CatalogContext';
import { getTodayInBudapest, isAtLeast18On } from '../lib/ageValidation';

export function BookingModal({ bookingData, onClose, onConfirm }) {
  const { fleet, accessories, timeOptions } = useCatalog();
  const [step, setStep] = useState(1); // 1: Contact details, 2: Document/Contract details
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [step1Error, setStep1Error] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  // Dynamic booking data state which can be edited inside the modal
  const [currentBooking, setCurrentBooking] = useState(bookingData);
  const [step1Data, setStep1Data] = useState(null);

  // Step 1 states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [agree, setAgree] = useState(false);

  // Step 2 states
  const [idCardNumber, setIdCardNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [ageError, setAgeError] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // Editing summary states
  const [isEditingSummary, setIsEditingSummary] = useState(
    !bookingData.startDate || !bookingData.endDate || bookingData.days === 0
  );
  const [editVehicleId, setEditVehicleId] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editPickupTime, setEditPickupTime] = useState('08:00');
  const [editEndDate, setEditEndDate] = useState('');
  const [editReturnTime, setEditReturnTime] = useState('08:00');
  const [editDeliveryOption, setEditDeliveryOption] = useState('telephely');
  const [editDays, setEditDays] = useState(0);
  const [editTotalPrice, setEditTotalPrice] = useState(0);

  // Initialize summary editor values when toggling editor
  useEffect(() => {
    if (currentBooking) {
      setEditVehicleId(currentBooking.vehicleId);
      setEditStartDate(currentBooking.startDate || '');
      setEditPickupTime(currentBooking.pickupTime || '08:00');
      setEditEndDate(currentBooking.endDate || '');
      setEditReturnTime(currentBooking.returnTime || '08:00');
      setEditDeliveryOption(currentBooking.deliveryOption || 'telephely');
      setEditDays(currentBooking.days || 0);
      setEditTotalPrice(currentBooking.totalPrice || 0);
    }
  }, [isEditingSummary, currentBooking]);

  // Calculate days and price dynamically in editor
  useEffect(() => {
    if (editStartDate && editEndDate) {
      const start = new Date(`${editStartDate}T${editPickupTime}`);
      const end = new Date(`${editEndDate}T${editReturnTime}`);
      
      if (end > start) {
        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);
        const calculatedDays = Math.ceil(diffHours / 24);
        setEditDays(calculatedDays);
        
        if (currentBooking.isAccessory) {
          const selectedAccessory = accessories.find(a => a.id === editVehicleId) || accessories[0];
          let pricePerDay = 0;
          if (selectedAccessory.id === 'thule-jetbag-3000') {
            if (calculatedDays <= 3) pricePerDay = 2500;
            else if (calculatedDays <= 7) pricePerDay = 2000;
            else pricePerDay = 1500;
          } else {
            pricePerDay = parseInt(selectedAccessory.price.replace(/\s/g, ''), 10);
          }
          let total = calculatedDays * pricePerDay;
          setEditTotalPrice(total);
        } else {
          const selectedVehicle = fleet.find(f => f.id === editVehicleId) || fleet[0];
          const pricePerDay = parseInt(selectedVehicle.price.replace(/\s/g, ''), 10);
          let total = calculatedDays * pricePerDay;
          
          if (editDeliveryOption === 'hazhoz') {
            total += 10000;
          }
          setEditTotalPrice(total);
        }
      } else {
        setEditDays(0);
        setEditTotalPrice(0);
      }
    } else {
      setEditDays(0);
      setEditTotalPrice(0);
    }
  }, [editStartDate, editPickupTime, editEndDate, editReturnTime, editDeliveryOption, editVehicleId, currentBooking.isAccessory, accessories, fleet]);

  const handleSaveSummaryEdit = (e) => {
    e.preventDefault();
    if (!editStartDate || !editEndDate) {
      window.dispatchEvent(new CustomEvent('vantogoToast', { detail: 'Kérjük, válaszd ki a dátumokat!' }));
      return;
    }

    const start = new Date(`${editStartDate}T${editPickupTime}`);
    const end = new Date(`${editEndDate}T${editReturnTime}`);
    if (end <= start) {
      window.dispatchEvent(new CustomEvent('vantogoToast', { detail: 'A leadási időpontnak az átvétel után kell lennie!' }));
      return;
    }

    const selectedItem = currentBooking.isAccessory
      ? (accessories.find(a => a.id === editVehicleId) || accessories[0])
      : (fleet.find(f => f.id === editVehicleId) || fleet[0]);

    // Update current booking state locally
    const updatedBooking = {
      ...currentBooking,
      vehicleId: editVehicleId,
      vehicleName: selectedItem.name,
      startDate: editStartDate,
      pickupTime: editPickupTime,
      endDate: editEndDate,
      returnTime: editReturnTime,
      deliveryOption: editDeliveryOption,
      days: editDays,
      totalPrice: editTotalPrice
    };

    setCurrentBooking(updatedBooking);
    setIsEditingSummary(false);
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setStep1Error('');
    if (!agree) {
      window.dispatchEvent(new CustomEvent('vantogoToast', { detail: 'A foglaláshoz el kell fogadnod az adatkezelési tájékoztatót!' }));
      return;
    }

    // Use currentBooking (which might have been edited)
    const data = {
      ...currentBooking,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerNote: note,
      companyWebsite,
      privacyAccepted: agree,
      submittedAt: new Date().toISOString()
    };

    // Store step 1 data
    setStep1Data(data);
    setStep(2);
  };

  const submitBooking = async (finalData) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      await onConfirm?.(finalData);
      setSuccess(true);
    } catch (error) {
      const message = error.message || 'Az ajánlatkérés mentése nem sikerült.';
      if (error.field === 'birthDate') {
        setAgeError(message);
      } else if (['customerName', 'customerEmail', 'customerPhone', 'privacyAccepted', 'booking'].includes(error.field)) {
        setStep1Error(message);
        setStep(1);
      } else {
        setSubmitError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validateVehicleAge = (dateOfBirth = birthDate) => {
    if (currentBooking.isAccessory) {
      setAgeError('');
      return true;
    }

    if (!dateOfBirth) {
      setAgeError('Az életkor ellenőrzéséhez add meg a születési idődet.');
      return false;
    }

    if (!isAtLeast18On(dateOfBirth, getTodayInBudapest())) {
      setAgeError('18 év alattiak nem tudnak foglalni.');
      return false;
    }

    setAgeError('');
    return true;
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!validateVehicleAge()) return;

    const s1Data = step1Data || currentBooking;
    
    const finalData = {
      ...s1Data,
      idCardNumber,
      licenseNumber,
      birthPlace,
      birthDate,
      customerZip: zip,
      customerCity: city,
      customerAddress: address,
      hasDocumentsProvided: true
    };

    await submitBooking(finalData);
  };

  const handleSkipStep2 = async () => {
    if (!validateVehicleAge()) return;

    const s1Data = step1Data || currentBooking;
    const finalData = {
      ...s1Data,
      birthDate,
      hasDocumentsProvided: false
    };

    await submitBooking(finalData);
  };

  if (!bookingData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {step === 1 && !success && (
          <button className="modal-close" onClick={onClose} aria-label="Bezárás">
            <Icon name="x" size={24} />
          </button>
        )}

        {success ? (
          <div style={{ textAlign: 'center', paddingBlock: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--go-50)', color: 'var(--go-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Icon name="check" size={32} stroke={3} />
            </div>
            <h2 className="modal-title">Ajánlatkérés véglegesítve!</h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.55', marginBottom: '28px' }}>
              Köszönjük érdeklődésedet! Rendszerünk sikeresen rögzítette az ajánlatot. 
              Munkatársunk hamarosan felveszi veled a kapcsolatot a megadott elérhetőségeken a részletekkel és a szerződéssel kapcsolatban.
            </p>
            <Button variant="primary" className="btn--block" onClick={onClose}>
              Bezárás
            </Button>
          </div>
        ) : step === 1 ? (
          <div>
            <h2 className="modal-title">Ajánlatkérés kezdeményezése</h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '14.5px', marginBottom: '20px' }}>
              Kérjük, add meg a kapcsolattartási adataidat az ajánlat elkészítéséhez.
            </p>

            {step1Error && (
              <div role="alert" style={{ background: 'var(--danger-bg)', color: 'var(--danger)', border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px', fontSize: '14px', lineHeight: 1.45 }}>
                <strong style={{ display: 'block', marginBottom: '3px' }}>Ezt az adatot ellenőrizd:</strong>
                {step1Error}
              </div>
            )}

            {/* Dátum & jármű szerkesztő mód a modalon belül */}
            {isEditingSummary ? (
              <form onSubmit={handleSaveSummaryEdit} style={{ background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '16px', marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, color: 'var(--go-800)', marginBottom: '12px', fontSize: '15px' }}>
                  Foglalási adatok módosítása
                </div>

                <div className="fields" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="field">
                    <label>{currentBooking.isAccessory ? 'Kiegészítő kiválasztása' : 'Kisbusz kiválasztása'}</label>
                    <select 
                      className="select" 
                      value={editVehicleId}
                      onChange={(e) => setEditVehicleId(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      {currentBooking.isAccessory 
                        ? accessories.map(a => <option key={a.id} value={a.id}>{a.name}</option>)
                        : fleet.map(f => <option key={f.id} value={f.id}>{f.name}</option>)
                      }
                    </select>
                  </div>

                  <div className="datetime-grid">
                    <div className="field">
                      <label>Átvétel dátuma</label>
                      <input
                        type="date"
                        className="input"
                        required
                        value={editStartDate}
                        onChange={(e) => setEditStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="field">
                      <label>Időpont</label>
                      <select
                        className="select"
                        value={editPickupTime}
                        onChange={(e) => setEditPickupTime(e.target.value)}
                      >
                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="datetime-grid">
                    <div className="field">
                      <label>Leadás dátuma</label>
                      <input
                        type="date"
                        className="input"
                        required
                        value={editEndDate}
                        onChange={(e) => setEditEndDate(e.target.value)}
                        min={editStartDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="field">
                      <label>Időpont</label>
                      <select
                        className="select"
                        value={editReturnTime}
                        onChange={(e) => setEditReturnTime(e.target.value)}
                      >
                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Átvétel módja</label>
                    {currentBooking.isAccessory ? (
                      <div 
                        className="seg-toggle" 
                        style={{ 
                          margin: '8px 0 0', 
                          background: 'var(--paper-2)', 
                          border: '1px solid var(--line)', 
                          padding: '4px',
                          pointerEvents: 'none'
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            background: 'var(--card)',
                            color: 'var(--go-700)',
                            boxShadow: 'var(--shadow-xs)',
                            fontWeight: 700,
                            fontSize: '14px',
                            flex: 1,
                            borderRadius: 'var(--r-pill)',
                            border: 'none',
                            padding: '9px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <Icon name="map-pin" size={14} style={{ color: 'var(--go-600)' }} />
                          Csak a telephelyen
                        </button>
                      </div>
                    ) : (
                      <div className="seg-toggle" style={{ margin: '8px 0 0' }}>
                        <button
                          type="button"
                          className={editDeliveryOption === 'telephely' ? 'active' : ''}
                          onClick={() => setEditDeliveryOption('telephely')}
                        >
                          Telephelyen
                        </button>
                        <button
                          type="button"
                          className={editDeliveryOption === 'hazhoz' ? 'active' : ''}
                          onClick={() => setEditDeliveryOption('hazhoz')}
                        >
                          Házhozszállítás
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {editDays > 0 && (
                  <div style={{ marginTop: '14px', fontSize: '13.5px', color: 'var(--go-800)', fontWeight: 600 }}>
                    Kalkulált bérlet: {editDays} nap = {editTotalPrice.toLocaleString('hu-HU')} Ft
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <Button type="submit" variant="primary" size="sm" style={{ flex: 1, justifyContent: 'center' }}>
                    Mentés
                  </Button>
                  <Button type="button" variant="ghost" size="sm" style={{ flex: 1, border: '1px solid var(--line)', justifyContent: 'center' }} onClick={() => setIsEditingSummary(false)}>
                    Mégse
                  </Button>
                </div>
              </form>
            ) : (
              /* Drap (homokszínű) foglalási összesítő doboz - KATTINTHATÓ */
              <div 
                className="modal-summary" 
                onClick={() => setIsEditingSummary(true)} 
                title="Kattints a dátumok vagy jármű szerkesztéséhez"
                style={{ 
                  cursor: 'pointer', 
                  transition: 'background var(--dur), border-color var(--dur)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--paper)';
                  e.currentTarget.style.borderColor = 'var(--line-2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--paper-2)';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                <span style={{ 
                  float: 'right', 
                  fontSize: '12.5px', 
                  color: 'var(--go-600)', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  background: 'rgba(31, 138, 84, 0.08)',
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}>
                  <Icon name="edit" size={13} /> Módosítás
                </span>

                <div style={{ fontWeight: 700, color: 'var(--go-800)', marginBottom: '10px', fontSize: '15px', maxWidth: '70%' }}>
                  {currentBooking.vehicleName}
                </div>
                <div className="modal-summary-row">
                  <span>Időtartam:</span>
                  <span style={{ fontWeight: 600 }}>
                    {currentBooking.startDate ? `${currentBooking.startDate} ${currentBooking.pickupTime} — ${currentBooking.endDate} ${currentBooking.returnTime}` : 'Nincs kiválasztva'} ({currentBooking.days} nap)
                  </span>
                </div>
                <div className="modal-summary-row">
                  <span>Átvétel módja:</span>
                  <span style={{ fontWeight: 600 }}>
                    {currentBooking.deliveryOption === 'hazhoz' ? 'Házhozszállítás' : 'Telephelyen'}
                  </span>
                </div>
                {currentBooking.totalPrice > 0 && (
                  <div className="modal-summary-row" style={{ borderTop: '1px solid var(--line)', paddingTop: '6px', marginTop: '6px', fontWeight: 700 }}>
                    <span>Végösszeg:</span>
                    <span style={{ color: 'var(--go-800)' }}>
                      {currentBooking.totalPrice.toLocaleString('hu-HU')} Ft
                    </span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleStep1Submit}>
              <div className="fields" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <label>Weboldal</label>
                  <input
                    type="text"
                    name="companyWebsite"
                    tabIndex="-1"
                    autoComplete="off"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Teljes név</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Minta János"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>E-mail cím</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="janos@minta.hu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Telefonszám</label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+36 30 123 4567"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Megjegyzés / Egyedi kérések (opcionális)</label>
                  <textarea
                    className="input"
                    placeholder="Pl. tetőboxot szeretnék kérni, gyermekülés igénye stb."
                    rows="3"
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <label className="check" style={{ marginTop: '6px' }}>
                  <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span style={{ fontSize: '13px', lineHeight: '1.4' }}>
                    Elfogadom az <a href="/adatvedelem/" target="_blank" rel="noreferrer" style={{ display: 'inline', padding: 0, textDecoration: 'underline', color: 'var(--go-600)' }}>adatkezelési tájékoztatót</a> és hozzájárulok az adataim kezeléséhez.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="accent"
                className="btn--block"
                style={{ marginTop: '24px', paddingBlock: '12px' }}
                icon="arrow-right"
                disabled={isEditingSummary} // Disable step navigation when editing dates locally
              >
                Tovább a szerződésadatokhoz
              </Button>
            </form>
          </div>
        ) : (
          // STEP 2: Document info (Optional for contract prep)
          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon="arrow-left"
              onClick={() => {
                setSubmitError('');
                setAgeError('');
                setStep1Error('');
                setStep(1);
              }}
              disabled={submitting}
              style={{ minHeight: '44px', margin: '-8px 0 12px -8px', paddingInline: '10px' }}
            >
              Vissza
            </Button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--go-50)', border: '1px solid var(--go-100)', borderRadius: 'var(--r-lg)', padding: '14px', marginBottom: '20px' }}>
              <Icon name="check-circle" size={24} style={{ color: 'var(--go-600)', flex: 'none' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--go-800)', marginBottom: '2px' }}>
                  Az ajánlatkérés még nincs elküldve
                </strong>
                <span style={{ display: 'block', fontSize: '13px', color: 'var(--go-700)', lineHeight: '1.4' }}>
                  A bérleti szerződés gyors előkészítéséhez megadhatod az adatokat most, vagy elküldheted nélkülük az ajánlatkérést.
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', fontFamily: 'var(--font-display)' }}>Szerződéskötéshez szükséges adatok</h3>

            <form onSubmit={handleStep2Submit}>
              {submitError && (
                <div role="alert" style={{ background: 'var(--danger-bg)', color: 'var(--danger)', border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px', fontSize: '14px', lineHeight: 1.45 }}>
                  {submitError}
                </div>
              )}
              <div className="fields" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="field">
                    <label>Személyi igazolvány száma</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="123456AB"
                      required
                      value={idCardNumber}
                      onChange={(e) => setIdCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Jogosítvány száma</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="AB123456"
                      required
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="field">
                    <label>Születési hely</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Budapest"
                      required
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Születési idő</label>
                    <input
                      type="date"
                      className="input"
                      required
                      value={birthDate}
                      aria-invalid={Boolean(ageError)}
                      aria-describedby={ageError ? 'booking-age-error' : undefined}
                      onChange={(e) => {
                        const nextBirthDate = e.target.value;
                        setBirthDate(nextBirthDate);
                        if (ageError || nextBirthDate) validateVehicleAge(nextBirthDate);
                      }}
                    />
                    {ageError && (
                      <span
                        id="booking-age-error"
                        role="alert"
                        style={{ display: 'block', color: 'var(--danger)', fontSize: '13px', lineHeight: 1.4, marginTop: '6px' }}
                      >
                        {ageError}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '12px' }}>
                  <div className="field">
                    <label>Irányítószám</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="1108"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Város</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Budapest"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Lakcím (Utca, házszám, emelet/ajtó)</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Diósgyőri utca 14."
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '28px' }}>
                <Button
                  type="submit"
                  variant="accent"
                  className="btn--block"
                  style={{ paddingBlock: '12px' }}
                  icon="check"
                  disabled={submitting}
                >
                  {submitting ? 'Mentés folyamatban…' : 'Adatok mentése és befejezés'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="btn--block"
                  style={{ paddingBlock: '12px', border: '1px solid var(--line)' }}
                  onClick={handleSkipStep2}
                  disabled={submitting}
                >
                  Kihagyás és befejezés
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
