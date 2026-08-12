import { ACCESSORIES, FLEET } from '../components/data';

const collections = {
  vehicles: import.meta.env.WIX_VEHICLES_COLLECTION || 'Vehicles',
  accessories: import.meta.env.WIX_ACCESSORIES_COLLECTION || 'Accessories',
  bookings: import.meta.env.WIX_BOOKING_COLLECTION || 'RentalRequests',
};

const wixClientId = import.meta.env.WIX_CLIENT_ID || '';
let selfManagedClient;

const parseJson = (value, fallback) => {
  if (value == null || value === '') return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const normalizeItem = (item) => item?.data ?? item ?? {};

const normalizeVehicle = (item) => {
  const value = normalizeItem(item);
  const fallback = FLEET.find((vehicle) => vehicle.id === (value.slug || value.id || value._id)) || {};
  return {
    ...fallback,
    ...value,
    id: value.slug || value.id || value._id,
    price: String(value.dailyPrice ?? value.price ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    extras: parseJson(value.extrasJson ?? value.extras, fallback.extras ?? []),
    gallery: parseJson(value.galleryJson ?? value.gallery, fallback.gallery ?? (value.photo ? [value.photo] : [])),
  };
};

const normalizeAccessory = (item) => {
  const value = normalizeItem(item);
  const fallback = ACCESSORIES.find((accessory) => accessory.id === (value.slug || value.id || value._id)) || {};
  return {
    ...fallback,
    ...value,
    id: value.slug || value.id || value._id,
    price: String(value.dailyPrice ?? value.price ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    extras: parseJson(value.extrasJson ?? value.extras, fallback.extras ?? []),
    specs: parseJson(value.specsJson ?? value.specs, fallback.specs ?? {}),
    prices: parseJson(value.pricesJson ?? value.prices, fallback.prices ?? []),
  };
};

export function wixCmsEnabled() {
  return import.meta.env.WIX_CMS_ENABLED === 'true';
}

async function queryCollection(collectionId) {
  if (wixClientId) {
    const client = await getSelfManagedClient();
    const result = await client.items.query(collectionId).limit(100).find();
    return result.items ?? [];
  }

  const { items } = await import('@wix/data');
  const result = await items.query(collectionId).limit(100).find();
  return result.items ?? [];
}

async function getSelfManagedClient() {
  if (selfManagedClient) return selfManagedClient;

  const [{ createClient, OAuthStrategy }, { items }] = await Promise.all([
    import('@wix/sdk'),
    import('@wix/data'),
  ]);

  selfManagedClient = createClient({
    auth: OAuthStrategy({ clientId: wixClientId }),
    modules: { items },
  });
  return selfManagedClient;
}

export async function getCatalog() {
  if (!wixCmsEnabled()) {
    return { fleet: FLEET, accessories: ACCESSORIES, source: 'fallback' };
  }

  const [fleetItems, accessoryItems] = await Promise.all([
    queryCollection(collections.vehicles),
    queryCollection(collections.accessories),
  ]);

  return {
    fleet: fleetItems.map(normalizeVehicle).filter((item) => item.id && item.name),
    accessories: accessoryItems.map(normalizeAccessory).filter((item) => item.id && item.name),
    source: 'wix-cms',
  };
}

export async function insertRentalRequest(payload) {
  if (!wixCmsEnabled()) {
    const error = new Error('A Wix CMS kapcsolat még nincs aktiválva.');
    error.code = 'WIX_NOT_CONNECTED';
    throw error;
  }

  if (wixClientId) {
    const client = await getSelfManagedClient();
    return client.items.insert(collections.bookings, payload);
  }

  const [{ items }, { auth }] = await Promise.all([
    import('@wix/data'),
    import('@wix/essentials'),
  ]);
  const elevatedInsert = auth.elevate(items.insert);
  return elevatedInsert(collections.bookings, payload);
}
