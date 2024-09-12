import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import AdsPage from './pages/AdsPage';
import SingleAdPage from './pages/SingleAdPage';
import OrdersPage from './pages/OrdersPage';
import FavoritesPage from './pages/FavoritesPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdsPage />} />
      <Route path="/ads/:id" element={<SingleAdPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
