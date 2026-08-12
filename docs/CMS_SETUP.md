# Wix CMS beállítás

A kollekcióazonosítók pontosan ezek legyenek, vagy add meg az eltérő neveket a
megfelelő környezeti változókkal.

## Vehicles

Jogosultságok: read `ANYONE`; insert/update/remove `CMS_EDITOR`.

| Mező ID | Típus | Megjegyzés |
| --- | --- | --- |
| `name` | TEXT | Elsődleges mező |
| `slug` | TEXT | Egyedi URL-azonosító, pl. `vito-9` |
| `seats` | TEXT | Pl. `9 személyes` |
| `trans` | TEXT | Manuális/Automata |
| `drive`, `driveName`, `driveShort` | TEXT | Meghajtás |
| `km`, `luggage` | TEXT | Limit és csomagtér |
| `dailyPrice` | NUMBER | Bruttó napi díj forintban |
| `photo` | IMAGE | Főkép |
| `popular` | BOOLEAN | Kiemelés |
| `tagline`, `fuel`, `consumption`, `deposit`, `aircon`, `engine` | TEXT | Részletek |
| `extrasJson` | TEXT | JSON tömb |
| `galleryJson` | TEXT | Kép URL-ek JSON tömbje |

## Accessories

Jogosultságok: read `ANYONE`; insert/update/remove `CMS_EDITOR`.

| Mező ID | Típus | Megjegyzés |
| --- | --- | --- |
| `name` | TEXT | Elsődleges mező |
| `slug` | TEXT | Egyedi URL-azonosító |
| `type` | TEXT | Kategória |
| `dailyPrice` | NUMBER | Alap napi díj |
| `deposit`, `tagline` | TEXT | Leíró adatok |
| `photo` | IMAGE | Főkép |
| `specsJson` | TEXT | JSON objektum |
| `pricesJson` | TEXT | Díjsávok JSON tömbje |
| `extrasJson` | TEXT | Jellemzők JSON tömbje |

## RentalRequests

Jogosultságok: read/insert/update/remove `CMS_EDITOR`. A publikus frontend ne
kapjon közvetlen hozzáférést; az Astro endpoint emelt, szűkített inserttel ír.

| Mező ID | Típus |
| --- | --- |
| `status`, `itemId`, `itemName`, `itemType` | TEXT |
| `startAt`, `endAt`, `submittedAt` | DATETIME |
| `pickupTime`, `returnTime`, `deliveryOption` | TEXT |
| `days`, `dailyPrice`, `totalPrice` | NUMBER |
| `customerName`, `customerEmail`, `customerPhone` | TEXT |
| `customerNote` | TEXT |
| `idCardNumber`, `licenseNumber`, `birthPlace`, `birthDate` | TEXT |
| `customerZip`, `customerCity`, `customerAddress` | TEXT |
| `hasDocumentsProvided`, `privacyAccepted` | BOOLEAN |
| `source` | TEXT |

Az okmány-, születési és lakcímmezőket a Wix adatvédelmi beállításaiban jelöld
személyes adatként, és korlátozd a kollekció dashboard-hozzáférését.

## Környezeti változók

```dotenv
WIX_CMS_ENABLED=true
WIX_VEHICLES_COLLECTION=Vehicles
WIX_ACCESSORIES_COLLECTION=Accessories
WIX_BOOKING_COLLECTION=RentalRequests
```
