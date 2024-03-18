db = db.getSiblingDB('admin');
db.auth("mongo", "Y72mXGKzD0J6fhg4")
db = db.getSiblingDB('test');
db.createUser({
    'user': 'test',
    'pwd': 'test',
    'roles': [{
        'role': 'dbOwner',
        'db': 'test'
    }]
})

db.createCollection('washingmachines')
db.washingmachines.insertMany([
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABT',
      name: 'Pralka QuickDrive™',
      color: 'biała',
      capacity: 9,
      dimensions: '55 x 60 x 85 cm',
      features: [
        'Drzwi AddWash™',
        'Panel AI Control',
        'Silnik inwerterowy',
        'Wyświetlacz elektroniczny',
      ],
      energyClass: 'A',
      price: {
        value: 2999.1,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABH',
      name: 'Pralka QuickDrive™',
      color: 'biała',
      capacity: 10.5,
      dimensions: '55 x 60 x 85 cm',
      features: ['Panel AI Control', 'Silnik inwerterowy', 'Wyświetlacz elektroniczny'],
      energyClass: 'A',
      price: {
        value: 1999.2,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABC',
      name: 'Pralka QuickDrive™',
      color: 'biała',
      capacity: 8,
      dimensions: '55 x 60 x 85 cm',
      features: [
        'Drzwi AddWash™',
        'Panel AI Control',
        'Silnik inwerterowy',
        'Wyświetlacz elektroniczny',
      ],
      energyClass: 'A',
      price: {
        value: 1799.0,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABD',
      name: 'Pralka QuickDrive™',
      color: 'biała',
      capacity: 9,
      dimensions: '55 x 60 x 85 cm',
      features: ['Drzwi AddWash™', 'Panel AI Control', 'Silnik inwerterowy'],
      energyClass: 'B',
      price: {
        value: 1999.0,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABE',
      name: 'Pralka QuickDrive™',
      color: 'biała',
      capacity: 10.5,
      dimensions: '55 x 60 x 85 cm',
      features: [
        'Drzwi AddWash™',
        'Panel AI Control',
        'Silnik inwerterowy',
        'Wyświetlacz elektroniczny',
      ],
      energyClass: 'C',
      price: {
        value: 1999.0,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABF',
      name: 'Pralka QuickDrive™',
      color: 'biała',
      capacity: 8,
      dimensions: '55 x 60 x 85 cm',
      features: ['Drzwi AddWash™', 'Panel AI Control', 'Wyświetlacz elektroniczny'],
      energyClass: 'B',
      price: {
        value: 1999.0,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABT001',
      name: 'Pralka QuickDrive™1',
      color: 'biała',
      capacity: 9,
      dimensions: '55 x 60 x 85 cm',
      features: [
        'Panel AI Control',
        'Wyświetlacz elektroniczny',
        'Drzwi AddWash™'
      ],
      energyClass: 'A',
      price: {
        value: 2999.1,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    },
    {
      image:
        'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
      code: 'WW90T754ABT002',
      name: 'Pralka QuickDrive™2',
      color: 'biała',
      capacity: 9,
      dimensions: '55 x 60 x 85 cm',
      features: [
        'Panel AI Control',
        'Wyświetlacz elektroniczny',
      ],
      energyClass: 'A',
      price: {
        value: 2999.1,
        currency: 'zł',
        installment: {
          value: 53.31,
          period: 60,
        },
        validFrom: new Date('2021-01-01'),
        validTo: new Date('2021-12-31'),
      },
    }
  ]);

//   // Create collection for features
// db.createCollection('features');

// // Insert features data
// db.features.insertMany([
//   { name: 'Drzwi AddWash™' },
//   { name: 'Panel AI Control' },
//   { name: 'Silnik inwerterowy' },
//   { name: 'Wyświetlacz elektroniczny' },
// ]);

// // Update washingmachines collection to reference features by name
// db.washingmachines.find().forEach(function(wm) {
//   const features = [];
//   wm.features.forEach(function(feature) {
//     const featureDoc = db.features.findOne({ name: feature });
//     if (featureDoc) {
//       features.push(featureDoc._id);
//     }
//   });
//   wm.features = features;
//   db.washingmachines.updateOne({ _id: wm._id }, { $set: { features: features } });
// });