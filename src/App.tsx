import AppRoutes from './AppRoutes';
import { AuthProvider } from './utils/context/AuthContext';

function App() {
  return (
   <AuthProvider>
      <div className="font-montserrat bg-gray-50">
        <AppRoutes />
      </div>
   </AuthProvider>
  );
}

export default App;
