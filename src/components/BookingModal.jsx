import React, { useState, useEffect } from 'react';
import { Icon, Button } from './Primitives';
import { FLEET } from './data';

// Generate time options in 30-minute intervals
const TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  const hourStr = h.toString().padStart(2, '0');
  TIME_OPTIONS.push(`${hourStr}:00`);
  TIME_OPTIONS.push(`${hourStr}:30`);
}

export function BookingModal({ bookingData, onClose, onConfirm }) {
  const [step, setStep] = useState(1); // 1: Contact details, 2: Document/Contract details
  const [success, setSuccess] = useState(false);

  // Dynamic booking data state which can be edited inside the modal
  const [currentBooking, setCurrentBooking] = useState(bookingData);

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
        
        const selectedVehicle = FLEET.find(f => f.id === editVehicleId) || FLEET[0];
        const pricePerDay = parseInt(selectedVehicle.price.replace(/\s/g, ''), 10);
        let total = calculatedDays * pricePerDay;
        
        if (editDeliveryOption === 'hazhoz') {
          total += 10000;
        }
        setEditTotalPrice(total);
      } else {
        setEditDays(0);
        setEditTotalPrice(0);
      }
    } else {
      setEditDays(0);
      setEditTotalPrice(0);
    }
  }, [editStartDate, editPickupTime, editEndDate, editReturnTime, editDeliveryOption, editVehicleId]);

  const handleSaveSummaryEdit = (e) => {
    e.preventDefault();
    if (!editStartDate || !editEndDate) {
      alert('Kérjük, válaszd ki a dátumokat!');
      return;
    }

    const start = new Date(`${editStartDate}T${editPickupTime}`);
    const end = new Date(`${editEndDate}T${editReturnTime}`);
    if (end <= start) {
      alert('A leadási időpontnak az átvétel után kell lennie!');
      return;
    }

    const selectedVehicle = FLEET.find(f => f.id === editVehicleId) || FLEET[0];

    // Update current booking state locally
    const updatedBooking = {
      vehicleId: editVehicleId,
      vehicleName: selectedVehicle.name,
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
    if (!agree) {
      alert('A foglaláshoz el kell fogadnod az adatkezelési tájékoztatót!');
      return;
    }

    // Use currentBooking (which might have been edited)
    const data = {
      ...currentBooking,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerNote: note,
      submittedAt: new Date().toISOString()
    };

    // Store step 1 data
    localStorage.setItem('vantogo_step1_backup', JSON.stringify(data)); // optional local backup
    setStep(2);
  };

  const getStep1DataFromBackup = () => {
    const backup = localStorage.getItem('vantogo_step1_backup');
    return backup ? JSON.parse(backup) : currentBooking;
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const s1Data = getStep1DataFromBackup();
    
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

    if (onConfirm) {
      onConfirm(finalData);
    }
    setSuccess(true);
    localStorage.removeItem('vantogo_step1_backup');
  };

  const handleSkipStep2 = () => {
    const s1Data = getStep1DataFromBackup();
    const finalData = {
      ...s1Data,
      hasDocumentsProvided: false
    };

    if (onConfirm) {
      onConfirm(finalData);
    }
    setSuccess(true);
    localStorage.removeItem('vantogo_step1_backup');
  };

  if (!bookingData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Bezárás">
          <Icon name="x" size={20} />
        </button>

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

            {/* Dátum & jármű szerkesztő mód a modalon belül */}
            {isEditingSummary ? (
              <form onSubmit={handleSaveSummaryEdit} style={{ background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '16px', marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, color: 'var(--go-800)', marginBottom: '12px', fontSize: '15px' }}>
                  Foglalási adatok módosítása
                </div>

                <div className="fields" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="field">
                    <label>Kisbusz kiválasztása</label>
                    <select 
                      className="select" 
                      value={editVehicleId}
                      onChange={(e) => setEditVehicleId(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      {FLEET.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
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
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
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
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Átvétel módja</label>
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
                    Elfogadom az <a href="#" target="_blank" style={{ display: 'inline', padding: 0, textDecoration: 'underline', color: 'var(--go-600)' }}>adatkezelési tájékoztatót</a> és hozzájárulok az adataim kezeléséhez.
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
                Ajánlatkérés elküldése
              </Button>
            </form>
          </div>
        ) : (
          // STEP 2: Document info (Optional for contract prep)
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--go-50)', border: '1px solid var(--go-100)', borderRadius: 'var(--r-lg)', padding: '14px', marginBottom: '20px' }}>
              <Icon name="check-circle" size={24} style={{ color: 'var(--go-600)', flex: 'none' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--go-800)', marginBottom: '2px' }}>
                  Az érdeklődésedet rögzítettük! 🎉
                </strong>
                <span style={{ display: 'block', fontSize: '13px', color: 'var(--go-700)', lineHeight: '1.4' }}>
                  A bérleti szerződés gyors előkészítéséhez és a helyszíni átvétel felgyorsításához megadhatod a bérléshez szükséges adatokat most is.
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', fontFamily: 'var(--font-display)' }}>Szerződéskötéshez szükséges adatok</h3>

            <form onSubmit={handleStep2Submit}>
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
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
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
                >
                  Adatok mentése és befejezés
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="btn--block"
                  style={{ paddingBlock: '12px', border: '1px solid var(--line)' }}
                  onClick={handleSkipStep2}
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
