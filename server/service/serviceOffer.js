import Offer from './schemas/offer.js';

const getOffer = language => {
  return Offer.find({ language: language });
};

const offerService = {
  getOffer,
};
export default offerService;
