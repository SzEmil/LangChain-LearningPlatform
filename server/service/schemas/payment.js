import mongoose from 'mongoose';
const { Schema } = mongoose;

export const payments = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      require: true,
    },
    amount: {
      type: String,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    refererToItem: {
      type: String,
      require: true,
    },
    currency: {
      type: String,
      require: true,
      default: 'PLN',
    },
    payInfo: {
      type: String,
    },
    payMethod: {
      type: String,
    },
    // paymentMethod: {
    //   type: String,
    //   require: true,
    // },
    paymentStatus: {
      type: String,
      require: true,
      enum: ['PENDING', 'WAITING_FOR_CONFIRMATION', 'COMPLETED', 'CANCELED'],
      default: 'PENDING',
    },
    refundStatus: {
      type: String,
      default: 'none',
      require: true,
    },
    regulationsAccepted: {
      type: Boolean,
      require: true,
    },
    buyer: {
      language: {
        type: String,
        require: true,
      },
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      phoneNumber: {
        type: String,
        require: true,
      },
      address: {
        street: {
          type: String,
          require: true,
        },
        flatNumber: {
          type: String,
          require: true,
        },
        zipCode: {
          type: String,
          require: true,
        },
        place: {
          type: String,
          require: true,
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const Payment = mongoose.model('payment', payments, 'payments');
export default Payment;
