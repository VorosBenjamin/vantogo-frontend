import React from 'react';
import { Button, Icon } from './Primitives';
import { FleetCard, FAQList } from './FleetCard';
import { FLEET, SEGMENTS, FEATURES, FAQS } from './data';

export function HeroBooking({ onSubmit }) {
  return (
    <div className="booking float">
      <div className="booking-row">
        <div className="field">
          <label>Jármű</label>
          <select className="select" defaultValue="">
            <option value="">Bármelyik kisbusz</option>
            {FLEET.map(v => <option key={v.id}>{v.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Átvétel</label>
          <input className="input" placeholder="2026. 06. 12." />
        </div>
        <div className="field">
          <label>Visszahozás</label>
          <input className="input" placeholder="2026. 06. 15." />
        </div>
        <div className="field">
          <label>Létszám</label>
          <select className="select" defaultValue="">
            <option value="">Hány fő?</option>
            <option>1–8 fő</option>
            <option>9 fő</option>
          </select>
        </div>
        <Button variant="accent" icon="search" onClick={onSubmit}>Keresés</Button>
      </div>
    </div>
  );
}

export function Home({ navigate, openVehicle, onBook }) {
  return (
    <div className="view">
      {/* HERO */}
      <section className="hero">
        <div className="hero-media"><img src="/assets/fleet/crop-vito-black.png" alt="VanToGo kisbusz" /></div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><span className="dot"></span>Budapest · 8–9 személyes kisbuszok</span>
            <h1>Kisbusz bérlés,<br />egyszerűen.</h1>
            <p className="lead">Tágas, tiszta és megbízható mikrobuszok családoknak, cégeknek és kalandvágyóknak. Foglalj online pár perc alatt — mi gondoskodunk a kényelmes utazásról.</p>
            <div className="hero-actions">
              <Button variant="accent" size="lg" icon="calendar-check" onClick={onBook}>Foglalj most</Button>
              <Button variant="ghost" size="lg" onClick={() => navigate && navigate('fleet')} className="btn--ondark">Nézd meg az autókat</Button>
            </div>
            <div className="hero-trust">
              <span className="ti"><Icon name="shield-check" size={18} className="ic" />Assistance &amp; biztosítás</span>
              <span className="ti"><Icon name="sparkles" size={18} className="ic" />Tiszta, ápolt autók</span>
              <span className="ti"><Icon name="map-pin" size={18} className="ic" />Házhozszállítás Pesten</span>
            </div>
          </div>
          <HeroBooking onSubmit={() => navigate && navigate('fleet')} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="section container">
        <div className="section-head">
          <span className="eyebrow"><span className="dot"></span>Miért a VanToGo!</span>
          <h2>Bérlés gyorsan, gond nélkül</h2>
          <p>A foglalástól a visszaadásig minden átlátható. Nálunk nincsenek rejtett költségek, csak kényelmes utazás.</p>
        </div>
        <div className="feature-grid">
          {FEATURES.map(f => (
            <div className="feature" key={f.title}>
              <div className="ico"><Icon name={f.icon} size={26} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET PREVIEW */}
      <section className="section bg-sand" id="fleet-anchor">
        <div className="container">
          <div className="cat-bar">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow"><span className="dot"></span>Autóink</span>
              <h2>Válaszd ki a kisbuszodat</h2>
            </div>
            <Button variant="ghost" iconRight="arrow-right" onClick={() => navigate && navigate('fleet')}>Összes autó</Button>
          </div>
          <div className="fleet-grid">
            {FLEET.map(v => <FleetCard key={v.id} v={v} onOpen={openVehicle} />)}
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="section container" id="segments-anchor">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}><span className="dot"></span>Kinek ajánljuk?</span>
          <h2>Bármilyen utazáshoz</h2>
          <p>Akár nyaralásra, akár csapatépítőre indulsz — nálunk megtalálod a hozzád illő kisbuszt.</p>
        </div>
        <div className="seg-grid">
          {SEGMENTS.map(s => (
            <div className="seg-card" key={s.title}>
              <div className="ico"><Icon name={s.icon} size={24} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section--tight bg-forest">
        <div className="container stats">
          <div className="stat"><div className="n">1200+</div><div className="l">elégedett ügyfél</div></div>
          <div className="stat"><div className="n">9000+</div><div className="l">nap bérlés</div></div>
          <div className="stat"><div className="n">4,9★</div><div className="l">átlagos értékelés</div></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container" id="faq-anchor">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: 'center' }}><span className="dot"></span>Gyakori kérdések</span>
          <h2>Amit tudnod érdemes</h2>
        </div>
        <FAQList items={FAQS} limit={4} />
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Button variant="ghost" iconRight="arrow-right" onClick={() => navigate && navigate('faq')}>Összes kérdés</Button>
        </div>
      </section>

      {/* CTA */}
      <section className="section--tight container">
        <div className="cta-band">
          <h2>Készen állsz az indulásra?</h2>
          <p>Foglald le kisbuszodat még ma, és élvezd a gondtalan, kényelmes utazást — bárhová is tartotok.</p>
          <Button variant="accent" size="lg" icon="calendar-check" onClick={onBook}>Foglalj most</Button>
        </div>
      </section>
    </div>
  );
}
