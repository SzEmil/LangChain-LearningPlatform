import paymentService from '../service/servicePayment.js';
import userService from '../service/serviceUsers.js';
import courseService from '../service/serviceCourses.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const oAuthClientId = process.env.OAUTH_CLIENT_ID;
const oAuthClientSecret = process.env.OAUTH_CLIENT_SECRET;
const merchantPosIdData = process.env.MERCHANT_POS_ID;

const createNewPayment = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }

    const {
      merchantPosId,
      notifyUrl,
      continueUrl,
      customerIp,
      courseId,
      currencyCode,
      totalAmount,
      description,
      products,
      regulationsAccepted,
      buyer,
    } = req.body;

    if (!req.body) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        ResponseBody: {
          message: 'No body',
        },
      });
    }
    const course = await courseService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${courseId}`,
        },
      });
    }

    const isPaymentExist = await paymentService.getPaymentByOwner(
      user._id,
      courseId
    );

    if (isPaymentExist) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        ResponseBody: {
          message: `Payment with owner ${user.email} already exists`,
        },
      });
    }

    const customerIpData = req.ip;

    const newPaymentData = {
      itemId: courseId,
      amount: totalAmount,
      owner: user._id,
      refererToItem: course.title,
      regulationsAccepted: regulationsAccepted,
      buyer: buyer,
    };

    const newPaymentDB = await paymentService.createNewPayment(newPaymentData);

    const oAuthData = `grant_type=trusted_merchant&client_id=${oAuthClientId}&client_secret=${oAuthClientSecret}&email=${user.email}&ext_customer_id=${user._id}`;

    const oAuthToken = await axios.post(
      `https://secure.snd.payu.com/pl/standard/user/oauth/authorize`,
      oAuthData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Wysłanie żądania do PayU API po utworzeniu płatności w bazie danych
    const payuApiUrl = 'https://secure.snd.payu.com/api/v2_1/orders';
    const payuToken = oAuthToken.data.access_token;

    const continueURL = `https://lang-chain-academy/notify/${newPaymentDB._id}`;

    const buyerData = {
      email: buyer.email,
      phone: buyer.phone,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
    };
    const testData = {
      notifyUrl: `http://localhost:3001/api/notify/${newPaymentDB._id}`,
      customerIp: customerIpData,
      merchantPosId: merchantPosIdData,
      description: description,
      extOrderId: newPaymentDB._id,
      buyer: buyerData,
      currencyCode: currencyCode,
      totalAmount: totalAmount,
      products: products,
    };

    const response = await axios.post(
      `https://secure.snd.payu.com/api/v2_1/orders`,
      testData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payuToken}`,
        },
        maxRedirects: 0,
      }
    );

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'New payment created',
        payment: newPaymentDB,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 302) {
      const locationHeader = error.response.headers.location;
      return res.status(200).json({
        status: 'success',
        code: 200,
        ResponseBody: {
          message: 'New payment created',
          payURedirect: locationHeader,
        },
      });
    } else {
      next(error);
    }
  }
};
const paymentController = {
  createNewPayment,
};

export default paymentController;
