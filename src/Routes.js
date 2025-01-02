import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

import Login from './Pages/Login';
import Register from './Pages/Register';
const AppRoutes = () => (
  <Router>
  <Header />
  <div className="container mt-4">
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </div>
</Router>
);

export default AppRoutes;
