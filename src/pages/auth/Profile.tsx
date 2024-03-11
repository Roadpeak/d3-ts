import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
}

const UserProfileCard: React.FC<UserProfile> = ({
  id,
  firstName,
  lastName,
  username,
  email,
  avatar,
  bio,
}) => {
  return (
    <>
        <Navbar />
        <div className="max-w-sm my-[5%] mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <div className="relative">
            <img className="w-full h-56 object-cover" src={avatar} alt={`${firstName} ${lastName}`} />
            <div className="absolute bottom-0 left-0 bg-primary text-white py-1 px-2 rounded-tr-md">
            ID: {id}
            </div>
        </div>

        <div className="p-6">
            <div className="text-center mb-4">
            <img
                className="w-20 h-20 object-cover rounded-full border-4 border-primary mx-auto -mt-12"
                src={avatar}
                alt={`${firstName} ${lastName}`}
            />
            <h2 className="text-xl font-semibold text-gray-800 mt-2">{`${firstName} ${lastName}`}</h2>
            <p className="text-sm text-gray-600">@{username}</p>
            </div>

            <div className="mt-4">
            <p className="text-sm text-gray-600">{`Email: ${email}`}</p>
            </div>

            <div className="mt-6">
            <p className="text-sm text-gray-700">{bio}</p>
            </div>

            <div className="mt-6 flex justify-center">
            <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80">
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
