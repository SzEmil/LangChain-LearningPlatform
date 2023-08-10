import offerService from '../service/serviceOffer.js';
import userService from '../service/serviceUsers.js';

const getCurrentOfferData = async (req, res, next) => {
  try {
    const offer = await offerService.getOffer();

    if (!offer) {
      res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: 'No data was found',
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'data fetched successfully',
        offer: offer,
      },
    });
  } catch (error) {
    next(error);
  }
};

const offerController = {
  getCurrentOfferData,
};
export default offerController;
