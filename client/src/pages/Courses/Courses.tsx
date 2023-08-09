import css from './Courses.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
export const Courses = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={css.courses}>
      <div className={css.container}>sadasd</div>
    </div>
  );
};
