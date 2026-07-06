# VanToGo! Frontend Web Component

Ez a VanToGo! (kisbusz bérlés) weboldalának forráskódja.
A weboldal egy **React alapú (Vite) Single Page Application (SPA)**, ami egyedi beállításokkal lett konfigurálva úgy, hogy **Web Componentként (Custom Element)** futhasson a Wix platformon belül is.

## Technikai Stack
- React 18
- Vite
- react-to-webcomponent (A Wix integrációhoz)
- Lucide React (Ikonok)

## Fejlesztés Helyben
1. Függőségek telepítése: `npm install`
2. Fejlesztői szerver indítása: `npm run dev`
3. Nyisd meg a bongészőben a kiírt localhost címet (pl. `http://localhost:5173`)

## Telepítés / Build
`npm run build`

Ez legenerálja a `dist/` mappát a Web Component (`vantogo-app`) fájlokkal, amelyeket fel lehet tölteni a GitHub Pages-re vagy CDN-re, majd beágyazni a Wix Editor Custom Element részébe.

## Wix Integráció Röviden
- A kód felépít egy `<vantogo-app>` HTML taget.
- A navigációt és a foglalás beküldését a böngésző belső `CustomEvent` hívásaival kommunikálja a Wix Velo réteg felé:
  - `vantogoNavigate`: Oldalváltás jelzése
  - `vantogoBookingSubmit`: Foglalási űrlap adatai (ezt a Wix menti az adatbázisba)
