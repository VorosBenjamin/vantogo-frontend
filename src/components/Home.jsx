import React from 'react';
import { Button, Icon } from './Primitives';
import { FleetCard, FAQList } from './FleetCard';
import { useCatalog } from './CatalogContext';

export function HeroBooking({ onSubmit, searchParams = {}, setSearchParams }) {
  const { fleet } = useCatalog();
  const handleChange = (e) => {
    if (setSearchParams) {
      setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="booking float">
      <div className="booking-row">
        <div className="field">
          <label>Jármű</label>
          <select className="select" name="vehicleId" value={searchParams.vehicleId || ''} onChange={handleChange}>
            <option value="">Bármelyik kisbusz</option>
            {fleet.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Átvétel</label>
          <input type="date" className="input" name="startDate" value={searchParams.startDate || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Visszahozás</label>
          <input type="date" className="input" name="endDate" value={searchParams.endDate || ''} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Létszám</label>
          <select className="select" name="seats" value={searchParams.seats || ''} onChange={handleChange}>
            <option value="">Hány fő?</option>
            <option value="1-8">1–8 fő</option>
            <option value="9">9 fő</option>
          </select>
        </div>
        <Button variant="accent" icon="search" onClick={onSubmit}>Kiválasztom az autóm</Button>
      </div>
    </div>
  );
}

export function Home({ navigate, openVehicle, onBook, searchParams, setSearchParams }) {
  const { fleet, segments, features, faqs } = useCatalog();
  return (
    <div className="view">
      {/* HERO */}
      <section className="hero">
        <div className="hero-media"><img src="/assets/fleet/crop-vito-black.png" alt="VanToGo kisbusz" /></div>
        <div className="container hero-inner">
          <div className="hero-copy">
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
          <HeroBooking onSubmit={() => navigate && navigate('fleet')} searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="section container">
        <div className="section-head">
          <h2>Bérlés gyorsan, gond nélkül</h2>
          <p>A foglalástól a visszaadásig minden átlátható. Nálunk nincsenek rejtett költségek, csak kényelmes utazás.</p>
        </div>
        <div className="feature-grid">
          {features.map(f => (
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
              <h2>Válaszd ki a kisbuszodat</h2>
            </div>
            <Button variant="ghost" iconRight="arrow-right" onClick={() => navigate && navigate('fleet')}>Összes autó</Button>
          </div>
          <div className="fleet-grid">
            {fleet.map(v => <FleetCard key={v.id} v={v} onOpen={openVehicle} />)}
          </div>
        </div>
      </section>

      {/* SEGMENTS */}
      <section className="section container" id="kinek">
        <div className="section-head center">
          <h2>Bármilyen utazáshoz</h2>
          <p>Akár nyaralásra, akár csapatépítőre indulsz — nálunk megtalálod a hozzád illő kisbuszt.</p>
        </div>
        <div className="seg-grid">
          {segments.map(s => (
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
          <div className="stat"><div className="n">8–9 fő</div><div className="l">kényelmes férőhely</div></div>
          <div className="stat"><div className="n">250 km</div><div className="l">napi keret az árban</div></div>
          <div className="stat"><div className="n">EU</div><div className="l">assistance minden bérléshez</div></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container" id="faq-anchor">
        <div className="section-head center">
          <h2>Amit tudnod érdemes</h2>
        </div>
        <FAQList items={faqs} limit={4} />
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
