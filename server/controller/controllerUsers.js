import userService from '../service/serviceUsers.js';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import gravatar from 'gravatar';
import progressService from '../service/serviceProgress.js';
import { sendVerificationEmail } from '../helpers/emailVeryfication.js';
import { generateVerificationToken } from '../helpers/emailVeryfication.js';

dotenv.config();

const secret = process.env.SECRET;

export const userSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]{3,30}$')
    ),
});

export const userSchemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]{3,30}$')
    ),
});

const userSubscriptionSchema = joi.object({
  subscription: ['starter', 'pro', 'business'],
});

export const authUser = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (error, user) => {
    if (!user || error) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }

    const currentTimestamp = Date.now() / 1000;
    if (user.exp < currentTimestamp) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized: Token has expired',
        },
      });
    }

    try {
      const foundUser = await userService.getUserByEmail(user.email);

      if (foundUser.token !== user.token) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          ResponseBody: {
            message: 'Unauthorized: Invalid token',
          },
        });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const get = async (req, res, next) => {
  try {
    const results = await userService.getUsers();

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        users: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  if (!req.body)
    return res.status(400).json({
      status: 'error',
      ResponseBody: {
        message: 'Missing fields',
      },
      code: 400,
    });
  try {
    const value = await userSchema.validateAsync(req.body);
    const { username, email, password } = value;

    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(409).json({
        status: 'Conflict',
        code: 409,
        ResponseBody: {
          message: 'Email in use',
        },
      });
    }
    try {
      const newUser = await userService.createUser(username, email);
      newUser.setPassword(password);
      const avatarURL = gravatar.url(newUser.email, {
        protocol: 'https',
        s: '100',
      });
      newUser.avatarURL = avatarURL;

      const payload = {
        id: newUser._id,
      };

      const newProgress = await progressService.createProgress(newUser._id);
      newUser.progressData = newProgress._id;

      const token = jwt.sign(payload, secret, { expiresIn: '12h' });
      newUser.token = token;

      const verificationToken = generateVerificationToken();
      newUser.emailVerificiationToken = verificationToken;

      try {
        sendVerificationEmail(newUser.email, verificationToken);

        await newUser.save();

        return res.status(201).json({
          status: 'Created',
          code: 201,
          ResponseBody: {
            message: 'User created',
            user: {
              username: newUser.username,
              email: newUser.email,
              token: newUser.token,
              emailVerification: newUser.emailVerification,
              avatarURL,
              _id: newUser._id,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      ResponseBody: {
        message: error.message,
      },
    });
    next(error);
  }
};

const login = async (req, res, next) => {
  if (!req.body)
    return res.status(400).json({
      status: 'error',
      ResponseBody: {
        message: 'Missing fields',
      },
      code: 400,
    });
  try {
    const value = await userSchemaLogin.validateAsync(req.body);
    const { email, password } = value;
    const user = await userService.getUserByEmail(email);

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Invalid login or password',
        },
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '12h' });
    user.token = token;
    await user.save();

    const progressData = await progressService.getUserProgress(user._id);

    if (!progressData) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: 'No progress data was found',
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'User logged in successfully',
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          emailVerification: user.emailVerification,
          avatarURL: user.avatarURL,
          courses: user.courses,
          progress: progressData,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      ResponseBody: {
        message: error.message,
      },
    });
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);

    user.token = null;
    await user.save();
    return res.status(204).json({
      status: 'success',
      code: 204,
      ResponseBody: {
        message: 'Logout successful',
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

const currentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
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
    const progressData = await progressService.getUserProgress(user._id);

    if (!progressData) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: 'No progress data was found',
        },
      });
    }

    return res.status(200).json({
      status: 'OK',
      code: 200,
      ResponseBody: {
        username: user.username,
        email: user.email,
        _id: user._id,
        avatarURL: user.avatarURL,
        emailVerification: user.emailVerification,
        courses: user.courses,
        progress: progressData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserEmail = async (req, res, next) => {
  const { _id } = req.user;
  try {
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
    const { token } = req.params;

    if (!token) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: 'There is no token in request params',
        },
      });
    }

    const userVerification = await userService.getUserByVerificationEmailLink(
      user._id,
      token
    );

    if (user.emailVerification === true) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `User ${user.email} already confirmed`,
        },
      });
    }

    if (!userVerification && user.emailVerification === false) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `User does not have a valid verification token`,
        },
      });
    }

    userVerification.emailVerification = true;
    userVerification.emailVerificiationToken = null;
    await userVerification.save();

    return res.status(200).json({
      status: 'OK',
      code: 200,
      ResponseBody: {
        message: `Email ${user.email} confirmed successfully`,
        verification: userVerification.emailVerification,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userController = {
  get,
  register,
  login,
  logout,
  currentUser,
  verifyUserEmail,
};
export default userController;
