import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stores from './pages/Stores';
import StoreView from './pages/StoreView';
import ProductView from './pages/ProductView';
import Checkout from './pages/Checkout';
import Deals from './pages/Deals';
import PurchasesPage from './pages/PurchasesPage';
import UserProfileCard from './pages/auth/Profile';
import About from './index/About';
import TermsAndConditionsPage from './index/TermsCondtions';
import PrivacyPolicyPage from './index/Privacypolicy';
import ContactUsPage from './index/Contact';
import SignUpPage from './pages/auth/SignUp';
import LoginPage from './pages/auth/Login';
import NotFoundPage from './components/NotFoundPage';
import SearchResults from './pages/SearchResults';
import CareersPage from './pages/company/Careers';
import Vision from './pages/company/Vision';
import SellerSignUp from './pages/auth/SellerSignUp';
import SellerSignIn from './pages/SellerSignIn';
import AdminDash from './components/admin/AdminDash';
import ManageStores from './components/admin/Stores';
import ManageDiscounts from './components/admin/ManageDiscounts';
import Users from './components/admin/Users';
import Tickets from './components/admin/Tickets';
import BookingPage from './pages/BookingPage';
import Bookings from './pages/Bookings';
import CrmLogin from './pages/auth/CrmLogin';
import UnverifiedDiscounts from './components/admin/UnverifiedDiscounts';
import ManagePayments from './components/admin/Payments';
import Appointments from './components/admin/Appointments';
import MyTickets from './pages/MyTickets';
import ChatPage from './components/chat/ChatPage';
import ResetPassword from './pages/auth/ResetPassword';
import RequestPasswordReset from './pages/auth/RequestPasswordReset';
import CategoryList from './components/admin/CategoryList';
import VerifyOtp from './pages/auth/VerifyOtp';
import Vouchers from './pages/Vouchers';
import EventForm from './components/EventForm';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import Services from './components/admin/Services';
import ServicesPage from './pages/ServicesPage';
import PressPage from './pages/company/PressPage';
import BrandGuidelinesPage from './pages/company/BrandGuidelinesPage';
import FundPage from './pages/company/FundPage';
import GoogleCallback from './pages/auth/GoogleCallback';
import JobCreateForm from './components/admin/JobCreateForm';
import Jobs from './pages/company/Jobs';
import RoleList from './pages/company/RoleList';
import RoleDetails from './pages/company/RoleDetails';
import RoleForm from './pages/company/RoleForm';
import ApplicationList from './pages/company/ApplicationList';
import ApplicationForm from './pages/company/ApplicationForm';
import ApplicationDetails from './pages/company/ApplicationDetails';
import EditApplication from './pages/company/EditApplication';

const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/merchants' element={<Stores />} />
      <Route path='/stores/:id/view' element={<StoreView />} />
      <Route path='/discount/:slug/:id/see-details' element={<ProductView />} />
      <Route path='/services/:slug/:id/see-details' element={<ServiceDetailsPage />} />
      <Route path='/:slug/:id/checkout' element={<Checkout />} />
      <Route path='/deals' element={<Deals />} />
      <Route path='/discounts/bought' element={<PurchasesPage />} />
      <Route path='/accounts/profile' element={<UserProfileCard />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path='/my-tickets' element={<MyTickets />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path='/services' element={<ServicesPage />} />

      <Route path='/about' element={<About />} />
      <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />} />
      <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
      <Route path='/contact' element={<ContactUsPage />} />

      <Route path='/accounts/sign-up' element={<SignUpPage />} />
      <Route path='/accounts/sign-in' element={<LoginPage />} />
      <Route path='/accounts/verify-otp' element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/request-password-reset" element={<RequestPasswordReset />} />

      <Route path='/accounts/seller/sign-up' element={<SellerSignUp />} />
      <Route path='/accounts/seller/sign-in' element={<SellerSignIn />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      <Route path='/my-vouchers' element={<Vouchers />} />
      <Route path='/my-bookings' element={<Bookings />} />
      <Route path='/discount/:id/booking' element={<BookingPage />} />

      <Route path='/crm/login' element={<CrmLogin />} />
      <Route path='/manage' element={<AdminDash />} />
      <Route path='/manage/stores' element={<ManageStores />} />
      <Route path='/manage/discounts' element={<ManageDiscounts />} />
      <Route path='/manage/unverified' element={<UnverifiedDiscounts />} />
      <Route path='/manage/appointments' element={<Appointments />} />
      <Route path='/manage/vouchers' element={<Vouchers />} />
      <Route path='/manage/payments' element={<ManagePayments />} />
      <Route path='/manage/users' element={<Users />} />
      <Route path='/manage/tickets' element={<Tickets />} />
      <Route path='/manage/categories' element={<CategoryList />} />
      <Route path='/manage/:id/create-event' element={<EventForm />} />
      <Route path='/manage/services' element={<Services />} />
      <Route path='/manage/jobs' element={<JobCreateForm />} />

      <Route path='/company/careers' element={<CareersPage />} />
      <Route path='/company/careers/opportunities' element={<Jobs />} />
      <Route path='/company/vision' element={<Vision />} />
      <Route path='/company/press' element={<PressPage />} />
      <Route path='/company/brand-guidelines' element={<BrandGuidelinesPage />} />
      <Route path='/company/fund' element={<FundPage />} />


      <Route path="/roles" element={<RoleList />} />
      <Route path="/roles/:id" element={<RoleDetails />} />
      <Route path="/manage/roles" element={<RoleForm />} />

      <Route path="/roles/applications" element={<ApplicationList />} />
      <Route path="/roles/:roleId/applications/create" element={<ApplicationForm />} />
      <Route path="/applications/:id" element={<ApplicationDetails />} />
      <Route path="/applications/:id/edit" element={<EditApplication />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
