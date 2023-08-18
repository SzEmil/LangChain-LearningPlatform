import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  language: String,
  photo: String,
  video_link: String,
  quiz: {
    title: String,
    description: String,
    questions: [
      {
        name: String,
        answers: [String],
        correctAnswer: String,
      },
    ],
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    sections: [sectionSchema],
  },
  { versionKey: false, timestamps: true }
);

const Course = mongoose.model('Course', courseSchema, 'courses');
export default Course;
