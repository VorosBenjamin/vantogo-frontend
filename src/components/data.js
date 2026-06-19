export const FLEET = [
  {
    id: 'vito-9',
    name: 'Mercedes-Benz Vito',
    seats: '9 személyes',
    trans: 'Manuális',
    km: '250 km/nap',
    luggage: '1 300 L',
    price: '25 000',
    photo: '/assets/fleet/crop-vito-black.png',
    popular: true,
    tagline: 'Tágas, megbízható, ideális családoknak és csapatoknak.',
    fuel: 'Dízel',
    consumption: '7.8 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Többzónás klíma (elöl-hátul)',
    extras: ['Tolatóradar', 'Bluetooth kihangosító', 'Tempomat', 'USB töltőcsatlakozók', 'ISOFIX rögzítési pontok'],
    gallery: [
      '/assets/fleet/crop-vito-black.png',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'vivaro-9',
    name: 'Opel Vivaro',
    seats: '9 személyes',
    trans: 'Manuális',
    km: '250 km/nap',
    luggage: '1 200 L',
    price: '22 000',
    photo: '/assets/fleet/crop-opel-vivaro.png',
    popular: false,
    tagline: 'Kedvező árú, gazdaságos kisbusz a hosszabb utakra.',
    fuel: 'Dízel',
    consumption: '6.9 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Manuális klíma (elöl-hátul)',
    extras: ['Tolatóradar', 'Tempomat', 'Bluetooth', 'USB csatlakozó', 'Hatalmas csomagtér'],
    gallery: [
      '/assets/fleet/crop-opel-vivaro.png',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'viano-8',
    name: 'Mercedes-Benz Viano',
    seats: '8 személyes',
    trans: 'Automata',
    km: '250 km/nap',
    luggage: '1 300 L',
    price: '28 000',
    photo: '/assets/fleet/crop-viano-silver.png',
    popular: false,
    tagline: 'Automata váltó és prémium kényelem a kényelmes utazáshoz.',
    fuel: 'Dízel',
    consumption: '8.5 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Többzónás automata klíma',
    extras: ['Bőr belső', 'Automata váltó', 'Tempomat', 'Tolatókamera', 'Navigáció', 'Fűthető ülések'],
    gallery: [
      '/assets/fleet/crop-viano-silver.png',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
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
    photo: '/assets/fleet/crop-vito-silver.png',
    popular: false,
    tagline: 'Hosszított kivitel, kivehető ülésekkel — pakolj, amennyit csak kell.',
    fuel: 'Dízel',
    consumption: '7.9 L / 100 km',
    deposit: '200 000 Ft',
    aircon: 'Kétzónás klíma',
    extras: ['Kivehető ülések', 'Bluetooth kihangosító', 'Tolatóradar', 'Tempomat', 'Vonóhorog opció'],
    gallery: [
      '/assets/fleet/crop-vito-silver.png',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    ]
  },
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
  { q: 'Mennyi kauciót szükséges fizetnem?', a: 'A kaució összege 200 000 Ft, amelyet az autó hibátlan visszaadása után teljes egészében visszakapsz.' },
  { q: 'Hány km-t tehetek meg egy nap?', a: 'A bérleti díj 250 km/nap keretet tartalmaz. Túlfutás esetén 90 Ft/km díjat számítunk fel.' },
  { q: 'Mi a teendő baleset vagy meghibásodás esetén?', a: 'Minden bérléshez európai assistance szolgáltatás tartozik. Probléma esetén hívd a szerződésben megadott számot, és segítünk a helyszínen.' },
  { q: 'Vihetem külföldre a kisbuszt?', a: 'Igen, kisbuszaink határon túlra is vihetők. Külföldi út esetén előzetesen jelezd, hogy a megfelelő papírokról gondoskodjunk.' },
];
