type answerType = {
  name: string;
  value: string;
};

export type questionsType = {
  question: string;
  answers: answerType[];
  correctAnswer: string;
};

export type quizType = {
  title: string;
  description: string;
  questions: questionsType[];
};

const testENG = {
  title: 'Course Suitability Quiz',
  description:
    'Determine if the course is a good fit for you based on your preferences and learning style.',
  questions: [
    {
      question: 'Which medium do you prefer for learning?',
      answers: [
        { name: 'a', value: 'Online articles' },
        { name: 'b', value: 'Books' },
        { name: 'c', value: 'Video courses' },
      ],
      correctAnswer: 'c',
    },
    {
      question: 'Are you interested in programming?',
      answers: [
        { name: 'a', value: 'Not at all' },
        { name: 'b', value: 'Somewhat' },
        { name: 'c', value: 'Very interested' },
      ],
      correctAnswer: 'c',
    },
    {
      question: 'Do you enjoy hands-on learning?',
      answers: [
        { name: 'a', value: 'Not really' },
        { name: 'b', value: "It's okay" },
        { name: 'c', value: 'Absolutely' },
      ],
      correctAnswer: 'c',
    },
    {
      question: 'Are you comfortable with using graphical interfaces?',
      answers: [
        { name: 'a', value: 'Not really' },
        { name: 'b', value: 'Somewhat' },
        { name: 'c', value: 'Very comfortable' },
      ],
      correctAnswer: 'c',
    },
  ],
};

const testPL = {
  title: 'Quiz Odpowiedniości Kursu',
  description:
    'Sprawdź, czy kurs jest odpowiedni dla Ciebie, uwzględniając Twoje preferencje i styl nauki.',
  questions: [
    {
      question: 'Z jakiego medium najbardziej lubisz się uczyć?',
      answers: [
        { name: 'a', value: 'Artykuły internetowe' },
        { name: 'b', value: 'Książki' },
        { name: 'c', value: 'Kursy wideo' },
      ],
      correctAnswer: 'c',
    },
    {
      question: 'Czy interesujesz się programowaniem?',
      answers: [
        { name: 'a', value: 'Wcale nie' },
        { name: 'b', value: 'Trochę' },
        { name: 'c', value: 'Bardzo' },
      ],
      correctAnswer: 'c',
    },
    {
      question: 'Czy lubisz naukę praktyczną?',
      answers: [
        { name: 'a', value: 'Raczej nie' },
        { name: 'b', value: 'W miarę' },
        { name: 'c', value: 'Absolutnie' },
      ],
      correctAnswer: 'c',
    },
    {
      question:
        'Czy czujesz się swobodnie korzystając z interfejsów graficznych?',
      answers: [
        { name: 'a', value: 'Raczej nie' },
        { name: 'b', value: 'W miarę' },
        { name: 'c', value: 'Bardzo swobodnie' },
      ],
      correctAnswer: 'c',
    },
  ],
};
export const quizData = {
  testPL,
  testENG,
};
