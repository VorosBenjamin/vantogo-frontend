import React from 'react';
import { Mark, Icon } from './Primitives';

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
            <div className="socials" style={{ marginTop: 18 }}>
              <a href="#" aria-label="Instagram"><Icon name="instagram" size={19} /></a>
              <a href="#" aria-label="Facebook"><Icon name="facebook" size={19} /></a>
            </div>
          </div>
          <div>
            <h5>Oldalak</h5>
            <a onClick={() => navigate && navigate('home')}>Kezdőlap</a>
            <a onClick={() => navigate && navigate('fleet')}>Autóink</a>
            <a onClick={() => navigate && navigate('accessories')}>Kiegészítők</a>
            <a onClick={() => navigate && navigate('segments')}>Kinek ajánljuk</a>
            <a onClick={() => navigate && navigate('faq')}>Gyakori kérdések</a>
            <a onClick={() => navigate && navigate('contact')}>Kapcsolat</a>
          </div>
          <div>
            <h5>Információ</h5>
            <a onClick={() => navigate && navigate('aszf')}>Á.SZ.F</a>
            <a onClick={() => navigate && navigate('aszf')}>Bérlési feltételek</a>
            <a onClick={() => navigate && navigate('privacy')}>Adatvédelem</a>
            <a onClick={() => navigate && navigate('faq')}>GY.I.K</a>
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
          <span>© 2026 VanToGo! — Szabó Levente EV. &amp; Somlai Dénes EV.</span>
          <span>Megbízható kisbusz, mikrobusz bérlés</span>
        </div>
      </div>
    </footer>
  );
}
