import { mkdirSync, writeFileSync } from 'node:fs';
import { ACCESSORIES, FLEET } from '../src/components/data.js';

const outputDirectory = new URL('../wix-managed-migration/', import.meta.url);
mkdirSync(outputDirectory, { recursive: true });

const textField = (key, displayName = key, required = false) => ({
  key,
  displayName,
  type: 'TEXT',
  ...(required ? { required: true } : {}),
});

const numberField = (key, displayName = key) => ({ key, displayName, type: 'NUMBER' });
const booleanField = (key, displayName = key) => ({ key, displayName, type: 'BOOLEAN' });
const dateTimeField = (key, displayName = key) => ({ key, displayName, type: 'DATETIME' });

const publicCatalogPermissions = {
  insert: 'ADMIN',
  update: 'ADMIN',
  remove: 'ADMIN',
  read: 'ANYONE',
};

const privatePermissions = {
  insert: 'ADMIN',
  update: 'ADMIN',
  remove: 'ADMIN',
  read: 'ADMIN',
};

const collections = {
  Vehicles: {
    collection: {
      id: 'Vehicles',
      displayName: 'Vehicles',
      fields: [
        textField('name', 'Name', true),
        textField('slug', 'Slug', true),
        textField('seats', 'Seats'),
        textField('trans', 'Transmission'),
        textField('drive', 'Drive'),
        textField('driveName', 'Drive name'),
        textField('driveShort', 'Drive short'),
        textField('km', 'Daily distance'),
        textField('luggage', 'Luggage'),
        numberField('dailyPrice', 'Daily price'),
        textField('photo', 'Photo URL'),
        booleanField('popular', 'Popular'),
        textField('tagline', 'Tagline'),
        textField('fuel', 'Fuel'),
        textField('consumption', 'Consumption'),
        textField('deposit', 'Deposit'),
        textField('aircon', 'Air conditioning'),
        textField('engine', 'Engine'),
        textField('extrasJson', 'Extras JSON'),
        textField('galleryJson', 'Gallery JSON'),
      ],
      permissions: publicCatalogPermissions,
    },
  },
  Accessories: {
    collection: {
      id: 'Accessories',
      displayName: 'Accessories',
      fields: [
        textField('name', 'Name', true),
        textField('slug', 'Slug', true),
        textField('type', 'Type'),
        numberField('dailyPrice', 'Daily price'),
        textField('deposit', 'Deposit'),
        textField('photo', 'Photo URL'),
        textField('tagline', 'Tagline'),
        textField('specsJson', 'Specifications JSON'),
        textField('pricesJson', 'Prices JSON'),
        textField('extrasJson', 'Extras JSON'),
      ],
      permissions: publicCatalogPermissions,
    },
  },
  RentalRequests: {
    collection: {
      id: 'RentalRequests',
      displayName: 'Rental Requests',
      fields: [
        textField('status', 'Status'),
        textField('itemId', 'Item ID'),
        textField('itemName', 'Item name'),
        textField('itemType', 'Item type'),
        dateTimeField('startAt', 'Start'),
        dateTimeField('endAt', 'End'),
        dateTimeField('submittedAt', 'Submitted'),
        textField('pickupTime', 'Pickup time'),
        textField('returnTime', 'Return time'),
        textField('deliveryOption', 'Delivery option'),
        numberField('days', 'Days'),
        numberField('dailyPrice', 'Daily price'),
        numberField('totalPrice', 'Total price'),
        textField('customerName', 'Customer name'),
        textField('email', 'Email'),
        textField('phone', 'Phone'),
        textField('note', 'Note'),
        textField('idCardNumber', 'ID card number'),
        textField('licenseNumber', 'License number'),
        textField('birthPlace', 'Birth place'),
        textField('birthDate', 'Birth date'),
        textField('customerZip', 'ZIP code'),
        textField('city', 'City'),
        textField('address', 'Address'),
        booleanField('hasDocumentsProvided', 'Documents provided'),
        booleanField('privacyAccepted', 'Privacy accepted'),
        textField('source', 'Source'),
      ],
      permissions: privatePermissions,
    },
  },
};

const vehicleItems = FLEET.map((vehicle) => ({
  data: {
    name: vehicle.name,
    slug: vehicle.id,
    seats: vehicle.seats,
    trans: vehicle.trans,
    drive: vehicle.drive,
    driveName: vehicle.driveName,
    driveShort: vehicle.driveShort,
    km: vehicle.km,
    luggage: vehicle.luggage,
    dailyPrice: Number(vehicle.price.replace(/\D/g, '')),
    photo: vehicle.photo,
    popular: vehicle.popular,
    tagline: vehicle.tagline,
    fuel: vehicle.fuel,
    consumption: vehicle.consumption,
    deposit: vehicle.deposit,
    aircon: vehicle.aircon,
    engine: vehicle.engine,
    extrasJson: JSON.stringify(vehicle.extras),
    galleryJson: JSON.stringify(vehicle.gallery),
  },
}));

const accessoryItems = ACCESSORIES.map((accessory) => ({
  data: {
    name: accessory.name,
    slug: accessory.id,
    type: accessory.type,
    dailyPrice: Number(accessory.price.replace(/\D/g, '')),
    deposit: accessory.deposit,
    photo: accessory.photo,
    tagline: accessory.tagline,
    specsJson: JSON.stringify(accessory.specs),
    pricesJson: JSON.stringify(accessory.prices),
    extrasJson: JSON.stringify(accessory.extras),
  },
}));

const payloads = {
  'create-vehicles.json': collections.Vehicles,
  'create-accessories.json': collections.Accessories,
  'create-rental-requests.json': collections.RentalRequests,
  'insert-vehicles.json': {
    dataCollectionId: 'Vehicles',
    dataItems: vehicleItems,
    returnEntity: true,
  },
  'insert-accessories.json': {
    dataCollectionId: 'Accessories',
    dataItems: accessoryItems,
    returnEntity: true,
  },
};

for (const [filename, payload] of Object.entries(payloads)) {
  writeFileSync(new URL(filename, outputDirectory), `${JSON.stringify(payload, null, 2)}\n`);
}

console.log(`Prepared ${Object.keys(payloads).length} Wix migration payloads.`);
