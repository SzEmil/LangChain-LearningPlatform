import express from 'express';
import userController from '../controller/controllerUsers.js';
import { authUser } from '../controller/controllerUsers.js';
import upload from '../middlewares/fileUpload/upload.js';
import offerController from '../controller/controllerOffer.js';
import paymentController from '../controller/controllerPayment.js';
import verifyPaymentSource from '../middlewares/verifyPaymentSource/verifyPaymentSource.js';
import { checkApiKey } from '../middlewares/dekodeAPIKey/dekoderKey.js';

const router = express.Router();

//contacts/?page=1&limit=10&favorite=true

//users api router
router.get('/users', checkApiKey, userController.get);

router.post('/users/signup', checkApiKey, userController.register);

router.post('/users/login', checkApiKey, userController.login);

router.post('/users/logout', checkApiKey, authUser, userController.logout);

router.get('/users/current', checkApiKey, authUser, userController.currentUser);

router.patch(
  '/users/avatars',
  checkApiKey,
  authUser,
  upload.single('avatar'),
  userController.uploadAvatar
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
export default router;
