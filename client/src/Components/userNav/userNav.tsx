import { BiSolidUserCircle } from 'react-icons/bi';
import css from './userNav.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/user/userOperations';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { clearCoursesData } from '../../redux/courses/coursesSlice';
import { selectAuthUserEmail } from '../../redux/user/userSelectors';
import { selectUserCoursesProgress } from '../../redux/user/userSelectors';

export const UserNav = ({ setUserModalOpen, userModalOpen }: any) => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const userEmail = useSelector(selectAuthUserEmail);

  const handleOnClickLogOut = async () => {
    await dispatch(logOut());
    dispatch(clearCoursesData());
  };

  return (
    <div
      className={`${css.userNav} ${userModalOpen && css.activeModal}`}
      onClick={() => setUserModalOpen((prevVal: any) => !prevVal)}
    >
      <BiSolidUserCircle size={42} />

      {userModalOpen && (
        <div className={css.userModal}>
          <p>{userEmail}</p>
          <ul className={css.list}>
            <li key={nanoid()}>
              <button
                className={css.btn}
                onClick={() => navigate('/my-courses')}
              >
                {language === 'PL' ? 'Kursy' : 'Courses'}
              </button>
            </li>
            <li key={nanoid()}>
              <button className={css.btn} onClick={() => navigate('/courses')}>
                {language === 'PL' ? 'Oferta' : 'Offer'}
              </button>
            </li>
            <li key={nanoid()}>
              <button className={css.btn} onClick={() => handleOnClickLogOut()}>
                {language === 'PL' ? 'Wyloguj' : 'LogOut'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
