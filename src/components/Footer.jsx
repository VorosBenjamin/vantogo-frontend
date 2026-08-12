import React from 'react';
import { Mark } from './Primitives';

export function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-lockup" style={{ marginBottom: 14 }}>
              <Mark height={34} body="#FAF6EE" glass="#0A2A1D" wheel="#0A2A1D" />
              <span className="wm">VanToGo<span className="bang">!</span></span>
            </div>
            <p className="muted" style={{ maxWidth: '32ch' }}>
              Megbízható kisbusz &amp; mikrobusz bérlés Budapesten. 8 és 9 személyes járművek
              családoknak, cégeknek és kalandvágyóknak.
            </p>
          </div>
          <div>
            <h5>Oldalak</h5>
            <a href="/">Kezdőlap</a>
            <a href="/autok/">Autóink</a>
            <a href="/kiegeszitok/">Kiegészítők</a>
            <a href="/#kinek">Kinek ajánljuk</a>
            <a href="/gyik/">Gyakori kérdések</a>
            <a href="/kapcsolat/">Kapcsolat</a>
          </div>
          <div>
            <h5>Információ</h5>
            <a href="/aszf/">Á.SZ.F</a>
            <a href="/aszf/">Bérlési feltételek</a>
            <a href="/adatvedelem/">Adatvédelem</a>
            <a href="/gyik/">GY.I.K</a>
          </div>
          <div>
            <h5>Kapcsolat</h5>
            <p className="muted">
              Budapest X. kerület,<br />Diósgyőri utca 14.<br /><br />
              <a href="mailto:info@vantogo.hu" style={{ display: 'inline', padding: 0 }}>info@vantogo.hu</a><br />
              Házhozszállítás Pest megyében.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>© 2026 VanToGo! — Szabó Levente EV. &amp; Somlai Dénes EV.</span>
            <span style={{ fontSize: '11.5px', opacity: 0.65 }}>
              Szabó Levente EV. (Adószám: 90852291-1-33) | Somlai Dénes EV. (Adószám: 91572215-1-42) | Székhely: 1108 Budapest, Diósgyőri utca 14.
            </span>
          </div>
          <span>Megbízható kisbusz, mikrobusz bérlés</span>
        </div>
      </div>
    </footer>
  );
}
