import offerService from '../service/serviceOffer.js';

const getCurrentOfferData = async (req, res, next) => {
  try {
    const { language } = req.body;

    if (!language) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        ResponseBody: {
          message: 'No body',
        },
      });
    }

    const offer = await offerService.getOffer(language);

    if (!offer) {
      return res.status(404).json({
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
