import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';


export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
