# VanToGo Headless

A korábbi Wix Custom Elementre épülő VanToGo frontend Astro 5 + React alapú,
Wix-managed Headlessre előkészített változata.

## Mi változott?

- Nincs `react-to-webcomponent`, `<vantogo-app>` vagy Velo `CustomEvent` híd.
- Minden fő nézetnek valódi, közvetlenül megnyitható URL-je van.
- A katalógus a Wix CMS-ből tölthető, fejlesztéskor helyi fallback adatokkal.
- Az ajánlatkérés szerveroldali `/api/rental-request` végponton át kerül a Wix CMS-be.
- A backend újraszámolja a napokat és a díjat; nem bízik a böngészőből küldött árban.
- A sikeres panel csak tényleges Wix-mentés után jelenik meg.

## Helyi futtatás

Node.js 20.11 vagy újabb szükséges.

```bash
npm install
npm run dev
```

A helyi katalógus Wix-kapcsolat nélkül is megjelenik. A foglalási végpont ilyenkor
szándékosan `503 WIX_NOT_CONNECTED` választ ad, tehát nem jelez hamis sikert.

## Wix-managed Headless projekt

Az oldal a `VanToGo` Wix-managed Headless projekthez kapcsolódik. A Wix CLI
kezeli az automatikus hitelesítést, a buildet és a Wix hosting kiadását.

```bash
npm run dev
npm run build
npm run release
```

Az új Wix CMS környezet a következő kollekciókat használja:

- `Vehicles`
- `Accessories`
- `RentalRequests`

A reprodukálható CMS-migráció fájljai a `scripts/` és
`wix-managed-migration/` mappákban találhatók.

## Fontos fájlok

- `src/App.jsx` – a React felület és URL-navigáció
- `src/components/CatalogContext.jsx` – Wix CMS/fallback katalógusváltás
- `src/lib/wixCatalog.js` – Wix Data adapter és emelt jogosultságú mentés
- `src/pages/api/catalog.js` – publikus katalógusvégpont
- `src/pages/api/rental-request.js` – validált ajánlatkérési végpont
- `docs/WIX_HEADLESS_ARCHITECTURE.md` – döntések és platformkorlátok
- `docs/CMS_SETUP.md` – szükséges Wix CMS mezők és jogosultságok

## Jelenlegi státusz

A projekt Wix-managed Headlesshez kapcsolódik. A katalógusadatok és a privát
ajánlatkérés-kollekció az új Wix projektben vannak; az éles URL-t a sikeres
`npm run release` parancs adja vissza.
