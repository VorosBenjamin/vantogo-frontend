import React from 'react';
import { FAQList } from './FleetCard';
import { FAQS } from './data';
import { Button, Icon } from './Primitives';

export function FAQPage({ navigate }) {
  return (
    <div className="view container section" style={{ paddingTop: '32px', minHeight: '60vh' }}>
      <div className="section-head center">
        <span className="eyebrow" style={{ justifyContent: 'center' }}><span className="dot"></span>Támogatás</span>
        <h2>Gyakori kérdések</h2>
        <p>Minden fontos információ a bérlés menetéről, a kaucióról, a biztosításról és a bérleti feltételekről.</p>
      </div>

      <div style={{ maxWidth: '800px', marginInline: 'auto', marginBottom: '56px' }}>
        <FAQList items={FAQS} />
      </div>

      {/* CTA Band ha még maradt kérdés */}
      <div className="cta-band" style={{ maxWidth: '800px', marginInline: 'auto', padding: '32px' }}>
        <h3>Nem találtad meg a választ?</h3>
        <p style={{ fontSize: '15px', marginBottom: '20px' }}>
          Munkatársaink készséggel válaszolnak minden egyéb felmerülő kérdésedre. Írj nekünk vagy hívj minket bizalommal!
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:info@vantogo.hu" className="btn btn--accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', textDecoration: 'none' }}>
            <Icon name="mail" size={18} /> info@vantogo.hu
          </a>
          <Button variant="ghost" className="btn--ondark" icon="phone" onClick={() => alert('Telefon: +36 30 123 4567')}>
            Kapcsolatfelvétel
          </Button>
        </div>
      </div>
    </div>
  );
}
export default FAQPage;
