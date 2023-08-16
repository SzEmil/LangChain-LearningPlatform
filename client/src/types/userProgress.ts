interface ProgressSection {
  videoWatched: boolean;
  quizCompleted: boolean;
  quizResult: number;
}

interface ProgressCourse {
  courseId: string;
  title: string;
  description: string;
  started: string;
  lastOpen: string;
  progressData: {
    sections: ProgressSection[];
    sectionsCompleted: number;
    quizesCompleted: number;
  };
}

export interface ProgressData {
  owner: string;
  courses: ProgressCourse[];
}
