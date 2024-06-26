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
import NotFoundPage from './components/NotFoundPage';
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
import OwnerHome from './components/Owner/OwnerHome';
import OwnerDiscounts from './components/Owner/OwnerDiscounts';
import OwnerBookings from './components/Owner/OwnerBookings';
import BookingPage from './pages/BookingPage';
import Bookings from './pages/Bookings';
import OwnerUnverified from './components/Owner/OwnerUnverified';
import CrmLogin from './pages/auth/CrmLogin';
import UnverifiedDiscounts from './components/admin/UnverifiedDiscounts';
import ManagePayments from './components/admin/Payments';
import Appointments from './components/admin/Appointments';
import MyTickets from './pages/MyTickets';
import OwnerReviews from './components/Owner/OwnerReviews';
import ChatPage from './components/chat/ChatPage';

const AppRoutes: React.FC = () => {

  return (
    // <ChatProvider>
      <Routes>
      <Route path='/' element={<ChatPage />} />
      <Route path='/stores' element={<Stores />} />
      <Route path='/stores/:id/view' element={<StoreView />} />
      <Route path='/discount/:id/see-details' element={<ProductView />} />
      <Route path='/:id/checkout' element={<Checkout />} />
      <Route path='/receipt/view' element={<Receipt orderNumber='KWi972Ji90' productName='Soul Soothing massage' amountPaid={1600} />} />
      <Route path='/deals' element={<Deals />} />
      <Route path='/discounts/bought' element={<PurchasesPage />} />
      <Route path='/accounts/profile' element={<UserProfileCard />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path='/my-tickets' element={<MyTickets />} />
      {/* <Route path="/chat" element={<Chat />} /> */}

      <Route path='/about' element={<About />} />
      <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />} />
      <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
      <Route path='/contact' element={<ContactUsPage />} />

      <Route path='/accounts/sign-up' element={<SignUpPage />} />
      <Route path='/accounts/sign-in' element={<LoginPage />} />
      <Route path='/accounts/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/accounts/reset-password' element={<ResetPasswordPage />} />

      <Route path='/accounts/seller/sign-up' element={<SellerSignUp />} />
      <Route path='/accounts/seller/sign-in' element={<SellerSignIn />} />

      <Route path='/my-bookings' element={<Bookings />} />
      <Route path='/discount/:id/booking' element={<BookingPage />} />

      <Route path='/store/:id/home' element={<OwnerHome />} />
      <Route path='/store/:id/discounts' element={<OwnerDiscounts />} />
      <Route path='/store/:id/bookings' element={<OwnerBookings />} />
      <Route path='/store/:id/reviews' element={<OwnerReviews />} />
      <Route path='/store/:id/unverified-discounts' element={<OwnerUnverified />} />

      <Route path='/crm/login' element={<CrmLogin />} />
      <Route path='/manage' element={<AdminDash />} />
      <Route path='/manage/stores' element={<ManageStores />} />
      <Route path='/manage/discounts' element={<ManageDiscounts />} />
      <Route path='/manage/unverified' element={<UnverifiedDiscounts />} /> 
      <Route path='/manage/appointments' element={<Appointments /> } />
      <Route path='/manage/vouchers' element={<Vouchers />} />
      <Route path='/manage/payments' element={<ManagePayments />} />
      <Route path='/manage/users' element={<Users />} />
      <Route path='/manage/tickets' element={<Tickets />} />

      <Route path='/company/careers' element={<CareersPage />} />
      <Route path='/company/vision' element={<Vision />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
    // </ChatProvider>
  );
};

export default AppRoutes;
