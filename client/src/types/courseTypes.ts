import { Key } from 'react';
import { quizType } from '../Components/testQuiz/TestQuizData';

interface Question {
  name: string;
  answers: string[];
  correctAnswer: string;
}

export interface Section {
  id: Key | null | undefined;
  name: string;
  description: string;
  photo: string;
  video_link: string;
  quiz: quizType;
}

export interface CourseType {
  _id: string;
  title: string;
  description: string;
  sections: Section[];
  language: string;
}
