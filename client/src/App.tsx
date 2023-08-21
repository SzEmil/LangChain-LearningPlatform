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
import { ProtectedRoute } from './Components/ProtectedRoute';
import { RestrictedRoute } from './Components/RestrictedRoute';
import { BuyCourse } from './pages/BuyCourse/BuyCourse';
import { RedirectPayment } from './pages/RedirectPayment/RedirectPayment';
import { PaymentStatus } from './pages/PaymentStatus/PaymentStatus';
import { MyCourses } from './pages/MyCourses/MyCourses';
import { getUserCourses } from './redux/courses/coursesOperations';
import { clearCoursesData } from './redux/courses/coursesSlice';
import { selectAuthUserIsLoggedIn } from './redux/user/userSelectors';
import { useSelector } from 'react-redux';
import { CoursePage } from './pages/CoursePage/CoursePage';
import { VerificationEmail } from './pages/VerificationEmail/VerificationEmail';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const loggedIn = useSelector(selectAuthUserIsLoggedIn);
  useEffect(() => {
    const refreshUserData = async () => {
      await dispatch(refreshUser());
      // if (loggedIn) {
      //   dispatch(getUserCourses());
      // } else {
      //   dispatch(clearCoursesData());
      // }
    };

    refreshUserData();
  }, []);

  return (
    <>
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
          <Route path="/verify/:token"  element={
              <ProtectedRoute component={VerificationEmail} redirectTo="/auth" />
            } />
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
    </>
  );
};
