import userService from '../service/serviceUsers.js';
import progressService from '../service/serviceProgress.js';

const getUserProgress = async (req, res, next) => {
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

    const progressData = await progressService.getUserProgress(user._id);

    if (!progressData) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: 'No progress data was found',
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'courses fetched successfully',
        progress: progressData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editProgressDate = async (req, res, next) => {
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
    const progressData = await progressService.getUserProgress(user._id);
    if (!progressData) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: 'No progress data was found',
        },
      });
    }

    const courseProgress = progressData.courses.find(
      course => course._id.toString() === courseId
    );

    courseProgress.lastOpen = new Date().toLocaleString('sv-SE', { timeZone: 'UTC' });
    await progressData.save();

    return res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'courses fetched successfully',
        progress: courseProgress.lastOpen,
      },
    });
  } catch (error) {
    next(error);
  }
};

const progressController = {
  getUserProgress,
  editProgressDate,
};
export default progressController;
