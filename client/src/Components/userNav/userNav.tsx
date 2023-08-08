import { BiSolidUserCircle } from 'react-icons/bi';
import css from './userNav.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/user/userOperations';

export const UserNav = () => {
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
          <ul>
            <li>
              <button className={css.btn} onClick={() => handleOnClickLogOut()}>
                LogOut
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
