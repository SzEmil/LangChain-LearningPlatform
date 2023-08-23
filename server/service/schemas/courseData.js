import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    data: [
      {
        data: { type: Schema.Types.ObjectId },
        language: {
          type: String,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const CourseData = mongoose.model(
  'CourseData',
  courseDataSchema,
  'coursesData'
);
export default CourseData;
