import React from 'react';
import { Button, Icon } from './Primitives';

export function FleetFilter({
  groups = [],
  selected = {},
  onToggle,
  onClearAll,
  resultCount = 0,
  sortOptions = [],
  sortValue,
  onSortChange,
}) {
  const [openGroups, setOpenGroups] = React.useState(() => new Set(groups.map(group => group.id)));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dragState, setDragState] = React.useState({ mode: null, offset: 0 });
  const dragRef = React.useRef({ mode: null, startY: 0, lastY: 0, moved: false });
  const suppressHandleClickRef = React.useRef(false);

  React.useEffect(() => {
    if (!drawerOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = event => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen]);

  const activeChips = groups.flatMap(group => {
    const value = selected[group.id];
    const option = group.options.find(item => item.id === value);
    return option ? [{ groupId: group.id, optionId: value, label: option.label }] : [];
  });

  const toggleGroup = id => {
    setOpenGroups(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startHandleDrag = (event, mode) => {
    if (typeof event.button === 'number' && event.button !== 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      mode,
      startY: event.clientY,
      lastY: event.clientY,
      moved: false,
    };
    setDragState({ mode, offset: 0 });
  };

  const moveHandleDrag = event => {
    const gesture = dragRef.current;
    if (!gesture.mode) return;

    const delta = event.clientY - gesture.startY;
    gesture.lastY = event.clientY;
    gesture.moved = gesture.moved || Math.abs(delta) > 6;

    const offset = gesture.mode === 'open'
      ? Math.max(-88, Math.min(0, delta))
      : Math.max(0, Math.min(320, delta));

    setDragState({ mode: gesture.mode, offset });
  };

  const finishHandleDrag = event => {
    const gesture = dragRef.current;
    if (!gesture.mode) return;

    const delta = gesture.lastY - gesture.startY;
    suppressHandleClickRef.current = gesture.moved;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (gesture.mode === 'open' && delta < -42) setDrawerOpen(true);
    if (gesture.mode === 'close' && delta > 64) setDrawerOpen(false);

    dragRef.current = { mode: null, startY: 0, lastY: 0, moved: false };
    setDragState({ mode: null, offset: 0 });
  };

  const handleGripClick = action => {
    if (suppressHandleClickRef.current) {
      suppressHandleClickRef.current = false;
      return;
    }
    setDrawerOpen(action === 'open');
  };

  const sortSelect = className => (
    <label className="filter-sort-wrap">
      <span className="sr-only">Találatok rendezése</span>
      <select
        className={`select filter-sort ${className || ''}`.trim()}
        value={sortValue}
        onChange={event => onSortChange?.(event.target.value)}
        aria-label="Találatok rendezése"
      >
        {sortOptions.map(option => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );

  return (
    <>
      <div className="filter-toolbar">
        <span className="filter-result-count"><strong>{resultCount}</strong> bérelhető autó</span>
        <div className="filter-toolbar-actions">{sortSelect()}</div>
      </div>

      {activeChips.length > 0 && (
        <div className="filter-chips" aria-label="Aktív szűrők">
          {activeChips.map(chip => (
            <span className="filter-chip" key={chip.groupId}>
              {chip.label}
              <button
                type="button"
                onClick={() => onToggle?.(chip.groupId, chip.optionId)}
                aria-label={`„${chip.label}” szűrő eltávolítása`}
              >
                <Icon name="x" size={12} />
              </button>
            </span>
          ))}
          <button type="button" className="filter-clear" onClick={onClearAll}>Összes törlése</button>
        </div>
      )}

      <div
        className={`filter-fab-bar${dragState.mode === 'open' ? ' dragging' : ''}`}
        aria-label="Autólista vezérlői"
        style={dragState.mode === 'open' ? { transform: `translateY(${dragState.offset}px)` } : undefined}
      >
        <button
          type="button"
          className="filter-drag-zone filter-fab-drag-zone"
          aria-label="Húzd felfelé a szűrők megnyitásához"
          onClick={() => handleGripClick('open')}
          onPointerDown={event => startHandleDrag(event, 'open')}
          onPointerMove={moveHandleDrag}
          onPointerUp={finishHandleDrag}
          onPointerCancel={finishHandleDrag}
        >
          <span className="filter-fab-handle" aria-hidden="true" />
        </button>
        <div className="filter-fab-row">
          {sortSelect('filter-sort-mobile')}
          <Button
            variant="primary"
            icon="sliders-horizontal"
            className="filter-fab-trigger"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="fleet-filter-panel"
          >
            Szűrők
            {activeChips.length > 0 && <span className="filter-trigger-badge">{activeChips.length}</span>}
          </Button>
        </div>
      </div>

      <button
        type="button"
        className={`filter-backdrop${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-label="Szűrők bezárása"
        tabIndex={drawerOpen ? 0 : -1}
      />

      <aside
        id="fleet-filter-panel"
        className={`filters filter-panel${drawerOpen ? ' open' : ''}${dragState.mode === 'close' ? ' dragging' : ''}`}
        aria-label="Autók szűrése"
        aria-hidden={!drawerOpen ? undefined : false}
        style={dragState.mode === 'close' ? { transform: `translateY(${dragState.offset}px)` } : undefined}
      >
        <button
          type="button"
          className="filter-drag-zone filter-panel-drag-zone"
          aria-label="Húzd lefelé a szűrők bezárásához"
          onClick={() => handleGripClick('close')}
          onPointerDown={event => startHandleDrag(event, 'close')}
          onPointerMove={moveHandleDrag}
          onPointerUp={finishHandleDrag}
          onPointerCancel={finishHandleDrag}
        >
          <span className="filter-handle" aria-hidden="true" />
        </button>
        <div className="filter-panel-head">
          <span className="filter-panel-head-spacer" />
          <h2>Szűrők</h2>
          <button type="button" className="filter-close" onClick={() => setDrawerOpen(false)} aria-label="Bezárás">
            <Icon name="x" size={19} />
          </button>
        </div>

        {groups.map(group => {
          const isOpen = openGroups.has(group.id);
          return (
            <section className="filter-group" key={group.id}>
              <button
                type="button"
                className="filter-group-head"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
              >
                {group.label}
                <Icon
                  name="chevron-down"
                  size={18}
                  className="ic"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                />
              </button>
              {isOpen && (
                <div className="filter-pills">
                  {group.options.map(option => {
                    const isActive = selected[group.id] === option.id;
                    return (
                      <button
                        type="button"
                        key={option.id}
                        className={`pill-option${isActive ? ' active' : ''}`}
                        onClick={() => onToggle?.(group.id, option.id)}
                        aria-pressed={isActive}
                      >
                        <span className="dot" aria-hidden="true" />
                        {option.label}
                        <span className="filter-count-tag">{option.count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}

        <div className="filter-footer">
          {activeChips.length > 0 && <Button variant="ghost" onClick={onClearAll}>Szűrők törlése</Button>}
          <Button variant="primary" onClick={() => setDrawerOpen(false)}>
            {resultCount} autó megjelenítése
          </Button>
        </div>
      </aside>
    </>
  );
}
