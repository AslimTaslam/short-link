import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import LinksPage from './pages/LinksPage';
import SettingPage from './pages/SettingPage';
import DetailPage from './pages/DetailPage';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route
          path='links'
          element={<LinksPage />}
        />
        <Route
          path='create'
          element={<CreatePage />}
        />
        <Route
          path='setting'
          element={<SettingPage />}
        />
        <Route
          path='detail/:id'
          element={<DetailPage />}
        />
        <Route
          path='*'
          element={
            <Navigate
              to='/links'
              replace
            />
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path='/'
        element={<AuthPage />}
      />
      <Route
        path='*'
        element={
          <Navigate
            to='/'
            replace
          />
        }
      />
    </Routes>
  );
};

export { useRoutes };
