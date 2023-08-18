import Course from './schemas/course.js';

const getCourseById = async courseId => {
  return Course.findOne({ _id: courseId });
};

const getUserCourses = coursesTab => {
  return Course.find({ _id: { $in: coursesTab } });
};

const courseService = {
  getCourseById,
  getUserCourses,
};
export default courseService;
