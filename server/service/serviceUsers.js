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


const getRestaurantColabolators = usersId => {
  return User.find({ _id: { $in: [usersId] } });
};

const userService = {
  getUsers,
  getUserByEmail,
  createUser,
  getUserById,
  getRestaurantColabolators,
};
export default userService;
