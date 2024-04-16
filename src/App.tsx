import AppRoutes from './AppRoutes';
import { AuthProvider } from './utils/context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
   <AuthProvider>
      <div className="font-montserrat bg-gray-50">
        <AppRoutes />
      </div>
      <ToastContainer />
   </AuthProvider>
  );
}

export default App;
