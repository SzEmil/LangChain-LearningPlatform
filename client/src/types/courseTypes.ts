interface Question {
  name: string;
  answers: string[];
  correctAnswer: string;
}

interface Quiz {
  title: string;
  description: string;
  questions: Question[];
  completed: boolean;
}

interface Section {
  name: string;
  description: string;
  photo: string;
  video_link: string;
  quiz: Quiz;
}

export interface CourseType {
  _id: string;
  title: string;
  description: string;
  sections: Section[];
  language: string;
}
