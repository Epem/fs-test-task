import { Schema, model } from 'mongoose';

const washingMachineSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  energyClass: {
    type: String,
    required: true,
  },
  price: {
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    installment: {
      value: {
        type: Number,
        required: true,
      },
      period: {
        type: Number,
        required: true,
      },
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
  },
});

const WashingMachine = model('WashingMachine', washingMachineSchema);

export default WashingMachine;