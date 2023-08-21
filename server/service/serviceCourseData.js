import CourseData from './schemas/courseData.js';
import mongoose from 'mongoose';

const getCourseById = async courseId => {
  return CourseData.findOne({ _id: courseId });
};

const getUserCourseById = async (courseId, courseTab) => {
  const courseObjId = new mongoose.Types.ObjectId(courseId);
  return CourseData.findOne({
    $and: [{ _id: courseObjId }, { _id: { $in: courseTab } }],
  });
};

const getUserCoursesDataByCourseId = async (courseId, courseDataIdTab) => {
  const courseObjId = new mongoose.Types.ObjectId(courseId);
  return CourseData.findOne({
    $and: [{ 'data.data': courseObjId }, { _id: { $in: courseDataIdTab } }],
  });
};

const getUserCourses = coursesTab => {
  return CourseData.find({ _id: { $in: coursesTab } });
};



const courseDataService = {
  getCourseById,
  getUserCourseById,
  getUserCourses,
  getUserCoursesDataByCourseId,
};
export default courseDataService;
