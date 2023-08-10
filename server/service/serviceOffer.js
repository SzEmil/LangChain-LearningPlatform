import Offer from './schemas/offer.js';

const getOffer = () => {
  return Offer.find();
};

const offerService = {
  getOffer,
};
export default offerService;
