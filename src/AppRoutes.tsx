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
import UserProfileCard from './pages/auth/Profile';
import About from './index/About';
import TermsAndConditionsPage from './index/TermsCondtions';
import PrivacyPolicyPage from './index/Privacypolicy';
import ContactUsPage from './index/Contact';
import SignUpPage from './pages/auth/SignUp';
import LoginPage from './pages/auth/Login';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';
import Dashboard from './components/seller/Dashboard';
import NotFoundPage from './components/NotFoundPage';
import SellerStores from './components/seller/SellerStores';
import Appointments from './components/seller/Appointments';
import SellerSingleStore from './components/seller/SellerSingleStore';
import DiscountDetails from './components/seller/DiscountDetails';
import SearchResults from './pages/SearchResults';
import CareersPage from './pages/company/Careers';
import Vision from './pages/company/Vision';
import SellerSignUp from './pages/auth/SellerSignUp';
import SellerSignIn from './pages/SellerSignIn';
import AdminDash from './components/admin/AdminDash';
import ManageStores from './components/admin/Stores';
import ManageDiscounts from './components/admin/ManageDiscounts';
import Vouchers from './components/admin/Vouchers';
import Users from './components/admin/Users';
import Tickets from './components/admin/Tickets';
import Sidenav from './elements/Sidenav';
import SellerLayout from './elements/SellerLayout';

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
      <Route path='/' element={<SellerLayout />} />
      <Route path='/stores' element={<Stores />} />
      <Route path='/stores/:id/view' element={<StoreView />} />
      <Route path='/discount/:id/see-details' element={<ProductView />} />
      <Route path='/:id/checkout' element={<Checkout />} />
      <Route path='/receipt/view' element={<Receipt orderNumber='KWi972Ji90' productName='Soul Soothing massage' amountPaid={1600} />} />
      <Route path='/deals' element={<Deals />} />
      <Route path='/discounts/bought' element={<PurchasesPage />} />
      <Route path='/accounts/profile' element={<UserProfileCard {...fakeUserData} />} />
      <Route path="/search" element={<SearchResults />} />

      <Route path='/about' element={<About />} />
      <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />} />
      <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
      <Route path='/contact' element={<ContactUsPage />} />

      <Route path='/accounts/sign-up' element={<SignUpPage />} />
      <Route path='/accounts/sign-in' element={<LoginPage />} />
      <Route path='/accounts/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/accounts/reset=password' element={<ResetPasswordPage />} />

      <Route path='/accounts/seller/sign-up' element={<SellerSignUp />} />
      <Route path='/accounts/seller/sign-in' element={<SellerSignIn />} />

      <Route path='/seller/home' element={<Dashboard />} />
      <Route path='/seller/stores' element={<SellerStores />} />
      <Route path='/seller/stores/:id/appointments' element={<Appointments />} />
      <Route path='/seller/stores/:id' element={<SellerSingleStore />} />
      <Route path='/seller/products/:id/see-details' element={<DiscountDetails />} />

      <Route path='/manage' element={<AdminDash />} />
      <Route path='/manage/stores' element={<ManageStores />} />
      <Route path='/manage/discounts' element={<ManageDiscounts />} />
      <Route path='/manage/vouchers' element={<Vouchers />} />
      <Route path='/manage/users' element={<Users />} />
      <Route path='/manage/tickets' element={<Tickets />} />

      <Route path='/company/careers' element={<CareersPage />} />
      <Route path='/company/vision' element={<Vision />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
