import Payment from './schemas/payment.js';

const createNewPayment = async paymentData => {
  return Payment.create({
    itemId: paymentData.itemId,
    amount: paymentData.amount,
    refererToItem: paymentData.refererToItem,
    regulationsAccepted: paymentData.regulationsAccepted,
    owner: paymentData.owner,
    buyer: paymentData.buyer,
  });
};

const getPaymentByOwner = async (ownerId, itemId) => {
  return Payment.findOne({ $and: [{ owner: ownerId }, { itemId: itemId }] });
};

const paymentService = {
  createNewPayment,
  getPaymentByOwner,
};
export default paymentService;
