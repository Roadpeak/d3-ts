import React from 'react';

const ReviewsSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">What are people saying?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-4">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User 1" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-lg text-gray-800 mb-1">"I absolutely love this coupon store! Their deals are amazing, and I've saved so much money."</p>
                <p className="text-sm text-end text-gray-600">- Sarah B.</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20">
                    <path d="M10 0c2.9 0 5.6 1.2 7.6 3.4 4 4.3 3.6 11.1-.9 15.1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.2-.2-.3-.5-.2-.8.2-.2.5-.3.8-.2 3-2.3 3.3-6.1.6-8.8C15.7 2.4 13 1 10 1S4.3 2.4 2.1 5.3c-2.7 2.7-2.4 6.5.6 8.8 1.3 1.2 3 1.9 4.8 1.9 1.3 0 2.7-.4 3.9-1.1.4-.2.8-.1 1.1.2.2.4.1.8-.2 1.1C15.6 18.8 13 20 10 20c-3.7 0-7-2.3-8.3-5.8C-.3 9.9.2 4.1 3.6 1.7 5.6-.1 7.8-.5 10 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Posted 2 days ago</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-4">
              <img src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXJ8ZW58MHx8MHx8fDA%3D" alt="User 2" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-lg text-gray-800 mb-1">"This coupon store has become my go-to place whenever I'm shopping online. The discounts are unbeatable!"</p>
                <p className="text-sm text-gray-600 text-end">- John D.</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20">
                    <path d="M10 0c2.9 0 5.6 1.2 7.6 3.4 4 4.3 3.6 11.1-.9 15.1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.2-.2-.3-.5-.2-.8.2-.2.5-.3.8-.2 3-2.3 3.3-6.1.6-8.8C15.7 2.4 13 1 10 1S4.3 2.4 2.1 5.3c-2.7 2.7-2.4 6.5.6 8.8 1.3 1.2 3 1.9 4.8 1.9 1.3 0 2.7-.4 3.9-1.1.4-.2.8-.1 1.1.2.2.4.1.8-.2 1.1C15.6 18.8 13 20 10 20c-3.7 0-7-2.3-8.3-5.8C-.3 9.9.2 4.1 3.6 1.7 5.6-.1 7.8-.5 10 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">4.9</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Posted 3 days ago</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col  items-center mb-4">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User 3" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-lg text-gray-800 mb-1">"I highly recommend this coupon store to anyone looking to save money. The selection is great, and the deals are legit!"</p>
                <p className="text-sm text-gray-600 text-end">- Emily F.</p>
                <div className="flex items-center mt-1">
                  <svg className="w-4 h-4 fill-current text-yellow-500 mr-1" viewBox="0 0 20 20">
                    <path d="M10 0c2.9 0 5.6 1.2 7.6 3.4 4 4.3 3.6 11.1-.9 15.1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.2-.2-.3-.5-.2-.8.2-.2.5-.3.8-.2 3-2.3 3.3-6.1.6-8.8C15.7 2.4 13 1 10 1S4.3 2.4 2.1 5.3c-2.7 2.7-2.4 6.5.6 8.8 1.3 1.2 3 1.9 4.8 1.9 1.3 0 2.7-.4 3.9-1.1.4-.2.8-.1 1.1.2.2.4.1.8-.2 1.1C15.6 18.8 13 20 10 20c-3.7 0-7-2.3-8.3-5.8C-.3 9.9.2 4.1 3.6 1.7 5.6-.1 7.8-.5 10 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">4.7</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Posted 4 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
