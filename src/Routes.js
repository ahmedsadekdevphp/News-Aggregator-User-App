import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';

import Login from './Pages/Login';
import Register from './Pages/Register';
import NewsFeed from './Pages/NewsFeed';
import ArticleSearch from './Pages/ArticleSearch';
import UserPreferencesPage from './Pages/UserPreferencesPage';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      <Header />
      <div className="main-wrapper">
        <div className="content">
          <div className="container mt-4">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={isLoggedIn ? <NewsFeed /> : <Navigate to="/login" />}
              />
              {/* Protected Routes */}
              <Route
                path="/news-feed"
                element={isLoggedIn ? <NewsFeed /> : <Navigate to="/login" />}
              />

              <Route
                path="/search"
                element={isLoggedIn ? <ArticleSearch /> : <Navigate to="/login" />}
              />

              <Route
                path="/preferences"
                element={isLoggedIn ? <UserPreferencesPage /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};


export default AppRoutes;
