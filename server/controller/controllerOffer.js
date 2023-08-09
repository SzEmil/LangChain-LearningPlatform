import offerService from '../service/serviceOffer.js';
import userService from '../service/serviceUsers.js';
const getCurrentOfferData = async (req, res, next) => {
  const { _id } = req.user;
  const user = await userService.getUserById(_id);
  if (!user) {
    res.status(401).json({
      status: 'error',
      code: 401,
      ResponseBody: {
        message: 'Unauthorized',
      },
    });
  }
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

    return res.status(204).json({
      status: 'success',
      code: 204,
      ResponseBody: {
        message: 'data fetched successfully',
        offer: offer,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      ResponseBody: {
        message: 'Unauthorized',
      },
    });
  }
};

const offerController = {
    getCurrentOfferData
};
export default offerController;