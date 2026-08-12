import React, { useMemo, useState } from 'react';
import { FleetCard } from './FleetCard';
import { FleetFilter } from './FleetFilter';
import { useCatalog } from './CatalogContext';
import { Button, Icon } from './Primitives';

export function FleetPage({ openVehicle }) {
  const { fleet } = useCatalog();
  const [selected, setSelected] = useState({ seats: null, trans: null, drive: null });
  const [sortValue, setSortValue] = useState('popular');

  const normalizeTrans = value => value?.toLowerCase().includes('automat') ? 'auto' : 'manual';
  const normalizeSeats = value => value?.includes('8') ? '8' : '9';

  const groups = useMemo(() => [
    {
      id: 'seats',
      label: 'Férőhelyek',
      options: [
        { id: '8', label: '8 személyes', count: fleet.filter(v => normalizeSeats(v.seats) === '8').length },
        { id: '9', label: '9 személyes', count: fleet.filter(v => normalizeSeats(v.seats) === '9').length },
      ],
    },
    {
      id: 'trans',
      label: 'Sebességváltó',
      options: [
        { id: 'auto', label: 'Automata', count: fleet.filter(v => normalizeTrans(v.trans) === 'auto').length },
        { id: 'manual', label: 'Manuális', count: fleet.filter(v => normalizeTrans(v.trans) === 'manual').length },
      ],
    },
    {
      id: 'drive',
      label: 'Meghajtás',
      options: [
        { id: 'fwd', label: 'Elsőkerék-hajtás', count: fleet.filter(v => (v.drive || 'fwd') === 'fwd').length },
        { id: 'rwd', label: 'Hátsókerék-hajtás', count: fleet.filter(v => v.drive === 'rwd').length },
        { id: 'awd', label: 'Összkerékhajtás', count: fleet.filter(v => v.drive === 'awd').length },
      ].filter(option => option.count > 0),
    },
  ], [fleet]);

  const filteredFleet = useMemo(() => {
    const filtered = fleet.filter(vehicle => (
      (!selected.seats || normalizeSeats(vehicle.seats) === selected.seats)
      && (!selected.trans || normalizeTrans(vehicle.trans) === selected.trans)
      && (!selected.drive || (vehicle.drive || 'fwd') === selected.drive)
    ));

    return [...filtered].sort((a, b) => {
      const priceA = Number(String(a.price).replace(/\D/g, ''));
      const priceB = Number(String(b.price).replace(/\D/g, ''));
      if (sortValue === 'price-asc') return priceA - priceB;
      if (sortValue === 'price-desc') return priceB - priceA;
      return Number(Boolean(b.popular)) - Number(Boolean(a.popular));
    });
  }, [fleet, selected, sortValue]);

  const toggleFilter = (groupId, optionId) => {
    setSelected(current => ({
      ...current,
      [groupId]: current[groupId] === optionId ? null : optionId,
    }));
  };

  const clearFilters = () => setSelected({ seats: null, trans: null, drive: null });

  return (
    <main className="view fleet-page container section">
      <div className="section-head fleet-page-head">
        <span className="eyebrow"><span className="dot" />Autóink</span>
        <h1>Bérelhető kisbuszaink</h1>
        <p>Válaszd ki a számodra legmegfelelőbb, tiszta és megbízható 8 vagy 9 fős mikrobuszt.</p>
      </div>

      <div className="cat-layout">
        <FleetFilter
          groups={groups}
          selected={selected}
          onToggle={toggleFilter}
          onClearAll={clearFilters}
          resultCount={filteredFleet.length}
          sortOptions={[
            { value: 'popular', label: 'Népszerűség szerint' },
            { value: 'price-asc', label: 'Ár: növekvő' },
            { value: 'price-desc', label: 'Ár: csökkenő' },
          ]}
          sortValue={sortValue}
          onSortChange={setSortValue}
        />

        <div className="fleet-results" aria-live="polite">
          {filteredFleet.length > 0 ? (
            <div className="fleet-grid">
              {filteredFleet.map(v => (
                <FleetCard key={v.id} v={v} onOpen={openVehicle} />
              ))}
            </div>
          ) : (
            <div className="fleet-empty">
              <Icon name="search-code" size={40} style={{ color: 'var(--ink-400)', marginBottom: '16px' }} />
              <h3>Nincs találat</h3>
              <p>Módosítsd a szűrőfeltételeket a kereséshez.</p>
              <Button variant="ghost" onClick={clearFilters}>Szűrők törlése</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
export default FleetPage;
