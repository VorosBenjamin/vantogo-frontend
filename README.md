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

## Összekapcsolás Wix-managed Headless projekttel

Az alábbi parancs külső művelet: új Wix business/site projektet hoz létre a
bejelentkezett Wix-fiókban, majd a helyi Astro projektet hozzákapcsolja.

```bash
npm create @wix/new -- headless link --business-name "VanToGo"
```

A Wix linkelő a helyi Node adaptert Wix hosting adapterre cseréli, hozzáadja az
`@wix/astro` integrációt, létrehozza a `wix.config.json` fájlt és átírja a
projektparancsokat. Ezt követően:

1. Hozd létre a `docs/CMS_SETUP.md` szerinti három CMS-kollekciót.
2. Töltsd fel a Vehicles és Accessories tartalmát.
3. Állítsd be a Wix Secrets/Environment Variables felületén:
   `WIX_CMS_ENABLED=true`.
4. Futtasd a Wix által létrehozott `dev`, majd `preview` parancsot.
5. Valódi teszt-ajánlatkéréssel ellenőrizd a `RentalRequests` mentést.
6. Csak ezután futtasd a `release` parancsot.

## Fontos fájlok

- `src/App.jsx` – a React felület és URL-navigáció
- `src/components/CatalogContext.jsx` – Wix CMS/fallback katalógusváltás
- `src/lib/wixCatalog.js` – Wix Data adapter és emelt jogosultságú mentés
- `src/pages/api/catalog.js` – publikus katalógusvégpont
- `src/pages/api/rental-request.js` – validált ajánlatkérési végpont
- `docs/WIX_HEADLESS_ARCHITECTURE.md` – döntések és platformkorlátok
- `docs/CMS_SETUP.md` – szükséges Wix CMS mezők és jogosultságok

## Jelenlegi státusz

A projekt helyileg buildelhető és a Wix-managed Headless Astro 5 linkelési
folyamatára készen áll. Még nincs Wix-fiókbeli projekthez kapcsolva, ezért nincs
`wix.config.json`, élő CMS-adat vagy publikált URL. Az aktuális Astro 5
biztonsági audit release-blokkolóját lásd a `docs/WIX_HEADLESS_ARCHITECTURE.md`
fájlban; ezt éles publikálás előtt fel kell oldani.
