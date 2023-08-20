import Course from './schemas/course.js';
import mongoose from 'mongoose';

const getCourseById = async courseId => {
  return Course.findOne({ _id: courseId });
};

const getUserCourseById = async (courseId, courseTab) => {
  const courseObjId = new mongoose.Types.ObjectId(courseId);
  return Course.findOne({
    $and: [{ _id: courseObjId }, { _id: { $in: courseTab } }],
  });
};

const getUserCourses = coursesTab => {
  return Course.find({ _id: { $in: coursesTab } });
};

const courseService = {
  getCourseById,
  getUserCourses,
  getUserCourseById,
};
export default courseService;
