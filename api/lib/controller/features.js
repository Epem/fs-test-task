import mongo from '../conn/mongo.js';

const features = () => {
  return async function (req, res, next) {
    try {
      const response = await mongo.getEnergyClassesAndCapacitiesAndFeatures();
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching features:', error);
      res.status(500).json({ error: 'Internal Server Error, incident logged.' });
    }
  };
};

export default (page) => {
  return [
    features()
  ];
};