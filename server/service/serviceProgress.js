import Progress from './schemas/progress.js';

const createProgress = async ownerId => {
  return Progress.create({
    owner: ownerId,
  });
};

const getUserProgress = async userId => {
  return Progress.findOne({ owner: userId });
};


const progressService = {
  createProgress,
  getUserProgress,
};
export default progressService;
