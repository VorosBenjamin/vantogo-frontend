export const FLEET = [
  {
    id: 'vito-9',
    name: 'Mercedes-Benz Vito',
    seats: '9 személyes',
    trans: 'Manuális',
    km: '250 km/nap',
    luggage: '1 300 L',
    price: '33 000',
    photo: 'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-vito-black.png',
    popular: true,
    tagline: '9 személyes, takarékos és kényelmes utazó kisbusz.',
    fuel: 'Dízel',
    consumption: '7.5 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Manuális klíma',
    engine: '1598 ccm, 114 LE',
    extras: ['Esőszenzor', 'Tempomat', 'Guminyomás szonda', 'ISOFIX rögzítési pontok', 'Központi zár', 'Elektromos ablakok'],
    gallery: [
      'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-vito-black.png'
    ]
  },
  {
    id: 'vivaro-9',
    name: 'Opel Vivaro',
    seats: '9 személyes',
    trans: 'Manuális',
    km: '250 km/nap',
    luggage: '1 200 L',
    price: '30 000',
    photo: 'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-opel-vivaro.png',
    popular: false,
    tagline: 'Kedvező árú, gazdaságos kisbusz a hosszabb utakra.',
    fuel: 'Dízel',
    consumption: '6.9 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Többzónás automata klíma (hátsó mennyezeti befúvókkal)',
    engine: '1.6 CDTI, 125 LE',
    extras: ['Ülésfűtés', 'Dupla tolóajtó', 'Parkolóradar elől-hátul', 'Tempomat', 'Vonóhorog', 'Poroltó'],
    gallery: [
      'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-opel-vivaro.png'
    ]
  },
  {
    id: 'viano-8',
    name: 'Mercedes-Benz Viano',
    seats: '8 személyes',
    trans: 'Automata',
    km: '250 km/nap',
    luggage: '1 300 L',
    price: '26 000',
    photo: 'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-viano-silver.png',
    popular: false,
    tagline: 'Automata váltó és prémium kényelem a kényelmes utazáshoz.',
    fuel: 'Dízel',
    consumption: '8.5 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Többzónás automata klíma',
    engine: '2148 ccm, 150 LE',
    extras: ['Bőr belső', 'Automata váltó', 'Tempomat', 'Parkolóradar elől-hátul', 'Dönthető karfás ülések', 'Dupla tolóajtó', 'Vonóhorog'],
    gallery: [
      'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-viano-silver.png'
    ]
  },
  {
    id: 'vito-8',
    name: 'Mercedes-Benz Vito 115 CDI L',
    seats: '8 személyes',
    trans: 'Manuális',
    km: '250 km/nap',
    luggage: '1 300 L',
    price: '24 000',
    photo: 'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-vito-silver.png',
    popular: false,
    tagline: 'Hosszított kivitel, kivehető ülésekkel — pakolj, amennyit csak kell.',
    fuel: 'Dízel',
    consumption: '7.9 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Többzónás automata klíma (hátsó mennyezeti befúvókkal)',
    engine: '2148 ccm, 150 LE',
    extras: ['Kivehető ülések', 'Parkolóradar elől-hátul', 'Tempomat', 'Vonóhorog', 'CD rádió', 'Multikormány'],
    gallery: [
      'https://vorosbenjamin.github.io/vantogo-frontend/assets/fleet/crop-vito-silver.png'
    ]
  },
  {
    id: 'vito-9-extralong',
    name: 'Mercedes-Benz Vito Extra Long 115 CDI',
    seats: '9 személyes',
    trans: 'Manuális',
    km: '250 km/nap',
    luggage: '1 400 L',
    price: '24 000',
    photo: 'https://static.wixstatic.com/media/f1c7ce_05839d37363f4015a144506f58cbcd7a~mv2.webp',
    popular: false,
    tagline: 'Extra hosszú kivitel, dönthető ülések és hatalmas csomagtér.',
    fuel: 'Dízel',
    consumption: '8.0 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Többzónás automata klíma',
    engine: '2148 ccm, 150 LE',
    extras: ['Extra hosszú kivitel', 'Dönthető karfás ülések pohártartóval', 'Központi zár', 'Tempomat', 'Vonóhorog', 'Multikormány'],
    gallery: [
      'https://static.wixstatic.com/media/f1c7ce_05839d37363f4015a144506f58cbcd7a~mv2.webp'
    ]
  }
];

export const ACCESSORIES = [
  {
    id: 'thule-jetbag-3000',
    name: 'Thule Jetbag 3000 Tetőbox',
    type: 'Tetőbox',
    price: '2 500',
    deposit: '20 000 Ft (Autóval bérlés esetén: 0 Ft)',
    photo: 'https://static.wixstatic.com/media/f1c7ce_ec2739b7471f499bbd50d85a6252ffd3~mv2.jpg',
    tagline: '225x39x30 cm méretű, tágas tetőbox extra csomagok szállításához.',
    specs: {
      méret: '225 x 39 x 30 cm',
      kapacitás: 'kb. 320 Liter',
      nyitás: 'Oldalsó nyitás',
      rögzítés: 'Tetőcsomagtartó rúdra'
    },
    prices: [
      { days: '1-3 nap', price: '2 500 Ft/nap' },
      { days: '4-7 nap', price: '2 000 Ft/nap' },
      { days: '8-30 nap', price: '1 500 Ft/nap' },
      { days: '30+ nap', price: 'Egyedi ár' }
    ],
    extras: ['Biztonsági zár', 'Vízálló kivitel', 'Tetőcsomagtartó rúd tartozék (opcionális)', 'Ingyenes felszerelés']
  },
  {
    id: 'snow-chains',
    name: 'Hólánc',
    type: 'Téli felszerelés',
    price: '1 000',
    deposit: '0 Ft',
    photo: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Biztonságos és megbízható közlekedés téli, havas útviszonyok között.',
    specs: {
      típus: 'Gyors rögzítésű hólánc',
      kompatibilitás: '16", 17" gumiabroncsokra'
    },
    prices: [
      { days: '1+ nap', price: '1 000 Ft/nap' }
    ],
    extras: ['Egyszerű felhelyezés', 'Méretre szabott hordtáska', 'Kesztyű tartozék']
  },
  {
    id: 'bike-rack',
    name: 'Thule lehajtható kerékpártartó',
    type: 'Szállítóeszköz',
    price: '5 000',
    deposit: '30 000 Ft (Autóval bérlés esetén: 0 Ft)',
    photo: 'https://images.unsplash.com/photo-1582298538104-fc2c0a5a00d3?auto=format&fit=crop&w=800&q=80',
    tagline: 'Vonóhorogra szerelhető, lehajtható kerékpártartó 3 bicikli szállításához.',
    specs: {
      kapacitás: '3 db kerékpár',
      szerelés: 'Vonóhorogra rögzíthető',
      funkció: 'Csomagtér nyitásához lehajtható'
    },
    prices: [
      { days: '1+ nap', price: '5 000 Ft/nap' }
    ],
    extras: ['Lezárható kerékpárrögzítők', 'Rendszámtábla tartó', 'Beépített lámpatestek']
  }
];

export const WINTER_PACKAGES = [
  {
    id: 'basic-winter',
    name: 'Alap téli csomag',
    price: '3 000 Ft/nap',
    items: ['Hólánc', 'Európai Assistance szolgáltatás']
  },
  {
    id: 'plus-winter',
    name: 'Plus téli csomag',
    price: '4 000 Ft/nap',
    items: ['Hólánc', 'Európai Assistance szolgáltatás', 'Tetőbox 4 pár síléc szállítására alkalmas síléctartóval']
  },
  {
    id: 'extra-winter',
    name: 'Extra téli csomag',
    price: '5 000 Ft/nap',
    items: ['Hólánc', 'Európai Assistance szolgáltatás', 'Tetőbox tetőcsomagtartóval']
  }
];

export const SEGMENTS = [
  { icon: 'Heart', title: 'Családoknak', text: 'Nyaraláshoz, kiránduláshoz — egy autóval, együtt a család, kényelmesen és biztonságosan.' },
  { icon: 'Briefcase', title: 'Cégeknek', text: 'Csapatépítőre vagy üzleti útra: egyszerre, stílusosan érkezzen az egész csapat.' },
  { icon: 'TentTree', title: 'Túrázóknak', text: 'Tetőbox, kerékpártartó és rengeteg hely a felszerelésnek. Indulhat a kaland.' },
  { icon: 'Volleyball', title: 'Sportcsapatoknak', text: 'Iskolai és sportcsoportoknak — meccsre, edzőtáborba, versenyre, mindenki egy helyen.' },
  { icon: 'PartyPopper', title: 'Esküvőre', text: 'Vendégek és násznép kényelmes szállítása a nagy napon, gondtalanul.' },
  { icon: 'Globe', title: 'Külföldre is', text: 'Kisbuszaink határon túlra is vihetők — európai assistance minden bérléshez.' },
];

export const FEATURES = [
  { icon: 'CalendarCheck', title: 'Online foglalás', text: 'Válaszd ki az autót és a dátumot, küldd el az ajánlatkérést pár perc alatt.' },
  { icon: 'Sparkles', title: 'Tiszta, ápolt autók', text: 'Fertőtlenített belső és évszaknak megfelelő gumi minden induláskor.' },
  { icon: 'ShieldCheck', title: 'Assistance végig', text: 'Európai assistance és teljes körű biztosítás minden bérlés alapja.' },
  { icon: 'BadgePercent', title: 'Átlátható árak', text: 'Bruttó árak, rejtett költségek nélkül. A kaució 200.000 Ft.' },
];

export const FAQS = [
  { q: 'Hogyan foglalhatok kisbuszt?', a: 'Egyszerűen töltsd ki a foglalási űrlapot az autó oldalán. Miután elküldted, felvesszük veled a kapcsolatot, és elküldjük az aláírandó szerződést és az előleg befizetéséhez szükséges díjbekérőt. A foglalás az előleg befizetése után válik véglegessé.' },
  { q: 'Milyen dokumentumok szükségesek a kisbusz bérléséhez?', a: 'Érvényes B kategóriás jogosítvány, személyazonosító okmány és lakcímkártya szükséges. A 8-9 személyes kisbuszaink B kategóriás jogosítvánnyal is vezethetők.' },
  { q: 'Mennyi kauciót szükséges fizetnem?', a: 'A kaució összege gépjárműveknél 200 000 Ft, amelyet az autó hibátlan visszaadása után teljes egészében visszakapsz. Kiegészítők önálló bérlése esetén a kaució 20 000 - 30 000 Ft, kisbusszal együtt bérelve a kiegészítők kauciója 0 Ft!' },
  { q: 'Hány km-t tehetek meg egy nap?', a: 'A bérleti díj 250 km/nap keretet tartalmaz. Túlfutás esetén 90 Ft/km díjat számítunk fel.' },
  { q: 'Mi a teendő baleset vagy meghibásodás esetén?', a: 'Minden bérléshez európai assistance szolgáltatás tartozik. Probléma esetén hívd a szerződésben megadott számot, és segítünk a helyszínen.' },
  { q: 'Vihetem külföldre a kisbuszt?', a: 'Igen, kisbuszaink határon túlra is vihetők. Külföldi út esetén előzetesen jelezd, hogy a megfelelő papírokról gondoskodjunk.' },
];

