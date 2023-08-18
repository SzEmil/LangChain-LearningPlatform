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
      return res.status(200).json({
        status: 'success',
        code: 200,
        ResponseBody: {
          message: 'courses fetched successfully',
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

const coursesController = {
  getUserCoursesData,
};
export default coursesController;
