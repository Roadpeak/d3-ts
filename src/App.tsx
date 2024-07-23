import AppRoutes from './AppRoutes';
import { AuthProvider, useAuth } from './utils/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import VerificationModal from './pages/auth/VerificationModal';
import { useNavigate } from 'react-router-dom';
import BrevoConversations from './BrevoConversations';

function App() {
  return (
    <AuthProvider>
      <MainApp />
      <ToastContainer />
    </AuthProvider>
  );
}

const MainApp = () => {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (user && user.active_status === 0) {
        setPhone(user.phone || '');
        setModalOpen(true);
      }
    }, 120000); 

    return () => clearInterval(interval);
  }, [user]);

  const handleVerify = (phone: string) => {
    navigate('/accounts/verify-otp', { state: { phone: phone } });
  };

  return (
    <div className="font-montserrat bg-gray-50">
      {isModalOpen && (
        <VerificationModal
          onClose={() => setModalOpen(false)}
          onVerify={handleVerify}
          phone={phone}
        />
      )}
      <BrevoConversations />
      <AppRoutes />
    </div>
  );
};

export default App;
