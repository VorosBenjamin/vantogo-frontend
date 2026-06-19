import React, { useState, useEffect } from 'react';
import { Icon, Button, SpecStat, Badge } from './Primitives';

// Generate time options in 30-minute intervals
const TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  const hourStr = h.toString().padStart(2, '0');
  TIME_OPTIONS.push(`${hourStr}:00`);
  TIME_OPTIONS.push(`${hourStr}:30`);
}

export function VehicleDetails({ v, onBack, onBook }) {
  const [activePhoto, setActivePhoto] = useState(v.photo);
  const [startDate, setStartDate] = useState('');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [endDate, setEndDate] = useState('');
  const [returnTime, setReturnTime] = useState('08:00');
  const [deliveryOption, setDeliveryOption] = useState('telephely'); // 'telephely' | 'hazhoz'
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update active photo when vehicle changes
  useEffect(() => {
    setActivePhoto(v.photo);
    setStartDate('');
    setPickupTime('08:00');
    setEndDate('');
    setReturnTime('08:00');
    setDays(0);
    setTotalPrice(0);
  }, [v]);

  // Calculate days and total price
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(`${startDate}T${pickupTime}`);
      const end = new Date(`${endDate}T${returnTime}`);
      
      if (end > start) {
        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);
        // Rule: Even 30 minutes over a whole day counts as another full day
        const calculatedDays = Math.ceil(diffHours / 24);
        
        setDays(calculatedDays);
        
        const pricePerDay = parseInt(v.price.replace(/\s/g, ''), 10);
        let total = calculatedDays * pricePerDay;
        
        // Add delivery fee if selected
        if (deliveryOption === 'hazhoz') {
          total += 10000; // Flat house delivery fee example
        }
        
        setTotalPrice(total);
      } else {
        setDays(0);
        setTotalPrice(0);
      }
    } else {
      setDays(0);
      setTotalPrice(0);
    }
  }, [startDate, pickupTime, endDate, returnTime, deliveryOption, v.price]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert('Kérjük, válaszd ki a bérlés kezdetét és végét!');
      return;
    }

    const start = new Date(`${startDate}T${pickupTime}`);
    const end = new Date(`${endDate}T${returnTime}`);
    if (end <= start) {
      alert('A leadás időpontjának az átvétel után kell lennie!');
      return;
    }
    
    // Call the parent booking flow with computed details
    onBook({
      vehicleId: v.id,
      vehicleName: v.name,
      startDate,
      pickupTime,
      endDate,
      returnTime,
      deliveryOption,
      days,
      totalPrice
    });
  };

  const formattedTotalPrice = totalPrice.toLocaleString('hu-HU') + ' Ft';

  return (
    <div className="view container section" style={{ paddingTop: '32px' }}>
      <div className="product-layout">
        {/* Bal oldali részletes specifikációk */}
        <div>
          <span className="eyebrow">
            <span className="dot"></span> {v.seats} · {v.trans}
          </span>
          <h1 style={{ marginTop: '4px', marginBottom: '16px' }}>{v.name}</h1>
          <p className="lead" style={{ color: 'var(--fg-muted)', marginBottom: '32px' }}>
            {v.tagline}
          </p>

          {/* Galéria */}
          <div className="gallery">
            <div className="main">
              <img src={activePhoto} alt={v.name} />
            </div>
            {v.gallery && v.gallery.length > 1 && (
              <div className="thumbs">
                {v.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={activePhoto === imgUrl ? 'active' : ''}
                    onClick={() => setActivePhoto(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${v.name} galéria ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifikációs statisztikák / Kártyák */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBlock: '40px' }}>
            <SpecStat icon="users" label="Férőhelyek" value={v.seats} />
            <SpecStat icon="cog" label="Váltó" value={v.trans} />
            <SpecStat icon="briefcase" label="Csomagtér" value={v.luggage} />
            <SpecStat icon="gauge" label="Napi km limit" value={v.km} />
          </div>

          {/* Részletes csempék */}
          <div className="spec-grid-tiles" style={{ borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
            <div className="spec-tile">
              <h4>
                <Icon name="info" size={18} /> Műszaki adatok
              </h4>
              <ul>
                <li>
                  <Icon name="check" size={14} className="ic" /> 
                  <span><strong>Üzemanyag:</strong> {v.fuel || 'Dízel'}</span>
                </li>
                <li>
                  <Icon name="check" size={14} className="ic" /> 
                  <span><strong>Fogyasztás:</strong> {v.consumption || '7.5 L / 100 km'}</span>
                </li>
                <li>
                  <Icon name="check" size={14} className="ic" /> 
                  <span><strong>Váltó típusa:</strong> {v.trans}</span>
                </li>
              </ul>
            </div>

            <div className="spec-tile">
              <h4>
                <Icon name="sparkles" size={18} /> Felszereltség
              </h4>
              <ul>
                <li>
                  <Icon name="check" size={14} className="ic" /> 
                  <span><strong>Klíma:</strong> {v.aircon || 'Van'}</span>
                </li>
                {v.extras && v.extras.map((extra, idx) => (
                  <li key={idx}>
                    <Icon name="check" size={14} className="ic" /> 
                    <span>{extra}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="spec-tile">
              <h4>
                <Icon name="shield-check" size={18} /> Bérlési feltételek
              </h4>
              <ul>
                <li>
                  <Icon name="info" size={14} className="ic" /> 
                  <span><strong>Kaució:</strong> {v.deposit || '200 000 Ft'} (visszajár)</span>
                </li>
                <li>
                  <Icon name="info" size={14} className="ic" /> 
                  <span><strong>Vezetői engedély:</strong> B kategória (min. 1 éve)</span>
                </li>
                <li>
                  <Icon name="info" size={14} className="ic" /> 
                  <span><strong>Biztosítás:</strong> CASCO &amp; Európai Assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jobb oldali sticky foglalási sziget */}
        <aside className="book-side">
          <div className="price-row">
            <span style={{ color: 'var(--fg-muted)', fontWeight: 600 }}>Bérleti díj</span>
            <div className="big">
              {v.price} <small>Ft / nap</small>
            </div>
          </div>
          
          <div className="note" style={{ marginBottom: '16px' }}>
            <Icon name="badge-percent" size={16} style={{ color: 'var(--amber-500)' }} />
            <span>Nincs rejtett költség, az árak bruttó árak.</span>
          </div>

          <form onSubmit={handleBookingSubmit}>
            <div className="fields">
              {/* Átvétel dátum + időpont egy sorban */}
              <div className="datetime-grid">
                <div className="field">
                  <label>Átvétel dátuma</label>
                  <input
                    type="date"
                    className="input"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="field">
                  <label>Időpont</label>
                  <select
                    className="select"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Leadás dátum + időpont egy sorban */}
              <div className="datetime-grid">
                <div className="field">
                  <label>Leadás dátuma</label>
                  <input
                    type="date"
                    className="input"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="field">
                  <label>Időpont</label>
                  <select
                    className="select"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                  >
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Átvétel módja</label>
                <div className="seg-toggle" style={{ margin: '8px 0 24px' }}>
                  <button
                    type="button"
                    className={deliveryOption === 'telephely' ? 'active' : ''}
                    onClick={() => setDeliveryOption('telephely')}
                  >
                    Telephelyen
                  </button>
                  <button
                    type="button"
                    className={deliveryOption === 'hazhoz' ? 'active' : ''}
                    onClick={() => setDeliveryOption('hazhoz')}
                  >
                    Házhozszállítás
                  </button>
                </div>
              </div>
            </div>

            {/* Ár kalkuláció összegző szekció */}
            {days > 0 && (
              <div style={{ marginBlock: '20px', padding: '16px', background: 'var(--paper-2)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                  <span>Napi bérlet ({days} nap):</span>
                  <span style={{ fontWeight: 600 }}>{(days * parseInt(v.price.replace(/\s/g, ''), 10)).toLocaleString('hu-HU')} Ft</span>
                </div>
                {deliveryOption === 'hazhoz' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                    <span>Házhozszállítás díja:</span>
                    <span style={{ fontWeight: 600 }}>10 000 Ft</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px', color: 'var(--go-800)' }}>
                  <span>Végösszeg:</span>
                  <span>{formattedTotalPrice}</span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              className="btn--block"
              style={{ marginTop: '16px', paddingBlock: '14px' }}
              icon="calendar-check"
            >
              Foglalás kezdeményezése
            </Button>
          </form>

          <div className="note" style={{ marginTop: '16px', justifyContent: 'center' }}>
            <Icon name="shield-check" size={14} className="ic" style={{ color: 'var(--go-600)' }} />
            <span>Biztonságos foglalás · CASCO biztosítással</span>
          </div>
        </aside>
      </div>

      {/* Mobil fix foglalási sáv */}
      <div className="mobile-book-bar">
        <div>
          <div className="price">
            {v.price} <small style={{ fontSize: '12px', fontWeight: 500, color: 'var(--fg-muted)' }}>Ft / nap</small>
          </div>
          {days > 0 && (
            <div style={{ fontSize: '13px', color: 'var(--go-700)', fontWeight: 700 }}>
              Összesen: {formattedTotalPrice} ({days} nap)
            </div>
          )}
        </div>
        <Button variant="accent" icon="calendar-check" onClick={handleBookingSubmit}>
          {days > 0 ? 'Foglalás' : 'Foglalási adatok'}
        </Button>
      </div>
    </div>
  );
}
