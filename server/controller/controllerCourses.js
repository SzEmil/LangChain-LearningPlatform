import userService from '../service/serviceUsers.js';
import courseService from '../service/serviceCourses.js';

const getUserCoursesData = async (req, res, next) => {
  try {
    const { _id } = req.user;
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

    const coursesData = await courseService.getUserCourses(user.courses);

    if (!coursesData) {
      return res.status(404).json({
        status: 'success',
        code: 404,
        ResponseBody: {
          message: `Not found courses`,
          courses: [],
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'courses fetched successfully',
        courses: coursesData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserCourseById = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
    const { courseId } = req.params;
    console.log(courseId);
    if (!courseId) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        ResponseBody: {
          message: 'There is no courseId in request params',
        },
      });
    }
    const courseData = await courseService.getUserCourseById(
      courseId,
      user.courses
    );

    if (!courseData) {
      return res.status(404).json({
        status: 'success',
        code: 404,
        ResponseBody: {
          message: `Not found course with id ${courseId} `,
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'courses fetched successfully',
        course: courseData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const coursesController = {
  getUserCoursesData,
  getUserCourseById,
};
export default coursesController;
