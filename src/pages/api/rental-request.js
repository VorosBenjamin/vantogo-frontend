import { getCatalog, insertRentalRequest } from '../../lib/wixCatalog';
import { getTodayInBudapest, isAtLeast18On } from '../../lib/ageValidation';

const text = (value, max = 200) => String(value ?? '').trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    },
  });
}

function validationError(field, error) {
  return json({ error, field, code: 'VALIDATION_ERROR' }, 422);
}

function calculateDays(startAt, endAt) {
  const milliseconds = endAt.getTime() - startAt.getTime();
  return milliseconds > 0 ? Math.ceil(milliseconds / 86_400_000) : 0;
}

export const POST = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'Érvénytelen kérés.' }, 415);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'A kérés nem olvasható.' }, 400);
  }

  // Honeypot: bots tend to fill fields hidden from real visitors.
  if (text(input.companyWebsite, 200)) return json({ ok: true, requestId: 'accepted' }, 202);

  const customerName = text(input.customerName, 120);
  const customerEmail = text(input.customerEmail, 180).toLowerCase();
  const customerPhone = text(input.customerPhone, 60);
  const itemId = text(input.vehicleId, 80);
  const isAccessory = Boolean(input.isAccessory);
  const birthDate = text(input.birthDate, 10);
  const privacyAccepted = input.privacyAccepted === true;
  const startAt = new Date(`${text(input.startDate, 10)}T${text(input.pickupTime, 5)}`);
  const endAt = new Date(`${text(input.endDate, 10)}T${text(input.returnTime, 5)}`);
  const days = calculateDays(startAt, endAt);

  if (!customerName) return validationError('customerName', 'Add meg a teljes nevedet.');
  if (!emailPattern.test(customerEmail)) return validationError('customerEmail', 'Adj meg egy érvényes e-mail-címet.');
  if (!customerPhone) return validationError('customerPhone', 'Add meg a telefonszámodat.');
  if (!itemId) return validationError('booking', 'Válassz ki egy járművet vagy kiegészítőt.');
  if (days < 1) return validationError('booking', 'Ellenőrizd az átvétel és a leadás dátumát: a leadásnak később kell lennie.');
  if (!privacyAccepted) return validationError('privacyAccepted', 'Az ajánlatkéréshez fogadd el az adatkezelési tájékoztatót.');

  if (!isAccessory && !birthDate) {
    return validationError('birthDate', 'Az életkor ellenőrzéséhez add meg a születési idődet.');
  }

  if (!isAccessory && !isAtLeast18On(birthDate, getTodayInBudapest())) {
    return validationError('birthDate', '18 év alattiak nem tudnak foglalni.');
  }

  try {
    const catalog = await getCatalog();
    const selected = (isAccessory ? catalog.accessories : catalog.fleet).find((item) => item.id === itemId);
    if (!selected) return validationError('booking', 'A kiválasztott jármű vagy kiegészítő nem található. Válassz másikat.');

    let dailyPrice = Number.parseInt(String(selected.price).replace(/\D/g, ''), 10);
    if (isAccessory && selected.id === 'thule-jetbag-3000') {
      dailyPrice = days <= 3 ? 2500 : days <= 7 ? 2000 : 1500;
    }
    const deliveryOption = isAccessory ? 'telephely' : text(input.deliveryOption, 20) || 'telephely';
    const totalPrice = days * dailyPrice + (deliveryOption === 'hazhoz' ? 10000 : 0);

    const stored = await insertRentalRequest({
      status: 'new',
      itemId,
      itemName: selected.name,
      itemType: isAccessory ? 'accessory' : 'vehicle',
      startAt,
      endAt,
      pickupTime: text(input.pickupTime, 5),
      returnTime: text(input.returnTime, 5),
      deliveryOption,
      days,
      dailyPrice,
      totalPrice,
      customerName,
      email: customerEmail,
      phone: customerPhone,
      note: text(input.customerNote, 2000),
      idCardNumber: text(input.idCardNumber, 80),
      licenseNumber: text(input.licenseNumber, 80),
      birthPlace: text(input.birthPlace, 120),
      birthDate,
      customerZip: text(input.customerZip, 12),
      city: text(input.customerCity, 120),
      address: text(input.customerAddress, 240),
      hasDocumentsProvided: Boolean(input.hasDocumentsProvided),
      privacyAccepted,
      submittedAt: new Date(),
      source: 'vantogo-headless',
    });

    return json({ ok: true, requestId: stored?._id ?? stored?.id ?? 'created' }, 201);
  } catch (error) {
    if (error?.code === 'WIX_NOT_CONNECTED') {
      return json({ error: error.message, code: error.code }, 503);
    }
    console.error('Rental request insert failed', error);
    return json({ error: 'Az ajánlatkérés mentése most nem sikerült. Kérjük, próbáld újra.' }, 500);
  }
};
