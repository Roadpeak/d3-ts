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
import UserProfileCard from './pages/Profile';
import About from './index/About';

const AppRoutes: React.FC = () => {
  const fakeUserData = {
  id: 903481,
  firstName: 'John',
  lastName: 'Doe',
  username: 'john_doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
  bio: 'Passionate about technology and programming. Coffee lover ☕.',
};

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
        <Route path='/profile' element={<UserProfileCard {...fakeUserData} />} /> 

        <Route path='/about' element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
