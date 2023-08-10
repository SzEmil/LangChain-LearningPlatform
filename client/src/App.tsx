import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { AuthUser } from './pages/AuthUser/AuthUser';
import { Courses } from './pages/Courses/Courses';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { useEffect } from 'react';
import { refreshUser } from './redux/user/userOperations';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
        <Route path="/auth" element={<AuthUser />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
