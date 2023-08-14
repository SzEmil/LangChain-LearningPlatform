import Course from './schemas/course.js';

const getCourseById = async courseId => {
  return Course.findOne({ _id: courseId });
};

const courseService = {
  getCourseById,
};
export default courseService;
