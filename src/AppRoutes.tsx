import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stores from './pages/Stores';
import StoreView from './pages/StoreView';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/stores/:id/view' element={<StoreView />} />
    </Routes>
  );
};

export default AppRoutes;
