import { Schema, model } from 'mongoose';

const featureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Feature = model('Feature', featureSchema);

export default Feature;