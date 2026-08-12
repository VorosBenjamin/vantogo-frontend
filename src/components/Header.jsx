import React, { useState, useEffect } from 'react';
import { Logo, Button, Icon } from './Primitives';

export function Header({ current, navigate, onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const root = document.querySelector('.app-scroll') || window;
    const onScroll = () => {
      const y = root === window ? window.scrollY : root.scrollTop;
      setScrolled(y > 12);
    };
    root.addEventListener('scroll', onScroll);
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Kezdőlap', href: '/' },
    { id: 'fleet', label: 'Autóink', href: '/autok/' },
    { id: 'accessories', label: 'Kiegészítők', href: '/kiegeszitok/' },
    { id: 'segments', label: 'Kinek ajánljuk', href: '/#kinek' },
    { id: 'faq', label: 'GY.I.K', href: '/gyik/' },
    { id: 'contact', label: 'Kapcsolat', href: '/kapcsolat/' },
  ];

  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <div className="container bar">
        <Logo markHeight={34} fontSize={23} />
        <nav className="nav">
          {links.map(l => (
            <a key={l.id} href={l.href} className={current === l.id ? 'active' : ''}>{l.label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <Button variant="primary" icon="calendar-check" onClick={onBook}>Foglalj most</Button>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={26} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="container" id="mobile-navigation" style={{ paddingBottom: 16 }}>
          <div className="card-surface" style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {links.map(l => (
              <a key={l.id} href={l.href} className="nav-mobile" onClick={() => setMenuOpen(false)} style={{ padding: '12px 14px', fontWeight: 600, borderRadius: 12, color: 'var(--ink-700)' }}>
                {l.label}
              </a>
            ))}
            <Button variant="primary" className="btn--block" icon="calendar-check" onClick={() => { onBook(); setMenuOpen(false); }}>Foglalj most</Button>
          </div>
        </div>
      )}
    </header>
  );
}
