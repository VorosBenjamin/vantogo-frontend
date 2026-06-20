import React from 'react';
import { Button, Icon } from './Primitives';

export function ContactPage({ navigate }) {
  const team = [
    {
      name: 'Somlai Dénes',
      role: 'Kisbusz bérléssel foglalkozó kolléga',
      company: 'Somlai Dénes EV.',
      taxId: '91572215-1-42',
      phone: '+36 30 330 3476',
      email: 'Somlai.Denes@VanToGo.hu',
      photo: 'https://vorosbenjamin.github.io/vantogo-frontend/assets/team/somlai_denes.png',
      desc: 'Dénes intézi a kisbuszok műszaki felkészítését, a bérbeadást és a logisztikát, hogy minden járműnk kifogástalan állapotban várjon benneteket.'
    },
    {
      name: 'Szabó Levente',
      role: 'Kisbusz bérléssel foglalkozó kolléga',
      company: 'Szabó Levente EV.',
      taxId: '90852291-1-33',
      phone: '+36 30 899 2064',
      email: 'Szabo.Levente@VanToGo.hu',
      photo: 'https://vorosbenjamin.github.io/vantogo-frontend/assets/team/szabo_levente.png',
      desc: 'Levente felel az ügyfélkapcsolatokért, a foglalások adminisztrációjáért és az egyedi ügyféligények zökkenőmentes megvalósításáért.'
    }
  ];

  return (
    <div className="view container section" style={{ paddingTop: '32px', minHeight: '75vh' }}>
      <div className="section-head">
        <span className="eyebrow"><span className="dot"></span>Kapcsolat & Rólunk</span>
        <h2>Kik üzemeltetik ezt a vállalkozást?</h2>
        <p>Ismerd meg a VanToGo! csapatát. Célunk, hogy a kisbusz bérlés egyszerű, biztonságos és átlátható legyen számodra.</p>
      </div>

      {/* Csapattagok kártyái */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        {team.map((member, i) => (
          <div key={i} className="card-surface team-card" style={{ 
            borderRadius: 'var(--r-xl)', 
            border: '1px solid var(--line)', 
            background: 'var(--card)', 
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform var(--dur), box-shadow var(--dur)'
          }}>
            <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
              <img 
                src={member.photo} 
                alt={`${member.name} - ${member.role}`} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                className="team-photo"
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                background: 'linear-gradient(to top, rgba(10, 42, 29, 0.9), rgba(10, 42, 29, 0))', 
                padding: '24px 20px 20px 20px',
                color: '#fff'
              }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: 700 }}>{member.name}</h3>
                <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {member.role}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: 'var(--fg-muted)', fontSize: '14px', lineHeight: '1.55', margin: 0 }}>
                {member.desc}
              </p>

              <div style={{ 
                borderTop: '1px solid var(--line)', 
                paddingTop: '16px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                marginTop: 'auto'
              }}>
                <a href={`tel:${member.phone.replace(/\s/g, '')}`} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  textDecoration: 'none', 
                  color: 'var(--ink-800)', 
                  fontWeight: 600,
                  fontSize: '14.5px'
                }}>
                  <Icon name="phone" size={16} style={{ color: 'var(--go-600)' }} />
                  {member.phone}
                </a>

                <a href={`mailto:${member.email}`} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  textDecoration: 'none', 
                  color: 'var(--ink-800)', 
                  fontWeight: 600,
                  fontSize: '14.5px'
                }}>
                  <Icon name="mail" size={16} style={{ color: 'var(--go-600)' }} />
                  {member.email}
                </a>
              </div>

              <div style={{ 
                background: 'var(--paper-2)', 
                borderRadius: 'var(--r-lg)', 
                padding: '12px 16px', 
                fontSize: '12.5px', 
                color: 'var(--fg-muted)',
                lineHeight: '1.4'
              }}>
                <strong>Cégadatok:</strong> {member.company} <br />
                <strong>Adószám:</strong> {member.taxId} <br />
                <strong>Székhely:</strong> 1108 Budapest, Diósgyőri utca 14.
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Központi ügyfélszolgálat */}
      <div className="card-surface" style={{ 
        borderRadius: 'var(--r-xl)', 
        border: '1px solid var(--line)', 
        background: 'var(--go-50)', 
        padding: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: 'var(--go-900)' }}>Központi Support &amp; Segítség</h3>
          <p style={{ color: 'var(--go-800)', fontSize: '14.5px', lineHeight: '1.5', margin: 0 }}>
            Kérdésed van a bérléssel kapcsolatban? Problémád adódott útközben? Support csapatunk készséggel áll rendelkezésre a nap 24 órájában.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
          <a href="mailto:Support@VanToGo.hu" className="btn btn--accent" style={{ textDecoration: 'none', display: 'inline-flex', paddingInline: '24px' }}>
            <Icon name="mail" size={18} className="ic" /> Support@VanToGo.hu
          </a>
          <span style={{ fontSize: '13px', color: 'var(--go-800)', fontWeight: 500 }}>
            Hétköznap és hétvégén is válaszolunk néhány órán belül.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
