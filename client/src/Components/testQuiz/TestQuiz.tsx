import { useState, useEffect } from 'react';
import { quizType } from './TestQuizData';
import { questionsType } from './TestQuizData';
import css from './TestQuiz.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { GrFormNextLink } from 'react-icons/gr';

export const TestQuiz = ({ setQuizOpen, quizStart }: any) => {
  const [quiz, setQuiz] = useState<quizType>(quizStart);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState<questionsType>();
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuizQuestion(quiz?.questions[questionNumber]);
  }, [questionNumber]);

  const handleOnClickPickAnswer = (answer: string) => {
    setCurrentAnswer(answer);
  };
  const handleOnClickNextQuestion = () => {
    if (currentAnswer === quizQuestion?.correctAnswer) {
      setScore(prevVal => (prevVal += 1));
    }

    setQuestionNumber(prevVal => (prevVal += 1));
    setCurrentAnswer('');
  };
  console.log(quiz);
  const exitQuiz = () => {
    setQuizOpen(false);
    setQuiz(quizStart);
    setQuestionNumber(0);
  };
  return (
    <div className={css.modal}>
      <div className={css.modalWrapper}>
        <button className={css.closeBtn} onClick={() => exitQuiz()}>
          X
        </button>
        <h2 className={css.quizTitle}>{quiz?.title}</h2>
        {questionNumber + 1 <= quiz.questions.length ? (
          <p className={css.questionCounter}>
            {questionNumber + 1}/{quiz.questions.length}
          </p>
        ) : (
          <p></p>
        )}
        <p className={css.quizDescription}>{quiz?.description}</p>
        <div className={css.quizContent}>
          <h3 className={css.question}>{quizQuestion?.question}</h3>

          {questionNumber + 1 <= quiz.questions.length ? (
            <ul className={css.answerList}>
              {quizQuestion?.answers.map(answer => (
                <li
                  key={nanoid()}
                  className={`${css.answer} ${
                    currentAnswer === answer.name && css.pickedAnswer
                  }`}
                  onClick={() => handleOnClickPickAnswer(answer.name)}
                >
                  <p className={css.answerText}>
                    {answer.name}: {answer.value}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.congrats}>Congrats your score: {score}</p>
          )}
          <div className={css.btnsWrapper}>
            {questionNumber + 1 <= quiz.questions.length && (
              <button
                className={`${css.nextBtn} ${
                  currentAnswer === '' && css.disabledBtn
                }`}
                onClick={() => handleOnClickNextQuestion()}
              >
                <GrFormNextLink size={36} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
