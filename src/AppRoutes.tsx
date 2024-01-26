import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stores from './pages/Stores';
import StoreView from './pages/StoreView';
import ProductView from './pages/ProductView';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import Deals from './pages/Deals';
import PurchasesPage from './pages/PurchasesPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/stores/:id/view' element={<StoreView />} />
        <Route path='/products/:id/see-details' element={<ProductView />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/receipt/view' element={<Receipt orderNumber='KWi972Ji90' productName='Soul Soothing massage' amountPaid={1600} />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/bought' element={<PurchasesPage />} />
    </Routes>
  );
};

export default AppRoutes;
