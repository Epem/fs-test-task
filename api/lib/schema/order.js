import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  orderedMachines: [
    {
      machine: {
        type: Schema.Types.ObjectId,
        ref: 'WashingMachine',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
});

const Order = model('Order', orderSchema);

export default Order;