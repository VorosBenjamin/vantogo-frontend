import React, { useState, useEffect } from 'react';
import { Icon, Button, SpecStat } from './Primitives';

// Generate time options in 30-minute intervals
const TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  const hourStr = h.toString().padStart(2, '0');
  TIME_OPTIONS.push(`${hourStr}:00`);
  TIME_OPTIONS.push(`${hourStr}:30`);
}

export function AccessoryDetails({ a, onBack, onBook }) {
  const [startDate, setStartDate] = useState('');
  const [pickupTime, setPickupTime] = useState('08:00');
  const [endDate, setEndDate] = useState('');
  const [returnTime, setReturnTime] = useState('08:00');
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Reset values when accessory changes
  useEffect(() => {
    setStartDate('');
    setPickupTime('08:00');
    setEndDate('');
    setReturnTime('08:00');
    setDays(0);
    setTotalPrice(0);
  }, [a]);

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
        
        let pricePerDay = 0;
        if (a.id === 'thule-jetbag-3000') {
          if (calculatedDays <= 3) pricePerDay = 2500;
          else if (calculatedDays <= 7) pricePerDay = 2000;
          else pricePerDay = 1500; // 8+ days
        } else {
          pricePerDay = parseInt(a.price.replace(/\s/g, ''), 10);
        }
        
        let total = calculatedDays * pricePerDay;
        setTotalPrice(total);
      } else {
        setDays(0);
        setTotalPrice(0);
      }
    } else {
      setDays(0);
      setTotalPrice(0);
    }
  }, [startDate, pickupTime, endDate, returnTime, a.price, a.id]);

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
      vehicleId: a.id,
      vehicleName: a.name,
      startDate,
      pickupTime,
      endDate,
      returnTime,
      deliveryOption: 'telephely',
      days,
      totalPrice,
      isAccessory: true
    });
  };

  const formattedTotalPrice = totalPrice.toLocaleString('hu-HU') + ' Ft';

  return (
    <div className="view container section" style={{ paddingTop: '32px' }}>
      <div className="product-layout">
        {/* Bal oldali részletes specifikációk */}
        <div>
          <span className="eyebrow">
            <span className="dot"></span> {a.type}
          </span>
          <h1 style={{ marginTop: '4px', marginBottom: '16px' }}>{a.name}</h1>
          <p className="lead" style={{ color: 'var(--fg-muted)', marginBottom: '32px' }}>
            {a.tagline || a.description}
          </p>

          {/* Fő kép */}
          <div className="gallery" style={{ marginBottom: '40px' }}>
            <div className="main">
              <img src={a.photo} alt={a.name} />
            </div>
          </div>

          {/* Műszaki paraméterek */}
          {a.specs && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-display)', margin: '0 0 16px 0' }}>Specifikációk</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {Object.entries(a.specs).map(([key, val]) => (
                  <div key={key} className="card-surface" style={{ padding: '16px', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', background: 'var(--card)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--fg-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                      {key}
                    </span>
                    <strong style={{ fontSize: '15px', color: 'var(--ink-800)' }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sávos árazás táblázat (Ha Thule Jetbag 3000) */}
          {a.prices && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-display)', margin: '0 0 16px 0' }}>Kedvezményes sávos árak</h3>
              <div className="card-surface" style={{ borderRadius: 'var(--r-xl)', border: '1px solid var(--line)', background: 'var(--card)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14.5px' }}>
                  <thead>
                    <tr style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--line)' }}>
                      <th style={{ padding: '12px 20px', fontWeight: 700 }}>Bérlési időszak</th>
                      <th style={{ padding: '12px 20px', fontWeight: 700 }}>Napi díj (bruttó)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.prices.map((p, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < a.prices.length - 1 ? '1px solid var(--line)' : 'none' }}>
                        <td style={{ padding: '12px 20px', color: 'var(--ink-800)', fontWeight: 600 }}>{p.days}</td>
                        <td style={{ padding: '12px 20px', color: 'var(--go-800)', fontWeight: 700 }}>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Részletes csempe / Extra infók */}
          <div className="spec-grid-tiles" style={{ borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
            <div className="spec-tile" style={{ gridColumn: 'span 2' }}>
              <h4>
                <Icon name="sparkles" size={18} /> Jellemzők &amp; Tartozékok
              </h4>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', padding: 0, listStyle: 'none' }}>
                {a.extras && a.extras.map((extra, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14.5px' }}>
                    <Icon name="check" size={14} style={{ color: 'var(--go-600)' }} />
                    <span>{extra}</span>
                  </li>
                ))}
                {!a.extras && (
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14.5px' }}>
                    <Icon name="check" size={14} style={{ color: 'var(--go-600)' }} />
                    <span>{a.description || 'Kiváló minőségű, megbízható bérleti eszköz.'}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="spec-tile">
              <h4>
                <Icon name="shield-check" size={18} /> Kaució feltételek
              </h4>
              <ul>
                <li>
                  <Icon name="info" size={14} className="ic" /> 
                  <span><strong>Önálló bérlés kauciója:</strong> {a.deposit || '20 000 Ft'}</span>
                </li>
                <li>
                  <Icon name="info" size={14} className="ic" style={{ color: 'var(--go-600)' }} /> 
                  <span><strong>Autóval együtt bérelve:</strong> 0 Ft kaució!</span>
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
              {a.id === 'thule-jetbag-3000' ? '2 500' : a.price} <small>Ft / nap</small>
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
            </div>

            {/* Ár kalkuláció összegző szekció */}
            {days > 0 && (
              <div style={{ marginBlock: '20px', padding: '16px', background: 'var(--paper-2)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px' }}>
                  <span>Napi bérlet ({days} nap):</span>
                  <span style={{ fontWeight: 600 }}>
                    {totalPrice.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
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
            <span>Kényelmes utazás kiegészítőkkel</span>
          </div>
        </aside>
      </div>

      {/* Mobil fix foglalási sáv */}
      <div className="mobile-book-bar">
        <div>
          <div className="price">
            {a.id === 'thule-jetbag-3000' ? '2 500' : a.price} <small style={{ fontSize: '12px', fontWeight: 500, color: 'var(--fg-muted)' }}>Ft / nap</small>
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

export default AccessoryDetails;
