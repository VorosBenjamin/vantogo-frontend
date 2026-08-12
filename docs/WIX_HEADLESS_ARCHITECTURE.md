# Wix Headless architektúra és korlátok

## Választott út

A projekt a teljes Wix-managed Headless integrációt célozza:

- Astro 5 szerveroldali frontend;
- React komponensek hidratált interakciókhoz;
- Astro fájl-alapú routing;
- Wix Data a járművekhez, kiegészítőkhöz és ajánlatkérésekhez;
- szerveroldali HTTP endpoint az érzékeny foglalási adatokhoz;
- `auth.elevate()` kizárólag a szűken validált insert művelet körül.

Ez azért jobb ehhez az oldalhoz, mint a „bring your own frontend” SPA út, mert
valódi URL-eket és szerveroldali renderelést ad, támogatja a Wix backend
extensionöket, és a Wix kezeli az auth/hosting integrációt.

## A releváns frontend-limitációk

1. A Wix-managed teljes integráció Astro-alapú. React használható, de az oldal
   keretrendszere Astro; a Wix linkelő jelenleg Astro 5-öt kér, Astro 6-ot nem.
2. A meglévő saját frontendből induló alternatíva csak SPA-kat támogat. Ennél az
   útnál az auth manuális, és jelenleg nem érhetők el extensionök.
3. A korábbi Custom Element kliensoldali nézetváltása nem adott indexelhető,
   közvetlen URL-eket. Az új projekt külön route-okat használ.
4. A teljes React ikonkönyvtár importja 1 MB feletti kliens chunkot okozott. Az
   ikonok explicit importjával az alkalmazás chunkja körülbelül 105 kB-ra csökkent.

## Jelenlegi release-blokkoló

A 2026-08-12-én futtatott production `npm audit` 4 ismert problémát jelzett
(1 low, 1 moderate, 2 high) az Astro 5 / Node adapter függőségi láncában. A
felajánlott javítás Astro 7-re frissítene, miközben a Wix Headless linkelő
jelenleg kifejezetten Astro 5-öt támogat és Astro 6-ot sem fogad el.

Ez platformverzió-ütközés: a projekt lokálisan elkészült és buildel, de éles
release előtt ellenőrizni kell, hogy a Wix kiadott-e Astro 5 backportot vagy
engedélyezte-e a javított új Astro főverziót. `npm audit fix --force` futtatása
nem elfogadható, mert eltörné a Wix-kompatibilitást.

## Backend- és adatkockázatok

- Wix backend extension: legfeljebb 1000 CPU ms kérésenként és 20 al-kérés.
- Projektoldali kérési korlát: 1000 backend kérés/másodperc.
- Preview backend extensionök 3 nap után leállnak, ezért a preview nem staging.
- Egy CMS item maximális mérete 500 kB.
- A Wix Data eventual consistency miatt közvetlen írás utáni olvasás lehet késleltetett.

Az ajánlatkérési endpoint ezért egyetlen Wix insertet végez, nem olvassa vissza
azonnal az új rekordot, és a kliens által küldött árat szerveroldalon újraszámolja.

## Biztonsági határok

- A `RentalRequests` kollekció közvetlen publikus insert/read joga legyen tiltva.
- Az endpoint mezőhosszakat, e-mailt, dátumokat és a katalógustételt validálja.
- Honeypot mező csökkenti az egyszerű bot-spamet.
- Élesítés előtt Wix CAPTCHA/rate limiting vagy külső WAF szabály ajánlott.
- Okmányszám és születési adat személyes adat: csak indokolt ideig tárolható,
  korlátozott dashboard-hozzáféréssel és dokumentált törlési idővel.

## Hivatalos források

- https://dev.wix.com/docs/go-headless/get-started/choose-your-development-path
- https://dev.wix.com/docs/wix-cli/command-reference/project-creation/create-headless-link
- https://dev.wix.com/docs/go-headless/wix-managed-headless/full-integration-astro/extensions/backend/http-endpoints/about-http-endpoints
- https://dev.wix.com/docs/go-headless/authentication/admin/elevate-api-call-permissions-with-the-astro-integration
- https://dev.wix.com/docs/go-headless/wix-managed-headless/extensions/backend/about-wix-cli-backend-extensions
- https://dev.wix.com/docs/sdk/api-reference/data/introduction
