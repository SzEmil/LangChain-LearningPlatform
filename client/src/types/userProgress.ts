interface ProgressSection {
  videoWatched: boolean;
  quizCompleted: boolean;
  quizResult: number;
}
interface About {
  courseId: string;
  title: string;
  description: string;
  language: string;
}
interface ProgressCourse {
  about: About[];
  lastOpen: string;
  progressData: {
    sections: ProgressSection[];
    sectionsCompleted: number;
    quizesCompleted: number;
  };
  started: string;
  _id: string;
}

export interface ProgressData {
  owner: string;
  courses: ProgressCourse[];
}
