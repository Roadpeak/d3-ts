import React, { useContext } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfileCard: React.FC = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return <></>;
  }

  const { id, firstName, lastName, email, phone } = user;

  const logoutUser = () => {
    localStorage.removeItem('access_token');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm my-[5%] mx-auto bg-white rounded-md overflow-hidden">
        <div className="relative">
          {/* <img className="w-full h-56 object-cover" src={avatar} alt={`${first_name} ${last_name}`} /> */}
          <div className="absolute bottom-0 left-0 bg-primary text-white py-1 px-2 rounded-tr-md">
            ID: {id}
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mt-2">{`${firstName} ${lastName}`}</h2>
            <p className="text-sm text-gray-600">@{firstName}{lastName}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">{`Email: ${email}`}</p>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-700">Phone: {phone}</p>
          </div>

          <div className="mt-6 flex justify-center">
            <button onClick={logoutUser} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfileCard;
