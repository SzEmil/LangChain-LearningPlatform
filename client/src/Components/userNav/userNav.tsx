import { BiSolidUserCircle } from 'react-icons/bi';
import css from './userNav.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/user/userOperations';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export const UserNav = () => {
  const language = useSelector(selectPageLanguage);
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const [userModalOpen, setUserModalOpen] = useState(false);


  const handleOnClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div
      className={`${css.userNav} ${userModalOpen && css.activeModal}`}
      onClick={() => setUserModalOpen(prevVal => !prevVal)}
    >
      <BiSolidUserCircle size={42} />

      {userModalOpen && (
        <div className={css.userModal}>
          <ul className={css.list}>
            <li key={nanoid()}>
              <button className={css.btn} onClick={() => handleOnClickLogOut()}>
                {language === 'PL' ? 'Wyloguj' : 'LogOut'}
              </button>
            </li>

       
              <li key={nanoid()}>
                <button className={css.btn} onClick={() => navigate("/my-courses")}>
                  {language === 'PL' ? 'Moje Kursy' : 'My Courses'}
                </button>
              </li>
          
          </ul>
        </div>
      )}
    </div>
  );
};
