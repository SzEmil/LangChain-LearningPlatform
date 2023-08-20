import User from './schemas/user.js';

const getUsers = async () => {
  return User.find();
};

const getUserByEmail = async email => {
  return User.findOne({ email });
};
const getUserById = async _id => {
  return User.findOne({ _id });
};

const createUser = async (username, email) => {
  return User.create({ username, email });
};

const getUserByVerificationEmailLink = async (userId, verifyToken) => {
  return User.findOne({
    $and: [{ _id: userId }, { emailVerificiationToken: verifyToken }],
  });
};

const userService = {
  getUsers,
  getUserByEmail,
  createUser,
  getUserById,
  getUserByVerificationEmailLink,
};
export default userService;
