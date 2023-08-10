import mongoose from 'mongoose';
const { Schema } = mongoose;

export const offer = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      about: {
        type: String,
        require: true,
      },
      highlights: {
        type: Array,
        require: true,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Offer = mongoose.model('offer', offer, 'offer');
export default Offer;
