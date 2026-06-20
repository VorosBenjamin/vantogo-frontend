import React from 'react';
import { Button, Icon } from './Primitives';

export function AdatvedelemPage({ navigate }) {
  return (
    <div className="view container section" style={{ paddingTop: '32px', minHeight: '70vh' }}>
      <div className="section-head">
        <span className="eyebrow"><span className="dot"></span>Jogi nyilatkozatok</span>
        <h2>Adatkezelési Tájékoztató</h2>
        <p>A VanToGo! gépjármű bérbeadói elkötelezettek a személyes adatok védelme iránt. Az alábbiakban részletezzük az adatkezelési szabályainkat.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }}>
        {/* Bal oldali tartalom */}
        <div className="card-surface" style={{ padding: '32px', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', background: 'var(--card)', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              1. Az adatkezelő megnevezése
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              A személyes adatok kezelését a VanToGo! márkanév alatt tevékenykedő egyéni vállalkozók végzik, mint közös adatkezelők:
            </p>
            <ul style={{ margin: '12px 0 0 0', paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '14.5px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Szabó Levente EV.</strong> (Székhely: 1108 Budapest, Diósgyőri utca 14., Adószám: 90852291-1-33)</li>
              <li><strong>Somlai Dénes EV.</strong> (Székhely: 1108 Budapest, Diósgyőri utca 14., Adószám: 91572215-1-42)</li>
            </ul>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              2. A kezelt adatok köre
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>
              A szolgáltatás igénybevétele (érdeklődés és bérleti szerződés előkészítése) során az alábbi adatokat kezeljük:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '14.5px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Kapcsolattartási adatok (1. lépés):</strong> Teljes név, e-mail cím, telefonszám, megadott megjegyzések.</li>
              <li><strong>Szerződéskötéshez szükséges adatok (2. lépés - opcionális):</strong> Személyi igazolvány száma, jogosítvány száma, születési hely és idő, lakcím (irányítószám, város, utca, házszám).</li>
            </ul>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              3. Az adatkezelés célja és jogalapja
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '14.5px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Az adatkezelés célja:</strong> A bérleti szerződés előkészítése, a kiválasztott gépjármű/kiegészítő lefoglalása, a bérleti díj számlázása, valamint a kapcsolatfelvétel a bérlet részleteinek egyeztetése céljából.</li>
              <li><strong>Az adatkezelés jogalapja:</strong> A szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pontja), valamint az érintett kifejezett és önkéntes hozzájárulása a beküldés során (GDPR 6. cikk (1) bekezdés a) pontja).</li>
            </ul>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              4. Az adatkezelés időtartama
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              Az érdeklődés során megadott adatokat a kapcsolatfelvételtől számított legfeljebb **1 évig** tároljuk, kivéve, ha a bérleti jogviszony létrejön. Létrejött bérleti szerződés esetén a számviteli bizonylatokat és a kapcsolódó szerződéses adatokat a jogszabályi kötelezettségeknek megfelelően **8 évig** vagyunk kötelesek megőrizni (Számviteli törvény 169. §).
            </p>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              5. Az érintett jogai
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' }}>
              Ön, mint érintett, a GDPR értelmében bármikor jogosult az alábbiak kérelmezésére az Adatkezelőnél:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '14.5px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Tájékoztatás és hozzáférés a személyes adataihoz (másolat kérése).</li>
              <li>Pontatlan adatok helyesbítése vagy kiegészítése.</li>
              <li>A személyes adatok törlése (az elfeledtetéshez való jog), amennyiben a szerződés teljesítéséhez vagy jogi kötelezettség megőrzéséhez már nincs rájuk szükség.</li>
              <li>Az adatkezelés korlátozása vagy tiltakozás az adatkezelés ellen.</li>
              <li>Hozzájárulás visszavonása bármikor (ez nem érinti a visszavonás előtt végzett adatkezelés jogszerűségét).</li>
            </ul>
          </section>
        </div>

        {/* Jobb oldali sáv */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-surface" style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', background: 'var(--go-50)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--go-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="shield-check" size={18} /> Biztonságos adatkezelés
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--go-800)', lineHeight: '1.5', margin: 0 }}>
              Az adataidat kizárólag a bérlés előkészítésére használjuk fel, harmadik félnek nem adjuk át (kivéve a jogszabályban előírt eseteket, pl. hatósági adatszolgáltatás).
            </p>
          </div>

          <div className="card-surface" style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', background: 'var(--card)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--ink-900)' }}>Kapcsolat & Jogérvényesítés</h4>
            <p style={{ fontSize: '13.5px', color: 'var(--fg-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
              Bármilyen adatvédelmi kérdéssel vagy kéréssel fordulj hozzánk bizalommal az alábbi e-mail címen:
            </p>
            <a href="mailto:Support@VanToGo.hu" className="btn btn--primary btn--sm btn--block" style={{ textDecoration: 'none', color: '#fff', justifyContent: 'center' }}>
              <Icon name="mail" size={16} className="ic" /> Support@VanToGo.hu
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default AdatvedelemPage;
