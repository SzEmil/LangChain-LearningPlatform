import paymentService from '../service/servicePayment.js';
import userService from '../service/serviceUsers.js';
import courseService from '../service/serviceCourses.js';
import progressService from '../service/serviceProgress.js';
import courseDataService from '../service/serviceCourseData.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const oAuthClientId = process.env.OAUTH_CLIENT_ID;
const oAuthClientSecret = process.env.OAUTH_CLIENT_SECRET;
const merchantPosIdData = process.env.MERCHANT_POS_ID;

// const continueServerUrl = `https://feb5-37-128-155-23.ngrok-free.app`;
// const notifyServerUrl = `https://547d-37-128-155-23.ngrok-free.app`;

const oAuthTokenLink = `https://secure.snd.payu.com/pl/standard/user/oauth/authorize`;
// const oAuthTokenLink = `https://secure.payu.com/pl/standard/user/oauth/authorize`

const newPaymentLink = `https://secure.snd.payu.com/api/v2_1/orders`;
// const newPaymentLink = `https://secure.payu.com/api/v2_1/orders`

const continueServerUrl = `https://szemil.github.io/`;
const notifyServerUrl = `https://langchain-platform.onrender.com`;

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
    const course = await courseDataService.getCourseById(courseId);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found course with id ${courseId}`,
        },
      });
    }

    const isPaymentExist = await paymentService.getPaymentByOwner(
      user._id,
      courseId
    );

    if (isPaymentExist && isPaymentExist.status === 'COMPLETED') {
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
      payInfo: 'Payment not started',
      owner: user._id,
      refererToItem: course.title,
      regulationsAccepted: regulationsAccepted,
      buyer: buyer,
    };

    const newPaymentDB = await paymentService.createNewPayment(newPaymentData);

    const oAuthData = `grant_type=trusted_merchant&client_id=${oAuthClientId}&client_secret=${oAuthClientSecret}&email=${user.email}&ext_customer_id=${user._id}`;

    const oAuthToken = await axios.post(`${oAuthTokenLink}`, oAuthData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const payuToken = oAuthToken.data.access_token;

    const continueUrlLink = `${continueServerUrl}/LangChain-LearningPlatform/payment/${newPaymentDB._id}`;
    const addressData = `${buyer.address.street} ${buyer.address.flatNumber}`;
    const buyerData = {
      email: buyer.email,
      phone: buyer.phone,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      address: addressData,
      city: buyer.address.place,
      postalCode: buyer.address.zipCode,
    };
    const testData = {
      notifyUrl: `${notifyServerUrl}/api/notify/${newPaymentDB._id}`,
      customerIp: customerIpData,
      continueUrl: continueUrlLink,
      merchantPosId: merchantPosIdData,
      description: description,
      extOrderId: newPaymentDB._id,
      buyer: buyerData,
      currencyCode: currencyCode,
      totalAmount: totalAmount * 100,
      products: products,
    };

    const response = await axios.post(`${newPaymentLink}`, testData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payuToken}`,
      },
      maxRedirects: 0,
    });

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

const getNotificationFromPayment = async (req, res, next) => {
  try {
    const paymentId = req.params.paymentId;
    const notification = req.body;

    const paymentDB = await paymentService.getPaymentById(paymentId);
    if (!paymentDB) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found payment with id ${paymentId}`,
        },
      });
    }
    paymentDB.payInfo = 'Payment started';
    const userId = paymentDB.owner;
    if (notification.order.status === 'CANCELED') {
      paymentDB.payInfo = 'Payment canceled';
    }
    if (notification.order.status === 'COMPLETED') {
      const user = await userService.getUserById(userId);
      paymentDB.payMethod = notification.order.payMethod.type;
      paymentDB.payInfo = 'Payment Completed';
      user.courses.push(paymentDB.itemId);

      const foundCourseData = await courseDataService.getCourseById(
        paymentDB.itemId
      );

      const foundUserProgress = await progressService.getUserProgress(user._id);
      if (!foundUserProgress) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found progress for user ${user._id}`,
          },
        });
      }

      const courseObjAboutENG = await courseService.getCourseById(
        foundCourseData.data[0].data
      );

      const courseProgressObj = {
        about: [],
        progressData: {
          sections: [],
        },
      };
      const newSectionsData = courseObjAboutENG.sections.map(section => ({
        videoWatched: false,
        quizCompleted: false,
        quizResult: 0,
      }));
      courseProgressObj.progressData.sections = newSectionsData;

      const courseDataPromises = foundCourseData.data.map(async courseData => {
        const foundCourseDB = await courseService.getCourseById(
          courseData.data
        );
        const newCourseData = {
          courseId: foundCourseDB._id,
          title: foundCourseDB.title,
          description: foundCourseDB.description,
          language: foundCourseDB.language,
        };
        return newCourseData;
      });
      
      const courseDataArray = await Promise.all(courseDataPromises);
      
      courseProgressObj.about = courseDataArray;

      foundUserProgress.courses.push(courseProgressObj);

      await foundUserProgress.save();
      await user.save();
    }

    paymentDB.paymentStatus = notification.order.status;
    await paymentDB.save();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const getPaymentById = async (req, res, next) => {
  const { _id } = req.user;
  const user = await userService.getUserById(_id);
  try {
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    const { paymentId } = req.params;
    const paymentById = await paymentService.getPaymentById(paymentId);
    if (!paymentById) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found payment with id ${paymentId}`,
        },
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'Payment successfully fetched',
        payment: paymentById,
      },
    });
  } catch (error) {
    next(error);
  }
};
const paymentController = {
  createNewPayment,
  getNotificationFromPayment,
  getPaymentById,
};

export default paymentController;
