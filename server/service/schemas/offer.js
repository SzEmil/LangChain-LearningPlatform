import mongoose from 'mongoose';
const { Schema } = mongoose;

export const offer = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    currency: {
      type: String,
      require: true,
      enum: ['PLN', 'EUR'],
      default: 'PLN',
    },
    targetCourseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    price: {
      type: Number,
      require: true,
    },
    language: {
      type: String,
      enum: ['PL', 'ENG'],
      default: 'ENG',
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
