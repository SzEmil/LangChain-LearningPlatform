import Progress from './schemas/progress.js';

const createProgress = async ownerId => {
  return Progress.create({
    owner: ownerId,
  });
};

const getUserProgress = async userId => {
  return Progress.findOne({ owner: userId });
};

const getUserProgressById = (ownerId, courseId) => {
  return Progress.findOne({
    $and: [{ owner: ownerId }, { courses: { $in: courseId } }],
  });
};

const progressService = {
  getUserProgressById,
  createProgress,
  getUserProgress,
};
export default progressService;
