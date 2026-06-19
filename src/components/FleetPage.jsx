import React, { useState } from 'react';
import { FleetCard } from './FleetCard';
import { FLEET } from './data';
import { Button, Icon } from './Primitives';

export function FleetPage({ openVehicle }) {
  const [transFilter, setTransFilter] = useState({ manual: true, auto: true });
  const [seatsFilter, setSeatsFilter] = useState({ seats8: true, seats9: true });

  // Filter logic
  const filteredFleet = FLEET.filter(v => {
    const isManual = v.trans.toLowerCase().includes('manuál');
    const isAuto = v.trans.toLowerCase().includes('automat');
    
    const matchesTrans = 
      (transFilter.manual && isManual) || 
      (transFilter.auto && isAuto);

    const is8Seats = v.seats.includes('8');
    const is9Seats = v.seats.includes('9');
    
    const matchesSeats = 
      (seatsFilter.seats8 && is8Seats) || 
      (seatsFilter.seats9 && is9Seats);

    return matchesTrans && matchesSeats;
  });

  return (
    <div className="view container section" style={{ paddingTop: '32px' }}>
      <div className="section-head">
        <span className="eyebrow"><span className="dot"></span>Flottánk</span>
        <h2>Bérelhető kisbuszaink</h2>
        <p>Válaszd ki a számodra legmegfelelőbb, tiszta és megbízható 8 vagy 9 fős mikrobuszt.</p>
      </div>

      <div className="cat-layout">
        {/* Szűrők bal oldalon */}
        <aside className="filters">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ margin: 0 }}>Szűrők</h4>
            <Icon name="sliders-horizontal" size={16} style={{ color: 'var(--go-600)' }} />
          </div>

          {/* Váltó szűrő */}
          <div className="filter-group">
            <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 700 }}>Sebességváltó</h5>
            <label className="check">
              <input
                type="checkbox"
                checked={transFilter.manual}
                onChange={(e) => setTransFilter(prev => ({ ...prev, manual: e.target.checked }))}
              />
              <span>Manuális váltó</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={transFilter.auto}
                onChange={(e) => setTransFilter(prev => ({ ...prev, auto: e.target.checked }))}
              />
              <span>Automata váltó</span>
            </label>
          </div>

          {/* Férőhely szűrő */}
          <div className="filter-group" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <h5 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 700 }}>Férőhelyek</h5>
            <label className="check">
              <input
                type="checkbox"
                checked={seatsFilter.seats8}
                onChange={(e) => setSeatsFilter(prev => ({ ...prev, seats8: e.target.checked }))}
              />
              <span>8 személyes</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={seatsFilter.seats9}
                onChange={(e) => setSeatsFilter(prev => ({ ...prev, seats9: e.target.checked }))}
              />
              <span>9 személyes</span>
            </label>
          </div>
        </aside>

        {/* Autók rácsa jobb oldalon */}
        <div>
          <div className="cat-bar">
            <span className="count">Találatok száma: <strong>{filteredFleet.length}</strong> autó</span>
          </div>

          {filteredFleet.length > 0 ? (
            <div className="fleet-grid">
              {filteredFleet.map(v => (
                <FleetCard key={v.id} v={v} onOpen={openVehicle} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', paddingBlock: '60px', background: 'var(--card)', borderRadius: 'var(--r-lg)', border: '1px dashed var(--line)' }}>
              <Icon name="search-code" size={40} style={{ color: 'var(--ink-400)', marginBottom: '16px' }} />
              <h3>Nincs találat</h3>
              <p style={{ color: 'var(--fg-muted)' }}>Módosítsd a szűrőfeltételeket a kereséshez.</p>
              <Button variant="ghost" style={{ marginTop: '12px' }} onClick={() => {
                setTransFilter({ manual: true, auto: true });
                setSeatsFilter({ seats8: true, seats9: true });
              }}>
                Szűrők alaphelyzetbe állítása
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FleetPage;
