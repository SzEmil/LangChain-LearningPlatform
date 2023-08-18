import mongoose from 'mongoose';
const { Schema } = mongoose;

export const progressSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    courses: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        started: {
          type: Date,
          default: Date.now,
        },
        lastOpen: {
          type: String,
          default: '',
        },
        progressData: {
          sections: [
            {
              videoWatched: {
                type: Boolean,
                default: false,
              },
              quizCompleted: {
                type: Boolean,
                default: false,
              },
              quizResult: {
                type: Number,
                default: 0,
              },
            },
          ],
          sectionsCompleted: {
            type: Number,
            default: 0,
          },
          quizesCompleted: {
            type: Number,
            default: 0,
          },
        },
      },
    ],
  },
  {
    courses: [],
  },
  { versionKey: false, timestamps: true }
);

const Progress = mongoose.model('Progress', progressSchema, 'progress');
export default Progress;
