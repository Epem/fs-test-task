import mongoose from 'mongoose';


function generateMongoURL(username, password, cluster, database) {
  const connectionString = `mongodb://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&directConnection=true`;
  console.log(connectionString)
  return connectionString;
}

mongoose.connect(generateMongoURL(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD, 'mongo:27017', process.env.MONGO_DATABASE));
const db = mongoose.connection;

import WashingMachine from '../schema/products.js';
import Order from '../schema/order.js';
import Feature from '../schema/features.js'


class MongoSingleton {
  constructor() {
    if (!MongoSingleton.instance) {
      MongoSingleton.instance = this;
    }
    return MongoSingleton.instance;
  }

  async saveMachine(data) {
    const newDocument = new WashingMachine(data);
    return newDocument.save();
  }

  async getMachineByQuery(query) {
    return WashingMachine.findOne(query).exec();
  }

  async getMachinesByQuery(query) {
    return WashingMachine.find(query).exec();
  }

  async getMachinesWithFeatures(query = {}, sortField = '', skip = 0, limit = 6) {
    try {
        const aggregationPipeline = [
            {
                $match: query,
            },
            {
                $project: {
                    _id: 1,
                    image: 1,
                    code: 1,
                    name: 1,
                    color: 1,
                    capacity: 1,
                    dimensions: 1,
                    energyClass: 1,
                    price: 1,
                    features: 1,
                },
            },
            {
                $sort: sortField ? { [sortField]: 1 } : { _id: 1 },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ];

        const machinesWithFeatures = await WashingMachine.aggregate(aggregationPipeline);

        return machinesWithFeatures;
    } catch (error) {
        console.error('Error fetching machines with features:', error);
        throw error;
    }
}


  async updateMachineByQuery(key, updateData) {
    return WashingMachine.findOneAndUpdate(key, {
      $set: updateData
    }, {
      new: true
    }).exec();
  }

  async saveOrder(data) {
    const newDocument = new Order(data);
    return newDocument.save();
  }

  async getOrderByQuery(key) {
    return Order.findOne(key).exec();
  }

  async updateOrderByQuery(key, updateData) {
    return Order.findOneAndUpdate(key, {
      $set: updateData
    }, {
      new: true
    }).exec();
  }
  async getFeatures() {
    return Feature.find().exec();
  }

  async connectionIsUp() {
    try {
      const adminUtil = db.db.admin()
      const result = await adminUtil.ping()
      return !!(result?.ok === 1)
    } catch (err) {
      return false
    }
  }
  async getEnergyClassesAndCapacitiesAndFeatures() {
    try {
      let energyClasses = await WashingMachine.distinct('energyClass');
      let capacity = await WashingMachine.distinct('capacity');
      let features = await WashingMachine.distinct('features')
      energyClasses = energyClasses.map(el=> { return { name: el }})
      capacity = capacity.map(el=> { return { name: el }})
      features = features.map(el=> { return { name: el }})
      return { energyClasses, capacity, features };
    } catch (error) {
      throw new Error('Error fetching energy classes and capacities:', error);
    }
  };

}

export default new MongoSingleton();