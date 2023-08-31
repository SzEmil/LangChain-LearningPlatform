import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { AuthUser } from './pages/AuthUser/AuthUser';
import { Courses } from './pages/Courses/Courses';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store';
import { useEffect } from 'react';
import { refreshUser } from './redux/user/userOperations';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { RestrictedRoute } from './Components/RestrictedRoute';
import { BuyCourse } from './pages/BuyCourse/BuyCourse';
import { RedirectPayment } from './pages/RedirectPayment/RedirectPayment';
import { PaymentStatus } from './pages/PaymentStatus/PaymentStatus';
import { MyCourses } from './pages/MyCourses/MyCourses';
import { CoursePage } from './pages/CoursePage/CoursePage';
import { VerificationEmail } from './pages/VerificationEmail/VerificationEmail';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { selectAppServerConnection } from './redux/globals/globalsSelectors';
import { setServerConnection } from './redux/globals/globalsSlice';
import { apiLink } from './redux/globals/globalsOperations';
import { ServerLoading } from './pages/ServerLoading/ServerLoading';

export const App = () => {
  const isServerConnected = useSelector(selectAppServerConnection);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!isServerConnected) {
      const eventSource = new EventSource(`${apiLink}/stream`);
      eventSource.onopen = () => {
        dispatch(setServerConnection(true));
        eventSource.close();
      };

      eventSource.onerror = () => {
        dispatch(setServerConnection(false));
        console.error('SSE connection error');
      };

      return () => {
        eventSource.close();
      };
    }
  }, []);

  useEffect(() => {
    const refreshUserData = async () => {
      await dispatch(refreshUser());
    };

    refreshUserData();
  }, []);

  return (
    <>
      {!isServerConnected ? (
        <ServerLoading />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/payment"
              element={
                <ProtectedRoute component={BuyCourse} redirectTo="/auth" />
              }
            />
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute component={MyCourses} redirectTo="/auth" />
              }
            ></Route>
            <Route
              path="/my-courses/:courseId"
              element={
                <ProtectedRoute component={CoursePage} redirectTo="/auth" />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute component={UserProfile} redirectTo="/auth" />
              }
            />
            <Route
              path="/verify/:token"
              element={
                <ProtectedRoute
                  component={VerificationEmail}
                  redirectTo="/auth"
                />
              }
            />
          </Route>
          <Route
            path="/auth"
            element={<RestrictedRoute component={AuthUser} redirectTo="/" />}
          />
          {/* <Route
          path="/secure"
          element={
            <ProtectedRoute component={RedirectPayment} redirectTo="/" />
          }
        /> */}
          <Route path="/secure" element={<RedirectPayment />} />
          <Route path="/payment/:paymentId" element={<PaymentStatus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
