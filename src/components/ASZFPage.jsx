import React from 'react';
import { Button, Icon } from './Primitives';

const MINTA_SZERZODES_TEXT = `========================================================================
                      BÉRLETI SZERZŐDÉS (MINTA)
========================================================================
amely létrejött egyrészről a VanToGo! gépjármű bérbeadói:
Bérbeadó: Szabó Levente EV. & Somlai Dénes EV.
Cím: 1108 Budapest, Diósgyőri utca 14.
Adószám: 12345678-1-42

másrészről mint Bérlő között az alábbi feltételekkel:

1. A BÉRLET TÁRGYA:
A Bérbeadó bérbe adja, a Bérlő pedig bérbe veszi a Bérbeadó tulajdonát
képező személygépjárművet (kisbuszt) az alábbi adatokkal:
- Jármű típusa: Mercedes-Benz Vito / Opel Vivaro / Mercedes-Benz Viano
- Férőhelyek száma: 8-9 fő
- Hatósági rendszám: [Rendszám]

2. A BÉRLET IDŐTARTAMA ÉS DÍJA:
- Bérlet kezdete: [Átvétel dátuma és időpontja]
- Bérlet vége: [Leadás dátuma és időpontja]
- Napi bérleti díj: [Napi ár] Ft / nap
- Kaució összege: 200.000 Ft (azaz Kettőszázezer forint)

3. KILOMÉTER HASZNÁLAT:
A napi bérleti díj 250 km/nap futásteljesítményt tartalmaz. 
Az ezen felüli használat díja 90 Ft/km.

4. A KAUCIÓ VISSZAFIZETÉSE:
A kaució a gépjármű sérülésmentes, tele tankkal történő visszaadásakor
teljes összegben visszajár a Bérlő részére.

5. BIZTOSÍTÁS ÉS FELELŐSSÉG:
A gépjármű érvényes kötelező felelősségbiztosítással és CASCO 
biztosítással rendelkezik. Káresemény esetén a Bérlő önrésze a kár 
10%-a, de minimum 150.000 Ft. 

Bérlő aláírásával igazolja, hogy a bérleti feltételeket elfogadja.

Aláírások:

...................................      ...................................
            Bérbeadó                                  Bérlő
`;

export function ASZFPage({ navigate }) {
  const handleDownload = () => {
    const blob = new Blob([MINTA_SZERZODES_TEXT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vantogo_mintaszerzodes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="view container section" style={{ paddingTop: '32px', minHeight: '70vh' }}>
      <div className="section-head">
        <span className="eyebrow"><span className="dot"></span>Dokumentumok</span>
        <h2>Általános Szerződési Feltételek (ÁSZF)</h2>
        <p>Kérjük, olvasd el figyelmesen a kisbuszaink bérlésére vonatkozó szabályokat és bérlési feltételeket.</p>
      </div>

      <div className="doc-layout">
        {/* Bal oldali tartalom */}
        <div className="card-surface doc-content">
          
          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              1. Általános rendelkezések
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6' }}>
              Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) szabályozzák a VanToGo! márkanév alatt működő bérbeadók (Szabó Levente EV. és Somlai Dénes EV., mint Bérbeadók) és a gépjárművet bérbe vevő személyek (a továbbiakban: Bérlő) közötti bérleti jogviszonyt. A bérleti szerződés aláírásával a Bérlő elismeri, hogy az ÁSZF tartalmát megismerte, megértette és azt magára nézve kötelezőnek fogadta el.
            </p>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              2. Bérlőre és vezetőre vonatkozó feltételek
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>A bérlet feltétele a betöltött <strong>21. életév</strong>.</li>
              <li>A jármű vezetéséhez legalább <strong>1 éve érvényes B kategóriás jogosítvány</strong> szükséges.</li>
              <li>A járművet kizárólag a Bérleti Szerződésben megnevezett személy(ek) vezethetik. Harmadik félnek a jármű vezetése nem engedhető át.</li>
              <li>Szükséges dokumentumok bérléskor: érvényes személyi igazolvány (vagy útlevél), lakcímkártya és jogosítvány eredeti példánya.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              3. Bérleti díj, kilométer használat és Kaució
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>A bérleti díj napi <strong>250 km</strong> futásteljesítményt tartalmaz. A napi limit feletti futás díja <strong>90 Ft / km</strong>.</li>
              <li>A kaució összege fixen <strong>200 000 Ft</strong> járművenként. A kauciót a bérlet megkezdése előtt kell megfizetni készpénzben vagy utalással.</li>
              <li>A kaució a jármű sérülésmentes, tiszta állapotban, tele tankkal történő és szerződés szerinti időben történő visszaadásakor teljes egészében visszajár a Bérlőnek.</li>
            </ul>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              4. A jármű átadása és visszavétele
            </h3>
            <p style={{ color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6' }}>
              Bérbeadó a járművet tiszta, fertőtlenített állapotban és tele tankkal adja át. Bérlő köteles a járművet a bérlet lejártakor szintén kitakarítva és tele tankkal visszaadni. Amennyiben a takarítás vagy a tankolás elmarad, a Bérbeadó jogosult pótdíjat felszámolni (takarítási díj: 15 000 Ft, tankolási szolgáltatási díj: 5 000 Ft + az üzemanyag ára).
            </p>
          </section>

          <section>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: 'var(--go-800)', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              5. Biztosítás, felelősség és Assistance
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--fg-muted)', fontSize: '15px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Minden jármű rendelkezik belföldi és nemzetközi kötelező felelősségbiztosítással, valamint teljes körű CASCO biztosítással.</li>
              <li>Saját hibás töréskár vagy ismeretlen okozó általi kár esetén a Bérlő önrésze a kárösszeg 10%-a, de minimum 150 000 Ft káreseményenként.</li>
              <li>Baleset, műszaki meghibásodás esetén a Bérlő köteles azonnal értesíteni a Bérbeadót és a szerződésben megjelölt Európai Assistance szolgálatot.</li>
              <li>A járműben keletkezett gumiabroncs-sérülések, felni-sérülések és a belső tér rongálódásai nem tartoznak a CASCO hatálya alá, ezek javítási költségét Bérlő teljes mértékben köteles megtéríteni.</li>
            </ul>
          </section>
        </div>

        {/* Jobb oldali sáv - Gyors információk */}
        <aside className="doc-sidebar">
          <div className="card-surface" style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', background: 'var(--go-50)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--go-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="file-text" size={18} /> Szerződéskötés
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--go-800)', lineHeight: '1.5', marginBottom: '16px' }}>
              A bérleti szerződés véglegesítése a gépjármű személyes átvételekor történik az iratok (személyi, jogosítvány, lakcímkártya) bemutatása után.
            </p>
            <button 
              onClick={handleDownload} 
              className="btn btn--primary btn--sm btn--block" 
              style={{ textDecoration: 'none', color: '#fff', justifyContent: 'center', cursor: 'pointer', border: 'none' }}
            >
              <Icon name="download" size={16} className="ic" /> Mintaszerződés letöltése
            </button>
          </div>

          <div className="card-surface" style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', background: 'var(--card)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--ink-900)' }}>Kérdésed van?</h4>
            <p style={{ fontSize: '13.5px', color: 'var(--fg-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
              Ha az ÁSZF-fel kapcsolatban bármilyen kérdésed lenne, fordulj hozzánk bizalommal.
            </p>
            <a href="mailto:info@vantogo.hu" className="btn btn--primary btn--sm btn--block" style={{ textDecoration: 'none', color: '#fff', justifyContent: 'center' }}>
              <Icon name="mail" size={16} className="ic" /> info@vantogo.hu
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default ASZFPage;
