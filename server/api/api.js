import express from 'express';
import userController from '../controller/controllerUsers.js';
import { authUser } from '../controller/controllerUsers.js';
import upload from '../middlewares/fileUpload/upload.js';
import offerController from '../controller/controllerOffer.js';
import paymentController from '../controller/controllerPayment.js';
import verifyPaymentSource from '../middlewares/verifyPaymentSource/verifyPaymentSource.js';
import { checkApiKey } from '../middlewares/dekodeAPIKey/dekoderKey.js';
import coursesController from '../controller/controllerCourses.js';
import progressController from '../controller/controllerProgress.js';

const router = express.Router();

//contacts/?page=1&limit=10&favorite=true

//users api router

router.post('/users/signup', checkApiKey, userController.register);

router.post('/users/login', checkApiKey, userController.login);

router.post('/users/logout', checkApiKey, authUser, userController.logout);

router.get('/users/current', checkApiKey, authUser, userController.currentUser);

router.post(
  '/users/verify/:token',
  checkApiKey,
  authUser,
  userController.verifyUserEmail
);

router.post(
  '/users/verify/send',
  checkApiKey,
  authUser,
  userController.resendViryficationEmail
);

router.get(
  '/users/payments',
  checkApiKey,
  authUser,
  paymentController.getUserPayments
);

// offer
router.post('/offer', checkApiKey, offerController.getCurrentOfferData);

//payment
router.get(
  '/payment/:paymentId',
  checkApiKey,
  authUser,
  paymentController.getPaymentById
);

router.post(
  '/payment',
  checkApiKey,
  authUser,
  paymentController.createNewPayment
);

router.post(
  `/notify/:paymentId`,
  verifyPaymentSource,
  paymentController.getNotificationFromPayment
);

//courses

router.get(
  '/courses',
  checkApiKey,
  authUser,
  coursesController.getUserCoursesData
);

router.get(
  '/courses/:courseId',
  checkApiKey,
  authUser,
  coursesController.getUserCourseById
);

//progress
router.get(
  '/courses-progress',
  checkApiKey,
  authUser,
  progressController.getUserProgress
);

router.patch(
  '/courses-progress/:courseId',
  checkApiKey,
  authUser,
  progressController.editProgressDate
);

export default router;
