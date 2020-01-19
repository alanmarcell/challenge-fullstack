import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  weight: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    complement: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    geoLocalization: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const deliveryModel = mongoose.model('delivery', deliverySchema);

export { deliveryModel, deliverySchema };
