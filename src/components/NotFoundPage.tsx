import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-100">
      <div className="max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          It seems like you've wandered off the path. The page you are looking for could not be found.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100"
          height="100"
          fill="#6B7280"
        >
          <path
            fillRule="evenodd"
            d="M12 1a1 1 0 00-.707.293l-6 6a1 1 0 00-.293.707V18a1 1 0 001 1h4.586l1 1H8a2 2 0 01-2-2V9.414l4.293-4.293A1 1 0 0012 5V1zm-1 15a3 3 0 110-6 3 3 0 010 6zm-1-7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-gray-600 mb-4">
          Don't worry, let's get you back on track! You can go back to the
          <a href="/" className="text-blue-500 hover:underline"> homepage</a>
          {' '}or try using the navigation menu.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;