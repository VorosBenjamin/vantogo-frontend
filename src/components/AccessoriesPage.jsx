import React, { useState } from 'react';
import { ACCESSORIES } from './data';
import { Icon, Button } from './Primitives';

export function AccessoriesPage({ openAccessory }) {
  const [filterType, setFilterType] = useState('all');

  const categories = [
    { id: 'all', label: 'Összes kiegészítő' },
    { id: 'Tetőbox', label: 'Tetőbox' },
    { id: 'Téli felszerelés', label: 'Téli felszerelés' },
    { id: 'Szállítóeszköz', label: 'Szállítóeszközök' }
  ];

  const filtered = filterType === 'all' 
    ? ACCESSORIES 
    : ACCESSORIES.filter(a => a.type === filterType);

  return (
    <div className="view container section" style={{ paddingTop: '32px', minHeight: '75vh' }}>
      <div className="section-head">
        <span className="eyebrow"><span className="dot"></span>Bérelhető Kiegészítők</span>
        <h2>Tedd még kényelmesebbé az utazást</h2>
        <p>
          Bérelj kiegészítőket az autók mellé vagy akár önállóan is. 
          Kisbusszal együtt történő bérlés esetén a kiegészítők **kauciója 0 Ft!**
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        {/* Kategória szűrő */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterType(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: filterType === cat.id ? 'var(--go-600)' : 'var(--line)',
                background: filterType === cat.id ? 'var(--go-600)' : 'var(--card)',
                color: filterType === cat.id ? '#fff' : 'var(--ink-700)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all var(--dur)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Kiegészítő rács */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {filtered.map(item => {
            // Price format helper
            const priceLabel = item.id === 'thule-jetbag-3000'
              ? '2 500 Ft/nap-tól'
              : `${item.price.toLocaleString('hu-HU')} Ft/nap`;

            return (
              <div 
                key={item.id} 
                className="card-surface accessory-card"
                style={{
                  borderRadius: 'var(--r-xl)',
                  border: '1px solid var(--line)',
                  background: 'var(--card)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="ph" style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#f5f5f5' }}>
                  <img 
                    src={item.photo} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'var(--go-600)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {item.type}
                  </span>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700 }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--fg-muted)', fontSize: '13.5px', lineHeight: '1.45', marginBottom: '16px', flex: 1 }}>
                    {item.tagline}
                  </p>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid var(--line)',
                    paddingTop: '16px',
                    marginTop: 'auto'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--fg-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                        Bérleti díj
                      </span>
                      <strong style={{ fontSize: '16px', color: 'var(--go-800)' }}>
                        {priceLabel}
                      </strong>
                    </div>

                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => openAccessory && openAccessory(item)}
                    >
                      Részletek
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AccessoriesPage;
